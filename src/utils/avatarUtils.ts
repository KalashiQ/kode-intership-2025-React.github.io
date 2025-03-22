export const generateFallbackAvatar = (firstName: string, lastName: string): string => {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const colors = [
    '#E17076', '#FAA774', '#FFD27D', '#A8D685', '#69B4F0', 
    '#7284E8', '#B98FE2', '#E587B7'
  ];
  
  const colorIndex = (firstName.length + lastName.length) % colors.length;
  const backgroundColor = colors[colorIndex];
  
  const svg = `
    <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="72" rx="36" fill="${backgroundColor}"/>
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dy=".3em"
        fill="white"
        font-family="Inter"
        font-size="24"
        font-weight="500"
      >${initials}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const loadImageWithTimeout = (imageUrl: string, timeout: number = 10000): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout'));
    }, timeout);

    const cleanup = () => {
      clearTimeout(timeoutId);
      image.onload = null;
      image.onerror = null;
    };

    image.onload = () => {
      cleanup();
      resolve(imageUrl);
    };

    image.onerror = () => {
      cleanup();
      reject(new Error('Failed to load image'));
    };

    image.src = imageUrl;
  });
}; 