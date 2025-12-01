import { db } from "@/db";
import { storeSettings } from "@/db/schema";

export default async function Home() {
    const rows = await db.select().from(storeSettings).limit(1);
    const s = rows[0];
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            {s?.store_logo ? (
                <div className="mb-6 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.store_logo} alt="Store logo" className="h-16 w-auto" />
                </div>
            ) : null}
            <h1 className="text-3xl font-bold text-slate-900 text-center">
                {s?.store_name || "Welcome"}
            </h1>
            <p className="mt-3 text-center text-slate-600">
                {s?.store_description || ""}
            </p>
        </main>
    );
}
