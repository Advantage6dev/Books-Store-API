import { Request, Response, NextFunction } from 'express';
import {
  getAllAuthors,
  getAuthorById,
  deleteAuthorById,
  UpdateAnAuthor,
  CreateAnAuthor,
} from '../services/author.service.js';
import { Author, UpdateAuthor, CreateAuthor } from '../model/author.model.js';

function getId(req: Request) {
  return Number(req.params.id);
}

export async function AllAuthors(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authors = await getAllAuthors();
    res.status(200).json({
      success: true,
      message: 'All Authors found',
      data: authors,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAnAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const author = await getAuthorById(id);
    if (!author) {
      res.status(404).json({
        success: false,
        messsage: 'Author not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Author Found',
      data: author,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAnAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const author = await deleteAuthorById(id);
    if (!author) {
      res.status(404).json({
        success: false,
        messsage: 'Author not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Author Deleted',
      data: author,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const body = req.body as UpdateAuthor;
    const author = await UpdateAnAuthor(id, body);
    if (!author) {
      res.status(404).json({
        success: false,
        messsage: 'Author not Updated',
      });
    }
    res.status(201).json({
      success: true,
      message: 'Author Updated',
      data: author,
    });
  } catch (err) {
    next(err);
  }
}

export async function createAAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as CreateAuthor;
    const author = await CreateAnAuthor(body);
    res.status(201).json({
      success: true,
      message: 'Author crerated succesfully',
      data: author,
    });
  } catch (err) {
    next(err);
  }
}
