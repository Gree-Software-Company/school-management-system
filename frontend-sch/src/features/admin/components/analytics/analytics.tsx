import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsCard({ title, value, color }: AnalyticsCardProps) {
  return (
    <Card className={`${color} text-white`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export function StaffBreakdown({
  teachingStaff,
  nonTeachingStaff,
}: StaffBreakdownProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Staff Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">
            {teachingStaff}
          </div>
          <div className="text-sm text-muted-foreground">Teaching Staff</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {nonTeachingStaff}
          </div>
          <div className="text-sm text-muted-foreground">
            Non-Teaching Staff
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
