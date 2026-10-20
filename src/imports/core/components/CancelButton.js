import styled from "styled-components";

const CancelButton = styled.button`
  height: ${(props) => props.height || "38px"};
  padding: 0 16px;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-7);
  background: var(--white);
  color: var(--slate-700);
  font-size: var(--fs-15);
  font-weight: var(--fw-500);
  cursor: pointer;

  &:hover {
    background: var(--slate-50);
  }
`;

export default CancelButton;
