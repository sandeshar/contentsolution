export default function TermsPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms and Conditions</h1>
            <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 mb-6">Last updated: December 1, 2025</p>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
                    <p className="text-slate-600 mb-4">
                        By accessing our website, you agree to be bound by these terms and conditions.
                    </p>
                    <h2 className="text-xl font-semibold mb-4">2. Use of Service</h2>
                    <p className="text-slate-600">
                        You may use our service only in accordance with applicable laws and regulations.
                    </p>
                </div>
            </div>
        </main>
    );
}
