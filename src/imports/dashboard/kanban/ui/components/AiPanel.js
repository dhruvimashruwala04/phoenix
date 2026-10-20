"use client";
import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { AI, Send } from "../assets/Icons";
import useAuthStore from "@/imports/auth/store/authStore";
import { aiSuggestions, help } from "../../api/constants";
import useKanbanStore from "../../store/kanbanStore";
import { Close } from "@/imports/core/assets/Icons";
import PrimaryButton from "@/imports/core/components/PrimaryButton";

const AiPanel = ({ reply }) => {
  const user = useAuthStore((state) => state.user);
  const { setAiPanel } = useKanbanStore();
  const firstName = user?.name.split(" ")[0];

  return (
    <Panel direction="column">
      <Header align="center" justify="space-between">
        <Wrapper gap="8px">
          <Text>AI Assistant</Text>
          <Badge>Beta</Badge>
        </Wrapper>
        <CloseBtn
          align="center"
          justify="center"
          onClick={() => setAiPanel(false)}
        >
          <Close />
        </CloseBtn>
      </Header>

      <Main direction="column" gap="12px">
        <Greet align="center" gap="10px">
          <AiIcon justify="center" align="center">
            <AI />
          </AiIcon>
          <BoldText>Hi {firstName}!</BoldText>
        </Greet>
        <SubText>How can I help you today?</SubText>
        {help.map((item, index) => (
          <Row key={index} gap="12px" align="center">
            <Icon align="center" justify="center">
              {item.icon}
            </Icon>
            <TextWrapper direction="column">
              <Title>{item.title}</Title>
              <ContentVal>{item.content}</ContentVal>
            </TextWrapper>
          </Row>
        ))}
        <BoldText>AI Suggestions</BoldText>
        {aiSuggestions.map((s, i) => (
          <Suggestion
            key={i}
            direction="column"
            gap="10px"
            $variant={s.variant}
          >
            <HeadingText align="center" gap="6px">
              <SIcon>{s.icon}</SIcon>
              <SText $variant={s.variant}>{s.title}</SText>
            </HeadingText>
            <SuggestionText>{s.content}</SuggestionText>
            <Btn $variant={s.variant}>{s.buttonText}</Btn>
          </Suggestion>
        ))}
        {reply?.map((r, i) => (
          <QuickActionText key={i}>{r}</QuickActionText>
        ))}
      </Main>

      <AskAi gap="8px">
        <AskInput placeholder="Ask AI anything..."></AskInput>
        <PrimaryButton width="fit-content">
          <Send />
        </PrimaryButton>
      </AskAi>
    </Panel>
  );
};

export default AiPanel;

const Panel = styled(Flex)`
  width: 335px;
  max-width: 100%;
  flex-shrink: 0;
  background: var(--white);
  border-left: 1px solid var(--slate-100);
  position: fixed;
  right: 0px;
  top: 0px;
  height: 100vh;
  z-index: 40;
  box-shadow: none;
`;
const Header = styled(Flex)`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid var(--slate-100);
  padding: 0px 20px;
`;
const Text = styled.div`
  font-weight: var(--fw-700);
  font-size: var(--fs-14);
  color: var(--slate-900);
`;
const Badge = styled.div`
  background: var(--indigo-50);
  color: var(--blue-accent);
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
  padding: 2px 6px;
  border-radius: var(--radius-4);
  text-transform: uppercase;
`;
const CloseBtn = styled(Flex)`
  background: transparent;
  color: var(--text-muted-2);
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-6);
  &:hover {
    background-color: var(--slate-50);
  }
`;
const Wrapper = styled(Flex)``;
const Main = styled(Flex)`
  flex: 1 1 0%;
  overflow: auto;
  padding: 20px;
  width: 100%;
`;
const Greet = styled(Flex)``;
const AiIcon = styled(Flex)`
  width: 28px;
  height: 28px;
  border-radius: var(--radius-8);
  background: var(--indigo-50);
  color: var(--blue-accent);
  font-size: var(--fs-12);
`;
const BoldText = styled.span`
  font-weight: var(--fw-700);
  font-size: var(--fs-14);
`;
const SubText = styled.div`
  font-size: var(--fs-12);
  color: var(--text-muted);
`;
const Row = styled(Flex)`
  width: 100%;
  text-align: left;
  cursor: pointer;
  background: var(--indigo-50);
  border-radius: var(--radius-10);
  padding: 12px;
`;
const Icon = styled(Flex)`
  width: 28px;
  height: 28px;
  border-radius: var(--radius-8);
  background: var(--white);
  color: var(--blue-accent);
  font-size: var(--fs-12);
  flex-shrink: 0;
`;
const TextWrapper = styled(Flex)``;
const Title = styled.span`
  font-size: var(--fs-12);
  font-weight: var(--fw-700);
  color: var(--slate-900);
`;
const ContentVal = styled.span`
  font-size: var(--fs-10);
  color: var(--text-muted);
`;
const Suggestion = styled(Flex)`
  border-radius: var(--radius-10);
  background: ${({ $variant }) =>
    $variant === "red" ? "var(--rose-50)" : " var(--emerald-50)"};
  box-shadow: ${({ $variant }) =>
      $variant === "red" ? "var(--rose-200)" : " var(--emerald-200)"}
    0px 0px 0px 1px inset;

  padding: 16px;
`;
const SuggestionText = styled.span`
  font-size: var(--fs-12);
  line-height: var(--lh-19);
  color: var(--slate-700);
  font-style: italic;
`;
const HeadingText = styled(Flex)`
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  letter-spacing: var(--ls-md);
  color: ${({ $variant }) =>
    $variant === "red" ? "var(--rose-600)" : "var(--emerald-600)"};
`;

const Btn = styled(Flex)`
  align-self: flex-start;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "red" ? "var(--rose-200)" : "var(--emerald-200)"};
  background: var(--white);
  color: ${({ $variant }) =>
    $variant === "red" ? "var(--rose-600)" : "var(--emerald-600)"};
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  padding: 5px 10px;
  border-radius: var(--radius-6);
  cursor: pointer;
`;
const SText = styled.span`
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  letter-spacing: var(--ls-md);
  color: ${({ $variant }) =>
    $variant === "red" ? "var(--rose-600)" : "var(--emerald-600)"};
  text-transform: uppercase;
`;
const SIcon = styled(Flex)``;
const AskAi = styled(Flex)`
  padding: 16px 20px;
  border-top: 1px solid var(--slate-100);
  width: 100%;
`;
const AskInput = styled.input`
  flex: 1 1 0%;
  min-width: 0px;
  height: 38px;
  border-radius: var(--radius-8);
  border: 0px;
  background: var(--slate-50);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  padding: 0px 12px;
  font-size: var(--fs-12);
  outline: 0px;
`;
const QuickActionText = styled(Flex)`
  max-width: 85%;
  font-size: var(--fs-12);
  line-height: var(--lh-18);
  padding: 10px 12px;
  border-radius: var(--radius-10);
  white-space: pre-wrap;
  background: var(--slate-50);
  color: var(--slate-700);
`;
