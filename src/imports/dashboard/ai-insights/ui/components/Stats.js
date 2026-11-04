import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { stats } from "../../api/constants";
import { AiInsights } from "@/imports/core/assets/Icons";

const Stats = () => {
  return (
    <Overview align="stretch" gap="20px" wrap="wrap">
      <AIcard direction="column" gap="6px">
        <AIHeading align="flex-start" gap="7px">
          <AiInsights />
          <AIHeadingText>PREDICTED LAUNCH</AIHeadingText>
        </AIHeading>
        <StatValue style={{ color: "white" }}>Aug 27</StatValue>
        <Subtitle style={{ color: "white" }}>
          3 days after target — 2 risks open
        </Subtitle>
      </AIcard>

      {stats.map((item) => {
        return (
          <StatCard key={item.label} direction="column" gap="6px">
            <SmallTitle>{item.label}</SmallTitle>
            <StatValue color={item.color}>{item.value}</StatValue>
            {item.subLabel && <Subtitle>{item.subLabel}</Subtitle>}
            {item.progressBar && (
              <ProgressTrack>
                <ProgressFill $progress={item.progressBar} />
              </ProgressTrack>
            )}
          </StatCard>
        );
      })}
    </Overview>
  );
};

export default Stats;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
`;
const BaseCard = styled(Flex)`
  min-height: 100px;
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-13);
  box-shadow: 0 2px 3px rgba(20, 30, 50, 0.035);
`;
const SmallTitle = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-12);
  font-weight: var(--fw-500);
  letter-spacing: 0.25px;
  text-align: left;
`;
const Subtitle = styled.span`
  color: var(--text-muted);
  font-size: 11px;
  text-align: left;
`;
const StatCard = styled(BaseCard)`
  flex: 1 1 150px !important;
`;
const StatValue = styled.span`
  color: ${({ color }) => color || "var(--slate-900)"};
  font-size: 24px;
  line-height: 1.15;
  font-weight: var(--fw-700);
`;
const AIcard = styled(BaseCard)`
  flex: 1.1 1 175px !important;
  padding: 17px 19px;
  background: var(--blue-accent);
`;
const AIHeading = styled(Flex)`
  width: 100%;
  color: #fff;
`;
const AIHeadingText = styled.span`
  font-size: 11px;
  font-weight: 700;
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: var(--radius-20);
  overflow: hidden;
  background: #f0f0f3;
`;
const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: inherit;
  transition: width 250ms ease;
  background: var(--emerald-500);
`;
