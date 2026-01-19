import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  content: string;
  tags?: string;
  thumbnail?: string;
  metaTitle?: string;
  metaDescription?: string;
  authorId: mongoose.Types.ObjectId;
  status: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: String },
  thumbnail: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
