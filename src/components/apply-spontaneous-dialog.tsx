import { Button } from "@/components/ui/button";
import {
	Dialog, DialogContent, DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { type ApplicationFormSchema, insertApplicationSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ApplicationForm } from "./application-form";

export function ApplySpontaneousDialog() {
	const form = useForm<ApplicationFormSchema>(
		{ resolver: zodResolver(insertApplicationSchema), defaultValues: {} }
	)

	const onSubmit = async (values: ApplicationFormSchema) => {
		toast.info("Spontaneous application feature coming soon!")
		console.log(values);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-orange-500 hover:bg-orange-600">
					Apply spontaneously
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] md:max-w-[525px] p-8">
				<DialogHeader>
					<DialogTitle>Apply spontaneously</DialogTitle>
				</DialogHeader>
				<ApplicationForm />
			</DialogContent>
		</Dialog>
	)
}
