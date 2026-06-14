import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';

export async function listOrders(req: AuthRequest, res: Response): Promise<void> {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: {
      items: { include: { product: { select: { id: true, name: true, imageUrl: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(orders);
}

export async function getOrder(req: AuthRequest, res: Response): Promise<void> {
  const order = await prisma.order.findFirst({
    where: { id: req.params.id, userId: req.userId },
    include: {
      items: { include: { product: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!order) throw new AppError('Order not found', 404);
  res.json(order);
}

export async function createOrder(req: AuthRequest, res: Response): Promise<void> {
  const { items } = req.body as { items: Array<{ productId: string; quantity: number }> };

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== items.length) throw new AppError('One or more products not found', 404);

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId)!;
    if (product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for "${product.name}"`, 400);
    }
  }

  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return sum + Number(product.price) * item.quantity;
  }, 0);

  const order = await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)!;
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity },
      });
    }

    return tx.order.create({
      data: {
        userId: req.userId!,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: products.find((p) => p.id === item.productId)!.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });
  });

  res.status(201).json(order);
}
