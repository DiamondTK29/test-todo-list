import React from 'react';

import type { FilterType } from '../types';

interface FiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}


const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' },
];

const Filters: React.FC<FiltersProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filters">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          // Выделяем активный фильтр
          className={currentFilter === filter.value ? 'active' : ''}
          aria-pressed={currentFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filters;
