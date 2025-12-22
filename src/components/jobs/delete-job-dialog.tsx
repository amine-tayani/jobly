import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { singleOrBulkDeleteJobFn } from "@/functions/job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface DeleteJobDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  jobIds: string[]
}

export function DeleteJobDialog({
  isOpen,
  setIsOpen,
  jobIds
}: DeleteJobDialogProps) {


  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await singleOrBulkDeleteJobFn({ data: { ids: jobIds } })
    },
    onSuccess: () => {
      toast.success("Jobs deleted successfully")
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-sm [&>*]:text-center gap-8 p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2"
        >
          <XIcon className="size-4 text-muted-foreground/50" />
        </Button>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the job.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex !flex-col w-full">
          <AlertDialogAction
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Confirm delete"}
          </AlertDialogAction>

          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}