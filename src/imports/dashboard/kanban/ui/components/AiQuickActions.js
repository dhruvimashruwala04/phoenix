import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";

const AiQuickActions = ({ actions, onAction }) => {
  return (
    <QuickActions align="center">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Action align="center" gap="7px"
            key={action.label}
            $title={action.title}
            onClick={() => {
              action.action?.();
              if (action.reply) {
                onAction(action.reply);
              }
            }}
          >
            <Icon />
            <span>{action.label}</span>
          </Action>
        );
      })}
    </QuickActions>
  );
};

export default AiQuickActions;

const QuickActions = styled(Flex)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  height: 48px;
  padding: 5px 8px;
  background: white;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  z-index: 50;
`;
const Action = styled(Flex)`
  height: 38px;
  padding: 0 12px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  color: rgb(71, 85, 105);
  cursor: pointer;
  white-space: nowrap;
  ${({ $title }) =>
    $title &&
    `
      color: rgb(79, 70, 229);
      background: rgb(238, 242, 255);
      border: 1px solid rgb(224, 231, 255);
    `}
  &:hover {
    background: rgb(248, 250, 252);
  }
`;
