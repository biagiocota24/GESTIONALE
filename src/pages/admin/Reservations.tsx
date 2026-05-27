import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHotelStore } from "../../zustand/store";
import ReservationCard from "../../components/admin/ReservationsCards";

const Reservations = function () {
  const { rooms, guests, reservations } = useHotelStore();
  const [select, setSelect] = useState("all");

  const filteredReservations =
    select === "all"
      ? reservations
      : (reservations ?? []).filter((res) => res.reservationState === select);
  return (
    <Container fluid="lg">
      <Row>
        <Col className="text-center">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <p style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
                Reservations
              </p>
              <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>
                {filteredReservations ? filteredReservations.length : 0} total
                Reservations
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: "#888" }}>
                Filter by state
              </span>
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                style={{
                  fontSize: 13,
                  padding: "7px 12px",
                  borderRadius: 8,
                  border: "1px solid #e0e0e0",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="all">All</option>
                <option value="confirmed">Confimed</option>
                <option value="completed">Completed</option>
                <option value="waiting">Waiting</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="g-3">
        {(filteredReservations ?? []).map((r) => (
          <Col key={r.id} xs={12} md={6} xl={4}>
            <ReservationCard
              reservation={r}
              guest={guests.find((g) => g.id === r.guestId)}
              room={rooms.find((rm) => rm.id === r.roomId)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Reservations;
