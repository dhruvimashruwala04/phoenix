"use client";
import { useState } from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { initialInsights, typeStyles } from "../../api/constants";
import { Tick } from "@/imports/onboarding/ui/assets/Icons";

const AiSuggestions = ({ activeFilter, searchQuery }) => {
  const [insights, setInsights] = useState(initialInsights);
  const [dismissedIds, setDismissedIds] = useState([]);

  const query = searchQuery.trim().toLowerCase() || "";

  const filteredInsights = insights.filter((item) => {
    const isDismissed = dismissedIds.includes(item.id);
    const matchesFilter = activeFilter === "all" || activeFilter === item.type;
    const matchesQuery =
      item.title.toLowerCase().includes(query) ||
      item.project.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchesFilter && !isDismissed && matchesQuery;
  });

  const handleDismiss = (id) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  const handleApply = (id) => {
    setInsights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, applied: true } : item)),
    );
  };

  return (
    <Container>
      {filteredInsights.map((item) => {
        const style = typeStyles[item.type];
        const Icon = style.icon;

        return (
          <InsightCard
            key={item.id}
            $background={style.background}
            $border={style.border}
          >
            <CardHeader align="center" justify="space-between">
              <TypeLabel align="center" gap="6px" $color={style.color}>
                <Icon size={12} />
                {item.label}
              </TypeLabel>

              <ProjectName>{item.project}</ProjectName>
            </CardHeader>

            <CardTitle>{item.title}</CardTitle>

            <Description>{item.description}</Description>

            <CardActions align="center" gap="16px">
              {item.applied ? (
                <Applied align="center" gap="5px">
                  <Tick />
                  <span>Applied</span>
                </Applied>
              ) : (
                <ActionButton
                  type="button"
                  $color={style.color}
                  $border={style.border}
                  onClick={() => handleApply(item.id)}
                >
                  {item.action}
                </ActionButton>
              )}

              {!item.applied && (
                <DismissButton
                  type="button"
                  onClick={() => handleDismiss(item.id)}
                >
                  Dismiss
                </DismissButton>
              )}
            </CardActions>
          </InsightCard>
        );
      })}

      {filteredInsights.length === 0 && (
        <EmptyState>No insights found.</EmptyState>
      )}
    </Container>
  );
};

export default AiSuggestions;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;
const InsightCard = styled.div`
  min-width: 0;
  min-height: 168px;
  padding: 16px;
  border: 1px solid ${({ $border }) => $border};
  border-radius: 12px;
  background: ${({ $background }) => $background};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CardHeader = styled(Flex)`
  width: 100%;
`;
const TypeLabel = styled(Flex)`
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 700;
`;
const ProjectName = styled.span`
  color: #64748b;
  font-size: 11px;
  white-space: nowrap;
`;
const CardTitle = styled.h3`
  margin: 0;
  color: #172033;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
`;
const Description = styled.p`
  margin: 0;
  color: #53647d;
  font-size: 13px;
  font-style: italic;
  line-height: 1.55;
`;
const CardActions = styled(Flex)`
  margin-top: auto;
  flex-wrap: wrap;
`;
const ActionButton = styled.button`
  padding: 7px 11px;
  border: 1px solid ${({ $border }) => $border};
  border-radius: 7px;
  background: #fff;
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    filter: brightness(0.96);
  }
`;
const DismissButton = styled.button`
  padding: 7px 0;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 11px;
  cursor: pointer;
  &:hover {
    color: #172033;
  }
`;
const Applied = styled(Flex)`
  color: #009b70;
  font-size: 11px;
  font-weight: 600;
`;
const EmptyState = styled.div`
  grid-column: 1 / -1;
  padding: 40px 16px;
  color: var(--text-muted);
  text-align: center;
  font-size: 13px;
`;
