import { TodoApp } from "@/components/todo-app"

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col items-center">
        <TodoApp />
      </main>
    </div>
  )
}
