import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { AI } from "../../auth/login/ui/assets/Icons";

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
                borderRadius: " 9999px",
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
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 50px;
`;
const Header = styled.span`
  color: var(--white);
  font-size: 36px;
  letter-spacing: -0.5px;
  font-weight: 700;
  line-height: 1.2;
`;

const SubText = styled.span`
  color: var(--text-muted-2);
`;

const AiChat = styled(Flex)`
`;
const WhiteSec = styled(Flex)`
  width: 100%;
  border-radius: 12px;
  background-color: var(--background);
  color: var(--foreground);
  padding: 16px;
`;
const DarkSec = styled(Flex)`
  margin-left: 32px;
  border-radius: 12px;
  padding: 14px 16px;
  background-color: var(--slate-800);
  color: var(--slate-300);
`;
const AiText = styled.span`
  font-size: 12px;
  line-height: 19px;
  text-align: left;
`;
const Stats = styled(Flex)`
  color: var(--background);
`;
const Stat = styled(Flex)`
`;

const Text = styled.span`
  font-size: 22px;
  font-weight: 700;
`;
const Value = styled.span`
  font-size: 12px;
  color: var(--text-muted-2);
`;
const WhiteHeader = styled.span`
  font-weight: 600;
  font-size: 14px;
`;
const WhiteText = styled.span`
  font-size: 12px;
  color: var(--text-muted);
`;
const Bar = styled(Flex)`
  height: 4px;
  border-radius: 9999px;
  background: var(--slate-100);
  width: 100%;
`;
const Data = styled(Flex)`
  width: 100%;
`;
const Risk = styled.div`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--rose-50);
  color: var(--rose-500);
`;
const Number = styled.div`
  font-size: 10px;
  color: var(--text-muted-2);
`;
