import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Users, Trophy, Clock, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Mind Training",
      description: "Enhance cognitive abilities with scientifically designed puzzles that challenge different areas of your brain.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Challenge",
      description: "Jump into any puzzle instantly with our quick-start feature. No downloads, no waiting.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Community Puzzles",
      description: "Create and share puzzles with our global community. Solve puzzles made by fellow enthusiasts.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Unlock badges, climb leaderboards, and track your progress as you master different puzzle types.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Timed Challenges",
      description: "Test your speed with time-based puzzles and compete against players worldwide.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Access exclusive puzzle collections, advanced features, and ad-free experience.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="hidden sm:block py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#374151,_transparent_70%)] opacity-50"></div>
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Puzzle Paradise?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the features that make our puzzle platform the ultimate destination for brain training and entertainment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 h-full hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-gray-900 rounded-[11px] flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;