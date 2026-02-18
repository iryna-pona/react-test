import { Router } from "express";
import { celebrate } from "celebrate";
import { getTravellers } from "../controllers/travellersController.js";
import { getTravellersSchema } from "../validations/travellersValidation.js";

const router = Router();

router.get(
  "/travellers",
  celebrate(getTravellersSchema),
  getTravellers
);

export default router;