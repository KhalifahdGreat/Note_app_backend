import { Router } from "express";
import {
  createSingleNote,
  getSingleNote,
  readAll,
  removeSingleNote,
  updateSingleNote,
} from "../controllers/note";

const router = Router();

router.post("/create", createSingleNote);

// update
router.patch("/:noteId", updateSingleNote);

//
router.get("/", readAll);

router.get("/:id", getSingleNote);

//delete
router.delete("/:noteId", removeSingleNote);

export default router;
