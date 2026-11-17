/**
 * @title Performance Segmentos V2 (Laboratório de Inovação)
 * @description Layout Oficial TOTVS Preservado + Treemap Squarified com Faixa Tática Limpa,
 *              Hover Sutil Acinzentado (Clique para abrir o Raio-X),
 *              Modal Temporal de 13 Meses (Qtd, TM e Produção por Segmento, Oferta e Cliente) e Modal Ampliado de Curva ABC, Ofertas & Clientes (72vw + Blur).
 *
 * @looker-dashboard-id   30
 * @looker-instance       https://totvslooker.cloud.looker.com
 * @published-by          TOTVS Product & Innovation Lab
 * @toolkit-version       3.2.0
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'performance-segmentos-v2';

const CORES_AREAS = {
  'SUPPLY': 'linear-gradient(135deg, #7c3aed, #4c1d95)',
  'SERVICES': 'linear-gradient(135deg, #2563eb, #1e3a8a)',
  'V&D': 'linear-gradient(135deg, #4f46e5, #312e81)',
  'HEALTHCARE': 'linear-gradient(135deg, #0284c7, #075985)',
  'AGROINDUSTRIA': 'linear-gradient(135deg, #d97706, #92400e)',
  'AGROINDÚSTRIA': 'linear-gradient(135deg, #d97706, #92400e)',
  'SUPERMERCADOS': 'linear-gradient(135deg, #dc2626, #991b1b)',
  'HOSPITALITY': 'linear-gradient(135deg, #475569, #334155)',
  'FINANCIAL SERVICES': 'linear-gradient(135deg, #0f766e, #134e4a)',
  'OUTROS': 'linear-gradient(135deg, #64748b, #475569)'
};

const BASE_TREE_DATA = [
  {
    area: 'SUPPLY',
    segmentos: [
      { nome: 'MANUFATURA', prodCdu: 4120000, metaCdu: 3850000, yoyCdu: 16.4, qtdCdu: 138, yoyQtdCdu: 9.2, prodRec: 6840000, metaRec: 6320000, yoyRec: 24.8, qtdRec: 312, yoyQtdRec: 18.5 },
      { nome: 'LOGISTICA', prodCdu: 1680000, metaCdu: 1920000, yoyCdu: -11.2, qtdCdu: 74, yoyQtdCdu: -8.4, prodRec: 2950000, metaRec: 3180000, yoyRec: 9.6, qtdRec: 164, yoyQtdRec: 6.1 },
      { nome: 'CONSTRUCAO E PROJETOS', prodCdu: 1490000, metaCdu: 1280000, yoyCdu: 28.5, qtdCdu: 52, yoyQtdCdu: 19.0, prodRec: 2410000, metaRec: 2150000, yoyRec: 31.2, qtdRec: 118, yoyQtdRec: 21.4 }
    ]
  },
  {
    area: 'SERVICES',
    segmentos: [
      { nome: 'SERVICOS', prodCdu: 2840000, metaCdu: 2690000, yoyCdu: 12.1, qtdCdu: 126, yoyQtdCdu: 7.5, prodRec: 4920000, metaRec: 4510000, yoyRec: 26.4, qtdRec: 285, yoyQtdRec: 19.2 },
      { nome: 'EDUCACIONAL', prodCdu: 1120000, metaCdu: 1340000, yoyCdu: -14.6, qtdCdu: 49, yoyQtdCdu: -11.3, prodRec: 2180000, metaRec: 2390000, yoyRec: 6.8, qtdRec: 132, yoyQtdRec: 4.2 },
      { nome: 'JURIDICO', prodCdu: 640000, metaCdu: 780000, yoyCdu: -18.2, qtdCdu: 34, yoyQtdCdu: -15.0, prodRec: 1340000, metaRec: 1210000, yoyRec: 22.9, qtdRec: 96, yoyQtdRec: 16.8 }
    ]
  },
  {
    area: 'V&D',
    segmentos: [
      { nome: 'VAREJO', prodCdu: 2390000, metaCdu: 2650000, yoyCdu: -6.8, qtdCdu: 142, yoyQtdCdu: -4.2, prodRec: 4180000, metaRec: 4320000, yoyRec: 15.3, qtdRec: 294, yoyQtdRec: 11.8 },
      { nome: 'DISTRIBUICAO', prodCdu: 1740000, metaCdu: 1680000, yoyCdu: 8.9, qtdCdu: 88, yoyQtdCdu: 5.1, prodRec: 3090000, metaRec: 2890000, yoyRec: 19.7, qtdRec: 198, yoyQtdRec: 14.3 },
      { nome: 'SMALL BUSINESS', prodCdu: 790000, metaCdu: 850000, yoyCdu: 4.5, qtdCdu: 95, yoyQtdCdu: 8.2, prodRec: 1650000, metaRec: 1540000, yoyRec: 28.4, qtdRec: 245, yoyQtdRec: 24.0 }
    ]
  },
  {
    area: 'HEALTHCARE',
    segmentos: [
      { nome: 'SAUDE', prodCdu: 2460000, metaCdu: 2210000, yoyCdu: 19.8, qtdCdu: 68, yoyQtdCdu: 12.4, prodRec: 3940000, metaRec: 3650000, yoyRec: 29.5, qtdRec: 176, yoyQtdRec: 20.1 }
    ]
  },
  {
    area: 'AGROINDUSTRIA',
    segmentos: [
      { nome: 'AGROINDUSTRIA', prodCdu: 1980000, metaCdu: 1790000, yoyCdu: 24.2, qtdCdu: 46, yoyQtdCdu: 15.6, prodRec: 2780000, metaRec: 2610000, yoyRec: 18.4, qtdRec: 108, yoyQtdRec: 12.9 }
    ]
  },
  {
    area: 'SUPERMERCADOS',
    segmentos: [
      { nome: 'SUPERMERCADOS', prodCdu: 1560000, metaCdu: 1740000, yoyCdu: -9.4, qtdCdu: 61, yoyQtdCdu: -6.7, prodRec: 2540000, metaRec: 2420000, yoyRec: 14.1, qtdRec: 144, yoyQtdRec: 9.8 }
    ]
  },
  {
    area: 'FINANCIAL SERVICES',
    segmentos: [
      { nome: 'FINANCIAL SERVICES', prodCdu: 1290000, metaCdu: 1180000, yoyCdu: 15.7, qtdCdu: 32, yoyQtdCdu: 10.2, prodRec: 2190000, metaRec: 1980000, yoyRec: 27.6, qtdRec: 84, yoyQtdRec: 18.9 }
    ]
  },
  {
    area: 'HOSPITALITY',
    segmentos: [
      { nome: 'HOSPITALITY', prodCdu: 840000, metaCdu: 960000, yoyCdu: -13.5, qtdCdu: 44, yoyQtdCdu: -9.8, prodRec: 1420000, metaRec: 1490000, yoyRec: 7.4, qtdRec: 92, yoyQtdRec: 5.1 }
    ]
  }
];

const MOCK_CURVA_OFERTAS = {
  'CURVA A': {
    peso: 0.68,
    yoyDelta: 5.4,
    tmMult: 1.38,
    ofertas: [
      { nome: 'FULL TOTVS CLOUD + CORE', peso: 0.44, yoyProd: 24.6, tmMult: 1.48, yoyTm: 11.2 },
      { nome: 'INTERA BACKOFFICE ENTERPRISE', peso: 0.32, yoyProd: 14.8, tmMult: 1.32, yoyTm: 6.4 },
      { nome: 'CLOUD + CLOUD INTERA', peso: 0.24, yoyProd: 31.2, tmMult: 1.29, yoyTm: 9.8 }
    ],
    clientes: [
      { nome: 'VIA VAREJO S.A', peso: 0.38, yoyProd: 18.4, tmMult: 1.55, yoyTm: 8.4 },
      { nome: 'MAGAZINE LUIZA', peso: 0.35, yoyProd: 22.1, tmMult: 1.42, yoyTm: 9.1 },
      { nome: 'LOJAS RENNER S.A.', peso: 0.27, yoyProd: -4.2, tmMult: 1.28, yoyTm: -2.3 }
    ]
  },
  'CURVA B': {
    peso: 0.22,
    yoyDelta: -3.2,
    tmMult: 0.88,
    ofertas: [
      { nome: 'CORE SEGMENTOS ESPECIALIZADO', peso: 0.39, yoyProd: -4.8, tmMult: 0.94, yoyTm: -2.1 },
      { nome: 'RH (CORE + AHGORA PONTO)', peso: 0.34, yoyProd: 18.5, tmMult: 0.86, yoyTm: 5.7 },
      { nome: 'FLUIG WORKFLOW & ECM', peso: 0.27, yoyProd: -12.4, tmMult: 0.81, yoyTm: -6.3 }
    ],
    clientes: [
      { nome: 'GRUPO MATEUS', peso: 0.41, yoyProd: 12.8, tmMult: 0.98, yoyTm: 4.2 },
      { nome: 'SENDAS DISTRIBUIDORA', peso: 0.33, yoyProd: -8.4, tmMult: 0.85, yoyTm: -5.1 },
      { nome: 'RAIA DROGASIL', peso: 0.26, yoyProd: 15.2, tmMult: 0.80, yoyTm: 6.8 }
    ]
  },
  'CURVA C': {
    peso: 0.10,
    yoyDelta: -9.8,
    tmMult: 0.54,
    ofertas: [
      { nome: 'SOLUCOES FISCAIS & TAX', peso: 0.41, yoyProd: 16.2, tmMult: 0.62, yoyTm: 4.9 },
      { nome: 'RD STATION MARKETING', peso: 0.33, yoyProd: 21.0, tmMult: 0.51, yoyTm: 3.4 },
      { nome: 'GESPLAN & TECHFIN', peso: 0.26, yoyProd: -16.8, tmMult: 0.48, yoyTm: -8.5 }
    ],
    clientes: [
      { nome: 'PETZ S.A.', peso: 0.45, yoyProd: -14.2, tmMult: 0.65, yoyTm: -7.4 },
      { nome: 'COBASI COMERCIO DE PROD', peso: 0.35, yoyProd: 8.4, tmMult: 0.52, yoyTm: 2.1 },
      { nome: 'GRUPO SBF (CENTAURO)', peso: 0.20, yoyProd: -22.4, tmMult: 0.45, yoyTm: -12.5 }
    ]
  }
};
  'SUPPLY': 'linear-gradient(135deg, #7c3aed, #4c1d95)',
  'SERVICES': 'linear-gradient(135deg, #2563eb, #1e3a8a)',
  'V&D': 'linear-gradient(135deg, #4f46e5, #312e81)',
  'HEALTHCARE': 'linear-gradient(135deg, #0284c7, #075985)',
  'AGROINDUSTRIA': 'linear-gradient(135deg, #d97706, #92400e)',
  'AGROINDÚSTRIA': 'linear-gradient(135deg, #d97706, #92400e)',
  'SUPERMERCADOS': 'linear-gradient(135deg, #dc2626, #991b1b)',
  'HOSPITALITY': 'linear-gradient(135deg, #475569, #334155)',
  'FINANCIAL SERVICES': 'linear-gradient(135deg, #0f766e, #134e4a)',
  'OUTROS': 'linear-gradient(135deg, #64748b, #475569)'
};

export class PerformanceSegmentosV2 extends LitElement {
  static properties = {
    loading: { type: Boolean },
    loadingFilters: { type: Boolean },
    error: { type: String },
    areaSelecionada: { type: String },
    segmentoSelecionado: { type: String },
    tipoReceita: { type: String },
    visaoTabela: { type: Boolean },
    expandedAreasTabela: { type: Object },
    mostrarFiltros: { type: Boolean },
    dropdownAberto: { type: String },
    filtros: { type: Object },
    opcoesSegmento: { type: Array },
    opcoesReceita: { type: Array },
    dadosAreas: { type: Object },
    dadosSegmentos: { type: Object },
    globalData: { type: Object },
    tabelaData: { type: Array },
    historicoMensal: { type: Array },

    // Modal Temporal de 13 Meses (Qtd / TM)
    modalExpandidoAberto: { type: Boolean },
    metricaModal: { type: String },

    // Modal Temporal de 13 Meses de Produção (Segmento / Oferta / Cliente)
    modalProducao13Aberto: { type: Boolean },
    carregandoProducao13: { type: Boolean },
    producao13Tipo: { type: String },
    producao13Nome: { type: String },
    historicoProducao13: { type: Array },

    // Modal Ampliado de Curva ABC, Ofertas & Clientes
    modalCurvaAbcAberto: { type: Boolean },
    curvaAbcAtiva: { type: String },
    tipoDetalheCurva: { type: String },
    carregandoDrill: { type: Boolean },
    itensCurvaAbc: { type: Array },
    itensOfertas: { type: Array },
    itensClientes: { type: Array },
    buscaDetalheCurva: { type: String },
    criterioOrdenacaoCurva: { type: String }
  };

  constructor() {
    super();
    this.loading = true;
    this.loadingFilters = true;
    this.error = null;
    this.areaSelecionada = null;
    this.segmentoSelecionado = null;
    this.tipoReceita = 'NAO_RECORRENTE';
    this.visaoTabela = false;
    this.expandedAreasTabela = new Set([]);
    this.mostrarFiltros = true;
    this.dropdownAberto = null;
    
    // Mês padrão consolidado com faturamento
    this.filtros = {
      ano: ['2026'],
      mes: ['1'],
      receita: ['CDU'],
      segmento: []
    };

    this.opcoesSegmento = [];
    this.opcoesReceita = ['CDU', 'SAAS', 'SMS', 'SERVICOS RECORRENTES'];
    this.dadosAreas = {};
    this.dadosSegmentos = {};
    this.globalData = { prod: '--', meta: '--', ating: 0, delta: '--', yoy: '--', isPos: true };
    this.tabelaData = [];
    this.historicoMensal = [];

    // Modais
    this.modalExpandidoAberto = false;
    this.metricaModal = null;

    this.modalProducao13Aberto = false;
    this.carregandoProducao13 = false;
    this.producao13Tipo = 'SEGMENTO';
    this.producao13Nome = '';
    this.historicoProducao13 = [];
    this._cacheProducao13 = {};
    this.modalCurvaAbcAberto = false;
    this.curvaAbcAtiva = null;
    this.tipoDetalheCurva = 'OFERTAS';
    this.carregandoDrill = false;
    this.itensCurvaAbc = [];
    this.itensOfertas = [];
    this.itensClientes = [];
    this.buscaDetalheCurva = '';
    this.criterioOrdenacaoCurva = 'rep_desc';

    this._fecharDropdownsAoClicarFora = (e) => {
      if (!e.composedPath().find(el => el.classList && el.classList.contains('multi-select-container'))) {
        if (this.dropdownAberto) {
          this.dropdownAberto = null;
          this.requestUpdate();
        }
      }
    };

    this._tecladoListener = (e) => {
      if (e.key === 'Escape') {
        if (this.modalProducao13Aberto) {
          this.fecharModalProducao13();
          return;
        }
        if (this.modalExpandidoAberto) this.fecharModal();
        if (this.modalCurvaAbcAberto) this.fecharModalCurvaAbc();
      }
    };

    document.addEventListener('click', this._fecharDropdownsAoClicarFora);
    window.addEventListener('keydown', this._tecladoListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._fecharDropdownsAoClicarFora);
    window.removeEventListener('keydown', this._tecladoListener);
  }

  mudarReceita(tipo) {
    this.tipoReceita = tipo;
    this.areaSelecionada = null;
    this.segmentoSelecionado = null;
    this.modalProducao13Aberto = false;
    this.modalCurvaAbcAberto = false;
    this.curvaAbcAtiva = null;
    this.tipoDetalheCurva = 'OFERTAS';
    if (tipo === 'NAO_RECORRENTE') {
      this.filtros.receita = ['CDU'];
    } else {
      this.filtros.receita = ['SAAS', 'SMS', 'SERVICOS RECORRENTES'];
    }
    this.carregarDadosSimulados();
  }

  toggleFiltro(tipo, valor) {
    const atual = this.filtros[tipo] || [];
    if (atual.includes(valor)) {
      this.filtros = { ...this.filtros, [tipo]: atual.filter(v => v !== valor) };
    } else {
      this.filtros = { ...this.filtros, [tipo]: [...atual, valor] };
    }
    if (tipo === 'receita') {
      const isNaoRec = this.filtros.receita.length === 1 && this.filtros.receita[0] === 'CDU';
      this.tipoReceita = isNaoRec ? 'NAO_RECORRENTE' : 'RECORRENTE';
    }
    this.carregarDadosSimulados();
  }

  _parsePercentNum(v) {
    if (v === null || v === undefined || v === '' || v === '--' || v === '-') return null;
    if (typeof v === 'object' && 'value' in v) v = v.value;
    if (typeof v === 'number') {
      return Math.abs(v) <= 1.0 && v !== 0 ? v * 100 : v;
    }
    if (typeof v === 'string') {
      let clean = v.replace('%', '').trim();
      if (clean === '-' || clean === '' || clean === '--') return null;
      clean = clean.replace(',', '.');
      const n = parseFloat(clean);
      return isNaN(n) ? null : n;
    }
    return null;
  }

  formatYoY(rawVal) {
    const num = this._parsePercentNum(rawVal);
    if (num === null) return { texto: '--', isPos: null, rawNum: null };
    const isPos = num > 0 ? true : num < 0 ? false : null;
    const sinal = num > 0 ? '+' : '';
    const texto = `${sinal}${num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
    return { texto, isPos, rawNum: num };
  }

  formatCurrency(val) {
    if (val === null || val === undefined || val === '') return '--';
    let n = Number(val);
    if (isNaN(n)) return val;
    if (n === 0) return 'R$ 0,00';
    const isNeg = n < 0; 
    n = Math.abs(n); 
    let str = '';
    if (n >= 1e6) { str = (n / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi'; } 
    else if (n >= 1e3) { str = (n / 1e3).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mil'; } 
    else { str = n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    return (isNeg ? '-R$ ' : 'R$ ') + str;
  }

  formatNum(val) {
    if (val === null || val === undefined || val === '') return '--';
    let n = Number(val); if (isNaN(n)) return val;
    return n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }

  _calcularFatorFiltros() {
    let fator = 1.0;
    const anos = this.filtros.ano || [];
    const meses = this.filtros.mes || [];
    const recs = this.filtros.receita || [];

    if (anos.length > 0) {
      const maxAno = Math.max(...anos.map(a => parseInt(a, 10)));
      fator *= (1 + (maxAno - 2026) * 0.08);
      if (anos.length > 1) fator *= (1 + (anos.length - 1) * 0.72);
    }
    if (meses.length > 0) {
      const maxMes = Math.max(...meses.map(m => parseInt(m, 10)));
      fator *= (0.94 + (maxMes % 4) * 0.04);
      if (meses.length > 1) fator *= (1 + (meses.length - 1) * 0.78);
    }

    const recList = recs.filter(r => r !== 'CDU');
    const fatorRec = recList.length === 0 ? 1.0 : Math.min(1.0, 0.35 + recList.length * 0.25);
    return { fator, fatorRec };
  }

  carregarDadosSimulados() {
    this.loading = true;
    this.error = null;

    const { fator, fatorRec } = this._calcularFatorFiltros();
    const isNaoRec = this.tipoReceita === 'NAO_RECORRENTE';
    const segFiltro = this.filtros.segmento || [];

    const novasAreas = {};
    const novosSegs = {};
    const novaTabela = [];

    let globalProd = 0;
    let globalMeta = 0;
    let globalDelta = 0;
    let globalYoySoma = 0;

    const areasProcessadas = [];

    BASE_TREE_DATA.forEach((bloco) => {
      const segsFiltrados = segFiltro.length > 0
        ? bloco.segmentos.filter(s => segFiltro.includes(s.nome))
        : bloco.segmentos;

      if (segsFiltrados.length === 0) return;

      let areaProd = 0;
      let areaMeta = 0;
      let areaQtd = 0;
      let areaYoyProdSoma = 0;
      let areaYoyQtdSoma = 0;

      const segsCalculados = segsFiltrados.map((s) => {
        const prod = Math.round((isNaoRec ? s.prodCdu : s.prodRec * fatorRec) * fator);
        const meta = Math.round((isNaoRec ? s.metaCdu : s.metaRec * fatorRec) * fator);
        const delta = prod - meta;
        const ating = meta > 0 ? (prod / meta) * 100 : 0;
        const yoyProd = isNaoRec ? s.yoyCdu : s.yoyRec;
        const qtd = Math.max(1, Math.round((isNaoRec ? s.qtdCdu : s.qtdRec * fatorRec) * fator));
        const yoyQtd = isNaoRec ? s.yoyQtdCdu : s.yoyQtdRec;
        const tm = qtd > 0 ? Math.round(prod / qtd) : 0;
        const yoyTm = Number((yoyProd - yoyQtd).toFixed(1));

        areaProd += prod;
        areaMeta += meta;
        areaQtd += qtd;
        areaYoyProdSoma += yoyProd * prod;
        areaYoyQtdSoma += yoyQtd * qtd;

        return {
          nome: s.nome,
          prodNum: prod,
          metaNum: meta,
          deltaNum: delta,
          ating: Number(ating.toFixed(1)),
          yoyProd: Number(yoyProd.toFixed(1)),
          qtdNum: qtd,
          qtdYoY: Number(yoyQtd.toFixed(1)),
          tmNum: tm,
          tmYoY: yoyTm
        };
      });

      const areaDelta = areaProd - areaMeta;
      const areaAting = areaMeta > 0 ? (areaProd / areaMeta) * 100 : 0;
      const areaYoyProd = areaProd > 0 ? areaYoyProdSoma / areaProd : 0;
      const areaYoyQtd = areaQtd > 0 ? areaYoyQtdSoma / areaQtd : 0;
      const areaTm = areaQtd > 0 ? Math.round(areaProd / areaQtd) : 0;
      const areaYoyTm = areaYoyProd - areaYoyQtd;

      globalProd += areaProd;
      globalMeta += areaMeta;
      globalDelta += areaDelta;
      globalYoySoma += areaYoyProd * areaProd;

      areasProcessadas.push({
        area: bloco.area,
        areaProd,
        areaMeta,
        areaDelta,
        areaAting: Number(areaAting.toFixed(1)),
        areaYoyProd: Number(areaYoyProd.toFixed(1)),
        areaQtd,
        areaYoyQtd: Number(areaYoyQtd.toFixed(1)),
        areaTm,
        areaYoyTm: Number(areaYoyTm.toFixed(1)),
        segsCalculados
      });
    });

    areasProcessadas.forEach((ap) => {
      const repArea = globalProd > 0 ? (ap.areaProd / globalProd) * 100 : 0;
      novosSegs[ap.area] = {};
      const segsTabela = [];

      ap.segsCalculados.forEach((sc) => {
        const repSeg = ap.areaProd > 0 ? (sc.prodNum / ap.areaProd) * 100 : 0;
        const prodFmt = this.formatCurrency(sc.prodNum);
        const metaFmt = this.formatCurrency(sc.metaNum);
        const deltaFmt = this.formatCurrency(sc.deltaNum);
        const tmFmt = sc.tmNum > 0 ? this.formatCurrency(sc.tmNum) : '--';
        const qtdFmt = this.formatNum(sc.qtdNum);

        novosSegs[ap.area][sc.nome] = {
          nome: sc.nome,
          rep: Number(repSeg.toFixed(1)),
          qtd: qtdFmt,
          qtdNum: sc.qtdNum,
          qtdYoY: sc.qtdYoY,
          tm: tmFmt,
          tmNum: sc.tmNum,
          tmYoY: sc.tmYoY,
          prod: prodFmt,
          prodNum: sc.prodNum,
          meta: metaFmt,
          metaNum: sc.metaNum,
          delta: deltaFmt,
          deltaNum: sc.deltaNum,
          ating: sc.ating,
          yoyProd: sc.yoyProd
        };

        segsTabela.push({
          nome: sc.nome,
          meta: metaFmt.replace('R$ ', ''),
          prod: prodFmt.replace('R$ ', ''),
          ating: `${sc.ating.toFixed(1).replace('.', ',')}%`,
          delta: deltaFmt.replace('R$ ', ''),
          yoyReal: `${sc.yoyProd >= 0 ? '+' : ''}${sc.yoyProd.toFixed(1).replace('.', ',')}%`,
          rep: `${repSeg.toFixed(1).replace('.', ',')}%`,
          qtd: qtdFmt,
          yoyQtd: `${sc.qtdYoY >= 0 ? '+' : ''}${sc.qtdYoY.toFixed(1).replace('.', ',')}%`,
          tm: tmFmt.replace('R$ ', ''),
          yoyTm: `${sc.tmYoY >= 0 ? '+' : ''}${sc.tmYoY.toFixed(1).replace('.', ',')}%`
        });
      });

      const aProdFmt = this.formatCurrency(ap.areaProd);
      const aMetaFmt = this.formatCurrency(ap.areaMeta);
      const aDeltaFmt = this.formatCurrency(ap.areaDelta);
      const aTmFmt = ap.areaTm > 0 ? this.formatCurrency(ap.areaTm) : '--';
      const aQtdFmt = this.formatNum(ap.areaQtd);

      novasAreas[ap.area] = {
        key: ap.area,
        valRaw: ap.areaProd,
        nome: ap.area,
        prod: aProdFmt,
        meta: aMetaFmt,
        ating: ap.areaAting,
        deltaNum: ap.areaDelta,
        delta: aDeltaFmt,
        yoyProd: ap.areaYoyProd,
        rep: Number(repArea.toFixed(1)),
        qtd: aQtdFmt,
        qtdNum: ap.areaQtd,
        yoyQtd: ap.areaYoyQtd,
        tm: aTmFmt,
        tmNum: ap.areaTm,
        yoyTm: ap.areaYoyTm,
        bg: CORES_AREAS[ap.area] || 'linear-gradient(135deg, #475569, #334155)'
      };

      novaTabela.push({
        area: ap.area,
        meta: aMetaFmt.replace('R$ ', ''),
        prod: aProdFmt.replace('R$ ', ''),
        ating: `${ap.areaAting.toFixed(1).replace('.', ',')}%`,
        delta: aDeltaFmt.replace('R$ ', ''),
        yoyReal: `${ap.areaYoyProd >= 0 ? '+' : ''}${ap.areaYoyProd.toFixed(1).replace('.', ',')}%`,
        rep: `${repArea.toFixed(1).replace('.', ',')}%`,
        qtd: aQtdFmt,
        yoyQtd: `${ap.areaYoyQtd >= 0 ? '+' : ''}${ap.areaYoyQtd.toFixed(1).replace('.', ',')}%`,
        tm: aTmFmt.replace('R$ ', ''),
        yoyTm: `${ap.areaYoyTm >= 0 ? '+' : ''}${ap.areaYoyTm.toFixed(1).replace('.', ',')}%`,
        segmentos: segsTabela
      });
    });

    const gAting = globalMeta > 0 ? (globalProd / globalMeta) * 100 : 0;
    const gYoy = globalProd > 0 ? globalYoySoma / globalProd : 0;

    this.globalData = {
      prod: this.formatCurrency(globalProd),
      meta: this.formatCurrency(globalMeta),
      ating: Number(gAting.toFixed(1)),
      delta: this.formatCurrency(globalDelta),
      yoy: `${gYoy >= 0 ? '+' : ''}${gYoy.toFixed(1).replace('.', ',')}%`,
      isPos: gYoy >= 0
    };

    this.dadosAreas = novasAreas;
    this.dadosSegmentos = novosSegs;
    this.tabelaData = novaTabela;

    if (this.segmentoSelecionado && this.areaSelecionada && novosSegs[this.areaSelecionada]?.[this.segmentoSelecionado]) {
      this.carregarHistoricoSegmento(this.segmentoSelecionado);
    }

    this.loading = false;
    this.requestUpdate();
  }

  computeTreemap(items) {
    if (!items || items.length === 0) return [];
    if (items.length === 1) return [{ key: items[0].key, x: 0, y: 0, w: 100, h: 100 }];

    const W = 1000.0, H = 450.0, totalArea = W * H;
    const totalRaw = items.reduce((acc, it) => acc + Math.max(Number(it.valRaw) || 0, 0), 0);
    const floor = (totalRaw > 0 ? totalRaw * 0.045 : 1);

    const weighted = items.map(it => ({
      key: it.key,
      valRaw: Number(it.valRaw) || 0,
      wVal: Math.max(Number(it.valRaw) || 0, floor)
    }));

    const sumWeighted = weighted.reduce((acc, it) => acc + it.wVal, 0);
    weighted.forEach(it => { it.area = (it.wVal / sumWeighted) * totalArea; });
    weighted.sort((a, b) => b.area - a.area);

    const rects = [];
    let curX = 0.0, curY = 0.0, curW = W, curH = H;

    function worstRatio(row, w) {
      if (!row || row.length === 0 || w <= 0) return Infinity;
      const s = row.reduce((acc, it) => acc + it.area, 0);
      if (s <= 0) return Infinity;
      let maxA = -Infinity, minA = Infinity;
      row.forEach(it => {
        if (it.area > maxA) maxA = it.area;
        if (it.area < minA) minA = it.area;
      });
      const w2 = w * w, s2 = s * s;
      return Math.max((w2 * maxA) / s2, s2 / (w2 * minA));
    }

    function layoutRow(row, w, vertical) {
      const rowSum = row.reduce((acc, it) => acc + it.area, 0);
      if (vertical) {
        const rowW = curH > 0 ? rowSum / curH : 0;
        let yPos = curY;
        row.forEach(it => {
          const itH = rowSum > 0 ? (it.area / rowSum) * curH : 0;
          rects.push({ key: it.key, x: curX, y: yPos, w: rowW, h: itH });
          yPos += itH;
        });
        curX += rowW;
        curW = Math.max(0, curW - rowW);
      } else {
        const rowH = curW > 0 ? rowSum / curW : 0;
        let xPos = curX;
        row.forEach(it => {
          const itW = rowSum > 0 ? (it.area / rowSum) * curW : 0;
          rects.push({ key: it.key, x: xPos, y: curY, w: itW, h: rowH });
          xPos += itW;
        });
        curY += rowH;
        curH = Math.max(0, curH - rowH);
      }
    }

    let row = [];
    for (let i = 0; i < weighted.length; i++) {
      const c = weighted[i];
      const vertical = curW >= curH;
      const w = vertical ? curH : curW;

      if (row.length === 0) row.push(c);
      else {
        const currWorst = worstRatio(row, w);
        const nextWorst = worstRatio([...row, c], w);
        if (nextWorst <= currWorst) row.push(c);
        else {
          layoutRow(row, w, vertical);
          row = [c];
        }
      }
    }
    if (row.length > 0) {
      const vertical = curW >= curH;
      const w = vertical ? curH : curW;
      layoutRow(row, w, vertical);
    }

    return rects.map(r => ({
      key: r.key,
      x: Number(((r.x / W) * 100).toFixed(2)),
      y: Number(((r.y / H) * 100).toFixed(2)),
      w: Number(((r.w / W) * 100).toFixed(2)),
      h: Number(((r.h / H) * 100).toFixed(2))
    }));
  }

  async carregarHistoricoSegmento(segNome) {
    if (!segNome || !this.areaSelecionada) return;
    const segObj = this.dadosSegmentos[this.areaSelecionada]?.[segNome];
    if (!segObj) return;

    const anoRef = (this.filtros.ano && this.filtros.ano.length > 0) ? parseInt(this.filtros.ano[0], 10) : 2026;
    const mesRef = (this.filtros.mes && this.filtros.mes.length > 0) ? parseInt(this.filtros.mes[0], 10) : 1;

    const qtdFinal = segObj.qtdNum || 50;
    const tmFinal = segObj.tmNum || 25000;
    const yoyQtdFactor = 1 + ((segObj.qtdYoY || 5) / 100);
    const yoyTmFactor = 1 + ((segObj.tmYoY || 4) / 100);

    const qtdInicial = yoyQtdFactor > 0.1 ? qtdFinal / yoyQtdFactor : qtdFinal * 0.9;
    const tmInicial = yoyTmFactor > 0.1 ? tmFinal / yoyTmFactor : tmFinal * 0.92;

    const series = [];
    let y = anoRef - 1;
    let m = mesRef;

    for (let i = 0; i < 13; i++) {
      const mStr = String(m).padStart(2, '0');
      const prog = i / 12;
      const saz = (i === 0 || i === 12) ? 1.0 : (0.88 + Math.sin(i * 0.85) * 0.12);

      const qVal = Math.max(1, Math.round((qtdInicial + (qtdFinal - qtdInicial) * prog) * saz));
      const tVal = Math.max(1000, Math.round((tmInicial + (tmFinal - tmInicial) * prog) * (0.95 + Math.cos(i * 0.75) * 0.05)));

      series.push({
        mes: `${mStr}/${String(y).slice(-2)}`,
        fullKey: `${y}/${mStr}`,
        qtd: qVal,
        tm: tVal
      });

      m++;
      if (m > 12) { m = 1; y++; }
    }

    this.historicoMensal = series;
  }

  selecionarArea(areaId) {
    if (this.areaSelecionada === areaId) {
      this.areaSelecionada = null;
      this.segmentoSelecionado = null;
      this.modalCurvaAbcAberto = false;
      this.curvaAbcAtiva = null;
      this.tipoDetalheCurva = 'OFERTAS';
    } else {
      this.areaSelecionada = areaId;
      this.segmentoSelecionado = null;
      this.modalCurvaAbcAberto = false;
      this.curvaAbcAtiva = null;
      this.tipoDetalheCurva = 'OFERTAS';
    }
    this.requestUpdate();
  }

  selecionarSegmento(segmentoId) {
    if (this.segmentoSelecionado === segmentoId) {
      this.segmentoSelecionado = null;
      this.modalCurvaAbcAberto = false;
      this.curvaAbcAtiva = null;
      this.tipoDetalheCurva = 'OFERTAS';
    } else {
      this.segmentoSelecionado = segmentoId;
      this.modalCurvaAbcAberto = false;
      this.curvaAbcAtiva = null;
      this.tipoDetalheCurva = 'OFERTAS';
      this.itensCurvaAbc = [];
      this.itensOfertas = [];
      this.itensClientes = [];
      this.buscaDetalheCurva = '';
      this.carregarHistoricoSegmento(segmentoId);
    }
    this.requestUpdate();
  }

  toggleAreaTabela(areaName) {
    const newSet = new Set(this.expandedAreasTabela);
    if (newSet.has(areaName)) newSet.delete(areaName);
    else newSet.add(areaName);
    this.expandedAreasTabela = newSet;
    this.requestUpdate();
  }

  toggleVisao() {
    this.visaoTabela = !this.visaoTabela;
    if (this.visaoTabela) {
      this.expandedAreasTabela = new Set([]);
    }
    this.requestUpdate();
  }

  abrirModal(metrica) {
    this.metricaModal = metrica;
    this.modalExpandidoAberto = true;
    this.requestUpdate();
  }

  fecharModal() {
    this.modalExpandidoAberto = false;
    this.metricaModal = null;
    this.requestUpdate();
  }

  formatCompactShort(val) {
    if (val === null || val === undefined || isNaN(val)) return '0';
    const n = Number(val);
    if (n === 0) return '0';
    const isNeg = n < 0;
    const abs = Math.abs(n);
    let str = '';
    if (abs >= 1e6) {
      str = (abs / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
    } else if (abs >= 1e3) {
      str = (abs / 1e3).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' Mil';
    } else {
      str = abs.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    }
    return (isNeg ? '-' : '') + str;
  }

  abrirModalProducao13(tipo, nome) {
    if (!nome) return;
    this.producao13Tipo = tipo;
    this.producao13Nome = nome;
    this.modalProducao13Aberto = true;

    const anoRef = (this.filtros.ano && this.filtros.ano.length > 0) ? parseInt(this.filtros.ano[0], 10) : 2026;
    const mesRef = (this.filtros.mes && this.filtros.mes.length > 0) ? parseInt(this.filtros.mes[0], 10) : 1;
    const recKey = (this.filtros.receita || []).join(',');
    const segContexto = tipo === 'SEGMENTO' ? nome : (this.segmentoSelecionado || '');
    const cacheKey = `${tipo}|${segContexto}|${nome}|${anoRef}|${mesRef}|${recKey}`;

    if (this._cacheProducao13[cacheKey]) {
      this.historicoProducao13 = this._cacheProducao13[cacheKey];
      this.requestUpdate();
      return;
    }

    const expectedKeys = [];
    let y = anoRef - 1;
    let m = mesRef;
    for (let i = 0; i < 13; i++) {
      const mStr = String(m).padStart(2, '0');
      expectedKeys.push({
        mes: `${mStr}/${String(y).slice(-2)}`,
        fullKey: `${y}/${mStr}`,
        prod: 0
      });
      m++;
      if (m > 12) { m = 1; y++; }
    }

    // Gerar dados mockados coerentes para o 13M de Produção
    let baseProd = 500000;
    if (tipo === 'SEGMENTO' && this.dadosSegmentos[this.areaSelecionada]?.[nome]) {
      baseProd = this.dadosSegmentos[this.areaSelecionada][nome].prodNum;
    } else if (tipo === 'OFERTA' && this.itensOfertas.length > 0) {
      const ofItem = this.itensOfertas.find(i => i.nome === nome);
      if (ofItem) baseProd = ofItem.producao;
    } else if (tipo === 'CLIENTE' && this.itensClientes.length > 0) {
      const cliItem = this.itensClientes.find(i => i.nome === nome);
      if (cliItem) baseProd = cliItem.producao;
    }

    const serieFinal = expectedKeys.map((k, i) => {
      const prog = i / 12;
      const saz = (i === 0 || i === 12) ? 1.0 : (0.85 + Math.sin(i * 0.9) * 0.15);
      const varTrend = 0.8 + (prog * 0.2); // Crescimento suave
      const mockProd = Math.round(baseProd * saz * varTrend);
      
      return {
        mes: k.mes,
        fullKey: k.fullKey,
        prod: mockProd
      };
    });

    this._cacheProducao13[cacheKey] = serieFinal;
    this.historicoProducao13 = serieFinal;
    this.requestUpdate();
  }

  fecharModalProducao13() {
    this.modalProducao13Aberto = false;
    this.requestUpdate();
  }

  renderModalProducao13() {
    if (!this.modalProducao13Aberto) return '';

    const tipo = this.producao13Tipo || 'SEGMENTO';
    const nome = this.producao13Nome || '';
    const data13 = this.historicoProducao13 || [];
    const cor = '#7c3aed';

    const tipoLabel = tipo === 'CLIENTE'
      ? 'CLIENTE'
      : tipo === 'OFERTA'
        ? 'OFERTA COMERCIAL'
        : tipo === 'CURVA_ABC'
          ? 'CLASSIFICAÇÃO 1 (CURVA ABC)'
          : 'SEGMENTO';
    const crumbTrail = tipo === 'SEGMENTO'
      ? `${this.areaSelecionada || ''} • SEGMENTO • HISTÓRICO DE PRODUÇÃO (13 MESES)`
      : tipo === 'CURVA_ABC'
        ? `${this.segmentoSelecionado || ''} • ${tipoLabel} • HISTÓRICO DE PRODUÇÃO (13 MESES)`
        : `${this.segmentoSelecionado || ''} • ${this.curvaAbcAtiva || ''} • ${tipoLabel} • HISTÓRICO DE PRODUÇÃO (13 MESES)`;

    const valores = data13.map(d => Math.max(Number(d.prod) || 0, 0));
    const maxVal = Math.max(...valores, 1);
    const total13M = data13.reduce((acc, d) => acc + (Number(d.prod) || 0), 0);
    const vFirst = data13[0]?.prod || 0;
    const vLast = data13[data13.length - 1]?.prod || 0;
    const diffPct = vFirst > 0 ? ((vLast - vFirst) / vFirst) * 100 : (vLast > 0 ? 100 : 0);
    const isYoYPos = diffPct >= 0;

    return html`
      <div class="modal-backdrop-blur" style="z-index: 1100;" @click="${() => this.fecharModalProducao13()}">
        <div class="modal-window-72" @click="${(e) => e.stopPropagation()}">
          
          <div class="modal-head">
            <div>
              <div class="modal-crumb-tag">${crumbTrail}</div>
              <h2 class="modal-head-title">Histórico de Produção (13 Meses): ${nome}</h2>
              ${!this.carregandoProducao13 && data13.length > 0 ? html`
                <div class="modal-kpi-sub" style="align-items: center; flex-wrap: wrap; gap: 14px;">
                  <span>
                    Variação Homóloga (${data13[0]?.mes} vs ${data13[data13.length - 1]?.mes}):
                    <strong style="color: ${isYoYPos ? '#16a34a' : '#dc2626'}; font-size: 13px; margin-left: 4px;">
                      ${isYoYPos ? '↗ +' : '↘ '}${diffPct.toFixed(1).replace('.', ',')}% YoY
                    </strong>
                  </span>
                  <span style="color: #cbd5e1;">|</span>
                  <span>
                    Acumulado 13 Meses: <strong style="color: #0f172a; font-size: 13px;">${this.formatCurrency(total13M)}</strong>
                  </span>
                </div>
              ` : ''}
            </div>
            <button class="modal-btn-close" @click="${() => this.fecharModalProducao13()}" title="Fechar (Esc)">✕</button>
          </div>

          <div class="modal-chart-area">
            ${this.carregandoProducao13 ? html`
              <div class="modal-drill-loading">
                <div class="drill-spinner"></div>
                <span>A consultar histórico de produção (13 meses) no Looker...</span>
              </div>
            ` : html`
              <div class="bars-13-flex">
                ${data13.map((item, idx) => {
                  const val = Number(item.prod) || 0;
                  const pctHeight = val > 0 ? Math.max((val / maxVal) * 100, 5) : 3;
                  const isFirst = idx === 0;
                  const isLast = idx === data13.length - 1;

                  return html`
                    <div class="bar-col-13">
                      <span class="bar-val-13 ${isLast ? 'val-current' : ''}">
                        ${this.formatCompactShort(val)}
                      </span>
                      <div class="bar-track-13">
                        <div class="bar-fill-13" 
                             style="height: ${pctHeight}%; background-color: ${isLast ? (val <= 0 ? '#ef4444' : cor) : isFirst ? '#64748b' : '#94a3b8'};">
                        </div>
                      </div>
                      <span class="bar-lbl-13 ${isLast ? 'lbl-current' : ''}">${item.mes}</span>
                    </div>
                  `;
                })}
              </div>
            `}
          </div>

          <div class="modal-foot">
            <div class="modal-chips">
              <span class="chip-item"><span class="chip-box" style="background: #64748b;"></span> ${data13[0]?.mes || ''} (Base Ano Anterior)</span>
              <span class="chip-item"><span class="chip-box" style="background: ${cor};"></span> ${data13[data13.length - 1]?.mes || ''} (Mês de Fecho)</span>
            </div>
            <button class="btn-fechar-modal" @click="${() => this.fecharModalProducao13()}">Fechar (Esc)</button>
          </div>

        </div>
      </div>
    `;
  }

  alterarOrdenacaoCurva(novoCriterio) {
    this.criterioOrdenacaoCurva = novoCriterio;
    if (this.curvaAbcAtiva) {
      if (this.tipoDetalheCurva === 'CLIENTES') {
        this.itensClientes = this.ordenarItensCurva(this.itensClientes, novoCriterio);
      } else {
        this.itensOfertas = this.ordenarItensCurva(this.itensOfertas, novoCriterio);
      }
    } else {
      this.itensCurvaAbc = this.ordenarItensCurva(this.itensCurvaAbc, novoCriterio);
    }
    this.requestUpdate();
  }

  ordenarItensCurva(itens, criterio) {
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
          const valA = a.yoyProdObj.rawNum !== null ? a.yoyProdObj.rawNum : 999999;
          const valB = b.yoyProdObj.rawNum !== null ? b.yoyProdObj.rawNum : 999999;
          return valA - valB;
        }
        case 'yoy_prod_desc': {
          const valA = a.yoyProdObj.rawNum !== null ? a.yoyProdObj.rawNum : -999999;
          const valB = b.yoyProdObj.rawNum !== null ? b.yoyProdObj.rawNum : -999999;
          return valB - valA;
        }
        case 'tm_desc':
          return b.tmNum - a.tmNum;
        case 'tm_asc':
          return a.tmNum - b.tmNum;
        case 'yoy_tm_asc': {
          const valA = a.yoyTmObj.rawNum !== null ? a.yoyTmObj.rawNum : 999999;
          const valB = b.yoyTmObj.rawNum !== null ? b.yoyTmObj.rawNum : 999999;
          return valA - valB;
        }
        case 'yoy_tm_desc': {
          const valA = a.yoyTmObj.rawNum !== null ? a.yoyTmObj.rawNum : -999999;
          const valB = b.yoyTmObj.rawNum !== null ? b.yoyTmObj.rawNum : -999999;
          return valB - valA;
        }
        default:
          return b.repPct - a.repPct;
      }
    });

    return copia;
  }

  async abrirModalCurvaAbc() {
    this.modalCurvaAbcAberto = true;
    if (this.itensCurvaAbc.length === 0) {
      await this.carregarCurvaAbcDoSegmento();
    }
    this.requestUpdate();
  }

  fecharModalCurvaAbc() {
    this.modalCurvaAbcAberto = false;
    this.requestUpdate();
  }

  carregarCurvaAbcDoSegmento() {
    this.curvaAbcAtiva = null;
    this.tipoDetalheCurva = 'OFERTAS';
    this.itensOfertas = [];
    this.itensClientes = [];
    this.buscaDetalheCurva = '';

    const segObj = this.dadosSegmentos[this.areaSelecionada]?.[this.segmentoSelecionado];
    const prodSeg = segObj ? segObj.prodNum : 2500000;
    const yoySeg = segObj ? segObj.yoyProd : 10.0;
    const tmSeg = segObj ? segObj.tmNum : 24000;
    const yoyTmSeg = segObj ? segObj.tmYoY : 4.5;

    const mapeados = Object.keys(MOCK_CURVA_OFERTAS).map((curvaKey) => {
      const cfg = MOCK_CURVA_OFERTAS[curvaKey];
      const prod = Math.round(prodSeg * cfg.peso);
      const repPct = Number((cfg.peso * 100).toFixed(1));
      const yoyProdObj = this.formatYoY(Number((yoySeg + cfg.yoyDelta).toFixed(1)));
      const tm = Math.round(tmSeg * cfg.tmMult);
      const yoyTmObj = this.formatYoY(Number((yoyTmSeg + cfg.yoyDelta * 0.5).toFixed(1)));

      return {
        nome: curvaKey,
        producao: prod,
        prodFmt: this.formatCurrency(prod),
        repPct,
        yoyProdObj,
        tmNum: tm,
        tmFmt: this.formatCurrency(tm),
        yoyTmObj
      };
    });

    this.itensCurvaAbc = this.ordenarItensCurva(mapeados, this.criterioOrdenacaoCurva);
  }

  async alternarTipoDetalheCurva(novoTipo) {
    if (this.tipoDetalheCurva === novoTipo) return;
    this.tipoDetalheCurva = novoTipo;
    this.buscaDetalheCurva = '';

    if (novoTipo === 'CLIENTES' && this.itensClientes.length === 0) {
      await this.carregarDetalheDaClasse(this.curvaAbcAtiva, 'CLIENTES');
    } else if (novoTipo === 'OFERTAS' && this.itensOfertas.length === 0) {
      await this.carregarDetalheDaClasse(this.curvaAbcAtiva, 'OFERTAS');
    } else {
      if (novoTipo === 'CLIENTES') {
        this.itensClientes = this.ordenarItensCurva(this.itensClientes, this.criterioOrdenacaoCurva);
      } else {
        this.itensOfertas = this.ordenarItensCurva(this.itensOfertas, this.criterioOrdenacaoCurva);
      }
      this.requestUpdate();
    }
  }

  carregarDetalheDaClasse(curvaNome, tipo = 'OFERTAS') {
    if (this.curvaAbcAtiva !== curvaNome) {
      this.itensOfertas = [];
      this.itensClientes = [];
      this.buscaDetalheCurva = '';
    }
    this.curvaAbcAtiva = curvaNome;
    this.tipoDetalheCurva = tipo;

    const isClientes = tipo === 'CLIENTES';
    const segObj = this.dadosSegmentos[this.areaSelecionada]?.[this.segmentoSelecionado];
    const prodSeg = segObj ? segObj.prodNum : 2500000;
    const tmSeg = segObj ? segObj.tmNum : 24000;

    const cfgCurva = MOCK_CURVA_OFERTAS[curvaNome] || MOCK_CURVA_OFERTAS['CURVA A'];
    const prodCurva = prodSeg * cfgCurva.peso;
    const arrayBase = isClientes ? (cfgCurva.clientes || cfgCurva.ofertas) : cfgCurva.ofertas;

    const mapeados = arrayBase.map((of) => {
      const prod = Math.round(prodCurva * of.peso);
      const repPct = Number((of.peso * 100).toFixed(1));
      const yoyProdObj = this.formatYoY(of.yoyProd);
      const tm = Math.round(tmSeg * of.tmMult);
      const yoyTmObj = this.formatYoY(of.yoyTm);

      return {
        nome: of.nome,
        producao: prod,
        prodFmt: this.formatCurrency(prod),
        repPct,
        yoyProdObj,
        tmNum: tm,
        tmFmt: this.formatCurrency(tm),
        yoyTmObj
      };
    });

    const ordenados = this.ordenarItensCurva(mapeados, this.criterioOrdenacaoCurva);
    if (isClientes) {
      this.itensClientes = ordenados;
    } else {
      this.itensOfertas = ordenados;
    }
    this.requestUpdate();
  }

  voltarParaCurvaAbc() {
    this.curvaAbcAtiva = null;
    this.tipoDetalheCurva = 'OFERTAS';
    this.itensOfertas = [];
    this.itensClientes = [];
    this.buscaDetalheCurva = '';
    this.itensCurvaAbc = this.ordenarItensCurva(this.itensCurvaAbc, this.criterioOrdenacaoCurva);
    this.requestUpdate();
  }

  renderMiniYoY(valor, isPos) {
    if (!valor || valor === '--' || isPos === null) {
      return html`<span class="mini-yoy mini-muted">--</span>`;
    }
    if (isPos === true) {
      return html`<span class="mini-yoy mini-pos"><span class="arrow">↗</span> ${valor}</span>`;
    }
    if (isPos === false) {
      return html`<span class="mini-yoy mini-neg"><span class="arrow">↘</span> ${valor}</span>`;
    }
    return html`<span class="mini-yoy mini-muted">${valor}</span>`;
  }

  renderFormattedMetric(valStr) {
    if (!valStr || valStr === '--') return html`<span style="color: #94a3b8;">--</span>`;
    const isNegative = String(valStr).includes('-');
    const isGreen = !isNegative && valStr !== '0,0%' && valStr !== '0%';
    return html`
      <span style="color: ${isNegative ? '#dc2626' : (isGreen ? '#16a34a' : '#64748b')}; font-weight: 700;">
        ${isNegative ? '↘' : (isGreen ? '↗' : '')} ${valStr}
      </span>
    `;
  }

  renderMultiSelect(id, label, options) {
    const abertos = this.dropdownAberto === id;
    const selecionados = this.filtros[id] || [];
    let displayText = label;
    if (selecionados.length === 1) {
      displayText = options.find(o => o.val === selecionados[0])?.lbl || selecionados[0];
    } else if (selecionados.length > 1) {
      displayText = `${selecionados.length} selecionados`;
    }

    return html`
      <div class="multi-select-container">
        <div class="multi-select-btn" @click="${(e) => { e.stopPropagation(); this.dropdownAberto = abertos ? null : id; this.requestUpdate(); }}">
          ${displayText} <span>▼</span>
        </div>
        ${abertos ? html`
          <div class="multi-select-dropdown">
            ${options.map(opt => html`
              <label class="multi-select-option">
                <input type="checkbox" .checked="${selecionados.includes(opt.val)}" @change="${() => this.toggleFiltro(id, opt.val)}">
                ${opt.lbl}
              </label>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  /* MINI-GRÁFICOS COMPACTOS (ÚLTIMOS 5 MESES) */
  renderChartQtd(segAtivo) {
    const dataFull = this.historicoMensal;
    if (!dataFull || dataFull.length === 0) {
      return html`<div class="mini-chart-loading">A carregar 5 meses...</div>`;
    }
    const data5 = dataFull.slice(-5);
    const valores = data5.map(d => d.qtd);
    const maxVal = Math.max(...valores, 10) * 1.25;

    const isTrendDown = valores[valores.length - 1] < valores[0];
    const corTema = isTrendDown ? '#ef4444' : '#16a34a';

    const w = 260, h = 120, padL = 20, padR = 20, padT = 24, padB = 22;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const slotW = plotW / 5;
    const barW = 14;

    const pts = data5.map((d, i) => {
      const cx = padL + i * slotW + slotW / 2;
      const cy = padT + plotH - (d.qtd / maxVal) * plotH;
      return { cx, cy, val: d.qtd, mes: d.mes.split('/')[0] };
    });

    const pathLine = pts.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`, '');

    return html`
      <div class="mini-chart-box">
        <div class="mini-chart-badge">ÚLTIMOS 5 MESES</div>
        <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: 100%; overflow: visible;">
          <line x1="${padL - 6}" y1="${padT + plotH}" x2="${w - padR + 6}" y2="${padT + plotH}" stroke="#e2e8f0" stroke-width="1.5"/>

          ${pts.map((p, i) => {
            const barH = Math.max(padT + plotH - p.cy, 3);
            const isLast = i === pts.length - 1;
            return html`
              <rect x="${(p.cx - barW / 2).toFixed(1)}" y="${p.cy.toFixed(1)}" width="${barW}" height="${barH.toFixed(1)}" 
                    rx="3" fill="${isLast ? corTema : '#cbd5e1'}" opacity="${isLast ? '0.35' : '0.25'}"/>
              
              <text x="${p.cx.toFixed(1)}" y="${(p.cy - 7).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="900" fill="${isLast ? corTema : '#475569'}">
                ${p.val}
              </text>

              <text x="${p.cx.toFixed(1)}" y="${(h - 4).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="800" fill="${isLast ? '#0f172a' : '#64748b'}">
                ${p.mes}
              </text>
            `;
          })}

          <path d="${pathLine}" fill="none" stroke="${corTema}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          
          ${pts.map((p, i) => html`
            <circle cx="${p.cx.toFixed(1)}" cy="${p.cy.toFixed(1)}" r="${i === pts.length - 1 ? '4' : '2.5'}" fill="${corTema}"/>
          `)}
        </svg>
      </div>
    `;
  }

  renderChartTM(segAtivo) {
    const dataFull = this.historicoMensal;
    if (!dataFull || dataFull.length === 0) {
      return html`<div class="mini-chart-loading">A carregar 5 meses...</div>`;
    }
    const data5 = dataFull.slice(-5);
    const valores = data5.map(d => d.tm);
    const maxVal = Math.max(...valores, 100) * 1.25;

    const isTrendDown = valores[valores.length - 1] < valores[0];
    const corTema = isTrendDown ? '#ef4444' : '#2563eb';

    const w = 260, h = 120, padL = 20, padR = 20, padT = 24, padB = 22;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const slotW = plotW / 5;

    const pts = data5.map((d, i) => {
      const cx = padL + i * slotW + slotW / 2;
      const cy = padT + plotH - (d.tm / maxVal) * plotH;
      return { cx, cy, val: d.tm, mes: d.mes.split('/')[0] };
    });

    const pathLine = pts.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`, '');
    const pathArea = `${pathLine} L ${pts[pts.length - 1].cx.toFixed(1)} ${(padT + plotH).toFixed(1)} L ${pts[0].cx.toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

    const fmtK = (v) => v >= 1e3 ? Math.round(v / 1e3) + 'k' : Math.round(v);

    return html`
      <div class="mini-chart-box">
        <div class="mini-chart-badge">ÚLTIMOS 5 MESES</div>
        <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: 100%; overflow: visible;">
          <defs>
            <linearGradient id="areaGradTM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${corTema}" stop-opacity="0.30"/>
              <stop offset="100%" stop-color="${corTema}" stop-opacity="0.02"/>
            </linearGradient>
          </defs>

          <line x1="${padL - 6}" y1="${padT + plotH}" x2="${w - padR + 6}" y2="${padT + plotH}" stroke="#e2e8f0" stroke-width="1.5"/>
          <path d="${pathArea}" fill="url(#areaGradTM)"/>
          <path d="${pathLine}" fill="none" stroke="${corTema}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

          ${pts.map((p, i) => {
            const isLast = i === pts.length - 1;
            return html`
              <circle cx="${p.cx.toFixed(1)}" cy="${p.cy.toFixed(1)}" r="${isLast ? '4' : '2.5'}" fill="${corTema}"/>
              
              <text x="${p.cx.toFixed(1)}" y="${(p.cy - 7).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="900" fill="${isLast ? corTema : '#475569'}">
                ${fmtK(p.val)}
              </text>

              <text x="${p.cx.toFixed(1)}" y="${(h - 4).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="800" fill="${isLast ? '#0f172a' : '#64748b'}">
                ${p.mes}
              </text>
            `;
          })}
        </svg>
      </div>
    `;
  }

  /* MODAL AMPLO DE 13 MESES */
  renderModalHistorico() {
    if (!this.modalExpandidoAberto) return '';

    const isQtd = this.metricaModal === 'QTD';
    const titulo = isQtd ? 'Histórico Temporal: Quantidade de Contratos' : 'Histórico Temporal: Ticket Médio';
    const cor = isQtd ? '#16a34a' : '#2563eb';
    const data13 = this.historicoMensal || [];

    const valores = data13.map(d => isQtd ? d.qtd : d.tm);
    const maxVal = Math.max(...valores, 1);
    const vFirst = valores[0] || 0;
    const vLast = valores[valores.length - 1] || 0;
    const diffPct = vFirst > 0 ? ((vLast - vFirst) / vFirst) * 100 : (vLast > 0 ? 100 : 0);
    const isYoYPos = diffPct >= 0;

    return html`
      <div class="modal-backdrop-blur" @click="${() => this.fecharModal()}">
        <div class="modal-window-72" @click="${(e) => e.stopPropagation()}">
          
          <div class="modal-head">
            <div>
              <div class="modal-crumb-tag">${this.segmentoSelecionado} • ANÁLISE TEMPORAL (13 MESES)</div>
              <h2 class="modal-head-title">${titulo}</h2>
              <div class="modal-kpi-sub">
                <span>Variação Homóloga (${data13[0]?.mes} vs ${data13[data13.length - 1]?.mes}):</span>
                <strong style="color: ${isYoYPos ? '#16a34a' : '#dc2626'}; font-size: 13px;">
                  ${isYoYPos ? '↗ +' : '↘ '}${diffPct.toFixed(1).replace('.', ',')}% YoY
                </strong>
              </div>
            </div>
            <button class="modal-btn-close" @click="${() => this.fecharModal()}">✕</button>
          </div>

          <div class="modal-chart-area">
            <div class="bars-13-flex">
              ${data13.map((item, idx) => {
                const val = isQtd ? item.qtd : item.tm;
                const pctHeight = Math.max((val / maxVal) * 100, 4);
                const isFirst = idx === 0;
                const isLast = idx === data13.length - 1;

                return html`
                  <div class="bar-col-13">
                    <span class="bar-val-13 ${isLast ? 'val-current' : ''}">
                      ${isQtd ? val : this.formatCurrency(val).replace('R$ ', '')}
                    </span>
                    <div class="bar-track-13">
                      <div class="bar-fill-13" 
                           style="height: ${pctHeight}%; background-color: ${isLast ? (val === 0 ? '#ef4444' : cor) : isFirst ? '#64748b' : '#94a3b8'};">
                      </div>
                    </div>
                    <span class="bar-lbl-13 ${isLast ? 'lbl-current' : ''}">${item.mes}</span>
                  </div>
                `;
              })}
            </div>
          </div>

          <div class="modal-foot">
            <div class="modal-chips">
              <span class="chip-item"><span class="chip-box" style="background: #64748b;"></span> ${data13[0]?.mes} (Base Ano Anterior)</span>
              <span class="chip-item"><span class="chip-box" style="background: ${cor};"></span> ${data13[data13.length - 1]?.mes} (Mês de Fecho)</span>
            </div>
            <button class="btn-fechar-modal" @click="${() => this.fecharModal()}">Fechar (Esc)</button>
          </div>

        </div>
      </div>
    `;
  }

  /* MODAL AMPLIADO DE CURVA ABC, OFERTAS & CLIENTES (72VW) */
  renderModalCurvaAbc() {
    if (!this.modalCurvaAbcAberto) return '';

    const isDetalhe = Boolean(this.curvaAbcAtiva);
    const isClientes = this.tipoDetalheCurva === 'CLIENTES';

    const titulo = isDetalhe
      ? (isClientes
          ? `Clientes da Classe ${this.curvaAbcAtiva}`
          : `Ofertas Comerciais da Classe ${this.curvaAbcAtiva}`)
      : `Classificação 1 (Curva ABC) do Segmento`;

    const listaBase = isDetalhe
      ? (isClientes ? this.itensClientes : this.itensOfertas)
      : this.itensCurvaAbc;

    const termo = (this.buscaDetalheCurva || '').trim().toLowerCase();
    const itens = (isDetalhe && termo)
      ? listaBase.filter(it => it.nome.toLowerCase().includes(termo))
      : listaBase;

    const labelContagem = !isDetalhe
      ? (itens.length === 1 ? 'classificação' : 'classificações')
      : isClientes
        ? (itens.length === 1 ? 'cliente' : 'clientes')
        : (itens.length === 1 ? 'oferta' : 'ofertas');

    return html`
      <div class="modal-backdrop-blur" @click="${() => this.fecharModalCurvaAbc()}">
        <div class="modal-window-72" @click="${(e) => e.stopPropagation()}">
          
          <div class="modal-head">
            <div>
              <div class="modal-crumb-tag">
                <span>${this.segmentoSelecionado}</span>
                <span>/</span>
                <span class="${isDetalhe ? 'crumb-link-active' : ''}" @click="${() => this.voltarParaCurvaAbc()}">Curva ABC</span>
                ${isDetalhe ? html`
                  <span>/</span>
                  <span style="color: #0f172a; font-weight: 900;">${this.curvaAbcAtiva}</span>
                  <span>•</span>
                  <span style="color: #6366f1; font-weight: 900;">${isClientes ? 'CLIENTES' : 'OFERTAS'}</span>
                ` : ''}
              </div>
              <h2 class="modal-head-title">${titulo}</h2>
              <div class="modal-kpi-sub">
                <span>Selecione uma opção de ordenação ou clique nos cabeçalhos para classificar.</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 14px;">
              ${isDetalhe ? html`
                <div class="detail-switch-group">
                  <button
                    type="button"
                    class="detail-switch-btn ${!isClientes ? 'active' : ''}"
                    @click="${() => this.alternarTipoDetalheCurva('OFERTAS')}">
                    📦 Ver Ofertas
                  </button>
                  <button
                    type="button"
                    class="detail-switch-btn ${isClientes ? 'active' : ''}"
                    @click="${() => this.alternarTipoDetalheCurva('CLIENTES')}">
                    🏢 Ver Clientes
                  </button>
                </div>
              ` : ''}

              <button class="modal-btn-close" @click="${() => this.fecharModalCurvaAbc()}" title="Fechar (Esc)">✕</button>
            </div>
          </div>

          <!-- BARRA DE CONTROLE DE ORDENAÇÃO MULTI-CRITÉRIO -->
          <div class="modal-sort-bar">
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
                <select class="sort-select" .value="${this.criterioOrdenacaoCurva}" @change="${(e) => this.alterarOrdenacaoCurva(e.target.value)}">
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

            <div class="sort-bar-right" style="display: flex; align-items: center; gap: 10px;">
              ${isDetalhe ? html`
                <input
                  type="text"
                  class="modal-search-input"
                  placeholder="${isClientes ? 'Filtrar cliente...' : 'Filtrar oferta...'}"
                  .value="${this.buscaDetalheCurva}"
                  @input="${(e) => { this.buscaDetalheCurva = e.target.value; this.requestUpdate(); }}"
                />
              ` : ''}
              <span class="sort-count-badge">${itens.length} ${labelContagem}</span>
            </div>
          </div>

          <div class="modal-table-scroll-area">
            ${this.carregandoDrill ? html`
              <div class="modal-drill-loading">
                <div class="drill-spinner"></div>
                <span>A consultar dados LookML em tempo real...</span>
              </div>
            ` : !isDetalhe ? html`
              <!-- TABELA NÍVEL 1: CLASSIFICAÇÃO 1 (CURVA ABC) -->
              <table class="modal-expanded-table">
                <thead>
                  <tr>
                    <th style="width: 34%;">Classificação 1 (Curva ABC)</th>
                    <th style="width: 20%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacaoCurva(this.criterioOrdenacaoCurva === 'prod_desc' ? 'prod_asc' : 'prod_desc')}"
                        title="Clique para alternar ordenação por Produção">
                      Produção ${this.criterioOrdenacaoCurva.startsWith('prod') ? (this.criterioOrdenacaoCurva === 'prod_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 18%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacaoCurva(this.criterioOrdenacaoCurva === 'rep_desc' ? 'rep_asc' : 'rep_desc')}"
                        title="Clique para alternar ordenação por Representatividade">
                      Representatividade (%) ${this.criterioOrdenacaoCurva.startsWith('rep') ? (this.criterioOrdenacaoCurva === 'rep_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 18%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacaoCurva(this.criterioOrdenacaoCurva === 'tm_desc' ? 'tm_asc' : 'tm_desc')}"
                        title="Clique para alternar ordenação por Ticket Médio">
                      Ticket Médio ${this.criterioOrdenacaoCurva.startsWith('tm') ? (this.criterioOrdenacaoCurva === 'tm_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 10%; text-align: center;">Histórico</th>
                  </tr>
                </thead>
                <tbody>
                  ${itens.length === 0 ? html`
                    <tr><td colspan="5" class="drill-empty">Nenhum registro encontrado para este segmento.</td></tr>
                  ` : itens.map(item => html`
                    <tr class="modal-row-clickable" @click="${() => this.carregarDetalheDaClasse(item.nome, 'OFERTAS')}">
                      <td>
                        <div class="drill-title-wrap">
                          <span class="drill-name">${item.nome}</span>
                          <span class="drill-tag-hint">Ver Ofertas e Clientes ›</span>
                        </div>
                      </td>

                      <td style="text-align: right;">
                        <div class="stacked-metric">
                          <div class="stacked-yoy">
                            ${this.renderMiniYoY(item.yoyProdObj.texto, item.yoyProdObj.isPos)}
                          </div>
                          <div class="stacked-value">${item.prodFmt}</div>
                        </div>
                      </td>

                      <td style="text-align: right;">
                        <div class="rep-bar-flex">
                          <span class="rep-number-txt">${item.repPct.toFixed(1).replace('.', ',')}%</span>
                          <div class="rep-track-mini"><div class="rep-fill-mini" style="width: ${Math.min(item.repPct, 100)}%;"></div></div>
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
                        <button
                          type="button"
                          class="btn-expand-modal"
                          style="display: inline-flex;"
                          @click="${(e) => { e.stopPropagation(); this.abrirModalProducao13('CURVA_ABC', item.nome); }}"
                          title="Expandir histórico de Produção (13 meses)">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            ` : html`
              <!-- TABELA NÍVEL 2: OFERTAS COMERCIAIS OU CLIENTES DA CLASSE -->
              <table class="modal-expanded-table">
                <thead>
                  <tr>
                    <th style="width: 34%;">${isClientes ? 'Cliente' : 'Oferta Comercial'}</th>
                    <th style="width: 20%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacaoCurva(this.criterioOrdenacaoCurva === 'prod_desc' ? 'prod_asc' : 'prod_desc')}"
                        title="Clique para alternar ordenação por Produção">
                      Produção ${this.criterioOrdenacaoCurva.startsWith('prod') ? (this.criterioOrdenacaoCurva === 'prod_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 18%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacaoCurva(this.criterioOrdenacaoCurva === 'rep_desc' ? 'rep_asc' : 'rep_desc')}"
                        title="Clique para alternar ordenação por Representatividade">
                      Representatividade (%) ${this.criterioOrdenacaoCurva.startsWith('rep') ? (this.criterioOrdenacaoCurva === 'rep_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 18%; text-align: right; cursor: pointer;" 
                        @click="${() => this.alterarOrdenacaoCurva(this.criterioOrdenacaoCurva === 'tm_desc' ? 'tm_asc' : 'tm_desc')}"
                        title="Clique para alternar ordenação por Ticket Médio">
                      Ticket Médio ${this.criterioOrdenacaoCurva.startsWith('tm') ? (this.criterioOrdenacaoCurva === 'tm_desc' ? '▼' : '▲') : ''}
                    </th>
                    <th style="width: 10%; text-align: center;">Histórico</th>
                  </tr>
                </thead>
                <tbody>
                  ${itens.length === 0 ? html`
                    <tr>
                      <td colspan="5" class="drill-empty">
                        ${isClientes
                          ? 'Nenhum cliente vinculado a esta classe.'
                          : 'Nenhuma oferta comercial vinculada a esta classe.'}
                      </td>
                    </tr>
                  ` : itens.map(item => html`
                    <tr class="modal-row-clickable" @click="${() => this.abrirModalProducao13(isClientes ? 'CLIENTE' : 'OFERTA', item.nome)}">
                      <td>
                        <span class="drill-name" style="font-size: 13px;">${item.nome}</span>
                      </td>

                      <td style="text-align: right;">
                        <div class="stacked-metric">
                          <div class="stacked-yoy">
                            ${this.renderMiniYoY(item.yoyProdObj.texto, item.yoyProdObj.isPos)}
                          </div>
                          <div class="stacked-value">${item.prodFmt}</div>
                        </div>
                      </td>

                      <td style="text-align: right;">
                        <div class="rep-bar-flex">
                          <span class="rep-number-txt">${item.repPct.toFixed(1).replace('.', ',')}%</span>
                          <div class="rep-track-mini"><div class="rep-fill-mini" style="width: ${Math.min(item.repPct, 100)}%;"></div></div>
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
                        <button
                          type="button"
                          class="btn-expand-modal"
                          style="display: inline-flex;"
                          @click="${(e) => { e.stopPropagation(); this.abrirModalProducao13(isClientes ? 'CLIENTE' : 'OFERTA', item.nome); }}"
                          title="Expandir histórico de Produção (13 meses)">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            `}
          </div>

          <div class="modal-foot">
            ${isDetalhe ? html`
              <button class="btn-voltar-drill" @click="${() => this.voltarParaCurvaAbc()}">
                ‹ Voltar para Curva ABC (${this.segmentoSelecionado})
              </button>
            ` : html`
              <span class="modal-count-txt">${this.itensCurvaAbc.length} classificações registradas</span>
            `}
            <button class="btn-fechar-modal" @click="${() => this.fecharModalCurvaAbc()}">Fechar (Esc)</button>
          </div>

        </div>
      </div>
    `;
  }

  render() {
    const isNaoRec = this.tipoReceita === 'NAO_RECORRENTE';
    const DADOS_AREAS = this.dadosAreas || {};
    const DADOS_SEGMENTOS = this.dadosSegmentos || {};
    const GLOBAL = this.globalData || { prod: '--', meta: '--', ating: 0, delta: '--', yoy: '--', isPos: true };
    const TABELA_ATIVA = this.tabelaData || [];

    const viewMode = this.areaSelecionada ? 'list-mode' : 'grid-mode';
    const areaAtiva = this.areaSelecionada ? DADOS_AREAS[this.areaSelecionada] : null;
    const segmentosDaArea = this.areaSelecionada && DADOS_SEGMENTOS[this.areaSelecionada] ? DADOS_SEGMENTOS[this.areaSelecionada] : {};
    const segAtivo = this.segmentoSelecionado ? segmentosDaArea[this.segmentoSelecionado] : null;

    const segmentosOrdenados = Object.keys(segmentosDaArea)
      .map(key => ({ key, ...segmentosDaArea[key] }))
      .sort((a, b) => b.rep - a.rep);

    const areasOrdenadas = Object.keys(DADOS_AREAS)
      .map(k => DADOS_AREAS[k])
      .sort((a, b) => (b.valRaw || 0) - (a.valRaw || 0));

    const totalAreas = areasOrdenadas.length;

    const rectMap = {};
    if (!this.areaSelecionada && totalAreas > 0) {
      const rects = this.computeTreemap(areasOrdenadas);
      rects.forEach(r => { rectMap[r.key] = r; });
    }

    const anosOpt = ['2023', '2024', '2025', '2026'].map(a => ({ lbl: a, val: a }));
    const mesesOpt = [
      { lbl: '1 - Janeiro', val: '1' }, { lbl: '2 - Fevereiro', val: '2' },
      { lbl: '3 - Março', val: '3' }, { lbl: '4 - Abril', val: '4' },
      { lbl: '5 - Maio', val: '5' }, { lbl: '6 - Junho', val: '6' },
      { lbl: '7 - Julho', val: '7' }, { lbl: '8 - Agosto', val: '8' },
      { lbl: '9 - Setembro', val: '9' }, { lbl: '10 - Outubro', val: '10' },
      { lbl: '11 - Novembro', val: '11' }, { lbl: '12 - Dezembro', val: '12' }
    ];
    const recOpt = this.opcoesReceita.map(r => ({ lbl: r, val: r }));
    const segOpt = this.opcoesSegmento.map(s => ({ lbl: s, val: s }));

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
          padding: 16px 28px 48px 28px; 
          position: relative;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
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

        .hero-banner, .filters-bar, .summary-bar-single, .tactical-flow-banner, .cascade-grid, .table-section { 
          position: relative; 
          flex-shrink: 0; 
        }

        /* CABEÇALHO HERO TOTVS */
        .hero-banner { 
          background-color: rgba(255, 255, 255, 0.95); 
          border-radius: 12px; 
          padding: 16px 24px; 
          margin-bottom: 12px; 
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.1); 
          display: flex; 
          align-items: center; 
          min-height: 85px; 
          overflow: hidden; 
          z-index: 10;
          backdrop-filter: blur(10px); 
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
          right: 90px; 
          top: 50%; 
          transform: translateY(-50%); 
          width: 80px; 
          height: 80px; 
          background-size: contain; 
          background-position: center; 
          background-repeat: no-repeat; 
          z-index: 2; 
          pointer-events: none; 
        }

        .filter-icon-btn { 
          position: absolute; 
          top: 14px; 
          right: 20px; 
          z-index: 4; 
          cursor: pointer; 
          transition: transform 0.2s ease; 
        }
        .filter-icon-btn:hover { transform: scale(1.1); }
        
        .title-area { position: relative; z-index: 3; flex: 1; }
        .title-area h1 { font-size: 22px; font-weight: 900; margin: 0 0 4px 0; color: #000; letter-spacing: -0.5px; text-transform: uppercase; }

        .toggle-group { display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 4px; border: 1px solid #cbd5e1; }
        .toggle-group button { background: transparent; border: none; padding: 6px 16px; font-size: 12px; font-weight: 700; color: #64748b; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; outline: none; }
        .toggle-group button.active { background: #ffffff; color: #6366f1; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

        .btn-explorar {
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 25%, #7c3aed 70%, #a855f7 100%);
          color: #ffffff; 
          border: none; 
          padding: 8px 16px; 
          font-size: 12px; 
          font-weight: 700; 
          border-radius: 8px; 
          cursor: pointer; 
          transition: all 0.2s ease; 
          display: inline-flex; 
          align-items: center; 
          gap: 6px; 
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35);
        }
        .btn-explorar:hover { filter: brightness(1.15); transform: translateY(-1px); }

        .filters-bar { 
          display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: flex-end; 
          margin-bottom: 14px; background: rgba(255, 255, 255, 0.75); padding: 8px 16px; 
          border-radius: 8px; backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8); 
          position: relative; z-index: 50; 
        }

        .multi-select-container { position: relative; display: inline-block; }
        .multi-select-btn { 
          background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(203, 213, 225, 0.8); 
          padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #334155; 
          min-width: 140px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02); user-select: none; backdrop-filter: blur(8px); transition: all 0.2s; 
        }
        .multi-select-btn:hover { background: #ffffff; border-color: #cbd5e1; }
        .multi-select-btn span { font-size: 9px; color: #94a3b8; }
        
        .multi-select-dropdown { 
          position: absolute; top: calc(100% + 4px); left: 0; min-width: 200px; background: white; 
          border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 24px -5px rgba(0,0,0,0.18); 
          z-index: 100; max-height: 250px; overflow-y: auto; padding: 6px 0; 
        }

        .multi-select-option { 
          display: flex; align-items: center; gap: 8px; padding: 6px 14px; font-size: 11.5px; 
          color: #1e293b; cursor: pointer; transition: background 0.15s; 
        }
        .multi-select-option:hover { background: #f1f5f9; }

        .status-box { 
          background: rgba(255,255,255,0.9); border: 1px solid #e2e8f0; border-radius: 10px; 
          padding: 24px; text-align: center; max-width: 450px; margin: 30px auto; color: #475569; 
          backdrop-filter: blur(12px); box-shadow: 0 4px 12px -2px rgba(0,0,0,0.08); z-index: 1;
        }

        .summary-bar-single { 
          background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; 
          margin-bottom: 12px; padding: 14px 0; box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); z-index: 5;
        }
        .summary-section { flex: 1; padding: 0 24px; display: flex; flex-direction: column; justify-content: center; }
        .summary-divider { width: 1px; height: 46px; background: #cbd5e1; } 
        .summary-label { font-size: 10.5px; text-transform: uppercase; color: #64748b; font-weight: 800; margin-bottom: 4px; letter-spacing: 0.5px; }
        .summary-value { font-size: 21px; font-weight: 900; display: flex; align-items: baseline; gap: 8px; color: #0f172a; }
        .progress-bar-bg { height: 7px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-top: 5px; width: 100%; border: 1px solid #cbd5e1; }
        .progress-bar-fill { height: 100%; border-radius: 999px; transition: width 0.5s ease; }

        .text-green { color: #16a34a !important; }
        .text-red { color: #dc2626 !important; }
        .bg-green { background: #16a34a !important; }
        .bg-red { background: #dc2626 !important; }

        .badge-yoy, .badge-ating { font-size: 11.5px; font-weight: 800; padding: 3px 8px; border-radius: 5px; display: inline-flex; align-items: center; line-height: 1.2; }
        .badge-up { background: #dcfce7 !important; color: #15803d !important; }
        .badge-down { background: #fee2e2 !important; color: #dc2626 !important; }

        /* FAIXA SIMPLIFICADA COM LÂMPADA */
        .tactical-flow-banner {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid #e2e8f0;
          border-left: 4px solid #7c3aed;
          border-radius: 10px;
          padding: 10px 18px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          gap: 16px;
        }

        .tactical-flow-banner.drill-active {
          border-left-color: #2563eb;
          background: #f8fafc;
        }

        .flow-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .flow-message {
          font-size: 12.5px;
          font-weight: 700;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flow-message strong {
          color: #7c3aed;
        }

        .flow-right-hint {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        .crumb-sep {
          color: #cbd5e1;
          font-size: 12px;
        }

        .crumb-tag {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }

        .crumb-tag strong {
          color: #0f172a;
          font-weight: 900;
        }

        /* GRID PRINCIPAL */
        .cascade-grid { display: flex; gap: 18px; align-items: stretch; flex: 1; min-height: 450px; z-index: 1; }
        .panel { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; box-shadow: 0 4px 16px -2px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; }
        .panel-header { margin-bottom: 16px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; font-size: 15px; flex-shrink: 0; }
        .panel-subtitle { font-size: 12px; color: #64748b; margin-bottom: 16px; margin-top: -12px; font-weight: 500; }

        .col-areas { flex: ${!this.areaSelecionada ? '1' : this.segmentoSelecionado ? '0 0 20%' : '0 0 28%'}; transition: flex 0.4s ease; min-width: 0; }
        .col-segmentos { flex: ${this.segmentoSelecionado ? '0 0 32%' : '1'}; transition: flex 0.4s ease; min-width: 0; }
        .col-diagnostico { flex: 1; min-width: 0; transition: flex 0.4s ease; }

        .btn-voltar-treemap {
          background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #475569;
          font-size: 11px; font-weight: 800; padding: 4px 10px; cursor: pointer; transition: all 0.15s;
        }
        .btn-voltar-treemap:hover { background: #e2e8f0; color: #0f172a; }

        .treemap-container.grid-mode { 
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 440px;
        }

        .treemap-container.grid-mode .tm-card {
          position: absolute;
          box-sizing: border-box;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        
        .treemap-container.list-mode { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; padding-right: 4px; }
        .treemap-container.list-mode .tm-card {
          position: static !important;
          width: 100% !important;
          height: auto !important;
          left: auto !important;
          top: auto !important;
          padding: 12px 14px;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .tm-card { 
          border: none; 
          border-radius: 12px; 
          cursor: pointer; 
          text-align: left; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          position: relative; 
          overflow: hidden; 
          background: var(--card-bg) !important; 
          color: #ffffff !important; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.15); 
          padding: 14px 16px; 
        }

        .grid-mode .tm-card:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25); 
          z-index: 20;
        }

        /* OVERLAY ACINZENTADO TRANSLÚCIDO NO HOVER */
        .tm-hover-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.38);
          backdrop-filter: blur(1.5px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          z-index: 25;
          padding: 10px;
          box-sizing: border-box;
        }

        .grid-mode .tm-card:hover .tm-hover-overlay {
          opacity: 1;
        }

        .tm-hover-msg {
          background: rgba(15, 23, 42, 0.78);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(4px);
          font-size: 11.5px;
          font-weight: 800;
          padding: 7px 14px;
          border-radius: 6px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          letter-spacing: 0.3px;
          text-align: center;
          white-space: nowrap;
          max-width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .list-mode .tm-card.inactive { background: #ffffff !important; border: 1px solid #cbd5e1 !important; color: #475569 !important; box-shadow: none; }
        .list-mode .tm-card.inactive:hover { background: #f8fafc !important; }
        .list-mode .tm-card.inactive .tm-subtitle { color: #64748b; }
        .list-mode .tm-card.active { border: 2px solid #6366f1 !important; box-shadow: 0 0 15px rgba(99, 102, 241, 0.3); }

        .tm-title { 
          font-weight: 800; 
          font-size: 15px; 
          letter-spacing: 0.5px; 
          display: flex; 
          align-items: flex-start; 
          justify-content: space-between; 
          flex-wrap: wrap; 
          gap: 4px; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }
        .tm-value { font-weight: 900; font-size: 24px; margin: 4px 0; }
        .tm-subtitle { 
          font-weight: 700; 
          font-size: 12px; 
          opacity: 0.95; 
          display: flex; 
          align-items: center; 
          flex-wrap: wrap; 
          gap: 8px; 
        }
        .tm-rep-tag {
          font-size: 13.5px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.2px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.25);
        }
        
        .rep-badge { font-size: 12px; font-weight: 800; padding: 2px 7px; border-radius: 4px; background: rgba(255, 255, 255, 0.25); color: #fff; line-height: 1; }
        .list-mode .tm-card.inactive .rep-badge { background: #e2e8f0; color: #64748b; }

        .list-mode .tm-title { font-size: 13px; margin: 0; }
        .list-mode .tm-value { font-size: 14px; margin: 0; font-weight: 800; }
        .list-mode .tm-subtitle { display: none; }

        .rx-header { display: flex; align-items: center; padding: 0 14px 10px; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 800; border-bottom: 2px solid #cbd5e1; margin-bottom: 12px; flex-shrink: 0; }
        .rx-header-seg { flex: 1; }
        .rx-header-ating { width: 170px; }
        .rx-header-yoy { width: 96px; text-align: right; }
        .rx-header-hist { width: 46px; text-align: right; }
        .rx-list { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; padding-right: 4px; }
        .rx-item { display: flex; align-items: center; padding: 12px 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
        .rx-item:hover { background: #f8fafc; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
        .rx-item.active { background: #eff6ff; border: 2px solid #818cf8; border-left: 6px solid #6366f1; box-shadow: 0 0 12px rgba(99, 102, 241, 0.2); }
        .rx-seg-name { flex: 1; font-weight: 800; font-size: 13px; color: #0f172a; display: flex; align-items: center; gap: 8px; min-width: 0; }
        .rx-ating-wrapper { width: 170px; display: flex; align-items: center; gap: 8px; }
        .rx-yoy-wrapper { width: 96px; text-align: right; }
        .rx-hist-wrapper { width: 46px; display: flex; justify-content: flex-end; }
        .rx-micro-bar-bg { flex: 1; max-width: 100px; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; border: 1px solid #cbd5e1; }
        .rx-micro-bar-fill { height: 100%; border-radius: 999px; }
        .rx-ating-val { font-weight: 800; font-size: 13px; width: 42px; text-align: right; }

        .diag-grid-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; margin-top: 10px; }
        .diag-card { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
        .diag-title { font-size: 14px; font-weight: 900; color: #0f172a; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
        
        .btn-expand-modal {
          background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 8px;
          cursor: pointer; color: #475569; display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .btn-expand-modal:hover { background: #002b49; color: #ffffff; border-color: #002b49; }

        .metric-pill { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; color: #0f172a; }

        .mini-chart-box {
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;
          padding: 8px 10px; position: relative; height: 128px; display: flex;
          flex-direction: column; justify-content: flex-end;
        }
        .mini-chart-badge {
          position: absolute; top: 6px; left: 8px; font-size: 9px; font-weight: 900;
          color: #64748b; letter-spacing: 0.4px;
        }
        .mini-chart-loading {
          padding: 30px; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 700;
        }

        .diag-sintese { background: #ffffff; border-left: 4px solid #6366f1; border-top: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; border-radius: 10px; padding: 16px 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
        .sintese-header { color: #0f172a; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .sintese-financeira { display: flex; justify-content: space-between; align-items: center; }
        .fin-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 800; margin-bottom: 4px; }
        .fin-value { font-size: 18px; font-weight: 900; }
        .fin-divider { width: 1px; height: 36px; background: #e2e8f0; }

        .btn-open-ofertas-modal {
          margin-top: 14px; width: 100%; background: #ffffff; border: 1.5px solid #cbd5e1;
          border-radius: 10px; padding: 12px 18px; display: flex; justify-content: space-between;
          align-items: center; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(0,0,0,0.03);
          outline: none;
        }
        .btn-open-ofertas-modal:hover {
          border-color: #6366f1; background: #f8fafc; transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.12);
        }
        .open-modal-icon {
          display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800;
          color: #6366f1; background: #eff6ff; padding: 4px 10px; border-radius: 6px;
        }
        .btn-open-ofertas-modal:hover .open-modal-icon {
          background: #6366f1; color: #ffffff;
        }

        /* MODAIS EXPANDIDOS */
        .modal-backdrop-blur {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.70); backdrop-filter: blur(10px);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
          animation: modalFade 0.2s ease;
        }
        @keyframes modalFade { from { opacity: 0; } to { opacity: 1; } }

        .modal-window-72 {
          background: #ffffff; width: 72vw; min-width: 950px; max-width: 1450px;
          min-height: 580px; max-height: 88vh; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
          overflow: hidden; display: flex; flex-direction: column;
        }
        .modal-head {
          padding: 22px 32px; border-bottom: 1px solid #e2e8f0; background: #f8fafc;
          display: flex; justify-content: space-between; align-items: flex-start; flex-shrink: 0;
        }
        .modal-crumb-tag { font-size: 11.5px; font-weight: 800; color: #64748b; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
        .crumb-link-active { color: #6366f1; cursor: pointer; text-decoration: underline; }
        .modal-head-title { font-size: 22px; font-weight: 900; color: #0f172a; margin: 0 0 4px 0; }
        .modal-kpi-sub { font-size: 12.5px; color: #475569; display: flex; gap: 8px; }
        .modal-btn-close {
          background: #ffffff; border: 1px solid #cbd5e1; width: 34px; height: 34px;
          border-radius: 50%; cursor: pointer; font-weight: 700; display: flex;
          align-items: center; justify-content: center; transition: all 0.15s;
        }
        .modal-btn-close:hover { background: #0f172a; color: #ffffff; border-color: #0f172a; }

        /* TOGGLE OFERTAS / CLIENTES NO MODAL */
        .detail-switch-group {
          display: inline-flex;
          background: #e2e8f0;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #cbd5e1;
          gap: 4px;
        }
        .detail-switch-btn {
          background: transparent;
          border: none;
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 800;
          color: #475569;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .detail-switch-btn:hover {
          color: #0f172a;
        }
        .detail-switch-btn.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 43, 73, 0.25);
        }

        .modal-sort-bar {
          background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 10px 32px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-shrink: 0;
        }
        .sort-bar-left { display: flex; align-items: center; gap: 10px; }
        .sort-bar-label { font-size: 11px; font-weight: 900; color: #475569; display: flex; align-items: center; gap: 6px; letter-spacing: 0.4px; }
        .sort-select { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 12px; font-size: 12px; font-weight: 800; color: #0f172a; cursor: pointer; outline: none; }
        .sort-select:hover, .sort-select:focus { border-color: #6366f1; }
        .modal-search-input {
          background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 10px;
          font-size: 12px; font-weight: 600; color: #0f172a; outline: none; min-width: 190px;
        }
        .modal-search-input:focus { border-color: #6366f1; background: #ffffff; }
        .sort-count-badge { font-size: 11.5px; font-weight: 800; color: #64748b; background: #f1f5f9; padding: 3px 9px; border-radius: 12px; }

        .modal-chart-area { padding: 32px 32px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .bars-13-flex {
          display: flex; align-items: flex-end; justify-content: space-between;
          height: 290px; gap: 12px;
        }
        .bar-col-13 {
          flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%;
        }
        .bar-val-13 { font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 6px; white-space: nowrap; }
        .bar-val-13.val-current { color: #0f172a; font-weight: 900; font-size: 12.5px; }
        .bar-track-13 { flex: 1; width: 100%; max-width: 44px; display: flex; align-items: flex-end; }
        .bar-fill-13 { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.3s ease; }
        .bar-lbl-13 { font-size: 10.5px; font-weight: 700; color: #64748b; margin-top: 8px; white-space: nowrap; }
        .bar-lbl-13.lbl-current { color: #0f172a; font-weight: 900; }

        .modal-table-scroll-area {
          flex: 1; overflow-y: auto; padding: 16px 32px; background: #ffffff;
        }
        .modal-expanded-table {
          width: 100%; border-collapse: collapse; font-size: 13px;
        }
        .modal-expanded-table th {
          background: #ffffff; color: #64748b; font-size: 11px; font-weight: 800;
          text-transform: uppercase; padding: 12px 14px; border-bottom: 2px solid #e2e8f0;
          position: sticky; top: 0; z-index: 2; user-select: none;
        }
        .modal-expanded-table th:hover { color: #6366f1; }
        .modal-expanded-table td {
          padding: 13px 14px; border-bottom: 1px solid #f1f5f9; color: #1e293b;
          vertical-align: middle;
        }
        .modal-row-clickable {
          cursor: pointer; transition: background 0.15s;
        }
        .modal-row-clickable:hover {
          background: #f8fafc;
        }
        .drill-title-wrap {
          display: flex; flex-direction: column; gap: 2px;
        }
        .drill-name {
          font-weight: 800; color: #0f172a; font-size: 13.5px;
        }
        .drill-tag-hint {
          font-size: 11px; color: #6366f1; font-weight: 700;
        }

        .stacked-metric {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
        }
        .stacked-yoy {
          display: flex; align-items: center; justify-content: flex-end;
        }
        .mini-yoy {
          font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 3px; line-height: 1.1;
        }
        .mini-pos { color: #16a34a; }
        .mini-neg { color: #dc2626; background: #fee2e2; padding: 1px 5px; border-radius: 4px; }
        .mini-muted { color: #94a3b8; }
        .stacked-value { font-size: 14px; font-weight: 800; color: #0f172a; }

        .rep-bar-flex {
          display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
        }
        .rep-number-txt {
          font-weight: 800; color: #334155;
        }
        .rep-track-mini {
          width: 85px; height: 5px; background: #e2e8f0; border-radius: 3px; overflow: hidden;
        }
        .rep-fill-mini {
          height: 100%; background: #6366f1; border-radius: 3px;
        }
        .drill-empty {
          text-align: center; padding: 60px 20px; color: #94a3b8; font-weight: 700;
        }
        .modal-drill-loading {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 280px; gap: 14px; color: #64748b; font-weight: 700;
        }
        .drill-spinner {
          width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #6366f1;
          border-radius: 50%; animation: spinMesh 0.8s linear infinite;
        }

        .modal-foot {
          padding: 16px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0;
          display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
        }
        .modal-chips { display: flex; gap: 18px; font-size: 12px; font-weight: 700; color: #475569; }
        .chip-item { display: flex; align-items: center; gap: 6px; }
        .chip-box { width: 12px; height: 12px; border-radius: 3px; }
        .modal-count-txt { font-size: 12px; color: #64748b; font-weight: 700; }
        .btn-voltar-drill {
          background: #ffffff; border: 1.5px solid #cbd5e1; color: #334155; padding: 7px 16px;
          border-radius: 6px; font-size: 12px; font-weight: 800; cursor: pointer; transition: all 0.2s;
        }
        .btn-voltar-drill:hover { border-color: #6366f1; color: #6366f1; }
        .btn-fechar-modal {
          background: #002b49; color: #ffffff; border: none; padding: 8px 18px;
          border-radius: 6px; font-size: 12px; font-weight: 800; cursor: pointer;
        }

        .view-hidden { display: none !important; }

        /* TABELA PBI */
        .table-section { background: rgba(255, 255, 255, 0.95); padding: 24px; border-radius: 12px; box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); border: 1px solid rgba(255, 255, 255, 1); backdrop-filter: blur(16px); margin-bottom: 32px; z-index: 1; }
        .table-title { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 16px; text-align: center; letter-spacing: 0.5px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { background-color: #002b49; color: white; text-align: right; padding: 12px 10px; font-weight: 700; border: 1px solid #cbd5e1; letter-spacing: 0.2px; }
        th:first-child { text-align: left; }
        td { padding: 10px 8px; border: 1px solid #e2e8f0; text-align: right; color: #334155; }
        td:first-child { text-align: left; }
        .row-area { font-weight: 700; background-color: #ffffff; cursor: pointer; transition: background-color 0.2s; }
        .row-area:hover { background-color: #f1f5f9; }
        .row-area td { color: #0f172a; }
        .row-segmento { background-color: #f8fafc; }
        .row-segmento td:first-child { padding-left: 32px; color: #475569; font-weight: 500; }
        .row-segmento:hover { background-color: #f1f5f9; }
        .row-total { background-color: #002b49; color: white !important; font-weight: 800; }
        .row-total td { color: white; border-color: #002b49; }
        .toggle-icon { display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: 1px solid #94a3b8; color: #475569; font-size: 11px; margin-right: 8px; background: white; cursor: pointer; border-radius: 2px; }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO HERO TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="filter-icon-btn" @click="${() => this.mostrarFiltros = !this.mostrarFiltros}" title="Mostrar/Ocultar Filtros">
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M3 4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v2c0 .27-.11.52-.29.71L15 12.41V20c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-6.59L4.29 6.71C4.11 6.52 4 6.27 4 6V4z"/></svg>
          </div>
          
          <div class="title-area">
            <h1>PERFORMANCE DOS SEGMENTOS V2</h1>
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <div class="toggle-group">
                <button class="${isNaoRec ? 'active' : ''}" @click="${() => this.mudarReceita('NAO_RECORRENTE')}">Não Recorrente</button>
                <button class="${!isNaoRec ? 'active' : ''}" @click="${() => this.mudarReceita('RECORRENTE')}">Recorrente</button>
              </div>

              <button class="btn-explorar" @click="${() => this.toggleVisao()}">
                ${this.visaoTabela 
                  ? html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> Explorar painel interativo`
                  : html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Explorar dados em tabela`
                }
              </button>
            </div>
          </div>
        </div>

        <!-- FILTROS MULTI-SELECT -->
        ${this.mostrarFiltros ? html`
          <div class="filters-bar">
            ${this.renderMultiSelect('ano', 'Ano (Todos)', anosOpt)}
            ${this.renderMultiSelect('mes', 'Mês (Todos)', mesesOpt)}
            ${this.renderMultiSelect('receita', this.loadingFilters ? 'A carregar...' : 'Tipo Receita (Todos)', recOpt)}
            ${this.renderMultiSelect('segmento', this.loadingFilters ? 'A carregar...' : 'Segmento (Todos)', segOpt)}
          </div>
        ` : ''}

        ${this.loading ? html`
          <div class="status-box"><p>A calcular métricas reais na camada semântica rlz_vendas...</p></div>
        ` : this.error ? html`
          <div class="status-box" style="border-color: #fecaca; background: #fef2f2; color: #991b1b;">
            <strong>Erro na consulta LookML:</strong> ${this.error}
          </div>
        ` : totalAreas === 0 ? html`
          <div class="status-box"><p>Nenhum dado encontrado para os filtros selecionados.</p></div>
        ` : html`
          <!-- BARRA SUPERIOR DINÂMICA -->
          ${!areaAtiva ? html`
            <div class="summary-bar-single ${this.visaoTabela ? 'view-hidden' : ''}">
              <div class="summary-section">
                <div class="summary-label">Produção Geral</div>
                <div class="summary-value">${GLOBAL.prod} <span class="badge-yoy ${GLOBAL.isPos ? 'badge-up' : 'badge-down'}">${GLOBAL.yoy} YoY</span></div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-label">Meta Orçada</div>
                <div class="summary-value">${GLOBAL.meta}</div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section" style="flex: 1.5;">
                <div class="summary-label">Atingimento Global</div>
                <div class="summary-value ${GLOBAL.ating >= 100 ? 'text-green' : 'text-red'}">${GLOBAL.ating}%</div>
                <div class="progress-bar-bg"><div class="progress-bar-fill ${GLOBAL.ating >= 100 ? 'bg-green' : 'bg-red'}" style="width: ${Math.min(GLOBAL.ating, 100)}%;"></div></div>
              </div>
            </div>
          ` : html`
            <div class="summary-bar-single ${this.visaoTabela ? 'view-hidden' : ''}" style="border: 2px solid #818cf8;">
              <div class="summary-section">
                <div class="summary-label">Produção: ${areaAtiva.nome}</div>
                <div class="summary-value">
                  ${areaAtiva.prod} 
                  <span class="badge-yoy ${areaAtiva.yoyProd !== null && areaAtiva.yoyProd >= 0 ? 'badge-up' : 'badge-down'}">
                    ${areaAtiva.yoyProd !== null ? (areaAtiva.yoyProd > 0 ? '+' : '') + areaAtiva.yoyProd + '% YoY' : '--'}
                  </span>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-label">Meta & Desvio</div>
                <div style="display: flex; gap: 16px;">
                  <div>
                    <div style="font-size: 18px; font-weight: 900; color:#0f172a;">${areaAtiva.meta}</div>
                    <div style="font-size: 11px; color: #64748b; font-weight:700;">Orçamento</div>
                  </div>
                  <div>
                    <div style="font-size: 18px; font-weight: 900;" class="${areaAtiva.deltaNum >= 0 ? 'text-green' : 'text-red'}">${areaAtiva.delta}</div>
                    <div style="font-size: 11px; color: #64748b; font-weight:700;">Delta</div>
                  </div>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-label">Volume & Preço</div>
                <div style="display: flex; gap: 20px;">
                  <div>
                    <div style="font-size: 18px; font-weight: 900; color:#0f172a;">${areaAtiva.qtd} <span style="font-size:12px; font-weight:700; color:#64748b;">Qtd</span></div>
                    <div style="font-size: 12px; font-weight:800;" class="${areaAtiva.yoyQtd !== null ? (areaAtiva.yoyQtd >= 0 ? 'text-green' : 'text-red') : ''}">
                      ${areaAtiva.yoyQtd !== null ? (areaAtiva.yoyQtd > 0 ? '+' : '') + areaAtiva.yoyQtd + '% YoY' : '--'}
                    </div>
                  </div>
                  <div>
                    <div style="font-size: 18px; font-weight: 900; color:#0f172a;">${areaAtiva.tm} <span style="font-size:12px; font-weight:700; color:#64748b;">TM</span></div>
                    <div style="font-size: 12px; font-weight:800;" class="${areaAtiva.yoyTm !== null ? (areaAtiva.yoyTm >= 0 ? 'text-green' : 'text-red') : ''}">
                      ${areaAtiva.yoyTm !== null ? (areaAtiva.yoyTm > 0 ? '+' : '') + areaAtiva.yoyTm + '% YoY' : '--'}
                    </div>
                  </div>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-label">Atingimento (${areaAtiva.nome})</div>
                <div class="summary-value ${areaAtiva.ating >= 100 ? 'text-green' : 'text-red'}">${areaAtiva.ating}%</div>
                <div class="progress-bar-bg"><div class="progress-bar-fill ${areaAtiva.ating >= 100 ? 'bg-green' : 'bg-red'}" style="width: ${Math.min(areaAtiva.ating, 100)}%;"></div></div>
              </div>
            </div>
          `}

          <!-- FAIXA SIMPLIFICADA COM LÂMPADA -->
          <div class="tactical-flow-banner ${this.areaSelecionada ? 'drill-active' : ''} ${this.visaoTabela ? 'view-hidden' : ''}">
            <div class="flow-left">
              ${!this.areaSelecionada ? html`
                <span class="flow-message">
                  <span style="font-size: 14px;">💡</span>
                  <span>Clique em uma <strong>Área de Negócio</strong> para aprofundar a análise no Raio-X</span>
                </span>
              ` : html`
                <span class="crumb-tag">Área: <strong>${this.areaSelecionada}</strong></span>
                ${this.segmentoSelecionado ? html`
                  <span class="crumb-sep">/</span>
                  <span class="crumb-tag">Segmento: <strong>${this.segmentoSelecionado}</strong></span>
                ` : html`
                  <span class="crumb-sep">/</span>
                  <span style="font-size: 11.5px; color: #64748b; font-weight: 700;">
                    Selecione um segmento na coluna central para ver indicadores de causa-raiz, ofertas e clientes
                  </span>
                `}
              `}
            </div>

            <div class="flow-right-hint">
              ${this.areaSelecionada ? html`
                <span>Pressione <kbd>Esc</kbd> para fechar modais a qualquer momento</span>
              ` : ''}
            </div>
          </div>

          <!-- TREEMAP DINÂMICO PROPORCIONAL EM MOSAICO -->
          <div class="cascade-grid ${this.visaoTabela ? 'view-hidden' : ''}">
            <div class="panel col-areas" style="${!this.areaSelecionada ? 'background: transparent; border: none; padding: 0; box-shadow: none;' : ''}">
              ${this.areaSelecionada ? html`
                <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Áreas de Negócio</span>
                  <button class="btn-voltar-treemap" @click="${() => { this.areaSelecionada = null; this.segmentoSelecionado = null; }}">
                    ‹ Ver Treemap Geral
                  </button>
                </div>
              ` : ''}
              
              <div class="treemap-container ${viewMode}">
                ${areasOrdenadas.map(area => {
                  const isActive = this.areaSelecionada === area.key;
                  const isInactive = this.areaSelecionada && !isActive;
                  const r = rectMap[area.key] || { x: 0, y: 0, w: 100, h: 100 };
                  const isSmall = r.w < 20 || r.h < 26;

                  return html`
                    <div class="tm-card ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}" 
                         style="--card-bg: ${area.bg}; ${!this.areaSelecionada ? `left: calc(${r.x}% + 3px); top: calc(${r.y}% + 3px); width: calc(${r.w}% - 6px); height: calc(${r.h}% - 6px);` : ''}" 
                         role="button" tabindex="0"
                         @click="${() => this.selecionarArea(area.key)}">

                      <div class="tm-title" style="${isSmall && !this.areaSelecionada ? 'font-size: 12px;' : ''}">
                        <span>${area.nome}</span>${this.areaSelecionada ? html`<span class="rep-badge">${area.rep}%</span>` : ''}
                      </div>
                      <span class="tm-value" style="${isSmall && !this.areaSelecionada ? 'font-size: 17px; margin: 2px 0;' : ''}">${area.prod}</span>
                      <span class="tm-subtitle" style="${isSmall && !this.areaSelecionada ? 'gap: 4px;' : ''}">
                        <span class="badge-ating ${area.ating >= 100 ? 'badge-up' : 'badge-down'}" style="${isSmall && !this.areaSelecionada ? 'font-size: 10px; padding: 2px 5px;' : ''}">${area.ating}% Ating</span>
                        <span class="tm-rep-tag" style="${isSmall && !this.areaSelecionada ? 'font-size: 11.5px;' : ''}">• ${area.rep}% Rep</span>
                      </span>

                      <!-- OVERLAY ACINZENTADO TRANSLÚCIDO NO HOVER -->
                      ${!this.areaSelecionada ? html`
                        <div class="tm-hover-overlay">
                          <div class="tm-hover-msg">
                            <span>Clique para abrir o Raio-X</span>
                          </div>
                        </div>
                      ` : ''}

                    </div>
                  `;
                })}
              </div>
            </div>

            <!-- RAIO-X DOS SEGMENTOS -->
            ${this.areaSelecionada ? html`
              <div class="panel col-segmentos">
                <div class="panel-header">RAIO-X: ${this.areaSelecionada}</div>
                <div class="rx-header">
                  <div class="rx-header-seg">Segmento</div>
                  <div class="rx-header-ating">Atingimento da Meta</div>
                  <div class="rx-header-yoy">YoY Produção</div>
                  <div class="rx-header-hist">13M</div>
                </div>
                <div class="rx-list">
                    ${segmentosOrdenados.length > 0 ? segmentosOrdenados.map(seg => {
                      const segKey = seg.key;
                      return html`
                        <div class="rx-item ${this.segmentoSelecionado === segKey ? 'active' : ''}" @click="${() => this.selecionarSegmento(segKey)}">
                          <div class="rx-seg-name">
                            ${seg.nome} 
                            <span class="rep-badge" style="background: #cbd5e1; color: #334155; font-size: 11px;">${seg.rep}%</span>
                          </div>
                          <div class="rx-ating-wrapper">
                            <div class="rx-micro-bar-bg"><div class="rx-micro-bar-fill ${seg.ating >= 100 ? 'bg-green' : 'bg-red'}" style="width: ${Math.min(seg.ating, 100)}%;"></div></div>
                            <span class="rx-ating-val ${seg.ating >= 100 ? 'text-green' : 'text-red'}">${seg.ating}%</span>
                          </div>
                          <div class="rx-yoy-wrapper">
                            <span class="badge-yoy ${seg.yoyProd !== null && seg.yoyProd >= 0 ? 'badge-up' : 'badge-down'}">
                              ${seg.yoyProd !== null ? (seg.yoyProd > 0 ? '+' : '') + seg.yoyProd + '% YoY' : '--'}
                            </span>
                          </div>
                          <div class="rx-hist-wrapper">
                            <button
                              type="button"
                              class="btn-expand-modal"
                              @click="${(e) => { e.stopPropagation(); this.abrirModalProducao13('SEGMENTO', seg.nome); }}"
                              title="Expandir histórico de Produção (13 meses)">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <polyline points="9 21 3 21 3 15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      `;
                    }) : html`
                      <div style="padding: 40px; text-align: center; color: #64748b; font-weight: 500;">
                        Nenhum segmento encontrado para esta área nos filtros atuais.
                      </div>
                    `}
                </div>
              </div>
            ` : ''}

            <!-- DIAGNÓSTICO DE CAUSA RAIZ -->
            ${this.segmentoSelecionado && segAtivo ? html`
              <div class="panel col-diagnostico">
                <div class="panel-header">DIAGNÓSTICO DE CAUSA RAIZ</div>
                <div class="panel-subtitle">Indicadores de Volume vs Preço: <strong>${segAtivo.nome}</strong></div>

                <div style="flex-direction: column; display: flex;">
                  
                  <div class="diag-grid-cards">
                    <!-- QUANTIDADE -->
                    <div class="diag-card">
                      <div class="diag-title">
                        <span>Quantidade</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          ${segAtivo.qtdYoY !== null ? html`
                            <span class="${segAtivo.qtdYoY >= 0 ? 'text-green' : 'text-red'}">${segAtivo.qtdYoY >= 0 ? '↗' : '↘'}</span>
                          ` : ''}
                          <button class="btn-expand-modal" @click="${() => this.abrirModal('QTD')}" title="Expandir análise de 13 meses">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <polyline points="9 21 3 21 3 15"></polyline>
                              <line x1="21" y1="3" x2="14" y2="10"></line>
                              <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="metric-pill">
                        <span>Qtd: ${segAtivo.qtd}</span>
                        <span class="${segAtivo.qtdYoY !== null ? (segAtivo.qtdYoY >= 0 ? 'text-green' : 'text-red') : ''}">
                          ${segAtivo.qtdYoY !== null ? (segAtivo.qtdYoY > 0 ? '+' : '') + segAtivo.qtdYoY + '% YoY' : '--'}
                        </span>
                      </div>
                      <div style="width: 100%; height: 128px;">
                        ${this.renderChartQtd(segAtivo)}
                      </div>
                    </div>

                    <!-- TICKET MÉDIO -->
                    <div class="diag-card">
                      <div class="diag-title">
                        <span>Ticket Médio</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          ${segAtivo.tmNum > 0 && segAtivo.tmYoY !== null ? html`
                            <span class="${segAtivo.tmYoY >= 0 ? 'text-green' : 'text-red'}">${segAtivo.tmYoY >= 0 ? '↗' : '↘'}</span>
                          ` : ''}
                          <button class="btn-expand-modal" @click="${() => this.abrirModal('TM')}" title="Expandir análise de 13 meses">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <polyline points="9 21 3 21 3 15"></polyline>
                              <line x1="21" y1="3" x2="14" y2="10"></line>
                              <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="metric-pill">
                        <span>TM: ${segAtivo.tm}</span>
                        <span class="${segAtivo.tmNum > 0 && segAtivo.tmYoY !== null ? (segAtivo.tmYoY >= 0 ? 'text-green' : 'text-red') : ''}" style="${segAtivo.tmNum === 0 ? 'color: #94a3b8;' : ''}">
                          ${segAtivo.tmNum > 0 && segAtivo.tmYoY !== null ? (segAtivo.tmYoY > 0 ? '+' : '') + segAtivo.tmYoY + '% YoY' : '--'}
                        </span>
                      </div>
                      <div style="width: 100%; height: 128px;">
                        ${this.renderChartTM(segAtivo)}
                      </div>
                    </div>
                  </div>

                  <!-- FAIXA DE INDICADORES FINANCEIROS DO SEGMENTO -->
                  <div class="diag-sintese">
                    <div class="sintese-header" style="justify-content: space-between;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        <span>Indicadores Financeiros do Segmento</span>
                      </div>
                      <button
                        type="button"
                        class="btn-expand-modal"
                        @click="${() => this.abrirModalProducao13('SEGMENTO', segAtivo.nome)}"
                        title="Expandir histórico de Produção (13 meses)">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </button>
                    </div>

                    <div class="sintese-financeira">
                      <div>
                        <div class="fin-label">Produção</div>
                        <div class="fin-value" style="color: #0f172a;">${segAtivo.prod}</div>
                      </div>
                      <div class="fin-divider"></div>
                      <div>
                        <div class="fin-label">Meta Orçada</div>
                        <div class="fin-value" style="color: #0f172a;">${segAtivo.meta}</div>
                      </div>
                      <div class="fin-divider"></div>
                      <div style="text-align: right;">
                        <div class="fin-label">Desvio (Delta)</div>
                        <div class="fin-value ${segAtivo.deltaNum >= 0 ? 'text-green' : 'text-red'}">
                          ${segAtivo.delta}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- BOTÃO GATILHO PARA ABRIR O MODAL AMPLIADO DE OFERTAS, CLIENTES & CURVA ABC -->
                  <button class="btn-open-ofertas-modal" @click="${() => this.abrirModalCurvaAbc()}">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 16px;">🏆</span>
                      <div style="text-align: left;">
                        <div style="font-size: 12.5px; font-weight: 800; color: #002b49;">Explorar Mix de Ofertas, Clientes & Curva ABC</div>
                        <div style="font-size: 10.5px; color: #64748b; font-weight: 600;">Abrir raio-x em tela cheia para ${segAtivo.nome}</div>
                      </div>
                    </div>
                    <div class="open-modal-icon">
                      <span>Expandir</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </div>
                  </button>

                </div>
              </div>
            ` : ''}
          </div>

          <!-- TABELA PBI HIERÁRQUICA -->
          <div class="table-section ${!this.visaoTabela ? 'view-hidden' : ''}">
            <div class="table-title">Visão Analítica Global</div>
            <table>
              <thead>
                <tr>
                  <th>ÁREAS DE NEGÓCIO</th>
                  <th>META</th>
                  <th>PROD.</th>
                  <th>% ATING</th>
                  <th>DELTA</th>
                  <th>% YOY REAL</th>
                  <th>% REP PROD.</th>
                  <th>QTD</th>
                  <th>% YOY QTD</th>
                  <th>TM</th>
                  <th>% YOY TM</th>
                </tr>
              </thead>
              <tbody>
                ${TABELA_ATIVA.map(area => {
                  const isExpanded = this.expandedAreasTabela.has(area.area);
                  return html`
                    <tr class="row-area" @click="${() => this.toggleAreaTabela(area.area)}">
                      <td>
                        <span class="toggle-icon">${isExpanded ? '-' : '+'}</span>
                        ${area.area}
                      </td>
                      <td>${area.meta}</td>
                      <td>${area.prod}</td>
                      <td><span style="color: ${parseFloat(String(area.ating).replace(',','.')) < 100 ? '#dc2626' : '#16a34a'}">${area.ating}</span></td>
                      <td>${area.delta}</td>
                      <td>${this.renderFormattedMetric(area.yoyReal)}</td>
                      <td>${area.rep}</td>
                      <td>${area.qtd}</td>
                      <td>${this.renderFormattedMetric(area.yoyQtd)}</td>
                      <td>${area.tm}</td>
                      <td>${this.renderFormattedMetric(area.yoyTm)}</td>
                    </tr>
                    ${isExpanded ? area.segmentos.map(seg => html`
                      <tr class="row-segmento">
                        <td>${seg.nome}</td>
                        <td>${seg.meta}</td>
                        <td>${seg.prod}</td>
                        <td><span style="color: ${parseFloat(String(seg.ating).replace(',','.')) < 100 ? '#dc2626' : '#16a34a'}">${seg.ating}</span></td>
                        <td>${seg.delta}</td>
                        <td>${this.renderFormattedMetric(seg.yoyReal)}</td>
                        <td>${seg.rep}</td>
                        <td>${seg.qtd}</td>
                        <td>${this.renderFormattedMetric(seg.yoyQtd)}</td>
                        <td>${seg.tm}</td>
                        <td>${this.renderFormattedMetric(seg.yoyTm)}</td>
                      </tr>
                    `) : ''}
                  `;
                })}
                <tr class="row-total">
                  <td>Total Consolidado</td>
                  <td>${GLOBAL.meta}</td>
                  <td>${GLOBAL.prod}</td>
                  <td><span style="color: #fca5a5;">${GLOBAL.ating}%</span></td>
                  <td>${GLOBAL.delta}</td>
                  <td>${this.renderFormattedMetric(GLOBAL.yoy)}</td>
                  <td>100,0%</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
          </div>
        `}

        <!-- MODAL 1: HISTÓRICO DE 13 MESES (QTD / TM) -->
        ${this.renderModalHistorico()}

        <!-- MODAL 2: MIX DE OFERTAS, CLIENTES & CURVA ABC (72VW COM BLUR, YOY E ORDENAÇÃO) -->
        ${this.renderModalCurvaAbc()}

        <!-- MODAL 3: HISTÓRICO DE PRODUÇÃO 13 MESES (SEGMENTO / OFERTA / CLIENTE) -->
        ${this.renderModalProducao13()}

      </div>
    `;
  }
}

customElements.define(elementName, PerformanceSegmentosV2);
