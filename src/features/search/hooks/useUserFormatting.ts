import { useLanguage } from '../context/LanguageContext';

export const useUserFormatting = () => {
  const { t, language } = useLanguage();

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

  const getAgeWord = (age: number): string => {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return t('userDetails.age.years');
    if (lastDigit === 1) return t('userDetails.age.year');
    if (lastDigit >= 2 && lastDigit <= 4) return t('userDetails.age.years2_4');
    return t('userDetails.age.years');
  };

  const formatBirthday = (birthday: string) => {
    return new Date(birthday).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return {
    formatPhoneNumber,
    calculateAge,
    getAgeWord,
    formatBirthday
  };
}; 