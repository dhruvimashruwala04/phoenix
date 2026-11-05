"use client";
import { Flex } from "@/imports/core/components/Flex";
import React, { useState } from "react";
import styled from "styled-components";
import Stats from "../components/Stats";
import ViewToolbar from "../components/ViewToolbar";
import AiSuggestions from "../components/AiSuggestions";
import ProjectAssistant from "../components/ProjectAssistant";
import CommonHeader from "@/imports/core/components/CommonHeader";

const AiInsightsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Page direction="column">
      <CommonHeader
        title="AI Insights"
        description="Predictions, risks and recommendations"
        placeholder="Search ai insights..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content gap="24px" direction="column">
        <Stats />
        <ViewToolbar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <AiSuggestions activeFilter={activeFilter} searchQuery={searchQuery} />
        <ProjectAssistant />
      </Content>
    </Page>
  );
};

export default AiInsightsPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
