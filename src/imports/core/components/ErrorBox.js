import styled from "styled-components";
import { Flex } from "./Flex";

const ErrorBox = ({ children }) => {
  return (
    <Box align="center" gap="8px">
      <ErrorIcon align="center" justify="center">
        !
      </ErrorIcon>

      {children}
    </Box>
  );
};
export default ErrorBox;

const ErrorIcon = styled(Flex)`
  width: 14px;
  height: 14px;
  /* flex-shrink: 0; */
  border-radius: var(--radius-full);
  background-color: var(--rose-600);
  color: var(--white);
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
`;
const Box = styled(Flex)`
  width: 100%;
  min-height: 36px;
  padding: 0 12px;
  border-radius: var(--radius-8);
  background-color: var(--rose-50);
  color: var(--rose-600);
  font-size: var(--fs-12);
  font-weight: var(--fw-500);
`;
