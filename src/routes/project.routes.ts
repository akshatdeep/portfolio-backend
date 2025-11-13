import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/projectController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new project
router.post("/", isAuthenticated, createProject);

// Get all projects
router.get("/", getProjects);

// Get single project by ID
router.get("/:id", isAuthenticated, getProjectById);

// Update a project
router.post("/update/:id", isAuthenticated, updateProject);

// Delete a project
router.post("/delete/:id", isAuthenticated, deleteProject);

export default router;
