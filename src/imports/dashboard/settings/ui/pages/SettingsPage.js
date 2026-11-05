"use client";
import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import SideNavbar from "../components/SideNavbar";
import useOnboarding from "@/imports/onboarding/store/onboardingStore";
import Notifications from "../components/Notifications";
import Integrations from "../components/Integrations";
import Billing from "../components/Billing";
import DangerZone from "../components/DangerZone";
import Profile from "../components/Profile";
import CommonHeader from "@/imports/core/components/CommonHeader";

const SettingsPage = () => {
  const { settingsView } = useOnboarding();

  return (
    <Page direction="column">
      <CommonHeader
        title="Settings"
        description="Workspace and account preferences"
        placeholder="Search settings..."
        searchQuery=""
        setSearchQuery={() => {}}
      />
      <Content>
        <Wrapper>
          <SideNavbar />
          {settingsView === "Profile" && <Profile />}
          {settingsView === "Notifications" && <Notifications />}
          {settingsView === "Integrations" && <Integrations />}
          {settingsView === "Billing" && <Billing />}
          {settingsView === "Danger Zone" && <DangerZone />}
        </Wrapper>
      </Content>
    </Page>
  );
};

export default SettingsPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 24px;
`;
const Wrapper = styled(Flex)`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(180px, 220px) minmax(0px, 1fr);
  gap: 24px;
  color: var(--slate-900);
`;
