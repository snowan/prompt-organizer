export interface Prompt {
  id: number;
  title: string;
  description: string;
  promptText: string;
  tags: string[];
  createdAt: Date;
  modifiedAt: Date;
} 