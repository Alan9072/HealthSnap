import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const ProductDetails = () => {
  const { id } = useParams(); // Get the barcode from the URL
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        );
        const data = await response.json();

        if (data.status === 1) {
          setProductDetails(data.product); // Product details fetched successfully
        } else {
          setError(true); // No product found for the scanned barcode
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}><Loading height={80} width={80} loop={true} autoplay={true}/></div>;
  }

  if (error) {
    return <div className={styles.error}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
                Back
        </button>
        Product not found!: {id}
        </div>;
  }

  return (
    <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
                Back
        </button>

      <h1 className={styles.title}>{productDetails.product_name}</h1>
      <p><strong>Barcode:</strong>{id}</p>
      <p><strong>Brand:</strong> {productDetails.brands || "N/A"}</p>
      <p><strong>Ingredients:</strong> {productDetails.ingredients_text || "N/A"}</p>
      <p><strong>Categories:</strong> {productDetails.categories || "N/A"}</p>
      <p><strong>Packaging:</strong> {productDetails.packaging || "N/A"}</p>
      <p><strong>Quantity:</strong> {productDetails.quantity || "N/A"}</p>
    </div>
  );
};

export default ProductDetails;
