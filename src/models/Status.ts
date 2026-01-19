import mongoose, { Schema, Document } from 'mongoose';

export interface IStatus extends Document {
  name: string;
}

const StatusSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.Status || mongoose.model<IStatus>('Status', StatusSchema);
