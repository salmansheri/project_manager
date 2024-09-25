import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.user.$post>;
type RequestType = InferRequestType<typeof client.api.user.$post>["json"];

export const useCreateUser = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.user.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Success");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  return mutation;
};
