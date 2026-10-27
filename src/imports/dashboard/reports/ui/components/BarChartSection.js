"use client";
import styled from "styled-components";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Flex } from "@/imports/core/components/Flex";

const COLORS = {
  completed: "#5146f5",
  created: "#c3d0ff",
};

const BarChartSection = () => {
  const data = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

    return months.map((month) => ({
      month,
      completed: Math.floor(Math.random() * 60) + 20,
      created: Math.floor(Math.random() * 70) + 25,
    }));
  };

  return (
    <Card>
      <Header align="center" justify="space-between" gap="16px">
        <Title>Throughput</Title>

        <LegendContainer align="center" gap="14px">
          <LegendItem align="center" gap="6px">
            <LegendDot $color={COLORS.completed} />
            Completed
          </LegendItem>

          <LegendItem align="center" gap="6px">
            <LegendDot $color={COLORS.created} />
            Created
          </LegendItem>
        </LegendContainer>
      </Header>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data()}
            margin={{ top: 10, right: 4, left: 4, bottom: 0 }}
            barCategoryGap="45%"
            barGap={3}
          >
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#edf0f5" }}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
              tickMargin={16}
            />
            <Bar
              dataKey="completed"
              name="Completed"
              fill={COLORS.completed}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              barSize={20}
            />
            <Bar
              dataKey="created"
              name="Created"
              fill={COLORS.created}
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};

export default BarChartSection;

const Card = styled.div`
  width: 100%;
  min-width: 0;
  padding: 20px;
  background: var(--white, #ffffff);
  border: 1px solid #edf0f5;
  border-radius: 13px;
  box-shadow: 0 1px 3px rgba(20, 30, 50, 0.04);
`;
const Header = styled(Flex)`
  margin-bottom: 16px;
`;
const Title = styled.span`
  color: var(--slate-700);
  font-size: var(--fs-14);
  font-weight: var(--fw-700);
`;
const LegendContainer = styled(Flex)``;
const LegendItem = styled(Flex)`
  color: #64748b;
  font-size: var(--fs-11);
`;
const LegendDot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;
const ChartContainer = styled.div`
  width: 100%;
  height: 260px;
`;
