import { Flex } from "@/imports/core/components/Flex";
import { Close } from "@/imports/dashboard/ui/assets/Icons";
import styled from "styled-components";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import CancelButton from "@/imports/core/components/CancelButton";

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

        <Input direction="column" gap="6px">
          Full name
          <input
            name="title"
            type="text"
            placeholder="Jordan Smith"
            value={inviteeName}
            onChange={(e) => setInviteeName(e.target.value)}
          />
        </Input>

        <Input direction="column" gap="6px">
          Email Address
          <input
            name="title"
            type="text"
            placeholder="jordan@acme.com"
            value={inviteeEmail}
            onChange={(e) => setInviteeEmail(e.target.value)}
          />
        </Input>

        <Details gap="12px">
          <DropdownInput direction="column" gap="6px">
            Access
            <select
              value={inviteeRole}
              onChange={(e) => setInviteeRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
              <option value="Viewer">Viewer</option>
            </select>
          </DropdownInput>
          <DropdownInput direction="column" gap="6px">
            Team
            <select value={team} onChange={(e) => setTeam(e.target.value)}>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
            </select>
          </DropdownInput>
        </Details>

        {/* <Input direction="column" gap="6px">
          Personal message (optional)
          <input
            name="title"
            type="text"
            placeholder="Join us on Project Phoenix!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Input> */}

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
  z-index: 100;
  background: rgba(15, 23, 42, 0.4);
`;
const Card = styled.form`
  width: 440px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 14px;
  box-shadow: rgba(15, 23, 42, 0.25) 0px 20px 50px;
  padding: 24px;
  gap: 16px;
`;
const Header = styled(Flex)``;
const Title = styled.span`
  color: var(--slate-900);
  font-size: 16px;
  font-weight: 600;
`;
const CloseButton = styled(Flex)`
  background: transparent;
  cursor: pointer;
`;

const Details = styled(Flex)``;
const DropdownInput = styled(Flex)`
  flex: 1 1 0%;
  font-size: 12px;
  font-weight: 600;
  color: var(--slate-600);
  > select,
  > input {
    width: 100%;
    height: 38px;
    border-radius: 8px;
    border: 1px solid var(--border-muted);
    padding: 0px 8px;
    font-size: 13px;
    color: var(--slate-600);
  }
`;
const Footer = styled(Flex)`
  margin-top: 4px;
`;
// const PrimaryButton = styled.button`
//   height: 36px;
//   padding: 0px 16px;
//   border-radius: 8px;
//   border: 0px;
//   background: var(--blue-accent);
//   color: var(--white);
//   font-size: 14px;
//   font-weight: 500;
//   cursor: pointer;
// `;
// const CancelButton = styled.button`
//   height: 38px;
//   padding: 0 16px;
//   border: 1px solid var(--border-muted);
//   border-radius: 7px;
//   background: var(--white);
//   color: var(--slate-700);
//   font-size: 15px;
//   font-weight: 500;
//   cursor: pointer;
// `;
const Input = styled(Flex)`
  font-size: 12px;
  font-weight: 600;
  color: var(--slate-600);
  > input {
    height: 38px;
    border-radius: 8px;
    border: 0px;
    box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
    padding: 0px 12px;
    font-size: 14px;
    outline: 0px;
    width: 100%;
  }
`;
