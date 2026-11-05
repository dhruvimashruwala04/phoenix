"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import WorkloadView from "../components/WorkloadView";
import Stats from "../components/Stats";
import ViewToolbar from "../components/ViewToolbar";
import useWorkload from "../../hooks/useWorkload";
import CommonHeader from "@/imports/core/components/CommonHeader";

const WorkloadPage = () => {
  const {
    getCapacity,
    getStatus,
    members,
    handleLeftClick,
    handleRightClick,
    overloadCount,
    teamUtilization,
    freeCapacity,
  } = useWorkload();

  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("thisWeek");

  return (
    <Page direction="column">
      <CommonHeader
        title="Workload"
        description="Team capacity for the next two weeks"
        placeholder="Search workload..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content direction="column" gap="24px">
        <ViewToolbar view={view} setView={setView} />
        <WorkloadView
          searchQuery={searchQuery}
          getCapacity={getCapacity}
          getStatus={getStatus}
          members={members}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
        />
        <Stats
          overloadCount={overloadCount}
          teamUtilization={teamUtilization}
          freeCapacity={freeCapacity}
        />
      </Content>
    </Page>
  );
};

export default WorkloadPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
