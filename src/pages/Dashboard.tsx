import { Col, Container, Row } from "react-bootstrap";
import {
  MdBedroomParent,
  MdEventAvailable,
  MdAttachMoney,
  MdPeople,
} from "react-icons/md";
import StateCard from "../components/dashboard/StateCards";
import SliceChart from "../components/dashboard/SliceChart";
import MyBarChart from "../components/dashboard/BarChart";
import Tabella from "../components/dashboard/Tabella";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Dashboard = function () {
  const guests = useSelector((state: RootState) => state.guests.guests);
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const reservations = useSelector(
    (state: RootState) => state.reservations.reservations,
  );

  const stats = [
    {
      label: "Total Rooms",
      value: rooms.length,
      icon: <MdBedroomParent size={18} />,
      color: "#4f8ef7",
      subtitle: "All floors",
    },
    {
      label: "Occupied",
      value: rooms.filter((room) => room.roomState === "occupied").length,
      icon: <MdPeople size={18} />,
      color: "#e74c3c",
      subtitle: "Currently occupied",
    },
    {
      label: "Reservations",
      value: reservations.length,
      icon: <MdEventAvailable size={18} />,
      color: "#2ecc71",
      subtitle: "Confirmed",
    },
    {
      label: "Revenue",
      value: `${reservations
        .filter((r) => r.reservationState === "confirmed")
        .reduce((acc, r) => acc + r.totalPrice, 0)} €`,
      icon: <MdAttachMoney size={18} />,
      color: "#f39c12",
      subtitle: "Confirmed only",
    },
  ];

  const roomStats = [
    {
      name: "Free",
      value: rooms.filter((room) => room.roomState === "free").length,
      color: "green",
    },
    {
      name: "Occupied",
      value: rooms.filter((room) => room.roomState === "occupied").length,
      color: "red",
    },
    {
      name: "Cleaning",
      value: rooms.filter((room) => room.roomState === "cleaning").length,
      color: "blue",
    },
    {
      name: "Maintenance",
      value: rooms.filter((room) => room.roomState === "maintenance").length,
      color: "orange",
    },
  ];
  const PIE_COLORS = ["#2ecc71", "#e74c3c", "#3498db", "#f39c12"];
  const BAR_COLORS = ["#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];

  const roomsType = [
    {
      type: "single",
      price: rooms.filter((room) => room.type === "single")[0]?.price || 0,
    },
    {
      type: "double",
      price: rooms.filter((room) => room.type === "double")[0]?.price || 0,
    },
    {
      type: "suite",
      price: rooms.filter((room) => room.type === "suite")[0]?.price || 0,
    },
    {
      type: "deluxe",
      price: rooms.filter((room) => room.type === "deluxe")[0]?.price || 0,
    },
  ];

  const lastReservations = reservations.slice(0, 5);

  return (
    <Container fluid className="mt-2">
      <Row>
        {stats.map((state) => {
          return <StateCard key={state.label} state={state} />;
        })}
      </Row>
      <Row md={2} className="mt-3">
        <Col>
          <SliceChart data={roomStats} colors={PIE_COLORS} />
        </Col>
        <Col>
          <MyBarChart data={roomsType} colors={BAR_COLORS} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Tabella
            reservations={lastReservations}
            guests={guests}
            rooms={rooms}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
