type CheckIfButtonIsDisabledProps = {
  step: number;
  bookFile: File | undefined;
  isValid: boolean;
};

export const checkIfButtonIsDisabled = ({
  bookFile,
  isValid,
  step,
}: CheckIfButtonIsDisabledProps) => {
  if (step === 0 && !bookFile) return true;
  if (step === 1 && !isValid) return true;
  if (step === 2 && (!bookFile || !isValid)) return true;
  return false;
};
