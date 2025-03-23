import React, { useState } from "react";
import styled from "styled-components";
import SearchHeader from "../components/Header/Header";
import SearchInput from "../components/SearchInput/SearchInput";
import TabBar from "../components/TabBar/TabBar";
import UserListSkeleton from "../components/UserList/UserListSkeleton";
import { TabType } from "../../../shared/types/index";
import UserList from "../components/UserList/UserList";
import UserListError from "../components/UserList/UserListError";
import EmptySearchResult from "../components/UserList/EmptySearchResult";
import NetworkStatus from "../components/NetworkStatus/NetworkStatus";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "../../../styles/theme/theme";
import { useUsers } from "../hooks/useUsers";
import { useUserFiltering } from "../hooks/useUserFiltering";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

const SearchContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const ContentWrapper = styled.div`
  padding: 8px 16px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const HeaderSection = styled.div`
  height: 108px;
  position: relative;
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return localStorage.getItem('activeTab') as TabType || 'all'
  });
  
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const { users, isLoading, error, fetchUsers } = useUsers(activeTab);
  
  const {
    filterAndSortUsers,
    sortType,
    searchQuery,
    handleSortChange,
    handleSearchChange
  } = useUserFiltering();

  const { isOnline, showNetworkStatus } = useNetworkStatus(isLoading, activeTab, fetchUsers);

  const filteredUsers = isLoading ? users : filterAndSortUsers(users, searchQuery, sortType);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
    fetchUsers(tab);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <SearchContainer>
        <ContentWrapper>
          <HeaderSection>
            <HeaderContent>
              {showNetworkStatus ? (
                <NetworkStatus isOnline={isOnline} isLoading={isLoading} />
              ) : (
                <>
                  <SearchHeader isDark={isDarkTheme} toggleTheme={toggleTheme} />
                  <SearchInput
                    isLoading={isLoading}
                    sortType={sortType}
                    onSortChange={handleSortChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    isDarkTheme={isDarkTheme}
                  />
                </>
              )}
            </HeaderContent>
          </HeaderSection>
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          {(isLoading && !showNetworkStatus) ? (
            <UserListSkeleton hasNetworkStatus={showNetworkStatus} />
          ) : error ? (
            <UserListError onRetry={() => fetchUsers(activeTab)} />
          ) : filteredUsers.length === 0 && searchQuery ? (
            <EmptySearchResult />
          ) : (
            <UserList 
              users={filteredUsers} 
              sortType={sortType} 
              hasNetworkStatus={showNetworkStatus}
            />
          )}
        </ContentWrapper>
      </SearchContainer>
    </ThemeProvider>
  );
};

export default Search;
