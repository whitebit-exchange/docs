// Mintlify provides React globally
const { useState, useEffect, useRef } = React;

export const RegionBaseUrl = ({ className = "", showBaseUrl = true }) => {
    const [region, setRegionState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("api-region-preference") || "com";
        }
        return "com";
    });

    const [mounted, setMounted] = useState(false);
    const observerRef = useRef(null);
    const isSyncingRef = useRef(false);

    // --- Core Logic: Domain & Text Switching ---
    const updateAllContentOnPage = (targetRegion) => {
        try {
            const domainFrom = targetRegion === "eu" ? "whitebit.com" : "whitebit.eu";
            const domainTo = targetRegion === "eu" ? "whitebit.eu" : "whitebit.com";

            // 1. Update all links
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                let href = link.getAttribute('href');
                if (href && href.includes(domainFrom)) {
                    link.setAttribute('href', href.replace(domainFrom, domainTo));
                }
            });

            // 2. Global text replacement (including code blocks)
            // We use a tree walker to find all text nodes and replace domains
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        // Skip our own component to avoid UI flicker/loops
                        if (node.parentElement?.closest('.region-toggle-component')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return node.textContent.includes(domainFrom) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                    }
                }
            );

            let currentNode;
            while (currentNode = walker.nextNode()) {
                currentNode.textContent = currentNode.textContent.replace(new RegExp(domainFrom, 'g'), domainTo);
            }

            console.log(`[RegionSync] Global content updated to ${domainTo}`);
        } catch (e) {
            console.error("[RegionSync] Error updating content:", e);
        }
    };

    const updateRegion = (newRegion, source) => {
        if (region === newRegion) return;

        console.log(`[RegionBaseUrl] Updating to "${newRegion}" (Source: ${source})`);

        if (source === 'observer') {
            isSyncingRef.current = true;
            setTimeout(() => isSyncingRef.current = false, 1000);
        }

        setRegionState(newRegion);
        localStorage.setItem("api-region-preference", newRegion);
        updateAllContentOnPage(newRegion);

        if (source === 'user-click') {
            window.dispatchEvent(new CustomEvent("regionChange", { detail: newRegion }));
            attemptToUpdateNativeDropdown(newRegion, 0);
            setTimeout(() => attemptToUpdateNativeDropdown(newRegion, 1), 500);
            setTimeout(() => attemptToUpdateNativeDropdown(newRegion, 2), 1500);
        }
    };

    const attemptToUpdateNativeDropdown = (targetRegion, attempt) => {
        if (isSyncingRef.current) return;

        try {
            const targetUrl = targetRegion === "eu" ? "https://whitebit.eu" : "https://whitebit.com";
            const targetDesc = targetRegion === "eu" ? "EU Server" : "Production Server";

            const selects = document.querySelectorAll('select');
            for (const select of selects) {
                if (select.innerHTML.includes('whitebit.com') || select.innerHTML.includes('whitebit.eu')) {
                    select.value = targetUrl;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    return;
                }
            }

            const buttons = Array.from(document.querySelectorAll('button, [role="combobox"]'));
            const serverSelector = buttons.find(btn => {
                const txt = btn.textContent || "";
                return (txt.includes('Server') || txt.includes('whitebit.com') || txt.includes('whitebit.eu'))
                    && !txt.includes('Run') && !txt.includes('Send');
            });

            if (serverSelector) {
                const currentText = serverSelector.textContent || "";
                if (currentText.includes(targetDesc)) return;

                serverSelector.click();
                setTimeout(() => {
                    const options = document.querySelectorAll('[role="option"], li, button');
                    for (const opt of options) {
                        const optText = opt.textContent || "";
                        if (optText.includes(targetDesc) || optText.includes(targetUrl)) {
                            opt.click();
                            return;
                        }
                    }
                }, 100);
            }
        } catch (e) {
            console.error("[Sync] Error:", e);
        }
    };

    useEffect(() => {
        setMounted(true);
        updateAllContentOnPage(region);

        const handleStorageChange = (e) => {
            if (e.key === "api-region-preference" && e.newValue) {
                updateRegion(e.newValue, 'storage');
            }
        };
        const handleRegionChange = (e) => {
            if (e.detail !== region) {
                updateRegion(e.detail, 'event');
            }
        };
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("regionChange", handleRegionChange);

        observerRef.current = new MutationObserver((mutations) => {
            if (isSyncingRef.current) return;

            // Update all content when new nodes are added
            updateAllContentOnPage(region);

            for (const mutation of mutations) {
                if (mutation.type !== 'childList' && mutation.type !== 'characterData') continue;

                const target = mutation.target;
                const el = target.nodeType === Node.TEXT_NODE ? target.parentElement : target;
                if (el && (el.getAttribute('role') === 'option' || el.closest('[role="listbox"]'))) continue;

                const text = target.textContent || "";

                if (text.includes('WhiteBIT EU Server') || (text.includes('https://whitebit.eu') && text.includes('Server'))) {
                    // Check if it's not a link and not inside our component
                    if (el && el.tagName !== 'A' && !el.closest('.region-toggle-component')) {
                        if (region !== 'eu') updateRegion('eu', 'observer');
                    }
                }
                else if (text.includes('WhiteBIT Global Server') || (text.includes('https://whitebit.com') && text.includes('Server'))) {
                    if (el && el.tagName !== 'A' && !el.closest('.region-toggle-component')) {
                        if (region !== 'com') updateRegion('com', 'observer');
                    }
                }
            }
        });

        observerRef.current.observe(document.body, { childList: true, subtree: true, characterData: true });

        if (typeof window !== 'undefined') {
            const current = localStorage.getItem("api-region-preference");
            if (current) attemptToUpdateNativeDropdown(current, 'init');
        }

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("regionChange", handleRegionChange);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [region]);

    const apiBaseUrl = region === "eu" ? "https://whitebit.eu" : "https://whitebit.com";

    if (!mounted) return null;

    return (
        <div className={`flex items-center gap-2 flex-wrap my-4 region-toggle-component ${className}`}>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                Base URL
            </span>
            <span className="text-sm text-gray-400">(</span>
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => updateRegion("com", "user-click")}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition-all ${region === "com"
                            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                >
                    .com
                </button>
                <button
                    onClick={() => updateRegion("eu", "user-click")}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition-all ${region === "eu"
                            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                >
                    .eu
                </button>
            </div>
            <span className="text-sm text-gray-400">)</span>
            {showBaseUrl && (
                <>
                    <span className="text-sm text-gray-400">:</span>
                    <a
                        href={apiBaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-primary dark:text-primary-light hover:underline"
                    >
                        {apiBaseUrl}
                    </a>
                </>
            )}
        </div>
    );
};
