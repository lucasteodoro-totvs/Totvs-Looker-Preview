/**
 * @title Composição das Vendas - Cockpit Executivo (Versão Vercel Preview)
 * @description Cards horizontais, histórico mensal e gaveta hierárquica (Segmento -> Curva ABC -> Ofertas / Clientes)
 *              com visão temporal de 13 meses em qualquer linha e seletor dinâmico de ordenação.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'composicao-vendas';

// Opções dos Filtros
const OPCOES_ANO = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' }
];

const OPCOES_MES = [
  { value: '1', label: '01 - Janeiro' },
  { value: '2', label: '02 - Fevereiro' },
  { value: '3', label: '03 - Março' },
  { value: '4', label: '04 - Abril' },
  { value: '5', label: '05 - Maio' },
  { value: '6', label: '06 - Junho' },
  { value: '7', label: '07 - Julho' },
  { value: '8', label: '08 - Agosto' },
  { value: '9', label: '09 - Setembro' },
  { value: '10', label: '10 - Outubro' },
  { value: '11', label: '11 - Novembro' },
  { value: '12', label: '12 - Dezembro' }
];

const OPCOES_SEGMENTO = [
  { value: 'AGROINDUSTRIA', label: 'AGROINDUSTRIA' },
  { value: 'CONSTRUCAO E PROJETOS', label: 'CONSTRUCAO E PROJETOS' },
  { value: 'DISTRIBUICAO', label: 'DISTRIBUICAO' },
  { value: 'EDUCACIONAL', label: 'EDUCACIONAL' },
  { value: 'EM BRANCO', label: 'EM BRANCO' },
  { value: 'FINANCIAL SERVICES', label: 'FINANCIAL SERVICES' },
  { value: 'HOSPITALITY', label: 'HOSPITALITY' },
  { value: 'JURIDICO', label: 'JURIDICO' },
  { value: 'LOGISTICA', label: 'LOGISTICA' },
  { value: 'MANUFATURA', label: 'MANUFATURA' },
  { value: 'SAUDE', label: 'SAUDE' },
  { value: 'SEGMENTO INTERNACIONAL', label: 'SEGMENTO INTERNACIONAL' },
  { value: 'SERVICOS', label: 'SERVICOS' },
  { value: 'SMALL BUSINESS', label: 'SMALL BUSINESS' },
  { value: 'SUPERMERCADOS', label: 'SUPERMERCADOS' },
  { value: 'TOTVS', label: 'TOTVS' },
  { value: 'VAREJO', label: 'VAREJO' }
];

const OPCOES_TP_UNIDADE = [
  { value: 'CROSS', label: 'CROSS' },
  { value: 'EM BRANCO', label: 'EM BRANCO' },
  { value: 'FILIAIS', label: 'FILIAIS' },
  { value: 'FRANQUIAS', label: 'FRANQUIAS' },
  { value: 'MI', label: 'MI' },
  { value: 'MPN', label: 'MPN' },
  { value: 'OUTRAS OPERAÇÕES', label: 'OUTRAS OPERAÇÕES' },
  { value: 'OUTROS', label: 'OUTROS' },
  { value: 'VERTICAIS', label: 'VERTICAIS' }
];

const OPCOES_TP_RECEITA = [
  { value: 'CDU', label: 'CDU' },
  { value: 'EM BRANCO', label: 'EM BRANCO' },
  { value: 'OUTROS', label: 'OUTROS' },
  { value: 'SAAS', label: 'SAAS' },
  { value: 'SERVICOS NÃO RECORRENTES', label: 'SERVICOS NÃO RECORRENTES' },
  { value: 'SERVICOS RECORRENTES', label: 'SERVICOS RECORRENTES' },
  { value: 'SMS', label: 'SMS' }
];

// Bases Mockadas Realistas para Simulação Interativa
const MOCK_SEGMENTOS_PESO = [
  { nome: 'VAREJO', peso: 0.165, yoyProd: -14.2, tmBase: 9450, yoyTm: -8.5 },
  { nome: 'MANUFATURA', peso: 0.142, yoyProd: 12.8, tmBase: 16200, yoyTm: 6.4 },
  { nome: 'SERVICOS', peso: 0.128, yoyProd: 8.4, tmBase: 11800, yoyTm: 3.1 },
  { nome: 'SUPERMERCADOS', peso: 0.105, yoyProd: -6.3, tmBase: 17600, yoyTm: 5.9 },
  { nome: 'DISTRIBUICAO', peso: 0.096, yoyProd: -10.5, tmBase: 12780, yoyTm: -12.6 },
  { nome: 'CONSTRUCAO E PROJETOS', peso: 0.088, yoyProd: 24.5, tmBase: 18165, yoyTm: 14.2 },
  { nome: 'LOGISTICA', peso: 0.075, yoyProd: -18.3, tmBase: 13250, yoyTm: -9.8 },
  { nome: 'EDUCACIONAL', peso: 0.068, yoyProd: -12.1, tmBase: 13890, yoyTm: -7.4 },
  { nome: 'SAUDE', peso: 0.056, yoyProd: 15.6, tmBase: 15420, yoyTm: 9.2 },
  { nome: 'AGROINDUSTRIA', peso: 0.042, yoyProd: 19.4, tmBase: 21300, yoyTm: 11.0 },
  { nome: 'FINANCIAL SERVICES', peso: 0.035, yoyProd: 6.7, tmBase: 24500, yoyTm: 4.5 }
];

const MOCK_OFERTAS_POR_CURVA = {
  'CURVA A': [
    { nome: 'CLOUD + CLOUD INTERA', peso: 0.42, yoyProd: 18.4, tm: 19800, yoyTm: 11.2 },
    { nome: 'INTERA BACKOFFICE', peso: 0.33, yoyProd: -9.6, tm: 14500, yoyTm: -4.8 },
    { nome: 'RH (CORE + PARCEIROS)', peso: 0.25, yoyProd: 14.1, tm: 11200, yoyTm: 6.5 }
  ],
  'CURVA B': [
    { nome: 'CORE SEGMENTOS', peso: 0.36, yoyProd: -5.2, tm: 9800, yoyTm: -3.1 },
    { nome: 'AHGORA PONTO ELETRÔNICO', peso: 0.28, yoyProd: 29.5, tm: 7400, yoyTm: 12.4 },
    { nome: 'RD STATION MARKETING', peso: 0.21, yoyProd: 11.8, tm: 5900, yoyTm: 4.2 },
    { nome: 'FLUIG (CORE + PARC)', peso: 0.15, yoyProd: -16.4, tm: 8600, yoyTm: -7.9 }
  ],
  'CURVA C': [
    { nome: 'SOLUÇÕES FISCAIS & TAX', peso: 0.34, yoyProd: 22.0, tm: 4800, yoyTm: 8.1 },
    { nome: 'TOTVS BI & ANALYTICS', peso: 0.27, yoyProd: 9.4, tm: 6200, yoyTm: 3.7 },
    { nome: 'GESPLAN TESOURARIA', peso: 0.22, yoyProd: -11.3, tm: 8900, yoyTm: -5.0 },
    { nome: 'GOODDATA EMBEDDED', peso: 0.17, yoyProd: -21.5, tm: 4100, yoyTm: -12.8 }
  ]
};

const MOCK_CLIENTES_POR_CURVA = {
  'CURVA A': [
    { nome: 'VALVULAS FADEVA S/A', peso: 0.38, yoyProd: 24.5, tm: 42500, yoyTm: 15.0 },
    { nome: 'FUNDACAO FACULDADE DE MEDICINA', peso: 0.34, yoyProd: 11.2, tm: 38900, yoyTm: 7.4 },
    { nome: 'SUPERMERCADOS IDEAL LTDA', peso: 0.28, yoyProd: -12.4, tm: 31200, yoyTm: -6.8 }
  ],
  'CURVA B': [
    { nome: 'DOMO MINERALS S.A.S', peso: 0.35, yoyProd: 19.8, tm: 21400, yoyTm: 9.1 },
    { nome: 'DISTRIBUIDORA NACIONAL LOGISTICA', peso: 0.29, yoyProd: -8.7, tm: 18500, yoyTm: -4.2 },
    { nome: 'HOSPITAL SANTA JOANA LTDA', peso: 0.21, yoyProd: 14.3, tm: 16800, yoyTm: 5.6 },
    { nome: 'CONSTRUTORA HORIZONTE ENGENHARIA', peso: 0.15, yoyProd: -15.1, tm: 14900, yoyTm: -9.3 }
  ],
  'CURVA C': [
    { nome: 'SOLUS DO BRASIL LTDA', peso: 0.33, yoyProd: 31.2, tm: 9400, yoyTm: 12.5 },
    { nome: 'AGROPECUARIA BOM JESUS S/A', peso: 0.28, yoyProd: -6.4, tm: 8700, yoyTm: -2.9 },
    { nome: 'METALURGICA PROGRESSO IND', peso: 0.22, yoyProd: 8.9, tm: 7200, yoyTm: 4.1 },
    { nome: 'REDE EDUCACIONAL FUTURO', peso: 0.17, yoyProd: -19.2, tm: 6500, yoyTm: -11.0 }
  ]
};

export class ComposicaoVendas extends LitElement {
  static properties = {
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros Globais
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroSegmento: { type: Array },
    filtroTpUnidade: { type: Array },
    filtroTpReceita: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    kpisComposicao: { type: Object },
    historicoMensal: { type: Array },

    // Estado da Gaveta Hierárquica
    gavetaAberta: { type: Boolean },
    tipoDiagnostico: { type: String },
    nomeExibicaoDiagnostico: { type: String },
    segmentoAtivo: { type: String },
    curvaAbcAtiva: { type: String },
    subAbaNivel3: { type: String }, // 'oferta' | 'cliente'
    carregandoDiagnostico: { type: Boolean },
    itensDiagnostico: { type: Array },

    // Critério de Ordenação Ativo
    criterioOrdenacao: { type: String },

    // Modal Temporal 13 Meses em Qualquer Nível
    modal13MAberto: { type: Boolean },
    itemTemporalAtivo: { type: Object },
    carregando13M: { type: Boolean },
    dadosHistorico13M: { type: Array },
    metricaGrafico13M: { type: String } // 'PROD' | 'TM'
  };

  constructor() {
    super();
    this.carregando = true;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.filtroAno = ['2026'];
    this.filtroMes = ['1'];
    this.filtroSegmento = [];
    this.filtroTpUnidade = [];
    this.filtroTpReceita = [];

    this.kpisComposicao = {
      base: { key: 'BASE', nome: 'Base', receita: '-', yoyReceita: '-', recPos: null, qtd: '-', yoyQtd: '-', qtdPos: null, tm: '-', yoyTm: '-', tmPos: null, rawProd: 0 },
      novo: { key: 'NOVO', nome: 'Novo', receita: '-', yoyReceita: '-', recPos: null, qtd: '-', yoyQtd: '-', qtdPos: null, tm: '-', yoyTm: '-', tmPos: null, rawProd: 0 },
      adesao: { key: 'ADESAO', nome: 'Adesão', receita: '-', yoyReceita: '-', recPos: null, qtd: '-', yoyQtd: '-', qtdPos: null, tm: '-', yoyTm: '-', tmPos: null, rawProd: 0 }
    };

    this.historicoMensal = [];

    // Gaveta
    this.gavetaAberta = false;
    this.tipoDiagnostico = null;
    this.nomeExibicaoDiagnostico = '';
    this.segmentoAtivo = null;
    this.curvaAbcAtiva = null;
    this.subAbaNivel3 = 'oferta';
    this.carregandoDiagnostico = false;
    this.itensDiagnostico = [];
    this.criterioOrdenacao = 'rep_desc';

    // Modal 13M
    this.modal13MAberto = false;
    this.itemTemporalAtivo = null;
    this.carregando13M = false;
    this.dadosHistorico13M = [];
    this.metricaGrafico13M = 'PROD';
  }

  connectedCallback() {
    super.connectedCallback();
    this._fecharDropdownsAoClicarFora = (e) => {
      if (!e.composedPath().some(el => el.classList && el.classList.contains('filter-dropdown-container'))) {
        this.dropdownAberto = null;
      }
    };
    this._tecladoListener = (e) => {
      if (e.key === 'Escape') {
        if (this.modal13MAberto) {
          this.fecharModal13M();
        } else if (this.gavetaAberta) {
          this.fecharGaveta();
        }
      }
    };
    document.addEventListener('click', this._fecharDropdownsAoClicarFora);
    window.addEventListener('keydown', this._tecladoListener);
    this.carregarDados();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._fecharDropdownsAoClicarFora) {
      document.removeEventListener('click', this._fecharDropdownsAoClicarFora);
    }
    if (this._tecladoListener) {
      window.removeEventListener('keydown', this._tecladoListener);
    }
  }

  toggleDropdown(nome, e) {
    e.stopPropagation();
    this.dropdownAberto = this.dropdownAberto === nome ? null : nome;
  }

  toggleOpcao(propNome, valor) {
    const atual = [...this[propNome]];
    const index = atual.indexOf(valor);
    if (index > -1) {
      atual.splice(index, 1);
    } else {
      atual.push(valor);
    }
    this[propNome] = atual;
    this.carregarDados();
  }

  selecionarTodos(propNome, opcoes) {
    this[propNome] = opcoes.map(op => op.value);
    this.carregarDados();
  }

  limparFiltro(propNome) {
    this[propNome] = [];
    this.carregarDados();
  }

  setBusca(propNome, termo) {
    this.buscaFiltro = { ...this.buscaFiltro, [propNome]: termo.toLowerCase() };
  }

  formatTriggerText(selecionados, labelVazio, listaOpcoes) {
    if (!selecionados || selecionados.length === 0) return labelVazio;
    if (selecionados.length === 1) {
      const achado = listaOpcoes.find(o => o.value === selecionados[0]);
      return achado ? achado.label : selecionados[0];
    }
    return `${selecionados.length} selecionados`;
  }

  /* ==========================================
     GERAÇÃO DE DADOS MOCKADOS COERENTES
     ========================================== */
  _calcularFatorFiltros() {
    let fator = 1.0;
    if (this.filtroAno.length > 0) {
      const maxA = Math.max(...this.filtroAno.map(a => parseInt(a, 10)));
      fator *= (1 + (maxA - 2025) * 0.08);
      if (this.filtroAno.length > 1) fator *= (1 + (this.filtroAno.length - 1) * 0.65);
    }
    if (this.filtroMes.length > 0) {
      const maxM = Math.max(...this.filtroMes.map(m => parseInt(m, 10)));
      fator *= (0.92 + (maxM % 4) * 0.05);
      if (this.filtroMes.length > 1) fator *= (1 + (this.filtroMes.length - 1) * 0.72);
    }
    if (this.filtroSegmento.length > 0 && this.filtroSegmento.length < OPCOES_SEGMENTO.length) {
      fator *= Math.max(0.12, this.filtroSegmento.length * 0.14);
    }
    if (this.filtroTpUnidade.length > 0 && this.filtroTpUnidade.length < OPCOES_TP_UNIDADE.length) {
      fator *= Math.max(0.18, this.filtroTpUnidade.length * 0.22);
    }
    if (this.filtroTpReceita.length > 0 && this.filtroTpReceita.length < OPCOES_TP_RECEITA.length) {
      fator *= Math.max(0.20, this.filtroTpReceita.length * 0.25);
    }
    return fator;
  }

  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    await new Promise(resolve => setTimeout(resolve, 120));

    const fator = this._calcularFatorFiltros();
    const maxAno = this.filtroAno.length > 0 ? Math.max(...this.filtroAno.map(a => parseInt(a, 10))) : 2026;
    const maxMes = this.filtroMes.length > 0 ? Math.max(...this.filtroMes.map(m => parseInt(m, 10))) : 1;

    const prodBase = Math.round(94600000 * fator);
    const prodNovo = Math.round(21800000 * fator);
    const prodAdesao = Math.round(9400000 * fator);

    const qtdBase = Math.max(12, Math.round(6840 * fator));
    const qtdNovo = Math.max(5, Math.round(1420 * fator));
    const qtdAdesao = Math.max(4, Math.round(1150 * fator));

    const montarCard = (key, nome, prod, yoyP, qtd, yoyQ, yoyT) => {
      const fP = this.formatYoY(yoyP);
      const fQ = this.formatYoY(yoyQ);
      const fT = this.formatYoY(yoyT);
      const tm = qtd > 0 ? Math.round(prod / qtd) : 0;
      return {
        key,
        nome,
        rawProd: prod,
        receita: this.formatCompactCurrency(prod),
        yoyReceita: fP.texto,
        recPos: fP.isPos,
        qtd: qtd.toLocaleString('pt-BR'),
        yoyQtd: fQ.texto,
        qtdPos: fQ.isPos,
        tm: this.formatCurrencyInt(tm),
        yoyTm: fT.texto,
        tmPos: fT.isPos
      };
    };

    this.kpisComposicao = {
      base: montarCard('BASE', 'Base', prodBase, -7.4, qtdBase, -4.1, -3.5),
      novo: montarCard('NOVO', 'Novo', prodNovo, 18.6, qtdNovo, 11.2, 6.7),
      adesao: montarCard('ADESAO', 'Adesão', prodAdesao, 9.3, qtdAdesao, 5.8, 3.3)
    };

    // Histórico 13 meses móveis
    const monthsKeys = [];
    let currY = maxAno - 1;
    let currM = maxMes;
    for (let i = 0; i < 13; i++) {
      monthsKeys.push({ key: `${currY}/${String(currM).padStart(2, '0')}`, m: currM, idx: i });
      currM++;
      if (currM > 12) {
        currM = 1;
        currY++;
      }
    }

    this.historicoMensal = monthsKeys.map(({ key, m, idx }) => {
      const onda = Math.sin((m + idx) * 0.65);
      const basePct = 74.5 + onda * 2.8;
      const novoPct = 17.8 - onda * 1.9;
      const adesaoPct = Math.max(4.2, 100 - basePct - novoPct);
      const soma = basePct + novoPct + adesaoPct;
      return {
        mes: key,
        base: (basePct / soma) * 100,
        novo: (novoPct / soma) * 100,
        adesao: (adesaoPct / soma) * 100
      };
    });

    this.carregando = false;

    if (this.gavetaAberta && this.tipoDiagnostico) {
      if (this.curvaAbcAtiva && this.segmentoAtivo) {
        if (this.subAbaNivel3 === 'cliente') {
          this.carregarClientes(this.curvaAbcAtiva);
        } else {
          this.carregarOfertas(this.curvaAbcAtiva);
        }
      } else if (this.segmentoAtivo) {
        this.carregarCurvaAbc(this.segmentoAtivo);
      } else {
        this.carregarSegmentos(this.tipoDiagnostico);
      }
    }
  }

  /* =========================================================
     MECANISMO DE ORDENAÇÃO DINÂMICA
     ========================================================= */
  alterarOrdenacao(novoCriterio) {
    this.criterioOrdenacao = novoCriterio;
    this.itensDiagnostico = this.ordenarItens(this.itensDiagnostico, novoCriterio);
    this.requestUpdate();
  }

  ordenarItens(itens, criterio) {
    if (!itens || itens.length === 0) return [];
    const copia = [...itens];

    copia.sort((a, b) => {
      switch (criterio) {
        case 'rep_desc':
          return b.repPct - a.repPct;
        case 'rep_asc':
          return a.repPct - b.repPct;
        case 'prod_desc':
          return b.producao - a.producao;
        case 'prod_asc':
          return a.producao - b.producao;
        case 'yoy_prod_asc': {
          const valA = a.rawYoyProd !== null ? a.rawYoyProd : 999999;
          const valB = b.rawYoyProd !== null ? b.rawYoyProd : 999999;
          return valA - valB;
        }
        case 'yoy_prod_desc': {
          const valA = a.rawYoyProd !== null ? a.rawYoyProd : -999999;
          const valB = b.rawYoyProd !== null ? b.rawYoyProd : -999999;
          return valB - valA;
        }
        case 'tm_desc':
          return b.tmNum - a.tmNum;
        case 'tm_asc':
          return a.tmNum - b.tmNum;
        case 'yoy_tm_asc': {
          const valA = a.rawYoyTm !== null ? a.rawYoyTm : 999999;
          const valB = b.rawYoyTm !== null ? b.rawYoyTm : 999999;
          return valA - valB;
        }
        case 'yoy_tm_desc': {
          const valA = a.rawYoyTm !== null ? a.rawYoyTm : -999999;
          const valB = b.rawYoyTm !== null ? b.rawYoyTm : -999999;
          return valB - valA;
        }
        default:
          return b.repPct - a.repPct;
      }
    });

    return copia;
  }

  /* =========================================================
     DIAGNÓSTICO HIERÁRQUICO (SEGMENTO -> CURVA ABC -> OFERTA / CLIENTE)
     ========================================================= */
  abrirDiagnostico(tipo, nomeExibicao) {
    this.tipoDiagnostico = tipo;
    this.nomeExibicaoDiagnostico = nomeExibicao || tipo;
    this.segmentoAtivo = null;
    this.curvaAbcAtiva = null;
    this.subAbaNivel3 = 'oferta';
    this.itensDiagnostico = [];
    this.gavetaAberta = true;
    this.carregarSegmentos(tipo);
  }

  fecharGaveta() {
    this.gavetaAberta = false;
    this.tipoDiagnostico = null;
    this.nomeExibicaoDiagnostico = '';
    this.segmentoAtivo = null;
    this.curvaAbcAtiva = null;
    this.subAbaNivel3 = 'oferta';
  }

  voltarParaSegmentos() {
    this.segmentoAtivo = null;
    this.curvaAbcAtiva = null;
    this.subAbaNivel3 = 'oferta';
    this.carregarSegmentos(this.tipoDiagnostico);
  }

  voltarParaCurvaAbc() {
    this.curvaAbcAtiva = null;
    this.subAbaNivel3 = 'oferta';
    this.carregarCurvaAbc(this.segmentoAtivo);
  }

  alternarSubAbaNivel3(novaAba) {
    if (this.subAbaNivel3 === novaAba) return;
    this.subAbaNivel3 = novaAba;
    if (novaAba === 'cliente') {
      this.carregarClientes(this.curvaAbcAtiva);
    } else {
      this.carregarOfertas(this.curvaAbcAtiva);
    }
  }

  _obterTotalCategoriaAtual() {
    const k = (this.tipoDiagnostico || 'BASE').toLowerCase();
    return (this.kpisComposicao[k] && this.kpisComposicao[k].rawProd) || 50000000;
  }

  _finalizarItensMock(listaBruta, nivelNome) {
    const somaTotal = listaBruta.reduce((acc, it) => acc + it.producao, 0);
    const processados = listaBruta.map(it => {
      const repPct = somaTotal > 0 ? (it.producao / somaTotal) * 100 : 0;
      return {
        nome: it.nome,
        nivelNome,
        producao: it.producao,
        producaoFmt: this.formatCompactCurrency(it.producao),
        repPct,
        rawYoyProd: it.yoyProd,
        yoyProdObj: this.formatYoY(it.yoyProd),
        tmNum: it.tm,
        tmFmt: it.tm > 0 ? this.formatCurrencyInt(it.tm) : '-',
        rawYoyTm: it.yoyTm,
        yoyTmObj: this.formatYoY(it.yoyTm)
      };
    });
    return this.ordenarItens(processados, this.criterioOrdenacao);
  }

  // Nível 1: Segmentos
  async carregarSegmentos(tipo) {
    this.carregandoDiagnostico = true;
    await new Promise(resolve => setTimeout(resolve, 90));

    const totalCat = this._obterTotalCategoriaAtual();
    const ajusteTipo = tipo === 'NOVO' ? 1.15 : tipo === 'ADESAO' ? 0.92 : 1.0;

    let listaSegs = MOCK_SEGMENTOS_PESO;
    if (this.filtroSegmento.length > 0) {
      const filtrados = MOCK_SEGMENTOS_PESO.filter(s => this.filtroSegmento.includes(s.nome));
      if (filtrados.length > 0) listaSegs = filtrados;
    }

    const brutos = listaSegs.map((s, idx) => ({
      nome: s.nome,
      producao: Math.round(totalCat * s.peso),
      yoyProd: Number((s.yoyProd * ajusteTipo + (idx % 2 === 0 ? 1.5 : -1.2)).toFixed(1)),
      tm: Math.round(s.tmBase * ajusteTipo),
      yoyTm: Number((s.yoyTm * ajusteTipo).toFixed(1))
    }));

    this.itensDiagnostico = this._finalizarItensMock(brutos, 'segmento');
    this.carregandoDiagnostico = false;
  }

  // Nível 2: Classificação 1 da Curva ABC
  async carregarCurvaAbc(segmento) {
    this.segmentoAtivo = segmento;
    this.curvaAbcAtiva = null;
    this.subAbaNivel3 = 'oferta';
    this.carregandoDiagnostico = true;
    await new Promise(resolve => setTimeout(resolve, 90));

    const segObj = MOCK_SEGMENTOS_PESO.find(s => s.nome === segmento) || MOCK_SEGMENTOS_PESO[0];
    const prodSeg = Math.round(this._obterTotalCategoriaAtual() * segObj.peso);

    const brutos = [
      { nome: 'CURVA A', producao: Math.round(prodSeg * 0.70), yoyProd: Number((segObj.yoyProd + 4.8).toFixed(1)), tm: Math.round(segObj.tmBase * 1.35), yoyTm: Number((segObj.yoyTm + 3.2).toFixed(1)) },
      { nome: 'CURVA B', producao: Math.round(prodSeg * 0.20), yoyProd: Number((segObj.yoyProd - 3.5).toFixed(1)), tm: Math.round(segObj.tmBase * 0.90), yoyTm: Number((segObj.yoyTm - 2.1).toFixed(1)) },
      { nome: 'CURVA C', producao: Math.round(prodSeg * 0.10), yoyProd: Number((segObj.yoyProd - 11.2).toFixed(1)), tm: Math.round(segObj.tmBase * 0.55), yoyTm: Number((segObj.yoyTm - 6.4).toFixed(1)) }
    ];

    this.itensDiagnostico = this._finalizarItensMock(brutos, 'curva_abc');
    this.carregandoDiagnostico = false;
  }

  // Nível 3A: Ofertas
  async carregarOfertas(curvaAbc) {
    this.curvaAbcAtiva = curvaAbc;
    this.subAbaNivel3 = 'oferta';
    this.carregandoDiagnostico = true;
    await new Promise(resolve => setTimeout(resolve, 90));

    const segObj = MOCK_SEGMENTOS_PESO.find(s => s.nome === this.segmentoAtivo) || MOCK_SEGMENTOS_PESO[0];
    const pesoCurva = curvaAbc === 'CURVA A' ? 0.70 : curvaAbc === 'CURVA B' ? 0.20 : 0.10;
    const prodCurva = Math.round(this._obterTotalCategoriaAtual() * segObj.peso * pesoCurva);
    const ofertas = MOCK_OFERTAS_POR_CURVA[curvaAbc] || MOCK_OFERTAS_POR_CURVA['CURVA A'];

    const brutos = ofertas.map(of => ({
      nome: of.nome,
      producao: Math.round(prodCurva * of.peso),
      yoyProd: of.yoyProd,
      tm: of.tm,
      yoyTm: of.yoyTm
    }));

    this.itensDiagnostico = this._finalizarItensMock(brutos, 'oferta');
    this.carregandoDiagnostico = false;
  }

  // Nível 3B: Clientes
  async carregarClientes(curvaAbc) {
    this.curvaAbcAtiva = curvaAbc;
    this.subAbaNivel3 = 'cliente';
    this.carregandoDiagnostico = true;
    await new Promise(resolve => setTimeout(resolve, 90));

    const segObj = MOCK_SEGMENTOS_PESO.find(s => s.nome === this.segmentoAtivo) || MOCK_SEGMENTOS_PESO[0];
    const pesoCurva = curvaAbc === 'CURVA A' ? 0.70 : curvaAbc === 'CURVA B' ? 0.20 : 0.10;
    const prodCurva = Math.round(this._obterTotalCategoriaAtual() * segObj.peso * pesoCurva);
    const clientes = MOCK_CLIENTES_POR_CURVA[curvaAbc] || MOCK_CLIENTES_POR_CURVA['CURVA A'];

    const brutos = clientes.map(cli => ({
      nome: cli.nome,
      producao: Math.round(prodCurva * cli.peso),
      yoyProd: cli.yoyProd,
      tm: cli.tm,
      yoyTm: cli.yoyTm
    }));

    this.itensDiagnostico = this._finalizarItensMock(brutos, 'cliente');
    this.carregandoDiagnostico = false;
  }

  /* =========================================================
     MODAL DE HISTÓRICO TEMPORAL DE 13 MESES SOB DEMANDA
     ========================================================= */
  async abrirModal13M(item, e) {
    if (e) e.stopPropagation();
    this.itemTemporalAtivo = item;
    this.modal13MAberto = true;
    this.carregando13M = true;
    this.dadosHistorico13M = [];
    this.metricaGrafico13M = 'PROD';
    this.requestUpdate();

    await new Promise(resolve => setTimeout(resolve, 100));

    const maxAno = this.filtroAno.length > 0 ? Math.max(...this.filtroAno.map(a => parseInt(a, 10))) : 2026;
    const maxMes = this.filtroMes.length > 0 ? Math.max(...this.filtroMes.map(m => parseInt(m, 10))) : 1;

    const prodFinal = item.producao || 1200000;
    const tmFinal = item.tmNum || 12500;
    const yoyProdFactor = 1 + ((item.rawYoyProd || 10) / 100);
    const yoyTmFactor = 1 + ((item.rawYoyTm || 5) / 100);

    const prodInicial = yoyProdFactor > 0.1 ? prodFinal / yoyProdFactor : prodFinal * 0.85;
    const tmInicial = yoyTmFactor > 0.1 ? tmFinal / yoyTmFactor : tmFinal * 0.92;

    const series = [];
    let y = maxAno - 1;
    let m = maxMes;
    for (let i = 0; i < 13; i++) {
      const mStr = String(m).padStart(2, '0');
      const progresso = i / 12;
      const sazonalidade = i === 0 || i === 12 ? 1.0 : (0.86 + Math.sin(i * 0.9) * 0.14);

      const pInterpolado = (prodInicial + (prodFinal - prodInicial) * progresso) * sazonalidade;
      const tmInterpolado = (tmInicial + (tmFinal - tmInicial) * progresso) * (0.94 + Math.cos(i * 0.8) * 0.06);

      series.push({
        mes: `${y}/${mStr}`,
        fullKey: `${y}/${mStr}`,
        prod: Math.round(pInterpolado),
        tm: Math.round(tmInterpolado)
      });

      m++;
      if (m > 12) { m = 1; y++; }
    }

    this.dadosHistorico13M = series;
    this.carregando13M = false;
    this.requestUpdate();
  }

  fecharModal13M() {
    this.modal13MAberto = false;
    this.itemTemporalAtivo = null;
    this.dadosHistorico13M = [];
    this.requestUpdate();
  }

  /* =========================================================
     HELPERS DE FORMATAÇÃO
     ========================================================= */
  formatCompactCurrency(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '-';
    const num = Number(val);
    if (Math.abs(num) >= 1000000) {
      return 'R$ ' + (num / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
    }
    if (Math.abs(num) >= 1000) {
      return 'R$ ' + (num / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mil';
    }
    return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatCurrencyInt(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '-';
    return 'R$ ' + Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatYoY(num) {
    if (num === null || num === undefined || isNaN(num)) return { texto: '-', isPos: null, rawNum: null };
    const isPos = num > 0 ? true : num < 0 ? false : 'zero';
    const sinal = num > 0 ? '+' : '';
    const texto = `${sinal}${Number(num).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
    return { texto, isPos, rawNum: Number(num) };
  }

  renderMiniYoY(valor, isPos) {
    if (valor === '-' || isPos === null) {
      return html`<span class="mini-yoy mini-muted">-</span>`;
    }
    if (isPos === true) {
      return html`<span class="mini-yoy mini-pos"><span class="arrow">↗</span> ${valor}</span>`;
    }
    if (isPos === false) {
      return html`<span class="mini-yoy mini-neg"><span class="arrow">↘</span> ${valor}</span>`;
    }
    return html`<span class="mini-yoy mini-muted">${valor}</span>`;
  }

  renderDropdownFiltro(titulo, propNome, labelVazio, listaOpcoes) {
    const selecionados = this[propNome] || [];
    const aberto = this.dropdownAberto === propNome;
    const busca = (this.buscaFiltro && this.buscaFiltro[propNome]) || '';
    const opcoesFiltradas = listaOpcoes.filter(op => op.label.toLowerCase().includes(busca));

    return html`
      <div class="filter-dropdown-container">
        <label class="filter-label">${titulo}</label>
        <button class="filter-trigger-btn ${aberto ? 'active' : ''}" @click="${(e) => this.toggleDropdown(propNome, e)}">
          <span class="filter-trigger-text">${this.formatTriggerText(selecionados, labelVazio, listaOpcoes)}</span>
          <span class="filter-arrow">▾</span>
        </button>

        ${aberto ? html`
          <div class="filter-menu-popover" @click="${(e) => e.stopPropagation()}">
            <div class="popover-actions">
              <button class="popover-action-btn" @click="${() => this.selecionarTodos(propNome, listaOpcoes)}">Todos</button>
              <button class="popover-action-btn" @click="${() => this.limparFiltro(propNome)}">Limpar</button>
            </div>

            ${listaOpcoes.length > 6 ? html`
              <input 
                type="text" 
                class="popover-search" 
                placeholder="Buscar..." 
                .value="${busca}" 
                @input="${(e) => this.setBusca(propNome, e.target.value)}"
              />
            ` : ''}

            <div class="popover-list">
              ${opcoesFiltradas.map(op => html`
                <label class="popover-item">
                  <input 
                    type="checkbox" 
                    .checked="${selecionados.includes(op.value)}" 
                    @change="${() => this.toggleOpcao(propNome, op.value)}"
                  />
                  <span>${op.label}</span>
                </label>
              `)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  /* =========================================================
     MODAL DE HISTÓRICO TEMPORAL 13 MESES
     ========================================================= */
  renderModal13M() {
    if (!this.modal13MAberto || !this.itemTemporalAtivo) return '';

    const isProd = this.metricaGrafico13M === 'PROD';
    const dados13 = this.dadosHistorico13M || [];
    const item = this.itemTemporalAtivo;
    const cor = '#7c3aed';

    const valores = dados13.map(d => isProd ? d.prod : d.tm);
    const maxVal = Math.max(...valores, 1);
    const vFirst = valores[0] || 0;
    const vLast = valores[valores.length - 1] || 0;
    const diffPct = vFirst > 0 ? ((vLast - vFirst) / vFirst) * 100 : (vLast > 0 ? 100 : 0);
    const isYoYPos = diffPct >= 0;

    return html`
      <div class="modal-backdrop-blur" @click="${() => this.fecharModal13M()}">
        <div class="modal-window-65" @click="${(e) => e.stopPropagation()}">
          
          <div class="modal-head">
            <div>
              <div class="modal-crumb-tag">
                <span>Composição</span>
                <span>/</span>
                <span>${this.nomeExibicaoDiagnostico}</span>
                ${this.segmentoAtivo ? html`<span>/</span><span>${this.segmentoAtivo}</span>` : ''}
                ${this.curvaAbcAtiva ? html`<span>/</span><span>${this.curvaAbcAtiva}</span>` : ''}
              </div>
              <h2 class="modal-head-title">${item.nome}</h2>
              <div class="modal-kpi-sub">
                <span>Variação Homóloga (${dados13[0]?.mes} vs ${dados13[dados13.length - 1]?.mes}):</span>
                <strong style="color: ${isYoYPos ? '#16a34a' : '#dc2626'}; font-size: 13px;">
                  ${isYoYPos ? '↗ +' : '↘ '}${diffPct.toFixed(1).replace('.', ',')}% YoY
                </strong>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="modal-tab-switch">
                <button class="${isProd ? 'active' : ''}" @click="${() => { this.metricaGrafico13M = 'PROD'; this.requestUpdate(); }}">
                  Produção (R$)
                </button>
                <button class="${!isProd ? 'active' : ''}" @click="${() => { this.metricaGrafico13M = 'TM'; this.requestUpdate(); }}">
                  Ticket Médio
                </button>
              </div>
              <button class="modal-btn-close" @click="${() => this.fecharModal13M()}" title="Fechar (Esc)">✕</button>
            </div>
          </div>

          <div class="modal-chart-area">
            ${this.carregando13M ? html`
              <div class="drawer-loading">
                <div class="spinner"></div>
                <span>Carregando histórico temporal de 13 meses...</span>
              </div>
            ` : dados13.length === 0 ? html`
              <div class="drawer-empty">Sem dados históricos registrados para este período.</div>
            ` : html`
              <div class="bars-13-flex">
                ${dados13.map((d, idx) => {
                  const val = isProd ? d.prod : d.tm;
                  const pctHeight = Math.max((val / maxVal) * 100, 4);
                  const isFirst = idx === 0;
                  const isLast = idx === dados13.length - 1;

                  return html`
                    <div class="bar-col-13">
                      <span class="bar-val-13 ${isLast ? 'val-current' : ''}">
                        ${isProd ? this.formatCompactCurrency(val) : this.formatCurrencyInt(val)}
                      </span>
                      <div class="bar-track-13">
                        <div class="bar-fill-13" 
                             style="height: ${pctHeight}%; background-color: ${isLast ? cor : isFirst ? '#94a3b8' : '#cbd5e1'};">
                        </div>
                      </div>
                      <span class="bar-lbl-13 ${isLast ? 'lbl-current' : ''}">${d.mes}</span>
                    </div>
                  `;
                })}
              </div>
            `}
          </div>

          <div class="modal-foot">
            <div class="modal-chips">
              <span class="chip-item"><span class="chip-box" style="background: #94a3b8;"></span> ${dados13[0]?.mes} (Base Ano Anterior)</span>
              <span class="chip-item"><span class="chip-box" style="background: ${cor};"></span> ${dados13[dados13.length - 1]?.mes} (Mês Atual)</span>
            </div>
            <button class="btn-fechar-modal" @click="${() => this.fecharModal13M()}">Fechar (Esc)</button>
          </div>

        </div>
      </div>
    `;
  }

  /* =========================================================
     GAVETA AMPLA COM 3 NÍVEIS E BIFURCAÇÃO OFERTAS / CLIENTES
     ========================================================= */
  renderGaveta() {
    if (!this.gavetaAberta) return '';

    const nivelAtual = this.curvaAbcAtiva 
      ? (this.subAbaNivel3 === 'cliente' ? 'cliente' : 'oferta')
      : this.segmentoAtivo ? 'curva_abc' : 'segmento';
    
    let tituloNivel = '';
    let subtituloNivel = '';

    if (nivelAtual === 'segmento') {
      tituloNivel = `Segmentos de ${this.nomeExibicaoDiagnostico}`;
      subtituloNivel = 'Detalhamento por vertical de negócio. Clique para abrir a Curva ABC ou expanda o histórico de 13 meses.';
    } else if (nivelAtual === 'curva_abc') {
      tituloNivel = `Curva ABC em ${this.segmentoAtivo}`;
      subtituloNivel = 'Detalhamento por Classificação 1 da Curva ABC. Clique para detalhar Ofertas e Clientes associados.';
    } else if (nivelAtual === 'cliente') {
      tituloNivel = `Carteira de Clientes da Classe ${this.curvaAbcAtiva}`;
      subtituloNivel = `Detalhamento por Cliente (NM_CLIENTE) no segmento ${this.segmentoAtivo}.`;
    } else {
      tituloNivel = `Ofertas Comerciais da Classe ${this.curvaAbcAtiva}`;
      subtituloNivel = `Detalhamento por Oferta comercial (NM_OFERTA) no segmento ${this.segmentoAtivo}.`;
    }

    return html`
      <div class="drawer-backdrop" @click="${() => this.fecharGaveta()}"></div>
      <div class="drawer-panel" @click="${(e) => e.stopPropagation()}">
        
        <div class="drawer-header">
          <div>
            <div class="drawer-breadcrumb">
              <span class="breadcrumb-item" @click="${() => this.fecharGaveta()}">Composição</span>
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-item ${nivelAtual === 'segmento' ? 'current' : ''}" @click="${() => this.voltarParaSegmentos()}">${this.nomeExibicaoDiagnostico}</span>
              
              ${this.segmentoAtivo ? html`
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-item ${nivelAtual === 'curva_abc' ? 'current' : ''}" @click="${() => this.voltarParaCurvaAbc()}">${this.segmentoAtivo}</span>
              ` : ''}

              ${this.curvaAbcAtiva ? html`
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-item ${nivelAtual === 'oferta' || nivelAtual === 'cliente' ? 'current' : ''}">${this.curvaAbcAtiva}</span>
              ` : ''}

              ${this.curvaAbcAtiva ? html`
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-item current">${this.subAbaNivel3 === 'cliente' ? 'Clientes' : 'Ofertas'}</span>
              ` : ''}
            </div>
            <h2 class="drawer-title">${tituloNivel}</h2>
            <div class="drawer-subtitle">${subtituloNivel}</div>
          </div>
          <button class="drawer-close-btn" @click="${() => this.fecharGaveta()}" title="Fechar (Esc)">✕</button>
        </div>

        <!-- BARRA DE CONTROLE: ORDENAÇÃO + BIFURCAÇÃO OFERTAS / CLIENTES -->
        <div class="drawer-sort-bar">
          <div class="sort-bar-left">
            <span class="sort-bar-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="11" y1="5" x2="11" y2="19"></line>
                <polyline points="7 9 11 5 15 9"></polyline>
                <line x1="18" y1="19" x2="18" y2="11"></line>
                <polyline points="14 15 18 19 22 15"></polyline>
              </svg>
              ORDENAR POR:
            </span>
            <div class="sort-select-wrapper">
              <select class="sort-select" .value="${this.criterioOrdenacao}" @change="${(e) => this.alterarOrdenacao(e.target.value)}">
                <option value="rep_desc">Maior Representatividade (Padrão)</option>
                <option value="rep_asc">Menor Representatividade (%)</option>
                <option value="prod_desc">Maior Produção (R$)</option>
                <option value="prod_asc">Menor Produção (R$)</option>
                <option value="yoy_prod_asc">⚠️ Menor YoY Produção (Detratores / Alerta)</option>
                <option value="yoy_prod_desc">🚀 Maior YoY Produção (Maior Crescimento)</option>
                <option value="tm_desc">Maior Ticket Médio (R$)</option>
                <option value="tm_asc">Menor Ticket Médio (R$)</option>
                <option value="yoy_tm_asc">⚠️ Menor YoY Ticket Médio (Contração)</option>
                <option value="yoy_tm_desc">🚀 Maior YoY Ticket Médio (Expansão)</option>
              </select>
            </div>
          </div>

          <div class="sort-bar-right">
            <!-- BIFURCAÇÃO OFERTAS VS CLIENTES NO NÍVEL 3 -->
            ${this.curvaAbcAtiva ? html`
              <div class="tabs-subnivel3">
                <button class="${this.subAbaNivel3 === 'oferta' ? 'active' : ''}" 
                        @click="${() => this.alternarSubAbaNivel3('oferta')}">
                  📦 Ver Ofertas
                </button>
                <button class="${this.subAbaNivel3 === 'cliente' ? 'active' : ''}" 
                        @click="${() => this.alternarSubAbaNivel3('cliente')}">
                  🏢 Ver Clientes
                </button>
              </div>
            ` : ''}

            <span class="sort-count-badge">${this.itensDiagnostico.length} ${this.itensDiagnostico.length === 1 ? 'item' : 'itens'}</span>
          </div>
        </div>

        <div class="drawer-body">
          ${this.carregandoDiagnostico ? html`
            <div class="drawer-loading">
              <div class="spinner"></div>
              <span>Carregando detalhamento...</span>
            </div>
          ` : this.itensDiagnostico.length === 0 ? html`
            <div class="drawer-empty">Nenhum registro encontrado para este filtro.</div>
          ` : html`
            <div class="diagnostic-table-wrapper">
              <table class="diagnostic-table">
                <thead>
                  <tr>
                    <th style="width: 34%;">
                      ${nivelAtual === 'segmento' ? 'Segmento' : nivelAtual === 'curva_abc' ? 'Classificação 1 (Curva ABC)' : (nivelAtual === 'cliente' ? 'Cliente' : 'Oferta')}
                    </th>
                    <th style="width: 20%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'prod_desc' ? 'prod_asc' : 'prod_desc')}"
                        title="Clique para alternar ordenação por Produção">
                      Produção ${this.criterioOrdenacao.startsWith('prod') ? (this.criterioOrdenacao === 'prod_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 18%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'rep_desc' ? 'rep_asc' : 'rep_desc')}"
                        title="Clique para alternar ordenação por Representatividade">
                      Repr. (%) ${this.criterioOrdenacao.startsWith('rep') ? (this.criterioOrdenacao === 'rep_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 20%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'tm_desc' ? 'tm_asc' : 'tm_desc')}"
                        title="Clique para alternar ordenação por Ticket Médio">
                      Ticket Médio ${this.criterioOrdenacao.startsWith('tm') ? (this.criterioOrdenacao === 'tm_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 8%; text-align: center;">13M</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.itensDiagnostico.map(item => {
                    const isRowClickable = nivelAtual === 'segmento' || nivelAtual === 'curva_abc';
                    const onRowClick = () => {
                      if (nivelAtual === 'segmento') this.carregarCurvaAbc(item.nome);
                      else if (nivelAtual === 'curva_abc') this.carregarOfertas(item.nome);
                    };

                    return html`
                      <tr class="${isRowClickable ? 'clickable-row' : ''}" @click="${onRowClick}">
                        <td>
                          <div class="row-title-container">
                            <span class="row-name">${item.nome}</span>
                            ${isRowClickable ? html`
                              <span class="row-drill-hint">
                                ${nivelAtual === 'segmento' ? 'Ver Curva ABC ›' : 'Ver Ofertas / Clientes ›'}
                              </span>
                            ` : ''}
                          </div>
                        </td>
                        
                        <td style="text-align: right;">
                          <div class="stacked-metric">
                            <div class="stacked-yoy">
                              ${this.renderMiniYoY(item.yoyProdObj.texto, item.yoyProdObj.isPos)}
                            </div>
                            <div class="stacked-value">${item.producaoFmt}</div>
                          </div>
                        </td>

                        <td style="text-align: right;">
                          <div class="rep-cell">
                            <span class="rep-number">${item.repPct.toFixed(1).replace('.', ',')}%</span>
                            <div class="rep-progress-track">
                              <div class="rep-progress-fill" style="width: ${Math.min(item.repPct, 100)}%;"></div>
                            </div>
                          </div>
                        </td>

                        <td style="text-align: right;">
                          <div class="stacked-metric">
                            <div class="stacked-yoy">
                              ${this.renderMiniYoY(item.yoyTmObj.texto, item.yoyTmObj.isPos)}
                            </div>
                            <div class="stacked-value">${item.tmFmt}</div>
                          </div>
                        </td>

                        <td style="text-align: center;">
                          <button class="btn-expand-13m" 
                                  @click="${(e) => this.abrirModal13M(item, e)}"
                                  title="Expandir evolução de 13 meses móveis">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <polyline points="9 21 3 21 3 15"></polyline>
                              <line x1="21" y1="3" x2="14" y2="10"></line>
                              <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <div class="drawer-footer">
          ${nivelAtual === 'oferta' || nivelAtual === 'cliente' ? html`
            <button class="btn-drawer-secondary" @click="${() => this.voltarParaCurvaAbc()}">
              ‹ Voltar para Curva ABC (${this.segmentoAtivo})
            </button>
          ` : nivelAtual === 'curva_abc' ? html`
            <button class="btn-drawer-secondary" @click="${() => this.voltarParaSegmentos()}">
              ‹ Voltar para Segmentos
            </button>
          ` : html`<div></div>`}
          
          <div class="drawer-caption">Pressione <kbd>Esc</kbd> para fechar</div>
        </div>

      </div>
    `;
  }

  render() {
    const { base, novo, adesao } = this.kpisComposicao;

    const renderCard = (card) => {
      const isAlert = card.recPos === false;

      return html`
        <div class="kpi-card ${isAlert ? 'kpi-card-alert' : ''}">
          <div class="kpi-card-header">
            <span class="kpi-card-title ${isAlert ? 'title-alert' : ''}">${card.nome}</span>
            ${isAlert ? html`
              <span class="kpi-alert-badge">${card.yoyReceita} ALERTA</span>
            ` : html`
              <span class="kpi-yoy-badge ${card.recPos ? 'pos' : ''}">${card.yoyReceita}</span>
            `}
          </div>

          <div class="kpi-card-value ${isAlert ? 'value-alert' : ''}">
            ${card.receita}
          </div>

          <div class="kpi-card-submetrics">
            <span>Volume <strong class="${card.qtdPos ? 'sub-pos' : card.qtdPos === false ? 'sub-neg' : ''}">${card.yoyQtd}</strong></span>
            <span class="sub-dot">•</span>
            <span>Ticket <strong class="${card.tmPos ? 'sub-pos' : card.tmPos === false ? 'sub-neg' : ''}">${card.yoyTm}</strong></span>
          </div>

          <button class="kpi-action-btn ${isAlert ? 'action-alert' : ''}" 
                  @click="${() => this.abrirDiagnostico(card.key, card.nome)}">
            <span>Clique para Diagnosticar</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      `;
    };

    return html`
      <style>
        * { box-sizing: border-box; }

        @keyframes spinMesh {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .dash-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #e2e8f0;
          min-height: 100vh;
          color: #0f172a;
          padding: 24px 28px 48px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .dash-container::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.40), transparent 50%),
                      radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.35), transparent 55%),
                      radial-gradient(circle at 40% 80%, rgba(10, 25, 47, 0.40), transparent 50%);
          background-size: 100% 100%;
          animation: spinMesh 28s linear infinite;
          z-index: 0;
          pointer-events: none;
        }

        .hero-banner {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 18px 24px;
          margin-bottom: 14px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          min-height: 85px;
          overflow: hidden;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        .gradient-slant {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 48%;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%);
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
          z-index: 1;
        }

        .totvs-logo-layer {
          position: absolute;
          right: 80px;
          top: 50%;
          transform: translateY(-50%);
          width: 80px;
          height: 80px;
          background-size: contain;
          background-position: right center;
          background-repeat: no-repeat;
          z-index: 2;
          pointer-events: none;
        }

        .title-area {
          position: relative;
          z-index: 3;
          flex: 1;
        }

        .title-area h1 {
          font-size: 24px;
          font-weight: 900;
          margin: 0;
          color: #000;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        /* FILTROS */
        .filter-bar {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 14px 20px;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          position: relative;
          z-index: 10;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: flex-end;
          border: 1px solid rgba(255,255,255,0.8);
        }

        .filter-dropdown-container {
          position: relative;
          flex: 1;
          min-width: 150px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .filter-label {
          font-size: 11px;
          font-weight: 800;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .filter-trigger-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 12px;
          color: #0f172a;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          height: 35px;
          box-sizing: border-box;
        }

        .filter-trigger-btn:hover, .filter-trigger-btn.active {
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.15);
        }

        .filter-trigger-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
        }

        .filter-arrow {
          font-size: 10px;
          color: #64748b;
          margin-left: 6px;
        }

        .filter-menu-popover {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 6px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
          z-index: 100;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .popover-actions {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 6px;
        }

        .popover-action-btn {
          background: transparent;
          border: none;
          color: #7c3aed;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          padding: 2px 4px;
        }

        .popover-action-btn:hover {
          text-decoration: underline;
        }

        .popover-search {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 11px;
          outline: none;
        }

        .popover-search:focus {
          border-color: #7c3aed;
        }

        .popover-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .popover-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 6px;
          font-size: 11.5px;
          color: #334155;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.15s;
        }

        .popover-item:hover {
          background: #f8fafc;
        }

        .popover-item input[type="checkbox"] {
          cursor: pointer;
          width: 14px;
          height: 14px;
          accent-color: #7c3aed;
        }

        /* 3 CARDS HORIZONTAIS */
        .kpis-horizontal-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .kpi-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px 22px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .kpi-card-alert {
          border: 1.5px solid #ef4444;
          background: #fffdfd;
        }

        .kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .kpi-card-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.2px;
        }

        .kpi-card-title.title-alert {
          color: #991b1b;
        }

        .kpi-yoy-badge {
          font-size: 13px;
          font-weight: 800;
          color: #64748b;
        }

        .kpi-yoy-badge.pos {
          color: #059669;
        }

        .kpi-alert-badge {
          background: #dc2626;
          color: #ffffff;
          font-size: 11px;
          font-weight: 900;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.3px;
        }

        .kpi-card-value {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .kpi-card-value.value-alert {
          color: #dc2626;
        }

        .kpi-card-submetrics {
          font-size: 12.5px;
          color: #64748b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        .sub-dot {
          color: #cbd5e1;
        }

        .sub-pos {
          color: #059669;
          font-weight: 800;
        }

        .sub-neg {
          color: #dc2626;
          font-weight: 800;
        }

        .kpi-action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 800;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .kpi-action-btn:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .kpi-action-btn.action-alert {
          border-color: #fca5a5;
          background: #ffffff;
          color: #dc2626;
        }

        .kpi-action-btn.action-alert:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
        }

        .btn-arrow {
          font-size: 14px;
        }

        /* CARD HISTÓRICO DE COMPOSIÇÃO */
        .history-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 26px 28px;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          position: relative;
          z-index: 1;
        }

        .history-title {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 20px 0;
        }

        .stacked-bars-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          height: 360px;
          padding: 10px 14px;
          overflow-x: auto;
        }

        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          min-width: 52px;
        }

        .stacked-bar {
          width: 100%;
          max-width: 54px;
          flex: 1;
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          overflow: visible;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stacked-bar:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
        }

        .bar-slice-adesao {
          background-color: #94a3b8;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9.5px;
          font-weight: 900;
          overflow: visible;
          white-space: nowrap;
          transition: height 0.3s ease;
          position: relative;
          z-index: 3;
        }

        .bar-slice-novo {
          background-color: #002b49;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 900;
          overflow: visible;
          white-space: nowrap;
          transition: height 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .bar-slice-base {
          background-color: #a855f7;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10.5px;
          font-weight: 900;
          overflow: visible;
          white-space: nowrap;
          transition: height 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .bar-date-label {
          margin-top: 12px;
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          white-space: nowrap;
        }

        .history-bottom-legend {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 28px;
          margin-top: 22px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
          text-transform: uppercase;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        /* GAVETA EXPANDIDA (65VW) */
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(4px);
          z-index: 999;
        }

        .drawer-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 65vw;
          min-width: 760px;
          max-width: 95vw;
          height: 100vh;
          background: #ffffff;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.25);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 22px 30px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #f8fafc;
        }

        .drawer-breadcrumb {
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .breadcrumb-item {
          cursor: pointer;
        }

        .breadcrumb-item:hover {
          color: #7c3aed;
        }

        .breadcrumb-item.current {
          color: #0f172a;
          pointer-events: none;
        }

        .breadcrumb-sep {
          color: #cbd5e1;
        }

        .drawer-title {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
        }

        .drawer-subtitle {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.4;
        }

        .drawer-close-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          font-size: 14px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .drawer-close-btn:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .drawer-sort-bar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .sort-bar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-bar-label {
          font-size: 11px;
          font-weight: 900;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.4px;
        }

        .sort-select-wrapper {
          position: relative;
        }

        .sort-select {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .sort-select:hover, .sort-select:focus {
          border-color: #7c3aed;
        }

        .sort-bar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sort-count-badge {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: 12px;
        }

        /* SELETOR DE BIFURCAÇÃO OFERTAS / CLIENTES */
        .tabs-subnivel3 {
          display: inline-flex;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 2px;
          gap: 2px;
        }

        .tabs-subnivel3 button {
          background: transparent;
          border: none;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .tabs-subnivel3 button.active {
          background: #7c3aed;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.25);
        }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 30px;
        }

        .diagnostic-table-wrapper {
          overflow-x: auto;
        }

        .diagnostic-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .diagnostic-table th {
          font-size: 11.5px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          padding: 12px 14px;
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 2;
          user-select: none;
        }

        .diagnostic-table th:hover {
          color: #7c3aed;
        }

        .diagnostic-table td {
          padding: 14px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
          vertical-align: middle;
        }

        .clickable-row {
          cursor: pointer;
          transition: background 0.15s;
        }

        .clickable-row:hover {
          background: #f8fafc;
        }

        .row-title-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .row-name {
          font-weight: 800;
          color: #0f172a;
          font-size: 13.5px;
        }

        .row-drill-hint {
          font-size: 11px;
          color: #7c3aed;
          font-weight: 700;
        }

        .stacked-metric {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .stacked-yoy {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .mini-yoy {
          font-size: 11px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          line-height: 1.1;
        }

        .mini-pos {
          color: #16a34a;
        }

        .mini-neg {
          color: #dc2626;
          background: #fee2e2;
          padding: 1px 5px;
          border-radius: 4px;
        }

        .mini-muted {
          color: #94a3b8;
        }

        .stacked-value {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }

        .rep-cell {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .rep-number {
          font-weight: 800;
          color: #334155;
        }

        .rep-progress-track {
          width: 80px;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .rep-progress-fill {
          height: 100%;
          background: #7c3aed;
          border-radius: 2px;
        }

        /* BOTÃO DE EXPANSÃO 13M NA TABELA */
        .btn-expand-13m {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-expand-13m:hover {
          background: #7c3aed;
          color: #ffffff;
          border-color: #7c3aed;
          transform: scale(1.08);
        }

        .drawer-footer {
          padding: 16px 30px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-drawer-secondary {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-drawer-secondary:hover {
          border-color: #7c3aed;
          color: #7c3aed;
        }

        .drawer-caption {
          font-size: 11.5px;
          color: #94a3b8;
          font-weight: 600;
        }

        kbd {
          background: #e2e8f0;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: inherit;
          font-size: 10.5px;
          color: #475569;
        }

        .drawer-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 260px;
          gap: 14px;
          color: #64748b;
          font-weight: 700;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e2e8f0;
          border-top-color: #7c3aed;
          border-radius: 50%;
          animation: spinMesh 0.8s linear infinite;
        }

        .drawer-empty {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
          font-weight: 700;
        }

        .state-feedback {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-weight: 700;
        }

        /* MODAL TEMPORAL 13 MESES */
        .modal-backdrop-blur {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.70);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalFade 0.2s ease;
        }
        @keyframes modalFade { from { opacity: 0; } to { opacity: 1; } }

        .modal-window-65 {
          background: #ffffff;
          width: 65vw;
          min-width: 800px;
          max-width: 1200px;
          min-height: 520px;
          max-height: 86vh;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-head {
          padding: 22px 30px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-shrink: 0;
        }

        .modal-crumb-tag {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
        }

        .modal-head-title {
          font-size: 20px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .modal-kpi-sub {
          font-size: 12.5px;
          color: #475569;
          display: flex;
          gap: 8px;
        }

        .modal-tab-switch {
          display: inline-flex;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 2px;
          gap: 2px;
        }

        .modal-tab-switch button {
          background: transparent;
          border: none;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .modal-tab-switch button.active {
          background: #002b49;
          color: #ffffff;
        }

        .modal-btn-close {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .modal-btn-close:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .modal-chart-area {
          padding: 28px 30px;
          background: #ffffff;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .bars-13-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 260px;
          gap: 10px;
        }

        .bar-col-13 {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .bar-val-13 {
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          margin-bottom: 6px;
          white-space: nowrap;
        }

        .bar-val-13.val-current {
          color: #0f172a;
          font-weight: 900;
          font-size: 11.5px;
        }

        .bar-track-13 {
          flex: 1;
          width: 100%;
          max-width: 40px;
          display: flex;
          align-items: flex-end;
        }

        .bar-fill-13 {
          width: 100%;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .bar-lbl-13 {
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          margin-top: 8px;
          white-space: nowrap;
        }

        .bar-lbl-13.lbl-current {
          color: #0f172a;
          font-weight: 900;
        }

        .modal-foot {
          padding: 14px 30px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .modal-chips {
          display: flex;
          gap: 16px;
          font-size: 11.5px;
          font-weight: 700;
          color: #475569;
        }

        .chip-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chip-box {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        .btn-fechar-modal {
          background: #002b49;
          color: #ffffff;
          border: none;
          padding: 7px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO HERO OFICIAL TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="title-area">
            <h1>COMPOSIÇÃO DAS VENDAS</h1>
          </div>
        </div>

        <!-- FILTROS MULTI-SELECT -->
        <div class="filter-bar">
          ${this.renderDropdownFiltro('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdownFiltro('MÊS REFERÊNCIA', 'filtroMes', 'Todos os meses', OPCOES_MES)}
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', OPCOES_TP_UNIDADE)}
          ${this.renderDropdownFiltro('TIPO RECEITA', 'filtroTpReceita', 'Todas as receitas', OPCOES_TP_RECEITA)}
        </div>

        ${this.erro ? html`
          <div class="state-feedback" style="background: #fee2e2; color: #b91c1c; border-radius: 8px; margin-bottom: 16px;">
            ⚠️ ${this.erro}
          </div>
        ` : ''}

        <!-- 3 CARDS HORIZONTAIS -->
        <div class="kpis-horizontal-row">
          ${renderCard(base)}
          ${renderCard(novo)}
          ${renderCard(adesao)}
        </div>

        <!-- HISTÓRICO DE COMPOSIÇÃO -->
        <div class="history-card">
          <h2 class="history-title">COMPOSIÇÃO</h2>
          
          <div class="stacked-bars-container">
            ${this.historicoMensal.map(item => html`
              <div class="bar-col">
                <div class="stacked-bar">
                  ${item.adesao > 0 ? html`
                    <div class="bar-slice-adesao" style="height: ${item.adesao}%;">
                      <span>${item.adesao.toFixed(1).replace('.', ',')}%</span>
                    </div>
                  ` : ''}
                  ${item.novo > 0 ? html`
                    <div class="bar-slice-novo" style="height: ${item.novo}%;">
                      <span>${item.novo.toFixed(1).replace('.', ',')}%</span>
                    </div>
                  ` : ''}
                  ${item.base > 0 ? html`
                    <div class="bar-slice-base" style="height: ${item.base}%;">
                      <span>${item.base.toFixed(1).replace('.', ',')}%</span>
                    </div>
                  ` : ''}
                </div>
                <div class="bar-date-label">${item.mes}</div>
              </div>
            `)}
          </div>

          <div class="history-bottom-legend">
            <div class="legend-item"><span class="legend-dot" style="background: #a855f7;"></span><span>BASE</span></div>
            <div class="legend-item"><span class="legend-dot" style="background: #002b49;"></span><span>NOVO</span></div>
            <div class="legend-item"><span class="legend-dot" style="background: #94a3b8;"></span><span>ADESÃO</span></div>
          </div>
        </div>

        <!-- GAVETA HIERÁRQUICA -->
        ${this.renderGaveta()}

        <!-- MODAL DE HISTÓRICO TEMPORAL 13M EM QUALQUER NÍVEL -->
        ${this.renderModal13M()}

      </div>
    `;
  }
}

customElements.define(elementName, ComposicaoVendas);
