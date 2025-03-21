import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchHeader from "../../components/Search/SearchHeader";
import SearchInput from "../../components/Search/SearchInput";
import TabBar from "../../components/Search/TabBar";
import UserListSkeleton from "../../components/Search/UserListSkeleton";
import { TabType, User } from "../../types";
import UserList from "../../components/Search/UserList.tsx";
import UserListError from "../../components/Search/UserListError";

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
  const [sortType, setSortType] = useState<"alphabet" | "birthday" | null>(
    null
  );

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
      setError(null);
    } catch (err: unknown) {
      console.error("Ошибка при загрузке пользователей:", err);
      setError("Произошла ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const handleSortChange = (type: "alphabet" | "birthday" | null) => {
    setSortType(type);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <SearchContainer>
      <ContentWrapper>
        <SearchHeader />
        <SearchInput
          isLoading={isLoading}
          sortType={sortType}
          onSortChange={handleSortChange}
        />
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        {isLoading ? (
          <UserListSkeleton />
        ) : error ? (
          <UserListError onRetry={() => fetchUsers(activeTab)} />
        ) : (
          <UserList users={users} sortType={sortType} />
        )}
      </ContentWrapper>
    </SearchContainer>
  );
};

export default Search;
