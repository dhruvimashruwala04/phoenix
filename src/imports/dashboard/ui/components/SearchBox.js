import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Search } from "../assets/Icons";
import { Close } from "@/imports/core/assets/Icons";

const SearchBox = ({ width, placeholder, value = "", onChange, onClear }) => {
  return (
    <Container align="center" gap="8px" $width={width}>
      <Search />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value?.length > 0 && (
        <CloseButton onClick={onClear}>
          <Close size={9} />
        </CloseButton>
      )}
    </Container>
  );
};

export default SearchBox;

const Container = styled(Flex)`
  min-width: 140px;
  width: ${({ $width }) => $width || "280px"};
  height: 36px;
  border-radius: var(--radius-8);
  background: var(--slate-50);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  padding: 0 10px;
  color: var(--text-muted-2);
  position: relative;
`;
const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--slate-700);
  font-size: var(--fs-13);
  &::placeholder {
    color: var(--text-muted-2);
  }
`;
const CloseButton = styled(Flex)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
