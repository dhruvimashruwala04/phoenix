import styled from "styled-components";

const CancelButton = styled.button`
  height: ${(props) => props.height || "38px"};
  padding: 0 16px;
  border: 1px solid var(--border-muted);
  border-radius: 7px;
  background: var(--white);
  color: var(--slate-700);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--slate-50);
  }
`;

export default CancelButton;
