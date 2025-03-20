import React, { useEffect, useState, useMemo, useCallback } from "react";

const categories = [
  "engine",
  "wheels",
  "exhaust",
  "brakes",
  "accessories",
  "tools",
  "turbocharger",
  "nos",
];

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCard = React.memo(({ product, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-green-500 font-bold mt-1">${product.price}</p>
      <p className="text-sm text-gray-600">Category: {product.category}</p>
      <button
        onClick={() => onEdit(product)}
        className="bg-yellow-500 text-white px-4 py-2 mt-2 w-full"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(product)}
        className="bg-red-500 text-white px-4 py-2 mt-2 w-full"
      >
        Delete
      </button>
    </div>
  );
});

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products and recycle bin on component mount
  useEffect(() => {
    fetchProducts();
    fetchRecycleBin();
  }, []);

  // Fetch products from the server
  const fetchProducts = useCallback(() => {
    fetch("http://localhost:3004/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Fetch recycle bin from the server
  const fetchRecycleBin = useCallback(() => {
    fetch("http://localhost:3004/recycleBin")
      .then((response) => response.json())
      .then((data) => setRecycleBin(data))
      .catch((error) => console.error("Error fetching recycle bin:", error));
  }, []);

  // Memoized filtered products based on selected category
  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  // Add a new product
  const handleAddProduct = useCallback(() => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields!");
      return;
    }

    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price) || 0,
      image: newProduct.image || "https://via.placeholder.com/150",
    };

    fetch("http://localhost:3004/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) => [...prevProducts, data]);
        setNewProduct({ name: "", price: "", image: "", category: "" });
      })
      .catch((error) => console.error("Error adding product:", error));
  }, [newProduct]);

  // Delete a product and move it to the recycle bin
  const handleDelete = useCallback((product) => {
    fetch(`http://localhost:3004/products/${product.id}`, { method: "DELETE" })
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
        fetch("http://localhost:3004/recycleBin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
          .then((response) => response.json())
          .then((data) => setRecycleBin((prevRecycleBin) => [...prevRecycleBin, data]))
          .catch((error) => console.error("Error moving to recycle bin:", error));
      })
      .catch((error) => console.error("Error deleting product:", error));
  }, []);

  // Edit a product
  const handleEdit = useCallback((product) => {
    setEditProduct(product);
    setNewProduct(product);
  }, []);

  // Update a product
  const handleUpdateProduct = useCallback(() => {
    if (!editProduct) return;

    fetch(`http://localhost:3004/products/${editProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === editProduct.id ? data : p))
        );
        setEditProduct(null);
        setNewProduct({ name: "", price: "", image: "", category: "" });
      })
      .catch((error) => console.error("Error updating product:", error));
  }, [editProduct, newProduct]);

  // Restore a product from the recycle bin
  const handleRestore = useCallback((product) => {
    fetch(`http://localhost:3004/recycleBin/${product.id}`, { method: "DELETE" })
      .then(() => {
        setRecycleBin((prevRecycleBin) => prevRecycleBin.filter((p) => p.id !== product.id));
        fetch("http://localhost:3004/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
          .then((response) => response.json())
          .then((data) => setProducts((prevProducts) => [...prevProducts, data]))
          .catch((error) => console.error("Error restoring product:", error));
      })
      .catch((error) => console.error("Error removing from recycle bin:", error));
  }, []);

  // Permanently delete a product from the recycle bin
  const handlePermanentDelete = useCallback((productId) => {
    fetch(`http://localhost:3004/recycleBin/${productId}`, { method: "DELETE" })
      .then(() => {
        setRecycleBin((prevRecycleBin) => prevRecycleBin.filter((p) => p.id !== productId));
      })
      .catch((error) => console.error("Error deleting product permanently:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 mr-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 mr-2"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="border p-2 mr-2"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <select
          className="border p-2 mr-2"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {editProduct ? (
          <button
            onClick={handleUpdateProduct}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2"
          >
            Add Product
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          className="border p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recycle Bin</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {recycleBin.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleRestore}
              onDelete={() => handlePermanentDelete(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;