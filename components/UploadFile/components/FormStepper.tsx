import React from "react";
import { CompletedStep } from "./CompletedStep";
import { UncompletedStep } from "./UncompletedStep";

export const FormStepper = ({ step }: { step: number }) => {
  const getStateForCurrentStep = (step: number) => {
    if (step === 0)
      return {
        isStep0Completed: false,
        isStep1Completed: false,
        isStep2Completed: false,
      };
    if (step === 1)
      return {
        isStep0Completed: true,
        isStep1Completed: false,
        isStep2Completed: false,
      };
    if (step === 2)
      return {
        isStep0Completed: true,
        isStep1Completed: true,
        isStep2Completed: false,
      };
    return {
      isStep0Completed: false,
      isStep1Completed: false,
      isStep2Completed: false,
    };
  };

  const { isStep0Completed, isStep1Completed, isStep2Completed } =
    getStateForCurrentStep(step);

  return (
    <ol className="flex items-center w-full pb-6">
      {isStep0Completed ? (
        <CompletedStep />
      ) : (
        <UncompletedStep isCurrentStep={step === 0}>
          <SecondStepIcon />
        </UncompletedStep>
      )}

      {isStep1Completed ? (
        <CompletedStep />
      ) : (
        <UncompletedStep isCurrentStep={step === 1}>
          <SecondStepIcon />
        </UncompletedStep>
      )}
      {isStep2Completed ? (
        <CompletedStep />
      ) : (
        <UncompletedStep isCurrentStep={step === 2} isLastStep>
          <ThirdStepIcon />
        </UncompletedStep>
      )}
    </ol>
  );
};

const ThirdStepIcon = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-layoutLight lg:w-6 lg:h-6 dark:text-gray-200"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
    <path
      fill-rule="evenodd"
      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clip-rule="evenodd"
    ></path>
  </svg>
);

const SecondStepIcon = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-layoutLight lg:w-6 lg:h-6 dark:text-gray-200"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
      clip-rule="evenodd"
    ></path>
  </svg>
);
