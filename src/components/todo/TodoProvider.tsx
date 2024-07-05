import { useState } from 'react'
import { TodoProviderPropsInterface } from '../../types/todo/TodoProviderProps.interface.ts'
import { TodoInterface } from '../../types/todo/Todo.interface.ts'
import { MOCK_TODOS } from '../../data/mockData.ts'
import { TodoContext } from '../../context/TodoContext.ts'

const TodoProvider = ({ children }: TodoProviderPropsInterface) => {
  const [todos, setTodos] = useState<TodoInterface[]>(MOCK_TODOS)
  const [nextId, setNextId] = useState<number>(
    MOCK_TODOS.length ? Math.max(...MOCK_TODOS.map((todo) => todo.id)) + 1 : 1
  )

  const addTodo = (todo: Omit<TodoInterface, 'id'>) => {
    const newTodo = { ...todo, id: nextId }
    setTodos([...todos, newTodo])
    setNextId(nextId + 1)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id).map((todo, index) => ({ ...todo, id: index + 1 })))
    setNextId(todos.length)
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteAllTodos = () => {
    setTodos([])
    setNextId(1)
  }

  const clearCompletedTodos = () => {
    const activeTodos = todos.filter((todo) => !todo.completed).map((todo, index) => ({ ...todo, id: index + 1 }))
    setTodos(activeTodos)
    setNextId(activeTodos.length + 1)
  }

  const completedTodosCount: number = todos.filter((todo) => todo.completed).length

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        deleteAllTodos,
        clearCompletedTodos,
        completedTodosCount
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
