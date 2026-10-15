"use client";
import styled from "styled-components";
import { Activate, Deactivate, Remove } from "../assets/Icons";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import { useState } from "react";

const MembersView = ({
  selected,
  changeInviteeRole,
  teamFilter,
  toggleSelected,
  toggleAll,
}) => {
  const { removeInvite, updateInvite } = useOnboardingStore();

  const columns = [
    "MEMBER",
    "TEAM",
    "ACCESS",
    "STATUS",
    "LAST ACTIVE",
    "ACTIONS",
  ];

  return (
    <GridContainer>
      <GridHeader>
        <CheckboxCell>
          <CheckBox
            type="checkbox"
            checked={
              teamFilter.filter((member) => !member.you).length > 0 &&
              teamFilter
                .filter((member) => !member.you)
                .every((member) => selected.includes(member.inviteeEmail))
            }
            onChange={toggleAll}
          />
        </CheckboxCell>
        {columns.map((column, i) => (
          <ColumnLabel key={i}>{column}</ColumnLabel>
        ))}
      </GridHeader>
      {teamFilter.map((member, i) => (
        <MemberRow key={i}>
          <CheckboxCell>
            <CheckBox
              type="checkbox"
              disabled={member.you}
              checked={selected.includes(member.inviteeEmail)}
              onChange={() => toggleSelected(member.inviteeEmail)}
            />
          </CheckboxCell>
          <MemberCell>
            <Avatar $color={member.color}>
              {member.initials} <OnlineIndicator $online={member.online} />
            </Avatar>
            <MemberInfo>
              <NameLine>
                <MemberName>{member.inviteeName}</MemberName>
                {member.you && <YouBadge>YOU</YouBadge>}
              </NameLine>
              <Email>{member.inviteeEmail}</Email>
            </MemberInfo>
          </MemberCell>
          <TeamName>{member.team}</TeamName>
          <AccessCell>
            <AccessSelect
              value={member.inviteeRole}
              disabled={member.you}
              onChange={(e) =>
                changeInviteeRole(member.inviteeEmail, e.target.value)
              }
            >
              <option>Owner</option> <option>Admin</option>
              <option>Member</option> <option>Viewer</option>
            </AccessSelect>
          </AccessCell>
          <StatusCell>
            <StatusBadge $active={member.status === "Active"}>
              {member.status}
            </StatusBadge>
          </StatusCell>
          <LastActive>12 min ago</LastActive>
          <Actions>
            <ActionButton
              type="button"
              onClick={() => updateInvite(member.inviteeEmail)}
              disabled={member.you}
            >
              {member.status === "Active" ? <Deactivate /> : <Activate />}
            </ActionButton>
            <RemoveButton
              type="button"
              title="Remove member"
              onClick={() => removeInvite(member.inviteeEmail)}
              disabled={member.you}
            >
              <Remove />
            </RemoveButton>
          </Actions>
        </MemberRow>
      ))}
    </GridContainer>
  );
};

export default MembersView;

const GridContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #fff;
  border: 1px solid #edf1f6;
  border-radius: 13px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
`;
const GridHeader = styled.div`
  display: grid;
  grid-template-columns:
    42px minmax(220px, 1.8fr) minmax(105px, 0.8fr) minmax(110px, 0.85fr)
    minmax(90px, 0.7fr) minmax(125px, 1fr) 80px;
  align-items: center;
  min-width: 850px;
  min-height: 39px;
  padding: 0 20px;
  border-bottom: 1px solid #edf1f6;
`;
const MemberRow = styled.div`
  display: grid;
  grid-template-columns:
    42px minmax(220px, 1.8fr) minmax(105px, 0.8fr) minmax(110px, 0.85fr)
    minmax(90px, 0.7fr) minmax(125px, 1fr) 80px;
  align-items: center;
  min-width: 850px;
  min-height: 59px;
  padding: 0 20px;
  border-bottom: 1px solid #f1f5f9;
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background: #fcfdff;
  }
`;
const CheckboxCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const CheckBox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1.5px solid #cbd5e1;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  flex-shrink: 0;
  &:checked {
    background: #5145ed;
    border-color: #5145ed;
  }
  &:checked::after {
    content: "✓";
    display: block;
    color: #fff;
    text-align: center;
    font-size: 11px;
    line-height: 14px;
  }
`;
const ColumnLabel = styled.span`
  color: #94a3b8;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.25px;
  text-align: ${({ $right }) => ($right ? "right" : "left")};
`;
const MemberCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;
const Avatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`;
const OnlineIndicator = styled.span`
  position: absolute;
  right: -2px;
  bottom: -1px;
  width: 11px;
  height: 11px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: ${({ $online }) => ($online ? "#00c781" : "#cbd5e1")};
`;
const MemberInfo = styled.div`
  min-width: 0;
`;
const NameLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;
const MemberName = styled.span`
  overflow: hidden;
  color: #0f172a;
  font-size: 12px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const YouBadge = styled.span`
  padding: 1px 4px;
  border-radius: 3px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 9px;
  font-weight: 700;
`;
const Email = styled.div`
  overflow: hidden;
  color: #64748b;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const TeamName = styled.span`
  color: #475569;
  font-size: 12px;
`;
const AccessCell = styled.div`
  min-width: 0;
`;
const AccessSelect = styled.select`
  width: 100%;
  max-width: 100px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid #dce4ee;
  border-radius: 6px;
  background: #fff;
  color: #0f172a;
  font-size: 12px;
  &:disabled {
    background: #fff;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;
const StatusCell = styled.div`
  display: flex;
  align-items: center;
`;
const StatusBadge = styled.span`
  padding: 3px 7px;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#e5fbf2" : "#f1f5f9")};
  color: ${({ $active }) => ($active ? "#009b70" : "#64748b")};
  font-size: 10px;
  font-weight: 700;
`;
const LastActive = styled.span`
  color: #64748b;
  font-size: 11px;
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 0;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  &:hover {
    color: #334155;
  }
`;
const RemoveButton = styled(ActionButton)`
  color: #ff365d;
  &:hover {
    color: #e11d48;
  }
`;
