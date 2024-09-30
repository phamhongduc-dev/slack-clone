'use client'

import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'

export default function WorkSpaceIPage() {
  const workspaceId = useWorkspaceId()

  const { data, isLoading } = useGetWorkspace({ id: workspaceId })

  return <div>id: {JSON.stringify(data)}</div>
}
