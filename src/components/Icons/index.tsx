import React from 'react';
import listUiAlt from '../../assets/list-ui-alt.svg';
import searchIcon from '../../assets/Vector.png';

export const SearchIcon: React.FC = () => (
  <img src={searchIcon} alt="search" width="24" height="24" />
);

export const SortIcon: React.FC = () => (
  <img src={listUiAlt} alt="sort" width="24" height="24" />
); 