import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import SearchHeader from "../../components/Search/SearchHeader";
import SearchInput from "../../components/Search/SearchInput";
import TabBar from "../../components/Search/TabBar";
import UserListSkeleton from "../../components/Search/UserListSkeleton";
import { TabType, User } from "../../types";
import UserList from "../../components/Search/UserList.tsx";
import UserListError from "../../components/Search/UserListError";
import EmptySearchResult from "../../components/Search/EmptySearchResult";

const SearchContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 8px 16px 0;
  height: 100vh;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  margin-left: 8px;
`;

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"alphabet" | "birthday" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchUsers = async (department: TabType = "all") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${department}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }

      const data = await response.json();
      setUsers(data.items);
      
      const filtered = filterUsers(searchQuery, data.items);
      setFilteredUsers(filtered);
      
      setError(null);
    } catch (err: unknown) {
      console.error("Ошибка при загрузке пользователей:", err);
      setError("Произошла ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  };

  const sortUsers = useCallback((usersToSort: User[]) => {
    if (!sortType) return usersToSort;

    return [...usersToSort].sort((a, b) => {
      if (sortType === "alphabet") {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
      return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
    });
  }, [sortType]);

  const filterUsers = useCallback((query: string, usersToFilter = users) => {
    const normalizedQuery = query.toLowerCase();
    return usersToFilter.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@gmail.com`;
      return (
        fullName.includes(normalizedQuery) ||
        user.userTag.toLowerCase().includes(normalizedQuery) ||
        email.includes(normalizedQuery)
      );
    });
  }, [users]);

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        const filtered = filterUsers(searchQuery);
        const sorted = sortType ? sortUsers(filtered) : filtered;
        setFilteredUsers(sorted);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, users, sortType, filterUsers, sortUsers, isLoading]);

  const handleSortChange = (type: "alphabet" | "birthday" | null) => {
    setSortType(type);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContainer>
      <ContentWrapper>
        <SearchHeader />
        <SearchInput
          isLoading={isLoading}
          sortType={sortType}
          onSortChange={handleSortChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        {isLoading ? (
          <UserListSkeleton />
        ) : error ? (
          <UserListError onRetry={() => fetchUsers(activeTab)} />
        ) : filteredUsers.length === 0 ? (
          <EmptySearchResult />
        ) : (
          <UserList users={filteredUsers} sortType={sortType} />
        )}
      </ContentWrapper>
    </SearchContainer>
  );
};

export default Search;
