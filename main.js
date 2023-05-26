const Tela = document.querySelector('.tela_numero_principal');
const Armazem = document.querySelector('.tela_armazem');
const Numeros = document.querySelectorAll('.teclas_numeros');
const Operadores = document.querySelectorAll('.teclas_operadores');
const Inverte = document.querySelector('.tecla_inverte');
const Ponto = document.querySelector('.tecla_decimal');
const Back = document.querySelector('.tecla_back');
const Limpa = document.querySelector('.tecla_clear');
const Resultado = document.querySelector('.tecla_resultado');
const teclasValidas = document.querySelectorAll('.teclas');
let novoNumero = true;
let operacao = undefined;
let numeroAnterior;
let numeroAtual;

/* Verifica se é um número novo ou não
caso novoNumero == true, sobrescreve o número na tela
caso novoNumero == false, concatena o número na tela
*/
const atualizarTela = (texto) => {
    if (novoNumero) {
        Tela.textContent = texto;
        novoNumero = false;
    } else {
        Tela.textContent += texto;
    }

}

//Insere o número desejado na tela
const inserirNumero = (e) => atualizarTela(e.target.value);

//Verifica se existe operação pendente
const operacaoPendente = () => operacao !== undefined;

//Armazena os valores e muda o valor de novoNumero para true
const armazenar = () => {
    if (operacaoPendente()) {
        numeroAtual = parseFloat(Tela.textContent);
        novoNumero = true;
        atualizarTela();
    }
}



//Insere o operador da equação e passa ele junto com o número da tela para o armazém
const selecionarOperador = (e) => {
    if (!novoNumero) {
        armazenar();
        operacao = e.target.value;
        numeroAnterior = parseFloat(Tela.textContent);
        Armazem.textContent = `${numeroAnterior} ${operacao}`;
        novoNumero = true;
        Tela.textContent = "";
    }
}

//Botão clear (teclado virtual)
const Limpeza = () => {
    Armazem.textContent = "";
    Tela.textContent = "";
    novoNumero = true;
    numeroAnterior = null;
    operacao = undefined;
}

//Backspace (teclado virtual)
const removeUltimoCaractere = () => {
    Tela.textContent = Tela.textContent.slice(0, -1);
}

//Realiza equação
const calcular = () => {
    if (operacao !== undefined && Tela.textContent !== "") {
        armazenar();
        atualizarTela(eval(`${numeroAnterior}${operacao}${numeroAtual}`));
        Armazem.textContent = "";
        operacao = undefined;
    }
}

/* Confere se já existe um '.', caso sim (true), impede a inserção do '.'
caso não (false), insere o '.';
Também confere se ja existe algum valor, caso exista, o '.' é concatenado, apos o último número
caso não exista, sera adicionado '0.' na tela. */

const existeValor = () => Tela.textContent.length > 0;
const existeDecimal = () => Tela.textContent.indexOf('.') !== -1;

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarTela('.');
        } else {
            atualizarTela('0.');
        }
    }
}

//Interação com teclado virtual
for (let i = 0; i < teclasValidas.length; i++) {
    const teclado = teclasValidas[i];
    window.addEventListener('keydown', (e) => {
        const validos = e.key;
        if (validos === teclado.value) {
            teclado.click();
            teclado.classList.add('ativa');
        }
    },

        window.addEventListener('keyup', () => {
            teclado.classList.remove('ativa');
        })
    )
}

//Event listener para cada tipo de botão e atribuição das suas respectivas funções
Numeros.forEach(Numeros => Numeros.addEventListener('click', inserirNumero));
Operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));
Limpa.addEventListener('click', Limpeza);
Back.addEventListener('click', removeUltimoCaractere);
Inverte.addEventListener('click', () => Tela.textContent = (Tela.textContent * -1));
Resultado.addEventListener('click', calcular);
Ponto.addEventListener('click', inserirDecimal);
