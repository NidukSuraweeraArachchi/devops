import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Shield, Users, ArrowRight, MapPin, Star, Zap } from 'lucide-react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Districts Covered', value: '25+', icon: <MapPin className="w-5 h-5" /> },
        { label: 'Happy Explorers', value: '10K+', icon: <Users className="w-5 h-5" /> },
        { label: 'Travel Partners', value: '150+', icon: <Star className="w-5 h-5" /> },
        { label: 'Years of Experience', value: '12', icon: <Zap className="w-5 h-5" /> }
    ];

    const values = [
        {
            icon: <Heart className="w-7 h-7 text-rose-500" />,
            title: "Passion for Travel",
            description: "We love Sri Lanka and want to show you its hidden gems beyond the guidebooks.",
            gradient: "from-rose-500/10 to-pink-500/10"
        },
        {
            icon: <Shield className="w-7 h-7 text-primary" />,
            title: "Safe & Reliable",
            description: "Our vetted network of cab partners ensures your journey is safe and comfortable.",
            gradient: "from-cyan-500/10 to-blue-500/10"
        },
        {
            icon: <Users className="w-7 h-7 text-amber-500" />,
            title: "Native Knowledge",
            description: "Local insights from people who actually live and travel in these districts.",
            gradient: "from-amber-500/10 to-orange-500/10"
        }
    ];

    const teamImages = [
        "https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1590123874657-cd1d7a5f8d6c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1586166898420-82c4c73b8df0?auto=format&fit=crop&w=600&q=80"
    ];

    return (
        <div className="pt-24 pb-20 overflow-hidden">
            {/* Hero Section with Parallax Effect */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-[2.5rem] mb-24 mx-4">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=1920&q=80"
                        alt="Sri Lanka Sigiriya"
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Floating decorative elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/30 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-bold mb-8 border border-white/20"
                    >
                        <Globe className="w-4 h-4" />
                        DISCOVER OUR JOURNEY
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-none"
                    >
                        OUR <span className="text-secondary">STORY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Empowering travelers to explore the pearl of the Indian Ocean with ease, local insight, and reliable transit.
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4">
                {/* Mission Statement with Image Gallery */}
                <section className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black tracking-widest text-xs uppercase mb-6">
                            <Heart className="w-3 h-3" /> WHO WE ARE
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                            Making Sri Lanka's Wonders{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                                Accessible
                            </span>{' '}
                            to Everyone.
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Ceylon Explorer started as a small community project in Kandy. We noticed that while tourists loved the island, navigating between districts and finding reliable local transport was a major pain point.
                            </p>
                            <p>
                                Today, we operate across the entire island, connecting thousands of travelers with the best attractions and trustworthy cab services, ensuring a seamless "Trip-to-Transport" experience.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        src={teamImages[0]}
                                        alt="Sigiriya Rock"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        src={teamImages[1]}
                                        alt="Galle Fort"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="pt-8">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        src={teamImages[2]}
                                        alt="Kandy Temple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-secondary/30 to-orange-200/30 rounded-full -z-10 blur-2xl" />
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-cyan-200/30 rounded-full -z-10 blur-2xl" />
                    </motion.div>
                </section>

                {/* Values Section */}
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary-dark font-black tracking-widest text-xs uppercase mb-6">
                            <Star className="w-3 h-3" /> OUR VALUES
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">What Drives Us</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Every journey tells a story. We're here to make yours unforgettable.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((v, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className={`relative p-10 bg-gradient-to-br ${v.gradient} rounded-[2rem] border border-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        {v.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{v.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{v.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden"
                >
                    {/* Background decorations */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
                    </div>
                    <Globe className="absolute -top-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                    <Globe className="absolute -bottom-10 -left-10 w-48 h-48 text-white/5 -rotate-12" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-bold mb-8 border border-white/20"
                        >
                            <MapPin className="w-4 h-4" />
                            START YOUR ADVENTURE TODAY
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                            Ready to explore{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">
                                Ceylon
                            </span>?
                        </h2>
                        <p className="text-white/60 mb-12 text-xl leading-relaxed max-w-xl mx-auto">
                            Join thousands of travelers who trust Ceylon Explorer for their Sri Lankan adventures.
                        </p>
                        <Button
                            variant="primary"
                            className="px-12 py-5 text-xl mx-auto bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary-dark hover:to-orange-600 text-black font-black shadow-2xl shadow-secondary/30"
                            onClick={() => navigate('/')}
                        >
                            Start Exploring <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default About;
