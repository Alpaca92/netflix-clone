import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { showModalState } from "../atoms";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { Detail, getDetail } from "../api";
import Loading from "./Loading";
import { getImage } from "../utils";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContainer = styled(motion.div)<{ $scrolly: number }>`
  z-index: 99999;
  position: absolute;
  top: ${(props) => props.$scrolly + 100}px;
  width: 80%;
  max-width: 900px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.light};
`;

const Img = styled.img`
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const TextContainer = styled.div`
  padding: 30px 50px;
`;

const Genres = styled.ul`
  display: flex;
`;

const Genre = styled.li`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: black;

  & + li {
    margin-left: 10px;
  }
`;

const Title = styled.h4`
  margin-top: 10px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const Svg = styled.svg`
  margin-left: 10px;
  width: 30px;
`;

const Date = styled.small`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #777;
`;

const Overview = styled.p`
  margin-top: 20px;
  line-height: 1.4;
  word-break: keep-all;
`;

function Modal() {
  const setShowModal = useSetRecoilState(showModalState);
  const { scrollY } = useViewportScroll();
  const [searchParams] = useSearchParams();
  const [id] = useState(parseInt(searchParams.get("id") || "0"));
  const [type] = useState(searchParams.get("type") || "");
  const { data, isLoading } = useQuery<Detail>([type, id], () =>
    getDetail({ type, id })
  );

  const hideModal = () => {
    document.body.style.overflowY = "visible";
    setShowModal(false);
  };

  return (
    <>
      <Overlay onClick={hideModal} />
      <ModalContainer $scrolly={scrollY.get()}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Img
              src={getImage(data?.backdrop_path || "")}
              alt={`${type === "tv" ? data?.name : data?.title}의 사진`}
            />

            <TextContainer>
              <Genres>
                {data?.genres.map((genre) => (
                  <Genre key={genre.id}>{genre.name}</Genre>
                ))}
              </Genres>
              <Title>
                {data?.name || data?.title}{" "}
                {data?.adult ? (
                  <Svg viewBox="0 0 100 100">
                    <path
                      fill="#C52E37"
                      d="M88.728 100H11.27C5.043 100 0 94.957 0 88.73V11.274C0 5.048 5.043 0 11.27 0h77.458C94.954 0 100 5.048 100 11.274V88.73c0 6.227-5.046 11.27-11.272 11.27"
                    />
                    <path
                      fill="#FFFFFE"
                      d="M81.473 15.482c.846 0 1.534.687 1.534 1.533v22.099c0 2.036-.283 3.563-.852 4.581-.568 1.02-1.542 1.947-2.918 2.784l-4.581 2.431 4.58 2.156c.777.417 1.424.834 1.93 1.254.51.42.917.931 1.215 1.528.298.6.507 1.32.626 2.157.12.84.182 1.858.182 3.058v23.533c0 .846-.686 1.533-1.533 1.533H43.21a1.536 1.536 0 01-1.535-1.533V59.063c0-2.218.255-3.896.763-5.036.51-1.135 1.538-2.127 3.1-2.961l4.582-2.156-4.581-2.43c-1.376-.838-2.35-1.778-2.92-2.832-.565-1.046-.855-2.563-.855-4.534V17.015c0-.846.688-1.533 1.534-1.533zm-45.008 0V84.13H21.103V34.62h-5.485l7.104-19.136h13.743zm29.913 39.176h-7.89c-.845 0-1.534.686-1.534 1.532v13.737c0 .846.689 1.534 1.535 1.534h7.89c.846 0 1.534-.688 1.534-1.534V56.19c0-.846-.688-1.532-1.535-1.532zm0-26.548h-7.89c-.845 0-1.534.686-1.534 1.532v12.014c0 .846.689 1.533 1.535 1.533h7.89c.846 0 1.534-.687 1.534-1.533V29.642c0-.846-.688-1.532-1.535-1.532z"
                    />
                  </Svg>
                ) : null}
              </Title>
              <Date>{data?.first_air_date || data?.release_date}</Date>
              <Overview>{data?.overview}</Overview>
            </TextContainer>
          </>
        )}
      </ModalContainer>
    </>
  );
}

export default Modal;
