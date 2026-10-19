import React, { useState } from "react";
import styled from "styled-components";
import { initialPermissions } from "../../api/constants";

const Notifications = () => {
  const [permissions, setPermissions] = useState(initialPermissions);

  const handleToggle = (index) => {
    setPermissions((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, allow: !item.allow } : item,
      ),
    );
  };

  return (
    <Container>
      <SettingsCard>
        {permissions.map((item, i) => (
          <SettingRow key={i}>
            <SettingInfo>
              <SettingTitle>{item.name}</SettingTitle>
              <Description>{item.description}</Description>
            </SettingInfo>
            <Toggle
              type="button"
              role="switch"
              $active={item.allow}
              onClick={() => handleToggle(i)}
            >
              <ToggleThumb $active={item.allow} />
            </Toggle>
          </SettingRow>
        ))}
      </SettingsCard>
      <Actions>
        <ResetButton type="button">Reset</ResetButton>
        <SaveButton type="button">Save changes</SaveButton>
      </Actions>
    </Container>
  );
};

export default Notifications;

const Container = styled.div`
  width: 100%;
`;
const SettingsCard = styled.div`
  width: 100%;
  padding: 0 24px;
  background: #ffffff;
  border-radius: 13px;
  box-shadow:
    0 0 0 1px #edf1f6,
    0 2px 4px rgba(15, 23, 42, 0.035);
`;
const SettingRow = styled.div`
  min-height: 67px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #f1f4f8;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 480px) {
    gap: 10px;
  }
`;
const SettingInfo = styled.div`
  min-width: 0;
  padding: 12px 0;
`;
const SettingTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const Description = styled.div`
  font-size: 12px;
  color: rgb(100, 116, 139);
`;
const Toggle = styled.button`
  position: relative;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: 20px;
  background: ${({ $active }) => ($active ? "#4f46e5" : "#e2e8f0")};
  cursor: pointer;
  transition: background 180ms ease;
  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 3px;
  }
`;
const ToggleThumb = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ $active }) => ($active ? "21px" : "3px")};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);
  transition: left 180ms ease;
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 21px;
`;
const ResetButton = styled.button`
  height: 37px;
  padding: 0 14px;
  border: 1px solid #dce4ef;
  border-radius: 8px;
  background: #ffffff;
  color: #111827;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f8fafc;
  }
`;
const SaveButton = styled.button`
  height: 37px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #4338ca;
  }
`;
