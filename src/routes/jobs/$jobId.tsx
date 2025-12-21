import { DetailedJobInfo } from "@/components/detailed-job-info";
import { getJobInfo } from "@/functions/job";
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/jobs/$jobId')({
  loader: async ({ params: { jobId } }) => {
    return await getJobInfo({ data: jobId })
  },
  component: DetailedJobPage,
})

function DetailedJobPage() {
  const jobInfo = Route.useLoaderData()

  return <DetailedJobInfo data={jobInfo} />
}
