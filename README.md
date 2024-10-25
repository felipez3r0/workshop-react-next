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

