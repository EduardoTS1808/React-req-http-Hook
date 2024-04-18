import React,{Component} from "react";
import './form.css'
export default class Form extends Component{
    constructor(props){
        super(props)
        this.state={
            ano:'',
            modelo:'',
            marca: '',
            marcaTest: 0,
            urlString: '',
            constanteMudanca: '',
            constante: '',
            veiculo:[],
            dados:[]
        }
    }
    hendleOnChange = (event)=>{
        const {text, value} = event.target;
        this.setState({ [text]: value})
    }
    handleSelectChange1 = (e) => {
        this.setState({ marca: e.target.value });
        this.setState({ marcaTest: 1 });
    }
    handleSelectChange2 = (e) => {
        this.setState({ modelo: e.target.value });
        this.setState({ marcaTest: 2 });
    }
    handleSelectChange3 = (e) => {
        this.setState({ ano: e.target.value });
        this.setState({ marcaTest: 3});
    }
    newRequire = () =>{
        const {marca, ano, modelo }= this.state;
        const  numeral = this.state.marcaTest;
        const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
        const newURL1 = `${url}/${marca}/modelos`;
        const newURL2 = `${url}/${marca}/modelos/${modelo}/anos`;
        const newURL3 = `${url}/${marca}/modelos/${modelo}/anos/${ano}`;
        this.setState({urlString : newURL2})
        const callback = (x)=>{
            fetch(x)
            .then(response => response.json())
            .then(data => {this.setState({constanteMudanca: data})})
        }
        if(numeral === 1) { 
         return callback(newURL1) }
            
            if(  numeral === 2) { 
                
                fetch(newURL2)
                .then(response => response.json())
                .then(data => {this.setState({constante: data})})
            }
            
            if( numeral === 3) { 
                console.log(newURL3);
                fetch(newURL3)
                .then(response => response.json())
                .then(data => {this.setState({veiculo: data})})
            }
            
        }
        
        componentDidMount(){
            fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
            .then(response => response.json())
            .then(data => {this.setState({dados: data})});
        }
        render(){
            const selectInput = document.getElementById('seuInputDeSelecao');
            const selectInput2 = document.getElementById('seuInputDeSelecao2');
            const selectInput3 = document.getElementById('seuInputDeSelecao3');
            const opcao1 =  this.state.constanteMudanca;
            const opcao2 =  this.state.constante;



            return (
                <div >
                {
                    this.state.dados.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.codigo; 
                        option.text = item.nome; 
                        selectInput.appendChild(option)
                    })
                }
               
                
                
                
                <div>
                
            
                {  (opcao2 !== '' && this.state.marcaTest === 2 )?
                opcao2.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.codigo; 
                    option.text = item.nome; 
                    selectInput3.appendChild(option)
                }) : console.log('')
        }

    {  (opcao1 !== '' && this.state.marcaTest === 1  ) ?
                    opcao1.modelos.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.codigo; 
                        option.text = item.nome; 
                        selectInput2.appendChild(option)
                    }): console.log('')
                    
                }
        
       
        
        
        
        <p>Escolher Marca </p>
        <select  
        value={this.state.marca} 
        onChange={this.handleSelectChange1}
        id="seuInputDeSelecao" 
        className="selection"
        name="cars">
        </select> 
        <button onClick={this.newRequire}>Cliqui para selecionar modelo</button> 
        <select  
        value={this.state.modelo} 
        onChange={this.handleSelectChange2}
        id="seuInputDeSelecao2"
        className="selection" 
        name="cars">
        </select> 
        <button onClick={this.newRequire}>Cliqui para selecionar ano</button>
        <select  
        value={this.state.ano} 
        onChange={this.handleSelectChange3}
        id="seuInputDeSelecao3" 
        className="selection"
        name="cars">
        </select> 
        <button onClick={this.newRequire}>Resultado</button>
        
        </div>
        { this.state.veiculo !== '' &&
                <div>
                <p>Marca do Veículo: {this.state.veiculo.Marca}</p>
                <h5>Modelo: {this.state.veiculo.Modelo}</h5>
                <p> Ano: {this.state.veiculo.AnoModelo}</p>
                <span> Valor: {this.state.veiculo.Valor}</span>
                
                
                </div>  } 
        </div>
    )
}
}