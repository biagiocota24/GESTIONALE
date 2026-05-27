import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useHotelStore } from "../../zustand/store";
import RoomCard from "../../components/user/RoomCard";

const Rooms = function () {
  const { rooms } = useHotelStore();
  const [select, setSelect] = useState("all");

  const filteredRooms =
    select === "all" ? rooms : rooms.filter((r) => r.roomState === select);

  return (
    <Container>
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
              <p style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Rooms</p>
              <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>
                {filteredRooms.length} rooms total
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
                <option value="free">Free</option>
                <option value="occupied">Occupied</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {filteredRooms.map((room) => {
          return <RoomCard room={room} key={room.id} />;
        })}
      </Row>
    </Container>
  );
};

export default Rooms;
