import styled from "styled-components";
import { motion } from "framer-motion";

const Circle = styled(motion.div)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border-right: 10px solid rgba(255, 255, 255, 0.2);
  border-bottom: 10px solid rgba(255, 255, 255, 0.2);
  border-top: 10px solid rgba(255, 255, 255, 0.2);
  border-left: 10px solid rgba(255, 255, 255, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

function Loading() {
  return (
    <Circle
      animate={{ rotateZ: [0, 360] }}
      transition={{ repeat: Infinity, ease: "easeInOut", duration: 1.2 }}
    />
  );
}

export default Loading;
