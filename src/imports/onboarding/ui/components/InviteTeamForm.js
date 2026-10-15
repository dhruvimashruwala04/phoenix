"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Copy, Cross, Link } from "../assets/Icons";
import useOnboardingStore from "../../store/onboardingStore";

const InviteTeamForm = () => {
  const {
    inviteeName,
    inviteeEmail,
    inviteeRole,
    team,
    linkStatus,
    addInvite,
    invites,
    setInviteeName,
    setInviteeEmail,
    setInviteeRole,
    setTeam,
    setLinkStatus,
    removeInvite,
  } = useOnboardingStore();

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://phoenix.app/invite/demo");
  };

  return (
    <Form direction="column" gap="18px">
      <AddRow>
        <NameInput
          value={inviteeName}
          onChange={(e) => setInviteeName(e.target.value)}
          placeholder="Name"
        />
        <EmailInput
          value={inviteeEmail}
          onChange={(e) => setInviteeEmail(e.target.value)}
          placeholder="teammate@company.com"
        />
        <RoleSelect
          value={inviteeRole}
          onChange={(e) => setInviteeRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Viewer">Viewer</option>
        </RoleSelect>
        <StatusSelect
          value={linkStatus}
          onChange={(e) => setLinkStatus(e.target.value)}
        >
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
        </StatusSelect>
        <StatusSelect value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="Design">Design</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Marketing">Marketing</option>
        </StatusSelect>
        <AddButton type="button" onClick={addInvite}>
          Add
        </AddButton>
      </AddRow>

      <InviteList>
        {invites.length > 0 ? (
          invites.map((invite) => (
            <InviteRow key={invite.inviteeEmail}>
              <Avatar $color={invite.color}>{invite.initials}</Avatar>
              <MemberName>{invite.inviteeName}</MemberName>
              <MemberRole>{invite.inviteeRole}</MemberRole>
              <MemberStatus $status={invite.linkStatus}>
                {invite.linkStatus}
              </MemberStatus>

              <RemoveButton
                type="button"
                onClick={() => removeInvite(invite.inviteeEmail)}
              >
                <Cross />
              </RemoveButton>
            </InviteRow>
          ))
        ) : (
          <EmptyText>No one added yet.</EmptyText>
        )}
      </InviteList>

      <InviteLinkBox>
        <Link />
        <LinkText>Anyone with the link can join as a Member</LinkText>

        <CopyButton type="button" onClick={copyInviteLink}>
          <Copy />
          Copy invite link
        </CopyButton>
      </InviteLinkBox>
    </Form>
  );
};

export default InviteTeamForm;

const Form = styled(Flex)`
  width: 100%;
`;
const AddRow = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
const NameInput = styled.input`
  flex: 1;
  min-width: 100px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dce3ed;
  border-radius: 7px;
  outline: none;
  color: #172033;
  background: white;
  font-size: 13px;

  &:focus {
    border-color: var(--blue-accent);
  }

  &::placeholder {
    color: #8a919b;
  }
`;
const EmailInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dce3ed;
  border-radius: 7px;
  outline: none;
  color: #172033;
  background: white;
  font-size: 13px;
  &:focus {
    border-color: var(--blue-accent);
  }
  &::placeholder {
    color: #8a919b;
  }
`;
const StatusSelect = styled.select`
  width: 105px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #dce3ed;
  border-radius: 7px;
  outline: none;
  color: #172033;
  background: white;
  font-size: 13px;
`;
const RoleSelect = styled.select`
  width: 94px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #dce3ed;
  border-radius: 7px;
  outline: none;
  color: #172033;
  background: white;
  font-size: 13px;
`;
const AddButton = styled.button`
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 7px;
  background-color: var(--blue-accent);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #463bd1;
  }
`;
const InviteList = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;
const InviteRow = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border-radius: 9px;
  background-color: #f8fafc;
`;
const Avatar = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  color: white;
  font-size: 10px;
  font-weight: 600;
`;
const MemberName = styled.span`
  flex: 1;
  color: #172033;
  font-size: 13px;
  font-weight: 500;
`;
const MemberStatus = styled.div`
  min-width: 70px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;

  background-color: ${({ $status }) =>
    $status === "accepted" ? "#ecfdf5" : "#fff7ed"};

  color: ${({ $status }) => ($status === "accepted" ? "#059669" : "#ea580c")};
`;
const MemberRole = styled.div`
  min-width: 82px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border: 1px solid #dce3ed;
  border-radius: 6px;
  background: white;
  color: #172033;
  font-size: 12px;
`;
const RemoveButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 21px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    color: #475569;
  }
`;
const InviteLinkBox = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid #dce3ed;
  border-radius: 9px;
  background: white;
`;
const LinkText = styled.span`
  flex: 1;
  color: #526174;
  font-size: 13px;
`;
const CopyButton = styled.button`
  height: 34px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 11px;
  border: none;
  border-radius: 7px;
  background-color: #eef0ff;
  color: var(--blue-accent);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #e4e5ff;
  }
`;
const EmptyText = styled.span`
  font-size: 12px;
  color: rgb(148, 163, 184);
  padding: 8px 0px;
`;
