import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./History.module.css";
import Loading from "../../components/Loading/Loading";
import { MdHistory } from "react-icons/md";


const backendURL = import.meta.env.VITE_BACKEND_URL;

const HistoryPage = () => {
  // State to store the history data
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch history from backend when component loads
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("checking for history");
        const response = await axios.get(`${backendURL}/history`, {
          withCredentials: true, // Ensures user authentication via cookies
        });

        // If history data exists, store it in state
        if (response.data.history) {
          setHistory(response.data.history);
        }else{
          console.log("No history");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false); // Stop loading state after fetching data
      }
    };
    setTimeout(() => {
      fetchHistory();
    }, 1000);
  }, []);

  // Show loading message while data is being fetched

  return (
    <div className={styles.historyDiv}>
      <div className={styles.title}>
        <p>Scanned History</p>
        <MdHistory color="green"/>
      </div>
      <div className={styles.historyContent}>
        {loading ? (
          <div className={styles.loadingDiv}>
            <Loading height={80} width={80} loop={true} autoplay={true} />
          </div>
        ) : Object.keys(history).length === 0 ? (
          <div className={styles.noHistory}>
            <div className={styles.imgDiv}></div>
            <p>No scanned products yet.</p>
          </div>
        ) : (
          // Loop through each date in history
          <div className={styles.detailsBox}>
            {Object.keys(history).map((date) => (
              <div key={date} className={styles.historyDate}>
                <p>
                  {new Date(date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <div className={styles.historyList}>
                  {history[date].map((item) => (
                    <div key={item._id} className={styles.historyItem}>
                      <div className={styles.prodTitle}>
                        {item.product.product_name}
                      </div>
                      <div>
                        <strong>Brand:</strong> {item.product.brand}
                      </div>
                      <div>
                        <strong>Category:</strong> {item.product.category}
                      </div>
                      <div>
                        <strong>Scanned At:</strong>{" "}
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
