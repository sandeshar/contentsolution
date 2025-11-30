import SideBar from "@/components/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div>
                    <SideBar />
                    {children}
                </div>
            </body>
        </html>
    )
}