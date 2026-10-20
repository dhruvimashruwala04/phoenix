"use client";
import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import useOnboarding from "@/imports/onboarding/store/onboardingStore";
import { tabs } from "../../api/constants";

const SideNavbar = () => {
  const { settingsView, setSettingsView } = useOnboarding();

  return (
    <Navbar direction="column" gap="2px">
      {tabs.map((tab) => (
        <Item
          key={tab.label}
          gap="10px"
          align="center"
          $active={tab.label === settingsView}
          $danger={tab.danger}
          onClick={() => setSettingsView(tab.label)}
        >
          <tab.icon />
          {tab.label}
        </Item>
      ))}
    </Navbar>
  );
};

export default SideNavbar;

const Navbar = styled(Flex)``;
const Item = styled(Flex)`
  width: 100%;
  height: 38px;
  border: 0px;
  border-radius: var(--radius-8);
  padding: 0px 12px;
  text-align: left;
  font-size: var(--fs-14);
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "var(--indigo-50)" : "transparent"};
  color: ${({ $active, $danger }) =>
    $active
      ? "var(--blue-accent)"
      : $danger
        ? "var(--rose-600)"
        : "var(--slate-600)"};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
`;
