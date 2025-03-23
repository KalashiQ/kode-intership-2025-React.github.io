import React from "react";
import styled from "styled-components";
import { TabType } from "../../types";
import { useLanguage } from '../../context/LanguageContext';

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
  color: ${(props) => (props.active ? props.theme.colors.text : props.theme.colors.secondaryText)};
  border-bottom: 2px solid
    ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
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
  const { t } = useLanguage();
  
  const tabs: { id: TabType; label: string; apiValue: string }[] = [
    { id: "all", label: t('search.departments.all'), apiValue: "all" },
    { id: "design", label: t('search.departments.design'), apiValue: "design" },
    { id: "analytics", label: t('search.departments.analytics'), apiValue: "analytics" },
    { id: "management", label: t('search.departments.management'), apiValue: "management" },
    { id: "ios", label: t('search.departments.ios'), apiValue: "ios" },
    { id: "android", label: t('search.departments.android'), apiValue: "android" },
    { id: "frontend", label: t('search.departments.frontend'), apiValue: "frontend" },
    { id: "backend", label: t('search.departments.backend'), apiValue: "backend" },
    { id: "support", label: t('search.departments.support'), apiValue: "support" },
    { id: "qa", label: t('search.departments.qa'), apiValue: "qa" },
    { id: "back_office", label: t('search.departments.back_office'), apiValue: "back_office" },
    { id: "hr", label: t('search.departments.hr'), apiValue: "hr" },
    { id: "pr", label: t('search.departments.pr'), apiValue: "pr" },
  ];

  return (
    <TabsContainer>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
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
