import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import GuestCards from "../components/guests/GuestCards";
import { useHotelStore } from "../zustand/store";

const Guests = function () {
  const { guests } = useHotelStore();
  const [search, setSearch] = useState("");

  const filteredGuests =
    search === ""
      ? guests
      : guests.filter((g) => {
          return (
            `${g.name.toLowerCase()}${g.surname.toLowerCase()}`
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            g.id.toString().includes(search) ||
            ""
          );
        });
  return (
    <Container fluid="lg">
      <Row>
        <Col>
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
              <p style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Guests</p>
              <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>
                {filteredGuests ? filteredGuests.length : 0} guests total
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  fontSize: 13,
                  padding: "7px 12px",
                  borderRadius: 8,
                  border: "1px solid #e0e0e0",
                  background: "#fff",
                  outline: "none",
                  width: 220,
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <GuestCards filteredGuests={filteredGuests} search={search} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Guests;
