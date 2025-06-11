import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const sort = req.query.sort || "recent";
    const q = req.query.q;

    const skip = (page - 1) * pageSize;

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
        skip,
        take: pageSize,
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

    res.json({ list, totalCount, page, pageSize });
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
    if (
      typeof name !== "string" ||
      name.trim().length < 1 ||
      name.trim().length > 10
    ) {
      return res
        .status(400)
        .json({ error: "상품명은 10자 이내로 입력해주세요." });
    }
    if (
      typeof description !== "string" ||
      description.trim().length < 10 ||
      description.trim().length > 100
    ) {
      return res
        .status(400)
        .json({ error: "상품 설명은 10 ~ 100자 사이로 입력해주세요." });
    }
    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      return res.status(400).json({ error: "가격은 0 이상이어야 합니다." });
    }
    if (
      !Array.isArray(tags) ||
      !tags.every(tag => typeof tag === "string" && tag.trim().length <= 5)
    ) {
      return res
        .status(400)
        .json({ error: "태그는 각각 5글자 이내의 문자열이어야 합니다." });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: priceNumber,
        tags: tags.map(tag => tag.trim()),
      },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "상품 등록 실패" });
  }
});

// 상품 수정
router.patch("/:id", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    const updateData = {};

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        name.trim().length < 1 ||
        name.trim().length > 10
      ) {
        return res
          .status(400)
          .json({ error: "상품명은 10자 이내로 입력해주세요." });
      }
      updateData.name = name.trim();
    }
    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        description.trim().length < 10 ||
        description.trim().length > 100
      ) {
        return res
          .status(400)
          .json({ error: "상품 설명은 10 ~ 100자 사이로 입력해주세요." });
      }
      updateData.description = description.trim();
    }
    if (price !== undefined) {
      const priceNumber = Number(price);
      if (isNaN(priceNumber) || priceNumber < 0) {
        return res.status(400).json({ error: "가격은 0 이상이어야 합니다." });
      }
      updateData.price = priceNumber;
    }
    if (tags !== undefined) {
      if (
        !Array.isArray(tags) ||
        !tags.every(tag => typeof tag === "string" && tag.trim().length <= 5)
      ) {
        return res
          .status(400)
          .json({ error: "태그는 각각 5글자 이내의 문자열이어야 합니다." });
      }
      updateData.tags = tags.map(tag => tag.trim());
    }
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: updateData,
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
