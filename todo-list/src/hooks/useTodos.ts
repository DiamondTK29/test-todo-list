
import { useState, useEffect, useMemo } from 'react';
import type{ Todo, FilterType } from '../types';


const STORAGE_KEY = 'react-ts-todos';


const getInitialTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [filter, setFilter] = useState<FilterType>('all');


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);


  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodoText = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Вычисляемое состояние: фильтрация и подсчет
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);


  return {
    todos: filteredTodos, // Возвращаем уже отфильтрованный список для TodoList
    activeCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodoText,
  };
};
