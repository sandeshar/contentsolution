import CTAButton from '../shared/CTAButton';
import StarIcon from '../shared/StarIcon';

interface AboutHeroData {
    id: number;
    title: string;
    description: string;
    button1_text: string;
    button1_link: string;
    button2_text: string;
    button2_link: string;
    background_image?: string;
    hero_image: string;
    hero_image_alt: string;
    badge_text?: string;
    highlight_text?: string;
    rating_text?: string;
    is_active: number;
    updatedAt: Date;
}

interface AboutHeroProps {
    data?: AboutHeroData | null;
}

const AboutHero = ({ data }: AboutHeroProps) => {
    if (!data) {
        return null;
    }

    const AvatarList = () => (
        <div className="flex -space-x-3" aria-hidden>
            <img alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSpy53nmHtxtTkompr0U5wlwZWFYZJDNk7GjA9-O4iOv-ZHJVFbDnl-mqCCH9pSUgCt9XZ9XehLTovbWeKhFYgRTXQsEQRSGPj9AJR1_Wqf5gpDjXJPIuVRgTF-IBr80s6VWteFE7PKAWIWi5hohaN1scKGzMdIMR3VrStzut8iDvo2xhclYGoZ1l4BsjTjNoyI6tL7bt5H2xndCMAGbAqMwM67RMjOTnPCXweriKLSl2B-DzCe2o3OovgtBIGjNyNKNUHk5NKD0c" />
            <img alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lNGQE5AKH2jT1ixjd-ecIaNsPRHmBRqHXINCkZDvh8OETJRHbo7SLVoP6tgDx2H4kIUob2tbjbwp46kUFvPbY3znIBSfrg69LxtPAV4LTTXY4TrynMnDRFNASV6ZfUnV8hh6vLDS8uvMhEDB32QvXRkZae_jT0vFGiSm38YisYluh3YIMtR2WFFGzu2juHXagKk4Z-LZGYEFL-kKix5yajEMp1vCJuwcekVhj12MBPSTUdz9eq6YUylBsza99eBeGkNY1rje6go" />
            <img alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkWe0Z-JjmmalmerCPJhKs-S5DcjpJbQ9cmhlotohozR3NZcFr9FUkWlccHJ8bQkbuzctReniOawWvgwBLRGR7Q-ek5wHeOPwHId1pE2QfeBAGVkyOrUb9h9CkFcjiJ1GRjgSasbwJ91W8FnFyFjs3Sd-kP0PCrXS0fdzJi8-Q3IRfsz8DiRi16ShJtqty0brtTGfvN6OJOryQ9xPTkoXiJM0oXodu2OLe4glzX1K0cG2sYYoSzqBs12KRaJtANov31VSwmevZ-yU" />
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-slate-100 text-xs font-bold text-slate-600">+2k</div>
        </div>
    );

    return (
        <section className="relative w-full h-[calc(100vh-80px)] flex items-center overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center justify-items-center lg:justify-items-stretch">
                    <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left z-10">
                        {data.badge_text && (
                            <div className="flex justify-center lg:justify-start">
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 backdrop-blur-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-sm font-medium text-slate-600">{data.badge_text}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-6">
                            <h1 className="text-slate-900 text-3xl font-black leading-[1.05] tracking-[-0.033em] md:text-4xl lg:text-5xl xl:text-6xl">
                                {data.title.split('\n').map((line, i) => {
                                    const hl = (data.highlight_text || '').trim();
                                    if (hl) {
                                        const idx = line.indexOf(hl);
                                        if (idx === -1) return <span key={i} className="block">{line}</span>;
                                        return (
                                            <span key={i} className="block">
                                                {line.substring(0, idx)}
                                                <span className="relative whitespace-nowrap">
                                                    <span className="relative z-10 bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-600 to-indigo-600">{hl}</span>
                                                </span>
                                                {line.substring(idx + hl.length)}
                                            </span>
                                        );
                                    }

                                    // Default two-color behavior: color the last word
                                    const trimmed = line.trim();
                                    const parts = trimmed.split(' ');
                                    if (parts.length === 1) {
                                        return <span key={i} className="block">{trimmed}</span>;
                                    }
                                    const last = parts.pop();
                                    const first = parts.join(' ');
                                    return (
                                        <span key={i} className="block">
                                            {first} <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-600 to-indigo-600">{last}</span>
                                        </span>
                                    );
                                })}
                            </h1>
                            <p className="text-slate-600 text-sm font-normal leading-relaxed md:text-base xl:text-lg max-w-2xl mx-auto lg:mx-0">{data.description}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href={data.button1_link || '#'} aria-label={data.button1_text}>
                                <CTAButton text={data.button1_text} variant="primary" className="rounded-xl h-10 md:h-12 px-4 md:px-6 xl:h-14 xl:px-8 shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300" />
                            </a>
                            {data.button2_text && (
                                <a href={data.button2_link || '#'} aria-label={data.button2_text}>
                                    <CTAButton text={data.button2_text} variant="secondary" className="rounded-xl h-10 md:h-12 px-4 md:px-6 xl:h-14 xl:px-8" />
                                </a>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4 border-t border-slate-100 mt-2">
                            <AvatarList />
                            <div className="flex flex-col items-center sm:items-start gap-1">
                                <div className="flex text-yellow-400" aria-hidden>
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">{data.rating_text || 'Trusted by modern teams'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative lg:pl-10 mt-6 lg:mt-0 w-full">
                        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[560px] xl:h-[72vh] overflow-hidden rounded-2xl bg-white shadow-2xl border-4 border-white group transform transition-transform hover:scale-[1.01] duration-500">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${data.background_image || data.hero_image}")` }} role="img" aria-label={data.hero_image_alt || 'About hero image'}></div>
                            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-700 animate-pulse"></div>
                            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl group-hover:bg-blue-400/30 transition-all duration-700 animate-pulse delay-700"></div>
                            <div className="relative h-full w-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${data.background_image || data.hero_image}")` }} />

                            <div className="absolute -left-4 bottom-20 z-20 hidden md:block">
                                <div className="flex items-center gap-4 rounded-xl bg-white/90 p-4 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 border border-white/20">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                                        <span className="material-symbols-outlined">trending_up</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Traffic Growth</p>
                                        <p className="text-xl font-black text-slate-900">+145%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-4 top-10 z-20 hidden md:block">
                                <div className="flex items-center gap-4 rounded-xl bg-white/90 p-4 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 border border-white/20">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                                        <span className="material-symbols-outlined">article</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Content Pieces</p>
                                        <p className="text-xl font-black text-slate-900">5k+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
