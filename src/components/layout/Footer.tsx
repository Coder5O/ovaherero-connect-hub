import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-earth text-earth-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="text-gold-foreground font-display font-bold text-xl">
                  O
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-lg">Ovaherero</p>
                <p className="text-sm text-earth-foreground/70">
                  Traditional Authority
                </p>
              </div>
            </div>
            <p className="text-sm text-earth-foreground/80 leading-relaxed">
              Preserving our heritage, uniting our people, and building a
              prosperous future for the Ovaherero nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", path: "/about" },
                { label: "Events", path: "/events" },
                { label: "Contributions", path: "/contributions" },
                { label: "Membership", path: "/membership" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-earth-foreground/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-earth-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 text-gold" />
                <span>Windhoek, Namibia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-earth-foreground/80">
                <Phone className="w-4 h-4 text-gold" />
                <span>+264 61 XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-earth-foreground/80">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@ovaherero.org.na</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Office Hours
            </h4>
            <ul className="space-y-2 text-sm text-earth-foreground/80">
              <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-earth-foreground/20">
          <p className="text-center text-sm text-earth-foreground/60">
            © {new Date().getFullYear()} Ovaherero Traditional Authority. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
