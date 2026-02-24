import { Link } from "react-router-dom"

export default function Header (){
    return(
        <header className="bg-purple-800 mb-5 rounded-2xl">
        <article className="flex flex-wrap justify-between items-center-safe p-3">
            <section>
                <h1 className="font-black">FindYourGame</h1>
            </section>
            <section>
                <Link to="/">
                <button>Admin Account</button>
                </Link>
                <span>|</span>
                <Link to="/NotFoundPage">
                <button>Log Out</button>
                </Link>
            </section>
        </article>
    </header>
    )
}