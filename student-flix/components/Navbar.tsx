import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { use, useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import SearchButton from "./SearchButton";

const TOP_OFFSET = 66;

const Navbar = () => {
  const links = {
    Home: "/",
    "TV Shows": "/tv",
    Movies: "/movies",
    "New & Popular": "/new",
    "My List": "/list",
    "Browse by Languages": "/languages",
  };

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
            `}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {Object.entries(links).map(([label, link]) => (
            <NavbarItem
              key={`nav-${label.toLowerCase()}-btn`}
              label={label}
              link={link}
            />
          ))}
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            } transition`}
          />
          <MobileMenu visible={showMobileMenu} links={links} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <SearchButton />
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-slate.png" alt="pfp" />
            </div>
            <BsChevronDown
              className={`text-white ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } transition`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
