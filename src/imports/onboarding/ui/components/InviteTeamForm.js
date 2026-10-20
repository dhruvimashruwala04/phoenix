"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Copy, Link } from "../assets/Icons";
import { Close } from "@/imports/core/assets/Icons";
import useOnboardingStore from "../../store/onboardingStore";
import Input from "@/imports/core/components/Input";

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
      <AddRow align="stretch" gap="8px">
        <Input
          width="100px"
          height="40px"
          value={inviteeName}
          onChange={(e) => setInviteeName(e.target.value)}
          placeholder="Name"
        />
        <Input
          width="100px"
          height="40px"
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

      <InviteList direction="column" gap="8px">
        {invites.length > 0 ? (
          invites.map((invite) => (
            <InviteRow align="center" gap="12px" key={invite.inviteeEmail}>
              <Avatar align="center" justify="center" $color={invite.color}>
                {invite.initials}
              </Avatar>
              <MemberName>{invite.inviteeName}</MemberName>
              <MemberRole align="center" justify="center">
                {invite.inviteeRole}
              </MemberRole>
              <MemberStatus
                align="center"
                justify="center"
                $status={invite.linkStatus}
              >
                {invite.linkStatus}
              </MemberStatus>

              <RemoveButton
                type="button"
                onClick={() => removeInvite(invite.inviteeEmail)}
              >
                <Close />
              </RemoveButton>
            </InviteRow>
          ))
        ) : (
          <EmptyText>No one added yet.</EmptyText>
        )}
      </InviteList>

      <InviteLinkBox align="center" gap="10px">
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
const AddRow = styled(Flex)`
  width: 100%;
`;
const StatusSelect = styled.select`
  width: 105px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-7);
  outline: none;
  color: var(--text-heading);
  background: var(--white);
  font-size: var(--fs-13);
`;
const RoleSelect = styled.select`
  width: 94px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-7);
  outline: none;
  color: var(--text-heading);
  background: var(--white);
  font-size: var(--fs-13);
`;
const AddButton = styled.button`
  width: 60px;
  height: 40px;
  border: none;
  border-radius: var(--radius-7);
  background-color: var(--blue-accent);
  color: var(--white);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  cursor: pointer;
  &:hover {
    background-color: var(--blue-accent-hover);
  }
`;
const InviteList = styled(Flex)`
  width: 100%;
`;
const InviteRow = styled(Flex)`
  width: 100%;
  min-height: 50px;
  padding: 0 12px;
  border-radius: var(--radius-9);
  background-color: var(--slate-50);
`;
const Avatar = styled(Flex)`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background-color: ${({ $color }) => $color};
  color: var(--white);
  font-size: var(--fs-10);
  font-weight: var(--fw-600);
`;
const MemberName = styled.span`
  display: flex;
  flex: 1;
  color: var(--text-heading);
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
`;
const MemberStatus = styled(Flex)`
  min-width: 70px;
  height: 28px;
  padding: 0 8px;
  border-radius: var(--radius-6);
  font-size: var(--fs-11);
  font-weight: var(--fw-600);
  text-transform: capitalize;

  background-color: ${({ $status }) =>
    $status === "accepted" ? "var(--emerald-50)" : "#fff7ed"};

  color: ${({ $status }) =>
    $status === "accepted" ? "var(--emerald-600)" : "#ea580c"};
`;
const MemberRole = styled(Flex)`
  min-width: 82px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-6);
  background: var(--white);
  color: var(--text-heading);
  font-size: var(--fs-12);
`;
const RemoveButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background: transparent;
  color: var(--text-muted-2);
  font-size: 21px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    color: var(--slate-600);
  }
`;
const InviteLinkBox = styled(Flex)`
  width: 100%;
  min-height: 60px;
  padding: 10px 12px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-9);
  background: var(--white);
`;
const LinkText = styled.span`
  flex: 1;
  color: var(--text-secondary);
  font-size: var(--fs-13);
  display: flex;
`;
const CopyButton = styled.button`
  height: 34px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 11px;
  border: none;
  border-radius: var(--radius-7);
  background-color: var(--indigo-50);
  color: var(--blue-accent);
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  cursor: pointer;
  &:hover {
    background-color: #e4e5ff;
  }
`;
const EmptyText = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted-2);
  padding: 8px 0px;
`;
