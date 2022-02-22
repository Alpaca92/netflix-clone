import { useQuery } from "react-query";
import { getTopRatedMovies, ApiData, getNowPlayingMovies } from "../api";
import Billboard from "../Components/Billboard";
import Carousel from "../Components/Carousel";
import Loading from "../Components/Loading";

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
          <Carousel data={topRatedData} />
        </>
      )}
    </>
  );
}

export default Home;
