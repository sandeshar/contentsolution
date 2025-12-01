export default function ContactPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
            <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                    Get in touch with us for any inquiries or support.
                </p>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <p className="text-slate-600">Email: contact@example.com</p>
                    <p className="text-slate-600">Phone: +1 234 567 8900</p>
                </div>
            </div>
        </main>
    );
}
