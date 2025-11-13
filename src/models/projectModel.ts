import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  media?: {
    url: string;
    public_id: string;
    type: "image" | "video";
  }[];
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
    },
    liveLink: {
      type: String,
    },
    media: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", projectSchema);
