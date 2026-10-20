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
  background: var(--white);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-10);
  box-shadow: 0 8px 24px var(--shadow-lg);
  z-index: 50;
`;
const Action = styled(Flex)`
  height: 38px;
  padding: 0 12px;
  border-radius: var(--radius-7);
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  cursor: pointer;
  white-space: nowrap;
  ${({ $title }) =>
    $title &&
    `
      color: var(--blue-accent);
      background: var(--indigo-50);
      border: 1px solid rgb(224, 231, 255);
    `}
  &:hover {
    background: var(--slate-50);
  }
`;
