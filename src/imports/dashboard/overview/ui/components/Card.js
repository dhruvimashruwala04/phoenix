import { Flex } from "@/imports/core/components/Flex";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Card = ({
  title,
  showLink,
  linkText,
  linkHref,
  headerText,
  children,
}) => {
  return (
    <CardWrapper direction="column">
      <CardHeader align="center" justify="space-between">
        <Title>{title}</Title>

        {showLink ? (
          <HeaderLink href={linkHref}>{linkText}</HeaderLink>
        ) : (
          <HeaderText>{headerText}</HeaderText>
        )}
      </CardHeader>

      <Content>{children}</Content>
    </CardWrapper>
  );
};

export default Card;
const CardWrapper = styled(Flex)`
  /* width: 100%; */

  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgb(241, 245, 249) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
`;

const CardHeader = styled(Flex)`
  width: 100%;
  height: 48px;
  padding: 0 18px;
  border-bottom: 1px solid rgb(241, 245, 249);
`;

const Title = styled.span`
  color: rgb(15, 23, 42);
  font-size: 14px;
  font-weight: 700;
`;

const HeaderLink = styled(Link)`
  color: rgb(124, 58, 237);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
`;

const HeaderText = styled.div`
  color: rgb(100, 116, 139);
  font-size: 12px;
  font-weight: 500;
`;
const Content = styled.div`
  width: 100%;
`;
