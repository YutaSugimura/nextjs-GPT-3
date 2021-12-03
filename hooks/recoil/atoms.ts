import { atom } from "recoil";
import { FormTypeNames } from "../../common/gpt";

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const resultState = atom({
  key: "resultState",
  default: "",
});

export const formState = atom({
  key: "formState",
  default: "Chat" as FormTypeNames,
});
