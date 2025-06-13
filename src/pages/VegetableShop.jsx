import { useEffect, useState, lazy, Suspense } from "react";
import ProductCard from "../components/ProductCard";
import BillModal from "../components/BillModal";
import { FaCarrot } from "react-icons/fa";

// ✅ Optimization: Lazy load Shimmer for better performance
const Shimmer = lazy(() => import("../components/Shimmer"));

function VegetableShop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=vegetables&fields=product_name,image_front_url,image_url&json=true&page_size=40",
          { signal }
        );
        const data = await res.json();

        const products = data.products
          .map((item, index) => ({
            id: index,
            title: item.product_name,
            price: +(Math.random() * 100 + 10).toFixed(2),
            image: item.image_front_url || item.image_url || "",
          }))
          .filter((item) => item.title && item.image);

        setProducts(products);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch products", err);
        }
      } finally {
        setLoading(false);
      }
    };

    // ✅ Optimization: Delayed fetch to allow shimmer to display smoothly
    const timeout = setTimeout(fetchProducts, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.title === product.title);
      if (existingItem) {
        return prevCart.map((item) =>
          item.title === product.title ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (title, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.title === title ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-emerald-100 p-4">
      <div className="text-center flex items-center justify-center gap-2 mb-6">
        <FaCarrot className="text-4xl text-orange-500 animate-bounce" />
        <h1 className="text-4xl font-bold text-green-800 drop-shadow-sm">
          Veggie Basket
        </h1>
      </div>

      <Suspense
        fallback={
          // ✅ Optimization: Lightweight fallback UI for shimmer
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-60 h-72 bg-white rounded-xl shadow-md p-4 animate-pulse flex flex-col gap-4"
              >
                <div className="bg-gray-300 h-36 w-full rounded-md"></div>
                <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                <div className="bg-gray-300 h-8 w-full rounded-md"></div>
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-wrap justify-center gap-4">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <Shimmer key={i} />)
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                />
              ))}
        </div>
      </Suspense>

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            className="btn btn-success btn-lg shadow-xl animate-pulse"
            onClick={() => setShowBill(true)}
          >
            View Bill ({cart.reduce((sum, item) => sum + item.qty, 0)})
          </button>
        </div>
      )}

      {showBill && (
        <BillModal
          cart={cart}
          onClose={() => setShowBill(false)}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
}

export default VegetableShop;
