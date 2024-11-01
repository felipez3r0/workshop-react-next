"use client" // Permite que o arquivo seja executado no lado do cliente
import { useEffect, useState } from 'react'
import { getTodos, ITodo } from './api'
import { useAuth } from "@/context/auth"

const Page = () => {
  const [todos, setTodos] = useState<ITodo[]>([]) // Inicializa o estado com um array vazio
  const { isAuthenticated } = useAuth() // Obtém o estado de autenticação

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos()
      // Pega apenas os 10 primeiros itens
      data.splice(10)
      setTodos(data) // Atualiza o estado com os dados obtidos
    }

    fetchTodos() // Chama a função fetchTodos
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">To-Do List</h1>
      {isAuthenticated ? (
        <ul className="mt-4">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center">
              <input type="checkbox" checked={todo.completed} readOnly />
              <span className="ml-2">{todo.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">Faça login para ver a lista de tarefas</p>
      )}
    </div>
  )
}

export default Page