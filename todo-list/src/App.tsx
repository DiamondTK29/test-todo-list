

import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filters from './components/Filters';

const App: React.FC = () => {
  const {
    todos,
    activeCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodoText,
  } = useTodos();

  return (
    <div className="todo-app">
      <h1>Список Задач</h1>
      <TodoForm onAdd={addTodo} />

      <p>Осталось **{activeCount}** активных задач</p>

      <Filters currentFilter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
        onEdit={editTodoText}
      />
    </div>
  );
};

export default App;
