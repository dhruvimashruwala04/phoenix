import { Flex } from "@/imports/core/components/Flex";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import styled from "styled-components";

const InvitationsView = ({ pendingInvites, searchQuery }) => {
  const { updateInvite, removeInvite } = useOnboardingStore();

  const query = (searchQuery || "").trim().toLowerCase();

  const filteredInvites = pendingInvites.filter(
    (invite) =>
      invite.inviteeName?.toLowerCase().includes(query) ||
      invite.inviteeEmail?.toLowerCase().includes(query),
  );

  return (
    <List>
      {filteredInvites.map((invite) => (
        <InvitationRow align="center" gap="14px" key={invite.inviteeEmail}>
          <EmailIcon align="center" justify="center">
            <MailIcon />
          </EmailIcon>

          <InviteInfo direction="column" align="flex-start" gap="3px">
            <Email>{invite.inviteeEmail}</Email>
            <Subtitle>Invited as {invite.inviteeRole} · Just now</Subtitle>
          </InviteInfo>

          <PendingBadge>Pending</PendingBadge>

          <ResendButton type="button">Resend</ResendButton>

          <JoinedButton
            type="button"
            onClick={() => updateInvite(invite.inviteeEmail)}
          >
            Mark joined
          </JoinedButton>

          <RevokeButton
            type="button"
            onClick={() => removeInvite(invite.inviteeEmail)}
          >
            Revoke
          </RevokeButton>
        </InvitationRow>
      ))}
    </List>
  );
};

export default InvitationsView;

// Email icon
const MailIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const List = styled.div`
  width: 100%;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-9);
  overflow: hidden;
  background: var(--white);
`;

const InvitationRow = styled(Flex)`
  min-width: 0;
  min-height: 64px;
  padding: 10px 28px;
  border-bottom: 1px solid var(--surface-muted);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 760px) {
    padding: 14px;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const EmailIcon = styled(Flex)`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  color: #58769b;
  background: #f0f4f9;
  border-radius: var(--radius-full);
`;

const InviteInfo = styled(Flex)`
  flex: 1;
  min-width: 100px;
`;

const Email = styled.div`
  color: var(--text-heading);
  font-size: var(--fs-13);
  font-weight: var(--fw-650);
  overflow-wrap: anywhere;
`;

const Subtitle = styled.div`
  color: var(--gray-500);
  font-size: var(--fs-11);
`;

const PendingBadge = styled.span`
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: var(--radius-4);
  background: var(--indigo-50);
  color: #5554f0;
  font-size: var(--fs-10);
  font-weight: var(--fw-650);
`;

const ResendButton = styled.button`
  height: 33px;
  padding: 0 12px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-6);
  background: var(--white);
  color: var(--text-heading);
  font-size: var(--fs-12);
  cursor: pointer;

  &:hover {
    background: var(--slate-50);
  }
`;

const JoinedButton = styled.button`
  height: 33px;
  padding: 0 13px;
  border: none;
  border-radius: var(--radius-6);
  background: #e8fbf3;
  color: #00966b;
  font-size: var(--fs-12);
  font-weight: var(--fw-650);
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: #d5f7e8;
  }
`;

const RevokeButton = styled.button`
  height: 33px;
  padding: 0 6px;
  border: none;
  background: transparent;
  color: var(--rose-500);
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  cursor: pointer;

  &:hover {
    color: var(--rose-700);
  }
`;
