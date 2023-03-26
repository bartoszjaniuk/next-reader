export const ProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  return (
    <div className="mb-4 w-full min-w-[500px]">
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`bg-primary h-full text-xl font-medium text-blue-100 text-center p-1 leading-none rounded-full  w-[${progressPercentage}%]`}
        >
          {progressPercentage}%
        </div>
      </div>
    </div>
  );
};
