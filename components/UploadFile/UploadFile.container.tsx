import React from "react";
import { FormStepper } from "./components/FormStepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UploadFileFormFieldValues } from "./UploadFileForm.types";
import { schema } from "./schema";
import { useFile } from "./hooks/useFile";
import { stepTitle } from "./UploadFile.consts";
import { StepButtons } from "../StepButtons/StepButtons";
import { FirstStep } from "@/app/uploadFile/components/firstStep/FirstStep";
import { useUploadFile } from "./hooks/useUploadFile";
import { useStepper } from "@/hooks/useStepper";
import { SecondStep } from "@/app/uploadFile/components/secondStep/SecondStep";
import { ThirdStep } from "@/app/uploadFile/components/thirdStep/ThirdStep";
import { checkIfButtonIsDisabled } from "@/app/uploadFile/utils/checkIfButtonIsDisabled";
import { Loader } from "../Loader/Loader";

export const UploadFileContainer = () => {
  const { step, nextStep, prevStep, resetStep } = useStepper();

  const {
    handleBookFileChange,
    handleUploadFile,
    handleRemoveBookFile,
    bookFile,
    bookFileRef,
    cloudinaryImageUrl,
    isLoading: uploadFileIsLoading,
    isImageLoading,
    handleSerializeAndUploadBook,
  } = useUploadFile({ step, prevStep, resetStep, nextStep });

  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm<UploadFileFormFieldValues>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const {
    handleFileChange: handleImageChange,
    file: imageFile,
    fileRef: imageFileRef,
    previewUrl,
  } = useFile();

  const handleFirstStep = () => {
    if (!imageFile) return;
    handleUploadFile({ image: imageFile });
  };

  const handleSecondStep = () => {
    if (!bookFile) return;
    handleSerializeAndUploadBook(getValues("bookName"), bookFile);
  };

  const isLoading = uploadFileIsLoading || isImageLoading;

  return (
    <div className="w-full lg:w-3/4 xl:w-1/2 flex flex-col items-center">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary self-start mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {stepTitle[step]}
          </h1>
          <FormStepper step={step} />
          {step === 0 && (
            <FirstStep
              bookFile={bookFile}
              bookFileRef={bookFileRef}
              onBookFileChange={handleBookFileChange}
              onRemoveBookFile={handleRemoveBookFile}
            />
          )}
          {step === 1 && (
            <SecondStep
              bookFile={bookFile}
              imageFile={imageFile}
              imageFileRef={imageFileRef}
              previewUrl={previewUrl}
              register={register}
              handleRemoveBookFile={handleRemoveBookFile}
              onImageChange={handleImageChange}
            />
          )}
          {step == 2 && (
            <ThirdStep
              bookName={getValues("bookName")}
              bookFile={bookFile}
              cloudinaryImageUrl={cloudinaryImageUrl}
              onRemoveBookFile={handleRemoveBookFile}
            />
          )}
          <StepButtons
            isNextDisabled={checkIfButtonIsDisabled({
              bookFile,
              isValid,
              step,
            })}
            step={step}
            nextStep={nextStep}
            previousStep={prevStep}
            onFirstStep={handleFirstStep}
            onSecondStep={handleSecondStep}
          />
        </>
      )}
    </div>
  );
};
