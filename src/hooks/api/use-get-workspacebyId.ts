import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetWorkspaceById = (id: string) => {
  const query = useQuery({
    queryKey: ["workspaces", id],
    queryFn: async () => {
      const response = await client.api.workspaces[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
