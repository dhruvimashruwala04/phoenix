import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";

const DangerZone = () => {
  return (
    <Card direction="column" gap="14px">
      <Header>Danger zone</Header>
      <Info>
        Type <b>DELETE</b> to permanently remove this workspace and all of its
        projects.
      </Info>
      <DeleteWrapper gap="10px">
        <Input placeholder="DELETE" />
        <DeleteBtn>Delete workspace</DeleteBtn>
      </DeleteWrapper>
    </Card>
  );
};

export default DangerZone;

const Card = styled(Flex)`
  background: var(--white);
  border-radius: 12px;
  box-shadow: var(--rose-200) 0px 0px 0px 1px inset;
  padding: 24px;
  width: 100%;
`;
const Header = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--rose-700);
  width: 100%;
`;
const Info = styled.span`
  font-size: 13px;
  color: var(--slate-600);
  width: 100%;
`;
const DeleteWrapper = styled(Flex)``;
const Input = styled.input`
  height: 38px;
  border-radius: 8px;
  border: 0px;
  box-shadow: var(--rose-200) 0px 0px 0px 1px inset;
  padding: 0px 12px;
  font-size: 14px;
  width: 240px;
  outline: 0px;
`;
const DeleteBtn = styled.button`
  height: 38px;
  padding: 0px 16px;
  border-radius: 8px;
  border: 0px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: var(--red-100);
  color: rgb(251, 113, 133);
`;
