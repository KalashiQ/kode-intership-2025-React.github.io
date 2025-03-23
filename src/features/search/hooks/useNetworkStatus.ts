import { useState, useEffect } from 'react';
import { TabType } from "../../../shared/types";

export const useNetworkStatus = (isLoading: boolean, activeTab: TabType, fetchUsers: (tab: TabType) => void) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
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

  useEffect(() => {
    if (!isLoading) {
      setWasOffline(false);
    }
  }, [isLoading]);

  return {
    isOnline,
    wasOffline,
    showNetworkStatus: !isOnline || (isLoading && wasOffline)
  };
}; 