import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  room: Room;
}

const RoomCard = function ({ room }: RoomCardProps) {
  const navigate = useNavigate();
  const stateColors: Record<string, { bg: string; color: string }> = {
    free: { bg: "#e1f5ee", color: "#0f6e56" },
    occupied: { bg: "#fcebeb", color: "#a32d2d" },
    cleaning: { bg: "#e6f1fb", color: "#185fa5" },
    maintenance: { bg: "#faeeda", color: "#854f0b" },
  };

  const floorLabel = (n: number) =>
    n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;
  return (
    <Col key={room.id} xs={12} sm={6} lg={4} xl={3} className="mb-3">
      <div
        style={{
          background: "#fff",
          border: "0.5px solid #e0e0e0",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* header scuro */}
        <div
          style={{
            background: "#1a1a2e",
            padding: "1.25rem",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: "#888",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Room
            </p>
            <p
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: "#fff",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {room.roomNumber}
            </p>
          </div>
          <span
            style={{
              ...stateColors[room.roomState],
              fontSize: 11,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 100,
            }}
          >
            {room.roomState}
          </span>
        </div>

        {/* body */}
        <div style={{ padding: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "#888" }}>Type</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {room.type}
              </span>
            </div>
            <hr style={{ margin: 0 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "#888" }}>Floor</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>
                {floorLabel(room.floor)}
              </span>
            </div>
            <hr style={{ margin: 0 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "#888" }}>Price</span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>
                €{room.price}
                <span
                  style={{
                    fontSize: 11,
                    color: "#888",
                    fontWeight: 400,
                  }}
                >
                  /night
                </span>
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            <button
              style={{
                flex: 1,
                padding: 7,
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Details
            </button>

            <button
              type="button"
              disabled={
                room.roomState === "occupied" ||
                room.roomState === "maintenance"
              }
              style={{
                flex: 1,
                padding: 7,
                fontSize: 12,
                borderRadius: 8,
                border: "none",
                background:
                  room.roomState === "free" || room.roomState === "cleaning"
                    ? "#1a1a2e"
                    : "#ccc",
                color: "#fff",
                cursor:
                  room.roomState === "free" || room.roomState === "cleaning"
                    ? "pointer"
                    : "not-allowed",
              }}
              onClick={() => navigate(`/reservationForm/${room.id}`)}
            >
              {room.roomState === "occupied"
                ? "Occupied"
                : room.roomState === "maintenance"
                  ? "Unavailable"
                  : "Book"}
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RoomCard;
