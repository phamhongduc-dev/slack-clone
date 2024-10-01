import { useCallback, useMemo, useState } from 'react'
import { useMutation } from 'convex/react'

import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'

type RequestType = { name: string }
type ResponseType = Id<'workspaces'> | null

type Options = {
  onSuccess?: (data: ResponseType) => void
  onError?: (error: Error) => void
  onSettled?: () => void
  throwErrors?: boolean
}

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<'success' | 'error' | 'settled' | 'pending' | null>(null)

  const isPening = useMemo(() => status === 'pending', [status])
  const isSuccess = useMemo(() => status === 'success', [status])
  const isError = useMemo(() => status === 'error', [status])
  const isSettled = useMemo(() => status === 'settled', [status])

  const mutation = useMutation(api.workspaces.create)

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null)
        setError(null)
        setStatus('pending')

        const response = await mutation(values)
        options?.onSuccess?.(response)

        return response
      } catch (error) {
        setStatus('error')
        setError(error as Error)

        options?.onError?.(error as Error)
        if (options?.throwErrors) {
          throw error
        }
      } finally {
        setStatus('settled')

        options?.onSettled?.()
      }
    },
    [mutation]
  )

  return {
    mutate,
    data,
    error,
    isPening,
    isSuccess,
    isError,
    isSettled
  }
}
