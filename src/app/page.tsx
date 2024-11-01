"use client"
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Redireciona para a página de To-Do List se o usuário estiver autenticado e se não estiver na página de login usando o Router do Next.js
      router.push('/todo')
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Primeiro projeto com NextJs</h1>
      <Link href="/todo" className="mt-4 text-blue-500 hover:underline">
        To-Do List
      </Link>
    </div>
  )
}

export default Page