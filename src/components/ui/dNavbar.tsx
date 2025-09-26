"use client";

type NavLinkProps = {
  onNavigate?: () => void;
};

export default function NavLink({ onNavigate }: NavLinkProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (onNavigate) onNavigate();
    }
  };

  return (
    <>
      <li>
        <button
          type="button"
          onClick={() => handleScroll("event")}
          className="underline underline-offset-[clamp(0.2rem,0.25vw,0.75rem)] text-gray-300 font-extrabold text-[clamp(0.7rem,1.1vw,5rem)] hover:text-gray-400 transition-colors duration-200"
        >
          Lihat Event
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => handleScroll("about")}
          className="underline underline-offset-[clamp(0.2rem,0.25vw,0.75rem)] text-gray-300 font-extrabold text-[clamp(0.7rem,1.1vw,5rem)] hover:text-gray-400 transition-colors duration-200"
        >
          About Us
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => handleScroll("faq")}
          className="underline underline-offset-[clamp(0.2rem,0.25vw,0.75rem)] text-gray-300 font-extrabold text-[clamp(0.7rem,1.1vw,5rem)] hover:text-gray-400 transition-colors duration-200"
        >
          FAQ
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            alert("coming soon");
            if (onNavigate) onNavigate();
          }}
          className="underline underline-offset-[clamp(0.2rem,0.25vw,0.75rem)] text-gray-300 font-extrabold text-[clamp(0.7rem,1.1vw,5rem)] hover:text-gray-400 transition-colors duration-200"
        >
          Daftarkan Event
        </button>
      </li>
    </>
  );
}
