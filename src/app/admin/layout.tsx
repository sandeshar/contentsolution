import SideBar from "@/components/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <SideBar />
            {children}
        </div>

    )
}