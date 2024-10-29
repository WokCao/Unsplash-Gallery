import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold">Unsplash App</h1>
                <nav className="flex space-x-4 mt-2 hover:font-bold">
                    <Link to="/Unsplash-Gallery">Home</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;