"use client";
import React, { useState } from "react";
import TimelineHeader from "../components/TimelineHeader";
import TimelineView from "../components/TimelineView";
import { Flex } from "@/imports/core/components/Flex";
import styled from "styled-components";
import ViewToolbar from "../components/ViewToolbar";
import NewTimelineModal from "../components/NewTimelineModal";

const TimelinePage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Page direction="column">
      <TimelineHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content direction="column" gap="24px">
        <ViewToolbar
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          filter={filter}
          setFilter={setFilter}
        />
        {showAdd && <NewTimelineModal setShowAdd={setShowAdd} />}
        <TimelineView filter={filter} searchQuery={searchQuery} />
      </Content>
    </Page>
  );
};

export default TimelinePage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
