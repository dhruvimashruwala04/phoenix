import styled from "styled-components";
import { Flex } from "./Flex";

const Input = ({
  variant = "input",
  label,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  name,
  $error,
  rows,
  width = "100%",
  height = "38px",
  action,
}) => {
  if (variant === "textarea") {
    return (
      <Wrapper direction="column" gap="6px" width={width}>
        {label && label}
        <TextArea name={name} value={value} onChange={onChange} rows={rows} />
      </Wrapper>
    );
  }
  return (
    <Wrapper direction="column" gap="6px" width={width}>
      <Header justify="space-between">
        {label && label}
        {action && action}
      </Header>
      <InputBox
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        $error={$error}
        label={label}
        height={height}
      />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled(Flex)`
  width: 100%;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  width: ${({ width }) => width};
`;
const Header = styled(Flex)`
  width: 100%;
`;
const InputBox = styled.input`
  height: ${({ height }) => height};
  width: 100%;
  border: 1px solid
    ${({ $error }) => ($error ? "var(--rose-600)" : "var(--border-input)")};
  border-radius: var(--radius-7);
  padding: 0 12px;
  outline: none;
  font-size: var(--fs-13);
  color: var(--text-heading);
  background-color: var(--background);
  &::placeholder {
    color: var(--text-subtle);
  }
  &:focus {
    border-color: var(--blue-accent);
  }
  ${({ $flex }) => $flex && "flex: 1;"}
`;
const TextArea = styled.textarea`
  width: 100%;
  border-radius: var(--radius-8);
  border: 0px;
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  padding: 10px 12px;
  font-size: var(--fs-13);
  outline: 0px;
  width: ${({ width }) => width};
  resize: vertical;
  &::placeholder {
    color: var(--text-subtle);
  }
  &:focus {
    border-color: var(--blue-accent);
  }
`;
