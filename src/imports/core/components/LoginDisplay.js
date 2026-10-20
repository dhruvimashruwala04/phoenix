import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { AI } from "@/imports/core/assets/Icons";

const LoginDisplay = () => {
  return (
    <Wrapper justify="left" direction="column" gap="32px">
      <TextWrapper direction="column" gap="14px">
        <SupText>AI-POWERED PROJECT MANAGEMENT</SupText>
        <Header>
          Plan, prioritize and <br />
          ship with your whole <br />
          team in one place.
        </Header>
        <SubText>
          Kanban, Gantt and Calendar views with an assistant that spots risks
          before they become delays.
        </SubText>
      </TextWrapper>
      <AiChat gap="12px" direction="column">
        <WhiteSec direction="column" gap="10px">
          <WhiteHeader>AI chat integration</WhiteHeader>
          <WhiteText>Integrate OpenAI API for chat functionality</WhiteText>
          <Bar>
            <div
              style={{
                height: "100%",
                width: "60%",
                borderRadius: "var(--radius-pill)",
                background: "var(--blue-accent)",
              }}
            ></div>
          </Bar>
          <Data align="center" justify="space-between">
            <Risk>High </Risk>
            <Number>60%</Number>
          </Data>
        </WhiteSec>
        <DarkSec gap="12px" align="center">
          <AI />
          <AiText>
            "Security audit" is due in 3 days and Sarah is at 108% capacity.
            Want me to move it to Alex?
          </AiText>
        </DarkSec>
      </AiChat>
      <Stats gap="28px">
        <Stat direction="column">
          <Text>12k+ </Text>
          <Value>teams</Value>
        </Stat>
        <Stat direction="column">
          <Text>31% </Text>
          <Value>fewer missed deadlines</Value>
        </Stat>
      </Stats>
    </Wrapper>
  );
};

export default LoginDisplay;

const Wrapper = styled(Flex)`
  max-width: 400px;
  width: 100%;
`;
const TextWrapper = styled(Flex)``;
const SupText = styled.span`
  background-color: rgba(99, 102, 241, 0.2);
  color: var(--indigo-200);
  text-transform: uppercase;
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
  letter-spacing: var(--ls-lg);
  width: fit-content;
  padding: 4px 10px;
  border-radius: 50px;
`;
const Header = styled.span`
  color: var(--white);
  font-size: 36px;
  letter-spacing: -0.5px;
  font-weight: var(--fw-700);
  line-height: var(--lh-tight);
`;

const SubText = styled.span`
  color: var(--text-muted-2);
`;

const AiChat = styled(Flex)`
`;
const WhiteSec = styled(Flex)`
  width: 100%;
  border-radius: var(--radius-12);
  background-color: var(--background);
  color: var(--foreground);
  padding: 16px;
`;
const DarkSec = styled(Flex)`
  margin-left: 32px;
  border-radius: var(--radius-12);
  padding: 14px 16px;
  background-color: var(--slate-800);
  color: var(--slate-300);
`;
const AiText = styled.span`
  font-size: var(--fs-12);
  line-height: var(--lh-19);
  text-align: left;
`;
const Stats = styled(Flex)`
  color: var(--background);
`;
const Stat = styled(Flex)`
`;

const Text = styled.span`
  font-size: var(--fs-22);
  font-weight: var(--fw-700);
`;
const Value = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted-2);
`;
const WhiteHeader = styled.span`
  font-weight: var(--fw-600);
  font-size: var(--fs-14);
`;
const WhiteText = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted);
`;
const Bar = styled(Flex)`
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--slate-100);
  width: 100%;
`;
const Data = styled(Flex)`
  width: 100%;
`;
const Risk = styled.div`
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  padding: 2px 8px;
  border-radius: var(--radius-4);
  background: var(--rose-50);
  color: var(--rose-500);
`;
const Number = styled.div`
  font-size: var(--fs-10);
  color: var(--text-muted-2);
`;
