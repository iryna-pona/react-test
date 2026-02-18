import { Router } from "express";
import { celebrate } from "celebrate";
import { getUserById } from "../controllers/usersController.js";
import { getUserByIdSchema } from "../validations/userValidation.js";

const router = Router();

router.get(
  "/user/:id",
  celebrate(getUserByIdSchema),
  getUserById
);

export default router;