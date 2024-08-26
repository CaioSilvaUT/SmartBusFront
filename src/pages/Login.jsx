import {Link} from 'react-router-dom'
import logo from '../assets/logoLogin.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setValues(p => ({
            ...p, [e.target.name]: [e.target.value]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/')
    }

  return (
    <>
    <div className="bg-beige-100 h-screen flex items-center justify-center">
    <div className="shadow-lg flex w-full max-w-4xl">
        
        <div className="bg-green-200 w-2/3 p-8 flex flex-col items-center justify-center h-[calc(100vh-250px)]">
            <h1 className="text-beige-200 text-6xl font-abril">Viaje</h1>
            <h2 className="text-white text-5xl font-allura italic font-thin mt-2">conosco</h2>
            <img src={logo} className="w-64 h-64 object-cover"/>
        </div>
       
        <div className="bg-green-100 w-1/3 p-8 flex flex-col items-center justify-center h-[calc(100vh-250px)]">
            <h2 className="text-white text-3xl font-inter font-extrabold mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                <div>
                    <label htmlFor="email" className="font-bold font-inter block text-white">E-mail</label>
                    <input type="email" 
                    id="email" 
                    name="email" 
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                    required
                    onChange={handleInput}></input>
                </div>
                <div>
                    <label htmlFor="password" className="font-bold font-inter block text-white">Senha</label>
                    <input type="password" 
                    id="password" 
                    name="password" 
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                    required
                    onChange={handleInput}></input>
                </div>
                <button type="submit" className="bg-transparent font-bold font-inter text-white py-1 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300">Login</button>
                <Link to="/cadastro" className="bg-transparent font-bold font-inter text-white py-1 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300">Cadastre-se</Link>
            </form>
          

            <div className="mt-4 flex justify-center">
                <Link to="#" className="text-white font-inter hover:text-green-400">Esqueci minha senha</Link>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Login