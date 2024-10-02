import { Fragment } from 'react'
import { toast } from 'sonner'
import { CopyIcon, RefreshCcw } from 'lucide-react'

import { useNewJoinCode } from '@/features/workspaces/api/use-new-join-code'

import useConfirm from '@/hooks/use-confirm'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface InviteModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  joinCode: string
}

export default function InviteModal({ open, setOpen, name, joinCode }: InviteModalProps) {
  const workspaceId = useWorkspaceId()
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message: 'This will deactivate the current invite code anh generate a new one.'
  })

  const { mutate, isPending } = useNewJoinCode()

  const handleNewCode = async () => {
    const ok = await confirm()

    if (!ok) return

    mutate(
      { workspaceId: workspaceId },
      {
        onSuccess: () => {
          toast.success('Invite code generated')
        },
        onError: () => {
          toast.error('Failed to generate invite code')
        }
      }
    )
  }

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`
    navigator.clipboard.writeText(inviteLink).then(() => toast.success('Invite link copied to clipboard'))
  }

  return (
    <Fragment>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>Use the code below to invite people to your workspace</DialogDescription>
          </DialogHeader>
          <div className=' flex flex-col gap-y-4 items-center justify-center py-10'>
            <p className='text-4xl font-bold tracking-wider uppercase'>{joinCode}</p>
            <Button variant='ghost' size='sm' onClick={handleCopy}>
              Copy link
              <CopyIcon className='size-4 ml-2' />
            </Button>
          </div>

          <div className='flex items-center justify-between w-full'>
            <Button onClick={handleNewCode} disabled={isPending} variant='outline'>
              New code <RefreshCcw className='size-4 ml-2' />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
