import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { createJobFn } from "@/functions/job"
import { type jobFormSchema, jobTypeValues } from "@/lib/db/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import type * as z from "zod"
import Editor from "../wysiwyg/editor"

interface CreateJobFormProps {
  onOpenChange: (isOpen: boolean) => void
}

export default function CreateJobForm({ onOpenChange }: CreateJobFormProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useFormContext<z.infer<typeof jobFormSchema>>()

  const mutation = useMutation({
    mutationFn: createJobFn,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (values: z.infer<typeof jobFormSchema>) => {
    await mutation.mutateAsync({
      data: values,
    })
    onOpenChange(false)
  }

  return (
    <Form {...form}>
      <form id="create-job-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-6">
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground"
              htmlFor="title"
            >
              Title
            </Label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="title"
                      name="title"
                      readOnly={mutation.isPending}
                      placeholder="e.g., Software Engineer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                className="text-sm font-medium text-foreground dark:text-foreground"
                htmlFor="location"
              >
                Location
              </Label>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-2 shadow-none"
                        readOnly={mutation.isPending}
                        id="location"
                        name="location"
                        placeholder="e.g., Rabat, Morocco"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-foreground dark:text-foreground"
                htmlFor="type"
              >
                Type
              </Label>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger id="type" className="w-full">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypeValues.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground dark:text-foreground"
              htmlFor="department"
            >
              Department
            </Label>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-2 shadow-none"
                      readOnly={mutation.isPending}
                      id="department"
                      name="department"
                      placeholder="e.g., Engineering"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground dark:text-foreground"
              htmlFor="description"
            >
              Description
            </Label>
            <FormField
              control={form.control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormControl>
                    <Editor onChange={onChange} value={value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export const CreateJobButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex px-6 py-2">
      <Button
        className="bg-orange-500 hover:bg-orange-600 w-full"
        form="create-job-form"
        disabled={isPending}
        type="submit"
      >
        <div className="flex items-center">
          {isPending ? (
            <>
              <span>Adding...</span>
              <Spinner className="ml-2" />
            </>
          ) : (
            "Add Job"
          )}
        </div>
      </Button>
    </div>
  )
}
