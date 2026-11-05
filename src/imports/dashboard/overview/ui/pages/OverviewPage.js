import React from "react";
import StatsCards from "../components/StatsCards";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import OverviewCards from "../components/OverviewCards";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import { useSearchParams } from "next/navigation";
import { projects } from "@/imports/dashboard/kanban/api/constants";
import CommonHeader from "@/imports/core/components/CommonHeader";

const OverviewPage = () => {
  const { tasks, searchQuery, setSearchQuery } = useKanbanStore();

  const searchParams = useSearchParams();
  const projName = searchParams.get("project") || null;

  const query = searchQuery.trim().toLowerCase() || "";

  const projByFilter = projects.filter((proj) => {
    const matchesProject = !projName || proj.value === projName;
    const matchesSearch = proj.label.toLowerCase().includes(query);

    return matchesProject && matchesSearch;
  });

  const tasksByProj = tasks.filter((task) => {
    const matchesProject = !projName || task.projName === projName;
    const matchesSearch = task.title?.toLowerCase().includes(query);

    return matchesProject && matchesSearch;
  });

  const ProjBadge = projects.find((p) => p.value === projName) || null;

  return (
    <Page direction="column">
      <CommonHeader
        title="Overview"
        description="Your workspace at a glance"
        placeholder="Search overview..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        badge={ProjBadge}
      />
      <Content direction="column" gap="24px">
        <StatsCards />
        <OverviewCards tasksByProj={tasksByProj} projByFilter={projByFilter} />
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
