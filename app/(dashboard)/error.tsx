'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-start gap-4 p-8">
      <h2 className="text-xl font-bold text-red-600">Algo deu errado</h2>
      <p className="text-sm text-zinc-700">{error.message}</p>
      {error.digest && (
        <p className="text-xs text-zinc-500">digest: {error.digest}</p>
      )}
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Tentar novamente
      </button>
    </div>
  )
}
