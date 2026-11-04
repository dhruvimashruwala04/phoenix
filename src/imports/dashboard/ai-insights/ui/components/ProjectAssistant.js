"use client";
import { useState } from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { answers, defaultAnswer, suggestions } from "../../api/constants";
import { AI } from "@/imports/dashboard/kanban/ui/assets/Icons";
import Input from "@/imports/core/components/Input";
import PrimaryButton from "@/imports/core/components/PrimaryButton";

const ProjectAssistant = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const handleAsk = (value = question) => {
    const trimmedQuestion = value.trim();

    if (!trimmedQuestion) return;

    const matchedAnswer = answers[trimmedQuestion.toLowerCase()];

    setAnswer(matchedAnswer || defaultAnswer);
    setQuestion(trimmedQuestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAsk();
  };

  return (
    <Wrapper direction="column" gap="14px">
      <Heading align="center" gap="8px">
        <AI />
        Ask about your projects
      </Heading>

      <Suggestions align="center" gap="8px" wrap="wrap">
        {suggestions.map((item) => (
          <SuggestionButton
            key={item}
            type="button"
            onClick={() => handleAsk(item)}
          >
            {item}
          </SuggestionButton>
        ))}
      </Suggestions>

      <AskForm align="center" gap="8px">
        <Input
          placeholder="e.g. Which tasks are most likely to slip?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk();
            }
          }}
        />
        <PrimaryButton onClick={handleAsk} width="fit-content">
          Ask
        </PrimaryButton>
      </AskForm>

      {answer && (
        <AnswerContainer direction="column" gap="12px">
          <AnswerTitle>{answer.title}</AnswerTitle>

          <AnswerText>{answer.description}</AnswerText>

          <AnswerList>
            {answer.points.map((point, index) => (
              <AnswerItem key={index}>{point}</AnswerItem>
            ))}
          </AnswerList>

          <Conclusion>{answer.conclusion}</Conclusion>
        </AnswerContainer>
      )}
    </Wrapper>
  );
};

export default ProjectAssistant;

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 18px;
  background: var(--white);
  border: 1px solid var(--slate-100);
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.04);
  box-sizing: border-box;
`;

const Heading = styled(Flex)`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
`;

const Suggestions = styled(Flex)`
  width: 100%;
`;

const SuggestionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  background: #eef0ff;
  color: #5145ed;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #e0e3ff;
  }
`;

const AskForm = styled(Flex)`
  width: 100%;
`;

const QuestionInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  outline: none;
  background: #f8fafc;
  color: var(--text-primary);
  font-size: 13px;

  &:focus {
    border-color: #5145ed;
    background: var(--white);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const AskButton = styled.button`
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 8px;
  background: #5145ed;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #4035d5;
  }
`;

const AnswerContainer = styled(Flex)`
  width: 100%;
  margin-top: 6px;
  padding: 16px;
  border: 1px solid var(--slate-100);
  border-radius: 10px;
  background: #f8fafc;
  box-sizing: border-box;
`;

const AnswerTitle = styled.h3`
  margin: 0;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
`;

const AnswerText = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
`;

const AnswerList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const AnswerItem = styled.li`
  margin-bottom: 8px;
  color: var(--text-primary);
  font-size: 13px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Conclusion = styled.p`
  margin: 0;
  padding: 10px 12px;
  border-radius: 7px;
  background: #eef0ff;
  color: #5145ed;
  font-size: 12px;
  line-height: 1.5;
`;
