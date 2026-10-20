import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { Flex } from "@/imports/core/components/Flex";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import { statusConfig } from "@/imports/dashboard/kanban/api/constants";

const Projects = ({ projByFilter }) => {
  const { tasks } = useKanbanStore();
  const [progressValues, setProgressValues] = useState([]);

  const taskCount = tasks.reduce((acc, p) => {
    const key = p.projName;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});

  useEffect(() => {
    setProgressValues(
      projByFilter.slice(0, 5).map(() => Math.floor(Math.random() * 100) + 1),
    );
  }, [projByFilter]);

  return (
    <Card
      title="Projects"
      showLink={true}
      linkText="Open board →"
      linkHref={"/kanban"}
    >
      <ProjectList>
        {projByFilter.slice(0, 5).map((p, i) => {
          const status = statusConfig[p.status];
          const progress = progressValues[i] ?? 0;

          return (
            <ProjectRow href="/kanban" key={i}>
              <ProjectInfo>
                <ProjectName align="center" gap="8px">
                  <Dot $color={p.color} />
                  {p.label}
                </ProjectName>

                <Meta>{taskCount[p.value]} tasks · 6 members · due Aug 24</Meta>
              </ProjectInfo>

              <ProgressSection>
                <ProgressLabel align="stretch" justify="space-between">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </ProgressLabel>

                <ProgressTrack>
                  <ProgressBar $progress={progress} $color={status?.color} />
                </ProgressTrack>
              </ProgressSection>

              <Status $color={status?.color} $type={p.status}>
                {status?.label}
              </Status>
            </ProjectRow>
          );
        })}
      </ProjectList>
    </Card>
  );
};

export default Projects;

const ProjectList = styled.div`
  width: 100%;
`;
const ProjectRow = styled.a`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) 120px 70px;
  gap: 16px;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid var(--slate-50);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--slate-50);
    cursor: pointer;
  }
`;
const ProjectInfo = styled.div`
  width: 185px;
  min-width: 185px;
`;
const ProjectName = styled(Flex)`
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--slate-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Dot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background: ${({ $color }) => $color};
`;
const Meta = styled.div`
  margin-top: 3px;
  font-size: var(--fs-11);
  line-height: var(--lh-14);
  color: var(--text-muted);
  white-space: nowrap;
`;
const ProgressSection = styled.div`
  width: 120px;
  flex-shrink: 0;
`;
const ProgressLabel = styled(Flex)`
  margin-bottom: 5px;
  font-size: var(--fs-10);
  color: var(--text-muted-2);
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: var(--radius-4);
  background: var(--slate-100);
`;
const ProgressBar = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: var(--radius-4);
  background: ${({ $color }) => $color};
`;
const Status = styled.span`
  margin-left: auto;
  padding: 3px 8px;
  border-radius: var(--radius-4);
  font-size: var(--fs-10);
  font-weight: var(--fw-600);
  white-space: nowrap;
  color: ${({ $color }) => $color};
  background: ${({ $type }) => {
    switch ($type) {
      case "backlog":
        return "rgba(250, 248, 227, 1)";

      case "in_progress":
        return "rgba(221, 234, 250, 1)";

      case "review":
        return "rgba(239, 228, 250, 1)";

      case "done":
        return "rgba(221, 244, 234, 1)";

      default:
        return "var(--slate-100)";
    }
  }};
`;
