import React, { PropsWithChildren } from "react";

export const UncompletedStep = ({
  children,
  isLastStep = false,
  isCurrentStep,
}: PropsWithChildren<{
  isLastStep?: boolean;
  isCurrentStep: boolean;
}>) => {
  const currentStepClasses =
    "flex items-center justify-center w-10 h-10 bg-primary rounded-full lg:h-12 lg:w-12 dark:bg-primaryHover shrink-0";

  const normalClasses =
    "flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0";
  return (
    <>
      {isLastStep && (
        <li className="flex items-center w-auto">
          <span className={isCurrentStep ? currentStepClasses : normalClasses}>
            {children}
          </span>
        </li>
      )}
      {!isLastStep && (
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className={isCurrentStep ? currentStepClasses : normalClasses}>
            {children}
          </span>
        </li>
      )}
    </>
  );
};
