import React from "react";
import styles from "./Suggestion.module.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
const data = {
    "Product": {
      "name": "Maggi Noodles",
      "brand": "Nestlé",
      "category": "Instant Noodles",
      "description": "Instant noodles with a signature masala flavor, ready in just 2 minutes."
    },
    "ultimate_recommendation": {
      "overall_suitability": {
        "status": "⚠️ Not Recommended",
        "reason": "High in sodium, refined flour, and additives, which may not be suitable for regular consumption."
      },
      "better_alternatives": {
        "status": "✅ Healthier Choices",
        "alternatives": [
          "Whole wheat noodles",
          "Brown rice noodles",
          "Zucchini noodles",
          "Homemade vegetable ramen"
        ],
        "note": "These provide more fiber, nutrients, and are lower in processed ingredients."
      },
      "if_you_still_want_to_consume": {
        "status": "👍 Moderation Advised",
        "recommendation": "Pair with vegetables, lean protein, and limit consumption to occasional indulgence."
      }
    },
    "health_analysis": {
      "concerns": {
        "sodium_content": {
          "status": "High",
          "reason": "Contains around 800mg of sodium per serving, which may contribute to high blood pressure."
        },
        "refined_flour": {
          "status": "Unhealthy",
          "reason": "Made primarily from refined flour (maida), which lacks fiber and nutrients."
        },
        "additives": {
          "status": "Contains Preservatives",
          "reason": "Includes flavor enhancers like MSG and artificial additives, which may not be suitable for sensitive individuals."
        }
      },
      "positives": {
        "quick_meal_option": {
          "status": "Convenient",
          "reason": "Easy to prepare and a quick meal choice when short on time."
        },
        "energy_boost": {
          "status": "Moderate",
          "reason": "Provides carbohydrates for instant energy but lacks essential nutrients."
        }
      }
    },
    "nutritional_analysis": {
      "calories": {
        "value": "350 kcal",
        "impact": "Moderate - Can be high when consumed with additional seasoning or oils."
      },
      "fat": {
        "value": "15g",
        "impact": "High - Contains saturated fats from processed oils."
      },
      "saturated_fat": {
        "value": "7g",
        "impact": "Moderate - Excessive consumption may impact heart health."
      },
      "trans_fat": {
        "value": "0.2g",
        "impact": "Minimal - But avoid excessive consumption."
      },
      "carbohydrates": {
        "value": "48g",
        "impact": "High - Mostly refined carbs with little fiber."
      },
      "sugar": {
        "value": "2g",
        "impact": "Low - Contains minor amounts from seasoning."
      },
      "protein": {
        "value": "7g",
        "impact": "Moderate - Provides some protein but lacks complete nutrition."
      },
      "fiber": {
        "value": "2g",
        "impact": "Low - Not a good source of dietary fiber."
      },
      "cholesterol": {
        "value": "0mg",
        "impact": "Good - No dietary cholesterol concerns."
      },
      "sodium": {
        "value": "800mg",
        "impact": "High - May contribute to high blood pressure if consumed regularly."
      }
    },
    "ingredient_analysis": {
      "refined_wheat_flour": {
        "status": "Unhealthy",
        "ingredients": ["Refined wheat flour (maida)"],
        "impact": "Lacks fiber and essential nutrients."
      },
      "palm_oil": {
        "status": "Moderate Concern",
        "ingredients": ["Palm oil"],
        "impact": "High in saturated fats, can contribute to heart health issues if consumed excessively."
      },
      "seasoning_mix": {
        "status": "Contains Additives",
        "ingredients": ["Salt", "Sugar", "Flavor enhancers (MSG)", "Spices"],
        "impact": "May contain artificial additives that some individuals may need to avoid."
      }
    }
  }
  
  

