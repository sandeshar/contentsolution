import CTAButton from '../shared/CTAButton';

const Hero = () => {
    return (
        <section className="@container py-16 sm:py-24">
            <div className="flex flex-col gap-10 @[960px]:flex-row @[960px]:items-center">
                <div className="flex flex-col gap-6 text-left @[960px]:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h1
                            className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                            Drive Real Business Growth Through Powerful Content
                        </h1>
                        <h2 className="text-slate-600 text-base font-normal leading-normal @[480px]:text-lg">
                            We craft content strategies that captivate your audience, boost your rankings, and convert readers
                            into loyal customers.
                        </h2>
                    </div>
                    <CTAButton text="Schedule a Free Consultation" variant="primary" className="w-fit" />
                </div>
                <div className="w-full @[960px]:w-1/2 bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    data-alt="Abstract gradient of blue and purple shapes representing creativity and strategy"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_ntBsh0ac8NNu4CDZ0OwptNX4TckC0Vk370Stu-5ncnvdbLPszfUWx1G4Vbyynsp7G1IukNqM2ARj6R242IPtABbGqsoHea3IRXWJjfZy8v0YwvghTSdy3UYS0ViJGsCxmB3Jua3jm3Nmz5ZA2yh5p70-qFmtfPdmvtc7WyY0gauc1eQ0Hc20w96-OEQp1WkX_IMlpkYEhv___4podpWVNeJtiFPjhpMwNu1nIMzW0bcH_-R-luLL4KVRpHNF93ktX31uFGTKMXk")' }}>
                </div>
            </div>
        </section>
    );
};

export default Hero;