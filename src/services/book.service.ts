import { CreateBook, Book, UpdateBook } from '../model/books.model.js';
import { readBookFile, writeBookFile } from '../utils/file.utils.js';

export async function getAllBooks(): Promise<Book[]> {
  const books = await readBookFile();
  return JSON.parse(books) as Book[];
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const books = await getAllBooks();
  const book = books.find((book) => book.id === id);
  if (!book) {
    throw new Error('Book not found');
  }

  return book;
}

export async function CreateABook(data: CreateBook): Promise<Book> {
  const books = await getAllBooks();
  const newId =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
  const book = {
    id: newId,
    title: data.title,
    isbn: data.isbn,
    price: data.price,
    publishedYear: data.publishedYear,
    authorId: data.authorId,
    createdAt: new Date().toISOString(),
  };

  books.push(book);
  await writeBookFile(books);
  return book;
}

export async function deleteABook(id: number): Promise<Book> {
  const books = await getAllBooks();
  const bookIndex = books.findIndex((book) => book.id === id);
  const book = books[bookIndex];

  books.splice(bookIndex, 1);
  await writeBookFile(books);

  return book;
}

export async function updateABook(id: number, data: UpdateBook): Promise<Book> {
  const books = await getAllBooks();
  const bookIndex = books.findIndex((book) => book.id === id);
  if (!bookIndex) {
    throw new Error('Book not found');
  }
  const book = books[bookIndex];

  const updatedbook = { ...books[bookIndex], ...data };
  await writeBookFile(books);

  return book;
}

export async function filterBook(
  search: string,
  sort: 'asc' | 'desc',
): Promise<Book[]> {
  let books = await getAllBooks();
  if (search) {
    books.filter(
      (book) => book.title.toLocaleLowerCase() === search.toLocaleLowerCase(),
    );
  }
  if (sort) {
    books.sort((a, b) => {
      return sort === 'asc' ? a.id - b.id : b.id - a.id;
    });
  }

  return books;
}
