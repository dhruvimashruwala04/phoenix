import { Flex } from "@/imports/core/components/Flex";
import getInitials from "@/imports/core/utils/getInitials";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import React from "react";
import styled from "styled-components";

const RequestView = ({ requests, setRequests }) => {
  const { addStaticInvite } = useOnboardingStore();

  return (
    <List>
      {requests.map((invite, i) => (
        <InvitationRow align="center" gap="14px" key={i}>
          <Avatar align="center" justify="center">
            {getInitials(invite.name)}
          </Avatar>

          <InviteInfo direction="column" align="flex-start" gap="3px">
            <Email>
              {invite.name} <Muted>wants to join</Muted>
            </Email>
            <Subtitle>
              {invite.email} · {invite.team} · requested yesterday
            </Subtitle>
          </InviteInfo>

          <ApproveButton
            type="button"
            onClick={() => {
              addStaticInvite(invite);
              setRequests((prev) =>
                prev.filter((r) => r.email !== invite.email),
              );
            }}
          >
            Approve
          </ApproveButton>

          <DenyButton
            type="button"
            onClick={() =>
              setRequests((prev) =>
                prev.filter((r) => r.email !== invite.email),
              )
            }
          >
            Deny
          </DenyButton>
        </InvitationRow>
      ))}
    </List>
  );
};

export default RequestView;

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
const Avatar = styled(Flex)`
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
  color: var(--white);
  background: var(--amber-500);
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
const Muted = styled.span`
  font-weight: var(--fw-400);
  color: var(--text-muted);
`;
const ApproveButton = styled.button`
  height: 32px;
  padding: 0px 14px;
  border-radius: var(--radius-8);
  border: 0px;
  background: var(--blue-accent);
  color: var(--white);
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  cursor: pointer;
`;
const DenyButton = styled.button`
  height: 32px;
  padding: 0px 14px;
  border-radius: var(--radius-8);
  border: 0px;
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  font-size: var(--fs-12);
  cursor: pointer;
`;
