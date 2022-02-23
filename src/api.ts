const BASE_URL = `https://api.themoviedb.org/3`;
const TBDB_KEY = `2fb9b79ab51f1e3d6820fdd5feda6a3e`;

interface Result {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface ApiData {
  results: Result[];
}

interface Search {
  type: "search";
  option: {
    category: "multi";
    keyword: string;
    adult?: boolean;
  };
}

interface GetMovies {
  type: "movie";
  option: {
    category: "top_rated" | "now_playing";
  };
}

interface GetTv {
  type: "tv";
  option: {
    category: "top_rated" | "popular";
  };
}

type GetVideosArgs = Search | GetMovies | GetTv;

export const getVideos = async ({ type, option }: GetVideosArgs) => {
  let url = `${BASE_URL}/${type}/${option.category}?api_key=${TBDB_KEY}&language=ko`;

  return url;
};

export const getTopRatedMovies = async () =>
  await (
    await fetch(`${BASE_URL}/movie/top_rated?api_key=${TBDB_KEY}&language=ko`)
  ).json();

export const getNowPlayingMovies = async () =>
  await (
    await fetch(`${BASE_URL}/movie/now_playing?api_key=${TBDB_KEY}&language=ko`)
  ).json();
