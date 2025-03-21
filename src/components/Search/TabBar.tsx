import React from "react";
import styled from "styled-components";
import { TabType } from "../../types";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const TabsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 0.33px;
    background-color: #c3c3c6;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  height: 36px;
  border: none;
  background: transparent;
  color: ${(props) => (props.active ? "#050510" : "#97979B")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#6534FF" : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  outline: none;
  border-radius: 0;
  font-family: "Inter", sans-serif;

  &:focus {
    outline: none;
  }

  &:not(:last-child) {
    margin-right: 6px;
  }
`;

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "Все" },
    { id: "design", label: "Designers" },
    { id: "backend", label: "Analysts" },
    { id: "management", label: "Managers" },
    { id: "ios", label: "iOS" },
    { id: "android", label: "Android" },
  ];

  return (
    <TabsContainer>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabsWrapper>
    </TabsContainer>
  );
};

export default TabBar;
