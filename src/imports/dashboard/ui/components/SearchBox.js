import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Search } from "../assets/Icons";

const SearchBox = ({ width, placeholder }) => {
  return (
    <Container $width={width}>
      <Search />
      <Input type="text" placeholder={placeholder} />
    </Container>
  );
};

export default SearchBox;

const Container = styled(Flex)`
  flex: 0 1 280px;
  min-width: 140px;
  width: ${({ $width }) => $width || "280px"};
  height: 36px;
  border-radius: 8px;
  background: rgb(248, 250, 252);
  box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  color: rgb(148, 163, 184);
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: rgb(51, 65, 85);
  font-size: 13px;
  &::placeholder {
    color: rgb(148, 163, 184);
  }
`;
