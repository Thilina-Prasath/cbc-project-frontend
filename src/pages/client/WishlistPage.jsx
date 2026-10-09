import axios from "axios";
import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ProductCard from "../../components/productCard";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { FiHeart, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";

// ── Luxury Animation Variants ─────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" },
  hover: {
    scale: 1.04,
    y: -12,
    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.8)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const float = {
  animate: {
    y: [0, -16, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%", transition: { duration: 0.8, ease: "easeInOut" } },
};

export default function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const headerRef = useRef(null);

  // ── Parallax scroll effects ─────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const headerBlur = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["blur(0px)", "blur(12px)"],
  );

  // ── Fetch data ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your wishlist.");
          return;
        }
        let url = `${import.meta.env.VITE_BACKEND_URL}/api/users/wishlist`;
        if (categoryParam)
          url += `?category=${encodeURIComponent(categoryParam)}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Failed to load your wishlist. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, [categoryParam]);

  // ── Filter & Sort ──────────────────────────────────────────────────────
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        [p.name, p.description, ...(p.altNames || [])].some((text) =>
          text?.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case "price-high":
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [products, searchQuery, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage,
  );
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  useEffect(() => setCurrentPage(1), [searchQuery, sortBy, categoryParam]);

  // ── Error State ─────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={float.animate}
            className="text-5xl sm:text-8xl mb-6 sm:mb-8 mx-auto w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center bg-white/5 rounded-2xl sm:rounded-3xl"
          >
            ♡
          </motion.div>
          <h2 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4">
            Access Denied
          </h2>
          <p className="text-zinc-400 mb-6 sm:mb-10 text-sm sm:text-base">
            {error}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="inline-block bg-white text-black px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Sidebar />

      {/* ── Cinematic Wishlist Hero ──────────────────────────────────────── */}
      <motion.section
        ref={headerRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/10"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:50px_50px]" />
        <motion.div
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-rose-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 60, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-[10px] sm:text-sm tracking-[2px] sm:tracking-[3px] border border-white/30 backdrop-blur-sm px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-white/5"
            >
              <FiHeart className="text-rose-400" /> CURATED COLLECTION
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-3 sm:mb-6"
            >
              My Wishlist
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-xl text-zinc-400 max-w-lg mx-auto"
            >
              The pieces that captured your heart. Ready when you are.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-500"
            >
              <span>{products.length} items saved</span>
              <span className="w-px h-5 sm:h-6 bg-white/20" />
              <span>Last updated {new Date().toLocaleDateString()}</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={float.animate}
          className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-[10px] sm:text-xs tracking-widest flex flex-col items-center"
        >
          SCROLL TO EXPLORE
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent mt-3 sm:mt-4" />
        </motion.div>
      </motion.section>

      {/* ── Sticky Controls ───────────────────────────────────────────────── */}
      <motion.div
        style={{ backdropFilter: headerBlur }}
        className="sticky top-16 sm:top-20 z-50 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/10 transition-all"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5 flex flex-col md:flex-row gap-3 sm:gap-4 md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <FiSearch
              className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search your wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/80 border border-white/10 focus:border-white/30 rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 text-sm placeholder:text-zinc-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                <FiX size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-none bg-zinc-900/80 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm focus:outline-none focus:border-white/30 transition-all"
            >
              <option value="newest">Recently Saved</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">A to Z</option>
            </select>

            {/* View toggle */}
            <div className="hidden sm:flex bg-zinc-900/80 rounded-2xl p-1 border border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode("grid")}
                className={`p-3.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white text-black" : "hover:bg-white/10"}`}
              >
                <FiGrid size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode("list")}
                className={`p-3.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white text-black" : "hover:bg-white/10"}`}
              >
                <FiList size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Product Grid ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-16 sm:pb-24 pt-5 sm:pt-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 sm:py-32"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/20 border-t-white rounded-full mb-5 sm:mb-8 shadow-lg shadow-white/5"
              />
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-zinc-400 tracking-[2px] text-xs sm:text-sm font-medium"
              >
                CURATING YOUR SAVED PIECES...
              </motion.p>
            </motion.div>
          ) : currentProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center py-16 sm:py-32 px-4"
            >
              <motion.div
                variants={fadeInScale}
                animate={float.animate}
                className="mx-auto w-24 h-24 sm:w-40 sm:h-40 rounded-2xl sm:rounded-3xl bg-zinc-900/50 flex items-center justify-center border border-white/10 mb-6 sm:mb-10"
              >
                <FiHeart className="text-5xl sm:text-8xl text-white/20" />
              </motion.div>
              <motion.h3
                variants={fadeInUp}
                className="text-3xl sm:text-5xl font-black mb-3 sm:mb-4 tracking-tight"
              >
                Wishlist is Empty
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-zinc-500 max-w-sm mx-auto mb-6 sm:mb-10 text-sm sm:text-base"
              >
                The things you love will appear here. Start saving beautiful
                pieces.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  to="/products"
                  className="inline-block bg-white text-black px-8 sm:px-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
                >
                  Discover Treasures
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8"
                  : "space-y-5 sm:space-y-10"
              }
            >
              {currentProducts.map((product, idx) => (
                <motion.div
                  key={product.productId || idx}
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  {/* Shimmer effect on hover */}
                  <motion.div
                    variants={shimmer}
                    initial="initial"
                    whileHover="animate"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent z-10"
                  />
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pagination ──────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-10 sm:mt-20 gap-2 sm:gap-3 flex-wrap"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all ${
                  currentPage === page
                    ? "bg-white text-black shadow-lg shadow-white/20"
                    : "bg-zinc-900 border border-white/10 hover:border-white/30"
                }`}
              >
                {page}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ── Footer count ────────────────────────────────────────────────── */}
        {!isLoading && currentProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-zinc-500 text-xs sm:text-sm mt-10 sm:mt-16 border-t border-white/10 pt-5 sm:pt-8"
          >
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + productsPerPage,
              filteredAndSortedProducts.length,
            )}{" "}
            of {filteredAndSortedProducts.length} items
          </motion.div>
        )}
      </div>
    </div>
  );
}
