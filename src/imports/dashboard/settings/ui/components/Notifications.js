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
  background: var(--white);
  border-radius: 13px;
  box-shadow:
    0 0 0 1px var(--border-soft),
    0 2px 4px var(--shadow-xs);
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
  color: var(--text-muted);
`;
const Toggle = styled.button`
  position: relative;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: 20px;
  background: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--border-muted)")};
  cursor: pointer;
  transition: background 180ms ease;
  &:focus-visible {
    outline: 2px solid var(--indigo-400);
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
  background: var(--white);
  box-shadow: 0 1px 2px var(--shadow-lg);
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
  border: 1px solid var(--border-input);
  border-radius: 8px;
  background: var(--white);
  color: var(--gray-900);
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: var(--slate-50);
  }
`;
const SaveButton = styled.button`
  height: 37px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: var(--blue-accent);
  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: var(--indigo-700);
  }
`;
