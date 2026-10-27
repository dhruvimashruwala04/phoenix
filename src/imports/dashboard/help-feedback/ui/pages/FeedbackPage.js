import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import FAQ from "../components/FAQ";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import HelpResources from "../components/HelpResources";
import ContactSupport from "../components/ContactSupport";

const FeedbackPage = () => {
  return (
    <Page direction="column">
      <Header />
      <Content gap="24px">
        <Section direction="column" gap="24px">
          <FAQ />
          <KeyboardShortcuts />
        </Section>
        <Section direction="column" gap="24px">
          <HelpResources />
          <ContactSupport />
        </Section>
      </Content>
    </Page>
  );
};

export default FeedbackPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
const Section = styled(Flex)`
  width: 100%;
`;
