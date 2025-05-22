export interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  voteCount: number;
  answerCount: number;
  viewCount: number;
  answers?: Answer[];
}

export interface Answer {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  voteCount: number;
  isAccepted: boolean;
  commentCount: number;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
}
