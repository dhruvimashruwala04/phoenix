import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { AiInsights } from "../assets/Icons";

const AiInsightsBox = ({ variant = "primary", text, onClick }) => {
  return (
    <AiInsightsWrapper $variant={variant} onClick={onClick}>
      <AiInsights />
      {text}
    </AiInsightsWrapper>
  );
};

export default AiInsightsBox;
const AiInsightsWrapper = styled(Flex)`
  flex-shrink: 0;
  white-space: nowrap;
  height: 36px;
  padding: 0px 14px;
  border-radius: 8px;
  border: 0px;
  background: ${({ $variant }) =>
    $variant === "primary" ? "rgb(238, 242, 255)" : "rgb(255, 255, 255)"};
  color: ${({ $variant }) =>
    $variant === "primary" ? "rgb(79, 70, 229)" : " rgb(109, 40, 217)"};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
