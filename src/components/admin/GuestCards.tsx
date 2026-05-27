import { Col, Row } from "react-bootstrap";
import type { Guest } from "../../interfaces/interfaces";

interface guestCardProps {
  search: string;
  filteredGuests: Guest[];
}

const GuestCards = function ({ filteredGuests, search }: guestCardProps) {
  const getInitials = (name: string, surname: string) =>
    `${name[0]}${surname[0]}`.toUpperCase();

  const avatarColors = ["#e6f1fb", "#e1f5ee", "#faeeda", "#fcebeb", "#f3e8ff"];
  const textColors = ["#185fa5", "#0f6e56", "#854f0b", "#a32d2d", "#6b21a8"];

  return (
    <>
      <div
        style={{
          background: "#fff",
          border: "0.5px solid #e0e0e0",
          borderRadius: 12,
          overflow: "hidden",
        }}
        className="d-none d-md-block"
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: "#f8f8f8" }}>
              {["#", "Name", "Email", "Phone", "Nationality", "Document"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "10px 16px",
                      color: "#888",
                      fontWeight: 500,
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {(filteredGuests ?? []).length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: 24,
                    color: "#888",
                  }}
                >
                  No guests found
                </td>
              </tr>
            ) : (
              (filteredGuests ?? []).map((g, i) => (
                <tr key={g.id} style={{ borderTop: "0.5px solid #f0f0f0" }}>
                  <td style={{ padding: "12px 16px", color: "#888" }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: avatarColors[i % avatarColors.length],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 500,
                          color: textColors[i % textColors.length],
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(g.name, g.surname)}
                      </div>
                      <span style={{ fontWeight: 500 }}>
                        {g.name} {g.surname}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#888" }}>
                    {g.email}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#888" }}>
                    {g.phoneNumber}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#f5f5f5",
                        color: "#666",
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 12,
                      }}
                    >
                      {g.nationality}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#888" }}>
                    {g.document}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-md-none">
        <Row className="g-3">
          {(filteredGuests ?? []).map((g, i) => (
            <Col key={g.id} xs={12} sm={6}>
              <div
                style={{
                  background: "#fff",
                  border: "0.5px solid #e0e0e0",
                  borderRadius: 12,
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: avatarColors[i % avatarColors.length],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 500,
                      color: textColors[i % textColors.length],
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(g.name, g.surname)}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                      {g.name} {g.surname}
                    </p>
                    <span
                      style={{
                        background: "#f5f5f5",
                        color: "#666",
                        padding: "2px 8px",
                        borderRadius: 100,
                        fontSize: 11,
                      }}
                    >
                      {g.nationality}
                    </span>
                  </div>
                </div>
                {[
                  { label: "Email", value: g.email },
                  { label: "Phone", value: g.phoneNumber },
                  { label: "Document", value: g.document },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        padding: "6px 0",
                      }}
                    >
                      <span style={{ color: "#888" }}>{label}</span>
                      <span>{value}</span>
                    </div>
                    <hr style={{ margin: 0 }} />
                  </div>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default GuestCards;
