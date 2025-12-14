import { Request, Response } from "express";
import Project from "../models/projectModel";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};


export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error });
  }
};


export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, technologies, githubLink, liveLink, media } = req.body;

    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required" });


    const project = await Project.create({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      media, 
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error });
  }
};


export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error });
  }
};


export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error });
  }
};
