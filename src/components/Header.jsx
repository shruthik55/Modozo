import logo from '../assets/logo-new.png';

const Header = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Workflow Challenges", href: "#challenges" },
    { name: "Solution", href: "#solution" },
    { name: "Workflow", href: "#workflow" },
    { name: "Stakeholders", href: "#stakeholders" },
    { name: "Impact", href: "#impact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full px-6 md:px-8 py-3 md:py-4 bg-brand-bg-blue/90 backdrop-blur-md z-50 flex items-center justify-between border-b border-black/5">
      {/* Left: Logo */}
      <div className="w-1/4 flex justify-start items-center h-8 cursor-pointer">
        <img 
          src={logo} 
          alt="Modozo" 
          className="h-10 md:h-12 w-auto object-contain"
        />
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-800 font-medium text-sm xl:text-[15px] hover:text-[#e6b800] relative group transition-colors duration-300"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* Right: CTA Button */}
      <div className="hidden lg:flex w-1/4 justify-end items-center">
        <button className="bg-brand-navy text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#FFD700] hover:text-brand-navy hover:shadow-md transition-all duration-300">
          Book a Demo
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden flex justify-end flex-1">
        <button className="text-brand-navy hover:text-[#FFD700] transition-colors p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
