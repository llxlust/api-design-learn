import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleError } from "./modules/middlewares.js";
import { UPDATE_STATUS } from "./models/Update.js";
import {
  createProduct,
  deletProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./้handlers/product.js";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdate, updateUpdate } from "./้handlers/update.js";
const router = Router();
//Product
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post(
  "/product",
  body("name").isString(),
  handleError,
  createProduct,
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleError,
  updateProduct,
);

router.delete("/product/:id",deletProduct);

//Update
router.get("/update", getUpdate);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status")
    .isIn([
      UPDATE_STATUS.DEPRECATE,
      UPDATE_STATUS.IN_PROGRESS,
      UPDATE_STATUS.SHIPPED,
    ])
    .optional(),
  body("version").optional().isString(),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);
//UpdatePoint
router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  (req, res) => {}
);

router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
  (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});
export default router;
