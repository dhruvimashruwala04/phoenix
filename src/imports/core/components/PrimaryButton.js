import styled from "styled-components";

const PrimaryButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "38px"};
  padding: 0 16px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.variant === "secondary" ? "var(--violet-700)" : "var(--blue-accent)"};
  color: var(--white);
  font-size: 15px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    background-color: var(--blue-accent-hover);
  }
`;

export default PrimaryButton;
