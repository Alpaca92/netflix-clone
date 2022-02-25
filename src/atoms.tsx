import { atom } from "recoil";

export const showModalState = atom<boolean>({
  key: "showModal",
  default: false,
});
