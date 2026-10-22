"use client";

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useCalendarStore from "@/imports/dashboard/calendar/store/calendarStore";
import { Flex } from "@/imports/core/components/Flex";
import { categories } from "@/imports/dashboard/calendar/api/constants";
import formatDate from "@/imports/core/utils/formatDate";
import { ChevronDown, ChevronUp } from "@/imports/core/assets/Icons";
import formatDateLong from "@/imports/core/utils/formatDateLong";
import formatDateMonth from "@/imports/core/utils/formatDateMonth";

const TimelineView = ({ filter, searchQuery }) => {
  const { events } = useCalendarStore();
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleToggle = (id) => {
    setSelectedEvents((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const query = searchQuery?.trim().toLowerCase();

  const filteredEvents = events
    .filter((event) => {
      const matchesCategory = filter === "All" || event.category === filter;
      const matchesSearch = event.title?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!event.date) return acc;

    const month = formatDateMonth(event.date);
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);

    return acc;
  }, {});

  return (
    <Container direction="column" gap="28px">
      {Object.entries(groupedEvents).map(([month, monthEvents]) => (
        <Timeline key={month}>
          <MonthLabel direction="column" gap="4px">
            <Month>{month}</Month>
            <Count>
              {monthEvents.length} {monthEvents.length === 1 ? "item" : "items"}
            </Count>
          </MonthLabel>

          <Events direction="column" gap="12px">
            {monthEvents.map((event) => {
              const category = categories.find(
                (item) => item.label === event.category,
              );

              const progress = Math.floor(Math.random() * 100) + 1;

              const isSelected = selectedEvents.includes(event.id);
              const eventDate = event.date || event.startTime?.split("T")[0];

              return (
                <EventRow key={event.id}>
                  <Marker $color={category?.color || "#94a3b8"} />

                  <EventCard>
                    <EventHeader
                      type="button"
                      aria-expanded={isSelected}
                      onClick={() => handleToggle(event.id)}
                    >
                      <EventTitle>{event.title}</EventTitle>

                      <EventMeta>
                        <Category
                          $color={category?.color || "#64748b"}
                          $bg={category?.bg || "#f1f5f9"}
                        >
                          {event.category}
                        </Category>

                        <EventDate>{formatDate(eventDate)}</EventDate>

                        {isSelected ? <ChevronUp /> : <ChevronDown />}
                      </EventMeta>
                    </EventHeader>

                    {isSelected && (
                      <EventDetails>
                        {event.title} — scheduled for{" "}
                        {formatDateLong(eventDate)}
                        <ProgressSection align="center" gap="10px">
                          <ProgressTrack>
                            <ProgressFill
                              $progress={progress}
                              $color={category?.color || "#64748b"}
                            />
                          </ProgressTrack>

                          <ProgressLabel>{progress}%</ProgressLabel>
                        </ProgressSection>
                      </EventDetails>
                    )}
                  </EventCard>
                </EventRow>
              );
            })}
          </Events>
        </Timeline>
      ))}

      {filteredEvents.length === 0 && (
        <EmptyState>No timeline items found.</EmptyState>
      )}
    </Container>
  );
};

export default TimelineView;

const Container = styled(Flex)`
  width: 100%;
`;
const Timeline = styled.section`
  display: grid;
  grid-template-columns: 137px minmax(0, 1fr);
  gap: 16px;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
const MonthLabel = styled(Flex)``;
const Month = styled.span`
  font-size: var(--fs-15);
  font-weight: var(--fw-700);
  color: var(--text-heading);
`;
const Count = styled.span`
  font-size: var(--fs-11);
  color: var(--text-muted);
`;
const Events = styled(Flex)`
  position: relative;
  min-width: 0;
  &::before {
    content: "";
    position: absolute;
    left: -18px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: #dce5f0;
  }
  @media (max-width: 600px) {
    &::before {
      left: 8px;
    }
  }
`;
const EventRow = styled.div`
  position: relative;
  min-width: 0;
  width: 100%;
`;
const Marker = styled.span`
  position: absolute;
  left: -24px;
  top: 15px;
  z-index: 1;
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border: 3px solid ${({ $color }) => $color};
  border-radius: 50%;
  background: var(--white);
  @media (max-width: 600px) {
    left: 2px;
  }
`;
const EventCard = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-13);
  background: var(--white);
  box-shadow: 0 1px 2px rgb(15 23 42 / 4%);
`;
const EventHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-height: 43px;
  padding: 10px 14px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: -2px;
  }
  @media (max-width: 500px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
const EventTitle = styled.span`
  min-width: 0;
  color: var(--text-heading);
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  overflow-wrap: anywhere;
`;
const EventMeta = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 12px;

  @media (max-width: 500px) {
    align-self: flex-end;
  }
`;
const Category = styled.span`
  padding: 2px 8px;
  border-radius: var(--radius-4);
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  white-space: nowrap;
`;
const EventDate = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-11);
  white-space: nowrap;
`;
const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 14px 14px;
  color: var(--text-muted);
  font-size: var(--fs-12);
  line-height: 18px;
`;
const ProgressSection = styled(Flex)``;
const ProgressTrack = styled(Flex)`
  flex: 1;
  height: 4px;
  overflow: hidden;
  border-radius: var(--radius-4);
  background: var(--border-soft);
`;
const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: var(--radius-4);
  background: ${({ $color }) => $color};
  transition: width 0.3s ease;
`;
const ProgressLabel = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-10);
`;
const EmptyState = styled.div`
  padding: 36px 16px;
  text-align: center;
  color: var(--text-muted);
  font-size: var(--fs-13);
`;
