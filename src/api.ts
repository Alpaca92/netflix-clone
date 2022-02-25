const BASE_URL = `https://api.themoviedb.org/3`;
const TBDB_KEY = `2fb9b79ab51f1e3d6820fdd5feda6a3e`;

export interface Video {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  media_type?: string;
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
    category: "top_rated" | "now_playing" | "upcoming";
  };
}

interface GetTv {
  type: "tv";
  option: {
    category: "top_rated" | "popular";
  };
}

type GetVideosArgs = GetMovies | GetTv;

export interface Detail {
  adult: boolean;
  backdrop_path: string;
  genres: { name: string }[];
  overview: string;
  runtime: number;
  vote_average: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface GetDetailArgs {
  type: string;
  id: number;
}

export const getVideos = async (args: GetVideosArgs) => {
  const {
    type,
    option: { category },
  } = args;
  const url = `${BASE_URL}/${type}/${category}?api_key=${TBDB_KEY}&language=ko`;

  return await (await fetch(url)).json();
};

export const searchVideos = async (args: Search) => {
  const {
    type,
    option: { category, keyword },
  } = args;
  let url = `${BASE_URL}/${type}/${category}?api_key=${TBDB_KEY}&language=ko&query=${keyword}`;

  if (!args.option.adult) url += `&include_adult=${args.option.adult}`;

  return await (await fetch(url)).json();
};

export const getDetail = async ({ type, id }: GetDetailArgs) => {
  const url = `${BASE_URL}/${type}/${id}?api_key=${TBDB_KEY}&language=ko`;

  return await (await fetch(url)).json();
};
