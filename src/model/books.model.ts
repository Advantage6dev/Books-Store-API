export interface Book {
  id: number;
  title: string;
  isbn: string;
  price: number;
  publishedYear: number;
  authorId: number;
  createdAt: string;
}

export interface CreateBook {
  title: string;
  isbn: string;
  price: number;
  publishedYear: number;
  authorId: number;
}

export type UpdateBook = Partial<Book>;
