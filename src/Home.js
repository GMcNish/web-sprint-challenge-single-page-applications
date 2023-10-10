import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    const orderPizza = () => {
        navigate("/pizza")
    }

    return (
        <div className="home-wrapper">
            <img
                className="home-image"
                src="https://www.yourhomebasedmom.com/wp-content/uploads/2015/04/Thin-Crust-Margharita-Pizza-@yourhomebasedmom.com_0002.jpg"
                alt="pizza"
            />
            <button onClick={orderPizza} className="md-button order-button" id="order-pizza">
                Order Pizza Now!
            </button>
        </div>
        
    );
}