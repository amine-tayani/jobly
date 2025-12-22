import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { Spinner } from "./ui/spinner"

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
          <section>
            <h3 className="mb-2 text-lg font-semibold">What We do</h3>
            <p className="leading-relaxed text-muted-foreground">
              MarKoub.ma is a pioneering intercity bus ticketing platform in
              Morocco, committed to making travel easy, affordable, and
              convenient for everyone. We provide a seamless online experience
              for booking bus tickets, connecting users with a wide network of
              bus operators across the country. As we continue to grow, we are
              looking for a dynamic and experienced Full Stack Developer to join
              our team.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">Your Mission</h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                Developing application components using React, Next.js, and
                React Native (with Expo).
              </li>
              <li>
                Adhering to and enforcing practices, procedures, and use of tool
                sets described in the team’s working agreement.
              </li>
              <li>
                Building, improving, and maintaining our code base and projects,
                ensuring they are easy to use, properly tested, simple to
                extend, and ultimately driving value for our users.
              </li>
              <li>
                Working as a generalist across back-end, front-end, and mobile
                development priorities, building integrations and other features
                for the product.
              </li>
              <li>
                Supporting the test-driven development of the software stack
                (e.g., code reviews, unit tests, CI) and documentation.
              </li>
              <li>
                Implementing integrations with internal and external systems.
              </li>
              <li>Writing clean, efficient, and well-documented code.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">Your Profile</h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                Experience in building frontend architecture and design systems.
              </li>
              <li>Practical experience in e2e and unit testing.</li>
              <li>Working understanding of mono repos and micro-frontends.</li>
              <li>Proficient with TypeScript (both frontend and backend).</li>
              <li>Great understanding of CI/CD, GitHub Actions, and Vite.</li>
              <li>
                Experience in mobile development using React Native and Expo.
              </li>
              <li>
                Able to learn new systems and languages with a short ramp-up
                period.
              </li>
              <li>
                Experienced in architecting and implementing robust, scalable
                solutions that tackle real user needs.
              </li>
              <li>Curious, positive, and a doer mentality.</li>
              <li>
                3+ years of professional experience with React, Next.js, React
                Native, and TypeScript.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">Tech Stack</h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Frontend: React, Next.js, JavaScript, TypeScript, Vite</li>
              <li>Mobile: React Native, Expo</li>
              <li>
                Libraries: TRPC, Shadcn UI, Drizzle ORM, Node SDKs for various
                tools
              </li>
              <li>FullStack: Next.js</li>
              <li>Backend: Node.js, Nitro</li>
              <li>DB: MySQL, Planetscale, Postgres, Clickhouse</li>
              <li>Cloud: VPS, Docker, Cloudflare, R2, Cloudflare Workers</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">What We Offer</h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                Opportunity to be part of a passionate, dynamic and motivated
                team.
              </li>
              <li>
                An entrepreneurial journey in a fast growing pioneering
                scale-up.
              </li>
              <li>Flexibility and a hybrid work environment.</li>
            </ul>
          </section>
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