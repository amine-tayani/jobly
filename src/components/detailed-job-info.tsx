import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { submitApplicationFn } from "@/functions/application"
import {
  type ApplicationFormSchema,
  applicationFormSchema,
  type jobs,
} from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import type { InferSelectModel } from "drizzle-orm"
import { ChevronLeft } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "./ui/form"
import { DescriptionViewer } from "./wysiwyg/viewer"

export type JobInfo = Omit<
  InferSelectModel<typeof jobs>,
  "createdAt" | "updatedAt"
>

interface DetailedJobInfoProps {
  data: JobInfo
}

export function DetailedJobInfo({ data }: DetailedJobInfoProps) {
  const [resumeFile, setResumeFile] = React.useState<File | null>(null)
  const [resumeFileName, setResumeFileName] = React.useState<string>("")
  const resumeInputRef = React.useRef<HTMLInputElement>(null)

  type FormSchema = Omit<ApplicationFormSchema, "position">

  const form = useForm<FormSchema>({
    resolver: zodResolver(applicationFormSchema.omit({ jobId: true, position: true })),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: submitApplicationFn,
    onSuccess: (data) => {
      toast.success(data.message)
      form.reset()
      setResumeFile(null)
      setResumeFileName("")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (values: FormSchema) => {

    if (!resumeFile) {
      toast.error("Please upload your resume.")
      return
    }

    try {
      const formdata = new FormData()

      formdata.append("name", values.name)
      formdata.append("email", values.email)
      formdata.append("resume", resumeFile)

      formdata.append("position", data.title)
      formdata.append("job_id", data.id)

      await mutation.mutateAsync({ data: formdata })

    }
    catch (err) {
      console.log(err)
      toast.error("Failed to submit application.")
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 text-sm text-muted-foreground">
        <Link
          to="/"
          className="text-muted-foreground inline-flex items-center font-medium"
        >
          {" "}
          <ChevronLeft size={16} className="size-4 mr-2" /> Browse all open
          positions
        </Link>
      </div>
      <div className="grid grid-cols-[280px_1fr] gap-16">
        <Card className="h-fit rounded-xl p-6 border-none shadow-none bg-gray-50">
          <h2 className="text-xl font-bold -my-2">{data.title}</h2>
          <p className="-my-1 text-sm text-muted-foreground">
            {data.type} · {data.location}
          </p>
          <a href="#application-form">
            <Button className="w-fit bg-orange-500 hover:bg-orange-600">
              Apply
            </Button>
          </a>

        </Card>

        <div className="space-y-8">

          <DescriptionViewer content={data.description} />

          <Form {...form}>
            <form id="application-form" onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="h-fit rounded-xl p-6 border-none shadow-md bg-background">
                <h2 className="text-xl font-semibold">Application</h2>
                <div className="space-y-3 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        className="text-sm font-medium text-foreground"
                        htmlFor="title"
                      >
                        Full Name *
                      </Label>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                id="name"
                                name="name"
                                placeholder="Yassine Alaoui"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <Label
                        className="text-sm font-medium text-foreground"
                        htmlFor="email"
                      >
                        Email address *
                      </Label>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                id="email"
                                name="email"
                                placeholder="example@mail.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Resume *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => resumeInputRef.current?.click()}
                      className={cn(
                        "w-full h-10 hover:bg-transparent flex items-center justify-center cursor-pointer",
                        "text-sm text-muted-foreground border-border shadow-none",
                      )}
                    >
                      {resumeFileName || "Resume"}
                    </Button>
                    <Input
                      ref={resumeInputRef}
                      type="file"
                      id="resume"
                      name="resume"
                      readOnly={mutation.isPending}
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        setResumeFile(file ?? null)
                        setResumeFileName(file ? file.name : "")
                      }}
                    />
                    <FormDescription className="font-medium mt-2">
                      {" "}
                      PDF only, 2MB max
                    </FormDescription>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-orange-500 hover:bg-orange-600 w-fit"
                  >
                    {mutation.isPending ? <>
                      <span>Submitting</span>
                      <Spinner className="ml-2" />
                    </>
                      : "Submit Application"}
                  </Button>
                </div>
              </Card>
            </form>
          </Form>
        </div>


      </div>
    </main>
  )
}