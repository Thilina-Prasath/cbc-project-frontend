import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import SearchBar from "./SearchBar";
import { getCart } from "../utils/cart";
import {
  FiUser,
  FiHeart,
  FiX,
  FiChevronDown,
  FiArrowRight,
  FiLogIn,
  FiShoppingBag,
  FiCreditCard,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import axios from "axios";

const EASE = [0.22, 1, 0.36, 1];

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState(null);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  const headerShadow = useTransform(
    scrollY,
    [0, 40],
    ["0 1px 0 rgba(0,0,0,0.05)", "0 12px 35px rgba(0,0,0,0.08)"],
  );

  async function handleLogout() {
    try {
      await axiosInstance.post("/api/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  useEffect(() => {
    const cart = getCart();
    setCartCount(cart.reduce((sum, item) => sum + (item.qty || 0), 0));

    const handleStorage = (event) => {
      if (event.key === "cart") {
        const newCart = getCart();
        setCartCount(newCart.reduce((sum, item) => sum + (item.qty || 0), 0));
      }
    };

    window.addEventListener("storage", handleStorage);

    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          const raw =
            data?.firstName ||
            data?.name ||
            data?.fullName ||
            data?.user?.firstName ||
            data?.user?.name ||
            "";

          setUserName(raw.split(" ")[0] || "");
        })
        .catch(() => setUserName(""));
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }

    return () => window.removeEventListener("storage", handleStorage);
  }, [location]);

  const categoriesTree = [
    {
      main: "Men",
      icon: "👔",
      color: "#9b6b43",
      subs: ["T-Shirts", "Shirts", "Jeans", "Hoodies", "Jackets"],
    },
    {
      main: "Women",
      icon: "👗",
      color: "#9b6b43",
      subs: ["Dresses", "Tops", "Blouses", "Skirts", "Leggings"],
    },
    {
      main: "Footwear",
      icon: "👟",
      color: "#9b6b43",
      subs: ["Sneakers", "Boots", "Sandals", "Heels"],
    },
    {
      main: "Accessories",
      icon: "👜",
      color: "#9b6b43",
      subs: ["Bags", "Watches", "Sunglasses", "Jewelry"],
    },
  ];

  const avatarLetter = userName ? userName[0].toUpperCase() : "U";

  return (
    <>
      <motion.header
        style={{ boxShadow: headerShadow }}
        className="fixed top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-[120] rounded-2xl sm:rounded-[1.5rem] bg-white/90 backdrop-blur-xl border border-white/70"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            <motion.div
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer flex-shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-zinc-950 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg sm:text-xl">
                  S
                </span>
              </div>

              <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-950">
                Shop<span className="text-[#9b6b43]">nix</span>
              </span>
            </motion.div>

            <div className="hidden md:block flex-1 max-w-2xl">
              <SearchBar />
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <Link
                to="/wishlist"
                className="hidden lg:flex p-2.5 hover:bg-[#FAF7F2] rounded-xl transition text-zinc-500 hover:text-rose-500"
              >
                <FiHeart size={20} />
              </Link>

              <Link
                to="/cart"
                className="relative p-2 sm:p-2.5 hover:bg-[#FAF7F2] rounded-xl transition text-zinc-600 hover:text-[#9b6b43]"
              >
                <BsCart3 size={18} className="sm:w-5 sm:h-5" />

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-[#9b6b43] text-white text-[9px] sm:text-[10px] font-bold min-w-[1.1rem] sm:min-w-[1.2rem] h-4 sm:h-5 rounded-full flex items-center justify-center px-1"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <AnimatePresence mode="wait" initial={false}>
                {isLoggedIn ? (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="relative"
                    onMouseEnter={() => setUserMenuOpen(true)}
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <Link
                      to="/profile"
                      className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl hover:bg-[#FAF7F2] transition group"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-950 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                        {avatarLetter}
                      </div>

                      <div className="hidden md:block leading-tight">
                        <p className="text-[0.6rem] text-zinc-400 font-bold uppercase tracking-wider">
                          Account
                        </p>
                        <p className="text-sm font-black text-zinc-900 truncate max-w-[110px]">
                          {userName || "Profile"}
                        </p>
                      </div>
                    </Link>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: EASE }}
                          className="absolute right-0 top-full mt-2 sm:mt-3 w-52 sm:w-56 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-100 py-2 z-50"
                        >
                          {[
                            ["Profile", "/profile", <FiUser size={15} />],
                            ["Orders", "/orders", <FiShoppingBag size={15} />],
                            [
                              "Payments",
                              "/payment",
                              <FiCreditCard size={15} />,
                            ],
                          ].map(([label, to, icon]) => (
                            <Link
                              key={to}
                              to={to}
                              className="flex items-center gap-3 px-4 py-2.5 sm:py-3 text-sm font-semibold text-zinc-700 hover:bg-[#FAF7F2] transition"
                            >
                              <span className="text-[#9b6b43]">{icon}</span>
                              {label}
                            </Link>
                          ))}

                          <div className="h-px bg-zinc-100 my-2 mx-4" />

                          <button
                            onClick={() => {
                              handleLogout();
                              navigate("/login");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition"
                          >
                            <FiLogOut size={15} /> Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="guest"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                  >
                    <Link
                      to="/login"
                      className="hidden sm:flex items-center gap-2 bg-zinc-950 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-sm hover:bg-[#9b6b43] transition"
                    >
                      <FiLogIn size={16} />
                      Sign In
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setSideDrawerOpened(true)}
                className="md:hidden p-2 sm:p-2.5 hover:bg-[#FAF7F2] rounded-xl transition text-zinc-600"
              >
                <GiHamburgerMenu
                  size={20}
                  className="sm:w-[21px] sm:h-[21px]"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="fixed top-[4.5rem] sm:top-[5.25rem] left-2 right-2 sm:left-3 sm:right-3 z-[110] hidden md:block">
        <div className="max-w-7xl mx-auto rounded-[1.3rem] bg-white/90 backdrop-blur-xl border border-white/70 shadow-sm px-3 sm:px-4">
          <div className="flex items-center justify-between h-11 sm:h-12 text-sm">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {categoriesTree.map((cat) => (
                <div
                  key={cat.main}
                  className="relative"
                  onMouseEnter={() => setActiveHoverCategory(cat.main)}
                  onMouseLeave={() => setActiveHoverCategory(null)}
                >
                  <div
                    className={`flex items-center gap-1.5 px-3 sm:px-5 h-11 sm:h-12 cursor-pointer font-bold transition whitespace-nowrap ${
                      activeHoverCategory === cat.main
                        ? "text-[#9b6b43]"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.main}
                    <FiChevronDown
                      size={13}
                      className={`transition-transform ${
                        activeHoverCategory === cat.main ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {activeHoverCategory === cat.main && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className="absolute top-full left-0 mt-2 w-56 sm:w-60 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-100 p-2 z-50"
                      >
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 mb-1 rounded-xl sm:rounded-2xl bg-[#FAF7F2]">
                          <span>{cat.icon}</span>

                          <span className="text-xs font-black uppercase tracking-widest text-[#9b6b43]">
                            {cat.main}
                          </span>

                          <Link
                            to={`/products?category=${cat.main}`}
                            className="ml-auto text-xs font-black flex items-center gap-1 text-[#9b6b43]"
                          >
                            All <FiArrowRight size={11} />
                          </Link>
                        </div>

                        {cat.subs.map((sub) => (
                          <Link
                            key={sub}
                            to={`/products?category=${cat.main}&subCategory=${sub}`}
                            className="block px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium text-zinc-600 hover:bg-[#FAF7F2] hover:text-zinc-950 rounded-xl sm:rounded-2xl transition"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="hidden lg:flex items-center gap-2 text-sm font-black text-[#9b6b43] hover:text-zinc-950 transition shrink-0"
            >
              Explore All
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <div className="h-20 sm:h-24 md:h-40" />

      <AnimatePresence>
        {sideDrawerOpened && (
          <div className="fixed inset-0 z-[200] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSideDrawerOpened(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="absolute left-0 top-0 h-full w-[85vw] max-w-[360px] bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 sm:px-5 h-14 sm:h-16 border-b border-zinc-100">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-950">
                  Shop<span className="text-[#9b6b43]">nix</span>
                </span>

                <button
                  onClick={() => setSideDrawerOpened(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] hover:bg-zinc-200 flex items-center justify-center transition"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="p-3 sm:p-4 border-b border-zinc-100 bg-[#FAF7F2]">
                <div className="mb-3 sm:mb-4">
                  <SearchBar />
                </div>

                {isLoggedIn ? (
                  <Link
                    to="/profile"
                    onClick={() => setSideDrawerOpened(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-950 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {avatarLetter}
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-400">
                        Welcome back
                      </p>
                      <p className="font-black text-zinc-900 text-sm sm:text-base">
                        {userName || "My Account"}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setSideDrawerOpened(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-zinc-300 flex items-center justify-center">
                      <FiLogIn size={18} className="text-zinc-400" />
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-400">
                        Welcome
                      </p>
                      <p className="font-black text-zinc-900 text-sm sm:text-base">
                        Sign In / Register
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                <p className="uppercase text-[10px] font-black text-zinc-400 tracking-[3px] px-2 mb-2 sm:mb-3">
                  Categories
                </p>

                {categoriesTree.map((cat) => (
                  <div
                    key={cat.main}
                    className="rounded-xl sm:rounded-2xl border border-zinc-100 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedMobileCat(
                          expandedMobileCat === cat.main ? null : cat.main,
                        )
                      }
                      className="w-full flex justify-between items-center px-3.5 sm:px-4 py-3 sm:py-3.5 text-left hover:bg-[#FAF7F2] transition"
                    >
                      <span className="flex items-center gap-2.5 sm:gap-3 text-sm font-bold text-zinc-800">
                        <span>{cat.icon}</span> {cat.main}
                      </span>

                      <FiChevronDown
                        size={15}
                        className={`text-zinc-400 transition-transform ${
                          expandedMobileCat === cat.main ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedMobileCat === cat.main && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className="overflow-hidden bg-[#FAF7F2] border-t border-zinc-100"
                        >
                          <div className="px-3 py-2 space-y-1">
                            <Link
                              to={`/products?category=${cat.main}`}
                              onClick={() => setSideDrawerOpened(false)}
                              className="block py-2 px-3.5 sm:px-4 text-sm font-bold text-[#9b6b43] rounded-xl hover:bg-white transition"
                            >
                              View All {cat.main}
                            </Link>

                            {cat.subs.map((sub) => (
                              <Link
                                key={sub}
                                to={`/products?category=${cat.main}&subCategory=${sub}`}
                                onClick={() => setSideDrawerOpened(false)}
                                className="block py-2 px-3.5 sm:px-4 text-sm text-zinc-500 hover:text-zinc-950 rounded-xl hover:bg-white transition"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="pt-3 sm:pt-4 space-y-2">
                  <Link
                    to="/wishlist"
                    onClick={() => setSideDrawerOpened(false)}
                    className="flex items-center gap-3 px-3.5 sm:px-4 py-3 rounded-xl sm:rounded-2xl bg-[#FAF7F2] font-bold text-zinc-700 text-sm"
                  >
                    <FiHeart /> Wishlist
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setSideDrawerOpened(false)}
                    className="flex items-center gap-3 px-3.5 sm:px-4 py-3 rounded-xl sm:rounded-2xl bg-zinc-950 text-white font-bold text-sm"
                  >
                    <BsCart3 /> Cart ({cartCount})
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
