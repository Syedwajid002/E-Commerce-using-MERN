import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaGem,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaPrint,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 pt-10 border-t border-slate-700">
      {/* Top Social Bar */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-20 py-6 border-b border-slate-700">
        <div className="mb-4 lg:mb-0 text-center lg:text-left font-semibold text-lg">
          Connect with us:
        </div>
        <div className="flex gap-5 text-xl">
          {[
            FaFacebookF,
            FaTwitter,
            FaGoogle,
            FaInstagram,
            FaLinkedinIn,
            FaGithub,
          ].map((Icon, index) => (
            <a
              key={index}
              href="#"
              aria-label="Social Link"
              className="hover:text-yellow-400 transition duration-200"
            >
              <Icon />
            </a>
          ))}
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h6 className="uppercase font-bold mb-4 flex items-center gap-2 text-yellow-400">
              <FaGem className="text-lg" />
              Online Shop
            </h6>
            <p className="mb-2">Trusted and verified sellers.</p>
            <p>100% Guaranteed Products.</p>
          </div>

          {/* Links */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-yellow-400">
              Shop Categories
            </h6>
            <ul className="space-y-2">
              {[
                { label: "Men", path: "/Products/men" },
                { label: "Women", path: "/Products/women" },
                { label: "Accessories", path: "/Products/accessories" },
                { label: "Beauty", path: "/Products/beauty" },
                { label: "Electronics", path: "/Products/electronics" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="hover:text-yellow-400 transition duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-yellow-400">
              Registered Office
            </h6>
            <address className="not-italic text-sm leading-relaxed">
              X Towers, 1st Floor, 1st Cross
              <br />
              Kashibugga,
              <br />
              Warangal
              <br />
              Telangana,India
            </address>
          </div>

          {/* Contact */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-yellow-400">
              Contact
            </h6>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaHome className="text-yellow-400" />
                Warangal, India
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-400" />
                <a href="mailto:E-Store@gmail.com" className="hover:underline">
                  E-Store@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-yellow-400" />
                +91 7330786910
              </li>
              <li className="flex items-center gap-2">
                <FaPrint className="text-yellow-400" />
                +91 9908893623
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bg-slate-800 text-center text-gray-500 py-4 text-sm select-none">
        © 2025 <b>E-store.com</b> | Made with 💗 by Wajid
      </div>
    </footer>
  );
}

export default Footer;
