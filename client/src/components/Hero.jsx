import React from "react";
import { motion } from "framer-motion";
import { Puzzle, Brain, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const stats = [
    { icon: Puzzle, label: "Puzzle Types", value: "50+" },
    { icon: Brain, label: "Brain Teasers", value: "1000+" },
    { icon: Trophy, label: "Challenges", value: "200+" },
    { icon: Users, label: "Puzzle Solvers", value: "10K+" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3B82F6,_transparent_50%)] opacity-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#06B6D4,_transparent_50%)] opacity-20"></div>
      
      {/* Animated jigsaw puzzle background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Assembled colorful jigsaw puzzle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15">
          <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              {/* Colorful gradients for puzzle pieces */}
              <linearGradient id="red" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <linearGradient id="pink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#DB2777" />
              </linearGradient>
              <linearGradient id="orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
            </defs>
            
            {/* Create assembled puzzle pieces with colors */}
            {[
              { x: 0, y: 0, color: "url(#red)" },
              { x: 80, y: 0, color: "url(#green)" },
              { x: 160, y: 0, color: "url(#yellow)" },
              { x: 240, y: 0, color: "url(#purple)" },
              { x: 320, y: 0, color: "url(#pink)" },
              { x: 0, y: 75, color: "url(#orange)" },
              { x: 80, y: 75, color: "url(#purple)" },
              { x: 160, y: 75, color: "url(#red)" },
              { x: 240, y: 75, color: "url(#green)" },
              { x: 320, y: 75, color: "url(#yellow)" },
              { x: 0, y: 150, color: "url(#green)" },
              { x: 80, y: 150, color: "url(#pink)" },
              { x: 160, y: 150, color: "url(#orange)" },
              { x: 240, y: 150, color: "url(#purple)" },
              { x: 320, y: 150, color: "url(#red)" },
              { x: 0, y: 225, color: "url(#yellow)" },
              { x: 80, y: 225, color: "url(#red)" },
              { x: 160, y: 225, color: "url(#green)" },
              { x: 240, y: 225, color: "url(#orange)" },
              // Missing piece spot - will be filled by falling piece
            ].map((piece, index) => (
              <g key={index} transform={`translate(${piece.x}, ${piece.y})`}>
                <path
                  d="M5,5 L75,5 Q78,5 78,8 L78,30 Q78,33 75,33 Q70,33 70,38 Q70,43 75,43 Q78,43 78,46 L78,70 Q78,73 75,73 L5,73 Q2,73 2,70 L2,46 Q2,43 5,43 Q10,43 10,38 Q10,33 5,33 Q2,33 2,30 L2,8 Q2,5 5,5 Z"
                  fill={piece.color}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
              </g>
            ))}
            
            {/* Empty spot for the falling piece */}
            <g transform="translate(320, 225)">
              <path
                d="M5,5 L75,5 Q78,5 78,8 L78,30 Q78,33 75,33 Q70,33 70,38 Q70,43 75,43 Q78,43 78,46 L78,70 Q78,73 75,73 L5,73 Q2,73 2,70 L2,46 Q2,43 5,43 Q10,43 10,38 Q10,33 5,33 Q2,33 2,30 L2,8 Q2,5 5,5 Z"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </g>
          </svg>
        </div>

        {/* Floating puzzle pieces around the main puzzle */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6 + i * 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 2) * 60}%`,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" className="text-blue-400">
              <path
                d="M3,3 L27,3 Q29,3 29,5 L29,15 Q29,17 27,17 Q24,17 24,20 Q24,23 27,23 Q29,23 29,25 L29,27 Q29,29 27,29 L3,29 Q1,29 1,27 L1,25 Q1,23 3,23 Q6,23 6,20 Q6,17 3,17 Q1,17 1,15 L1,5 Q1,3 3,3 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}

        {/* Main animated falling piece - final colorful piece */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ 
            transform: 'translate(-50%, -50%)',
            marginLeft: '118px',
            marginTop: '72.5px'
          }}
          initial={{ y: -400, rotate: -15, opacity: 0 }}
          animate={{ 
            y: [0, 0, -20, 0, -10, 0],
            rotate: [-15, 5, 0, 2, 0],
            opacity: [0, 1, 1, 1, 1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeOut",
            times: [0, 0.6, 0.7, 0.8, 0.9, 1]
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
            <defs>
              <linearGradient id="fallingPiece" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <path
              d="M5,5 L75,5 Q78,5 78,8 L78,30 Q78,33 75,33 Q70,33 70,38 Q70,43 75,43 Q78,43 78,46 L78,70 Q78,73 75,73 L5,73 Q2,73 2,70 L2,46 Q2,43 5,43 Q10,43 10,38 Q10,33 5,33 Q2,33 2,30 L2,8 Q2,5 5,5 Z"
              fill="url(#fallingPiece)"
              stroke="#1E40AF"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Glow effect for the falling piece */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ 
            transform: 'translate(-50%, -50%)',
            marginLeft: '118px',
            marginTop: '72.5px'
          }}
          initial={{ y: -400, opacity: 0 }}
          animate={{ 
            y: [0, 0, -20, 0, -10, 0],
            opacity: [0, 0.4, 0.6, 0.4, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeOut",
            times: [0, 0.6, 0.7, 0.8, 0.9, 1]
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg blur-xl opacity-40"></div>
        </motion.div>

        {/* Completion sparkle effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1, 1.1, 1],
            opacity: [0, 0, 0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            times: [0, 0.6, 0.7, 0.8, 1]
          }}
        >
          <div className="w-32 h-32 relative">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-60px)`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Puzzle Paradise
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Challenge your mind with thousands of brain-teasing puzzles, from classic jigsaw puzzles to mind-bending logic games. 
              Discover your next favorite puzzle and join our community of puzzle enthusiasts!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Puzzling Now
              </button>
              <button 
                onClick={() => navigate('/store')}
                className="px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Browse Puzzles
              </button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;