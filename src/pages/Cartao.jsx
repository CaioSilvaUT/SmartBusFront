import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import CriarCartao from "../components/CriarCartao";
import VisualizarCartao from "../components/VisualizarCartao";

const Cartao = () => {
  const [resData, setResData] = useState("")
  const { userInfo } = useSelector((state) => state.auth)

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

  return (
    <>
    {resData ? (
        <>
         <VisualizarCartao />
        </>
    ) : (
        <>  
        <CriarCartao />
        </>
    )}
    </>
  )
}

export default Cartao