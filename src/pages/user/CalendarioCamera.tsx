import { parse, startOfWeek, format, getDay } from "date-fns";
import { it } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useParams } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales: { it },
});

const CalendarioCamera = function () {
  const params = useParams();
  const { reservations } = useHotelStore();

  console.log("roomId dai params:", params.roomId);
  console.log("tutte le reservations:", reservations);
  console.log(
    "reservations filtrate:",
    reservations.filter((r) => r.roomId === Number(params.roomId)),
  );

  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // ← locale, non UTC
  };

  const events = reservations
    .filter((r) => r.roomId === Number(params.roomId))
    .map((r) => ({
      id: r.id,
      title: "occupata",
      start: parseDate(r.checkIn),
      end: parseDate(r.checkOut),
    }));

    console.log("date" ,reservations[0].checkIn , reservations[0].checkOut)

  return (
    <div style={{ height: "100vh", padding: "1rem", width: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default CalendarioCamera;
