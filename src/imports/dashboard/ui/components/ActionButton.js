import React from "react";
import styled from "styled-components";
import { Add } from "../assets/Icons";

const ActionButton = ({
  text,
  icon = <Add />,
  variant = "primary",
  height = "32px",
  onClick,
}) => {
  return (
    <Button $variant={variant} $height={height} onClick={onClick}>
      {icon}
      {text}
    </Button>
  );
};

export default ActionButton;

const Button = styled.button`
  white-space: nowrap;
  height: ${({ $height }) => $height};
  padding: 0px 16px;
  border: 0px;
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "var(--blue-accent)"
      : $variant === "secondary"
        ? "var(--violet-700)"
        : "rgb(220, 38, 38)"};
  color: var(--white);
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: var(--radius-8);
`;
