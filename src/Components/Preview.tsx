import { motion } from "framer-motion";
import styled from "styled-components";
import { Video } from "../api";
import { getImage } from "../utils";

const Box = styled(motion.li)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
`;

function Preview({ video }: { video: Video }) {
  return (
    <>
      <Box layoutId={video.id + ""} whileHover={{ y: -15 }}>
        <Img
          src={getImage(video.backdrop_path, "w500")}
          alt={`${video.title}의 이미지`}
        />
      </Box>
      
    </>
  );
}

export default Preview;
