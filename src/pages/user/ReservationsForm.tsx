import React, { useState } from "react";
import type { Reservation } from "../../interfaces/interfaces";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";
import { Toast } from "react-bootstrap";

const ReservationsForm = function () {
  const {
    rooms,
    addReservation,
    currentUser,
    reservations,
    updateReservation,
    updateRoomState,
  } = useHotelStore();
  const navigate = useNavigate();
  const params = useParams();
  const thisRoom = rooms.find((r) => r.id === Number(params.roomId));
  const [showToast, setShowToast] = useState(false);

  const thisReservation = thisRoom ? reservations.find((r) => r.roomId === thisRoom.id) : undefined;
  const [stoModificando] = useState(!!thisReservation);
  console.log(thisReservation);

  const [validated, setValidated] = useState(false);
  const today: string = new Date().toISOString().split("T")[0];

  //TUTTI IL VALORI DEL FORM
  const [checkIn, setCheckIn] = useState(thisReservation?.checkIn || today);
  const [checkOut, setCheckOut] = useState(thisReservation?.checkOut || "");
  const [adultsNr, setAdultsNr] = useState<number>(
    thisReservation?.adults || 0,
  );
  const [kidsNr, setKidsNr] = useState<number>(thisReservation?.kids || 0);
  const [specialNotes, setSpecialNotes] = useState(
    thisReservation?.specialNotes || "",
  );

  // ── CALCOLA IL TOTALE ──
  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000,
  );
  
  //CONTROLLO CHE thisRoom ESISTA
  if (!thisRoom) return <p>Room not found</p>;

  //VERIFICA CHE I REQUISITI DEL FORM SIANO SODDISFATTI , SE NO MOSTRA I MESSAGGIO IN ROSSO DI ERRORE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    // ── COSTRUISCo LA PRENOTAZIONE ──
    const newReservation: Reservation = {
      id: Date.now() + 1,
      guestId: currentUser?.id ?? 0,
      roomId: thisRoom.id,
      checkIn: checkIn,
      checkOut: checkOut,
      reservationState: "waiting",
      adults: adultsNr,
      kids: kidsNr,
      specialNotes: specialNotes,
      totalPrice: nights * thisRoom.price,
    };

    if (thisReservation) {
      setShowToast(true);
      setTimeout(() => {
        navigate(`/user/${currentUser?.id}`);
      }, 2500);
      updateReservation({ ...newReservation, id: thisReservation.id });
      updateRoomState(thisRoom.id, "occupied");
    } else {
      setShowToast(true);
      setTimeout(() => {
        navigate(`/user/${currentUser?.id}`);
      }, 2500);
      addReservation(newReservation);
      updateRoomState(thisRoom.id, "occupied");
    }
  };
  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="container mt-3"
      >
        <h5 className="text-center mt-3">Dati prenotazione</h5>
        <Row className="mb-3" xs={1} lg={2}>
          <Form.Group controlId="validationCheckIn">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              min={today}
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="validationCheckOut">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="validationAdultsNr">
            <Form.Label>Adults</Form.Label>
            <Form.Select
              required
              value={adultsNr}
              onChange={(e) => setAdultsNr(Number(e.target.value))}
            >
              <option value="">Seleziona</option>
              {Array.from({ length: thisRoom.capacity }).map((_, i) => {
                return (
                  <option key={`${thisRoom.roomNumber}` + i + 2} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please insert the number of adults
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationKidsNr">
            <Form.Label>Kids</Form.Label>
            <Form.Select
              value={kidsNr}
              onChange={(e) => setKidsNr(Number(e.target.value))}
            >
              <option value="">Seleziona</option>
              {Array.from({ length: thisRoom.capacity - adultsNr }).map(
                (_, i) => {
                  return (
                    <option
                      key={`${thisRoom.roomNumber}` + i + 1}
                      value={i + 1}
                    >
                      {i + 1}
                    </option>
                  );
                },
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="validationNotes">
            <Form.Label>Special Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Any special requests or notes..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row md={1} lg={2} xxl={3} className="justify-content-center my-3">
          <Col
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
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "#888",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                You are booking
              </p>
              <p
                style={{
                  fontSize: 42,
                  fontWeight: 500,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {thisRoom.roomNumber}
              </p>
              <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>
                Floor {thisRoom.floor} · {thisRoom.type} Room
              </p>
              <span
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  background: "#e1f5ee",
                  color: "#0f6e56",
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: 100,
                }}
              >
                Available
              </span>
            </div>

            {/* dettagli */}
            <div
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                {
                  label: "Price per night",
                  value: `€${thisRoom.price}`,
                  large: true,
                },
                {
                  label: "Capacity",
                  value: `${thisRoom.capacity} person${thisRoom.capacity > 1 ? "s" : ""}`,
                },
                { label: "Description", value: thisRoom.description },
              ].map(({ label, value, large }) => (
                <div key={label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#888" }}>{label}</span>
                    <span
                      style={{
                        fontSize: large ? 18 : 13,
                        fontWeight: large ? 500 : 400,
                        color: "#333",
                        textAlign: "right",
                        maxWidth: 200,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                  <hr style={{ margin: "10px 0 0" }} />
                </div>
              ))}

              {/* totale stimato */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 4,
                }}
              >
                <span style={{ fontSize: 13, color: "#888" }}>
                  Estimated total
                </span>
                <span
                  style={{ fontSize: 22, fontWeight: 500, color: "#1a1a2e" }}
                >
                  €{checkIn && checkOut ? nights * thisRoom.price : "—"}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Accetto termini e condizioni"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">
          {thisReservation ? "Modifica" : "Prenota"}
        </Button>
      </Form>
      <Toast show={showToast} className="position-absolute bottom-0 end-0 m-3">
        <Toast.Header className="bg-success text-light">
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">👍</strong>
          <small>
            {new Date().getHours()} : {new Date().getMinutes()}
          </small>
        </Toast.Header>
        <Toast.Body>
          {stoModificando ? "Prenotazione modificata" : "Prenotazione salvata"}
        </Toast.Body>
      </Toast>
    </>
  );
};

export default ReservationsForm;
