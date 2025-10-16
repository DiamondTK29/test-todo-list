import React, { useState } from 'react';

interface TodoFormProps {
  // onAdd - это функция, которую мы передаем из App.tsx (из хука useTodos)
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();

    if (text) {
      onAdd(text);
      setInputText('');
    }
    // Если пусто, ничего не делаем
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Что нужно сделать?"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        aria-label="Новая задача"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TodoForm;
