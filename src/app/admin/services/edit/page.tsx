"use client";

import { useState, useRef, useEffect } from "react";
import ImageUploader from "@/components/shared/ImageUploader";
import { useSearchParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

export default function EditServicePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        icon: "",
        statusId: 2,
        metaTitle: "",
        metaDescription: "",
    });
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [initialContent, setInitialContent] = useState<string>("");
    const imageInputRef = useRef<HTMLInputElement>(null);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full h-auto rounded-lg",
                },
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight.configure({
                multicolor: true,
                HTMLAttributes: {
                    class: 'highlight',
                },
            }),
            TextStyle,
            Color,
            Placeholder.configure({
                placeholder: 'Start writing your service content here... Use the toolbar above to format your text.',
                emptyEditorClass: 'is-editor-empty',
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: "<p></p>",
        editorProps: {
            attributes: {
                class: "tiptap min-h-[400px] max-h-[600px] p-4 focus:outline-none overflow-y-auto",
                spellcheck: "true",
            },
        },
        onUpdate: ({ editor }) => {
            const text = editor.getText();
            setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
            setCharCount(text.length);
        },
        immediatelyRender: true,
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/services?id=${id}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch service');
                }

                const service = await response.json();

                setFormData({
                    title: service.title || "",
                    slug: service.slug || "",
                    excerpt: service.excerpt || "",
                    icon: service.icon || "",
                    statusId: service.statusId || 2,
                    metaTitle: service.metaTitle || "",
                    metaDescription: service.metaDescription || "",
                });

                if (service.thumbnail) {
                    setThumbnailUrl(service.thumbnail);
                }

                if (service.content) {
                    setInitialContent(service.content);
                }
            } catch (error: any) {
                console.error('Error fetching service:', error);
                alert(`Failed to load service: ${error.message}`);
                setTimeout(() => {
                    window.location.href = '/admin/services';
                }, 2000);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id]);

    useEffect(() => {
        if (editor && initialContent && !editor.getText()) {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const content = editor?.getHTML() || "";

        try {
            const response = await fetch('/api/services', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(id!),
                    title: formData.title,
                    slug: formData.slug,
                    excerpt: formData.excerpt,
                    content,
                    thumbnail: thumbnailUrl || null,
                    icon: formData.icon,
                    statusId: formData.statusId,
                    metaTitle: formData.metaTitle || formData.title,
                    metaDescription: formData.metaDescription || formData.excerpt,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update service');
            }

            alert('Service updated successfully!');
            window.location.href = '/admin/services';
        } catch (error: any) {
            console.error('Error updating service:', error);
            alert(error.message || 'Failed to update service. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const setLink = () => {
        const url = prompt("Enter link URL:");
        if (url) {
            editor?.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = prompt("Enter image URL:");
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    };

    const addImageFromFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", "services/content");

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to upload image");
                }

                editor?.chain().focus().setImage({ src: data.url }).run();
            } catch (error: any) {
                console.error("Error uploading image:", error);
                alert(error.message || "Failed to upload image");
            }
        }
    };

    if (isLoading || !editor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Edit Service</h1>
                <p className="text-gray-600">Update service post</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                setFormData({
                                    ...formData,
                                    title,
                                    slug: generateSlug(title),
                                });
                            }}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                            placeholder="e.g., Content Writing Services"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                            placeholder="content-writing-services"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            URL: /services/{formData.slug || "your-slug"}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Excerpt *
                        </label>
                        <textarea
                            required
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                            rows={3}
                            placeholder="Short description (shown on cards and hero)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Icon (Material Symbol) *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                            placeholder="e.g., edit_note, campaign, brush"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Find icons at: <a href="https://fonts.google.com/icons" target="_blank" className="text-primary underline">fonts.google.com/icons</a>
                        </p>
                        {formData.icon && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-600">Preview:</span>
                                <span className="material-symbols-outlined text-primary text-3xl">{formData.icon}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.statusId}
                            onChange={(e) => setFormData({ ...formData, statusId: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                        >
                            <option value={1}>Draft</option>
                            <option value={2}>Published</option>
                        </select>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Thumbnail Image</h2>
                    <ImageUploader
                        value={thumbnailUrl}
                        onChange={setThumbnailUrl}
                        folder="services/thumbnails"
                        label="Service Thumbnail"
                    />
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Service Content</h2>
                        <div className="text-sm text-gray-600">
                            {wordCount} words • {charCount} characters
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="border rounded-lg overflow-hidden mb-4">
                        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
                            {/* Formatting */}
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
                                title="Bold"
                            >
                                <span className="material-symbols-outlined text-sm">format_bold</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
                                title="Italic"
                            >
                                <span className="material-symbols-outlined text-sm">format_italic</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
                                title="Underline"
                            >
                                <span className="material-symbols-outlined text-sm">format_underlined</span>
                            </button>

                            <div className="w-px h-8 bg-gray-300 mx-1"></div>

                            {/* Headings */}
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""}`}
                                title="Heading 2"
                            >
                                H2
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""}`}
                                title="Heading 3"
                            >
                                H3
                            </button>

                            <div className="w-px h-8 bg-gray-300 mx-1"></div>

                            {/* Lists */}
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
                                title="Bullet List"
                            >
                                <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
                                title="Numbered List"
                            >
                                <span className="material-symbols-outlined text-sm">format_list_numbered</span>
                            </button>

                            <div className="w-px h-8 bg-gray-300 mx-1"></div>

                            {/* Alignment */}
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""}`}
                                title="Align Left"
                            >
                                <span className="material-symbols-outlined text-sm">format_align_left</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""}`}
                                title="Align Center"
                            >
                                <span className="material-symbols-outlined text-sm">format_align_center</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""}`}
                                title="Align Right"
                            >
                                <span className="material-symbols-outlined text-sm">format_align_right</span>
                            </button>

                            <div className="w-px h-8 bg-gray-300 mx-1"></div>

                            {/* Link & Image */}
                            <button
                                type="button"
                                onClick={setLink}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("link") ? "bg-gray-300" : ""}`}
                                title="Add Link"
                            >
                                <span className="material-symbols-outlined text-sm">link</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="p-2 rounded hover:bg-gray-200"
                                title="Upload Image"
                            >
                                <span className="material-symbols-outlined text-sm">image</span>
                            </button>
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                onChange={addImageFromFile}
                                className="hidden"
                            />

                            <div className="w-px h-8 bg-gray-300 mx-1"></div>

                            {/* Code Block */}
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("codeBlock") ? "bg-gray-300" : ""}`}
                                title="Code Block"
                            >
                                <span className="material-symbols-outlined text-sm">code</span>
                            </button>
                        </div>

                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            value={formData.metaTitle}
                            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                            placeholder="Leave empty to use title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Description
                        </label>
                        <textarea
                            value={formData.metaDescription}
                            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                            rows={3}
                            placeholder="Leave empty to use excerpt"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isSaving ? "Updating..." : "Update Service"}
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
