"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";
import {
  useCreateWorkspace,
  ResponseType,
} from "@/hooks/api/use-create-workspace";
import { SubmitButton } from "../submit-button";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const router = useRouter();
  const [workspace, setWorkspace] = useState("");
  const createWorkspaceMutation = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    // TODO: Clear form
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: workspace,
    };
    createWorkspaceMutation.mutate(payload, {
      onSuccess: (data: ResponseType) => {
        //@ts-expect-error "silly error"
        router.push(`workspaces/${data.data.id}`);
      },
    });
    router.refresh();

    console.log(workspace);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
          <DialogDescription>Create New Workspace</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={workspace}
            onChange={(event) => setWorkspace(event.target.value)}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace Name eg:'Work' "
          />
          <div>
            <SubmitButton disabled={createWorkspaceMutation.isPending}>
              Continue
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
