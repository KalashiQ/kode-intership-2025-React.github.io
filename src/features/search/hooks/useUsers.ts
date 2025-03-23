import { useState, useCallback, useEffect } from 'react';
import { User, TabType } from "../../../shared/types";
import { fetchUsersApi } from '../api/users';
import { useCache } from './useCache';

export const useUsers = (activeTab: TabType) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cache, isCacheValid, updateCache } = useCache();

  const fetchUsers = useCallback(async (department: TabType = "all") => {
    if (isCacheValid(department)) {
      const cachedData = cache[department];
      setUsers(cachedData!.data);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const newData = await fetchUsersApi(department);
      setUsers(newData);
      updateCache(department, newData);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке пользователей:", err);
      setError("Произошла ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  }, [cache, isCacheValid, updateCache]);

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab, fetchUsers]);

  return { users, isLoading, error, fetchUsers };
}; 