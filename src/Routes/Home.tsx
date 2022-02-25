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
  const activateModal = useRecoilValue(showModalState);
  const { data: topRatedData, isLoading: topRatedLoading } = useQuery<ApiData>(
    ["movies", "top_rated"],
    () => getVideos({ type: "movie", option: { category: "top_rated" } })
  );
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<ApiData>(["movies", "now_playing"], () =>
      getVideos({ type: "movie", option: { category: "now_playing" } })
    );
  const { data: upcomingData, isLoading: upcomingLoading } = useQuery<ApiData>(
    ["movies", "upcoming"],
    () => getVideos({ type: "movie", option: { category: "upcoming" } })
  );

  const isLoading = topRatedLoading && nowPlayingLoading && upcomingLoading;

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
          <Wrapper>
            <Title>출시 예정 영화</Title>
            <Carousel data={upcomingData} />
          </Wrapper>
          {activateModal && <Modal />}
        </>
      )}
    </>
  );
}

export default Home;
