import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ApiData, getVideos } from "../api";
import Loading from "../Components/Loading";
import { calculateRelativeOffset, getImage } from "../utils";

const Wrapper = styled.div``;

const Grid = styled.ul<{ $column: number }>`
  margin-top: 100px;
  padding: 0 10px;
  grid-gap: 50px 10px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, 1fr);
`;

const Box = styled.li``;

const Img = styled.img`
  width: 100%;
`;

function Search() {
  const [column, setColumn] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const { data, isLoading } = useQuery<ApiData>(["search", keyword], () =>
    getVideos({
      type: "search",
      option: { category: "multi", keyword, adult: false },
    })
  );

  useEffect(() => {
    const onResize = () => {
      setColumn(calculateRelativeOffset(window.innerWidth));
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
  }, [searchParams]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Grid $column={column}>
            {data?.results
              .filter((video) => video.backdrop_path && video.overview)
              .map((video) => (
                <Box key={video.id}>
                  <Img src={getImage(video.backdrop_path)} />
                </Box>
              ))}
          </Grid>
        </Wrapper>
      )}
    </>
  );
}

export default Search;