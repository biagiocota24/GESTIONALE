import { Col } from "react-bootstrap";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
}

const StateCard = function ({ state }: StatCardProps) {
  return (
    <Col xs={6} md={3} key={state.label}>
      <div
        style={{
          background: "#fff",
          border: "0.5px solid #e0e0e0",
          borderLeft: `3px solid ${state.color}`, // colore diverso per ogni card
          borderRadius: 12,
          padding: "1rem 1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
            {state.label}
          </p>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#e6f1fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#378add" }}>{state.icon}</span>
          </div>
        </div>
        <p style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>
          {state.value}
        </p>
        <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>
          {state.subtitle}
        </p>
      </div>
    </Col>
  );
};

export default StateCard;
