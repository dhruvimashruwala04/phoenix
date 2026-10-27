"use client";

import { useState } from "react";
import styled from "styled-components";
import { questions } from "../../api/constants";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Card>
      <CardTitle>Frequently asked questions</CardTitle>

      {questions.map((item, index) => (
        <FAQItem key={item.question}>
          <Question
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            {item.question}
            <Toggle>{openIndex === index ? "−" : "+"}</Toggle>
          </Question>

          {openIndex === index && <Answer>{item.answer}</Answer>}
        </FAQItem>
      ))}
    </Card>
  );
};

export default FAQ;

const Card = styled.div`
  width: 100%;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-13);
  overflow: hidden;
`;
const CardTitle = styled.div`
  width: 100%;
  padding: 16px 19px;
  border-bottom: 1px solid var(--border-soft);
  color: var(--gray-700);
  font-size: var(--fs-14);
  font-weight: var(--fw-700);
`;
const FAQItem = styled.div`
  border-bottom: 1px solid var(--border-soft);
  &:last-child {
    border-bottom: none;
  }
`;
const Question = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 14px 19px;
  border: none;
  background: var(--white);
  color: var(--gray-700);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  text-align: left;
  cursor: pointer;
  &:hover {
    background: var(--gray-50);
  }
`;
const Toggle = styled.span`
  color: var(--gray-500);
  font-size: var(--fs-14);
  font-weight: var(--fw-400);
`;
const Answer = styled.p`
  margin: 0;
  padding: 0 19px 16px;
  color: var(--gray-500);
  font-size: var(--fs-12);
  line-height: var(--lh-normal);
`;
