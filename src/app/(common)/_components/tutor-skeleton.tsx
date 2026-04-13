const TutorSkeleton = () => (
  <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 animate-pulse">
    <div className="w-20 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-4" />
    <div className="w-3/4 h-7 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
    <div className="flex gap-2 mb-6">
      <div className="w-16 h-5 bg-gray-100 dark:bg-gray-800 rounded-full" />
      <div className="w-16 h-5 bg-gray-100 dark:bg-gray-800 rounded-full" />
    </div>
    <div className="space-y-2 mb-6">
      <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded" />
      <div className="w-5/6 h-4 bg-gray-100 dark:bg-gray-800 rounded" />
    </div>
    <div className="w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
  </div>
);

export default TutorSkeleton;
