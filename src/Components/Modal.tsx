import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { showModalState } from "../atoms";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

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
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.light};
`;

function Modal() {
  const setShowModal = useSetRecoilState(showModalState);
  const { scrollY } = useViewportScroll();
  const [searchParams] = useSearchParams();
  const [id, setId] = useState(parseInt(searchParams.get("id") || "0"));

  console.log(id);

  const hideModal = () => {
    document.body.style.overflowY = "visible";
    setShowModal(false);
  };

  return (
    <>
      <Overlay onClick={hideModal} />
      <ModalContainer $scrolly={scrollY.get()}>qwdqwdd</ModalContainer>
    </>
  );
}

export default Modal;
