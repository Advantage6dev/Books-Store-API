export interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
  createdAt: string;
}

export interface CreateAuthor {
  name: string;
  email: string;
  bio?: string;
}

export type UpdateAuthor = Partial<Author>;
