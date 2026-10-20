import styled from "styled-components";

const PrimaryButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "38px"};
  padding: 0 16px;
  border-radius: var(--radius-7);
  background-color: ${(props) =>
    props.variant === "secondary" ? "var(--violet-700)" : "var(--blue-accent)"};
  color: var(--white);
  font-size: var(--fs-15);
  font-weight: var(--fw-500);

  &:hover {
    cursor: pointer;
    background-color: var(--blue-accent-hover);
  }
`;

export default PrimaryButton;
