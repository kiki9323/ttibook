import { IconSearch } from '@/assets/svg';
import React from 'react';
import style from './index.module.scss';

export const SearchInput = React.memo(({ searchQuery, handleSearch, handleClearQuery }) => {
  return (
    <form>
      <div className={style.input_wrap}>
        <label htmlFor="pokemon-input" className={style.input_label}>
          <IconSearch width="20px" height="20px" />
        </label>
        <input
          id="pokemon-input"
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={handleSearch}
          className={`${style.input} ${searchQuery ? style.clear : ''}`}
        />
        <button
          onClick={handleClearQuery}
          className={`${style.delete_icon} ${!searchQuery && style.is_inactive}`}
          aria-label="close"
        >
          <span></span>
        </button>
      </div>
    </form>
  );
});

SearchInput.displayName = 'SearchInput';
