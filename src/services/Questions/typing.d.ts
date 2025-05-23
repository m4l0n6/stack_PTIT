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
}
