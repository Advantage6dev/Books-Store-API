import { Response, Request, NextFunction } from 'express';
import {
  getAllBooks,
  getBookById,
  deleteABook,
  updateABook,
  CreateABook,
  filterBook,
} from '../services/book.service.js';
import { Book, CreateBook, UpdateBook } from '../model/books.model.js';

function getId(req: Request) {
  return Number(req.params.id);
}

async function getBooks(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { search, sort } = req.query;
    const hasChecked = search !== undefined || sort !== undefined;
    if (hasChecked) {
      let books = await filterBook(search as string, sort as 'asc' | 'desc');

      res.status(200).json({
        success: true,
        message: 'Books Found',
        data: books,
      });
      return;
    }
    const books = await getAllBooks();
    res.status(200).json({
      success: true,
      message: 'All  Books found',
      data: books,
    });
  } catch (err) {
    next(err);
  }
}

async function getBook(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const book = await getBookById(id);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book Found',
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const deletedbook = await deleteABook(id);
    if (!deletedbook) {
      res.status(404).json({
        success: false,
        message: 'Deleted book was not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Book has been deleted',
      data: deletedbook,
    });
  } catch (err) {
    next(err);
  }
}
export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const body = req.body as UpdateBook;
    const book = await updateABook(id, body);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated',
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body as CreateBook;
    const book = await CreateABook(body);
    res.status(201).json({
      success: true,
      message: 'Book has been created',
      data: book,
    });
  } catch (err) {
    next(err);
  }
}
