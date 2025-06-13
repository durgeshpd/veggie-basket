import React from "react";

function ProductCard({ product, onAdd }) {
  return (
    <div className="card w-60 bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product.title}</h2>
        <p className="text-lg font-semibold">₹{product.price.toFixed(2)}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary" onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
