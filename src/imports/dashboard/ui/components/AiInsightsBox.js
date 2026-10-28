import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { AiInsights } from "@/imports/core/assets/Icons";

const AiInsightsBox = ({ variant = "primary", text, onClick }) => {
  return (
    <AiInsightsWrapper
      align="center"
      gap="8px"
      $variant={variant}
      onClick={onClick}
    >
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
  border-radius: var(--radius-8);
  border: ${({ $variant }) =>
    $variant === "primary" ? "0px" : "1px solid rgb(237, 233, 254)"};
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--indigo-50)" : "var(--white)"};
  color: ${({ $variant }) =>
    $variant === "primary" ? "var(--blue-accent)" : " var(--violet-700)"};
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  display: flex;
  cursor: pointer;
`;
