import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { calculateNutriScore ,renderNutrientInfo } from "./Logic";
import { Link } from "react-router-dom";
import NutriBox from "../../components/NutriBox/NutriBox";

const ProductDetails = () => {
  const { id } = useParams(); // Get the barcode from the URL
  const [searchParams] = useSearchParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [nutriVal, setNutriVal] = useState("A");

  const productNameFromQuery = searchParams.get("name") || "";

  useEffect(() => {
    const fetchProductDetails = async () => {
      console.log("Barcode:", id);
      try {
        if (productNameFromQuery.length > 0) {
          // Step 1: If product name is in the query, use it to search
          const res = await axios.post("http://localhost:3000/chat", {
            prompt: productNameFromQuery,
            barcode: id,
          });
          console.log("This one ", res.data.reply);
          const detailedProduct = res.data.reply;
          console.log("Detailed Product:", detailedProduct);
          setProductDetails(detailedProduct);
  
          const score = calculateNutriScore(detailedProduct.nutritional_info);
          setNutriVal(score); // Update Nutri-Score here
          console.log("NutriScore", score);
          setLoading(false);
          return;
        } else {
          // Step 2: If no product name in the query, check the database
          console.log("Product name from query is empty. Checking the database...");
  
          const dbResponse = await axios.get(`http://localhost:3000/products/${id}`);
          console.log("Response from /products API:", dbResponse);
          // console.log("Response from /products API:", dbResponse);
  
          if (dbResponse.data !== "Empty") {
            // Product found in the database
            console.log("Product found in database:", dbResponse.data);
            const detailedProduct = dbResponse.data;  // Assuming the response contains the product data
  
            // Set the product details from the database
            setProductDetails(detailedProduct);
  
            // Calculate Nutri-Score from the database details
            const score = calculateNutriScore(detailedProduct.nutritional_info);
            setNutriVal(score);
            console.log("NutriScore:", score);
          } else {
            // Step 3: If not found in the database, fetch from OpenFoodFacts
            console.log("Product not found in the database. Fetching from OpenFoodFacts API");
            const response = await fetch(
              `https://world.openfoodfacts.org/api/v0/product/${id}.json`
            );
            const data = await response.json();
            console.log(data);
  
            if (data.product && data.product.product_name.length > 0) {
              const prodId =
                data.product.product_name + (data.product.brands.length > 0 ? data.product.brands : "");
  
              // Fetch detailed product data from the custom API
              console.log(prodId);
              const res = await axios.post("http://localhost:3000/chat", {
                prompt: prodId,
                barcode: id,
              });
              console.log("This one ", res.data.reply);
              const detailedProduct = res.data.reply;
              console.log("Detailed Product:", detailedProduct);
              setProductDetails(detailedProduct);
  
              const score = calculateNutriScore(detailedProduct.nutritional_info);
              setNutriVal(score); // Update Nutri-Score here
              console.log("NutriScore", score);
            } else {
              setError(true); // No product found for the scanned barcode
            }
          }
        }
        
        ////////// 1 sec delay //////////////////////////////////////
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
  
        return () => clearTimeout(timer);
      } catch (err) {
        setError(true);
      } 
    };
  
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loading height={80} width={80} loop={true} autoplay={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <button className={styles.backButton} onClick={() => navigate("/scan")}>
          Back
        </button>
        Product not found!: {id}
      </div>
    );
  }

  

  // Ensure ingredients is always an array
  const ingredientsArray =
    Array.isArray(productDetails.ingredients) && productDetails.ingredients.length
      ? productDetails.ingredients
      : productDetails.ingredients?.split(", ") || [];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <div className={styles.mainInfo}>
        <h1 className={styles.maintitle}>{productDetails.product_name}</h1>
        <p className={styles.info}><strong>Barcode:</strong> {id}</p>
        <p className={styles.info}><strong>Brand:</strong> {productDetails.brand || "N/A"}</p>
        <p className={styles.info}><strong>Category:</strong> {productDetails.category || "N/A"}</p>
        <p className={styles.info}><strong>Description:</strong> {productDetails.description || "N/A"}</p>
        <p className={styles.info}>
          <strong>Ingredients:</strong>
          {ingredientsArray.length > 0
            ? ingredientsArray.join(", ")
            : "N/A"}
            <small style={{fontSize:"10px",color:"grey"}}> (approx)</small>
        </p>
        <p className={styles.info}><strong>Weight:</strong> {productDetails.weight || "N/A"}</p>
      </div>
      <div className={styles.nutriScoreDiv}>
        <Link to={`/nutriscore/${nutriVal}`} style={{textDecoration:"none"}}>
          <NutriBox val={nutriVal}/>
        </Link>
      </div>
      <div className={styles.nutriInfo}>
        <h2 className={styles.title}>Nutritional Information <span style={{fontSize:"12px",color:"grey"}}>(per 100g)</span></h2>
        <div className={styles.nutriInfoTable}>
          {renderNutrientInfo("Calories", productDetails.nutritional_info?.calories, "calories")}
          {renderNutrientInfo("Fat", productDetails.nutritional_info?.fat, "fat")}
          {renderNutrientInfo("Saturated Fat", productDetails.nutritional_info?.saturated_fat, "saturated_fat")}
          {renderNutrientInfo("Trans Fat", productDetails.nutritional_info?.trans_fat, "trans_fat")}
          {renderNutrientInfo("Carbohydrates", productDetails.nutritional_info?.carbohydrates, "carbohydrates")}
          {renderNutrientInfo("Sugar", productDetails.nutritional_info?.sugar, "sugar")}
          {renderNutrientInfo("Protein", productDetails.nutritional_info?.protein, "protein")}
          {renderNutrientInfo("Fiber", productDetails.nutritional_info?.fiber, "fiber")}
          {renderNutrientInfo("Cholesterol", productDetails.nutritional_info?.cholesterol, "cholesterol")}
          {renderNutrientInfo("Sodium", productDetails.nutritional_info?.sodium, "sodium")}
        </div>
      </div>
      <div className={styles.note}>
        <p className={styles.info4}>
          <IoMdInformationCircleOutline style={{fontSize:"24px"}}/> <i>The Ingredients and Nutritional Information are approximate and may vary.For accurate results, refer to the product packaging.</i>       
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
