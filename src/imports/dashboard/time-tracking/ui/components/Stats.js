import React from "react";
import styled from "styled-components";

const Stats = () => {
  const stats = [
    {
      label: "TODAY",
      value: "5h 38m",
    },
    {
      label: "THIS WEEK",
      value: "33.9h",
    },
    {
      label: "BILLABLE",
      value: "87%",
    },
    {
      label: "WEEKLY TARGET",
      value: "32h",
    },
  ];

  return (
    <Grid>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <Label>{stat.label}</Label>
          <Value>{stat.value}</Value>
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
  font-size: var(--fs-10);
  font-weight: var(--fw-600);
`;
const Value = styled.span`
  color: #172033;
  font-size: 24px;
  font-weight: 700;
`;
