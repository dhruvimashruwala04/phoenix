import { Flex } from "@/imports/core/components/Flex";
import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import useOnboarding from "@/imports/onboarding/store/onboardingStore";
import React from "react";
import styled from "styled-components";

const TeamHeader = () => {
  const { searchQuery, setSearchQuery } = useOnboarding();

  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <Title>Team</Title>
        <Content>People and roles</Content>
      </TextWrapper>

      <SearchBox
        placeholder="Search teams..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <NotificationBox />
    </Header>
  );
};

export default TeamHeader;

const Header = styled(Flex)`
  min-height: 64px;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(241, 245, 249);
  padding: 12px 24px;
  z-index: 5;
  width: 100%;
`;
const TextWrapper = styled(Flex)`
  min-width: 160px;
  flex: 1 1 160px;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;
const Content = styled.span`
  font-size: 12px;
  color: rgb(100, 116, 139);
  line-height: 16px;
  text-align: left;
`;
const Details = styled(Flex)`
  width: fit-content;
  height: 32px;
  padding: 0 10px;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 8px;
  background: #ffffff;
  color: rgb(100, 116, 139);
  font-size: 12px;
  cursor: pointer;
  strong {
    color: rgb(30, 41, 59);
    font-weight: 600;
  }
`;
const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgb(99, 102, 241);
`;
