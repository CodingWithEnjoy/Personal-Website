export default {
  h2: (props: any) => (
    <h2
      style={{
        marginTop: "2.5rem",
        marginBottom: "1rem",
        direction: "rtl",
        textAlign: "right",
      }}
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      style={{
        lineHeight: 1.8,
        marginBottom: "1rem",
        direction: "rtl",
        textAlign: "right",
      }}
      {...props}
    />
  ),
  MyCallout: ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        padding: "1.5rem",
        background: "#111",
        color: "#fff",
        borderRadius: "12px",
        margin: "2rem 0",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      {children}
    </div>
  ),
};
