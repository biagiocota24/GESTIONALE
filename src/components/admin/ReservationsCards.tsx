import { useEffect } from "react";
import type { Reservation, Guest, Room } from "../../interfaces/interfaces";
import { useHotelStore } from "../../zustand/store";

const statusColors: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: "#e1f5ee", color: "#0f6e56" },
  waiting: { bg: "#faeeda", color: "#854f0b" },
  canceled: { bg: "#fcebeb", color: "#a32d2d" },
  completed: { bg: "#e6f1fb", color: "#185fa5" },
};

interface ReservationCardProps {
  reservation: Reservation;
  guest: Guest | undefined;
  room: Room | undefined;
}

const ReservationCard = function ({
  reservation: r,
  guest,
  room,
}: ReservationCardProps) {
  const { setReservationState, updateRoomState } = useHotelStore();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (r.checkOut < today) {
      setReservationState(r.id, "completed");
      updateRoomState(r.roomId, "free");
    }
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e0e0e0",
        borderRadius: 12,
        padding: "1.25rem",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#e6f1fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 500,
              color: "#185fa5",
            }}
          >
            {guest ? `${guest.name[0]}${guest.surname[0]}` : "?"}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
              {guest?.name} {guest?.surname}
            </p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
              Room {room?.roomNumber}
            </p>
          </div>
        </div>
        <span
          style={{
            ...statusColors[r.reservationState],
            fontSize: 11,
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: 100,
          }}
        >
          {r.reservationState}
        </span>
      </div>

      {/* info grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: r.specialNotes ? 12 : 0,
        }}
      >
        {[
          { label: "Check In", value: r.checkIn },
          { label: "Check Out", value: r.checkOut },
          { label: "Guests", value: `${r.adults} adults · ${r.kids} kids` },
          { label: "Total", value: `€${r.totalPrice}`, large: true },
        ].map(({ label, value, large }) => (
          <div
            key={label}
            style={{
              background: "#f8f8f8",
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "#888",
                margin: "0 0 2px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              {label}
            </p>
            <p
              style={{ fontSize: large ? 16 : 13, fontWeight: 500, margin: 0 }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* note speciali */}
      {r.specialNotes && (
        <div
          style={{
            background: "#f8f8f8",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            color: "#888",
          }}
        >
          📝 {r.specialNotes}
        </div>
      )}
      <div className="d-flex justify-content-around mt-3 gap-2">
        {r.reservationState === "waiting" && (
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              background: "#e1f5ee",
              color: "#0f6e56",
              border: "0.5px solid #a8dfc9",
            }}
            onClick={() => setReservationState(r.id, "confirmed")}
          >
            ✓ Conferma
          </button>
        )}
        {r.reservationState === "waiting" && (
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              background: "#fcebeb",
              color: "#a32d2d",
              border: "0.5px solid #f09595",
            }}
            onClick={() => setReservationState(r.id, "canceled")}
          >
            ✕ Rifiuta
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
