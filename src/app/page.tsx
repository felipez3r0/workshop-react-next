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