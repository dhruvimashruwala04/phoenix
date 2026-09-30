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
  border-radius: 50%;
  background-color: #e11d48;
  color: white;
  font-size: 9px;
  font-weight: 700;
`;
const Box = styled(Flex)`
  width: 100%;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  background-color: #fff1f2;
  color: #e11d48;
  font-size: 12px;
  font-weight: 500;
`;
