import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { getNames } from "country-list";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { addReservation } from "../redux/actions/reservationAction";
import { aggiungiNelloStorage } from "../data/mockData";

const ReservationsForm = function () {
  const reservations = useSelector(
    (state: RootState) => state.reservations.reservations,
  );
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const guests = useSelector((state: RootState) => state.guests.guests);
  const navigate = useNavigate();
  const params = useParams();
  const thisRoom = rooms.find((r) => r.id === Number(params.id));
  const [validated, setValidated] = useState(false);
  const nationalities = getNames();
  const today: string = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();

  //TUTTI IL VALORI DEL FORM
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [docType, setDocType] = useState("");
  const [document, setDocument] = useState("");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [adultsNr, setAdultsNr] = useState<number>(0);
  const [kidsNr, setKidsNr] = useState<number>(0);
  const [specialNotes, setSpecialNotes] = useState("");

  // ── CALCOLA IL TOTALE ──
  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000,
  );

  //VERIFICA CHE I REQUISITI DEL FORM SIANO SODDISFATTI , SE NO MOSTRA I MESSAGGIO IN ROSSO DI ERRORE
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    // ── COSTRUISCI IL GUEST ──
    const newGuest: Guest = {
      id: Date.now(),
      name: firstName,
      surname: lastName,
      phoneNumber: telephone,
      nationality: nationality,
      document: document,
      email: "",
    };

    // ── COSTRUISCo LA PRENOTAZIONE ──
    const newReservation: Reservation = {
      id: Date.now() + 1,
      guestId: newGuest.id,
      roomId: thisRoom.id,
      checkIn: checkIn,
      checkOut: checkOut,
      reservationState: "waiting",
      adults: adultsNr,
      kids: kidsNr,
      specialNotes: specialNotes,
      totalPrice: nights * thisRoom.price,
    };

    console.log("New Guest:", newGuest);
    console.log("New Reservation:", newReservation);

    // ← qui dopo aggiungeremo dispatch per salvare in Redux
    // dispatch(addReservation(newReservation));
    aggiungiNelloStorage("reservations", newReservation);

    const alreadyGuest = guests.find((g) => newGuest.id === g.id);
    if (!alreadyGuest) {
      aggiungiNelloStorage("guests", newGuest);
    }
    navigate("/");
  };

  if (!thisRoom) return <p>Room not found</p>;
  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="container mt-3"
      >
        <h5 className="text-center mt-3">Dati personali</h5>
        <Row className="mb-3" xs={1} lg={2}>
          <Form.Group as={Col} controlId="validationFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="validationTelephone">
            <Form.Label>Telephon</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Telephone"
              minLength={10}
              maxLength={15}
              required
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid telephone number
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Select
              required
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="">Select</option>
              {nationalities.map((n) => {
                return (
                  <option key={n} value={n}>
                    {n}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Campo obbligatorio
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zip"
              required
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationDocType">
            <Form.Label>Type of document</Form.Label>
            <Form.Select
              required
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="">seleziona</option>
              <option value="Personal Id">Personal Id</option>
              <option value="Passport">Passport</option>
              <option value="Drive License">Drive License</option>
            </Form.Select>
          </Form.Group>
          {docType === "Personal Id" && (
            <Form.Group controlId="validationIdCard">
              <Form.Label>ID Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. CA12345AB"
                pattern="[A-Z]{2}[0-9]{5}[A-Z]{2}"
                required
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
              <Form.Text className="text-muted">
                Format: 2 letters, 5 numbers, 2 letters
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid ID Card number
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {docType === "Passport" && (
            <Form.Group controlId="validationPassport">
              <Form.Label>Passport Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. AB1234567"
                pattern="[A-Z]{2}[0-9]{7}"
                required
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
              <Form.Text className="text-muted">
                Format: 2 letters followed by 7 numbers
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Passport number
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {docType === "Drive License" && (
            <Form.Group controlId="validationLicense">
              <Form.Label>Driving License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. U99999AB999T"
                pattern="[A-Z0-9]{8,12}"
                required
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
              <Form.Text className="text-muted">
                Format: 8 to 12 alphanumeric characters
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Driving License number
              </Form.Control.Feedback>
            </Form.Group>
          )}
        </Row>
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
              {Array.from({ length: thisRoom.capacity }).map((p, i) => {
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
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
};

export default ReservationsForm;
