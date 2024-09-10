import { useState } from "react";
import { useSelector } from "react-redux";
import icon_icon from "../assets/icon_icon.png";
import qr_code from "../assets/qr-code.png";
import axios from "axios";


const CriarCartao = () => {
    const [resData, setResData] = useState("")
    const { userInfo } = useSelector((state) => state.auth)
    const [file, setFile] = useState(null);
    const [tipo, setTipo] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [pagamento, setPagamento] = useState("")
    const [depositar, setDepositar] = useState(false)

    const [valor, setValor] = useState("")

    function dataCriacao() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
    }

    function dataVencimento() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear() + 1;
        const date = today.getDate();
        return `${date}/${month}/${year}`;
    }

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleTipoChange = (e) => {
      setTipo(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!file) {
        setError("Nenhum arquivo selecionado.");
        return;
      }
  
      if (!tipo) {
        setError("O tipo de cartão é obrigatório.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tipo", tipo);
  
      try {
        await axios.post(
          `http://localhost:3000/Controllers/solicitarCartao/${userInfo.data.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("Solicitação de cartão enviada com sucesso!");
        setError("");
        setFile(null);
        setTipo("");
      } catch (err) {
        setError("Erro ao enviar a solicitação.");
        setMessage("");
        console.error(err);
      }
    };
    {/*const handleSubmit = async (e) => { // cria o cartão
        e.preventDefault()
        await axios.post("http://localhost:3000/Controllers/createCartao", {
            dataCriacao: dataCriacao(),
            dataVencimento: dataVencimento(),
            tipo: tipo,
            valor: valor,  
            idUser: userInfo.data.id
        }).then((res) => {
            console.log(res)
            if(parseFloat(valor) !== 0){ 
              setDepositar(true)
            } else {
              window.location.reload()
            }
        })
    }*/}

    const handleDeposit = () => {
      window.location.reload()
      setDepositar(false)
    }

  return (
    <>
    <div className="bg-green-200">
    <div className="shadow-lg bg-green-300 h-screen flex items-center justify-center border-8 border-green-200 rounded-3xl relative">
  <div className="bg-green-400 h-auto flex items-start justify-center border-8 border-green-200 rounded p-8 w-full max-w-4xl shadow-lg relative z-10">
    <div className="w-3/5">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-center w-56 opacity-10">
        <div className="mb-2">
          <img src={icon_icon} alt="Foto de Perfil" className="rounded-full w-28 h-28 mb-2" />
        </div>
        <div className="text-2xl font-bold font-inter text-green-400">
          Usuário
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-5 w-full opacity-10">
      <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
        <p className="font-bold font-inter text-green-400">Nome:</p>
        <div className="text-gray-800 font-inter text-lg font-medium italic">
          Usuário
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
        <p className="font-bold font-inter text-green-400">Tipo:</p>
        <div className="text-gray-800 font-inter text-lg font-medium italic">
          Tipo
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
        <p className="font-bold font-inter text-green-400">Saldo:</p>
        <div className="text-gray-800 font-inter text-lg font-medium italic">
          R$ 0,00
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
        <p className="font-bold font-inter text-green-400">Data da criação:</p>
        <div className="text-gray-800 font-inter text-lg font-medium italic">
          XX/XX/XX
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-md">
        <p className="font-bold font-inter text-green-400">Data de vencimento:</p>
        <div className="text-gray-800 font-inter text-lg font-medium italic">
          XX/XX/XX
        </div>
      </div>
    </div>

  <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center mt-16">
    <p className="text-white font-semibold font-inter text-4xl drop-shadow-lg">
      Você não possui carteirinha cadastrada.
    </p>
    <p className="text-white mb-8 font-inter text-2xl drop-shadow-lg italic">
      Preencha os dados para criá-la
    </p>
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
    <p className="text-white font-normal font-inter text-2xl mb-4 drop-shadow-md">
      Selecione o tipo da sua carteirinha:
    </p>
    <div className="relative flex justify-center mb-4">
      <select 
        className="font-inter bg-white text-black py-2 px-4 border-4 border-green-100 rounded-md cursor-pointer text-base transition-colors duration-200 focus:outline-none"
        onChange={handleTipoChange}
        required  
      >
        <option value="" defaultValue hidden>
          Selecionar Opção
        </option>
        <option value="01">Usuário</option>
        <option value="02">Escolar</option>
        <option value="03">Sênior</option>
        <option value="04">Especial</option>
      </select>
    </div>
    <label htmlFor="file" className="text-white font-normal font-inter text-2xl mb-4 drop-shadow-md">
            Arquivo PDF:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-64 font-inter bg-white text-black py-2 px-4 border-4 border-green-100 rounded-md mb-6 cursor-pointer text-base transition-colors duration-200 focus:outline-none"
            required
          />
    {/*<p className="text-white font-normal font-inter text-2xl drop-shadow-md">
      Adicione um valor: *
    </p>
    <p className="text-gray-300 font-normal font-inter text-sm italic mb-4 drop-shadow-md">
      * Se não quiser depositar o valor por enquanto, insira "0" no campo abaixo
    </p>
    <input
      type="number"
      step=".01"
      className="font-inter bg-white text-black py-2 border-4 border-green-100 rounded-md text-base mb-5 transition-colors duration-200 focus:outline-none"
      onChange={handleFileChange}
    />*/}

    <button 
      type="submit"
      className="bg-white font-bold font-inter text-green-400 py-1 px-4 border-2 border-green-400 rounded-md shadow-lg hover:border-white transition duration-300 hover:text-white transition duration-300 hover:bg-green-400 transition duration-300"
    >
      Criar
    </button>
    </form>
  </div>
</div>
</div>
</div>

{message && (
          <div className="mt-4 text-green-500 text-center">{message}</div>
        )}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

{depositar && (
          <div className="fixed inset-0 bg-green-100 bg-opacity-60 p-8 flex items-center justify-center overflow-y-auto z-50">
            <div className="bg-white p-8 rounded w-full max-w-lg relative">
              <h2 className="text-2xl font-inter font-semibold text-green-400 mb-4">Depositar Dinheiro</h2>
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


    </>
  )
}

export default CriarCartao