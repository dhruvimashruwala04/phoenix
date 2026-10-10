import styled from "styled-components";
import { Flex } from "./Flex";

const FallBackText = ({ text }) => {
  const Tick = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-check preview-icon"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 9-5.5 5.5L8 12" />
      </svg>
    );
  };

  return (
    <Container direction="column" gap="10px" align="center">
      <Icon>
        <Tick />
      </Icon>
      <Text>{text}</Text>
    </Container>
  );
};

export default FallBackText;

const Container = styled(Flex)`
  width: 100%;
  padding: 48px 20px;
`;
const Icon = styled(Flex)`
  color: rgb(148, 163, 184);
`;
const Text = styled.div`
  font-size: 13px;
  color: rgb(148, 163, 184);
`;
