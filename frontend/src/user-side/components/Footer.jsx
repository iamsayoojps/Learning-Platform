import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const links = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Help and Support", path: "/support" },
    { name: "Terms", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Settings", path: "/cookies" },
  ];

  return (
    <footer className="bg-[#1c1d1f] text-gray-300 px-6 py-5">
      <div className="max-w-5xl mx-auto">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              aria-label={link.name}
              className="hover:text-white hover:underline transition duration-200 py-0.5"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="font-extrabold tracking-wide text-sm sm:text-base md:text-lg"
          >
            <span className="text-white">Level</span>
            <span className="text-orange-500">Up</span>
          </Link>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Facebook className="cursor-pointer hover:text-white transition" />
            <Twitter className="cursor-pointer hover:text-white transition" />
            <Instagram className="cursor-pointer hover:text-white transition" />
          </div>

          {/* Copyright */}
          <p className="text-gray-400">© {new Date().getFullYear()} LevelUp</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
