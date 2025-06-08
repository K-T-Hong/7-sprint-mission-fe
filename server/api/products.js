import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "recent", q } = req.query;
    const skip = (page - 1) * limit;
    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }
      : {};

    const orderBy =
      sort === "recent" ? { createdAt: "desc" } : { createdAt: "desc" };

    const [list, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: Number(skip),
        take: Number(limit),
        select: {
          id: true,
          name: true,
          price: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({ list, totalCount, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: "상품 목록 조회 실패" });
  }
});

// 상품 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: "상품이 존재하지 않습니다." });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "잘못된 상품 ID" });
  }
});

// 상품 등록
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ error: "필수값 누락" });
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        tags: Array.isArray(tags) ? tags : [],
      },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("상품 등록 실패", err);
    res.status(500).json({ error: "상품 등록 실패" });
  }
});

// 상품 수정
router.patch("/:id", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, description, price, tags },
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "상품 수정 실패" });
  }
});

// 상품 삭제
router.delete("/:id", async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "상품 삭제 실패" });
  }
});

export default router;
