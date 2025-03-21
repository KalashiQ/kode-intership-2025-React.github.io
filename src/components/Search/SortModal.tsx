import React from "react";
import styled from "styled-components";
import closeIcon from "../../assets/close.svg";
import selectedIcon from "../../assets/Selected.svg";
import unselectedIcon from "../../assets/Unselected.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 5, 16, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  position: relative;
  width: 373px;
  background: white;
  border-radius: 20px;
  padding: 24px 16px 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #050510;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const SortOption = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
`;

const RadioIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 12px;
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const OptionText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #050510;
`;

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  sortType: "alphabet" | "birthday" | null;
  onSortChange: (type: "alphabet" | "birthday" | null) => void;
}

const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  sortType,
  onSortChange,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Сортировка</Title>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </CloseButton>
        </Header>
        <div>
          <SortOption>
            <HiddenRadio
              type="checkbox"
              name="sort"
              checked={sortType === "alphabet"}
              onChange={() => {
                onSortChange(sortType === "alphabet" ? null : "alphabet");
                onClose();
              }}
            />
            <RadioIcon
              src={sortType === "alphabet" ? selectedIcon : unselectedIcon}
              alt="radio"
            />
            <OptionText>По алфавиту</OptionText>
          </SortOption>
          <SortOption>
            <HiddenRadio
              type="checkbox"
              name="sort"
              checked={sortType === "birthday"}
              onChange={() => {
                onSortChange(sortType === "birthday" ? null : "birthday");
                onClose();
              }}
            />
            <RadioIcon
              src={sortType === "birthday" ? selectedIcon : unselectedIcon}
              alt="radio"
            />
            <OptionText>По дню рождения</OptionText>
          </SortOption>
        </div>
      </Modal>
    </Overlay>
  );
};

export default SortModal;
