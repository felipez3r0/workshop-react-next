# Workshop - React e Next.js

O objetivo deste workshop é ajudar você a começar com o Next.js, um framework React para construir aplicações web modernas. Vamos criar uma aplicação de To-Do List simples que conecta a uma API Rest para criar, listar, atualizar e excluir tarefas.

## Requisitos

- Node.js (versão 20.0 ou superior)
- npm (Node Package Manager) ou yarn

## Etapa 1: Crie um Novo Projeto Next.js

Primeiro, vamos criar um novo projeto Next.js usando o seguinte comando:

```bash
npx create-next-app@latest todolist-next
```

Substitua `todolist-next` pelo nome desejado para o seu projeto.

Selecione YES nas seguintes perguntas:

- Typescript
- ESLint
- Tailwind CSS
- src directory
- App Router
- Turbopack

A opção de 'import alias' é opcional e pode deixar como não.

Aguarde a instalação das dependências e para testar o projeto, navegue até o diretório do projeto e execute o seguinte comando:

```bash
npm run dev
```

Abra seu navegador e navegue até `http://localhost:3000` para ver sua aplicação em execução.

## Etapa 2: Estrutura do Projeto

As principais pastas e arquivos presentes no projeto são:

```
todolist-next/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── fonts/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
├── package.json
├── .gitignore
├── README.md
├── next.config.ts
└── tsconfig.json
```

### Explicação dos Principais Diretórios e Arquivos

- **.next/**: Diretório de saída do Next.js. Contém os arquivos gerados durante a compilação.
- **public/**: Arquivos estáticos como imagens, fontes, etc. são colocados aqui.
- **src/**: Código-fonte da aplicação.
  - **app/**: Componentes da aplicação.
    - **fonts/**: Fontes personalizadas.
    - **page.tsx**: Página principal da aplicação.
    - **layout.tsx**: Layout da aplicação.
    - **globals.css**: Estilos globais da aplicação.
- **package.json**: Arquivo de configuração do Node.js.
- **.gitignore**: Arquivo de configuração do Git.
- **README.md**: Documentação do projeto.
- **next.config.ts**: Configuração do Next.js.
- **tsconfig.json**: Configuração do TypeScript.

## Etapa 3: Criando um Olá mundo na tela inicial

Vamos começar criando um componente simples para exibir um texto na tela inicial. Abra o arquivo `src/app/page.tsx` e substitua o conteúdo existente pelo seguinte código:

```tsx
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Olá mundo!</h1>
    </div>
  );
};

export default Page
```

## Etapa 4: Criando uma nova página para a To-Do List

Para criar outras páginas podemos adicionar pastas dentro de `src/app` e criar um arquivo `tsx` para cada página. Por exemplo, para criar uma página de contato, crie um arquivo `src/app/contact/page.tsx`, também é possível configurar rotas com segmentos dinâmicos, por exemplo, `src/app/post/[id].tsx` (vamos falar sobre isso depois).

Vamos criar uma nova página para a To-Do List. Crie um novo arquivo chamado `src/app/todo.tsx` e adicione o seguinte código:

```tsx
const Todo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">To-Do List</h1>
    </div>
  );
};

export default Todo
```

Agora, adicione uma nova rota para a página da To-Do List no arquivo `src/app/page.tsx`:

```tsx
import Link from 'next/link'

const Page = () => {
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
```

Para testar a nova página, navegue até `http://localhost:3000/todo` no seu navegador.

Nessa página vamos usar uma API de exemplo inicialmente para listar as tarefas. Vamos criar um arquivo `src/app/todo/api.ts` e adicionar o seguinte código:

```tsx
export interface ITodo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  return await response.json()
}
```

Agora, vamos importar a função `getTodos` no arquivo `src/app/todo/page.tsx` e exibir as tarefas na tela:

```tsx
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
```

O "use client" no início do arquivo permite que o arquivo seja executado no lado do cliente, ou seja, no navegador. Isso é necessário porque o Next.js executa o código no servidor por padrão e nesse caso estamos utilizando o useEffect que é um hook do React que só pode ser executado no lado do cliente.

## Etapa 5: Login com useContext

Vamos criar um contexto para gerenciar o estado de autenticação do usuário. Crie um novo arquivo `src/context/auth.tsx` e adicione o seguinte código:

```tsx
"use client"
import { createContext, useContext, ReactNode, useState } from 'react'

interface IAuthContext {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

Agora, vamos importar o `AuthProvider` no arquivo `layouts.tsx` e envolver a aplicação com o contexto de autenticação:

```tsx
import { AuthProvider } from '../auth'
...
    <AuthProvider>
        {children}
    </AuthProvider>
...
```

Agora, vamos criar um componente de login em `src/app/login/page.tsx`:

```tsx
"use client"
import { useAuth } from "@/context/auth"
import Link from "next/link"

const Page = () => {
  const { isAuthenticated, login, logout } = useAuth()

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
          <button onClick={login} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
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
```

No Todo podemos utilizar o useAuth também para verificar se o usuário está autenticado e exibir ou não as tarefas:

```tsx
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
```

## Etapa 6: Ajustando a tela de login para chamar a API de autenticação

Vamos criar uma API de autenticação para simular o login e logout do usuário. Essa API vai estar rodando no endereco `http://localhost:3001/api/users/authenticate` e vai retornar um token JWT para o usuário autenticado. A rota espera receber um objeto com os campos `email` e `password` e retorna um objeto com o campo `token`.

Crie um novo arquivo `src/app/login/api.ts` e adicione o seguinte código:

```tsx
export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  const response = await fetch('http://localhost:3001/api/users/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await response.json()
}
```

Agora, vamos importar a função `login` no arquivo `src/app/login/page.tsx` e adicionar a lógica de autenticação:

```tsx
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
      const { token } = await loginApi({ email, password }
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
```

Com o token salvo no localStorage, podemos verificar se o usuário está autenticado ao recarregar a página. Vamos adicionar a lógica de autenticação no arquivo `src/app/page.tsx`:

```tsx
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
```

Agora se uma rota precisar do Token podemos recuperar essa informação a partir do localStorage e enviar no header da requisição. Por exemplo, vamos adicionar o token no header da requisição para a API de To-Do List:

```tsx
export const getTodos = async (): Promise<ITodo[]> => {
  const token = localStorage.getItem('token')
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    headers: {
      Authorization: `Bearer ${token}` // Adiciona o token no header da requisição
    }
  })
  return await response.json()
}
```

## Etapa 7: Deploy na Vercel

Para fazer o deploy da aplicação na Vercel, primeiro você precisa criar uma conta no site [Vercel](https://vercel.com/). Depois, siga os passos abaixo:

Acesse o link [Vercel - Novo projeto](https://vercel.com/new) e selecione o repositório do seu projeto no GitHub, GitLab ou Bitbucket.

Clique em "Continue" e siga os passos para configurar o projeto. Selecione o diretório do projeto e clique em "Deploy".

Aguarde o processo de deploy e acesse o link gerado para visualizar a aplicação em produção.