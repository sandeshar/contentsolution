import { db } from "@/db";
import { blogPosts, users, status } from "@/db/schema";
import { contactFormSubmissions } from "@/db/contactPageSchema";
import { eq, desc, count } from "drizzle-orm";
import Link from "next/link";
import { getBlogStatusClasses } from "@/utils/statusHelpers";

const Page = async () => {
    // Fetch real statistics
    const [
        totalPosts,
        publishedPosts,
        draftPosts,
        recentPosts,
        totalContact,
        newContact,
    ] = await Promise.all([
        db.select({ count: count() }).from(blogPosts),
        db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.status, 2)), // Published
        db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.status, 1)), // Draft
        db.select({
            id: blogPosts.id,
            slug: blogPosts.slug,
            title: blogPosts.title,
            authorName: users.name,
            statusId: blogPosts.status,
            statusName: status.name,
            createdAt: blogPosts.createdAt,
        })
            .from(blogPosts)
            .leftJoin(users, eq(blogPosts.authorId, users.id))
            .leftJoin(status, eq(blogPosts.status, status.id))
            .orderBy(desc(blogPosts.createdAt))
            .limit(4),
        db.select({ count: count() }).from(contactFormSubmissions),
        db.select({ count: count() }).from(contactFormSubmissions).where(eq(contactFormSubmissions.status, "new")),
    ]);

    const stats = [
        { label: "Total Posts", value: totalPosts[0]?.count?.toString() || "0", icon: "article", delta: "+12%", deltaType: "up" },
        { label: "Published", value: publishedPosts[0]?.count?.toString() || "0", icon: "check_circle", delta: "0%", deltaType: "up" },
        { label: "Draft", value: draftPosts[0]?.count?.toString() || "0", icon: "edit_note", delta: "0%", deltaType: "down" },
        { label: "Contact Messages", value: totalContact[0]?.count?.toString() || "0", icon: "contact_mail", delta: "", deltaType: "up" },
        { label: "New Messages", value: newContact[0]?.count?.toString() || "0", icon: "mark_email_unread", delta: "", deltaType: "up" },
    ];

    const recent = recentPosts.map(post => ({
        id: post.id?.toString() || "",
        slug: post.slug || "",
        title: post.title || "",
        author: post.authorName || "Unknown",
        statusId: post.statusId || 1,
        status: post.statusName || "Unknown",
        date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) : "",
    }));

    return (
        <main className="flex-1 flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-500 mt-1">Overview of your content and activity.</p>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export Report
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-sm text-slate-500">{s.label}</div>
                                        <div className="mt-1 text-2xl font-bold text-slate-900">{s.value}</div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-3xl">{s.icon}</span>
                                </div>
                                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600">
                                    {s.delta && (
                                        <>
                                            <span className={`material-symbols-outlined text-base ${s.deltaType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                {s.deltaType === "up" ? "arrow_upward" : "arrow_downward"}
                                            </span>
                                            {s.delta} since last week
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 flex items-center justify-between border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900">Recent Posts</h2>
                                <div className="flex items-center gap-2">
                                    <Link href="/admin/blog" className="px-3 py-1 border border-slate-300 rounded-md hover:bg-slate-100">View All</Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3" scope="col">Title</th>
                                            <th className="px-6 py-3" scope="col">Author</th>
                                            <th className="px-6 py-3" scope="col">Status</th>
                                            <th className="px-6 py-3" scope="col">Date</th>
                                            <th className="px-6 py-3 text-right" scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recent.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                                    No posts found. <Link href="/admin/blog/add" className="text-primary hover:underline">Create your first post</Link>
                                                </td>
                                            </tr>
                                        ) : recent.map((r) => {
                                            return (
                                                <tr key={r.id} className="border-b border-slate-200 hover:bg-slate-50">
                                                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{r.title}</td>
                                                    <td className="px-6 py-4">{r.author}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBlogStatusClasses(r.statusId)}`}>{r.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4">{r.date}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Link href={`/admin/blog/edit/${r.slug}`} className="p-1 text-slate-500 hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary inline-block">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 flex justify-between items-center text-sm text-slate-500">
                                <span>Showing {recent.length > 0 ? '1' : '0'} to {recent.length} of {totalPosts[0]?.count || 0} results</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                                <p className="text-slate-500 text-sm mt-1">Common tasks and shortcuts.</p>
                            </div>
                            <div className="p-4 grid grid-cols-1 gap-3">
                                <Link href="/admin/blog/add" className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">add</span>
                                        New Post
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </Link>
                                <Link href="/admin/users" className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">group_add</span>
                                        Manage Users
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </Link>
                                <Link href="/admin/store-setting" className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">settings</span>
                                        Store Settings
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </Link>
                                <Link href="/admin/contact" className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">contact_mail</span>
                                        Contact Submissions
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;