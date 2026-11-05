"use client";
import { Flex } from "@/imports/core/components/Flex";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { nav } from "../../api/constants";

const NavBar = () => {
  const [active, setActive] = useState("Overview");
  return (
    <Nav direction="column" gap="16px">
      {nav.map((main, i) => (
        <SectionWrapper key={i}>
          <Header>{main.header}</Header>
          <div>
            {main.links.map((link, index) => {
              const Icon = link.icon;
              return (
                <LinkText
                  key={index}
                  href={link.href}
                  $active={active === link.label}
                  onClick={() => setActive(link.label)}
                >
                  {Icon && <Icon />}
                  {link.color && <Dot $color={link.color} />}
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
  font-weight: var(--fw-600);
  font-size: var(--fs-12);
  line-height: var(--lh-16);
  letter-spacing: var(--ls-lg);
  color: var(--text-muted);
  text-transform: uppercase;
`;
const LinkText = styled(Link)`
  height: 40px;
  width: 100%;
  border-radius: var(--radius-8);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  font-size: var(--fs-16);
  background: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--white)" : "var(--slate-300)")};
  font-weight: var(--fw-400);
  &:hover {
    color: var(--white);
  }
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: ${({ $color }) => $color || "var(--blue-accent)"};
`;
