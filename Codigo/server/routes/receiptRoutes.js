import { Router } from "express";
import {
  listReceipts,
  listReceiptsWithJoin,
  getReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipt,
} from "../controller/receiptController.js";
import { return500, return200 } from "../util/index.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Receipt
 *   description: API endpoints for managing receipts
 */

/**
 * @swagger
 * /receipt:
 *   get:
 *     summary: List all receipts
 *     description: Returns a list of all receipts
 *     tags:
 *       - Receipt
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of receipts
 */
router.get("/", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "accountant")
    )
      return return403(res);

    const response = await listReceipts();
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

/**
 * @swagger
 * /receipt/join:
 *   get:
 *     summary: List all receipts with join
 *     description: Returns a list of all receipts with join
 *     tags:
 *       - Receipt
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of receipts with join on pacient id
 */
router.post("/join", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "accountant")
    )
      return return403(res);

    const response = await listReceiptsWithJoin(req.body.period);

    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

/**
 * @swagger
 * /receipt:
 *   post:
 *     summary: Create a new receipt
 *     description: Creates a new receipt
 *     tags:
 *       - Receipt
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token
 *         required: false
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       200:
 *         description: Receipt created
 *       500:
 *         description: Error creating receipt
 */
router.post("/", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "accountant")
    )
      return return403(res);

    const response = await createReceipt(req.body);
    return200(response, res);
  } catch (error) {
    console.log("Error on creating a new receipt: " + error);
    return500(error, req, res);
  }
});

/**
 * @swagger
 * /receipt/{id}:
 *   put:
 *     summary: Update a receipt
 *     description: Updates a receipt by ID
 *     tags:
 *       - Receipt
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the receipt to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       200:
 *         description: Receipt updated
 *       500:
 *         description: Error updating receipt
 */
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "accountant")
    )
      return return403(res);

    const response = await updateReceipt(req.params.id, req.body);
    return200(response, res);
  } catch (error) {
    console.log("Error on updating the receipt: " + error);
    return500(error, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.role !== "accountant")
    )
      return return403(res);

    const response = await deleteReceipt(req.params.id);
    return200(response, res);
  } catch (error) {
    return500(error, req, res);
  }
});

export default router;
