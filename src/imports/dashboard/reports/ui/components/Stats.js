"use client";
import styled from "styled-components";

const Stats = ({ data }) => {
  const completedTasks = data.find((d) => d.name === "Done")?.value;
  const totalTasks = data.reduce((sum, item) => sum + item.value, 0);

  const stats = [
    {
      label: "Tasks completed",
      value: completedTasks,
      trend: "↑ 16%",
      positive: true,
    },
    {
      label: "Tasks created",
      value: totalTasks,
      trend: "↑ 9%",
      positive: true,
    },
    {
      label: "On-time delivery",
      value: "91%",
      trend: "↑ 3 pts",
      positive: true,
    },
    {
      label: "Avg cycle time",
      value: "3.4d",
      trend: "↑ 0.3d",
      positive: false,
    },
  ];
  return (
    <Grid>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <Label>{stat.label}</Label>

          <BottomRow>
            <Value>{stat.value}</Value>

            <Trend $positive={stat.positive}>{stat.trend}</Trend>
          </BottomRow>
        </Card>
      ))}
    </Grid>
  );
};

export default Stats;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
`;

const Card = styled.div`
  min-width: 0;
  padding: 16px 19px;
  background: var(--white, #ffffff);
  border: 1px solid #edf0f5;
  border-radius: 13px;
  box-shadow: 0 2px 3px rgba(20, 30, 50, 0.04);
`;

const Label = styled.div`
  margin-bottom: 6px;
  color: #8290a5;
  font-size: 12px;
  font-weight: 400;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 9px;
`;

const Value = styled.span`
  color: #172033;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
`;

const Trend = styled.span`
  color: ${({ $positive }) => ($positive ? "#10b981" : "#ff4d67")};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;
