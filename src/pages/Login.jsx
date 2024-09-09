import {Link} from 'react-router-dom'
import logo from '../assets/bus-stop.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useLoginMutation } from '../auth/usersApiSlice'
import { setCredentials} from '../auth/authSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [zoomIn, setZoomIn] = useState('scale-95 opacity-0')
    const [errMsg, setErrMsg] = useState(false)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
          navigate('/home');
        }
      }, [navigate, userInfo]);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/Controllers/login", {
                email: email,
                senha: senha,
            })
            dispatch(setCredentials({...res}))
            navigate('/home')
        } catch (error){
            console.log(error)
            if(error.status == 401){
                setErrMsg(true)
            }
        }
    }

    useEffect( () => {
        setZoomIn('scale-100 opacity-100')
    })

  return (
    <>
    <div className="bg-green-200">
    <div className="bg-green-300 h-screen flex items-center justify-center border-8 border-green-200 rounded-3xl">
    <div className={`shadow-lg flex w-full max-w-4xl transition-transform transition-opacity duration-1000 ease-out ${zoomIn}`}>
        
        <div className="bg-green-200 w-2/3 p-8 flex flex-col rounded-l items-center justify-center h-[calc(100vh-250px)]">
            <h1 className="text-beige-200 drop text-6xl font-abril drop-shadow">Viaje</h1>
            <h2 className="text-white text-5xl font-allura italic font-thin mt-2 drop-shadow">conosco</h2>
            <img src={logo} className="w-64 h-64 object-cover"/>
        </div>
       
        <div className="bg-green-100 w-1/3 p-8 flex flex-col rounded-r items-center justify-center h-[calc(100vh-250px)]">
            <h2 className="text-white text-3xl font-inter font-extrabold mb-6 drop-shadow-sm">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
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
                    <label htmlFor="senha" className="font-bold font-inter block text-white">Senha</label>
                    <input type="password" 
                    id="senha" 
                    name="senha" 
                    className="w-full py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-200" 
                    required
                    onChange={(e) => {setSenha(e.target.value)}}></input>
                </div>
                {errMsg ? (<>
                <p className="font-inter text-red-600 italic">Senha inválida</p>
                </>) : (<>
                </>)}
                <button type="submit" className="bg-transparent font-bold font-inter text-white py-1 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300">Login</button>
                <Link to="/cadastro" className="bg-transparent font-bold font-inter text-white py-1 px-4 border-2 border-grey rounded-lg hover:bg-green-400 transition duration-300">Cadastre-se</Link>
            </form>
          

            <div className="mt-4 flex justify-center">
                <Link to="#" className="text-white font-inter hover:text-green-400">Esqueci minha senha</Link>
            </div>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default Login