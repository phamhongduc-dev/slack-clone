'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useCreateWorkspaceModalAtom } from '../store/use-create-workspace-modal'
import { useCreateWorkspace } from '../api/use-create-workspace'

export default function CreateWorkspaceModal() {
  const router = useRouter()
  const [open, setOpen] = useCreateWorkspaceModalAtom()

  const [name, setName] = useState('')

  const { mutate, isPening } = useCreateWorkspace()

  const handleClose = () => {
    setOpen(false)
    setName('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await mutate(
      { name: name },
      {
        onSuccess: (id) => {
          toast.success('Workspace created successfully')
          router.push(`/workspace/${id}`)
          handleClose()
        }
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPening}
            required={true}
            autoFocus
            minLength={3}
            placeholder="Workspacee name e.g 'Work', 'Personal', 'Home'"
          />
          <div className='flex justify-end'>
            <Button type='submit'>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
