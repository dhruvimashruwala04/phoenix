import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
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
import useCalendarStore from "../../store/calendarStore";
import { useRef } from "react";

const CalendarView = ({ onCalendarReady, onDateChange, currentProj }) => {
  const { events, setSelectedEvent, setShowNewEvent, searchQuery } =
    useCalendarStore();
  const calendarRef = useRef(null);

  const query = searchQuery.trim().toLowerCase();

  const calendarEvents = events.map((event) => ({
    ...event,
    start: event.startTime,
    end: event.endTime,
  }));

  const filteredEvents = calendarEvents.filter((event) => {
    const matchesQuery = event.title?.toLowerCase().includes(query);

    const matchesProject =
      event.projName === currentProj || currentProj === null;

    return matchesQuery && matchesProject;
  });

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
          left: "today prev,next title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,allEvents",
        }}
        headerToolbarClass="header"
        toolbarSectionClass="cal-toolbar-section"
        toolbarTitleClass="cal-title"
        buttonGroupClass={(info) =>
          info.hasSelection ? "cal-view-switcher" : "cal-nav-group"
        }
        eventClass="cal-event"
        dayCellClass="cal-day"
        listItemEventBeforeClass="cal-list-dot"
        listDayHeaderInnerClass={(info) =>
          info.level
            ? "cal-list-day-sub"
            : info.isToday
              ? "cal-list-day-main cal-list-day-today"
              : "cal-list-day-main"
        }
        events={filteredEvents}
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
                fontSize: "var(--fs-22)",
                fontWeight: "var(--fw-700)",
                lineHeight: "var(--lh-26)",
                color: info.isToday ? "var(--blue-accent)" : "var(--slate-900)",
              }}
            >
              {info.date.getDate()}
            </span>

            <span
              style={{
                fontSize: "var(--fs-12)",
                fontWeight: "var(--fw-400)",
                lineHeight: "var(--lh-16)",
                color: "var(--text-muted)",
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
          const isListView = info.view.type === "allEvents";
          const formatTime = (date) =>
            date?.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }) || "";

          if (isListView) {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-8)",
                  backgroundColor: category?.bg,
                  color: category?.color,
                  boxShadow: `inset 0 0 0 1px ${category?.color}`,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    width: "140px",
                    flexShrink: 0,
                    fontSize: "var(--fs-11)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatTime(info.event.start)} - {formatTime(info.event.end)}
                </span>
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: "var(--fs-13)",
                    fontWeight: "var(--fw-700)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {info.event.title}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "var(--fs-11)",
                    color: "var(--text-muted)",
                  }}
                >
                  {category?.label}
                </span>
              </div>
            );
          }

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "100%",
                justifyContent: "flex-start",
                gap: "8px",
                backgroundColor: category?.bg,
                color: category?.color,
                borderRadius: "var(--radius-8)",
                padding: "6px 8px",
                boxShadow: `inset 0 0 0 1px ${category?.color}, inset 3px 0 0 ${category?.color}`,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "var(--fs-11)",
                  fontWeight: "var(--fw-700)",
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
                  fontSize: "var(--fs-9)",
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
      <Footer align="stretch" gap="20px">
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
  }

  && .cal-toolbar-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  && .cal-title {
    margin: 0 0 0 4px;
    font-size: var(--fs-18);
    font-weight: var(--fw-700);
    color: var(--slate-900);
  }

  && .cal-view-switcher {
    padding: 3px;
    border-radius: var(--radius-8);
    box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
    button[aria-selected="true"] {
      background: var(--indigo-50);
      color: var(--blue-accent);
      height: 28px;
      padding: 0px 14px;
    }
    button[aria-selected="false"] {
      height: 28px;
      padding: 0px 14px;
    }
  }

  && .cal-event {
    background: transparent;
    box-shadow: none;
    padding: 4px;
    height: 100%;
  }

  && .cal-list-dot {
    display: none;
  }
  && .event-title {
    display: block;
    font-size: var(--fs-11);
    font-weight: var(--fw-600);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  && .event-time {
    font-size: var(--fs-9);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  && .cal-day:hover {
    background-color: rgb(250, 250, 255) !important;
    cursor: pointer;
  }

  && .cal-list-day-today,
  && .cal-list-day-today:hover {
    background: transparent !important;
    box-shadow: none !important;
  }

  && .cal-list-day-sub {
    display: none !important;
  }
`;
const Footer = styled(Flex)`
  width: 100%;
  margin-top: 16px;
`;
const Item = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-12);
  color: var(--slate-600);
`;
const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: ${({ color }) => color};
`;
