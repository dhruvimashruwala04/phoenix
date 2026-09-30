import styled from "styled-components";
import { Flex } from "./Flex";

const PrimaryButton = styled(Flex)`
  width: 100%;
  height: 38px;
  border-radius: 7px;
  background-color: var(--blue-accent);
  color: white;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #463bd1;
  }
`;

export default PrimaryButton;
