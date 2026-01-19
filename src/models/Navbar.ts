import mongoose, { Schema } from 'mongoose';

const NavbarItemSchema = new Schema({
    label: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
    parent_id: { type: Schema.Types.ObjectId, ref: 'NavbarItem', default: null },
    is_button: { type: Number, default: 0 },
    is_dropdown: { type: Number, default: 0 },
    is_active: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.models.NavbarItem || mongoose.model('NavbarItem', NavbarItemSchema);
