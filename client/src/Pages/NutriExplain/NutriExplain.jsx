import React, { useState } from 'react';
import styles from './NutriExplain.module.css';
import NutriBox from '../../components/NutriBox/NutriBox';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';

function NutriExplain() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [expanded, setExpanded] = useState(null);

    const toggleFAQ = (index) => {
        setExpanded(expanded === index ? null : index);  // Toggle the FAQ answer visibility
    };

    return (
        <div className={styles.NutriExplainDiv}>
            <div className={styles.buttonDiv}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <IoChevronBackOutline size={24} color={"green"}/>
                </button>
                    <p>HS</p>
                <button className={styles.backButton} onClick={()=> navigate('/')}>
                    <IoHomeOutline size={24} color={"green"}/>
                </button>
            </div>
            <NutriBox val={id} />

            
            
            <div className={styles.colorBox}>
                {/* Nutri-Score Info */}
                <div className={styles.eachBox}><span className={styles.A}>A</span> "Great choice! Packed with good nutrients and low in sugar, fat, and salt. Feel free to enjoy often!"</div>
                <div className={styles.eachBox}><span className={styles.B}>B</span> "Still a healthy option, but not as perfect as A. Good for regular meals."</div>
                <div className={styles.eachBox}><span className={styles.C}>C</span> "An okay choice. Somewhat balanced but has a bit more sugar, fat, or salt than you'd want too often."</div>
                <div className={styles.eachBox}><span className={styles.D}>D</span> "Not the healthiest. It's tasty but contains higher amounts of sugar, fat, or salt. Have it occasionally."</div>
                <div className={styles.eachBox}><span className={styles.E}>E</span> "Try to avoid this one if possible. It's high in sugar, fat, or salt and not great for regular eating." </div>
            </div>
            <div className={styles.tipsBox}>
                {/* How is it calculated? */}
                <h2>How is it calculated?</h2>
                <p>The nutritional score is calculated by evaluating both the positive and negative aspects of the food item. Positive points are awarded for beneficial nutrients such as fiber, protein, and vitamins. Negative points are given for less desirable components like sugar, saturated fat, and sodium. The final score is a balance of these positive and negative points, resulting in a grade from A to E.</p>
            </div>
            

            {/* FAQ Section */}
            <div className={styles.faqBox}>
                <h2>Frequently Asked Questions</h2>
                <div className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFAQ(0)}>
                        <strong>What is Nutri-Score?</strong>
                        <span className={expanded === 0 ? styles.arrowUp : styles.arrowDown}>↑↓</span>
                    </div>
                    {expanded === 0 && (
                        <div className={styles.faqAnswer}>
                            Nutri-Score is a front-of-pack label that helps consumers make healthier food choices. It gives a score from A to E based on the nutritional quality of the food.
                        </div>
                    )}
                </div>

                <div className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFAQ(1)}>
                        <strong>How is the Nutri-Score calculated?</strong>
                        <span className={expanded === 1 ? styles.arrowUp : styles.arrowDown}>↑↓</span>
                    </div>
                    {expanded === 1 && (
                        <div className={styles.faqAnswer}>
                            Nutri-Score takes into account both positive factors (like fiber, protein, and vitamins) and negative factors (like sugar, fat, and salt). It then calculates a final score that is color-coded from A (healthiest) to E (least healthy).
                        </div>
                    )}
                </div>

                <div className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFAQ(2)}>
                        <strong>Can I trust the Nutri-Score label?</strong>
                        <span className={expanded === 2 ? styles.arrowUp : styles.arrowDown}>↑↓</span>
                    </div>
                    {expanded === 2 && (
                        <div className={styles.faqAnswer}>
                            Yes! The Nutri-Score label is based on scientific evidence and is endorsed by health authorities in several countries. It helps guide you to healthier food choices at a glance.
                        </div>
                    )}
                </div>

                <div className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFAQ(3)}>
                        <strong>Why is Nutri-Score not used in all countries?</strong>
                        <span className={expanded === 3 ? styles.arrowUp : styles.arrowDown}>↑↓</span>
                    </div>
                    {expanded === 3 && (
                        <div className={styles.faqAnswer}>
                            Nutri-Score is still being adopted in different countries. It’s a voluntary label that manufacturers can use, and it’s gaining popularity in Europe.
                        </div>
                    )}
                </div>

                <div className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFAQ(4)}>
                        <strong>Does Nutri-Score apply to all food products?</strong>
                        <span className={expanded === 4 ? styles.arrowUp : styles.arrowDown}>↑↓</span>
                    </div>
                    {expanded === 4 && (
                        <div className={styles.faqAnswer}>
                            Nutri-Score is primarily designed for packaged foods and beverages. It’s not applied to unprocessed foods like fruits and vegetables, which naturally score very well.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default NutriExplain;
