import React from "react";
import styled from "styled-components";
import { User } from "../../types";

const ListContainer = styled.div`
  margin-top: -1px;
  height: calc(100vh - 152px); // Вычитаем высоту хедера, поиска и табов
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
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ListContainer>
      {users.map((user) => (
        <UserItem key={user.id}>
          <Avatar
            src={user.avatarUrl}
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
      ))}
    </ListContainer>
  );
};

export default UserList;
