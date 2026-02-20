import { Link } from "react-router-dom";
import pandawa from "../assets/DeessePandawa.png"

const NotFoundPage = () => {
    return(
        <div>
            {/* <h1>NOT FOUND PAGE</h1> */}
            <Link to ={"/"}>
            {/* <button>Go Back Home</button> */}
            <img className="justify-self-center-safe rounded-3xl w-6xl" src={pandawa} alt={pandawa} />
            </Link>
        </div>
        
    )
}

export default NotFoundPage