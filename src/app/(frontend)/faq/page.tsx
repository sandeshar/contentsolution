export default function FAQPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h1>
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Question 1?</h3>
                    <p className="text-slate-600">Answer to the first question.</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Question 2?</h3>
                    <p className="text-slate-600">Answer to the second question.</p>
                </div>
            </div>
        </main>
    );
}
