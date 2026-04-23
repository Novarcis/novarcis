"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type NavItem = { id: string; label: string; type: "scroll" | "link" | "event"; href?: string };

const navItems: NavItem[] = [
  { id: "hero", label: "Inicio", type: "scroll" },
  { id: "problem", label: "Problema", type: "scroll" },
  { id: "services", label: "Servicios", type: "scroll" },
  { id: "why-us", label: "Nosotros", type: "scroll" },
  { id: "process", label: "Proceso", type: "scroll" },
  { id: "chat", label: "IA", type: "event" }
];

export function IslandNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [cursorNearNav, setCursorNearNav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      setIsVisible(true);
      setActiveSection("chat");
      return;
    }

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const hero = document.getElementById("hero");
          if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            setIsVisible(window.scrollY > heroBottom * 0.25);
          }

          const scrollItems = navItems.filter(i => i.type === "scroll");
          const scrollPosition = window.scrollY + window.innerHeight / 3;

          for (let i = scrollItems.length - 1; i >= 0; i--) {
            const section = document.getElementById(scrollItems[i].id);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(prev => prev !== scrollItems[i].id ? scrollItems[i].id : prev);
              break;
            }
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    let mouseTicking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (pathname !== "/") return;
      if (!mouseTicking) {
        window.requestAnimationFrame(() => {
          const triggerZone = 120;
          setCursorNearNav(prev => prev !== (e.clientY < triggerZone) ? (e.clientY < triggerZone) : prev);
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pathname]);

  const handleNavClick = (item: NavItem) => {
    if (item.type === "event" && item.id === "chat") {
      window.dispatchEvent(new Event("open-ai-chat"));
      return;
    }

    if (item.type === "link") {
      router.push(item.href!);
      return;
    }

    if (pathname !== "/") {
      router.push(`/#${item.id}`);
      return;
    }

    const element = document.getElementById(item.id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showNav = isVisible || cursorNearNav;

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex transition-all duration-500 ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "scale(1.5)"
        }}
      />

      <div
        className={`relative flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300 ${isHovered ? "bg-[#0D1117]/95" : "bg-[#0D1117]/80"
          }`}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(168,85,247,0.15)"
        }}
      >
        <button
          onClick={() => handleNavClick({ id: "hero", label: "Inicio", type: "scroll" })}
          className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-1 group"
        >
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src="/images/Logo-novarcis.webp"
            alt="Novarcis"
            width={28}
            height={28}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </button>

        <div className="w-px h-5 bg-linear-to-b from-transparent via-[#E8EDF5]/20 to-transparent" />

        {navItems.slice(1).map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${activeSection === item.id
              ? "text-[#E8EDF5]"
              : "text-[#E8EDF5]/50 hover:text-[#E8EDF5]/80"
              }`}
          >
            {activeSection === item.id && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(217,119,6,0.1) 100%)",
                  border: "1px solid rgba(168,85,247,0.3)"
                }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
          className="relative ml-1 px-4 py-1.5 text-xs font-semibold rounded-full overflow-hidden group"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.8) 0%, rgba(217,119,6,0.6) 100%)"
          }}
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 text-white">Chatear IA</span>
        </button>
      </div>
    </nav>
  );
}