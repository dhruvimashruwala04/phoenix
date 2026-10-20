import styled from "styled-components";

const Input = ({
  variant = "input",
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
}) => {
  if (variant === "textarea") {
    return (
      <TextArea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        width={width}
      />
    );
  }
  return (
    <InputBox
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      $error={$error}
      width={width}
      height={height}
    />
  );
};

export default Input;

const InputBox = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
