import { useNavigate, useParams } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";
import ConfirmModal, { type ModalType } from "../Modal";
import { useState } from "react";
import { Toast } from "react-bootstrap";

const GestionePrenotazione = function () {
  const {
    reservations,
    rooms,
    removeReservation,
    currentUser,
    updateRoomState,
  } = useHotelStore();
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showToast, setShowToast] = useState(false);

  const thisReservation = reservations.find(
    (r) => r.id === Number(reservationId),
  );
  const room = rooms.find((r) => r.id === thisReservation?.roomId);

  if (!thisReservation && !showToast) return <p>Prenotazione non trovata</p>;

  const checkIn = new Date(thisReservation.checkIn);
  const checkOut = new Date(thisReservation.checkOut);
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );
  const formatDate = (d: Date) =>
    d.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
  const formatDay = (d: Date) =>
    d.toLocaleDateString("it-IT", { weekday: "long" });

  const handleDelete = () => {
    setShowToast(true);
    setTimeout(() => {
      removeReservation(thisReservation);
      updateRoomState(thisReservation.roomId, "free");
      setShowToast(false);
      navigate(`/user/${currentUser.id}`);
    }, 1500);
  };

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 520, margin: "0 auto" }}>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          color: "gray",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        ← Le mie prenotazioni
      </button>

      <p style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px" }}>
        Prenotazione #{thisReservation.id}
      </p>
      <p style={{ fontSize: 13, color: "gray", margin: "0 0 2rem" }}>
        Riepilogo e gestione della tua prenotazione
      </p>

      {/* CARD */}
      <div
        style={{
          border: "0.5px solid #e0e0e0",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "0.5px solid #e0e0e0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "gray",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                }}
              >
                Camera
              </p>
              <p style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>
                {room?.roomNumber}
              </p>
              <p style={{ fontSize: 12, color: "gray", margin: "4px 0 0" }}>
                {room?.type} · Piano {room?.floor}
              </p>
            </div>
            <span
              style={{
                background: "#FAEEDA",
                color: "#854F0B",
                fontSize: 11,
                padding: "4px 12px",
                borderRadius: 100,
                height: "fit-content",
              }}
            >
              {thisReservation.reservationState}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 48px 1fr",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "gray",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                }}
              >
                Check-in
              </p>
              <p style={{ fontSize: 17, fontWeight: 500, margin: 0 }}>
                {formatDate(checkIn)}
              </p>
              <p style={{ fontSize: 12, color: "gray", margin: 0 }}>
                {formatDay(checkIn)}
              </p>
            </div>
            <div
              style={{
                background: "#f8f8f8",
                borderRadius: 8,
                padding: "6px 10px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, display: "block" }}>
                {nights}
              </span>
              <span style={{ fontSize: 10, color: "gray" }}>notti</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: 11,
                  color: "gray",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                }}
              >
                Check-out
              </p>
              <p style={{ fontSize: 17, fontWeight: 500, margin: 0 }}>
                {formatDate(checkOut)}
              </p>
              <p style={{ fontSize: 12, color: "gray", margin: 0 }}>
                {formatDay(checkOut)}
              </p>
            </div>
          </div>
        </div>

        {/* OSPITI */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "0.5px solid #e0e0e0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {[
            { label: "Adulti", value: thisReservation.adults },
            { label: "Bambini", value: thisReservation.kids },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontSize: 11, color: "gray", margin: "0 0 2px" }}>
                {item.label}
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* NOTE */}
        {thisReservation.specialNotes && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "0.5px solid #e0e0e0",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "gray",
                margin: "0 0 8px",
                textTransform: "uppercase",
              }}
            >
              Note
            </p>
            <div
              style={{
                background: "#f8f8f8",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 13,
                color: "gray",
              }}
            >
              {thisReservation.specialNotes}
            </div>
          </div>
        )}

        {/* TOTALE */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
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
                color: "gray",
                margin: "0 0 2px",
                textTransform: "uppercase",
              }}
            >
              Totale
            </p>
            <p style={{ fontSize: 26, fontWeight: 500, margin: 0 }}>
              € {thisReservation.totalPrice}
            </p>
          </div>
          <p style={{ fontSize: 13, color: "gray", margin: 0 }}>
            € {room?.price} / notte
          </p>
        </div>
      </div>

      {/* AZIONI */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button
          onClick={() => {
            setModalType("delete");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            background: "#FCEBEB",
            color: "#A32D2D",
            border: "0.5px solid #F09595",
          }}
        >
          🗑 Cancella
        </button>
        <button
          onClick={() =>
            navigate(
              `/user/${currentUser?.id}/reservationForm/${thisReservation.roomId}`,
            )
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            background: "white",
            border: "0.5px solid #e0e0e0",
          }}
        >
          ✏️ Modifica
        </button>
        <button
          onClick={() => navigate(`/user/${currentUser.id}`)}
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            background: "white",
            border: "0.5px solid #e0e0e0",
          }}
        >
          🏠 Torna alla home
        </button>
      </div>
      <ConfirmModal
        show={modalType === "delete"}
        title="Storno prenotazione"
        body="Vuoi davvero cancellare questa prenotazione ? "
        confirmLabel="conferma"
        onConfirm={handleDelete}
        onClose={() => setModalType(null)}
      />
      <Toast show={showToast} className="position-absolute bottom-0 end-0 m-3">
        <Toast.Header className="bg-success text-light">
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">👍</strong>
          <small>
            {new Date().getHours()} : {new Date().getMinutes()}
          </small>
        </Toast.Header>
        <Toast.Body>Prenotazione cancellata</Toast.Body>
      </Toast>
    </div>
  );
};

export default GestionePrenotazione;
