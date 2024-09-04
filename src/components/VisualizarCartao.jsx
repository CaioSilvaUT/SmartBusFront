import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import icon_icon from "../assets/icon_icon.png";
import qr_code from "../assets/qr-code.png";


const VisualizarCartao = () => {
  const [resData, setResData] = useState("")
    const [resDataUser, setResDataUser] = useState("")
    const { userInfo } = useSelector((state) => state.auth)

    const [pagamento, setPagamento] = useState("")
    const [depositar, setDepositar] = useState(false)
    const [renovar, setRenovar] = useState(false)

    const [valor, setValor] = useState("")

    useEffect( () => { // infos do cartao
        axios.get(`http://localhost:3000/getByIdUserCartao/${userInfo.data.id}`, {
          params: {
            idUser: userInfo.data.id
          }
        })
        .then(res => {
          console.log(res)
          setResData(res.data)
        })
        .catch(err => console.log(err))
      }, [userInfo.data.id])

    const handleDeposit = async (e) => { // depositar valor
        e.preventDefault()
        await axios.post(`http://localhost:3000/adicionarSaldo/${userInfo.data.id}`, {
            params: {
                idUser: userInfo.data.id
            },
            valorAdicionado: valor,
        }).then((res) => {
            console.log(res)
            setPagamento(false)
            window.location.reload()
        }).catch((err) => console.log(err))
    }

    const handleUpdate = async (e) => {
      e.preventDefault() 
      // renovar a carteirinha
    }

    useEffect( () => { // mostra as infos do usuário
        axios.get(`http://localhost:3000/showUserId/${userInfo.data.id}`, {
          params: {
            id: userInfo.data.id
          }
        })
        .then(res => {
          console.log(res)
          setResDataUser(res.data)
        })
        .catch(err => console.log(err))
      },[userInfo.data.id])

    const handleClose = () => {
        setRenovar(false)
        setDepositar(false)
        setPagamento(false)
    }

  return (
    <>
    <div className="shadow-lg bg-green-300 h-screen flex items-center justify-center border-8 border-green-200 rounded-3xl">
    <div className="bg-green-400 h-auto flex items-start justify-center border-8 border-green-200 rounded p-8 w-full max-w-4xl shadow-lg">
    <div className="w-3/5">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-center w-56">
        <div className="mb-2">
          <img src={icon_icon} alt="Foto de Perfil" className="rounded-full w-28 h-28 mb-2" />
        </div>
        <div className="text-2xl font-bold font-inter text-green-400">
          {resDataUser.nome}
        </div>
      </div>
      <div className="flex flex-col items-start">
      <button 
        onClick={() => setRenovar(true)}
        className="bg-green-100 text-gray-700 font-semibold font-inter py-2 px-4 rounded-md shadow-md w-full max-w-44 mt-24 mb-3 hover:bg-green-300 transition duration-300">
        Renovar Cartão
      </button>
      <button 
      onClick={() => setDepositar(true)}
      className="bg-green-100 text-gray-700 font-semibold font-inter py-2 px-4 rounded-md shadow-md w-full max-w-44 mb-3 hover:bg-green-300 transition duration-300">
        Recarregar Cartão
      </button>
      </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
          <p className="font-bold font-inter text-green-400">Nome:</p>
          <div className="text-gray-800 font-inter text-lg font-medium italic">
            {resDataUser.nome}
          </div>
        </div>
        <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
          <p className="font-bold font-inter text-green-400">Tipo:</p>
          <div className="text-gray-800 font-inter text-lg font-medium italic">
            {resData.tipo}
          </div>
        </div>
        <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
          <p className="font-bold font-inter text-green-400">Saldo:</p>
          <div className="text-gray-800 font-inter text-lg font-medium italic">
            R$ {resData.valor}
          </div>
        </div>
        <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
          <p className="font-bold font-inter text-green-400">Data da criação:</p>
          <div className="text-gray-800 font-inter text-lg font-medium italic">
            {resData.dataCriacao}
          </div>
        </div>
        <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
          <p className="font-bold font-inter text-green-400">Data de vencimento:</p>
          <div className="text-gray-800 font-inter text-lg font-medium italic">
            {resData.dataVencimento}
          </div>
        </div>
      </div>
      </div>
    </div>

    {depositar && (
          <div className="fixed inset-0 bg-green-100 bg-opacity-60 p-8 flex items-center justify-center overflow-y-auto z-50">
            <div className="bg-white p-8 rounded w-full max-w-lg relative">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-black text-xl hover:text-grey transition duration-300">×</button>
              <h2 className="text-2xl font-inter font-semibold text-green-400 mb-4">Depositar Dinheiro</h2>
              <label htmlFor="Valoratual" className="font-bold font-inter block text-black flex flex-row">Valor atual: R${resData.valor}</label>
              <label htmlFor="Valoracolocar" className="font-bold font-inter block text-grey flex flex-row mb-3">Insira no campo abaixo quanto você deseja depositar:</label>
          <input
            type="number"
            step=".01"
            placeholder="Valor"
            onChange={(e) => {setValor(e.target.value)}}
            className="w-full mb-2 py-1 px-4 border-2 mb-3 border-grey rounded-lg bg-transparent text-grey focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <label htmlFor="Valoracolocar" className="font-bold font-inter block text-grey flex flex-row mb-3">Escolha a forma de pagamento:</label>
          <select
            onChange={(e) => {setPagamento(e.target.value)}}
            className="w-full mb-5 py-1 px-4 border-2 border-grey rounded-lg bg-transparent text-grey focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Boleto">Boleto</option>
            <option value="Pix">Pix</option>
          </select>
          {pagamento === "Pix" && (
             <div className="flex items-start mt-5 mb-4">
             <img
               src={qr_code}
               alt="QR Code de Pix"
               className="w-40 mb-4"
             />
             <div className="ml-6">
               <h3 className="font-inter font-bold mb-2 italic">Instruções para pagamento</h3>
               <ul className="list-disc ml-5 font-inter font-grey italic text-sm">
                 <li>Acesse o aplicativo do seu banco em seu celular</li>
                 <li>Clique na opção de pagar via Pix</li>
                 <li>Escaneie o QR Code exibido ao lado</li>
                 <li>Confira os dados e confirme o pagamento</li>
               </ul>
             </div>
           </div>
          )}
          <button
            onClick={handleDeposit}
            className="bg-transparent font-bold font-inter text-green-400 py-1 px-4 border-2 border-grey rounded-lg hover:text-white hover:bg-green-400 transition duration-300">Confirmar pagamento</button>
            </div>
          </div>
        )}

        {renovar && (
          <div className="fixed inset-0 bg-green-100 bg-opacity-60 p-8 flex items-center justify-center overflow-y-auto z-50">
            <div className="bg-white p-8 rounded w-full max-w-lg relative">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-black text-xl hover:text-grey transition duration-300">×</button>
              <h2 className="text-2xl font-inter font-semibold text-green-400 mb-2">Renovar Carteirinha</h2>
              <p className="font-inter font-semibold text-black mb-1">Sua carteirinha vence dia <p className="font-inter font-semibold text-red-500 mb-1 inline">{resData.dataVencimento}.</p> Se necessário, renove-a automaticamente clicando abaixo</p>
              <p className="font-inter text-grey italic mb-3">Nova data de vencimento após a renovação: <p className="font-inter italic text-red-500 mb-3 inline">novadata</p></p>
              <button
                onClick={handleUpdate}
                className="bg-transparent font-bold font-inter text-green-400 py-1 px-4 border-2 border-grey rounded-lg hover:text-white hover:bg-green-400 transition duration-300">Renovar Carteirinha</button>
            
            </div>
          </div>
        )}
    </>
  )
}

export default VisualizarCartao