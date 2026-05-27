import { useNavigate } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
    const navigate = useNavigate()
  const { rooms } = useHotelStore();
  const room = rooms.find((r) => r.id === reservation.roomId);

  const checkIn = new Date(reservation.checkIn);
  const checkOut = new Date(reservation.checkOut);
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );

  const formatDate = (d: Date) =>
    d.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
  const formatDay = (d: Date) =>
    d.toLocaleDateString("it-IT", { weekday: "long" });

  return (
    <div
      style={{
        background: "var(--bs-body-bg)",
        border: "0.5px solid var(--bs-border-color)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div style={{ padding: "1.5rem 1.5rem 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: "#888",
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Prenotazione
            </p>
            <p
              style={{
                fontSize: 22,
                fontWeight: 500,
                margin: 0,
                lineHeight: 1,
              }}
            >
              Camera {room?.roomNumber}
            </p>
          </div>
          <span
            style={{
              background: "#FAEEDA",
              color: "#854F0B",
              fontSize: 11,
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: 100,
            }}
          >
            {reservation.reservationState}
          </span>
        </div>

        {/* DATE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 40px 1fr",
            alignItems: "center",
            gap: 8,
            background: "#f8f8f8",
            borderRadius: 8,
            padding: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: "#888",
                margin: "0 0 2px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Check-in
            </p>
            <p style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>
              {formatDate(checkIn)}
            </p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
              {formatDay(checkIn)}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: 18, color: "#888" }}>→</span>
            <p style={{ fontSize: 10, color: "#888", margin: 0 }}>
              {nights} notti
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 11,
                color: "#888",
                margin: "0 0 2px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Check-out
            </p>
            <p style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>
              {formatDate(checkOut)}
            </p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
              {formatDay(checkOut)}
            </p>
          </div>
        </div>
      </div>

      {/* DETTAGLI */}
      <div
        style={{
          borderTop: "0.5px solid #e0e0e0",
          padding: "1rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
        }}
      >
        {[
          { label: "Adulti", value: reservation.adults },
          { label: "Bambini", value: reservation.kids },
          { label: "Tipo", value: room?.type ?? "—" },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <p style={{ fontSize: 11, color: "#888", margin: 0 }}>
              {item.label}
            </p>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER TOTALE */}
      <div
        style={{
          borderTop: "0.5px solid #e0e0e0",
          padding: "1rem 1.5rem",
          background: "#f8f8f8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              color: "#888",
              margin: "0 0 2px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Totale
          </p>
          <p style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>
            € {reservation.totalPrice}
          </p>
        </div>
        <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
          € {room?.price} / notte
        </p>
      </div>
      <div className="text-center py-1">
        <button className="btn btn-outline-success" onClick={()=> navigate(`gestionePrenotazione/${reservation.id}`)}>Gestisci prenotazione</button>
      </div>
    </div>
  );
};

export default ReservationCard;
