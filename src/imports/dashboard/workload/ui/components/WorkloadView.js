import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";

const WorkloadView = ({
  getCapacity,
  getStatus,
  members,
  handleLeftClick,
  handleRightClick,
  searchQuery,
}) => {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  const query = searchQuery.trim().toLowerCase();

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(query),
  );

  return (
    <Wrapper direction="column" gap="0">
      <HeaderRow>
        <Header align="center">MEMBER</Header>

        {days.map((day) => (
          <Header align="center" justify="center" key={day}>
            {day}
          </Header>
        ))}

        <Header align="center">WEEK CAPACITY</Header>
      </HeaderRow>

      {filteredMembers.map((member, m_idx) => {
        const total = getCapacity(member.hours);
        const percentage = Math.round((total / 40) * 100);

        return (
          <MemberRow key={m_idx}>
            <Member align="center" gap="10px">
              <Avatar align="center" justify="center" $color={member.avatar}>
                {member.initials}
              </Avatar>

              <Flex direction="column" gap="2px">
                <Name>{member.name}</Name>
                <Role>{member.team}</Role>
              </Flex>
            </Member>

            {member.hours.map((hour, h_idx) => (
              <HourCell
                align="center"
                justify="center"
                key={h_idx}
                $status={getStatus(hour)}
                onClick={() => handleLeftClick(m_idx, h_idx)}
                onContextMenu={(e) => handleRightClick(e, m_idx, h_idx)}
              >
                {hour}h
              </HourCell>
            ))}

            <Capacity direction="column" justify="center" gap="7px">
              <CapacityTop align="center" justify="space-between" gap="6px">
                <CapacityText $percentage={percentage}>
                  {total}h / 40h
                </CapacityText>

                <Percentage>{percentage}%</Percentage>
              </CapacityTop>

              <ProgressTrack>
                <ProgressFill
                  $percentage={Math.min(percentage, 100)}
                  $per={percentage}
                />
              </ProgressTrack>
            </Capacity>
          </MemberRow>
        );
      })}
    </Wrapper>
  );
};

export default WorkloadView;

const Wrapper = styled(Flex)`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  background: #ffffff;
  box-shadow: 0 2px 5px rgb(15 23 42 / 4%);
`;
const gridColumns = `
  minmax(235px, 1.65fr)
  repeat(5, minmax(90px, 1fr))
  minmax(160px, 1.35fr)
`;
const HeaderRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${gridColumns};
  min-width: 900px;
`;
const MemberRow = styled.div`
  display: grid;
  grid-template-columns: ${gridColumns};
  min-width: 900px;
  min-height: 65px;
  align-items: center;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid #f0f2f6;
  }
`;
const Header = styled(Flex)`
  min-height: 35px;
  padding: 0 12px;
  border-bottom: 1px solid #edf0f5;
  color: #8b9bb4;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  white-space: nowrap;
`;
const Member = styled(Flex)`
  min-width: 0;
  padding: 10px 12px;
`;
const Avatar = styled(Flex)`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
`;
const Name = styled.span`
  color: #172033;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;
const Role = styled.span`
  color: #64748b;
  font-size: 11px;
  white-space: nowrap;
`;
const HourCell = styled(Flex)`
  min-width: 0;
  min-height: 40px;
  margin: 5px;
  border-radius: 8px;
  background: ${({ $status }) =>
    $status === "high"
      ? "#fecdd3"
      : $status === "medium"
        ? "#fef3c7"
        : "#d1fae5"};

  color: ${({ $status }) =>
    $status === "high"
      ? "#be123c"
      : $status === "medium"
        ? "#c2410c"
        : "#047857"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
const Capacity = styled(Flex)`
  min-width: 0;
  padding: 8px 12px;
`;
const CapacityTop = styled(Flex)`
  min-width: 0;
`;
const CapacityText = styled.span`
  color: ${({ $percentage }) =>
    $percentage >= 101 ? "#f43f5e" : $percentage >= 80 ? "#f97316" : "#00a878"};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;
const Percentage = styled.span`
  color: #8b9bb4;
  font-size: 10px;
  white-space: nowrap;
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 10px;
  background: #edf2f8;
`;
const ProgressFill = styled.div`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: inherit;
  background: ${({ $per }) =>
    $per >= 101 ? "#f43f5e" : $per >= 80 ? "#f97316" : "#00a878"};
`;
