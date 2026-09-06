import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search phones, laptops, accessories...',
  className = '',
  autoFocus = false
}) {
  const inputRef = useRef(null);

  const handleClear = (e) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`search-bar-container select-none ${className}`}
      onClick={() => inputRef.current?.focus()}
      role="search"
    >
      <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 search-bar-icon" strokeWidth={2.2} />
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="search-bar-input"
        aria-label="Search marketplace"
      />

      {value && value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="search-bar-clear"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="w-3 h-3 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
