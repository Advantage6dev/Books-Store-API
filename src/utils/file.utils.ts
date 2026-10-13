import { readFile, writeFile } from 'node:fs/promises';

const bookFilePath = new URL('../../data/book.json', import.meta.url);
const authorFilePath = new URL('../../data/author.json', import.meta.url);

export async function readBookFile(): Promise<string> {
  const data = await readFile(bookFilePath, 'utf-8');
  return data;
}

export async function writeBookFile(data: unknown): Promise<void> {
  await writeFile(bookFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function readAuthorFile(): Promise<string> {
  const data = await readFile(authorFilePath, 'utf8');
  return data;
}

export async function writeAuthorFile(data: unknown): Promise<void> {
  await writeFile(authorFilePath, JSON.stringify(data, null, 2), 'utf8');
}
