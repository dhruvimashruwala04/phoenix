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

  background: var(--white);
  border-radius: 12px;
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
`;

const CardHeader = styled(Flex)`
  width: 100%;
  height: 48px;
  padding: 0 18px;
  border-bottom: 1px solid var(--slate-100);
`;

const Title = styled.span`
  color: var(--slate-900);
  font-size: 14px;
  font-weight: 700;
`;

const HeaderLink = styled(Link)`
  color: var(--violet-600);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
`;

const HeaderText = styled.div`
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
`;
const Content = styled.div`
  width: 100%;
`;
