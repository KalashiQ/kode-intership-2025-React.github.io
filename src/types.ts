export interface User {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
  birthday: string;
  phone: string;
}

export type TabType = 
  | "all" 
  | "design" 
  | "analytics" 
  | "management" 
  | "ios" 
  | "android" 
  | "frontend" 
  | "backend" 
  | "support" 
  | "qa" 
  | "back_office" 
  | "hr" 
  | "pr"; 