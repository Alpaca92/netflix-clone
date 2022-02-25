import styled from "styled-components";
import { getImage } from "../utils";
import { ApiData } from "../api";
import { RiInformationLine } from "react-icons/ri";
import Modal from "./Modal";
import { useRecoilState } from "recoil";
import { showModalState } from "../atoms";
import { useSearchParams } from "react-router-dom";
import media from "../media";

const Wrapper = styled.div<{ $bgpath: string }>`
  height: 100vh;
  padding: 0 60px;
  background-image: linear-gradient(
      rgba(20, 20, 20, 0),
      rgba(20, 20, 20, 0.4) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(${(props) => props.$bgpath});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.desktop} {
    padding: 0 30px;
  }
`;

const Title = styled.h2`
  font-weight: 600;
  margin-top: 100px;
  font-size: 120px;

  ${media.desktop} {
    margin-top: 0px;
    font-size: 60px;
  }

  ${media.tablet} {
    font-size: 30px;
  }
`;

const Overview = styled.p`
  margin-top: 30px;
  width: 50%;
  font-size: 26px;
  word-break: keep-all;
  line-height: 1.3;

  ${media.desktop} {
    width: 70%;
    margin-top: 20px;
    font-size: 20px;
  }

  ${media.tablet} {
    width: 85%;
    font-size: 14px;
  }
`;

const More = styled.button`
  all: unset;
  margin-top: 30px;
  width: 200px;
  height: 60px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(109, 109, 110, 0.7);
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(109, 109, 110, 0.4);
  }

  ${media.tablet} {
    width: 120px;
    height: 40px;
    font-size: 14px;
  }
`;

function Billboard({ data }: { data?: ApiData }) {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const [_, setSearchParams] = useSearchParams();
  const movie = data?.results[3];
  const showBillboardDetail = () => {
    setSearchParams({ id: movie?.id + "", type: "movie" });
    document.body.style.overflowY = "hidden";
    setShowModal(true);
  };

  return (
    <>
      <Wrapper $bgpath={getImage(movie?.backdrop_path || "")}>
        <Title>{movie?.title}</Title>
        <Overview>{movie?.overview}</Overview>
        <More onClick={showBillboardDetail}>
          <RiInformationLine style={{ marginRight: "5px" }} /> 상세 정보
        </More>
      </Wrapper>
      {showModal && <Modal />}
    </>
  );
}

export default Billboard;
