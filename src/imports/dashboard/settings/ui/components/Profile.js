"use client";
import useAuthStore from "@/imports/auth/store/authStore";
import { Flex } from "@/imports/core/components/Flex";
import getInitials from "@/imports/core/utils/getInitials";
import styled from "styled-components";
import { Camera, Save } from "../../assets/Icons";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import { useEffect, useState } from "react";
import CancelButton from "@/imports/core/components/CancelButton";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import { roles } from "@/imports/onboarding/api/constant";
import DropdownInput from "@/imports/core/components/DropdownInput";
import { timeZone } from "../../api/constants";

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const { role, setRole } = useOnboardingStore();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newRole, setNewRole] = useState(role || "");

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setNewRole(role);
    }
  }, [user, role]);

  const handleSave = () => {
    updateUser({ name, email });
    setRole(newRole);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <Wrapper direction="column" gap="18px">
      <Title>Profile</Title>
      <PhotoWrapper gap="16px" align="center">
        <Initials align="center" justify="center">
          {getInitials(user?.name)}
        </Initials>
        <PhotoDetails direction="column" gap="6px">
          <Info>JPG or PNG, up to 2 MB</Info>
          <Label>
            <Camera />
            Change photo
            <input type="file" accept="image/*" />
          </Label>
        </PhotoDetails>
      </PhotoWrapper>
      <Details direction="column" gap="16px">
        <InputLabel>
          Full Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputLabel>

        <InputLabel>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputLabel>

        <DropdownInput
          label="Role"
          options={roles.map((r) => ({
            value: r,
            label: r,
          }))}
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />

        <DropdownInput
          label="Time Zone"
          options={timeZone.map((t) => ({
            value: t.value,
            label: t.label,
          }))}
        />
      </Details>

      <Buttons justify="flex-end" align="center" gap="10px">
        {showSuccess && (
          <Success>
            <Save />
            Changes saved
          </Success>
        )}
        <CancelButton
          onClick={() => {
            updateUser({ name: "John Smith", email: "john@acme.com" });
            setRole("Product");
          }}
        >
          Reset
        </CancelButton>
        <PrimaryButton onClick={handleSave} width="fit-content">
          Save changes
        </PrimaryButton>
      </Buttons>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled(Flex)`
  width: 100%;
  background: var(--white);
  border-radius: var(--radius-12);
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
  padding: 24px;
`;
const Title = styled.span`
  font-size: var(--fs-16);
  font-weight: var(--fw-700);
  color: var(--slate-900);
`;
const PhotoWrapper = styled(Flex)``;
const Details = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;
const Initials = styled(Flex)`
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: var(--blue-accent);
  color: var(--white);
  font-size: var(--fs-20);
  font-weight: var(--fw-700);
`;
const PhotoDetails = styled(Flex)``;
const Info = styled.div`
  font-size: var(--fs-12);
  color: var(--text-muted);
`;
const Label = styled.label`
  height: 32px;
  padding: 0px 12px;
  border-radius: var(--radius-8);
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  font-size: var(--fs-12);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  width: max-content;
  > input {
    display: none;
  }
`;
const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  > input,
  select {
    height: 38px;
    border-radius: var(--radius-8);
    border: 0px;
    box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
    padding: 0px 12px;
    font-size: var(--fs-14);
    outline: 0px;
  }
`;
const Buttons = styled(Flex)`
  width: 100%;
`;
const Success = styled.span`
  font-size: var(--fs-12);
  color: var(--emerald-600);
  display: flex;
  gap: 6px;
  align-items: center;
`;
