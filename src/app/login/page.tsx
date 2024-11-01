"use client"

import { useAuth } from "@/context/auth"
import Link from "next/link"
import { useState } from "react"
import { login as loginApi } from "./api"

const Page = () => {
  const { isAuthenticated, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const { token } = await loginApi({ email, password })
      if (!token) {
        throw new Error('Token não encontrado')
      }      
      localStorage.setItem('token', token) // Salva o token no localStorage
      login()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isAuthenticated ? (
        <>
          <h1 className="text-4xl font-bold">Você está logado!</h1>
          <button onClick={logout} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Faça login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 px-4 py-2 border border-gray-300 rounded"
          />
          <button onClick={handleLogin} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </>
      )}
      <Link href="/todo" className="mt-4 text-blue-500 hover:underline">
        To-Do List
      </Link>
    </div>
  )
}

export default Page