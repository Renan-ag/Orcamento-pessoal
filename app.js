class Despesa{
   constructor(ano,  mes, dia, tipo, descricao, valor){
       this.ano = ano
       this.mes = mes
       this.dia = dia
       this.tipo = tipo   
       this.descricao = descricao
       this.valor = valor   
   } 
    
   validarDados(){
       for(let i in this){
           if(this[i] == undefined || this[i] == null || this[i] == ''){
               return false
           }
       }
       return true
   }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
    
        if (id === null){
            localStorage.setItem('id', 0)
        }
    }
    
    getProximoId(){
        let proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }
    
    gravar(d){
        
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    
    recuperarTodosRegistros(){
        let despesas = Array()
        
        let id = localStorage.getItem('id')
        
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null){
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }
        
        return despesas
    }
    pesquisar(despesa){
        let despesaFiltradas = Array()
        despesaFiltradas = this.recuperarTodosRegistros()
        
        if(despesa.ano != ''){
            despesaFiltradas = despesaFiltradas.filter(d => d.ano == despesa.ano)
        }
    
         if(despesa.mes != ''){
            despesaFiltradas = despesaFiltradas.filter(d => d.mes == despesa.mes)
        }
        
         if(despesa.dia != ''){
            despesaFiltradas = despesaFiltradas.filter(d => d.dia == despesa.dia)
        }
     
         if(despesa.tipo != ''){
            despesaFiltradas = despesaFiltradas.filter(d => d.tipo == despesa.tipo)
        }
    
         if(despesa.descricao != ''){
            despesaFiltradas =despesaFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        
        if(despesa.valor != ''){
           despesaFiltradas = despesaFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesaFiltradas
    }
    
    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    
    if(despesa.validarDados()){
        bd.gravar(despesa)    
        
        document.getElementById('modal_titulo').innerHTML = 'Registro realizado com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        
        $('#modalRegistraDespesa').modal('show')
        limpaCampos()
    }else{
        document.getElementById('modal_titulo').innerHTML = 'Erro ao realizar registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'A campos obrigatorios em branco, favor preenche-los.'
        document.getElementById('modal_btn').innerHTML = 'Corrigir dados'
        $('#modalRegistraDespesa').modal('show')
    }
}

function limpaCampos(){
    document.getElementById('ano').selectedIndex = 0
    document.getElementById('mes').selectedIndex = 0
    document.getElementById('dia').value = ''
    document.getElementById('tipo').selectedIndex = 0
    document.getElementById('descricao').value = ''
    document.getElementById('valor').value = ''
}

function carregaListaDespesas(Despesas = Array() ){
    let despesas = Despesas
    let valorTotal = 0
    if(Despesas.length == 0){
        despesas = bd.recuperarTodosRegistros()
    }
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    
    despesas.forEach(function(d){
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        valorTotal += parseFloat(d.valor)
    })
    
    document.getElementById('valor_total').innerHTML = `Valor: R$${valorTotal}`
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)
   
    carregaListaDespesas(despesas)
}
