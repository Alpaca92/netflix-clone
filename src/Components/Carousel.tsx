import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { ApiData } from "../api";

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESIZE";
}

const Container = styled.div`
  padding: 0 20px;
`;

const Row = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;

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

const Box = styled.li`
  background-color: black;
`;

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

  const [offset, setOffset] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [lastPage, setLastPage] = useState(
    Math.floor((data?.results.length || 0) / offset) - 1
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

  const nextPage = () => {
    dispatch({ type: "INCREMENT" });
  };

  const prevPage = () => {
    dispatch({ type: "DECREMENT" });
  };

  useEffect(() => {
    const onResize = () => {
      setOffset(calculateRelativeOffset(window.innerWidth));
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setLastPage(Math.floor((data?.results.length || 0) / offset) - 1);
  }, [offset]);

  useEffect(() => {
    dispatch({ type: "RESIZE" });
  }, [lastPage]);

  return (
    <Container>
      <AnimatePresence>
        <Row>
          {data?.results
            .slice(offset * page, offset * page + offset)
            .map((movie) => (
              <Box key={movie.id}>{movie.title}</Box>
            ))}
        </Row>
      </AnimatePresence>
      <button onClick={prevPage}>{"<"}</button>
      <button onClick={nextPage}>{">"}</button>
    </Container>
  );
}

export default Carousel;
