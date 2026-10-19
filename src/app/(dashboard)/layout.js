"use client";
import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import NavBar from "@/imports/dashboard/ui/components/NavBar";
import useAuthStore from "@/imports/auth/store/authStore";
import { Logout } from "@/imports/dashboard/ui/assets/Icons";
import getInitials from "@/imports/core/utils/getInitials";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuthStore();
  const initials = getInitials(user?.name);

  return (
    <Page direction="row" align="stretch">
      <Left direction="column">
        <LogoWrapper gap="12px" align="center">
          <LogoIcon>
            <img src="logo.png" alt="logo" />
          </LogoIcon>
          <LogoName>Phoenix</LogoName>
        </LogoWrapper>
        <NavBar />
        <User align="center" gap="12px">
          <Initials align="center" justify="center">
            {initials}
          </Initials>
          <Details direction="column">
            <Name>{user?.name}</Name>
            <Email>{user?.email}</Email>
          </Details>
          <LogoutBtn align="center" justify="center" onClick={logout}>
            <Logout />
          </LogoutBtn>
        </User>
      </Left>

      <Right>{children}</Right>
    </Page>
  );
};
export default DashboardLayout;
const Page = styled(Flex)`
  overflow: hidden;
  height: 100vh;
  width: 100%;
`;
const Left = styled(Flex)`
  background-color: #0f172a;
  max-width: 256px;
  width: 100%;
`;
const Right = styled(Flex)`
  background-color: #ffffff;
  width: 100%;
`;
const LogoWrapper = styled(Flex)`
  height: 80px;
  width: 100%;
  padding: 24px;
`;
const LogoIcon = styled.div`
  height: 32px;
  width: 32px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const LogoName = styled.span`
  font-size: 17px;
  font-weight: 600;
  font-size: 18px;
  color: rgb(255, 255, 255);
`;

const User = styled(Flex)`
  border-top: 1px solid rgb(30, 41, 59);
  padding: 16px;
  width: 100%;
`;
const Initials = styled(Flex)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgb(51, 65, 85);
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;
const Details = styled(Flex)`
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
`;
const Name = styled.span`
  display: flex;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Email = styled.span`
  display: flex;
  color: rgb(100, 116, 139);
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LogoutBtn = styled(Flex)`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 0px;
  background: transparent;
  color: rgba(195, 205, 219, 1);
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;
