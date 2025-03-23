import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import SearchHeader from "../../components/Search/SearchHeader";
import SearchInput from "../../components/Search/SearchInput";
import TabBar from "../../components/Search/TabBar";
import UserListSkeleton from "../../components/Search/UserListSkeleton";
import { TabType, User } from "../../types";
import UserList from "../../components/Search/UserList.tsx";
import UserListError from "../../components/Search/UserListError";
import EmptySearchResult from "../../components/Search/EmptySearchResult";
import NetworkStatus from "../../components/Search/NetworkStatus";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../theme/theme';

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

const CACHE_DURATION = 5 * 60 * 1000;

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return localStorage.getItem('activeTab') as TabType || 'all'
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"alphabet" | "birthday" | null>(() => {
    return localStorage.getItem('sortType') as "alphabet" | "birthday" | null || null
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || ''
  });
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [cache, setCache] = useState<{
    [key in TabType]?: {
      data: User[];
      timestamp: number;
    };
  }>({});

  const isCacheValid = useCallback((department: TabType) => {
    const cachedData = cache[department];
    if (!cachedData) return false;
    
    const now = Date.now();
    return now - cachedData.timestamp < CACHE_DURATION;
  }, [cache]);

  const filterUsers = useCallback((text: string, usersToFilter = users) => {
    const normalizedQuery = text.toLowerCase();
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

  const fetchUsers = useCallback(async (department: TabType = "all") => {
    if (isCacheValid(department)) {
      const cachedData = cache[department];
      setUsers(cachedData!.data);
      setFilteredUsers(cachedData!.data);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users`,
        {
          params: {
            __example: department
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const newData = response.data.items;
      setUsers(newData);
      setFilteredUsers(newData);
      setCache(prevCache => ({
        ...prevCache,
        [department]: {
          data: newData,
          timestamp: Date.now()
        }
      }));
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке пользователей:", err);
      setError("Произошла ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  }, [cache, isCacheValid]);

  const sortUsers = useCallback((usersToSort: User[]) => {
    if (!sortType) return usersToSort;

    return [...usersToSort].sort((a, b) => {
      if (sortType === "alphabet") {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
      return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
    });
  }, [sortType]);

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab, fetchUsers]);

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

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setIsLoading(true);
        fetchUsers(activeTab);
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [activeTab, fetchUsers, wasOffline]);

  const handleSortChange = (type: "alphabet" | "birthday" | null) => {
    setSortType(type);
    localStorage.setItem('sortType', type || '');
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
    fetchUsers(tab);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);
  };

  const showNetworkStatus = !isOnline || (isLoading && wasOffline);

  useEffect(() => {
    if (!isLoading) {
      setWasOffline(false);
    }
  }, [isLoading]);

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
                <NetworkStatus isOnline={isOnline} isLoading={isLoading && wasOffline} />
              ) : (
                <>
                  <SearchHeader isDark={isDarkTheme} toggleTheme={toggleTheme} />
                  <SearchInput
                    isLoading={isLoading}
                    sortType={sortType}
                    onSortChange={handleSortChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                  />
                </>
              )}
            </HeaderContent>
          </HeaderSection>
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          {(isLoading && !wasOffline) ? (
            <UserListSkeleton hasNetworkStatus={showNetworkStatus} />
          ) : error ? (
            <UserListError onRetry={() => fetchUsers(activeTab)} />
          ) : filteredUsers.length === 0 ? (
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
