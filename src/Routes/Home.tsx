import { useQuery } from "react-query";
import { getTopRatedMovies, ApiData } from "../api";
import Carousel from "../Components/Carousel";
import Loading from "../Components/Loading";

function Home() {
  const { data, isLoading } = useQuery<ApiData>(
    ["movies", "topRated"],
    getTopRatedMovies
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Carousel data={data} />
        </>
      )}
    </>
  );
}

export default Home;
