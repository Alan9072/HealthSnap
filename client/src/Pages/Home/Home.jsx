import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { IoSearchOutline } from "react-icons/io5";
import Loading from '../../components/Loading/Loading';


function Home() {
  const [categories, setCategories] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndFoods = async () => {
      try {
        // Fetching the list of categories
        const categoryResponse = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );

        const fetchedCategories = categoryResponse.data.categories.slice(0, 5); // Limit to 5 categories for simplicity

        // Fetching meals for each category
        const categoryPromises = fetchedCategories.map((category) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
        );

        const categoryMealsResponses = await Promise.all(categoryPromises);

        // Combining categories with their corresponding meals
        const categoriesWithMeals = fetchedCategories.map((category, index) => ({
          name: category.strCategory,
          meals: categoryMealsResponses[index].data.meals.slice(0, 5), // Limit to 5 meals per category
        }));

        setCategories(categoriesWithMeals);
      } catch (error) {
        console.error('Error fetching categories and foods:', error);
      }
      setLoading(false);
    };

    fetchCategoriesAndFoods();
  }, []);

  return (
    <div className={styles.homeDiv}>
      <div className={styles.productTitle}>
        <p>Foods By Categories</p>
        <form className={styles.searchBar}>
          <input type="text" placeholder="Search categories or foods" />
          <IoSearchOutline className={styles.searchIcon} />
        </form>
      </div>
      <div className={styles.homeContent}>
        { loading === true ? <div className={styles.loadingDiv}><Loading height={80} width={80} loop={true} autoplay={true}/></div> : 
        categories.map((category) => (
          <div key={category.name} className={styles.category1}>
            <p>{category.name}</p>
            <div className={styles.list}>
              {category.meals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className={styles.product}
                  style={{
                    backgroundImage: `url(${meal.strMealThumb || 'https://via.placeholder.com/150'})`,
                  }}
                >
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
