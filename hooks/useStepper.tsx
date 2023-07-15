import { useState } from "react";

export const useStepper = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () =>
    setStep((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });

  const resetStep = () => setStep(0);
  return { step, nextStep, prevStep, resetStep };
};
