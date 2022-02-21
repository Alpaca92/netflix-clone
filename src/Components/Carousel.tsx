import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ApiData } from "../api";

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
      case width <= 800:
        return 3;
      case width <= 1100:
        return 4;
      case width <= 1400:
        return 5;
      default:
        return 6;
    }
  };
  const [offset, setOffset] = useState(
    calculateRelativeOffset(window.innerWidth)
  );
  const [page, setPage] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setOffset(calculateRelativeOffset(window.innerWidth))
    );

    return () =>
      window.removeEventListener("resize", () =>
        setOffset(calculateRelativeOffset(window.innerWidth))
      );
  }, []);

  return (
    <Container>
      <AnimatePresence>
        <Row>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9]
            .slice(offset * page, offset * page + offset)
            .map((movie) => (
              <Box>{movie}</Box>
            ))}
        </Row>
      </AnimatePresence>
      <button>{"<"}</button>
      <button>{">"}</button>
    </Container>
  );
}

export default Carousel;
