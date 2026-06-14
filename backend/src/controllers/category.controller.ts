import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/error.middleware';

export async function listCategories(_req: Request, res: Response): Promise<void> {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json(categories);
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  const { name, slug } = req.body;
  const category = await prisma.category.create({ data: { name, slug } });
  res.status(201).json(category);
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const { name, slug } = req.body;
  const category = await prisma.category.update({
    where: { id: req.params.id },
    data: { name, slug },
  });
  res.json(category);
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const count = await prisma.product.count({ where: { categoryId: req.params.id } });
  if (count > 0) throw new AppError('Category has products associated', 400);

  await prisma.category.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
