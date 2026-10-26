"use client";
import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import { Unlink } from "@/imports/dashboard/ui/assets/Icons";

const DView = ({ dependencies, blockedOnly, handleUnlink, searchQuery }) => {
  const query = searchQuery.trim().toLowerCase();

  const filterDependencies = () => {
    return dependencies.filter((item) => {
      const matchesStatus = !blockedOnly || item.status === "Blocked";
      const matchesQuery =
        !query ||
        item.blocking.toLowerCase().includes(query.toLowerCase()) ||
        item.blocked.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  };

  return (
    <Container direction="column" gap="12px">
      {filterDependencies().map((item, i) => {
        const progress = Math.floor(Math.random() * 100);
        const progress2 = Math.floor(Math.random() * 100);

        return (
          <DependencyRow key={i} align="center" gap="14px">
            <TaskCard
              name={item.blocking}
              progress={item.status === "Clear" ? 100 : progress}
              color="var(--violet-600)"
            />

            <Connector
              direction="column"
              gap="1px"
              justify="center"
              align="center"
            >
              <Arrow $blocked={item.status === "Blocked"}>→</Arrow>
              <ConnectorLabel $blocked={item.status === "Blocked"}>
                FINISH → START
              </ConnectorLabel>
            </Connector>

            <TaskCard
              name={item.blocked}
              progress={progress2}
              color="#a78bfa"
            />

            <Status $blocked={item.status === "Blocked"}>{item.status}</Status>

            <LinkIcon onClick={() => handleUnlink(item.blocking, item.blocked)}>
              <Unlink />
            </LinkIcon>
          </DependencyRow>
        );
      })}
    </Container>
  );
};

export default DView;

const Container = styled(Flex)`
  width: 100%;
  padding: 8px;
`;
const DependencyRow = styled(Flex)`
  width: 100%;
  min-width: 760px;
  padding: 12px 15px;
  border-radius: 13px;
  background: var(--white);
  border: 1px solid var(--border-soft);
  box-shadow: 0 1px 2px var(--shadow-xs);
`;
const Connector = styled(Flex)`
  width: 86px;
  flex-shrink: 0;
`;
const Arrow = styled.span`
  color: ${({ $blocked }) =>
    $blocked ? "var(--rose-500)" : "var(--violet-600)"};
  font-size: 24px;
  line-height: 20px;
`;
const ConnectorLabel = styled.span`
  color: ${({ $blocked }) =>
    $blocked ? "var(--rose-500)" : "var(--violet-600)"};
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
  white-space: nowrap;
`;
const Status = styled.span`
  margin-left: auto;
  padding: 5px 10px;
  border-radius: 5px;
  background: ${({ $blocked }) =>
    $blocked ? "var(--rose-50)" : "var(--emerald-50)"};
  color: ${({ $blocked }) =>
    $blocked ? "var(--rose-500)" : "var(--emerald-500)"};
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
`;
const LinkIcon = styled.span`
  color: var(--gray-400);
  font-size: var(--fs-17);
  cursor: pointer;
`;
