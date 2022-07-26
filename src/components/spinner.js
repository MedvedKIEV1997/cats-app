import styled from "@emotion/styled";

const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-top: 100px;
  margin-bottom: 100px;
  border: 3px solid #fbe0dc;
  border-radius: 50%;
  border-top-color: #ff868e;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export default Spinner;
