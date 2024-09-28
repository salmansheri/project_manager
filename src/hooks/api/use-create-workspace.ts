import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { toast } from "sonner";

export type ResponseType = InferResponseType<
  typeof client.api.workspaces.create.$post
>;
type RequestType = InferRequestType<
  typeof client.api.workspaces.create.$post
>["json"];

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.workspaces.create.$post({ json });
      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Successfully Created workspace");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
  return mutation;
};
