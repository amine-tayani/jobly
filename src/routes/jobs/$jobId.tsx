import { DetailedJobInfo } from "@/components/detailed-job-info";
import { getJobInfoFn } from "@/functions/job";
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/jobs/$jobId')({
  loader: async ({ params: { jobId } }) => {
    return await getJobInfoFn({ data: jobId })
  },
  component: DetailedJobPage,
})

function DetailedJobPage() {
  const jobInfo = Route.useLoaderData()


  return <DetailedJobInfo data={jobInfo} />
}
