import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchHeader from "../../components/Search/SearchHeader";
import SearchInput from "../../components/Search/SearchInput";
import TabBar from "../../components/Search/TabBar";
import UserListSkeleton from "../../components/Search/UserListSkeleton";
import { TabType, User } from "../../types";
import ErrorScreen from "../../components/Error/ErrorScreen.tsx";
import UserList from "../../components/Search/UserList.tsx";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all",
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
      } catch (err) {
        setError("Произошла ошибка при загрузке данных");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <ErrorScreen
        message={error}
        onRetry={() => {
          setIsLoading(true);
          setError(null);
        }}
      />
    );
  }

  return (
    <SearchContainer>
      <ContentWrapper>
        <SearchHeader />
        <SearchInput isLoading={isLoading} />
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        {isLoading ? <UserListSkeleton /> : <UserList users={users} />}
      </ContentWrapper>
    </SearchContainer>
  );
};

export default Search;
