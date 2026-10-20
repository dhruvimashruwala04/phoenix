"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Activate, Deactivate, Remove } from "../assets/Icons";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";

const MembersView = ({
  selected,
  changeInviteeRole,
  teamFilter,
  toggleSelected,
  toggleAll,
  searchQuery,
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

  const query = (searchQuery || "").trim().toLowerCase();

  const filteredMembers = teamFilter.filter((member) => {
    return (
      member.inviteeName?.toLowerCase().includes(query) ||
      member.inviteeEmail?.toLowerCase().includes(query)
    );
  });

  return (
    <GridContainer>
      <GridHeader>
        <CheckboxCell align="center">
          <CheckBox
            type="checkbox"
            checked={
              filteredMembers.filter((member) => !member.you).length > 0 &&
              filteredMembers
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
      {filteredMembers.map((member, i) => (
        <MemberRow key={i}>
          <CheckboxCell align="center">
            <CheckBox
              type="checkbox"
              disabled={member.you}
              checked={selected.includes(member.inviteeEmail)}
              onChange={() => toggleSelected(member.inviteeEmail)}
            />
          </CheckboxCell>
          <MemberCell align="center" gap="12px">
            <Avatar align="center" justify="center" $color={member.color}>
              {member.initials} <OnlineIndicator $online={member.online} />
            </Avatar>
            <MemberInfo>
              <NameLine align="center" gap="6px">
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
          <StatusCell align="center">
            <StatusBadge $active={member.status === "Active"}>
              {member.status}
            </StatusBadge>
          </StatusCell>
          <LastActive>12 min ago</LastActive>
          <Actions align="center" gap="12px">
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
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-13);
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
  border-bottom: 1px solid var(--border-soft);
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
  border-bottom: 1px solid var(--slate-100);
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background: #fcfdff;
  }
`;
const CheckboxCell = styled(Flex)``;
const CheckBox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1.5px solid var(--slate-300);
  border-radius: var(--radius-4);
  background: var(--white);
  cursor: pointer;
  flex-shrink: 0;
  &:checked {
    background: var(--blue-accent);
    border-color: var(--blue-accent);
  }
  &:checked::after {
    content: "✓";
    display: block;
    color: var(--white);
    text-align: center;
    font-size: var(--fs-11);
    line-height: var(--lh-14);
  }
`;
const ColumnLabel = styled.span`
  color: var(--text-muted-2);
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  letter-spacing: var(--ls-sm);
  text-align: ${({ $right }) => ($right ? "right" : "left")};
`;
const MemberCell = styled(Flex)`
  min-width: 0;
`;
const Avatar = styled(Flex)`
  position: relative;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background: ${({ $color }) => $color};
  color: var(--white);
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
`;
const OnlineIndicator = styled.span`
  position: absolute;
  right: -2px;
  bottom: -1px;
  width: 11px;
  height: 11px;
  border: 2px solid var(--white);
  border-radius: var(--radius-full);
  background: ${({ $online }) => ($online ? "#00c781" : "var(--slate-300)")};
`;
const MemberInfo = styled.div`
  min-width: 0;
`;
const NameLine = styled(Flex)`
  min-width: 0;
`;
const MemberName = styled.span`
  overflow: hidden;
  color: var(--slate-900);
  font-size: var(--fs-12);
  font-weight: var(--fw-650);
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const YouBadge = styled.span`
  padding: 1px 4px;
  border-radius: var(--radius-3);
  background: var(--slate-100);
  color: var(--text-muted);
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
`;
const Email = styled.div`
  overflow: hidden;
  color: var(--text-muted);
  font-size: var(--fs-10);
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const TeamName = styled.span`
  color: var(--slate-600);
  font-size: var(--fs-12);
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
  border-radius: var(--radius-6);
  background: var(--white);
  color: var(--slate-900);
  font-size: var(--fs-12);
  &:disabled {
    background: var(--white);
    color: var(--text-muted-2);
    cursor: not-allowed;
  }
`;
const StatusCell = styled(Flex)``;
const StatusBadge = styled.span`
  padding: 3px 7px;
  border-radius: var(--radius-4);
  background: ${({ $active }) => ($active ? "#e5fbf2" : "var(--slate-100)")};
  color: ${({ $active }) => ($active ? "#009b70" : "var(--text-muted)")};
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
`;
const LastActive = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-11);
`;
const Actions = styled(Flex)``;
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  &:hover {
    color: var(--slate-700);
  }
`;
const RemoveButton = styled(ActionButton)`
  color: #ff365d;
  &:hover {
    color: var(--rose-600);
  }
`;
