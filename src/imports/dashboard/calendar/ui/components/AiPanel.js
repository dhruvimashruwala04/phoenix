"use client";
import { Flex } from "@/imports/core/components/Flex";
import styled from "styled-components";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import useCalendarStore from "../../store/calendarStore";
import { categories } from "../../api/constants";
import formatDate from "@/imports/core/utils/formatDate";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import useAuthStore from "@/imports/auth/store/authStore";
import { Chevron } from "../assets/Icons";

const isSameDay = (a, b) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const AiPanel = ({ onCalendarReady, onDateChange, selectedDate }) => {
  const { events } = useCalendarStore();
  const { tasks } = useKanbanStore();
  const { user } = useAuthStore();

  const eventsByDate = events.reduce((result, event) => {
    const start = event.startTime || event.start;
    if (!start) return result;
    const date = new Date(start);
    const dateKey = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    const category = categories.find((item) => item.label === event.category);
    if (!result[dateKey]) result[dateKey] = [];
    if (category) result[dateKey].push(category.color);
    return result;
  }, {});

  return (
    <Panel direction="column" gap="28px">
      <CalendarSection>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next",
          }}
          height="auto"
          fixedWeekCount={false}
          dayHeaderFormat={{ weekday: "narrow" }}
          showNonCurrentDates={true}
          datesSet={(info) => {
            onCalendarReady?.(info.view.calendar);
            onDateChange?.(info.view.calendar.getDate());
          }}
          dateClick={(info) => {
            onDateChange?.(info.date);
          }}
          buttons={{
            prev: {
              display: "icon",
              iconContent: () => <Chevron direction="left" />,
            },
            next: {
              display: "icon",
              iconContent: () => <Chevron direction="right" />,
            },
          }}
          toolbarClass="mini-toolbar"
          toolbarTitleClass="mini-title"
          buttonClass="mini-nav-btn"
          toolbarSectionClass="mini-toolbar-section"
          dayHeaderClass="mini-weekday"
          dayHeaderInnerClass="mini-weekday-inner"
          dayCellTopClass="mini-day-top"
          dayCellClass={(info) =>
            [
              "mini-day",
              info.isOther && "mini-day-other",
              info.isToday && "mini-day-today",
              isSameDay(info.date, selectedDate) && "mini-day-selected",
            ]
              .filter(Boolean)
              .join(" ")
          }
          dayCellTopInnerClass="mini-day-top-inner"
          events={[]}
          dayCellTopContent={(info) => {
            const date = info.date;

            const dateKey = [
              date.getFullYear(),
              String(date.getMonth() + 1).padStart(2, "0"),
              String(date.getDate()).padStart(2, "0"),
            ].join("-");

            const colors = [...new Set(eventsByDate[dateKey] || [])].slice(
              0,
              3,
            );

            return (
              <div className="mini-day-content">
                <span className="mini-day-number">{info.dayNumberText}</span>

                <div className="mini-event-dots">
                  {colors.map((color, index) => (
                    <span
                      key={`${dateKey}-${index}`}
                      className="mini-event-dot"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            );
          }}
        />
      </CalendarSection>

      <ContentSection>
        <SectionHeading align="center" justify="space-between" gap="8px">
          <SectionTitle>Upcoming Events</SectionTitle>
          <TextButton type="button">View all</TextButton>
        </SectionHeading>
        <EventList direction="column" align="stretch" gap="14px">
          {events.slice(0, 3).map((event) => (
            <EventRow gap="10px" key={event.id}>
              <EventDot
                $color={
                  categories.find(
                    (category) => category.label === event.category,
                  )?.color || "#94a3b8"
                }
              />
              <EventInfo>
                <EventName>{event.title}</EventName>
                <EventTime>
                  {formatDate(event.startTime.split("T")[0])} •{" "}
                  {event.startTime.split("T")[1]}
                </EventTime>
              </EventInfo>
              {event.extra ? (
                <EventBadge>{event.extra}</EventBadge>
              ) : (
                <EventBadge>−</EventBadge>
              )}
            </EventRow>
          ))}
        </EventList>
      </ContentSection>

      <ContentSection>
        <SectionHeading align="center" justify="space-between" gap="8px">
          <SectionTitle>My Tasks</SectionTitle>
          <TextButton type="button">View all</TextButton>
        </SectionHeading>
        <TaskList direction="column" align="stretch" gap="11px">
          {tasks
            .filter((task) => task.assignee === user.name)
            .slice(0, 3)
            .map((task) => (
              <TaskRow key={task.id}>
                <TaskCheckbox
                  type="checkbox"
                  checked={Boolean(task.completed)}
                  onChange={() => console.log("toggle")}
                  aria-label={`Complete ${task.title}`}
                />
                <TaskName $completed={task.completed}>{task.title}</TaskName>
                <Priority $priority={task.priority}>{task.priority}</Priority>
              </TaskRow>
            ))}
        </TaskList>
        <AddTaskForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <AddTaskInput
            // value={newTask}
            onChange={(e) => {}}
            placeholder="+ Add Task"
            aria-label="New task"
          />
          <AddTaskButton type="submit">Add</AddTaskButton>
        </AddTaskForm>
      </ContentSection>

      <AssistantCard>
        <AssistantHeading align="center" gap="8px">
          <SectionTitle>AI Schedule Assistant</SectionTitle>
          <BetaBadge>BETA</BetaBadge>
        </AssistantHeading>
        <AssistantInner>
          <SuccessRow align="center" gap="9px">
            <SuccessIcon>✓</SuccessIcon>
            <SuccessText>Your schedule looks good!</SuccessText>
          </SuccessRow>
          <AssistantDescription>
            No conflicts found. You have 2.5h focus time tomorrow.
          </AssistantDescription>
          <OptimizeButton type="button">Optimize My Schedule</OptimizeButton>
        </AssistantInner>
      </AssistantCard>
    </Panel>
  );
};

export default AiPanel;

const Panel = styled(Flex)`
  width: 320px;
  flex-shrink: 0;
  background: rgb(255, 255, 255);
  padding: 24px;
  height: 100vh;
  @media (max-width: 1280px) {
    display: none;
  }
`;
const CalendarSection = styled.section`
  margin-bottom: 32px;
  width: 100%;

  && .mini-toolbar {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 12px;
  }
  && .mini-toolbar-section {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 4px;
  }
  && .mini-title {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }
  && .mini-nav-btn {
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  && .mini-nav-btn:hover {
    background: #f1f5f9;
    color: #4f46e5;
  }
  && .mini-weekday {
    padding: 4px 0 7px;
    color: #64748b;
    font-size: 10px;
    font-weight: 600;
    text-align: center;
  }
  && .mini-weekday,
  && .mini-weekday-inner,
  && .mini-day-top {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  && .mini-weekday-inner {
    width: 27px;
    margin: 0 auto;
  }
  && .mini-day {
    cursor: pointer;
  }
  && .mini-day-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    margin: 2px auto;
    border-radius: 50%;
    color: #0f172a;
    font-size: 11px;
  }
  && .mini-day:hover .mini-day-number {
    background: #f1f0ff;
  }
  && .mini-day-other .mini-day-number {
    color: #cbd5e1;
  }
  && .mini-day-today .mini-day-number {
    color: #5145ed;
    font-weight: 700;
  }
  && .mini-day-selected .mini-day-number,
  && .mini-day-selected:hover .mini-day-number {
    background: #5145ed;
    color: #fff;
  }
  && .mini-day-top-inner {
    display: flex !important;
    justify-content: center !important;
    width: 100%;
  }

  && .mini-day-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 38px;
  }

  && .mini-day-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    margin: 2px auto 0;
    border-radius: 50%;
    font-size: 11px;
  }

  && .mini-event-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    min-height: 5px;
    margin-top: 2px;
  }

  && .mini-event-dot {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;
const SectionHeading = styled(Flex)`
  margin-bottom: 14px;
`;
const ContentSection = styled.section`
  margin-bottom: 30px;
  width: 100%;
`;
const SectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
`;
const TextButton = styled.button`
  padding: 3px 0;
  border: 0;
  background: transparent;
  color: #5145ff;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #3730a3;
  }
`;
const EventList = styled(Flex)``;
const EventRow = styled(Flex)`
  min-width: 0;
`;
const EventDot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 5px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
const EventInfo = styled.div`
  flex: 1;
  min-width: 0;
`;
const EventName = styled.div`
  overflow: hidden;
  color: #0f172a;
  font-size: 12px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const EventTime = styled.div`
  margin-top: 3px;
  color: #64748b;
  font-size: 10px;
`;
const EventBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 20px;
  height: 17px;
  padding: 0 5px;
  border-radius: 12px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 10px;
`;
const TaskList = styled(Flex)``;
const TaskRow = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  cursor: pointer;
`;
const TaskCheckbox = styled.input`
  appearance: none;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1.5px solid #cbd5e1;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  &:checked {
    border-color: #5145ed;
    background: #5145ed;
  }
  &:checked::after {
    display: block;
    content: "✓";
    color: #fff;
    font-size: 11px;
    text-align: center;
    line-height: 14px;
  }
