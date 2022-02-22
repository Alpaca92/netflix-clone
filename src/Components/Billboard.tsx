import styled from "styled-components";
import { ApiData } from "../api";

const Wrapper = styled.div`
  height: 100vh;
`;

function Billboard({ data }: { data?: ApiData }) {
  return <Wrapper>Billboard</Wrapper>;
}

export default Billboard;
