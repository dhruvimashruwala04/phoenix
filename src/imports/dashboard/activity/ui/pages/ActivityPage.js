"use client";
import { Flex } from "@/imports/core/components/Flex";
import React, { useState } from "react";
import styled from "styled-components";
import ViewToolbar from "../components/ViewToolbar";
import ActivityRecords from "../components/ActivityRecords";
import CommonHeader from "@/imports/core/components/CommonHeader";

const ActivityPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Page direction="column">
      <CommonHeader
        title="Activity"
        description="Everything that changed recently"
        placeholder="Search activity..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content gap="24px" direction="column">
        <ViewToolbar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ActivityRecords
          activeFilter={activeFilter}
          searchQuery={searchQuery}
        />
      </Content>
    </Page>
  );
};

export default ActivityPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
