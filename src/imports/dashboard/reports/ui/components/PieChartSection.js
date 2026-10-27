"use client";
import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Flex } from "@/imports/core/components/Flex";

const COLORS = {
  "In Progress": "var(--indigo-700)",
  Done: "var(--emerald-500)",
  Review: "var(--amber-500)",
  Backlog: "var(--rose-500)",
};

const PieChartSection = ({ data }) => {
  console.log("data", data);
  return (
    <Card direction="column" gap="12px">
      <Heading>Status distribution</Heading>

      <ChartLayout>
        <DonutWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={0}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <CenterText direction="column" align="center" justify="center">
            <Total>{data.reduce((sum, item) => sum + item.value, 0)}</Total>
            <TotalLabel>tasks</TotalLabel>
          </CenterText>
        </DonutWrapper>

        <StatusList direction="column" gap="12px">
          {data.map((item, index) => (
            <StatusItem
              key={item.name}
              align="center"
              justify="space-between"
              gap="8px"
            >
              <StatusName align="center" gap="8px">
                <StatusDot $color={COLORS[index % COLORS.length]} />
                {item.name}
              </StatusName>
              <StatusCount>{item.value}</StatusCount>
            </StatusItem>
          ))}
        </StatusList>
      </ChartLayout>
    </Card>
  );
};

export default PieChartSection;

const Card = styled(Flex)`
  min-width: 0;
  background: var(--white);
  border-radius: var(--radius-12);
  border: 1px solid var(--border-muted);
  padding: 20px;
`;
const Heading = styled.span`
  color: var(--slate-700);
  font-size: var(--fs-14);
  font-weight: var(--fw-700);
`;
const ChartLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
const DonutWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
`;
const CenterText = styled(Flex)`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;
const Total = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-24);
  font-weight: var(--fw-700);
  line-height: var(--lh-12);
`;
const TotalLabel = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-11);
`;
const StatusList = styled(Flex)`
  min-width: 0;
`;
const StatusItem = styled(Flex)`
  width: 100%;
`;
const StatusName = styled(Flex)`
  color: var(--text-muted);
  font-size: var(--fs-12);
`;
const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
const StatusCount = styled.span`
  color: var(--black);
  font-size: var(--fs-12);
  font-weight: var(--fw-700);
`;
