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
  border-radius: 8px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
  color: rgb(100, 116, 139);
  position: relative;
`;
