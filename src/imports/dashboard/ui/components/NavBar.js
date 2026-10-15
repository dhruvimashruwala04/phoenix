import { Flex } from "@/imports/core/components/Flex";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { nav } from "../../api/constants";

const NavBar = () => {
  return (
    <Nav direction="column" gap="16px">
      {nav.map((main, i) => (
        <SectionWrapper key={i}>
          <Header>{main.header}</Header>
          <div>
            {main.links.map((link, index) => {
              const Icon = link.icon;
              return (
                <LinkText key={index} href={link.href}>
                  {Icon && <Icon />}
                  {link.label}
                </LinkText>
              );
            })}
          </div>
        </SectionWrapper>
      ))}
    </Nav>
  );
};

export default NavBar;
const Nav = styled(Flex)`
  width: 100%;
  flex: 1 1 0%;
  overflow: auto;
  scrollbar-width: none;
  display: flex;
  padding: 8px 16px;
`;
const SectionWrapper = styled.div`
  width: 100%;
`;
const Header = styled.div`
  width: 100%;
  padding: 0px 8px 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: rgb(100, 116, 139);
  text-transform: uppercase;
`;
const LinkText = styled(Link)`
  height: 40px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  font-size: 16px;
  background: transparent;
  color: rgb(203, 213, 225);
  font-weight: 400;
  &:hover {
    color: white;
  }
`;
