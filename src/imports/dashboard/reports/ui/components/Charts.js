"use client";
import React from "react";
import styled from "styled-components";
import PieChartSection from "./PieChartSection";
import BarChartSection from "./BarChartSection";

const Charts = ({ data }) => {
  return (
    <Container>
      <BarChartSection />
      <PieChartSection data={data} />
    </Container>
  );
};

export default Charts;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  width: 100%;
  gap: 24px;
`;
