import React from "react";
import OverViewHeader from "../components/OverViewHeader";
import StatsCards from "../components/StatsCards";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import OverviewCards from "../components/OverviewCards";

const OverviewPage = () => {
  return (
    <Page direction="column">
      <OverViewHeader />
      <Content direction="column" gap="24px">
        <StatsCards />
        <OverviewCards />
      </Content>
    </Page>
  );
};

export default OverviewPage;
const Page = styled(Flex)`
  width: 100%;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
