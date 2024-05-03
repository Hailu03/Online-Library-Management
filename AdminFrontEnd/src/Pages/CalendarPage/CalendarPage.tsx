import React, { useState } from "react";
import { Calendar, Badge } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./calendar.css"; // Import custom CSS file for calendar styles

interface Event {
  type: string;
  content: string;
}

interface Events {
  [key: string]: Event[];
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Events>({
    "2024-04-01": [{ type: "warning", content: "Event 1" }],
    "2024-04-10": [{ type: "success", content: "Quang borrows books for one week" }],
    "2024-04-15": [{ type: "error", content: "Event 3" }],
  });

  const dateCellRender = (value: any) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const eventList = events[formattedDate];

    return (
      <ul className="events">
        {eventList &&
          eventList.map((event: any, index: number) => (
            <li key={index}>
              <Badge status={event.type} text={event.content} />
            </li>
          ))}
      </ul>
    );
  };

  const monthCellRender = (value: any) => {
    return (
      <div className="notes-month">
        <span>Month Notes</span>
        <section>{value.month()}</section>
      </div>
    );
  };

  return (
    <div className="calendarPage">
      <div className="calendar-container">
        <h1 className="calendar-heading">
          <CalendarOutlined /> Calendar Page
        </h1>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
