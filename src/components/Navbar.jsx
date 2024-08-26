import {Link} from 'react-router-dom'

const Navbar = () => { 
  return (
    <>
    <nav className="bg-green-200 p-4">
        <div className="font-inter container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-xl font-bold">SmartBus</Link>
            <div className="space-x-4">
                <Link to="/" className="text-white font-semibold hover:text-green-300">Home</Link>
                <Link to="/login" className="text-white font-semibold hover:text-green-300">Login</Link>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar