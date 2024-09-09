import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const Cadastro = () => {
    const navigate = useNavigate()
    
    const [zoomIn, setZoomIn] = useState('scale-95 opacity-0')

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3000/Controllers/newUser", {
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha,
        }).then((res) => {
            navigate('/login')
        })
    }

    useEffect( () => {
        setZoomIn('scale-100 opacity-100')
    })

  return (
    <>
    <div className="bg-green-200">
    <div className="shadow-lg bg-green-300 h-screen flex items-center justify-center border-8 border-green-200 rounded-3xl">
    <div className={`shadow-lg bg-green-200 p-8 rounded w-full max-w-3xl flex flex-col items-center transition-transform transition-opacity duration-1000 ease-out ${zoomIn}`}>
        <div className="bg-green-100 bg-opacity-60 p-8 w-full flex flex-col items-center">
            <h1 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm">Cadastro</h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-2/3 flex-col items-center justify-center">
                <div>
                    <label htmlFor="nome" className="font-bold font-inter block text-white">Nome</label>
                    <input type="text"
                     id="nome" 
                     name="nome"
                     className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                     required
                     onChange={(e) => {setNome(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor="email" className="font-bold font-inter block text-white">E-mail</label>
                    <input type="email" 
                    id="email" 
                    name="email" 
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                    required
                    onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor="telefone" className="font-bold font-inter block text-white">Telefone</label>
                    <input type="tel" 
                    id="telefone" 
                    name="telefone"
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200"
                    required
                    onChange={(e) => {setTelefone(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor="senha" className="font-bold font-inter block text-white">Senha</label>
                    <input type="password" 
                    id="senha" 
                    name="senha" 
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                    required
                    onChange={(e) => {setSenha(e.target.value)}}></input>
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
</div>
    </>
  )
}

export default Cadastro