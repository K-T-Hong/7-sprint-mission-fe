import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 댓글 목록 조회
router.get("/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {},
      orderBy: { createdAt: "asc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "전체 댓글 목록 조회 실패" });
  }
});

// 상품 댓글 목록 조회
router.get("/products/:productId/comments", async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { productId },
      orderBy: { createdAt: "asc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "상품 댓글 조회 실패" });
  }
});

// 게시글 댓글 목록 조회
router.get("/article/:articleId/comments", async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { articleId },
      orderBy: { createdAt: "asc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "게시글 댓글 조회 실패" });
  }
});

// 상품 댓글 등록
router.post("/products/:productId/comments", async (req, res) => {
  try {
    const { productId } = req.params;
    const { content } = req.body;
    if (
      typeof content !== "string" ||
      content.trim().length < 1 ||
      content.trim().length > 30
    ) {
      return res.status(400).json({ error: "댓글은 30자 이내로 입력해주세요" });
    }
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        productId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        productId: true,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "상품 댓글 등록 실패" });
  }
});

// 게시글 댓글 등록
router.post("/article/:articleId/comments", async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    if (
      typeof content !== "string" ||
      content.trim().length < 1 ||
      content.trim().length > 30
    ) {
      return res.status(400).json({ error: "댓글은 30자 이내로 입력해주세요" });
    }
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        articleId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        articleId: true,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "게시글 댓글 등록 실패" });
  }
});

// 댓글 수정
router.patch("/comments/:id", async (req, res) => {
  try {
    const { content } = req.body;
    if (
      typeof content !== "string" ||
      content.trim().length < 1 ||
      content.trim().length > 30
    ) {
      return res.status(400).json({ error: "댓글은 30자 이내로 입력해주세요" });
    }
    const comment = await prisma.comment.update({
      where: { id: req.params.id },
      data: { content: content.trim() },
    });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: "댓글 수정 실패" });
  }
});

// 댓글 삭제
router.delete("/comments/:id", async (req, res) => {
  try {
    await prisma.comment.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "댓글 삭제 실패" });
  }
});

export default router;
