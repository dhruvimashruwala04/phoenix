import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";

import breezyTheme from "@fullcalendar/react/themes/breezy";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import listPlugin from "@fullcalendar/react/list";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/breezy/theme.css";
import "@fullcalendar/react/themes/breezy/palettes/indigo.css";

import { categories } from "../../api/constants";
import useCalendarStore from "../../store/CalendarStore";
import { useRef } from "react";

const CalendarView = ({ onCalendarReady, onDateChange, selectedDate }) => {
  const { events, setSelectedEvent, setShowNewEvent } = useCalendarStore();
  const calendarRef = useRef(null);

  const calendarEvents = events.map((event) => ({
    ...event,
    start: event.startTime,
    end: event.endTime,
  }));

  return (
    <Container>
      <FullCalendar
        ref={calendarRef}
        plugins={[
          breezyTheme,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "today,prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,allEvents",
        }}
        headerToolbarClass="header"
        events={calendarEvents}
        buttons={{
          allEvents: {
            text: "Agenda",
          },
        }}
        views={{
          allEvents: {
            type: "list",
            duration: { years: 1 },
            buttonText: "All Events",
          },
        }}
        listDayHeaderContent={(info) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              padding: "8px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: "26px",
                color: "#0f172a",
              }}
            >
              {info.date.getDate()}
            </span>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
                color: "#64748b",
              }}
            >
              {info.date.toLocaleDateString("en-US", { weekday: "short" })},{" "}
              {info.date.toLocaleDateString("en-US", { month: "short" })}
            </span>
          </div>
        )}
        eventClick={(info) => {
          setShowNewEvent(true);
          setSelectedEvent(info.event.id);
        }}
        eventContent={(info) => {
          const category = categories.find(
            (item) => item.label === info.event.extendedProps.category,
          );
          const isListView = info.view.type === "listWeek";
          const formatTime = (date) =>
            date?.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }) || "";

          return (
            <div
              style={{
                display: "flex",
                flexDirection: isListView ? "row-reverse" : "column",
                alignItems: isListView ? "center" : "flex-start",
                height: "100%",
                justifyContent: isListView ? "space-between" : "flex-start",
                gap: "8px",
                backgroundColor: category?.bg,
                color: category?.color,
                borderRadius: "8px",
                padding: isListView ? "10px 12px" : "6px 8px",
                boxShadow: `inset 0 0 0 1px ${category?.color}, inset 3px 0 0 ${category?.color}`,
                overflow: "hidden",
                width: "100%",
              }}
            >
              {isListView && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    flexShrink: 0,
                  }}
                >
                  {category?.label}
                </span>
              )}
              <span
                style={{
                  fontSize: isListView ? "13px" : "11px",
                  fontWeight: 700,
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {info.event.title}
              </span>

              <span
                style={{
                  fontSize: isListView ? "11px" : "9px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {formatTime(info.event.start)} - {formatTime(info.event.end)}
              </span>
            </div>
          );
        }}
        datesSet={(info) => {
          onCalendarReady?.(info.view.calendar);
          onDateChange?.(info.view.calendar.getDate());
        }}
        dateClick={(info) => {
          onDateChange?.(info.date);
        }}
      />
      <Footer>
        {categories.map((i) => (
          <Item key={i.label}>
            <Dot color={i.color} />
            {i.label}
          </Item>
        ))}
      </Footer>
    </Container>
  );
};

export default CalendarView;

const Container = styled.div`
  padding: 0 24px 24px;
  width: 100%;

  .header {
    background-color: transparent;
    & > :nth-child(3) {
      padding: 3px;
      border-radius: 8px;
      box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
      button[aria-selected="true"] {
        background: rgb(238, 242, 255);
        color: rgb(79, 70, 229);
        height: 28px;
        padding: 0px 14px;
      }
      button[aria-selected="false"] {
        height: 28px;
        padding: 0px 14px;
      }
    }
  }

  // remove blue in bg
  && .fc-breezy-uqo.fc-breezy-yg7 {
    background: transparent;
    box-shadow: none;
    padding: 4px;
    height: 100%;
  }

  // remove dot in list view
  && .fc-breezy-5JF.fc-breezy-lNM.fc-breezy-AAA {
    display: none;
  }
  && .event-title {
    display: block;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  && .event-time {
    font-size: 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // Month grid cell hover
  && .fc-Zq > div > div:hover {
    background-color: rgb(250, 250, 255) !important;
    cursor: pointer;
  }

  &&
    .fc-breezy-cJ3.fc-breezy-2rx.fc-breezy-Nca.fc-breezy-PtF.fc-breezy-AAA.fc-breezy-9yp.fc-breezy-mNS {
    display: none !important;
  }
`;
const Footer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  margin-top: 16px;
`;
const Item = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgb(71, 85, 105);
`;
const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;
