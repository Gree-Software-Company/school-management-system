import {
  AnalyticsCard,
  StaffBreakdown,
} from "../../components/analytics/analytics";
import { AnalyticsLoader } from "../../components/loaders/loaders";
import { useFetchGeneralAnalytics } from "../../services/analytics/queries";

export default function AdminDashboard() {
  const {
    data: analyticsData,
    isLoading,
    error,
    isError,
  } = useFetchGeneralAnalytics();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {isLoading ? (
        <AnalyticsLoader />
      ) : isError ? (
        <div className="text-red-500">Error: {(error as Error).message}</div>
      ) : (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <AnalyticsCard
            title="Total Students"
            value={analyticsData.totalStudents}
            color="bg-blue-500"
          />
          <AnalyticsCard
            title="Total Staff"
            value={analyticsData.totalStaff}
            color="bg-green-500"
          />
          <AnalyticsCard
            title="Total Classes"
            value={analyticsData.totalClasses}
            color="bg-purple-500"
          />
          <StaffBreakdown
            teachingStaff={analyticsData.teachingStaff}
            nonTeachingStaff={analyticsData.nonTeachingStaff}
          />
        </div>
      )}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min" />
    </div>
  );
}
