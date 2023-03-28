import express from "express";
import { addcarro, deletecarro, getcarros, updatecarro } from "../controllers/carro.js";

const router = express.Router()

router.get("/", getcarros)

router.post("/", addcarro)

router.put("/:id", updatecarro)

router.delete("/:id", deletecarro)

export default router