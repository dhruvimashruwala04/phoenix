import { Flex } from "@/imports/core/components/Flex";
import { Close } from "@/imports/core/assets/Icons";
import styled from "styled-components";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import CancelButton from "@/imports/core/components/CancelButton";
import Input from "@/imports/core/components/Input";
import DropdownInput from "@/imports/core/components/DropdownInput";
import { accessRoles, roles } from "@/imports/onboarding/api/constant";

const NewInviteModal = ({ setShowInvite }) => {
  const {
    inviteeEmail,
    inviteeRole,
    team,
    inviteeName,
    setInviteeEmail,
    setInviteeRole,
    setTeam,
    addInvite,
    setInviteeName,
  } = useOnboardingStore();

  return (
    <Overlay
      align="center"
      justify="center"
      onClick={() => setShowInvite(false)}
    >
      <Card onClick={(e) => e.stopPropagation()}>
        <Header align="center" justify="space-between">
          <Title>Invite people</Title>
          <CloseButton onClick={() => setShowInvite(false)}>
            <Close />
          </CloseButton>
        </Header>

        <Input
          label="Full name"
          name="title"
          type="text"
          placeholder="Jordan Smith"
          value={inviteeName}
          onChange={(e) => setInviteeName(e.target.value)}
        />
        <Input
          label="Email Address"
          name="title"
          type="text"
          placeholder="jordan@acme.com"
          value={inviteeEmail}
          onChange={(e) => setInviteeEmail(e.target.value)}
        />

        <Details gap="12px">
          <DropdownInput
            label="Access"
            options={accessRoles.map((r) => ({
              value: r,
              label: r,
            }))}
            value={inviteeRole}
            onChange={(e) => setInviteeRole(e.target.value)}
          />
          <DropdownInput
            label="Team"
            options={roles.map((t) => ({
              value: t,
              label: t,
            }))}
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </Details>

        {/* <Input
          label="Personal message (optional)"
          name="msg"
          type="text"
          placeholder="Join us on Project Phoenix!"
        /> */}

        <Footer gap="8px" justify="space-between">
          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <CancelButton onClick={() => setShowInvite(false)}>
              Cancel
            </CancelButton>
            <PrimaryButton
              width="fit-content"
              type="button"
              onClick={() => {
                addInvite();
                setShowInvite(false);
              }}
            >
              Send Invite
            </PrimaryButton>
          </div>
        </Footer>
      </Card>
    </Overlay>
  );
};

export default NewInviteModal;

const Overlay = styled(Flex)`
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: var(--overlay);
`;
const Card = styled.form`
  width: 440px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: var(--radius-14);
  box-shadow: var(--shadow-modal) 0px 20px 50px;
  padding: 24px;
  gap: 16px;
`;
const Header = styled(Flex)``;
const Title = styled.span`
  color: var(--slate-900);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
`;
const CloseButton = styled(Flex)`
  background: transparent;
  cursor: pointer;
`;
const Details = styled(Flex)``;
const Footer = styled(Flex)`
  margin-top: 4px;
`;
