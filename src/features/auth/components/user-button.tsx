'use client'

import { Loader, LogOut } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '../api/use-current-user'

export default function UserButton() {
  const { signOut } = useAuthActions()
  const { data, isLoading } = useCurrentUser()

  if (isLoading) {
    return <Loader className='size-4 animate-spin text-muted-foreground' />
  }

  if (!data) {
    return null
  }

  const { name, image } = data

  const avatarFallback = name!.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='size-10 hover:opacity-75 transition'>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className='bg-sky-500 text-white'>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()} className='h-10'>
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
