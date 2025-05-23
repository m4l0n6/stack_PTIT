export interface Answer { 
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
};
