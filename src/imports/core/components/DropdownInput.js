import styled from "styled-components";
import { Flex } from "./Flex";

const DropdownInput = ({
  label,
  value,
  onChange,
  width = "100%",
  height = "38px",
  options,
  disabled,
}) => {
  return (
    <Wrapper direction="column" gap="6px">
      {label && label}
      <Select
        value={value}
        onChange={onChange}
        width={width}
        height={height}
        disabled={disabled}
      >
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default DropdownInput;

const Wrapper = styled(Flex)`
  flex: 1 1 0%;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
`;
const Select = styled.select`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-8);
  padding: 0 8px;
  outline: none;
  font-size: var(--fs-13);
  color: var(--slate-600);
  background-color: var(--background);
  &:focus {
    border-color: var(--blue-accent);
  }
  &:disabled {
    background: var(--white);
    color: var(--text-muted-2);
    cursor: not-allowed;
  }
`;
