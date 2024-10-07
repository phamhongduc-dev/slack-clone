import Link from 'next/link'
import { AlertTriangle, Loader, MailIcon, XIcon } from 'lucide-react'

import { useGetMember } from '@/features/members/api/use-get-member'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Id } from '../../../../convex/_generated/dataModel'

interface ProfileProps {
  memberId: Id<'members'>
  onClose: () => void
}

export default function Profile({ memberId, onClose }: ProfileProps) {
  const { data: member, isLoading: isLoadingMember } = useGetMember({ id: memberId })

  if (isLoadingMember) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (!member) {
    return (
      <div className='h-full flex flex-col'>
        <div className='h-[49px] flex justify-between items-center px-4 border-b'>
          <p className='text-lg font-bold'>Profile</p>
          <Button variant='ghost' size='iconSm' onClick={onClose}>
            <XIcon className='size-5 stroke-[1.5]' />
          </Button>
        </div>
        <div className='flex flex-col gap-y-2 h-full items-center justify-center'>
          <AlertTriangle className='size-5 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>Member not found</p>
        </div>
      </div>
    )
  }

  const avatarFallback = member.user.name?.charAt(0).toUpperCase() || 'M'

  return (
    <div className='h-full flex flex-col'>
      <div className='h-[49px] flex justify-between items-center px-4 border-b'>
        <p className='text-lg font-bold'>Profile</p>
        <Button variant='ghost' size='iconSm' onClick={onClose}>
          <XIcon className='size-5 stroke-[1.5]' />
        </Button>
      </div>
      <div className='flex flex-col items-center justify-center p-4'>
        <Avatar className='max-w-[256px] max-h-[256px] size-full'>
          <AvatarImage src={member.user.image} />
          <AvatarFallback className='aspect-square text-6xl'>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-col p-4'>
        <p className='text-xl font-bold'>{member.user.name}</p>
      </div>
      <Separator />
      <div className='flex flex-col p-4'>
        <p className='text-sm font-bold mb-4'>Contact infomation</p>
        <div className='flex items-center gap-2'>
          <div className='size-9 rounded-md bg-muted flex items-center justify-center'>
            <MailIcon className='size-4' />
          </div>
          <div className='flex flex-col'>
            <p className='text-[13px] font-semibold text-muted-foreground'>Email address</p>
            <Link href={`mailto:${member.user.email}`} className='text-sm hover:underline text-[#1264a3]'>
              {member.user.email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
