import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} from "./user.controller.js";
import joiValidate from "../../middlewares/joiValidate.middleware.js";
import { createUserSchema } from "./user.validation.js";
import { loginUserSchema } from "./user.validation.js";

const router = express.Router();

router.post("/", joiValidate(createUserSchema), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/login", joiValidate(loginUserSchema), loginUser);

export default router;
