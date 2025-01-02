let totalGastos = 0;
let totalLucros = 0;
let gastos = [];
let lucros = [];

// Função para salvar os dados no Local Storage
function salvarParametros() {
  const parametros = {
    totalGastos,
    totalLucros,
    gastos,
    lucros,
  };
  localStorage.setItem('parametrosFinanceiros', JSON.stringify(parametros));
}

// Função para recuperar os dados do Local Storage
function recuperarParametros() {
  const dados = localStorage.getItem('parametrosFinanceiros');
  if (dados) {
    const {
      totalGastos: tg,
      totalLucros: tl,
      gastos: g,
      lucros: l,
    } = JSON.parse(dados);
    totalGastos = tg;
    totalLucros = tl;
    gastos = g;
    lucros = l;

    atualizarDashboard();
    atualizarRelatorios();
  }
}

document.getElementById('formGastos').addEventListener('submit', function (e) {
  e.preventDefault();

  const descricao = document.getElementById('descricaoGasto').value;
  let valorString = document.getElementById('valorGasto').value.trim();
  valorString = valorString.replace('.', '').replace(',', '.'); // Converte "1.234,56" para "1234.56"
  const valor = parseFloat(valorString);
  const banco = document.getElementById('bancoGasto').value;

  if (valorString === '' || isNaN(valor) || valor <= 0) {
    alert('Por favor, insira um valor válido para o gasto.');
    return;
  }

  totalGastos += valor;
  gastos.push({ descricao, valor, banco });

  atualizarDashboard();
  atualizarRelatorios();
  salvarParametros(); // Salva no Local Storage

  alert(
    `Gasto adicionado: ${descricao}, R$ ${valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} no banco ${banco}`
  );
  this.reset();
});

document.getElementById('formLucros').addEventListener('submit', function (e) {
  e.preventDefault();

  const descricao = document.getElementById('descricaoLucro').value;
  let valorString = document.getElementById('valorLucro').value.trim();
  valorString = valorString.replace('.', '').replace(',', '.'); // Converte "1.234,56" para "1234.56"
  const valor = parseFloat(valorString);
  const banco = document.getElementById('bancoLucro').value;

  if (valorString === '' || isNaN(valor) || valor <= 0) {
    alert('Por favor, insira um valor válido para o lucro.');
    return;
  }

  totalLucros += valor;
  lucros.push({ descricao, valor, banco });

  atualizarDashboard();
  atualizarRelatorios();
  salvarParametros(); // Salva no Local Storage

  alert(
    `Lucro adicionado: ${descricao}, R$ ${valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} no banco ${banco}`
  );
  this.reset();
});

function atualizarDashboard() {
  const saldoTotal = totalLucros - totalGastos;

  document.getElementById('gastosTotais').textContent = totalGastos.toLocaleString(
    'pt-BR',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  document.getElementById('lucrosTotais').textContent = totalLucros.toLocaleString(
    'pt-BR',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );

  const saldoElement = document.getElementById('saldosTotais');
  saldoElement.textContent = saldoTotal.toLocaleString(
    'pt-BR',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );

  if (saldoTotal >= 0) {
    saldoElement.classList.remove('saldo-negativo');
    saldoElement.classList.add('saldo-positivo');
  } else {
    saldoElement.classList.remove('saldo-positivo');
    saldoElement.classList.add('saldo-negativo');
  }
}

function atualizarRelatorios() {
  const relatoriosContainer = document.getElementById('relatorios');
  relatoriosContainer.innerHTML = `<h2>Relatórios</h2>`;

  relatoriosContainer.innerHTML += `<h3>Gastos:</h3><ul>`;
  gastos.forEach((gasto) => {
    relatoriosContainer.innerHTML += `<li>${gasto.descricao}: R$ ${gasto.valor.toLocaleString(
      'pt-BR',
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )} (Banco: ${gasto.banco})</li>`;
  });
  relatoriosContainer.innerHTML += `</ul>`;

  relatoriosContainer.innerHTML += `<h3>Lucros:</h3><ul>`;
  lucros.forEach((lucro) => {
    relatoriosContainer.innerHTML += `<li>${lucro.descricao}: R$ ${lucro.valor.toLocaleString(
      'pt-BR',
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )} (Banco: ${lucro.banco})</li>`;
  });
  relatoriosContainer.innerHTML += `</ul>`;
}

// Recupera os dados ao carregar a página
recuperarParametros();
