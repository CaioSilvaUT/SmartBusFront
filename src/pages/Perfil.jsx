import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice';
import icon_icon from "../assets/icon_icon.png";
import axios from 'axios'

const Perfil = () => {
    const [resData, setResData] = useState("")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [confirmarDel, setConfirmarDel] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    
    useEffect( () => { // mostra as infos do usuário
      axios.get(`http://localhost:3000/showUserId/${userInfo.data.id}`, {
        params: {
          id: userInfo.data.id
        }
      })
      .then(res => {
        console.log(res)
        setResData(res.data)
      })
      .catch(err => console.log(err))
    },[userInfo.data.id])

    const handleButton = () => {
      setConfirmarDel(true)
    }

    const handleClose = () => {
      setConfirmarDel(false)
    }

    const handleChanges = () => {
      setIsEditing(true)
      setNome(resData.nome)
      setEmail(resData.email)
      setTelefone(resData.telefone)
      setSenha(resData.senha)
    }

    const handleDelete = async () => { // deleta a conta
      axios.delete(`http://localhost:3000/deleteUser/${userInfo.data.id}`, {
        params: {
          id: userInfo.data.id
        }
      })
        .then(res => {
          logoutHandle()
        })
        .catch(err => {
            console.log('Erro ao excluir conta', err)
        });
    }

    const logoutHandle = async () => { // sai após deletar a conta
      try {
        await axios.post("http://localhost:3000/logout");
        dispatch(logout());
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }; 

    const handleSubmit = async (e) => { // edita o perfil
      e.preventDefault()
      await axios.put(`http://localhost:3000/updateUser/${userInfo.data.id}`, {
          params: {
              id: userInfo.data.id
          },
          nome,
          email,
          telefone,
          senha
      }).then((res) => {
          setIsEditing(false)
          window.location.reload()
      })

  }

  return (
    <>
    <div className="bg-green-200 h-screen flex items-center justify-center">
  <div className="bg-beige-100 h-auto flex items-start justify-center border-8 border-green-400 rounded p-8 w-full max-w-5xl shadow-lg">
    <div className="flex flex-col w-3/5 p-8 items-center justify-start border-r-4 border-green-400">
        <img
          src={icon_icon}
          alt="Foto do Perfil"
          className="w-32 h-32 rounded-full mb-2"/>

        {isEditing ? (
            <>
            <form className="w-full mb-8">
        <div className="w-full mb-4">
        <label htmlFor="nome" className="block text-green-800 font-inter font-bold mb-2">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder={resData.nome}
            onChange={(e) => {setNome(e.target.value)}}
            required
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="email" className="block text-green-800 font-inter font-bold mb-2">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder={resData.email}
            onChange={(e) => {setEmail(e.target.value)}}
            required
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="phone" className="block text-green-800 font-inter font-bold mb-2">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder={resData.telefone}
            onChange={(e) => {setTelefone(e.target.value)}}
            required
          />
        </div>

       <div className="w-full mb-8">
          <label htmlFor="senha" className="block text-green-800 font-inter font-bold mb-2">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Confirmar senha"
            onChange={(e) => {setSenha(e.target.value)}}
            required
          />
        </div>
        <div className="flex justify-between items-center">
        <Link to='#' className="bg-trasnparent font-bold font-inter border-2 border-green-400 text-green-400 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-green-400"
        onClick={handleSubmit}>Salvar Alterações
        </Link>
        <Link to='#' className="bg-trasnparent font-bold font-inter border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-red-500"
        onClick={handleButton}>
            Excluir Conta
        </Link>
        </div>
        </form>
            </>
        ) : (<>
          <form className="w-full mb-8">
          <div className="w-full mb-4">
          <label htmlFor="nome" className="block text-green-800 font-inter font-bold mb-2">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={resData.nome}
              disabled
            />
          </div>
  
          <div className="w-full mb-4">
            <label htmlFor="email" className="block text-green-800 font-inter font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={resData.email}
              disabled
            />
          </div>
  
          <div className="w-full mb-4">
            <label htmlFor="phone" className="block text-green-800 font-inter font-bold mb-2">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={resData.telefone}
              disabled
            />
          </div>
  
         <div className="w-full mb-8">
            <label htmlFor="senha" className="block text-green-800 font-inter font-bold mb-2">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="w-full py-2 px-4 border-2 border-green-400 rounded-lg bg-white text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder='Senha'
              disabled
            />
          </div>
          <div className="flex justify-between items-center">
          <Link to='#' className="bg-trasnparent font-bold font-inter border-2 border-green-400 text-green-400 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-green-400"
          onClick={handleChanges}>
            Editar Perfil
          </Link>
          <Link to='#' className="bg-trasnparent font-bold font-inter border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-red-500"
          onClick={handleButton}>
              Excluir Conta
          </Link>
          </div>
          </form>
          </>) }
    </div>

        {confirmarDel && (
          <div className="fixed inset-0 bg-green-100 bg-opacity-60 p-8 flex items-center justify-center overflow-y-auto z-50">
            <div className="bg-white p-8 rounded w-full max-w-lg relative">
            <h2 className="text-2xl font-inter font-semibold text-black mb-1">Tem certeza que deseja excluir sua conta permanentemente?</h2>
            <p className="font-inter font-semibold text-grey mb-4">Não será possível desfazer essa ação</p>
            <div className="flex justify-between items-center">
            <button
            onClick={handleDelete}
            className="bg-trasnparent font-bold font-inter border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-red-500">
              Excluir conta</button>
              <button
            onClick={handleClose}
            className="bg-trasnparent font-bold font-inter border-2 border-green-400 text-green-400 py-2 px-6 rounded-lg hover:text-white transition duration-300 hover:bg-green-400">
              Cancelar</button>
            </div>
            </div>
          </div>
        )}

    <div className="flex flex-col w-2/5 p-8 space-y-6">
      <Link to='#' className="bg-white p-6 rounded-lg shadow-md border-2 border-green-400 hover:bg-beige-200 transition duration-300">
        <h2 className="text-green-400 font-inter font-bold text-lg mb-2">Meu Cartão</h2>
        <p className="font-inter text-grey mb-2">Confira seu saldo</p>
        <span className="link-text block text-green-400 font-semibold font-inter leading-tight mt-auto transition-colors duration-300 ease-in-out">Clique para acessar
          <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-green-400 inline-block ml-2 transition-transform duration-500 ease-in-out">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="green-400" />
          </svg>
        </span>
      </Link>
      
      <Link to='#' className="bg-white p-6 rounded-lg shadow-md border-2 border-green-400 hover:bg-beige-200 transition duration-300">
        <h2 className="text-green-400 font-inter font-bold text-lg mb-2">Histórico</h2>
        <p className="font-inter text-grey mb-2">Confira suas últimas viagens</p>
        <span className="link-text block text-green-400 font-semibold font-inter leading-tight mt-auto transition-colors duration-300 ease-in-out">Clique para acessar
          <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-green-400 inline-block ml-2 transition-transform duration-500 ease-in-out">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="green-400" />
          </svg>
        </span>
      </Link>

      
    </div>
  </div>
</div>


    </>
  )
}

export default Perfil