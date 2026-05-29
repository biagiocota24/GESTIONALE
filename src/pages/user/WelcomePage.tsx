import { Col, Container, Row } from "react-bootstrap";
import { useHotelStore } from "../../zustand/store";
import ReservationCard from "../../components/user/ReservationCard";
import { useNavigate } from "react-router-dom";
import { generateMockReservations } from "../../data/mockData";
import { useState } from "react";

const WelcomePage = function () {
  const navigate = useNavigate();
  const { currentUser, reservations, updateRoomState } = useHotelStore();
  const [filtro, setFiltro] = useState("");
  const myReservations = reservations.filter(
    (r) => r.guestId === currentUser.id,
  );

  const myReservationFiltered = myReservations.filter((r) =>
    r.reservationState.includes(filtro),
  );

  //FUNZIONE CARICA FAKE PRENOTAZIONI
  const { guests, rooms, loadReservations } = useHotelStore();

  const handleLoadMock = () => {
    const guestIds = guests.map((g) => g.id);
    const roomIds = rooms.map((r) => r.id);
    const mock = generateMockReservations(guestIds, roomIds);
    mock.forEach((r) => updateRoomState(r.id, "occupied"));
    reservations.map((r) => updateRoomState(r.roomId, "occupied"));
    loadReservations(mock);
  };

  console.log(reservations.length);

  return (
    <Container fluid="lg">
      <Row className="text-center mt-2">
        <h1>Benvenuto {currentUser.name} !</h1>
      </Row>
      <Row className="g-3">
        <h2 className="text-center mt-4 mb-2">
          {myReservations.length > 0 ? (
            <span className="text-success">Le tue prenotazioni attive</span>
          ) : (
            <div className="d-flex flex-column align-items-center gap-3">
              <span className="text-primary">Ancora nessuna prenotazione</span>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("rooms")}
              >
                Esplora le nostre camere
              </button>
            </div>
          )}
        </h2>
        <div className="text-center">
          <p>Filtra : </p>
          <select
            name="stato-camere"
            id="state-camere"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">tutte</option>
            <option value="confirmed">confirmed</option>
            <option value="free">Waiting</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {myReservationFiltered ? (
          <>
            {myReservationFiltered.map((myReservation) => {
              return (
                <Col xs={12} md={6} lg={4}>
                  <ReservationCard reservation={myReservation} />
                </Col>
              );
            })}
          </>
        ) : (
          <p>Nessuna prenotazione attiva</p>
        )}
      </Row>
      <button onClick={handleLoadMock}>Carica 50 prenotazioni mock</button>
    </Container>
  );
};

export default WelcomePage;
