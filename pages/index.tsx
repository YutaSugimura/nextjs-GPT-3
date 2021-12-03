import type { NextPage } from "next";
import { useRecoilValue } from "recoil";
import { formState, loadingState, resultState } from "../hooks/recoil/atoms";
import { useTextForm } from "../hooks/form";
import { GPT_LIST } from "../common/gpt";

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    resetForm,
    getPlaceholder,
    changeFormType,
  } = useTextForm();

  const formValue = useRecoilValue(formState);
  const resultValue = useRecoilValue(resultState);
  const isLoading = useRecoilValue(loadingState);

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex items-center w-full h-10 px-2">
        <h1 className="text-2xl font-bold">Generater</h1>
      </div>

      <div className="flex justify-end items-center h-10 px-2">
        <select value={formValue} onChange={changeFormType} className="...">
          {GPT_LIST.map((item) => (
            <option key={`option_${item.name}`}>{item.name}</option>
          ))}
        </select>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:flex md:flex-wrap w-full md:border-t border-gray-400"
      >
        <div className="h-full w-full md:w-1/2 p-2">
          <div className="flex md:block justify-center md:justify-start h-10">
            <h2 className="text-xl font-bold">input</h2>
          </div>

          <textarea
            {...register("text", { required: true })}
            placeholder={getPlaceholder()}
            className="w-full h-96 bg-yellow-50 p-2 border rounded-lg resize-none"
          />
        </div>

        <div className="h-full w-full md:w-1/2 p-2">
          <div className="flex md:block justify-center md:justify-start h-10">
            <h2 className="text-xl font-bold">output</h2>
          </div>

          <div className="w-full h-96 bg-yellow-50 p-2 border rounded-lg">
            <p>{resultValue}</p>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center w-60 h-8 bg-green-500 rounded-lg text-white font-bold"
          >
            Submit
          </button>

          <button
            disabled={resultValue ? false : true}
            onClick={resetForm}
            className="flex justify-center items-center w-20 h-8 bg-gray-400 rounded-lg text-white font-bold ml-5"
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
