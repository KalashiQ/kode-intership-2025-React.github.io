import styled from 'styled-components';
import { User } from '../../types';
import BackIcon from '../../assets/back.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import PhoneIcon from '../../assets/phone-alt.svg';
import SeparatorIcon from '../../assets/separator.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadImageWithTimeout, generateFallbackAvatar } from "../../utils/avatarUtils";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../theme/theme';

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

const getAgeWord = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'лет';
  if (lastDigit === 1) return 'год';
  if (lastDigit >= 2 && lastDigit <= 4) return 'года';
  return 'лет';
};

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user as User;
  const loadedAvatarUrl = location.state?.loadedAvatarUrl;
  const [avatarUrl, setAvatarUrl] = useState(loadedAvatarUrl || user?.avatarUrl || '');
  const [isDarkTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!loadedAvatarUrl) {
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
  }, [user, navigate, loadedAvatarUrl]);

  if (!user) {
    return null;
  }

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
    }
    return phone;
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatBirthday = (birthday: string) => {
    return new Date(birthday).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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
            <InfoValue>{calculateAge(user.birthday)} {getAgeWord(calculateAge(user.birthday))}</InfoValue>
          </InfoRow>
          
          <StyledIcon src={SeparatorIcon} alt="" style={{ width: '100%', height: '10px', margin: '0 0 12px' }} />
          
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