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
          <Avatar align="center" justify="center">{getInitials(invite.name)}</Avatar>

          <InviteInfo direction="column" align="stretch" gap="3px">
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
  border: 1px solid #edf0f5;
  border-radius: 9px;
  overflow: hidden;
  background: #ffffff;
`;
const InvitationRow = styled(Flex)`
  min-width: 0;
  min-height: 64px;
  padding: 10px 28px;
  border-bottom: 1px solid #f0f2f6;
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
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  background: rgb(245, 158, 11);
`;
const InviteInfo = styled(Flex)`
  flex: 1;
  min-width: 100px;
`;
const Email = styled.div`
  color: #17243a;
  font-size: 13px;
  font-weight: 650;
  overflow-wrap: anywhere;
`;
const Subtitle = styled.div`
  color: #718096;
  font-size: 11px;
`;
const Muted = styled.span`
  font-weight: 400;
  color: rgb(100, 116, 139);
`;
const ApproveButton = styled.button`
  height: 32px;
  padding: 0px 14px;
  border-radius: 8px;
  border: 0px;
  background: rgb(79, 70, 229);
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;
const DenyButton = styled.button`
  height: 32px;
  padding: 0px 14px;
  border-radius: 8px;
  border: 0px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
  font-size: 12px;
  cursor: pointer;
`;
