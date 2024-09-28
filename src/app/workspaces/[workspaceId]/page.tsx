import { WorkspaceIdClient } from "@/components/workspaceIdClient";

interface IParams {
  params: {
    workspaceId: string;
  };
}
export default function WorkSpaceIdPage({ params }: IParams) {
  const { workspaceId } = params;

  return (
    <div>
      {workspaceId}
      <WorkspaceIdClient workspaceId={workspaceId} />
    </div>
  );
}
