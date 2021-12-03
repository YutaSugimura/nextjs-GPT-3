import { SubmitHandler, useForm } from "react-hook-form";
import OpenAI from "openai-api";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { loadingState, resultState } from "./recoil/atoms";

const openai = new OpenAI(process.env.NEXT_PUBLIC_API_KEY ?? "");

type FormData = {
  text: string;
};

export const useTextForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const setIsLoading = useSetRecoilState(loadingState);
  const setValue = useSetRecoilState(resultState);
  const resetIsLoading = useResetRecoilState(loadingState);
  const resetValue = useResetRecoilState(resultState);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const gptResponse = await openai.complete({
      engine: "davinci-instruct-beta",
      prompt: data.text,
      temperature: 0,
      maxTokens: 120,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
    });

    const responseMessage = gptResponse.data.choices[0].text;
    setValue(responseMessage);
    resetIsLoading();
  };

  const resetForm = () => {
    reset();
    resetValue();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    resetForm,
  };
};
