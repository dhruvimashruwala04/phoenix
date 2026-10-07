import React from "react";
import styled from "styled-components";
import { Add } from "../assets/Icons";

const ActionButton = ({
  text,
  icon = <Add />,
  variant = "primary",
  onClick,
}) => {
  return (
    <Button $variant={variant} onClick={onClick}>
      {icon}
      {text}
    </Button>
  );
};

export default ActionButton;

const Button = styled.button`
  white-space: nowrap;
  height: 36px;
  padding: 0px 16px;
  border: 0px;
  background: ${({ $variant }) =>
    $variant === "primary" ? "rgb(79, 70, 229)" : "rgb(109, 40, 217)"};
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
`;
