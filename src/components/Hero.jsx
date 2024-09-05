import logo from '../assets/janela-busao.jpg'
import {Link} from 'react-router-dom'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Hero = () => {
    const [zoomIn, setZoomIn] = useState('scale-90 opacity-0')

    useEffect( () => {
        setZoomIn('scale-100 opacity-100')
    })
    
  return (
    <>
    <div className="bg-green-200 h-screen flex">
        <div className="bg-green-200 w-2/4 pl-16 flex flex-col justify-center h-full">
        <div className={`transition-transform transition-opacity duration-1000 ease-out ${zoomIn}`}>
            <h1 className="text-beige-200 drop-shadow-md flex justify-center text-8xl font-abril mb-8">Viaje conosco</h1>
            <p className="text-white text-2xl drop-shadow-md font-semibold font-inter mb-8 max-w-md mx-auto text-center px-4">Com a Smartbus, você consegue renovar sua carteirinha remotamente, visualizar seu histórico de viagens e se manter atualizado sobre suas linhas de preferência!</p>
    
    <div className="flex space-x-4 justify-center">
        <Link to='/cadastro' 
        className="bg-transparent text-white text-lg py-2 px-4 rounded-lg font-semibold font-inter border-2 border-beige-200 hover:bg-beige-200 hover:text-green-400 transition duration-300">Junte-se a nós</Link>
            <Link to='/VerHorarios'
            id="linhas" 
            name="linhas"  
            className="bg-transparent text-white text-lg py-2 px-4 rounded-lg font-semibold font-inter border-2 border-beige-200 hover:bg-beige-200 hover:text-green-400 transition duration-300">Visualizar Linhas</Link>
    </div>
    </div>
  </div>
    
  <div className="bg-green-200 w-2/4 flex items-center justify-center h-full relative overflow-hidden">
  <img
    src={logo}
    alt="Imagem de Ônibus"
    className="w-full h-full object-cover transition-opacity duration-1000 opacity-0"
    onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-transparent"></div>
</div>




</div>

    </>
  )
}

export default Hero