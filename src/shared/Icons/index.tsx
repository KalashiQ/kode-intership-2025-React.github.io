import React from "react";
import listUiAlt from "../../assets/list-ui-alt.svg";
import searchIcon from "../../assets/search.svg";
import moonIcon from "../../assets/moon.png";
import sunIcon from "../../assets/sun.svg";

export const SearchIcon: React.FC = () => (
  <img src={searchIcon} alt="search" width="24" height="24" />
);

export const SortIcon: React.FC = () => (
  <img src={listUiAlt} alt="sort" width="24" height="24" />
);

export const Moon: React.FC = () => (
  <img src={moonIcon} alt="dark theme" width="24" height="24" />
);

export const Sun: React.FC = () => (
  <img src={sunIcon} alt="light theme" width="24" height="24" />
);
