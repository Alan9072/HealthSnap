import styles from "./Progress.module.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Progress = ({ progress }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });
  const radius = 50;
  const strokeWidth = 10;
  const circumference = Math.PI * radius;
  const data = {
    A: {
        rating: "Excellent ✨",
        progress: 100,
        color: "#00823F",
        nutritionalBenefits: [
            "High in fiber, protein, and healthy fats",
            "Low in sugar, saturated fat, and sodium",
            "Made with natural, whole ingredients"
        ],
        recommendation: [
            "A great choice! Packed with essential nutrients for a balanced diet.",
            "No changes needed—pair with whole foods for even better nutrition!"
        ],
        takeaway: "An excellent option—supports overall health with natural, nutrient-rich ingredients!"
    },
    B: {
        rating: "Good ✅",
        progress: 80,
        color: "#86BC2B",
        nutritionalBenefits: [
            "High in fiber and protein",
            "Moderate in sugar and sodium",
            "Contains mostly natural ingredients"
        ],
        recommendation: [
            "A solid choice! Provides good nutrition with some room for improvement.",
            "Consider pairing with fresh fruits and vegetables."
        ],
        takeaway: "A good option—offers balanced nutrition with some minor adjustments."
    },
    C: {
        rating: "Average 〽️",
        progress: 65,
        color: "#FECC00",
        nutritionalBenefits: [
            "Moderate in fiber and protein",
            "Higher in sugar and sodium",
            "Contains some processed ingredients"
        ],
        recommendation: [
            "An average choice. Adequate nutrition but could be better.",
            "Try to balance with more whole foods and less processed items."
        ],
        takeaway: "An average option—adequate but could be improved with healthier choices."
    },
    D: {
        rating: "Below Average ⚠️",
        progress: 45,
        color: "#EE8200",
        nutritionalBenefits: [
            "Low in fiber and protein",
            "High in sugar and sodium",
            "Contains many processed ingredients"
        ],
        recommendation: [
            "Below average. Needs significant improvement in nutritional value.",
            "Consider replacing with healthier alternatives."
        ],
        takeaway: "A below-average option—needs improvement for better health."
    },
    E: {
        rating: "Poor 🚫",
        progress: 30,
        color: "#E73C09",
        nutritionalBenefits: [
            "Very low in fiber and protein",
            "Very high in sugar and sodium",
            "Mostly processed ingredients"
        ],
        recommendation: [
            "Poor choice. Lacks essential nutrients and high in unhealthy components.",
            "Strongly consider replacing with nutrient-dense foods."
        ],
        takeaway: "A poor option—significantly lacks nutritional value and should be avoided."
    }
};

const selectedData = data[progress];

  const dashArray = circumference;
  const dashOffset = circumference * (1 - (isInView ? selectedData.progress : 0) / 100);
  

console.log(selectedData);

  return (
    <div ref={ref} className={styles.progressBox}>
      <div className={styles.progress}>
        <div className={styles.section1}>
          <svg width="140" height="120" viewBox="0 0 120 60">
            {/* Background Arc */}
            <path
              d="M10,50 A40,40 0 0,1 110,50"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Animated Progress Arc */}
            <motion.path
              d="M10,50 A40,40 0 0,1 110,50"
              fill="none"
              stroke={selectedData.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
          <div className={styles.progressText}>
            <p>{progress}</p>
          </div>
        </div>
        
        <div className={styles.depthInfo}>
            <strong>Nutritional Benefits: 🌿</strong>
            <li style={{ color: selectedData.color }}>{selectedData.nutritionalBenefits[0]}</li>
<li style={{ color: selectedData.color }}>{selectedData.nutritionalBenefits[1]}</li>
<li style={{ color: selectedData.color }}>{selectedData.nutritionalBenefits[2]}</li>

        </div>
      </div>

      <div className={styles.progressInfo}>
        <p> {selectedData.rating} </p>
        <p>{selectedData.takeaway}</p>
      </div>
    </div>
  );
};

export default Progress;
