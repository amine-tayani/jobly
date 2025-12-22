import {
  Pill,
  PillIndicator,
  type PillIndicatorProps,
} from "@/components/ui/pill"
import type { JobItem } from "@/lib/db/schema"

type JobTypeConfig = {
  label: string
  variant: PillIndicatorProps["variant"]
}

const JOB_TYPES: Record<JobItem["type"], JobTypeConfig> = {
  hybrid: { label: "Hybrid", variant: "info" },
  onsite: { label: "Onsite", variant: "success" },
  remote: { label: "Remote", variant: "warning" },
}

interface Props {
  type: JobItem["type"]
}

export function DataTableColumnType({ type }: Props) {
  const { label, variant } = JOB_TYPES[type]

  return (
    <div className="px-2">
      <Pill className="h-5 px-3">
        <PillIndicator variant={variant} />
        {label}
      </Pill>
    </div>
  )
}
