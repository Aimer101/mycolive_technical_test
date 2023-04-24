import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  background-color: #eee;
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: red;
  transition: width 0.3s ease-in-out;
`;
