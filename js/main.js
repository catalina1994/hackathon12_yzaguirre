const c =console.log
//menu
const btnMenu = document.getElementById('btnmenu')
const Menu = document.querySelector('.menu')
const btnClose = document.getElementById('btnClose')
btnMenu.addEventListener("click", function (e) {
    Menu.classList.toggle('active')
})
btnClose.addEventListener("click", function (e) {
  Menu.classList.remove('active')
})

//calculadora

const botonNumbers = document.querySelector('.calculator__teclado'),
      botonIgual = document.getElementsByName('data-igual')[0],
      botonDelete = document.getElementsByName('data-delete')[0]
let result = document.getElementById('result');
let opeActual = '',
      opeAnterior= '',
      operacion = undefined

//eventos
initAPP();
document.addEventListener('load', initAPP)
function initAPP(){
    botonNumbers.addEventListener('click', obtenerNumber),
    botonIgual.addEventListener('click', ()=>{
        calcular();
        actualizarDisplay()
    }),
    botonDelete.addEventListener('click', ()=>{
        clear();
        actualizarDisplay()
    })
}

// FUNCIONES
function obtenerNumber(e){
    e.preventDefault()
    if(e.target.classList.contains('number')){
        const number = e.target.textContent; 
        agregarDatos(number);
    }if (e.target.classList.contains('operador')){
        const operador = e.target.textContent; 
        selecOperador(operador);
        
    }
}

function selecOperador(operador){
    if(opeActual === '') return;
    if(opeAnterior !==''){
        calcular()
    }
    operacion =operador.toString();
    opeAnterior =opeActual;
    opeActual = '';
}

function calcular(){
    let calculo;
    const anterior = parseInt(opeAnterior),
          actual =parseInt(opeActual)
    if(isNaN(anterior) || isNaN(actual) ) return;
    switch(operacion){
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        default:
            return
    }
    opeActual= calculo;
    operacion = undefined;
    opeAnterior = ''
}
function agregarDatos(number){
    opeActual = opeActual.toString() + number.toString();
    actualizarDisplay();
    c(opeActual)
}
function actualizarDisplay(){
    result.value = opeActual
}
function clear(){
      opeActual = '',
      opeAnterior= '',
      operacion = undefined
}
    
clear();

//todoList
 const btnAdd = document.getElementById('btnAdd'),  
       valueAdd = document.getElementById('valueAdd'),
       listTarea = document.getElementById('todoListTotal')

btnAdd.addEventListener('click', obtenerTarea),
listTarea.addEventListener('click',eliminarTarea),
listTarea.addEventListener('change', completaTarea)

// FUNCIONES
function obtenerTarea(e){
    e.preventDefault()
    const tarea = valueAdd.value
    pintarTarea(tarea)
}
 function pintarTarea(tarea){
     if(tarea){
        let item =document.createElement('li')
        item.classList.add('todoList__item');
        item.innerHTML=`
        <div class="flex align-center">
             <input type="checkbox" id="tarea2" name="tarea1" >
            <label for="tarea2"></label>
        </div>
        <p>${tarea}</p>
        <i  class="material-icons btn secundary-color ">cancel</i>
        `
        listTarea.appendChild(item)
        clearTarea();
     }
 }
function completaTarea(e){
    if(e.target.checked){
        const complete = e.target.parentElement
        frase =complete.querySelector('label')
        frase.textContent ="Completo"
    }else{
        frase.textContent =""
    }
    

}
 function eliminarTarea(e){
    if(e.target.classList.contains('btn')){
        const item = e.target.parentElement; 
        item.remove()
    }
}
function clearTarea(){
    valueAdd.value = ''
 }
 clearTarea();