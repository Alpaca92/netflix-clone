import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();

  return <div>{searchParams.get("keyword")}</div>;
}

export default Search;
