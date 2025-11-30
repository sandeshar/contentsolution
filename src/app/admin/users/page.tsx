type User = {
    id: string;
    name: string;
    email: string;
    role: "Administrator" | "Editor" | "Viewer";
    status: "Active" | "Pending" | "Banned";
    lastLogin: string;
    avatarUrl: string;
};

const users: User[] = [
    {
        id: "1",
        name: "Olivia Rhye",
        email: "olivia@example.com",
        role: "Administrator",
        status: "Active",
        lastLogin: "2 hours ago",
        avatarUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCCt6e8xK2J93DNGwNi-t3z4_ZBH8F2FkQ8zRjWFI2UkZzXT9EjtquXt3rXLclQJqEvO8dTk0jD9ynscLBXJ30IzEIPVdHf71nCG8QN27a399VPZ_mh3qZnQa5F3Fwabct43zT_l0XwSfRB0devjbs7934LGl2VJh8zuVPvI5QTANww5E1xP0b_iqljSPT0AGCBRt-3Vv4sYOeyIBKKX267S3GH4qccVr32dDOSifw7MA5cgruM-y_X97jQ_j9NtO0ekUkYPaHLo4Q",
    },
    {
        id: "2",
        name: "Liam Smith",
        email: "liam@example.com",
        role: "Editor",
        status: "Active",
        lastLogin: "1 day ago",
        avatarUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBt4tSuwMJ243Z0IpM3FZQxW4JVXLd0O_l8IYGac8gZKIk4yxxyLFumiTj6LEsuMWkBoSs97WyBEJ2L4LTGNWaJ9EBrzEdl92EROqCr0qeDtBmkWmGK-Wydhsg0WD-6kVbtgQqNcNymskpL5s8Mafjuc85jAw_Wi7rrVfPgkj87ltoW6u9Qwkfxvi1Ny_KiQYQnRvN-Cau-w-fh78FioEw5FsB2MECDbl4ZWcM2wLy7bGzIa4VmxjOhBCCp1TIYUbgmrRwCRTJfmuc",
    },
    {
        id: "3",
        name: "Emma Johnson",
        email: "emma@example.com",
        role: "Viewer",
        status: "Pending",
        lastLogin: "5 days ago",
        avatarUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLSBVrvLdz5oPVg-_MkDKgUP5cvhbmGGoewIGiKtRJWBVIIwrtTykiSuhg9r0IeiBHGgcAz92vmCf6mz1_nikQ2gj0mmwqezm3rOLT5O5oZxhmBec8n68uJs894LIGvCt6VofuMs0Ppgm6Z6-Z2-Cy9RPYonXuLXsPyFilbZz38qIf2XoBfkl-F_AdZv4GNeaxtoaxWpfr6i88AkUkOjn1ctSXZJ2XlvLJf5Jg250n72XOIqkRxfT0W4szYnWShEfli7QEyL4sHOU",
    },
    {
        id: "4",
        name: "Noah Williams",
        email: "noah@example.com",
        role: "Viewer",
        status: "Banned",
        lastLogin: "1 month ago",
        avatarUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC_fgzO6NycL2ZeW8Mm3Op3LAIIeUkiHU0UM_qLWEQ3YYkFer-nR3S-wtxV8hzf1PxG2tqdg4eZ55gQIwN4TIq0QQci463Vx0ri48rfel77nOgwq1Ol2y8e4hlscoGxscG2F2wXA0mERoBCjS3V5nyG4GV1xpdGR8ec32-dQIIssDNWJ2f4rl4R3jOnTteYDcvYzs5wTT2zy24_rbYuBWndNdz3dPHF4Rjd0-g0rSfGagGVSj4_zaAso5mlOTtSkGCxW6SY_uT4JH8",
    },
];

export default function UsersPage() {
    return (
        <main className="flex-1 flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Users Management</h1>
                        <p className="text-slate-500 mt-1">Manage your users here. This page will display user listings, roles, and permissions.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 flex justify-between items-center border-b border-slate-200">
                            <div className="relative w-full max-w-sm">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Search users..." type="text" />
                            </div>
                            <a href="/admin/users/add" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white">
                                <span className="material-symbols-outlined text-lg">add</span>
                                Add User
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3" scope="col">User</th>
                                        <th className="px-6 py-3" scope="col">Role</th>
                                        <th className="px-6 py-3" scope="col">Status</th>
                                        <th className="px-6 py-3" scope="col">Last Login</th>
                                        <th className="px-6 py-3 text-right" scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        const statusClasses =
                                            user.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : user.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800";
                                        return (
                                            <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                                                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <img alt={`${user.name} profile picture`} className="w-10 h-10 rounded-full" src={user.avatarUrl} />
                                                        <div>
                                                            <div>{user.name}</div>
                                                            <div className="text-xs text-slate-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{user.role}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}>{user.status}</span>
                                                </td>
                                                <td className="px-6 py-4">{user.lastLogin}</td>
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
                            <span>Showing 1 to 4 of 20 results</span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-slate-100">Previous</button>
                                <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-slate-100">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