`;
const TaskName = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: #334155;
  font-size: 12px;
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  opacity: ${({ $completed }) => ($completed ? 0.55 : 1)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Priority = styled.span`
  flex-shrink: 0;
  padding: 2px 5px;
  border-radius: 4px;
  background: ${({ $priority }) =>
    $priority === "High" ? "#f0efff" : "#fff4e5"};
  color: ${({ $priority }) => ($priority === "High" ? "#5145ed" : "#c77716")};
  font-size: 9px;
  font-weight: 600;
`;
const AddTaskForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 0 25px;
`;
const AddTaskInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 3px 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #334155;
  font: inherit;
  font-size: 12px;
  &::placeholder {
    color: #64748b;
    opacity: 1;
  }
`;
const AddTaskButton = styled.button`
  border: 0;
  background: transparent;
  color: #5145ed;
  font-size: 11px;
  cursor: pointer;
`;
const AssistantCard = styled.section`
  padding: 16px;
  border: 1px solid #edf0f5;
  border-radius: 14px;
  background: #f8fafc;
  width: 100%;
`;
const AssistantHeading = styled(Flex)`
  flex-wrap: wrap;
  margin-bottom: 12px;
`;
const BetaBadge = styled.span`
  padding: 3px 5px;
  border-radius: 4px;
  background: #eeedff;
  color: #5145ed;
  font-size: 9px;
  font-weight: 700;
`;
const AssistantInner = styled.div`
  padding: 13px;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  background: #fff;
`;
const SuccessRow = styled(Flex)``;
const SuccessIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #d1fae5;
  color: #059669;
  font-size: 12px;
  font-weight: 700;
`;
const SuccessText = styled.span`
  color: #059669;
  font-size: 11px;
  font-weight: 700;
`;
const AssistantDescription = styled.p`
  margin: 10px 0 12px 29px;
  color: #64748b;
  font-size: 10px;
  line-height: 1.6;
`;
const OptimizeButton = styled.button`
  width: 100%;
  min-height: 33px;
  padding: 7px 8px;
  border: 1px solid #c7c5ff;
  border-radius: 8px;
  background: #fff;
  color: #5145ed;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
  &:hover {
    background: #f5f3ff;
  }
`;
