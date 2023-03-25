export const ProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  return (
    <div className="h-3 mb-4 w-2/3 min-w-[500px]">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full  w-[${progressPercentage}%]`}
        >
          {progressPercentage}%
        </div>
      </div>
    </div>
  );
};
