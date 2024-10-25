"use client" // Permite que o arquivo seja executado no lado do cliente
import { useEffect, useState } from 'react'
import { getTodos, ITodo } from './api'

const Page = () => {
  const [todos, setTodos] = useState<ITodo[]>([]) // Inicializa o estado com um array vazio

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
      <ul className="mt-4">
        {todos.map((todo) => ( // Percorre o array de todos e renderiza cada item
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page