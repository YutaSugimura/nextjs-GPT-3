import { SubmitHandler, useForm } from "react-hook-form";
import OpenAI from "openai-api";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { formState, loadingState, resultState } from "./recoil/atoms";
import { FormTypeNames, GPT_LIST } from "../common/gpt";

const openai = new OpenAI(process.env.NEXT_PUBLIC_API_KEY ?? "");

type FormData = {
  text: string;
};

export const useTextForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const formValues = useRecoilValue(formState);
  const setIsLoading = useSetRecoilState(loadingState);
  const setValue = useSetRecoilState(resultState);
  const setFormValues = useSetRecoilState(formState);
  const resetIsLoading = useResetRecoilState(loadingState);
  const resetValue = useResetRecoilState(resultState);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const targetArgs = GPT_LIST.filter((item) => item.name === formValues);
    if (!targetArgs.length) return;

    setIsLoading(true);

    const gptResponse = await openai.complete({
      engine: "davinci-instruct-beta",
      prompt: data.text,
      ...(targetArgs[0].args as any),
    });

    const responseMessage = gptResponse.data.choices[0].text;
    setValue(responseMessage);
    resetIsLoading();
  };

  const resetForm = () => {
    reset();
    resetValue();
  };

  const getPlaceholder = () => {
    const targetArgs = GPT_LIST.filter((item) => item.name === formValues);
    if (!targetArgs.length) return "";

    return targetArgs[0].placeholder;
  };

  const changeFormType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues(e.target.value as FormTypeNames);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    resetForm,
    getPlaceholder,
    changeFormType,
  };
};
