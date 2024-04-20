import React,{useEffect, useState} from "react";
import './form.css'
export default  function Formulario (){
    const [veiculo, setVeiculo] = useState([]) //resultado do veiculo escolhido
    const [dados, setDados] = useState([]) // todas as marcas
    const [constant, setConstant] = useState([]) //ano
    const [select, setSelect] = useState({ano:'',    modelo:'',   marca: '', marcaTest: 0,})
    const [resulPesq, setResultPesq] = useState([]) // todos os modelos desta modelo
    useEffect(()=>{
        fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
        .then(response => response.json())
        .then(data => {setDados(data)})
        
    });
    function handleSelectChange1(e) {
        setSelect({marca : e.target.value, marcaTest: 1 })
    }
    function  handleSelectChange2(e) {
        setSelect( {...select, modelo : e.target.value, marcaTest: 2 })
    }
    function handleSelectChange3(e) {
        setSelect({...select, ano : e.target.value, marcaTest: 3})
    }
    function newRequireMarca (){
        const {marca, marcaTest }= select;
        const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
        const newURL1 = `${url}/${marca}/modelos`;
        console.log(newURL1);
        if(  marcaTest === 1) { 
            fetch(newURL1)
            .then(response => response.json())
            .then(data => {setResultPesq(data)})
        }
    }
    function newRequireModelo (){
        const {marca, marcaTest, modelo }= select;
        const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
        const newURL2 = `${url}/${marca}/modelos/${modelo}/anos`;
        console.log(newURL2);
        if(  marcaTest === 2) { 
            fetch(newURL2)
            .then(response => response.json())
            .then(data => {setConstant(data)})
        }
    }
    function newRequireAno (){
        const {marca, marcaTest,ano, modelo }= select;
        const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
        const newURL3 = `${url}/${marca}/modelos/${modelo}/anos/${ano}`;
        console.log(newURL3);
        if(  marcaTest === 3) { 
            fetch(newURL3)
            .then(response => response.json())
            .then(data => {setVeiculo(data)})
            
        }
    }
    const selectInput = document.getElementById('seuInput');
    const selectInput2 = document.getElementById('seuInput2');
    const selectInput3 = document.getElementById('seuInput3');
    return (
        <div >
        { 
            dados.forEach(item => {
                const option = document.createElement('option');
                option.value = item.codigo; 
                option.text = item.nome; 
                selectInput.appendChild(option)
            })
        }
        <div>
        
        
        {
            useEffect(()=>{
                if(resulPesq !== '' && select.marcaTest === 1 )
                
                resulPesq.modelos.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.codigo; 
                    option.text = item.nome; 
                    selectInput2.appendChild(option)
                })
                
                
                
            },[resulPesq])
        }
        {
            useEffect(()=>{
                if(constant !== '' && select.marcaTest === 2 )
                
                constant.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.codigo; 
                    option.text = item.nome; 
                    selectInput3.appendChild(option)
                })
            },[constant])
        }
        <p>Escolha a Marca Desejada </p>
        <select  
        value={select.marca} 
        onChange={handleSelectChange1}
        id="seuInput" 
        className="selection"
        name="cars">
        </select> 
        <button onClick={newRequireMarca}>Cliqui para selecionar modelo</button> 
        <select  
        value={select.modelo} 
        onChange={handleSelectChange2}
        id="seuInput2"
        className="selection" 
        name="cars">
        </select> 
        <button onClick={newRequireModelo}>Cliqui para selecionar ano</button> 
        <select  
        value={select.modelo} 
        onChange={handleSelectChange3}
        id="seuInput3"
        className="selection" 
        name="cars">
        </select> 
        <button onClick={newRequireAno}>Resultado</button> 
        
        </div>
        <div id="veiculo">
        <div>
        <p>Marca do Veículo: {veiculo.Marca}</p>
        <h5>Modelo: {veiculo.Modelo}</h5>
        <p> Ano: {veiculo.AnoModelo}</p>
        <span> Valor: {veiculo.Valor}</span>
        </div>
        
        </div>
        </div>  
    )
    
}


