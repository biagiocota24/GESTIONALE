import type { Guest, Reservation, Room } from "../../interfaces/interfaces";

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 12px",
  color: "#888",
  fontWeight: 500,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  borderBottom: "1px solid #f0f0f0",
};

// body celle
const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #f0f0f0",
};

// badge stato
const statusBadge: Record<string, React.CSSProperties> = {
  confirmed: { background: "#e1f5ee", color: "#0f6e56" },
  waiting: { background: "#faeeda", color: "#854f0b" },
  canceled: { background: "#fcebeb", color: "#a32d2d" },
  completed: { background: "#e6f1fb", color: "#185fa5" },
};

interface ReservationTableProps {
  reservations: Reservation[];
  guests: Guest[];
  rooms: Room[];
}

const Tabella = function ({
  reservations,
  guests,
  rooms,
}: ReservationTableProps) {
  return (
    <table className="border m-auto">
      <thead>
        <tr>
          <th style={thStyle}>Guest</th>
          <th style={thStyle}>Room</th>
          <th style={thStyle}>Check In</th>
          <th style={thStyle}>Check Out</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((r, index) => {
          const guest = guests.find((g) => g.id === r.guestId);
          const room = rooms.find((rm) => rm.id === r.roomId);
          return (
            <tr key={index}>
              <td style={tdStyle}>
                {guest?.name} {guest?.surname}
              </td>
              <td style={tdStyle}>{room?.roomNumber}</td>
              <td style={tdStyle}>{r.checkIn}</td>
              <td style={tdStyle}>{r.checkOut}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    ...statusBadge[r.reservationState],
                    padding: "3px 10px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {r.reservationState}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tabella;
