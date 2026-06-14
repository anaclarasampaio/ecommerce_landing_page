import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/error.middleware';

export async function listProducts(req: Request, res: Response): Promise<void> {
  const { categoryId, search, page = '1', limit = '12' } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where = {
    ...(categoryId ? { categoryId: String(categoryId) } : {}),
    ...(search
      ? { name: { contains: String(search), mode: 'insensitive' as const } }
      : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: { select: { id: true, name: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.product.count({ where }),
  ]);

  res.json({ data: products, total, page: Number(page), limit: Number(limit) });
}

export async function getProduct(req: Request, res: Response): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true },
  });

  if (!product) throw new AppError('Product not found', 404);
  res.json(product);
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;

  const product = await prisma.product.create({
    data: { name, description, price, stock, imageUrl, categoryId },
    include: { category: true },
  });

  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;

  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: { name, description, price, stock, imageUrl, categoryId },
    include: { category: true },
  });

  res.json(product);
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
