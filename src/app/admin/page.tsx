const Page = () => {
    const stats = [
        { label: "Total Posts", value: "128", icon: "article", delta: "+12%", deltaType: "up" },
        { label: "Active Users", value: "2,450", icon: "group", delta: "+5%", deltaType: "up" },
        { label: "New Comments", value: "342", icon: "chat", delta: "-3%", deltaType: "down" },
        { label: "Bounce Rate", value: "28%", icon: "trending_down", delta: "-1.2%", deltaType: "down" },
    ];

    const recent = [
        { id: "1", title: "Designing Accessible Components", author: "Olivia Rhye", status: "Published", date: "Nov 26, 2025" },
        { id: "2", title: "Optimizing Next.js Performance", author: "Liam Smith", status: "Draft", date: "Nov 25, 2025" },
        { id: "3", title: "Dark Mode Best Practices", author: "Emma Johnson", status: "In Review", date: "Nov 24, 2025" },
        { id: "4", title: "Tailwind CSS Tips", author: "Noah Williams", status: "Published", date: "Nov 23, 2025" },
    ];

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                                    <span className="material-symbols-outlined text-base {s.deltaType === 'up' ? 'text-green-600' : 'text-red-600'}">
                                        {s.deltaType === "up" ? "arrow_upward" : "arrow_downward"}
                                    </span>
                                    {s.delta} since last week
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 flex items-center justify-between border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900">Recent Posts</h2>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-slate-100">View All</button>
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
                                        {recent.map((r) => {
                                            const statusClasses =
                                                r.status === "Published"
                                                    ? "bg-green-100 text-green-800"
                                                    : r.status === "Draft"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-blue-100 text-blue-800"; // In Review
                                            return (
                                                <tr key={r.id} className="border-b border-slate-200 hover:bg-slate-50">
                                                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{r.title}</td>
                                                    <td className="px-6 py-4">{r.author}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}>{r.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4">{r.date}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-1 text-slate-500 hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-1 text-slate-500 hover:text-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 flex justify-between items-center text-sm text-slate-500">
                                <span>Showing 1 to 4 of 12 results</span>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-slate-100">Previous</button>
                                    <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-slate-100">Next</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                                <p className="text-slate-500 text-sm mt-1">Common tasks and shortcuts.</p>
                            </div>
                            <div className="p-4 grid grid-cols-1 gap-3">
                                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">add</span>
                                        New Post
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">group_add</span>
                                        Invite User
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                                    <span className="flex items-center gap-2 text-slate-700">
                                        <span className="material-symbols-outlined">settings</span>
                                        Configure Settings
                                    </span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;