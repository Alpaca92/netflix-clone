import styled from "styled-components";
import { getImage } from "../utils";
import { ApiData } from "../api";
import { RiInformationLine } from "react-icons/ri";

const Wrapper = styled.div<{ $bgpath: string }>`
  height: 100vh;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.$bgpath});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 120px;
`;

const Overview = styled.p`
  margin-top: 30px;
  width: 50%;
  font-size: 30px;
  word-break: keep-all;
`;

const More = styled.button`
  all: unset;
  margin-top: 30px;
  width: 200px;
  height: 60px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(109, 109, 110, 0.7);
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(109, 109, 110, 0.4);
  }
`;

function Billboard({ data }: { data?: ApiData }) {
  const movie = data?.results[3];

  return (
    <Wrapper $bgpath={getImage(movie?.backdrop_path || "")}>
      <Title>{movie?.title}</Title>
      <Overview>{movie?.overview}</Overview>
      <More>
        <RiInformationLine style={{ marginRight: "5px" }} /> 상세 정보
      </More>
    </Wrapper>
  );
}

export default Billboard;
