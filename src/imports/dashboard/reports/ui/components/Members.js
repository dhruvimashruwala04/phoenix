"use client";
import { Flex } from "@/imports/core/components/Flex";
import getInitials from "@/imports/core/utils/getInitials";
import { Sort } from "@/imports/dashboard/ui/assets/Icons";
import React from "react";
import styled from "styled-components";

const Members = ({ sortedMembers, sortBy, setSortBy }) => {
  const columns = [
    "MEMBER",
    "COMPLETED",
    "ON-TIME",
    "AVG CYCLE",
    "SHARE OF OUTPUT",
  ];

  return (
    <Container direction="column">
      <TopBar align="center" justify="space-between">
        <Heading>Team performance</Heading>

        <SortButton
          onClick={() => {
            if (sortBy === "Completed") {
              setSortBy("On Time");
            } else if (sortBy === "On Time") {
              setSortBy("Name");
            } else {
              setSortBy("Completed");
            }
          }}
        >
          Sort: <strong>{sortBy}</strong> <Sort />
        </SortButton>
      </TopBar>

      <TableWrapper>
        <HeaderRow>
          {columns.map((c) => (
            <HeaderCell key={c}>{c}</HeaderCell>
          ))}
        </HeaderRow>

        {sortedMembers.map((member) => {
          const onTime = Math.floor(Math.random() * 41) + 60;
          const cycle = Math.floor(Math.random() * 10);

          return (
            <MemberRow key={member.name}>
              <MemberInfo align="center" gap="10px">
                <Avatar align="center" justify="center" $color={"blue"}>
                  {getInitials(member.name)}
                </Avatar>

                <MemberDetails direction="column" gap="2px">
                  <Name>{member.name}</Name>
                  <Role>abc</Role>
                </MemberDetails>
              </MemberInfo>

              <Completed>{member.completed}</Completed>
              <OnTime $value={onTime}>{onTime}%</OnTime>
              <Cycle>{cycle} days</Cycle>

              <ShareCell align="center" gap="8px">
                <ProgressTrack>
                  <ProgressFill $value={member.share} />
                </ProgressTrack>

                <ShareValue>{member.share}%</ShareValue>
              </ShareCell>
            </MemberRow>
          );
        })}
      </TableWrapper>
    </Container>
  );
};

export default Members;

const columns =
  "minmax(230px, 1.5fr) repeat(3, minmax(110px, 1fr)) minmax(210px, 1.2fr)";

const Container = styled(Flex)`
  width: 100%;
  overflow: hidden;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(20, 30, 50, 0.05);
`;
const TopBar = styled(Flex)`
  min-height: 48px;
  padding: 0 20px;
  border-bottom: 1px solid #edf0f5;
  width: 100%;
`;
const Heading = styled.span`
  color: var(--slate-700);
  font-size: var(--fs-14);
  font-weight: var(--fw-700);
`;
const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
  strong {
    color: #111827;
  }
`;
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: ${columns};
  min-width: 850px;
  min-height: 34px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #edf0f5;
`;
const HeaderCell = styled.span`
  color: #94a3b8;
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
  letter-spacing: 0.4px;
`;
const MemberRow = styled.div`
  display: grid;
  grid-template-columns: ${columns};
  min-width: 850px;
  min-height: 54px;
  align-items: center;
  padding: 0 20px;
  &:not(:last-child) {
    border-bottom: 1px solid #f1f4f8;
  }
`;
const MemberInfo = styled(Flex)``;
const Avatar = styled(Flex)`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: white;
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
`;
const MemberDetails = styled(Flex)``;
const Name = styled.span`
  overflow: hidden;
  color: #172033;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Role = styled.span`
  overflow: hidden;
  color: #64748b;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Completed = styled.span`
  color: #111827;
  font-size: var(--fs-12);
  font-weight: var(--fw-700);
`;
const OnTime = styled.span`
  color: ${({ $value }) =>
    $value >= 90 ? "var(--emerald-500)" : "var(--amber-500)"};
  font-size: var(--fs-12);
  font-weight: var(--fw-700);
`;
const Cycle = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-12);
`;
const ShareCell = styled(Flex)``;
const ProgressTrack = styled(Flex)`
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 10px;
  background: #edf1f7;
`;
const ProgressFill = styled.div`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  border-radius: inherit;
  background: #5146f5;
`;
const ShareValue = styled.span`
  width: 28px;
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 11px;
  text-align: right;
`;
