import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ApiData, getVideos } from "../api";
import { showModalState } from "../atoms";
import Billboard from "../Components/Billboard";
import Carousel from "../Components/Carousel";
import Loading from "../Components/Loading";
import Modal from "../Components/Modal";

const Wrapper = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h3`
  padding-left: 10px;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
`;

function Home() {
  const showModal = useRecoilValue(showModalState);
  const { data: nowPlayingMovieData, isLoading: nowPlayingMovieLoading } =
    useQuery<ApiData>(["movies", "now_playing"], () =>
      getVideos({ type: "movie", option: { category: "now_playing" } })
    );
  const { data: topRatedMovieData, isLoading: topRatedMovieLoading } =
    useQuery<ApiData>(["movies", "top_rated"], () =>
      getVideos({ type: "movie", option: { category: "top_rated" } })
    );
  const { data: upcomingMovieData, isLoading: upcomingMovieLoading } =
    useQuery<ApiData>(["movies", "upcoming"], () =>
      getVideos({ type: "movie", option: { category: "upcoming" } })
    );
  const { data: topRatedTvData, isLoading: topRatedTvLoading } =
    useQuery<ApiData>(["tv", "top_rated"], () =>
      getVideos({ type: "tv", option: { category: "top_rated" } })
    );

  const isLoading =
    topRatedMovieLoading &&
    nowPlayingMovieLoading &&
    upcomingMovieLoading &&
    topRatedTvLoading;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Billboard data={nowPlayingMovieData} />
          {[
            {
              title: "지금 뜨는 영화",
              data: topRatedMovieData,
              type: "movie",
            },
            {
              title: "출시 예정 영화",
              data: upcomingMovieData,
              type: "movie",
            },
            {
              title: "지금 뜨는 컨텐츠",
              data: topRatedTvData,
              type: "tv",
            },
          ].map((video, index) => (
            <Wrapper key={index}>
              <Title>{video.title}</Title>
              <Carousel data={video.data} type={video.type} />
            </Wrapper>
          ))}
          {showModal && <Modal />}
        </>
      )}
    </>
  );
}

export default Home;
