"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Play, Trash } from "@/imports/core/assets/Icons";
import { projects } from "@/imports/dashboard/kanban/api/constants";

const TodayEntries = ({ records, formatTime, handleDelete }) => {
  const getTime = (dateString) => {
    return dateString.split("T")[1].slice(0, 5);
  };

  const getProj = (proj) => {
    return projects.find((p) => p.value === proj)?.label;
  };

  return (
    <Container>
      <Header>Today's entries</Header>

      {records.map((entry) => (
        <EntryRow key={entry.id} justify="space-between">
          <EntryDetails>
            <EntryTitle>{entry.title || "Untitled entry"}</EntryTitle>

            <EntrySubtitle>
              {getProj(entry.project)} · {getTime(entry.startTime)} -{" "}
              {getTime(entry.endTime)}
            </EntrySubtitle>
          </EntryDetails>

          <Actions gap="12px" align="center">
            <Duration>{formatTime(entry.duration)}</Duration>
            <PlayButton align="center" justify="center">
              <Play size={12} />
            </PlayButton>
            <DeleteButton
              align="center"
              justify="center"
              onClick={() => handleDelete(entry.id)}
            >
              <Trash size={16} />
            </DeleteButton>
          </Actions>
        </EntryRow>
      ))}

      {records.length === 0 && <NoEntries>No entries for today</NoEntries>}
    </Container>
  );
};

export default TodayEntries;

const Container = styled.div`
  width: 100%;
  background: var(--background);
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  overflow: hidden;
`;
const Header = styled.div`
  padding: 16px 20px;
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-soft);
`;
const EntryRow = styled(Flex)`
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-soft);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--background-hover);
  }
`;
const EntryDetails = styled(Flex)`
  min-width: 0;
  flex-direction: column;
  gap: 3px;
`;
const Actions = styled(Flex)``;

const EntryTitle = styled.div`
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  color: var(--text-primary);
`;
const EntrySubtitle = styled.div`
  font-size: var(--fs-11);
  color: var(--text-muted);
`;
const Duration = styled.div`
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  color: var(--text-primary);
  white-space: nowrap;
`;
const PlayButton = styled(Flex)`
  width: 30px;
  height: 30px;
  background: rgb(245, 243, 255);
  color: var(--violet-600);
  border-radius: 8px;
  cursor: pointer;
`;
const DeleteButton = styled(Flex)`
  width: 30px;
  height: 30px;
  color: var(--text-muted);
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    color: #ef4444;
  }
`;
const NoEntries = styled.div`
  padding: 16px 20px;
  font-size: var(--fs-13);
  color: var(--text-muted);
  text-align: center;
`;
