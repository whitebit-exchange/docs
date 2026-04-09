const { useEffect, useRef, useState } = React;

export const RelatedResources = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    if (el.parentElement) {
      el.parentElement.appendChild(el);
    }

    setVisible(true);
  }, []);

  return (
    <div
      ref={ref}
      className="related-resources"
      style={{
        marginTop: "2.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border-color, #e5e7eb)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease-in",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Related resources</h2>
      {children}
    </div>
  );
};
