import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Brain, Clock, Users, Target, Star, Zap } from "lucide-react";

const PuzzlePrograms = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const programs = [
    {
      id: 1,
      title: "Elite Brain Training",
      subtitle: "Advanced Cognitive Enhancement",
      description: "Master complex puzzles with our intensive brain training program. Designed for serious puzzle enthusiasts who want to push their cognitive limits.",
      features: ["Advanced Logic Puzzles", "Memory Enhancement", "Pattern Recognition", "Speed Training"],
      duration: "12 weeks",
      level: "Advanced",
      iconName: "brain",
      image: "/api/placeholder/600/400",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Speed Puzzle Mastery",
      subtitle: "Lightning-Fast Problem Solving",
      description: "Develop lightning-fast puzzle-solving skills with timed challenges and competitive training modules.",
      features: ["Speed Challenges", "Time Management", "Quick Thinking", "Competitive Play"],
      duration: "8 weeks",
      level: "Intermediate",
      iconName: "zap",
      image: "/api/placeholder/600/400",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 3,
      title: "Mind Gym Fundamentals",
      subtitle: "Build Your Puzzle Foundation",
      description: "Perfect for beginners! Learn the fundamentals of puzzle solving with structured lessons and progressive difficulty.",
      features: ["Basic Techniques", "Foundation Building", "Progressive Learning", "Guided Practice"],
      duration: "6 weeks",
      level: "Beginner",
      iconName: "target",
      image: "/api/placeholder/600/400",
      color: "from-blue-600 to-indigo-500"
    },
    {
      id: 4,
      title: "Puzzle Community Challenge",
      subtitle: "Team-Based Brain Training",
      description: "Join our community challenges and solve puzzles together. Perfect for building teamwork and social puzzle-solving skills.",
      features: ["Team Challenges", "Community Events", "Social Learning", "Group Competitions"],
      duration: "Ongoing",
      level: "All Levels",
      iconName: "users",
      image: "/api/placeholder/600/400",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      title: "Premium Puzzle Academy",
      subtitle: "Exclusive Elite Training",
      description: "Our most comprehensive program with personalized coaching, exclusive puzzles, and advanced analytics.",
      features: ["Personal Coach", "Exclusive Content", "Advanced Analytics", "Priority Support"],
      duration: "16 weeks",
      level: "Premium",
      iconName: "star",
      image: "/api/placeholder/600/400",
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      brain: Brain,
      zap: Zap,
      target: Target,
      users: Users,
      star: Star
    };
    return icons[iconName] || Brain;
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % programs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [programs.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3B82F6,_transparent_70%)] opacity-10"></div>
      
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
            Elite Puzzle{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Training Programs
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your puzzle-solving abilities with our comprehensive training programs designed by puzzle masters.
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${programs[currentSlide].color} p-0.5 mb-6`}>
                      <div className="w-full h-full bg-gray-900 rounded-[11px] flex items-center justify-center">
                        {React.createElement(getIcon(programs[currentSlide].iconName), { className: "w-8 h-8 text-white" })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                        {programs[currentSlide].subtitle}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {programs[currentSlide].title}
                    </h3>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {programs[currentSlide].description}
                    </p>

                    {/* Program Features */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {programs[currentSlide].features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Program Info */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-gray-300 text-sm">{programs[currentSlide].duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-gray-300 text-sm">{programs[currentSlide].level}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-fit">
                      Start Training
                    </button>
                  </div>

                  {/* Image Side */}
                  <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${programs[currentSlide].color} opacity-20`}></div>
                    <div className="relative z-10 text-center">
                      {React.createElement(getIcon(programs[currentSlide].iconName), { className: "w-32 h-32 text-white/30 mx-auto mb-4" })}
                      <p className="text-white/50 text-sm">Image placeholder</p>
                      <p className="text-white/30 text-xs mt-2">You can add your puzzle images here</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

         
          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default PuzzlePrograms;
