import { Author, CreateAuthor, UpdateAuthor } from '../model/author.model.js';
import { writeAuthorFile, readAuthorFile } from '../utils/file.utils.js';

export async function getAllAuthors(): Promise<Author[]> {
  const authors = await readAuthorFile();
  return JSON.parse(authors) as Author[];
}

export async function getAuthorById(id: number): Promise<Author | undefined> {
  const authors = await getAllAuthors();
  const author = authors.find((author) => author.id === id);
  if (!author) {
    throw new Error('Author not found');
  }

  return author;
}

export async function deleteAuthorById(id: number): Promise<Author> {
  const authors = await getAllAuthors();
  const authorIndex = authors.findIndex((author) => author.id === id);
  if (!authorIndex) {
    throw new Error('Author not found');
  }
  const author = authors[authorIndex];

  authors.splice(authorIndex, 1);
  await writeAuthorFile(authors);

  return author;
}

export async function CreateAnAuthor(data: CreateAuthor): Promise<Author> {
  const authors = await getAllAuthors();
  const newId =
    authors.length > 0
      ? Math.max(...authors.map((author) => author.id)) + 1
      : 1;

  const AuthorCreated = {
    id: newId,
    name: data.name,
    email: data.email,
    bio: data.bio,
    createdAt: new Date().toISOString(),
  };
  authors.push(AuthorCreated);
  await writeAuthorFile(authors);

  return AuthorCreated;
}

export async function UpdateAnAuthor(
  id: number,
  data: UpdateAuthor,
): Promise<Author> {
  const authors = await getAllAuthors();
  const authorIndex = authors.findIndex((author) => author.id === id);
  if (!authorIndex) {
    throw new Error('Author not found');
  }
  const author = authors[authorIndex];

  const update = { ...authors[authorIndex], ...data };
  await writeAuthorFile(authors);

  return author;
}
