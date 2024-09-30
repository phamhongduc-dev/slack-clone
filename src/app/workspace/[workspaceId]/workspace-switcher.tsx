'use client'

import { useRouter } from 'next/navigation'
import { Loader, Plus } from 'lucide-react'

import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces'
import { useCreateWorkspaceModalAtom } from '@/features/workspaces/store/use-create-workspace-modal'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

export default function WorkspaceSwitcher() {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const [_open, setOpen] = useCreateWorkspaceModalAtom()

  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces()
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId
  })

  const filteredWorkspaces = workspaces?.filter((w) => w._id !== workspaceId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9 relative overflow-hidden bg-[#ababab] hover:bg-[#ababad]/80 text-slate-800 font-semibold text-xl'>
          {workspaceLoading ? (
            <Loader className='size-5 animate-spin shrink-0' />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className='cursor-pointer flex-col justify-start items-start capitalize'
        >
          {workspace?.name}
          <span className='text-xs text-muted-foreground'>Active workspace</span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className='cursor-pointer capitalize overflow-hidden'
          >
            <div className='shrink-0 size-9 relative overflow-hidden bg-[#616061] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'>
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className='truncate'>{workspace?.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
          <div className='size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'>
            <Plus />
          </div>
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
