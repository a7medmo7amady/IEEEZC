import Link from "next/link";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Committees", href: "/committees" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Resource Library", href: "/resources" },
  { label: "Certificate Center", href: "/certificates" },
  { label: "Blog", href: "/blog" },
  { label: "Member Dashboard", href: "/dashboard" },
];

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },

];

export default function Footer() {
  return (
    <footer className="text-gray-300 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-ieee-blue flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-black tracking-tight">IEEE</span>
                </div>
                <div>
                  <p className="text-white text-lg font-bold leading-tight">IEEE Zewail City</p>
                  <p className="text-zc-gold text-sm font-medium">Student Branch</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Where Innovation Meets Execution. The technical heart of the City of Science and Technology.
              </p>
              {/* Socials */}
              <div className="flex items-center gap-3 mt-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg bg-ieee-blue flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-150"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-base font-bold mb-4">Resources</h3>
              <ul className="flex flex-col gap-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-10">
         <div>
              <h3 className="text-white text-base font-bold mb-4">Quick Links</h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-base font-bold mb-4">Contact Us</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-zc-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                  Zewail City, October Gardens, Giza, Egypt
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 shrink-0 text-zc-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ieee@zewailcity.edu.eg
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 shrink-0 text-zc-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +201023030415
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IEEE Zewail City Student Branch. All rights reserved.</p>
          <p>Powered by IEEE ZewailCity</p>
        </div>
      </div>
    </footer>
  );
}
