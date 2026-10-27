"use client";

import { useState } from "react";
import styled from "styled-components";
import { categories } from "../../api/constants";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";

const ContactSupport = () => {
  const [category, setCategory] = useState("Question");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    console.log({ category, subject, message });
    setSubject("");
    setMessage("");
  };

  return (
    <Card>
      <Title>Contact support</Title>

      <Categories>
        {categories.map((item) => (
          <CategoryButton
            key={item}
            type="button"
            $active={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </CategoryButton>
        ))}
      </Categories>

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="support-subject">Subject</Label>
        <Input
          id="support-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Short summary"
          required
        />
        <Label htmlFor="support-message">Message</Label>
        <Textarea
          id="support-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what happened..."
          required
          rows={5}
        />
        <Actions>
          <ActionButton
            icon=""
            text="Send message"
            variant="secondary"
            onClick={handleSubmit}
          />
        </Actions>
      </Form>
    </Card>
  );
};

export default ContactSupport;

const Card = styled.section`
  width: 100%;
  padding: 20px;
  background: #fff;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  box-shadow: 0 1px 2px rgba(20, 30, 50, 0.04);
`;

const Title = styled.h3`
  margin: 0 0 14px;
  color: #172033;
  font-size: 14px;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
`;

const CategoryButton = styled.button`
  padding: 7px 12px;
  border: 1px solid ${({ $active }) => ($active ? "#c9b5ff" : "#dce2eb")};
  border-radius: 20px;
  background: ${({ $active }) => ($active ? "#f5f0ff" : "#fff")};
  color: ${({ $active }) => ($active ? "#7625e8" : "#475569")};
  font-size: 12px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  margin-top: 2px;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  min-height: 39px;
  padding: 10px 12px;
  border: 1px solid #dce2eb;
  border-radius: 8px;
  outline: none;
  color: #172033;
  font-size: 13px;

  &:focus {
    border-color: #7625e8;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 11px 12px;
  border: 1px solid #dce2eb;
  border-radius: 8px;
  outline: none;
  resize: vertical;
  color: #172033;
  font-family: inherit;
  font-size: 13px;

  &:focus {
    border-color: #7625e8;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
`;

const SendButton = styled.button`
  padding: 10px 17px;
  border: none;
  border-radius: 8px;
  background: #7625e8;
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #6520c5;
  }
`;
