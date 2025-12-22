import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { jobFormSchema } from "@/lib/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import type * as z from "zod"
import CreateJobForm, { CreateJobButton } from "./create-job-form"

interface CreateJobSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateJobSheet({
  open,
  onOpenChange,
}: CreateJobSheetProps) {
  const form = useForm<
    z.input<typeof jobFormSchema>,
    unknown,
    z.output<typeof jobFormSchema>
  >({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      department: "",
      type: "hybrid",
      location: "",
      description: "",
    },
  })

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset()
    }
    onOpenChange(isOpen)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col min-w-[500px] p-6 rounded-lg overflow-y-auto">
        <SheetHeader className="text-lg ml-1.5">
          <SheetTitle>Create Job</SheetTitle>
        </SheetHeader>
        <FormProvider {...form}>
          <CreateJobForm onOpenChange={handleOpenChange} />
          <CreateJobButton isPending={form.formState.isSubmitting} />
        </FormProvider>
      </SheetContent>
    </Sheet>
  )
}
