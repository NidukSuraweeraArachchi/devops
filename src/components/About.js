import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Shield, Users, ArrowRight } from 'lucide-react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Districts Covered', value: '25+' },
        { label: 'Happy Explorers', value: '10K+' },
        { label: 'Travel Partners', value: '150+' },
        { label: 'Years of Experience', value: '12' }
    ];

    const values = [
        {
            icon: <Heart className="w-6 h-6 text-red-500" />,
            title: "Passion for Travel",
            description: "We love Sri Lanka and want to show you its hidden gems beyond the guidebooks."
        },
        {
            icon: <Shield className="w-6 h-6 text-[#006994]" />,
            title: "Safe & Reliable",
            description: "Our vetted network of cab partners ensures your journey is safe and comfortable."
        },
        {
            icon: <Users className="w-6 h-6 text-[#E5A600]" />,
            title: "Native Knowledge",
            description: "Local insights from people who actually live and travel in these districts."
        }
    ];

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden rounded-3xl mb-20 mx-4">
                <img
                    src="https://images.unsplash.com/photo-1546708973-b339540b3162?auto=format&fit=crop&q=80"
                    alt="Sri Lanka Coast"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#006994]/60 backdrop-blur-[2px]" />
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                    >
                        OUR STORY
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/90 max-w-2xl mx-auto font-medium"
                    >
                        Empowering travelers to explore the pearl of the Indian Ocean with ease, local insight, and reliable transit.
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4">
                {/* Mission Statement */}
                <section className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
                    <div>
                        <span className="text-[#006994] font-black tracking-widest text-sm uppercase mb-4 block">WHO WE ARE</span>
                        <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                            Making Sri Lanka's Wonders <span className="text-[#006994]">Accessible</span> to Everyone.
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Ceylon Explorer started as a small community project in Kandy. We noticed that while tourists loved the island, navigating between districts and finding reliable local transport was a major pain point.
                            </p>
                            <p>
                                Today, we operate across the entire island, connecting thousands of travelers with the best attractions and trustworthy cab services, ensuring a seamless "Trip-to-Transport" experience.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mt-12">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="border-l-4 border-[#FFB800] pl-4">
                                    <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-bold uppercase tracking-tighter">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1549419130-918c50403310?auto=format&fit=crop&q=80" alt="Galle Fort" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-100 rounded-3xl -z-10 animate-pulse" />
                    </div>
                </section>

                {/* Values */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900">What Drives Us</h2>
                        <div className="w-24 h-2 bg-[#FFB800] mx-auto mt-4 rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {values.map((v, idx) => (
                            <div key={idx} className="p-10 bg-white rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group">
                                <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{v.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <Globe className="absolute -top-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to explore Ceylon?</h2>
                        <p className="text-white/60 mb-12 text-lg">Join thousands of travelers who trust Ceylon Explorer for their Sri Lankan adventures.</p>
                        <Button
                            variant="primary"
                            className="px-12 py-5 text-xl mx-auto"
                            onClick={() => navigate('/')}
                        >
                            Start Exploring <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
