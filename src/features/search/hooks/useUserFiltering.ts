import { useState, useCallback } from 'react';
import { User } from "../../../shared/types";

export const useUserFiltering = () => {
  const [sortType, setSortType] = useState<"alphabet" | "birthday" | null>(() => {
    return localStorage.getItem('sortType') as "alphabet" | "birthday" | null || null
  });
  
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || ''
  });

  const filterUsers = useCallback((users: User[], text: string) => {
    const normalizedQuery = text.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@gmail.com`;
      return (
        fullName.includes(normalizedQuery) ||
        user.userTag.toLowerCase().includes(normalizedQuery) ||
        email.includes(normalizedQuery)
      );
    });
  }, []);

  const sortUsers = useCallback((users: User[], type: "alphabet" | "birthday" | null) => {
    if (!type) return users;

    return [...users].sort((a, b) => {
      if (type === "alphabet") {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
      return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
    });
  }, []);

  const filterAndSortUsers = useCallback((users: User[], query: string, type: "alphabet" | "birthday" | null) => {
    const filtered = filterUsers(users, query);
    return sortUsers(filtered, type);
  }, [filterUsers, sortUsers]);

  const handleSortChange = (type: "alphabet" | "birthday" | null) => {
    setSortType(type);
    localStorage.setItem('sortType', type || '');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);
  };

  return {
    filterAndSortUsers,
    sortType,
    searchQuery,
    handleSortChange,
    handleSearchChange
  };
}; 