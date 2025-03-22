import styled from 'styled-components';
import { User } from '../../types';
import BackIcon from '../../assets/back.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import PhoneIcon from '../../assets/phone-alt.svg';
import SeparatorIcon from '../../assets/separator.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  background: white;
`;

const Header = styled.div`
  height: 280px;
  background: #F7F7F8;
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
`;

const UserTag = styled.span`
  color: #97979B;
  font-size: 17px;
`;

const Department = styled.p`
  color: #55555C;
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
  margin-bottom: 24px;
`;

const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const InfoValue = styled.span`
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #97979B;
  text-align: right;
`;

const Separator = styled.img`
  width: 100%;
  height: 1px;
  margin: 0 0 24px;
`;

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user as User;

  if (!user) {
    navigate('/');
    return null;
  }

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
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" />
        </BackButton>
        <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
        <UserName>
          {user.firstName} {user.lastName}
          <UserTag> {user.userTag}</UserTag>
        </UserName>
        <Department>{user.department}</Department>
      </Header>
      
      <InfoSection>
        <InfoRow>
          <InfoLabel>
            <img src={FavoriteIcon} alt="Birthday" />
            {formatBirthday(user.birthday)}
          </InfoLabel>
          <InfoValue>{calculateAge(user.birthday)} лет</InfoValue>
        </InfoRow>
        
        <Separator src={SeparatorIcon} alt="" />
        
        <InfoRow>
          <InfoLabel>
            <img src={PhoneIcon} alt="Phone" />
            {user.phone}
          </InfoLabel>
        </InfoRow>
      </InfoSection>
    </Container>
  );
};

export default UserDetails; 