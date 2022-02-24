import styled from "styled-components";
import { Video } from "../api";
import { getImage } from "../utils";

const Box = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
`;

function Preview({ video }: { video: Video }) {
  return (
    <Box>
      <Img
        src={getImage(video.backdrop_path, "w500")}
        alt={`${video.title}의 이미지`}
      />
    </Box>
  );
}

export default Preview;
