import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { SpontaneousApplicationForm } from "./spontaneous-application-form"

export function ApplySpontaneousDialog() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-orange-500 hover:bg-orange-600">
					Apply spontaneously
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] md:max-w-[525px] p-8">
				<DialogHeader>
					<DialogTitle>Apply spontaneously</DialogTitle>
				</DialogHeader>
				<SpontaneousApplicationForm onClose={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
