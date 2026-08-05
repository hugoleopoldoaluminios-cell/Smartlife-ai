document.addEventListener("DOMContentLoaded",()=>{


// ==========================
// NAVEGAÇÃO
// ==========================


const secoes=document.querySelectorAll(".secao");

const botoes=document.querySelectorAll(".menu button");



function abrirSecao(id){


secoes.forEach(secao=>{

secao.style.display="none";

});


const escolhida=document.getElementById(id);


if(escolhida){

escolhida.style.display="block";

}


}



botoes.forEach(botao=>{


botao.onclick=()=>{

abrirSecao(botao.dataset.secao);

};


});



document.querySelectorAll(".atalho").forEach(botao=>{


botao.onclick=()=>{

abrirSecao(botao.dataset.ir);

};


});



abrirSecao("casa");





// ==========================
// RELÓGIO
// ==========================


const relogio=document.getElementById("relogio");

const data=document.getElementById("data");



function atualizarRelogio(){


const agora=new Date();



if(relogio)

relogio.textContent=agora.toLocaleTimeString("pt-PT");



if(data)

data.textContent=agora.toLocaleDateString("pt-PT");


}



atualizarRelogio();

setInterval(atualizarRelogio,1000);





// ==========================
// TAREFAS
// ==========================


const novaTarefa=document.getElementById("novaTarefa");

const adicionarTarefa=document.getElementById("adicionarTarefa");

const listaTarefas=document.getElementById("listaTarefas");



let tarefas=JSON.parse(

localStorage.getItem("smartlife_tarefas")

)||[];




function guardarTarefas(){

localStorage.setItem(

"smartlife_tarefas",

JSON.stringify(tarefas)

);

}




function mostrarTarefas(){


if(!listaTarefas)return;


listaTarefas.innerHTML="";



tarefas.forEach((tarefa,index)=>{


const li=document.createElement("li");


li.textContent=(tarefa.concluida?"✅ ":"📝 ")+tarefa.texto;



li.onclick=()=>{


tarefas[index].concluida=!tarefas[index].concluida;


guardarTarefas();


mostrarTarefas();


};



listaTarefas.appendChild(li);


});



const total=document.getElementById("totalTarefas");


if(total)

total.textContent=tarefas.length;


}// ==========================
// ADICIONAR TAREFA
// ==========================


if(adicionarTarefa){


adicionarTarefa.onclick=()=>{


const texto=novaTarefa.value.trim();



if(texto){


tarefas.push({

texto:texto,

concluida:false

});



guardarTarefas();


mostrarTarefas();


novaTarefa.value="";


}


};


}





// ==========================
// FINANÇAS 4.0
// ==========================


let salario=Number(

localStorage.getItem("smartlife_salario")

)||0;



let despesas=JSON.parse(

localStorage.getItem("smartlife_despesas")

)||[];





function guardarFinancas(){


localStorage.setItem(

"smartlife_salario",

salario

);



localStorage.setItem(

"smartlife_despesas",

JSON.stringify(despesas)

);


}





const salarioMostrar=document.getElementById("salarioMostrar");

const gastosMostrar=document.getElementById("gastosMostrar");

const saldoMostrar=document.getElementById("saldoMostrar");




function atualizarFinancas(){


let totalGastos=despesas.reduce(

(total,item)=>total+item.valor,

0

);



let saldo=salario-totalGastos;



if(salarioMostrar)

salarioMostrar.textContent=salario+"€";



if(gastosMostrar)

gastosMostrar.textContent=totalGastos+"€";



if(saldoMostrar)

saldoMostrar.textContent=saldo+"€";



const saldoPainel=document.getElementById("saldoPainel");

const gastosPainel=document.getElementById("gastosPainel");



if(saldoPainel)

saldoPainel.textContent=saldo+"€";



if(gastosPainel)

gastosPainel.textContent=totalGastos+"€";


}





// CLICAR NO SALÁRIO


if(salarioMostrar){


salarioMostrar.onclick=()=>{


let valor=prompt("Indica o teu salário:");



if(valor){


salario=Number(valor);


guardarFinancas();


atualizarFinancas();


}


};


}





// CLICAR NOS GASTOS


if(gastosMostrar){


gastosMostrar.onclick=()=>{


let nome=prompt("Nome do gasto:");



let valor=prompt("Valor do gasto:");



if(nome && valor){


despesas.push({

nome:nome,

valor:Number(valor)

});


guardarFinancas();


atualizarFinancas();


}


};


}// ==========================
// LEMBRETES
// ==========================


const novoLembrete=document.getElementById("novoLembrete");

const horaLembrete=document.getElementById("horaLembrete");

const adicionarLembrete=document.getElementById("adicionarLembrete");

const listaLembretes=document.getElementById("listaLembretes");

const proximoLembrete=document.getElementById("proximoLembrete");



let lembretes=JSON.parse(

localStorage.getItem("smartlife_lembretes")

)||[];




function guardarLembretes(){

localStorage.setItem(

"smartlife_lembretes",

JSON.stringify(lembretes)

);

}




function mostrarLembretes(){


if(!listaLembretes)return;


listaLembretes.innerHTML="";



lembretes.forEach((item,index)=>{


const li=document.createElement("li");


li.textContent="🔔 "+item.texto+" - "+item.hora;



li.onclick=()=>{


lembretes.splice(index,1);


guardarLembretes();


mostrarLembretes();


};



listaLembretes.appendChild(li);


});



if(proximoLembrete && lembretes.length>0){


proximoLembrete.textContent=

lembretes[0].texto+" "+lembretes[0].hora;


}


}





if(adicionarLembrete){


adicionarLembrete.onclick=()=>{


const texto=novoLembrete.value.trim();

const hora=horaLembrete.value;



if(texto && hora){


lembretes.push({

texto:texto,

hora:hora

});



guardarLembretes();


mostrarLembretes();


novoLembrete.value="";

horaLembrete.value="";


}


};


}





// ==========================
// METEOROLOGIA
// ==========================


const temperatura=document.getElementById("temperatura");

const estadoTempo=document.getElementById("estadoTempo");

const tempoIcone=document.getElementById("tempoIcone");



function atualizarClima(){


if(temperatura)

temperatura.textContent="22 °C";



if(estadoTempo)

estadoTempo.textContent="Parcialmente nublado";



if(tempoIcone)

tempoIcone.textContent="🌤️";


}





// ==========================
// INICIAR APP
// ==========================


mostrarTarefas();

mostrarLembretes();

atualizarFinancas();

atualizarClima();



});