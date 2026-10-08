"use client";
import AiPanel from "../components/AiPanel";
import styled from "styled-components";
import KanbanHeader from "../components/KanbanHeader";
import { Flex } from "@/imports/core/components/Flex";
import NewTaskModal from "../components/NewTaskModal";
import useKanbanStore from "../../store/kanbanStore";
import KanbanStats from "../components/KanbanStats";
import ViewToolbar from "../components/ViewToolbar";
import BoardView from "../components/BoardView";
import TableView from "../components/TableView";
import AllTaskView from "../components/AllTaskView";
import useKanbanView from "../../hooks/useKanbanView";
import AiQuickActions from "../components/AiQuickActions";
import { useState } from "react";
import useAuthStore from "@/imports/auth/store/authStore";
import { AiInsights } from "@/imports/dashboard/ui/assets/Icons";
import { AiAssignee, AiPriority, AiReport, AiTask } from "../assets/Icons";

const KanbanPage = () => {
  const { aiPanel, setAiPanel, showTask, view, setSortBy, tasks } =
    useKanbanStore();
  const { columns, getSortedTasks, sortedTasks } = useKanbanView();
  const user = useAuthStore((state) => state.user);

  const [aiReply, setAiReply] = useState([]);

  const openTask = tasks.filter((task) => task.status !== "done").length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const mostTask = tasks.reduce((acc, task) => {
    const key = task.assignee || user?.name;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const mostTaskAssignee = Object.keys(mostTask).reduce(
    (a, b) => (mostTask[a] > mostTask[b] ? a : b),
    "",
  );

  const actions = [
    {
      icon: AiInsights,
      label: "AI Quick Actions",
      title: true,
    },
    {
      icon: AiPriority,
      label: "Prioritize Tasks",
      reply: "Board re-sorted by priority.",
      action: () => {
        setSortBy("priority");
      },
    },
    {
      icon: AiReport,
      label: "Generate Report",
      reply: `Sprint summary: ${openTask} open tasks, ${completed} done on the board. Velocity is up 12% vs last sprint.`,
    },
    {
      icon: AiTask,
      label: "Breakdown Task",
      reply:
        'Pick a task and I will split it into subtasks. Suggested: "Dashboard analytics" → data model, chart widgets, realtime sync.',
    },
    {
      icon: AiAssignee,
      label: "Suggest Assignee",
      reply: `${mostTaskAssignee} has the most capacity this week (${mostTask[mostTaskAssignee]} tasks). Suggest assigning "Competitor analysis" to ${mostTaskAssignee}.`,
    },
  ];
  const handleAiAction = (reply) => {
    setAiReply((prev) => [...prev, reply]);
    setAiPanel(true);
  };

  return (
    <Page $aiOpen={aiPanel}>
      <LeftSection direction="column">
        <KanbanHeader />

        {showTask && <NewTaskModal />}

        <Content direction="column" gap="24px">
          <KanbanStats />
          <ViewToolbar />

          {view === "board" ? (
            <BoardView columns={columns} getSortedTasks={getSortedTasks} />
          ) : view === "table" ? (
            <TableView tasks={sortedTasks} />
          ) : (
            <AllTaskView tasks={sortedTasks} />
          )}
        </Content>
      </LeftSection>

      {aiPanel && <AiPanel reply={aiReply} />}
      <AiQuickActions actions={actions} onAction={handleAiAction} />
    </Page>
  );
};

export default KanbanPage;

const Page = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${({ $aiOpen }) =>
    $aiOpen ? "minmax(0, 1fr) 335px" : "1fr"};
`;
const LeftSection = styled(Flex)`
  min-width: 0;
  min-height: 0;
  height: 100%;
`;
const Content = styled(Flex)`
  flex: 1 1 0%;
  min-height: 0;
  padding: 24px 24px 110px;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: thin;
`;
