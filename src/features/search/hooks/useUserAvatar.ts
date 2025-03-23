import { useState, useEffect } from 'react';
import { loadImageWithTimeout, generateFallbackAvatar } from "../../../shared/utils/avatarUtils";
import { User } from "../../../shared/types/index";

export const useUserAvatar = (user: User | null, loadedAvatarUrl: string | undefined) => {
  const [avatarUrl, setAvatarUrl] = useState(loadedAvatarUrl || user?.avatarUrl || '');

  useEffect(() => {
    if (!loadedAvatarUrl && user) {
      const loadAvatar = async () => {
        try {
          await loadImageWithTimeout(user.avatarUrl);
          setAvatarUrl(user.avatarUrl);
        } catch {
          const fallbackUrl = generateFallbackAvatar(user.firstName, user.lastName);
          setAvatarUrl(fallbackUrl);
        }
      };
      loadAvatar();
    }
  }, [user, loadedAvatarUrl]);

  return avatarUrl;
}; 