const Suggestion = () => {
  const colors = ["white", "rgb(80, 225, 80)"];
return (
    <div className={styles.suggestionBox}>
        <div className={styles.floatDiv}>
            <div className={styles.buttonDiv}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <IoChevronBackOutline size={24} color={"green"} />
                </button>
                <p>HS</p>
                <div className={styles.arrangeocr}>
                    <button className={styles.backButton} onClick={() => navigate("/")}>
                        <IoHomeOutline size={24} color={"green"} />
                    </button>
                </div>
            </div>
        </div>
        <h2 className={styles.title}>{data.Product.name}</h2>

        <p style={{fontSize:"smaller",paddingLeft:"10px",fontWeight:"500"}}><span>{"Brand : " +data.Product.brand }</span> <br/>
         <span>{"Category : "+data.Product.category}</span></p>
        {/* Ultimate Recommendation */}
        <section className={styles.final}>
            <p className={styles.finalRec}>
                <strong>
                    {data.ultimate_recommendation.overall_suitability.status}
                </strong>
                : {data.ultimate_recommendation.overall_suitability.reason}
            </p>
            <p className={styles.alternate}>
                <strong>
                    {data.ultimate_recommendation.better_alternatives.status}
                </strong>
                :{" "}
                {data.ultimate_recommendation.better_alternatives.alternatives.join(
                    ", "
                )}
            </p>
            <p className={styles.limit}>
                <strong>
                    {data.ultimate_recommendation.if_you_still_want_to_consume.status}
                </strong>
                :{" "}
                {
                    data.ultimate_recommendation.if_you_still_want_to_consume
                        .recommendation
                }
            </p>
        </section>

        <section className={styles.ingriBox}>
            <h2 className={styles.subtitle}>Ingredient Analysis</h2>
            {Object.entries(data.ingredient_analysis).map(([key, value]) => (
                <div key={key} className={styles.concernBox}>
                    <strong>{value.status}</strong>
                    <div className={styles.special}>
                        {" "}
                        {value.ingredients.join(" ,  ")}
                    </div>
                    <div style={{paddingLeft:"10px"}}>{value.impact}</div>
                </div>
            ))}
        </section>

        <section className={styles.nutriBox}>
            <h2 className={styles.subtitle2}>Nutritional Analysis</h2>
            <p className={styles.tip}>
                Here is a detailed breakdown of the nutritional content:
            </p>
            <div className={styles.nutriScroll}>
                {Object.entries(data.nutritional_analysis).map(
                    ([key, value], index) => (
                        <div
                            key={key}
                            className={styles.eachNutri}
                            style={{ backgroundColor: colors[index % colors.length] }}
                        >
                            <div>
                                <strong>{key}</strong>
                            </div>
                            <div>{value.impact}</div>
                            <div>{value.value}</div>
                        </div>
                    )
                )}
            </div>
        </section>

        {/* Health Concerns */}
        <div className={styles.healthBox}>
            <section className={styles.concern}>
                <h2 className={styles.subtitle}>Health Concerns</h2>
                {Object.entries(data.health_analysis.concerns).map(([key, value]) => (
                    <div key={key} className={styles.concernBox}>
                        <div className={styles.concernheader}>
                            <strong>{key}</strong>
                            <span className={styles.risk}>{value.status}</span>
                        </div>
                        <div className={styles.allergen}>
                            {Array.isArray(value.allergens) ? (
                                value.allergens.map((allergen, index) => (
                                    <div className={styles.eachallergen} key={index}>
                                        {allergen}
                                    </div>
                                ))
                            ) : (
                                <div className={styles.reason}>
                                    {value.reason || value.impact}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>

        {/* Health Positives */}
        <section className={styles.positive}>
          <h2 className={styles.subtitle}>Health Positives</h2>
          {Object.entries(data.health_analysis.positives).map(
            ([key, value]) => (
              <div key={key} className={styles.concernBox}>
                <div className={styles.concernheader}>
                  <strong>{key}</strong>
                  <span className={styles.good}>{value.status}</span>
                </div>
                <div className={styles.reason}>{value.reason}</div>
              </div>
            )
          )}
        </section>
      </div>

      {/* Nutritional Analysis */}

      {/* Ingredient Analysis */}
    </div>
  );
};

export default Suggestion;
