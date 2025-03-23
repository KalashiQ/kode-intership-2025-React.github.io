import styled from 'styled-components';
import { User } from "../../../shared/types/index";
import BackIcon from '../../../assets/back.svg';
import FavoriteIcon from '../../../assets/favorite.svg';
import PhoneIcon from '../../../assets/phone-alt.svg';
import SeparatorIcon from '../../../assets/separator.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useUserAvatar } from '../hooks/useUserAvatar';
import { useUserFormatting } from '../hooks/useUserFormatting';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../../styles/theme/theme.ts';

const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div`
  height: 280px;
  background: ${({ theme }) => theme.colors.headerBackground};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 24px;
  top: 10px;
  width: 48px;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  
  img {
    width: 24px;
    height: 24px;
  }
`;

const Avatar = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  margin-top: 72px;
`;

const UserName = styled.h1`
  font-family: Inter;
  font-size: 24px;
  line-height: 28px;
  margin: 24px 0 0;
  color: ${({ theme }) => theme.colors.text};
`;

const UserTag = styled.span`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 17px;
`;

const Department = styled.p`
  color: ${({ theme }) => theme.colors.tertiaryText};
  font-size: 13px;
  margin-top: 12px;
`;

const InfoSection = styled.div`
  padding: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span`
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: right;
`;

const PhoneLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 14px;
`;

const StyledIcon = styled.img`
  filter: ${({ theme }) => theme.colors.text === '#FFFFFF' ? 'brightness(0) invert(1)' : 'none'};
`;

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user as User;
  const loadedAvatarUrl = location.state?.loadedAvatarUrl;
  const [isDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  
  const avatarUrl = useUserAvatar(user, loadedAvatarUrl);
  const { formatPhoneNumber, calculateAge, getAgeWord, formatBirthday } = useUserFormatting();

  const handleBack = () => {
    navigate(-1);
  };

  if (!user) {
    return null;
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <StyledIcon src={BackIcon} alt="Back" />
          </BackButton>
          <Avatar src={avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
          <UserName>
            {user.firstName} {user.lastName}
            <UserTag> {user.userTag}</UserTag>
          </UserName>
          <Department>{user.department}</Department>
        </Header>
        
        <InfoSection>
          <InfoRow>
            <InfoLabel>
              <StyledIcon src={FavoriteIcon} alt="Birthday" />
              {formatBirthday(user.birthday)}
            </InfoLabel>
            <InfoValue>
              {calculateAge(user.birthday)} {getAgeWord(calculateAge(user.birthday))}
            </InfoValue>
          </InfoRow>
          
          <StyledIcon 
            src={SeparatorIcon} 
            alt="" 
            style={{ width: '100%', height: '10px', margin: '0 0 12px' }} 
          />
          
          <InfoRow>
            <PhoneLink href={`tel:${user.phone}`}>
              <StyledIcon src={PhoneIcon} alt="Phone" />
              {formatPhoneNumber(user.phone)}
            </PhoneLink>
          </InfoRow>
        </InfoSection>
      </Container>
    </ThemeProvider>
  );
};

export default UserDetails; 