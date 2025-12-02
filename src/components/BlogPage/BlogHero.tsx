import React from 'react';

const BlogHero = () => {
    return (
        <div className="mb-10">
            <div className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
                style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP7wRSP6PNVQerc44qHCLRoYYd7gD0XXulRDkuPttKz8c2wm7R80QfOir0XcMWFKjBGgyJ5pcMWrIKbPt6SCgNWruICSXdJlao0ovxqmc5rLvSBMdY5X6oZLjHPx9qPTGkgNMIYnTzo9hXeQxzkwUbhDDc7WVvEd49h17mKa6w8QfB2EIEDD7W8XIG5RncWJ-n5n8nCSqHu4E6zkNP0BsMHsoIQz9Vpi8C5qNBL4Po-ca4mAAVTciZ-3q8TREYwunoIejOppPSO_k")' }}
            >
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-6xl">
                        The Content Solution Blog
                    </h1>
                    <h2 className="text-slate-200 text-base font-normal leading-normal sm:text-lg max-w-2xl">
                        Expert insights, trends, and strategies in content marketing for Nepali businesses.
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default BlogHero;
