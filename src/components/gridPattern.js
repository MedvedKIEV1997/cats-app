import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  gap: 12px;

  *:nth-child(10n-9) {
    grid-row-end: span 2;
  }
  *:nth-child(10n-2) {
    grid-row-end: span 2;
  }
  *:nth-child(10n-6) {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }
  *:nth-child(10n-1) {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }
`;

export default Grid;
