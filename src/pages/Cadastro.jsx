import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cadastro = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: '',
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
        navigate('/login')
    }

  return (
    <>
    <div className="shadow-lg bg-beige-100 h-screen flex items-center justify-center">
    <div className="shadow-lg bg-green-200 p-8 w-full max-w-3xl flex flex-col items-center">
        <div className="bg-green-100 bg-opacity-60 p-8 w-full flex flex-col items-center">
            <h1 className="text-white text-3xl font-inter font-extrabold mb-6">Cadastro</h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-2/3 flex-col items-center justify-center">
                <div>
                    <label htmlFor="name" className="font-bold font-inter block text-white">Nome</label>
                    <input type="text"
                     id="name" 
                     name="name"
                     className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                     required
                     onChange={handleInput}></input>
                </div>
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
                <div>
                    <label htmlFor="confirm-password" className="font-bold font-inter block text-white">Confirmar senha</label>
                    <input type="password" 
                    id="confirm-password" name="confirm-password" 
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                    required
                    onChange={handleInput}></input>
                </div>
                <div className="mt-4 flex justify-center">
                    <button type="submit" className="bg-transparent font-bold font-inter text-white py-1 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300">Confirmar</button>
                </div>
            </form>
            <div className="mt-4 flex justify-center">
                <p><label className="text-white font-inter">Já possui uma conta? </label><Link to="/login" className="text-white font-semibold font-inter hover:text-green-400">Fazer login</Link></p>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Cadastro