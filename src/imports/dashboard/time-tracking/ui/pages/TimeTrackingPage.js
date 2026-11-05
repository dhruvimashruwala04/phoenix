"use client";
import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import NewTrackingModal from "../components/NewTrackingModal";
import TodayEntries from "../components/TodayEntries";
import useTimeTracking from "../../hooks/useTimeTracking";
import Stats from "../components/Stats";
import Timesheet from "../components/TimeSheet";
import CommonHeader from "@/imports/core/components/CommonHeader";

const TimeTrackingPage = () => {
  const {
    records,
    title,
    setTitle,
    proj,
    setProj,
    isRunning,
    handleStart,
    handleStop,
    elapsed,
    formatTime,
    handleDelete,
    searchQuery,
    setSearchQuery,
  } = useTimeTracking();

  return (
    <Page direction="column">
      <CommonHeader
        title="Time Tracking"
        description="Log and review hours"
        placeholder="Search time tracking..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content gap="24px" direction="column">
        <NewTrackingModal
          title={title}
          setTitle={setTitle}
          proj={proj}
          setProj={setProj}
          isRunning={isRunning}
          handleStart={handleStart}
          handleStop={handleStop}
          elapsed={elapsed}
          formatTime={formatTime}
        />
        <Stats />
        <Timesheet />
        <TodayEntries
          records={records}
          formatTime={formatTime}
          handleDelete={handleDelete}
          searchQuery={searchQuery}
        />
      </Content>
    </Page>
  );
};

export default TimeTrackingPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
