import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { Notification } from "../assets/Icons";

const NotificationBox = () => {
  return (
    <NotificationWrapper align="center" justify="center">
      <Notification />
    </NotificationWrapper>
  );
};

export default NotificationBox;
const NotificationWrapper = styled(Flex)`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-8);
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  color: var(--text-muted);
  position: relative;
`;
