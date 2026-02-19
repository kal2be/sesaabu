import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Sesa from "@/assets/IMG-20260119-WA0000.png"
const departments = [
  "Biology", "Chemistry", "Computer Education", "Mathematics", 
  "Physics", "Statistics", "Zoology", "Geology"
];

const quickLinks = [
  { href: "/about", label: "About SESA" },
  { href: "/library", label: "Digital Library" },
  { href: "/newspapers", label: "Department News" },
  { href: "/events", label: "Events & Seminars" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center">
                <img src={Sesa} alt="sesa-logo" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">SESA</h3>
                <p className="text-sm text-primary-foreground/70">ABU Zaria</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6">
              Empowering Science Education through Knowledge, Research, and Innovation at Ahmadu Bello University, Zaria.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Departments Column */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Departments</h4>
            <ul className="space-y-2">
              {departments.slice(0, 6).map((dept) => (
                <li key={dept}>
                  <Link
                    to={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {dept} Education
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Faculty of Education, Ahmadu Bello University, Zaria, Kaduna State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:sesa@abu.edu.ng" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  sesa@abu.edu.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+234123456789" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  +234 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Science Education Students Association. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
