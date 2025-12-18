import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
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
import { submitApplicationFn } from "@/functions/application"
import {
  type ApplicationFormSchema,
  applicationFormSchema,
} from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface ApplicationFormProps {
  onClose?: () => void
}

export function ApplicationForm({ onClose }: ApplicationFormProps) {
  const [resumeFile, setResumeFile] = React.useState<File | null>(null)
  const [resumeFileName, setResumeFileName] = React.useState<string>("")
  const resumeInputRef = React.useRef<HTMLInputElement>(null)

  const form = useForm<ApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
    },
  })

  const mutation = useMutation({
    mutationFn: submitApplicationFn,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit = async (values: ApplicationFormSchema) => {
    if (!resumeFile) {
      toast.error("Please upload your resume.")
      return
    }

    try {
      const formdata = new FormData()
      formdata.append("name", values.name)
      formdata.append("email", values.email)
      formdata.append("position", values.position)
      formdata.append("resume", resumeFile)

      await mutation.mutateAsync({ data: formdata })

      form.reset()
      setResumeFile(null)
      setResumeFileName("")

      if (onClose) {
        onClose()
      }
    } catch (err) {
      toast.error("Failed to submit application.")
      console.error(err)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4"
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>Full Name *</Label>
              <FormControl>
                <Input
                  placeholder="Yassine Alaoui"
                  readOnly={mutation.isPending}
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email address *</Label>
              <FormControl>
                <Input
                  placeholder="example@mail.com"
                  readOnly={mutation.isPending}
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="position">Position applying for *</Label>
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <Select
                  disabled={mutation.isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="position" className="w-full">
                      <SelectValue placeholder="Position applying for *" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Frontend Engineer">
                      Frontend Engineer
                    </SelectItem>
                    <SelectItem value="Backend Engineer">
                      Backend Engineer
                    </SelectItem>
                    <SelectItem value="Full Stack Developer">
                      Full Stack Developer
                    </SelectItem>
                    <SelectItem value="UX/UI Designer">
                      UX/UI Designer
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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

        <Button
          disabled={mutation.isPending}
          type="submit" className="bg-orange-500 hover:bg-orange-600">
          {mutation.isPending ? <>
            <span>Submitting</span>
            <Spinner className="ml-2" />
          </>
            : "Submit Application"}
        </Button>
      </form>
    </Form>
  )
}
