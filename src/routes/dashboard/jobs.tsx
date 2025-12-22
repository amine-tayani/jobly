import { JobsTable } from "@/components/jobs/table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllJobsFn } from "@/functions/job";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/jobs")({
  component: JobsDashboardPage,
});

function JobsDashboardPage() {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobsFn,
  });

  const data = [
    {
      title: "Total Jobs",
      value: jobs.length
    },
    {
      title: "Total applications",
      value: 9
    },
  ];

  return (
    <div className="flex h-full">
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 mx-7 mb-4">
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-5 gap-4 mt-2 mb-4">
            {data.map((item) => (
              <Card
                className="flex flex-col border-border dark:border-none shadow-none "
                key={item.title}
              >
                <CardHeader className="relative">
                  <CardDescription className="text-sm font-medium -mt-2">
                    <span>{item.title}</span>
                  </CardDescription>
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums mt-2">
                    {item.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <JobsTable data={jobs} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}