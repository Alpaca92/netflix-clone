import { motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { ApiData } from "../api";
import { calculateRelativeOffset } from "../utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Preview from "./Preview";

interface RowProps {
  $imagegap: number;
  $offset: number;
  $datalength: number;
  $windowwidth: number;
}

interface rowVariantsProps {
  index: number;
  imageGap: number;
  dataLength: number;
  offset: number;
  windowWidth: number;
}

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESIZE";
}

const Container = styled.div`
  position: relative;

  &:hover button {
    display: block;
  }
`;

const Row = styled(motion.ul)<RowProps>`
  display: grid;
  width: ${(props) =>
    (props.$windowwidth - props.$imagegap) *
      (props.$datalength / props.$offset) +
    props.$imagegap}px;
  grid-template-columns: repeat(${(props) => props.$datalength}, 1fr);
  padding: 0 ${(props) => props.$imagegap}px;
  column-gap: ${(props) => props.$imagegap}px;
`;

const Button = styled(motion.button)`
  all: unset;
  position: absolute;
  top: 0;
  height: 100%;
  cursor: pointer;
  font-size: 30px;
  color: ${(props) => props.theme.white.light};
  display: none;

  &:last-child {
    right: 0;
  }
`;

const rowVariants = {
  initial: { x: 0 },
  move: ({
    index,
    offset,
    imageGap,
    dataLength,
    windowWidth,
  }: rowVariantsProps) => {
    return {
      x: -(
        (((windowWidth - imageGap) * (dataLength / offset)) / dataLength) *
        index
      ),
    };
  },
};

function Carousel({ data }: { data?: ApiData }) {
  const reducer = (index: number, action: Action) => {
    switch (action.type) {
      case "INCREMENT":
        return (index =
          index + offset >= dataLength
            ? 0
            : index + offset >= dataLength - offset
            ? dataLength - offset
            : index + offset);
      case "DECREMENT":
        return (index =
          index === 0
            ? dataLength - offset
            : index <= (dataLength % offset || offset)
            ? 0
            : index - offset);
      case "RESIZE":
        return index > dataLength - offset ? dataLength - offset : index;
      default:
        return index;
    }
  };

  const [dataLength] = useState(data?.results.length || 0);
  const [imageGap] = useState(10);
  const [offset, setOffset] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [index, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    const onResize = () => {
      setOffset(calculateRelativeOffset(window.innerWidth));
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    dispatch({ type: "RESIZE" });
  }, [offset, dataLength]);

  const nextPage = () => {
    dispatch({ type: "INCREMENT" });
  };

  const prevPage = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <Container>
      <Row
        $offset={offset}
        $imagegap={imageGap}
        $datalength={dataLength}
        $windowwidth={windowWidth}
        custom={{ index, offset, imageGap, dataLength, windowWidth }}
        variants={rowVariants}
        initial="initial"
        animate="move"
        transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
      >
        {data?.results.filter(video => video.backdrop_path).map((video) => (
          <Preview key={video.id} video={video} />
        ))}
      </Row>
      <Button
        onClick={prevPage}
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <FaChevronLeft />
      </Button>
      <Button
        onClick={nextPage}
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <FaChevronRight />
      </Button>
    </Container>
  );
}

export default Carousel;
