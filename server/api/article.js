import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 게시판 목록 조회
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
            { title: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
          ],
        }
      : {};

    const orderBy =
      sort === "recent" ? { createdAt: "desc" } : { createdAt: "desc" };

    const [list, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.article.count({ where }),
    ]);
    res.json({ list, totalCount, page, pageSize });
  } catch (err) {
    res.status(500).json({ error: "게시판 목록 조회 실패" });
  }
});

// 게시글 조회
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
    if (!article) {
      return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
    }
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: "잘못된 게시글 ID" });
  }
});

// 게시글 등록
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (
      typeof title !== "string" ||
      title.trim().length < 1 ||
      title.trim().length > 20
    ) {
      return res
        .status(400)
        .json({ error: "제목은 20자 이내로 입력해주세요." });
    }
    if (
      typeof content !== "string" ||
      content.trim().length < 1 ||
      content.trim().length > 200
    ) {
      return res
        .status(400)
        .json({ error: "내용은 200자 이내로 입력해주세요." });
    }
    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        content: content.trim(),
      },
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: "게시글 등록 실패" });
  }
});

// 게시글 수정
router.patch("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateData = {};

    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        title.trim().length < 1 ||
        title.trim().length > 20
      ) {
        return res
          .status(400)
          .json({ error: "제목은 20자 이내로 입력해주세요." });
      }
      updateData.title = title.trim();
    }
    if (content !== undefined) {
      if (
        typeof content !== "string" ||
        content.trim().length < 1 ||
        content.trim().length > 200
      ) {
        return res
          .status(400)
          .json({ error: "내용은 200자 이내로 입력해주세요." });
      }
      updateData.content = content.trim();
    }

    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: "게시글 수정 실패" });
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  try {
    await prisma.article.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "게시글 삭제 실패" });
  }
});

export default router;
