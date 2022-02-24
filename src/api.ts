const BASE_URL = `https://api.themoviedb.org/3`;
const TBDB_KEY = `2fb9b79ab51f1e3d6820fdd5feda6a3e`;

export interface Video {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface ApiData {
  results: Video[];
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

export const getVideos = async (args: GetVideosArgs) => {
  const {
    type,
    option: { category },
  } = args;
  let url = `${BASE_URL}/${type}/${category}?api_key=${TBDB_KEY}&language=ko`;

  if (type === "search") {
    const {
      option: { keyword, adult },
    } = args;

    url += `&query=${keyword}`;

    if (!adult) url += `&include_adult=${adult}`;
  }

  return await (await fetch(url)).json();
};
