import styled from "styled-components";

const CancelButton = styled.button`
  height: ${(props) => props.height || "38px"};
  padding: 0 16px;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 7px;
  background: white;
  color: rgb(51, 65, 85);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: rgb(248, 250, 252);
  }
`;

export default CancelButton;
