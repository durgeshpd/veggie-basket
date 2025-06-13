# 🥕 Veggie Basket - Bill Payment App

A delightful and interactive **vegetable shopping and billing app** built with **React**, **Tailwind CSS**, and **daisyUI**. Users can browse fresh vegetables, add them to a cart, and generate a beautiful bill with quantities and prices.

---

## 🔗 Live Project

➡️ Visit [Veggie Basket](https://veggie-basket.vercel.app/)

This will take you directly to the Veggie Basket application.

---

## 🚀 Features

- 🍅 Browse a variety of vegetable products from the [Open Food Facts API](https://world.openfoodfacts.org/)
- 🛒 Add items to cart with quantity updates
- 📄 Generate a bill modal with total pricing
- 🧾 Option to download or view the bill
- 🎨 Clean, responsive UI with animated feedback
- 💡 Optimized loading experience for slow APIs

---

## 📦 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + daisyUI
- **Icons**: React Icons
- **PDF Generation**: jsPDF (if implemented for download)
- **API**: [Open Food Facts](https://world.openfoodfacts.org/)

---

## ⚙️ Installation

```bash
git clone https://github.com/durgeshpd/veggie-basket.git
cd veggie-basket
npm install
npm run dev
```

🛠 Performance Optimizations

The API used in this project (Open Food Facts) sometimes responds slowly. To enhance user experience, the following optimizations were implemented:

✅ Lazy Loading

Components like Shimmer (skeleton loader) are lazy-loaded using React's lazy() and Suspense to improve initial load time.

```js
const Shimmer = lazy(() => import("../components/Shimmer"));
```
✅ Delayed API Fetch

Introduced a 300ms delay before making the API request to ensure shimmer UI is visible, giving users immediate visual feedback while data loads.

```js
const timeout = setTimeout(fetchProducts, 300);
```
✅ AbortController

Used AbortController to safely cancel API requests if the component unmounts, preventing memory leaks.

```js

const controller = new AbortController();
const signal = controller.signal;
```
✅ Lightweight Suspense Fallback

Custom-built shimmer UI as the fallback for Suspense using simple animated skeletons, avoiding blank screens during lazy loading.

📁 Folder Structure
```css
src/
├── components/
│   ├── ProductCard.jsx
│   ├── BillModal.jsx
│   └── Shimmer.jsx
├── pages/
│   └── VegetableShop.jsx
├── App.jsx
└── main.jsx
```

📬 Contact

Feel free to open an issue or submit a pull request if you have ideas or improvements.
