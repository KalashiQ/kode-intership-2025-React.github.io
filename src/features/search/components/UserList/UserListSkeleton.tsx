import React from "react";
import styled from "styled-components";
import skeletonIcon from "../../../../assets/Ellipse 9.svg";
import rectLong from "../../../../assets/Rectangle 194.svg";
import rectShort from "../../../../assets/Rectangle 193.svg";

const SkeletonItem = styled.div<{ isFirst?: boolean }>`
  display: flex;
  padding: 6px 16px;
  border-radius: 8px;
  margin-top: ${props => props.isFirst ? '16px' : '0'};
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

const NameSkeleton = styled.img`
  width: 144px;
  height: 16px;
`;

const TagSkeleton = styled.img`
  width: 80px;
  height: 12px;
  margin-top: 6px;
`;

const SkeletonContainer = styled.div<{ $hasNetworkStatus?: boolean }>`
  margin-top: -1px;
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

interface UserListSkeletonProps {
  hasNetworkStatus?: boolean;
}

const UserListSkeleton: React.FC<UserListSkeletonProps> = ({ hasNetworkStatus = false }) => {
  return (
    <SkeletonContainer $hasNetworkStatus={hasNetworkStatus}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
        <SkeletonItem key={item} isFirst={index === 0}>
          <Avatar src={skeletonIcon} alt="" />
          <Content>
            <NameSkeleton src={rectLong} alt="" />
            <TagSkeleton src={rectShort} alt="" />
          </Content>
        </SkeletonItem>
      ))}
    </SkeletonContainer>
  );
};

export default UserListSkeleton;
