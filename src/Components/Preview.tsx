import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Video } from "../api";
import { showModalState } from "../atoms";
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
  const setShowModal = useSetRecoilState(showModalState);

  const showVideoDetail = () => {
    document.body.style.overflowY = "hidden";
    setShowModal(true);
  };

  return (
    <>
      <Box
        onClick={showVideoDetail}
        layoutId={video.id + ""}
        whileHover={{ y: -15 }}
      >
        <Img
          src={getImage(video.backdrop_path, "w500")}
          alt={`${video.title}의 이미지`}
        />
      </Box>
    </>
  );
}

export default Preview;
