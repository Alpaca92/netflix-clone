import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ApiData, searchVideos } from "../api";
import { showModalState } from "../atoms";
import Loading from "../Components/Loading";
import Modal from "../Components/Modal";
import Preview from "../Components/Preview";
import { calculateRelativeOffset } from "../utils";

const Wrapper = styled.div``;

const Grid = styled.ul<{ $column: number }>`
  margin-top: 100px;
  padding: 0 10px;
  grid-gap: 50px 10px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, 1fr);
`;

function Search() {
  const showModal = useRecoilValue(showModalState);
  const [column, setColumn] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const { data, isLoading } = useQuery<ApiData>(["search", keyword], () =>
    searchVideos({
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
        <>
          <Wrapper>
            <Grid $column={column}>
              {data?.results
                .filter((video) => video.backdrop_path && video.media_type)
                .map((video) => (
                  <Preview
                    key={video.id}
                    video={video}
                    type={video.media_type || ""}
                  />
                ))}
            </Grid>
          </Wrapper>
          {showModal && <Modal />}
        </>
      )}
    </>
  );
}

export default Search;
