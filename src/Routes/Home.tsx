import { useQuery } from "react-query";
import styled from "styled-components";
import { getTopRatedMovies, ApiData, getNowPlayingMovies } from "../api";
import Billboard from "../Components/Billboard";
import Carousel from "../Components/Carousel";
import Loading from "../Components/Loading";

const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.h3`
  padding-left: 10px;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
`;

function Home() {
  const { data: topRatedData, isLoading: topRatedLoading } = useQuery<ApiData>(
    ["movies", "topRated"],
    getTopRatedMovies
  );
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<ApiData>(["movies", "nowPlaying"], getNowPlayingMovies);
  const isLoading = topRatedLoading && nowPlayingLoading;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Billboard data={nowPlayingData} />
          <Wrapper>
            <Title>지금 뜨는 영화</Title>
            <Carousel data={topRatedData} />
          </Wrapper>
        </>
      )}
    </>
  );
}

export default Home;
