import React from "react";
import styled from "styled-components";
import ellipse from "../../assets/Ellipse 9.png";
import rectLong from "../../assets/Rectangle 194.png";
import rectShort from "../../assets/Rectangle 193.png";

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

const SkeletonContainer = styled.div`
  margin-top: -1px;
  height: calc(100vh - 152px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const UserListSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
        <SkeletonItem key={item} isFirst={index === 0}>
          <Avatar src={ellipse} alt="" />
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
