// components/TodoItem.tsx

import React, { useState } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {

      if (editText.trim() && editText !== todo.text) {
        onEdit(todo.id, editText.trim());
      } else {
        setEditText(todo.text);
      }
      setIsEditing(false);
    } else {

      setIsEditing(true);
    }
  };


  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleEdit();
          }}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <button onClick={handleEdit}>
        {isEditing ? '✔' : '✏'}
      </button>

      <button onClick={() => onRemove(todo.id)}>
        ✖
      </button>
    </li>
  );
};

export default TodoItem;
