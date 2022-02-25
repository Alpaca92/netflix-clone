import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ApiData, getVideos } from "../api";
import { showModalState } from "../atoms";
import Loading from "../Components/Loading";
import Modal from "../Components/Modal";
import Preview from "../Components/Preview";
import { calculateRelativeOffset } from "../utils";

const Wrapper = styled.div`
  margin-top: 100px;
`;

const Grid = styled.ul<{ $column: number }>`
  padding: 0 10px;
  grid-gap: 50px 10px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, 1fr);
`;

function Tv() {
  const showModal = useRecoilValue(showModalState);
  const [column, setColumn] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const { isLoading, data } = useQuery<ApiData>(["tv", "popular"], () =>
    getVideos({ type: "tv", option: { category: "popular" } })
  );

  useEffect(() => {
    const onResize = () => {
      setColumn(calculateRelativeOffset(window.innerWidth));
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            <Grid $column={column}>
              {data?.results
                .filter((video) => video.backdrop_path)
                .map((video) => (
                  <Preview key={video.id} video={video} type={"tv"} />
                ))}
            </Grid>
          </Wrapper>
          {showModal && <Modal />}
        </>
      )}
    </>
  );
}

export default Tv;
