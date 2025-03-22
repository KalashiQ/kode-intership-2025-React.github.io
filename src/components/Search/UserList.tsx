import React, { useMemo } from "react";
import styled from "styled-components";
import { User } from "../../types";
import { sortUsersByAlphabet, sortUsersByBirthday } from "../../utils/sorting";
import { useNavigate } from 'react-router-dom';

const ListContainer = styled.div`
  margin-top: -1px;
  height: calc(100vh - 152px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const UserItem = styled.div`
  display: flex;
  padding: 6px 0;

  &:first-child {
    padding-top: 16px;
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
`;

const Tag = styled.span`
  color: #97979b;
  margin-left: 4px;
`;

const Department = styled.span`
  color: #55555c;
  font-size: 13px;
  margin-top: 6px;
`;

interface UserListProps {
  users: User[];
  sortType: "alphabet" | "birthday" | null;
}

const UserList: React.FC<UserListProps> = ({ users, sortType }) => {
  const navigate = useNavigate();
  
  const handleUserClick = (user: User) => {
    navigate(`/user/${user.id}`, { state: { user } });
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

  if (sortType !== "birthday") {
    return (
      <ListContainer>
        {groupedUsers.currentYear.map((user) => (
          <UserItem key={user.id} onClick={() => handleUserClick(user)}>
            <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
            <Content>
              <NameContainer>
                <Name>{`${user.firstName} ${user.lastName}`}</Name>
                <Tag>{user.userTag}</Tag>
              </NameContainer>
              <Department>{user.department}</Department>
            </Content>
          </UserItem>
        ))}
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {groupedUsers.currentYear.map((user) => (
        <UserItem key={user.id} onClick={() => handleUserClick(user)}>
          <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
          <Content>
            <NameContainer>
              <Name>{`${user.firstName} ${user.lastName}`}</Name>
              <Tag>{user.userTag}</Tag>
            </NameContainer>
            <Department>{user.department}</Department>
          </Content>
        </UserItem>
      ))}
      {groupedUsers.nextYear.length > 0 && (
        <>
          <YearDivider>
            <YearLabel>{new Date().getFullYear() + 1}</YearLabel>
          </YearDivider>
          {groupedUsers.nextYear.map((user) => (
            <UserItem key={user.id} onClick={() => handleUserClick(user)}>
              <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
              <Content>
                <NameContainer>
                  <Name>{`${user.firstName} ${user.lastName}`}</Name>
                  <Tag>{user.userTag}</Tag>
                </NameContainer>
                <Department>{user.department}</Department>
              </Content>
            </UserItem>
          ))}
        </>
      )}
    </ListContainer>
  );
};

export default UserList;
