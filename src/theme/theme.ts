export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    text: '#050510',
    secondaryText: '#97979B',
    tertiaryText: '#55555C',
    primary: '#6534FF',
    searchBackground: '#F7F7F8',
    divider: '#C3C3C6',
    headerBackground: '#F7F7F8',
    hoverBackground: '#F7F7F8',
    error: '#F44336'
  }
};

export const darkTheme = {
  colors: {
    background: '#1C1C1E',
    text: '#FFFFFF',
    secondaryText: '#8E8E93',
    tertiaryText: '#AEAEB2',
    primary: '#6534FF',
    searchBackground: '#2C2C2E',
    divider: '#3A3A3C',
    headerBackground: '#2C2C2E',
    hoverBackground: '#2C2C2E',
    error: '#FF453A'
  }
};

export type Theme = typeof lightTheme; 