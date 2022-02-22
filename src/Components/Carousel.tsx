import { motion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { ApiData } from "../api";
import { getImage } from "../utils";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface RowSize {
  rowWidth: number;
  rowHeight: number;
}

interface RowProps {
  $rowsize: RowSize; // 안쓰여지는 듯?
  $columngap: number;
  $offset: number;
  $datalength: number;
}

interface rowVariantsProps {
  offset: number;
  index: number;
}

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESIZE";
}

const Container = styled.div`
  &:hover button {
    display: block;
  }
`;

const Row = styled(motion.ul)<RowProps>`
  display: grid;
  width: ${(props) =>
    ((window.innerWidth - props.$columngap) * (props.$datalength / props.$offset) + props.$columngap)}px;
  grid-template-columns: repeat(${(props) => props.$datalength}, 1fr);
  padding: 0 ${(props) => props.$columngap}px;
  column-gap: ${(props) => props.$columngap}px;
`;

const Box = styled.li``;

const Img = styled.img`
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  all: unset;
  height: 100%;
  cursor: pointer;
  font-size: 30px;
  display: none;
`;

const rowVariants = {
  initial: { x: 0 },
  move: ({ index, offset }: rowVariantsProps) => {
    // 312를 실제 하나의 image + gap의 width로 변경하기
    return { x: -(312 * index) };
  },
};

function Carousel({ data }: { data?: ApiData }) {
  const calculateRelativeOffset = (width: number) => {
    switch (true) {
      case width <= 500:
        return 2;
      case 500 < width && width <= 800:
        return 3;
      case 800 < width && width <= 1100:
        return 4;
      case 1100 < width && width <= 1400:
        return 5;
      default:
        return 6;
    }
  };

  const reducer = (index: number, action: Action) => {
    switch (action.type) {
      case "INCREMENT":
        return (index =
          index + offset >= dataLength
            ? 0
            : index + offset === startingIndexOfLastPage
            ? dataLength - offset
            : index + offset);
      case "DECREMENT":
        return (index =
          index === dataLength - startingIndexOfLastPage
            ? 0
            : index === 0
            ? dataLength - offset
            : index - offset);
      case "RESIZE":
        return index > startingIndexOfLastPage
          ? startingIndexOfLastPage
          : index;
      default:
        return index;
    }
  };

  const [dataLength, setDataLength] = useState(data?.results.length || 0);
  const [columnGap, setColumnGap] = useState(10);
  const [offset, setOffset] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [startingIndexOfLastPage, setStartingIndexOfLastPage] = useState(
    dataLength - (dataLength % offset || offset)
  );
  const [index, dispatch] = useReducer(reducer, 0);
  const [rowSize, setRowSize] = useState({ rowWidth: 0, rowHeight: 0 });
  const rowElement = useRef<any>(null);

  useEffect(() => {
    const onResize = () => {
      setOffset(calculateRelativeOffset(window.innerWidth));
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [startingIndexOfLastPage]);

  useEffect(() => {
    setStartingIndexOfLastPage(dataLength - (dataLength % offset || offset));
  }, [offset, dataLength]);

  useEffect(() => {
    dispatch({ type: "RESIZE" });
  }, [startingIndexOfLastPage]);

  useEffect(() => {
    setRowSize({
      rowWidth: rowElement.current.offsetWidth,
      rowHeight: rowElement.current.offsetHeight,
    });
  }, [rowElement]);

  const nextPage = () => {
    dispatch({ type: "INCREMENT" });
  };

  const prevPage = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <Container>
      <Row
        ref={rowElement}
        $offset={offset}
        $columngap={columnGap}
        $rowsize={rowSize}
        $datalength={dataLength}
        custom={{ index, offset }}
        variants={rowVariants}
        initial="initial"
        animate="move"
        transition={{ type: "tween", ease: "easeInOut", duration: 1 }}
      >
        {data?.results.map((movie) => (
          <Box key={movie.id}>
            <Img src={getImage(movie.backdrop_path, "w500")} />
          </Box>
        ))}
      </Row>
      <Buttons>
        <Button onClick={prevPage}>
          <BsChevronCompactLeft />
        </Button>
        <Button onClick={nextPage}>
          <BsChevronCompactRight />
        </Button>
      </Buttons>
    </Container>
  );
}

export default Carousel;
