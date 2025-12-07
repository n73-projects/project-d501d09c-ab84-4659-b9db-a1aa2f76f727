"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"

type Todo = {
  id: number
  text: string
  completed: boolean
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
        },
      ])
      setInput("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const activeTodos = todos.filter((todo) => !todo.completed).length
  const completedTodos = todos.filter((todo) => todo.completed).length

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Todo App</h1>
        <p className="text-muted-foreground">
          Stay organized and track your tasks
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={addTodo} size="default">
          <Plus />
          Add
        </Button>
      </div>

      {todos.length > 0 && (
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>
            Active: <span className="font-semibold">{activeTodos}</span>
          </span>
          <span>
            Completed: <span className="font-semibold">{completedTodos}</span>
          </span>
        </div>
      )}

      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No todos yet. Add one above to get started!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                id={`todo-${todo.id}`}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 cursor-pointer select-none ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {todo.text}
              </label>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
