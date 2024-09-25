import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();
      const data = await response.json();
      return data;
    },
  });
  return query;
};
