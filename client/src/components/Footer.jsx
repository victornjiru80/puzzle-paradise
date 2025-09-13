import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { Puzzle } from "lucide-react";
import { BsArrowUpCircle } from "react-icons/bs";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#", type: "scrollTop" },
    { name: "Puzzles", href: "puzzles", type: "scroll" },
    { name: "Features", href: "features", type: "scroll" },
    { name: "Contact", href: "contact", type: "scroll" },
  ];

  const puzzleTypes = [
    { name: "Kids Puzzles", href: "#" },
    { name: "Adult Puzzles", href: "#" },
    { name: "300 piece Puzzles", href: "#" },
    { name: "500 piece Puzzles", href: "#" },
    { name: "1000 piece Puzzles", href: "#" },
    
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
      color: "hover:bg-pink-600",
    },
    { name: "Twitter", icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
    { name: "YouTube", icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
    { name: "TikTok", icon: FaTiktok, href: "#", color: "hover:bg-slate-800" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (item) => {
    if (item.type === "scrollTop") {
      scrollToTop();
    } else if (item.type === "scroll") {
      const element = document.getElementById(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-zinc-900 pt-20 pb-5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3B82F6,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#06B6D4,_transparent_55%)] opacity-5"></div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 
                            p-0.5 transform rotate-3 transition-transform duration-300"
              >
                <div
                  className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center
                             transform -rotate-3 transition-transform duration-300"
                >
                  <Puzzle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Puzzle•Paradise</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Challenge your mind with thousands of brain-teasing puzzles. 
              Join our community and discover your next favorite puzzle adventure.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-lg ${social.color} bg-zinc-800/50 flex items-center justify-center
                            transition-colors duration-300`}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Puzzle Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Puzzle Types</h4>
            <ul className="space-y-3">
              {puzzleTypes.map((puzzle) => (
                <li key={puzzle.name}>
                  <a
                    href={puzzle.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {puzzle.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">support@puzzleparadise.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+254 712 435 904</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">123 Puzzle Street, Brain City</span>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Mon-Fri 9AM-6PM EAT</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2024 Puzzle Paradise. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
            >
              <BsArrowUpCircle className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;