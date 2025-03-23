import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { User } from "../../types";
import { sortUsersByAlphabet, sortUsersByBirthday } from "../../utils/sorting";
import { useNavigate } from 'react-router-dom';
import { loadImageWithTimeout, generateFallbackAvatar } from "../../utils/avatarUtils";

const ListContainer = styled.div<{ $hasNetworkStatus?: boolean }>`
  margin-top: -1px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
  min-height: 0;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const UserItem = styled.div<{ isFirst?: boolean }>`
  display: flex;
  padding: 6px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  margin-top: ${props => props.isFirst ? '16px' : '0'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

const YearDivider = styled.div`
  position: relative;
  margin: 38px 0;
  text-align: center;

  &::before, &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 508px;
    height: 1px;
    background-color: #C3C3C6;
    transform: rotate(180deg);
  }

  &::before {
    right: 50%;
    margin-right: 24px;
  }

  &::after {
    left: 50%;
    margin-left: 24px;
  }
`;

const YearLabel = styled.span`
  background-color: white;
  padding: 0 40px;
  color: #97979B;
  font-size: 15px;
  position: relative;
  z-index: 1;
`;

const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #F7F7F8;
`;

const Content = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Tag = styled.span`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-left: 4px;
`;

const Department = styled.span`
  color: ${({ theme }) => theme.colors.tertiaryText};
  font-size: 13px;
  margin-top: 6px;
`;

interface UserListProps {
  users: User[];
  sortType: "alphabet" | "birthday" | null;
  hasNetworkStatus?: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, sortType, hasNetworkStatus = false }) => {
  const navigate = useNavigate();
  
  const [avatarUsers, setAvatarUsers] = useState<Record<string, string>>({});

  useEffect(() => {
    const processUserAvatars = async () => {
      const avatarMap: Record<string, string> = {};
      
      await Promise.all(
        users.map(async (user) => {
          try {
            await loadImageWithTimeout(user.avatarUrl);
          } catch {
            avatarMap[user.id] = generateFallbackAvatar(user.firstName, user.lastName);
          }
        })
      );
      
      setAvatarUsers(avatarMap);
    };

    processUserAvatars();
  }, [users]);

  const handleUserClick = (user: User) => {
    navigate(`/user/${user.id}`, { 
      state: { 
        user,
        loadedAvatarUrl: avatarUsers[user.id] || user.avatarUrl 
      } 
    });
  };

  const groupedUsers = useMemo(() => {
    if (!sortType) {
      return { currentYear: users, nextYear: [] };
    }
    
    if (sortType === "alphabet") {
      return { currentYear: sortUsersByAlphabet(users), nextYear: [] };
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const sortedUsers = sortUsersByBirthday(users);

    return sortedUsers.reduce(
      (acc, user) => {
        const [, month, day] = user.birthday.split("-");
        const birthDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));

        if (birthDate < currentDate) {
          acc.nextYear.push(user);
        } else {
          acc.currentYear.push(user);
        }
        return acc;
      },
      { currentYear: [] as User[], nextYear: [] as User[] }
    );
  }, [users, sortType]);

  const renderUserItem = (user: User, index: number) => (
    <UserItem 
      key={user.id} 
      onClick={() => handleUserClick(user)}
      isFirst={index === 0}
    >
      <Avatar 
        src={avatarUsers[user.id] || user.avatarUrl} 
        alt={`${user.firstName} ${user.lastName}`} 
      />
      <Content>
        <NameContainer>
          <Name>{`${user.firstName} ${user.lastName}`}</Name>
          <Tag>{user.userTag}</Tag>
        </NameContainer>
        <Department>{user.department}</Department>
      </Content>
    </UserItem>
  );

  if (sortType !== "birthday") {
    return (
      <ListContainer $hasNetworkStatus={hasNetworkStatus}>
        {groupedUsers.currentYear.map(renderUserItem)}
      </ListContainer>
    );
  }

  return (
    <ListContainer $hasNetworkStatus={hasNetworkStatus}>
      {groupedUsers.currentYear.map(renderUserItem)}
      {groupedUsers.nextYear.length > 0 && (
        <>
          <YearDivider>
            <YearLabel>{new Date().getFullYear() + 1}</YearLabel>
          </YearDivider>
          {groupedUsers.nextYear.map(renderUserItem)}
        </>
      )}
    </ListContainer>
  );
};

export default UserList;
