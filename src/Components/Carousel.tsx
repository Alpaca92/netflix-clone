import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { ApiData } from "../api";
import { getImage, getLastPage } from "../utils";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESIZE";
}

const Container = styled.div<{ rowheight: number }>`
  position: relative;
  height: ${(props) => props.rowheight}px;

  &:hover button {
    display: block;
  }
`;

const Row = styled(motion.ul)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;
  padding: 0 30px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled.li``;

const Img = styled.img`
  width: 100%;
`;

const Buttons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
  hidden: ({ isBack }: { isBack: boolean }) => ({
    x: isBack ? -window.innerWidth : window.innerWidth,
  }),
  visible: { x: 0 },
  exit: ({ isBack }: { isBack: boolean }) => ({
    x: isBack ? window.innerWidth : -window.innerWidth,
  }),
};

function Carousel({ data }: { data?: ApiData }) {
  const dataLength = data?.results.length || 0;
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

  const [offset, setOffset] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [lastPage, setLastPage] = useState(
    getLastPage(dataLength || 0, offset)
  );

  const reducer = (state: number, action: Action) => {
    switch (action.type) {
      case "INCREMENT":
        return state === lastPage ? 0 : state + 1;
      case "DECREMENT":
        return state === 0 ? lastPage : state - 1;
      case "RESIZE":
        return state > lastPage ? lastPage : state;
      default:
        return state;
    }
  };

  const [page, dispatch] = useReducer(reducer, 0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [rowHeight, setRowHeight] = useState(0);
  const rowElement = useRef<any>(null);

  const nextPage = () => {
    if (isLeaving) return;

    setIsBack(false);
    setIsLeaving(true);
    dispatch({ type: "INCREMENT" });
  };

  const prevPage = () => {
    if (isLeaving) return;

    setIsBack(true);
    setIsLeaving(true);
    dispatch({ type: "DECREMENT" });
  };

  useEffect(() => {
    const onResize = () => {
      setOffset(calculateRelativeOffset(window.innerWidth));
    };

    window.addEventListener("resize", onResize);
    setLastPage(getLastPage(dataLength || 0, offset));
    dispatch({ type: "RESIZE" });

    return () => window.removeEventListener("resize", onResize);
  }, [offset, lastPage, dataLength]);

  useEffect(() => {
    setRowHeight(rowElement.current.offsetHeight);
  }, [rowElement]);

  return (
    <Container rowheight={rowHeight}>
      <AnimatePresence
        custom={{ isBack }}
        initial={false}
        onExitComplete={() => setIsLeaving((prev) => !prev)}
      >
        <Row
          ref={rowElement}
          key={page}
          custom={{ isBack }}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
        >
          {data?.results
            .slice(
              page === lastPage ? dataLength - offset : offset * page,
              page === lastPage ? dataLength : offset * page + offset
            )
            .map((movie) => (
              <Box key={movie.id}>
                <Img src={getImage(movie.backdrop_path, "w500")} />
              </Box>
            ))}
        </Row>
      </AnimatePresence>
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
