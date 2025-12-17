
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ApplicationFormSchema, insertApplicationSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ApplicationForm() {
  const form = useForm<ApplicationFormSchema>(
    { resolver: zodResolver(insertApplicationSchema), defaultValues: {} }
  )

  const onSubmit = async (values: ApplicationFormSchema) => {
    toast.info("Spontaneous application feature coming soon!")
    console.log(values);
  };

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3 p-4">
          <div className="space-y-2">
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
          <div className="space-y-2">
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

          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground"
              htmlFor="position"
            >
              Position applying for *
            </Label>
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="position"
                      name="position"
                      placeholder="Position applying for"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="resume"
              className="text-sm font-medium text-foreground"
            >
              Resume *
            </Label>
            <FormField
              control={form.control}
              name="resumeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      accept="application/pdf"
                      id="resume"
                      name="resume"
                    />
                  </FormControl>
                  <FormDescription>
                    PDF only, 2 MB Max
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Submit application
        </Button>
      </form>
    </Form>
  )
}
