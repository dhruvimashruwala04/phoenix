import styled from "styled-components";

const PrimaryButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  height: 38px;
  padding: 0 16px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.variant === "secondary" ? "rgb(109, 40, 217)" : "var(--blue-accent)"};
  color: white;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    background-color: #463bd1;
  }
`;

export default PrimaryButton;
