import styled from "styled-components";
import { shortcuts } from "../../api/constants";
import { Flex } from "@/imports/core/components/Flex";

const KeyboardShortcuts = () => {
  return (
    <Card>
      <Title>Keyboard shortcuts</Title>
      {shortcuts.map((item, i) => (
        <ShortcutRow key={i} align="center" justify="space-between">
          <Label>{item.label}</Label>

          <Keys align="center" gap="5px">
            {item.keys.map((key, index) => (
              <Key key={`${item.label}-${index}`}>{key}</Key>
            ))}
          </Keys>
        </ShortcutRow>
      ))}
    </Card>
  );
};

export default KeyboardShortcuts;

const Card = styled.div`
  width: 100%;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-13);
`;
const Title = styled.div`
  width: 100%;
  padding: 16px 19px;
  border-bottom: 1px solid var(--border-soft);
  color: var(--gray-700);
  font-size: var(--fs-14);
  font-weight: var(--fw-700);
`;
const ShortcutRow = styled(Flex)`
  min-height: 43px;
  padding: 0 19px;
  border-bottom: 1px solid var(--border-soft);
  &:last-child {
    border-bottom: none;
  }
`;
const Keys = styled(Flex)``;
const Label = styled.span`
  color: var(--gray-600);
  font-size: var(--fs-13);
`;
const Key = styled.kbd`
  min-width: 23px;
  padding: 3px 6px;
  border: 1px solid var(--border-soft);
  border-radius: 5px;
  background: var(--gray-50);
  color: var(--gray-700);
  font-size: var(--fs-11);
  font-weight: var(--fw-600);
  text-align: center;
  box-shadow: 0 1px 1px #e2e8f0;
`;
