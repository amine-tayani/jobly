import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/applications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='p-8'>Hello /dashboard/applications</div>
}