import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBackPress = (event) => {
            event.preventDefault(); // Prevent default back behavior

            switch (location.pathname) {
                case "/userupdate":
                    navigate("/profile"); // Back from update to profile
                    break;
                case "/profile":
                    navigate("/"); // Back from profile to home
                    break;
                case "/food/:id":
                    navigate("/"); // Back from food details to home
                    break;
                case "/product/:id":
                    navigate("/"); // Back from product details to home
                    break;
                case "/nutriscore/:id":
                    navigate("/food/:id"); // Back from nutri explanation to food details
                    break;
                case "/ocr":
                    navigate("/food/:id"); // Back from OCR to home
                    break;
                case "/scan":
                    navigate("/"); // Back from scanner to home
                    break;
                case "/logout":
                    navigate("/"); // Back from logout to home
                    break;
                default:
                    navigate(-1); // Default back behavior (previous page)
                    break;
            }
        };

        window.addEventListener("popstate", handleBackPress);

        return () => {
            window.removeEventListener("popstate", handleBackPress);
        };
    }, [navigate, location]);

    return null;
};

export default BackHandler;
