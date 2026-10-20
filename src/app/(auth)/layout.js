import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import LoginDisplay from "@/imports/core/components/LoginDisplay";

const AuthLayout = ({ children }) => {
  return (
    <Page direction="row" align="stretch">
      <Left direction="column">
        <FormTop gap="12px" align="center">
          <Logo>
            <img src="logo.png" alt="logo" />
          </Logo>
          <LogoName>Phoenix</LogoName>
        </FormTop>
        <FormMain align="center" justify="center">
          {children}
        </FormMain>
        <FormBottom>© 2026 Phoenix Labs</FormBottom>
      </Left>

      <Right direction="column" justify="center">
        <LoginDisplay />
      </Right>
    </Page>
  );
};
export default AuthLayout;
const Page = styled(Flex)`
  overflow: hidden;
  height: 100vh;
  width: 100%;
`;
const Left = styled(Flex)`
  background-color: var(--white);
  padding: 32px 64px;
  width: 50%;
`;
const Right = styled(Flex)`
  background-color: var(--slate-900);
  padding: 64px;
  width: 50%;
`;
const FormTop = styled(Flex)``;
const Logo = styled.div`
  height: 28px;
  width: 28px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const LogoName = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: var(--text-heading);
`;
const FormMain = styled(Flex)`
  height: 100%;
  width: 100%;
`;
const FormBottom = styled(Flex)`
  color: var(--text-muted-2);
  font-size: 11px;
  flex-shrink: 0;
`;
