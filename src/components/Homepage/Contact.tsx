import CTAButton from '../shared/CTAButton';

const Contact = () => {
    return (
        <section className="py-16 sm:py-24">
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white border border-slate-200 rounded-xl p-8 sm:p-12">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900">Ready to Grow Your
                        Business?</h2>
                    <p className="text-slate-600 text-base">Let's talk about how our content solutions can
                        help you achieve your goals. Fill out the form, and we'll get back to you within 24 hours.</p>
                </div>
                <form className="flex flex-col gap-4">
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder="Name" type="text" />
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder="Email" type="email" />
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder="Company" type="text" />
                    <textarea
                        className="w-full px-4 py-3 rounded-lg bg-background-light border border-slate-300 focus:ring-primary focus:border-primary"
                        placeholder="Message" rows={4}></textarea>
                    <CTAButton text="Submit" variant="primary" className="w-full" />
                </form>
            </div>
        </section>
    );
};

export default Contact;