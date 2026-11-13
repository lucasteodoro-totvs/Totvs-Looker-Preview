/**
 * @title Ofertas Analíticos (Versão Vercel Preview)
 * @description Visão Analítica em 3 Blocos: Ofertas, Segmento do Produto e Intera Segmentos com quebra Mês e YTD,
 *              filtros dinâmicos e dados simulados interativos.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'ofertas-analiticos';

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

const OPCOES_SEGMENTO_LIST = [
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

const OPCOES_TP_UNIDADE_LIST = [
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

const OPCOES_TP_RECEITA_LIST = [
  { value: 'CDU', label: 'CDU' },
  { value: 'EM BRANCO', label: 'EM BRANCO' },
  { value: 'OUTROS', label: 'OUTROS' },
  { value: 'SAAS', label: 'SAAS' },
  { value: 'SERVICOS NÃO RECORRENTES', label: 'SERVICOS NÃO RECORRENTES' },
  { value: 'SERVICOS RECORRENTES', label: 'SERVICOS RECORRENTES' },
  { value: 'SMS', label: 'SMS' }
];

// Bases Mockadas Realistas
const MOCK_OFERTAS = [
  { nome: 'FULL TOTVS', mesProd: 3124331, mesQtd: 142, yoyProd: 28.4, yoyQtd: 16.2, yoyTm: 10.5 },
  { nome: 'CLOUD + CLOUD INTERA', mesProd: 2685400, mesQtd: 98, yoyProd: 34.7, yoyQtd: 21.5, yoyTm: 10.9 },
  { nome: 'INTERA BACKOFFICE', mesProd: 2190500, mesQtd: 118, yoyProd: -6.4, yoyQtd: -9.2, yoyTm: 3.1 },
  { nome: 'TOTVS SERVICOS', mesProd: 1864735, mesQtd: 164, yoyProd: 19.6, yoyQtd: 14.0, yoyTm: 4.9 },
  { nome: 'RH (CORE + PARCEIROS)', mesProd: 1542800, mesQtd: 86, yoyProd: 15.2, yoyQtd: 11.4, yoyTm: 3.4 },
  { nome: 'CORE SEGMENTOS', mesProd: 1320450, mesQtd: 129, yoyProd: -4.8, yoyQtd: -7.5, yoyTm: 2.9 },
  { nome: 'SOFT COMPL BY PROGRESS', mesProd: 1057591, mesQtd: 47, yoyProd: -18.5, yoyQtd: -14.2, yoyTm: -5.0 },
  { nome: 'WINTHOR DISTRIBUIDOR', mesProd: 1008026, mesQtd: 63, yoyProd: -12.1, yoyQtd: -8.9, yoyTm: -3.5 },
  { nome: 'CONSINCO SERVICOS', mesProd: 884304, mesQtd: 52, yoyProd: 42.0, yoyQtd: 28.6, yoyTm: 10.4 },
  { nome: 'AHGORA PONTO ELETRONICO', mesProd: 765200, mesQtd: 89, yoyProd: 51.3, yoyQtd: 39.4, yoyTm: 8.5 },
  { nome: 'RD STATION MARKETING', mesProd: 612900, mesQtd: 41, yoyProd: 22.8, yoyQtd: 18.1, yoyTm: 4.0 },
  { nome: 'FLUIG (CORE + PARC)', mesProd: 534100, mesQtd: 28, yoyProd: -15.3, yoyQtd: -12.0, yoyTm: -3.8 },
  { nome: 'SOLUCOES FISCAIS & TAX', mesProd: 418600, mesQtd: 22, yoyProd: 31.4, yoyQtd: 19.5, yoyTm: 9.9 },
  { nome: 'GESPLAN TESOURARIA', mesProd: 295400, mesQtd: 11, yoyProd: 14.8, yoyQtd: 10.0, yoyTm: 4.4 },
  { nome: 'FEEDZ BY TOTVS', mesProd: 248900, mesQtd: 34, yoyProd: 26.5, yoyQtd: 22.4, yoyTm: 3.3 },
  { nome: 'TECHFIN CREDITO', mesProd: 184200, mesQtd: 19, yoyProd: 64.2, yoyQtd: 48.0, yoyTm: 10.9 }
];

const MOCK_SEGMENTOS = [
  { nome: 'MANUFATURA', mesProd: 3180400, mesQtd: 182, yoyProd: 14.5, yoyQtd: 9.8, yoyTm: 4.3 },
  { nome: 'VAREJO', mesProd: 2890200, mesQtd: 245, yoyProd: -8.2, yoyQtd: -5.4, yoyTm: -3.0 },
  { nome: 'SERVICOS', mesProd: 2645800, mesQtd: 196, yoyProd: 18.9, yoyQtd: 13.2, yoyTm: 5.0 },
  { nome: 'SUPERMERCADOS', mesProd: 1940500, mesQtd: 112, yoyProd: 11.4, yoyQtd: 6.7, yoyTm: 4.4 },
  { nome: 'DISTRIBUICAO', mesProd: 1785300, mesQtd: 134, yoyProd: -6.9, yoyQtd: -4.1, yoyTm: -2.9 },
  { nome: 'CONSTRUCAO E PROJETOS', mesProd: 1590600, mesQtd: 88, yoyProd: 29.4, yoyQtd: 19.0, yoyTm: 8.7 },
  { nome: 'SAUDE', mesProd: 1340200, mesQtd: 79, yoyProd: 21.7, yoyQtd: 15.4, yoyTm: 5.5 },
  { nome: 'LOGISTICA', mesProd: 1185900, mesQtd: 91, yoyProd: -11.5, yoyQtd: -8.3, yoyTm: -3.5 },
  { nome: 'EDUCACIONAL', mesProd: 965400, mesQtd: 68, yoyProd: -4.2, yoyQtd: -2.8, yoyTm: -1.4 },
  { nome: 'AGROINDUSTRIA', mesProd: 892700, mesQtd: 46, yoyProd: 24.8, yoyQtd: 16.5, yoyTm: 7.1 },
  { nome: 'FINANCIAL SERVICES', mesProd: 745100, mesQtd: 32, yoyProd: 16.3, yoyQtd: 11.1, yoyTm: 4.7 },
  { nome: 'SMALL BUSINESS', mesProd: 612300, mesQtd: 94, yoyProd: 9.8, yoyQtd: 12.6, yoyTm: -2.5 },
  { nome: 'JURIDICO', mesProd: 384500, mesQtd: 29, yoyProd: 13.1, yoyQtd: 8.9, yoyTm: 3.9 },
  { nome: 'HOSPITALITY', mesProd: 298400, mesQtd: 24, yoyProd: -9.4, yoyQtd: -6.2, yoyTm: -3.4 },
  { nome: 'SEGMENTO INTERNACIONAL', mesProd: 280138, mesQtd: 18, yoyProd: 17.6, yoyQtd: 12.5, yoyTm: 4.5 }
];

const MOCK_INTERA = [
  { seg: 'VAREJO', produto: 'INTERA VAREJO CORE CLOUD', mesProd: 642300, mesQtd: 48, yoyProd: 22.4, yoyQtd: 15.8, yoyTm: 5.7 },
  { seg: 'VAREJO', produto: 'INTERA OMNICHANNEL PDV', mesProd: 318900, mesQtd: 31, yoyProd: 14.1, yoyQtd: 10.2, yoyTm: 3.5 },
  { seg: 'MANUFATURA', produto: 'INTERA MANUFATURA PROTHEUS', mesProd: 589400, mesQtd: 36, yoyProd: 19.8, yoyQtd: 12.5, yoyTm: 6.5 },
  { seg: 'MANUFATURA', produto: 'INTERA APS PLANEJAMENTO', mesProd: 245100, mesQtd: 14, yoyProd: -5.6, yoyQtd: -7.1, yoyTm: 1.6 },
  { seg: 'SERVICOS', produto: 'INTERA SERVICOS BACKOFFICE', mesProd: 512800, mesQtd: 42, yoyProd: 26.3, yoyQtd: 18.4, yoyTm: 6.7 },
  { seg: 'SERVICOS', produto: 'INTERA GESTAO DE CONTRATOS', mesProd: 219500, mesQtd: 19, yoyProd: 11.2, yoyQtd: 8.5, yoyTm: 2.5 },
  { seg: 'SAUDE', produto: 'INTERA SAUDE HOSPITAIS', mesProd: 478600, mesQtd: 24, yoyProd: 33.5, yoyQtd: 20.0, yoyTm: 11.3 },
  { seg: 'SAUDE', produto: 'INTERA OPERADORAS PLANOS', mesProd: 284200, mesQtd: 13, yoyProd: 16.9, yoyQtd: 8.3, yoyTm: 7.9 },
  { seg: 'CONSTRUCAO E PROJETOS', produto: 'INTERA OBRAS E PROJETOS', mesProd: 432900, mesQtd: 27, yoyProd: 38.2, yoyQtd: 25.4, yoyTm: 10.2 },
  { seg: 'LOGISTICA', produto: 'INTERA LOGISTICA TMS CLOUD', mesProd: 365400, mesQtd: 29, yoyProd: -8.4, yoyQtd: -6.5, yoyTm: -2.0 },
  { seg: 'DISTRIBUICAO', produto: 'INTERA DISTRIBUICAO WMS', mesProd: 341200, mesQtd: 25, yoyProd: 9.7, yoyQtd: 6.1, yoyTm: 3.4 },
  { seg: 'SUPERMERCADOS', produto: 'INTERA SUPERMERCADOS ERP', mesProd: 329800, mesQtd: 21, yoyProd: 15.4, yoyQtd: 10.5, yoyTm: 4.4 },
  { seg: 'AGROINDUSTRIA', produto: 'INTERA AGRO GESTAO SAFRA', mesProd: 294500, mesQtd: 16, yoyProd: 29.1, yoyQtd: 18.9, yoyTm: 8.6 },
  { seg: 'EDUCACIONAL', produto: 'INTERA EDUCACIONAL RM', mesProd: 256700, mesQtd: 22, yoyProd: -3.9, yoyQtd: -4.3, yoyTm: 0.4 }
];

export class OfertasAnaliticos extends LitElement {
  static properties = {
    abaAtiva: { type: String },
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroSegmento: { type: Array },
    filtroTpUnidade: { type: Array },
    filtroTpReceita: { type: Array },

    // Listas dos Filtros
    opcoesSegmento: { type: Array },
    opcoesTpUnidade: { type: Array },
    opcoesTpReceita: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    // Dados das Abas
    dadosTabela: { type: Array },
    totalTabela: { type: Object }
  };

  constructor() {
    super();
    this.abaAtiva = 'OFERTAS';
    this.carregando = true;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.filtroAno = ['2026'];
    this.filtroMes = ['1'];
    this.filtroSegmento = [];
    this.filtroTpUnidade = [];
    this.filtroTpReceita = [];

    this.opcoesSegmento = OPCOES_SEGMENTO_LIST;
    this.opcoesTpUnidade = OPCOES_TP_UNIDADE_LIST;
    this.opcoesTpReceita = OPCOES_TP_RECEITA_LIST;

    this.dadosTabela = [];
    this.totalTabela = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fecharDropdownsAoClicarFora = (e) => {
      if (!e.composedPath().some(el => el.classList && el.classList.contains('filter-dropdown-container'))) {
        this.dropdownAberto = null;
      }
    };
    document.addEventListener('click', this._fecharDropdownsAoClicarFora);
    this.carregarDados();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._fecharDropdownsAoClicarFora) {
      document.removeEventListener('click', this._fecharDropdownsAoClicarFora);
    }
  }

  mudarAba(aba) {
    if (this.abaAtiva === aba) return;
    this.abaAtiva = aba;
    this.carregarDados();
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

  selecionarUnico(propNome, valor) {
    this[propNome] = [valor];
    this.dropdownAberto = null;
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
     GERAÇÃO DE DADOS MOCKADOS INTERATIVOS
     ========================================== */
  _calcularFatores() {
    const mesNum = this.filtroMes.length > 0 ? parseInt(this.filtroMes[0], 10) : 1;
    const maxAno = this.filtroAno.length > 0 ? Math.max(...this.filtroAno.map(a => parseInt(a, 10))) : 2026;

    let fatorBase = 1.0;
    fatorBase *= (1 + (maxAno - 2026) * 0.09);
    if (this.filtroAno.length > 1) {
      fatorBase *= (1 + (this.filtroAno.length - 1) * 0.75);
    }

    // Sazonalidade mensal leve
    fatorBase *= (0.94 + ((mesNum % 4) * 0.04));

    if (this.filtroTpUnidade.length > 0 && this.filtroTpUnidade.length < this.opcoesTpUnidade.length) {
      fatorBase *= Math.max(0.18, this.filtroTpUnidade.length * 0.22);
    }
    if (this.filtroTpReceita.length > 0 && this.filtroTpReceita.length < this.opcoesTpReceita.length) {
      fatorBase *= Math.max(0.20, this.filtroTpReceita.length * 0.24);
    }

    // Multiplicador acumulado YTD conforme o mês selecionado (1 a 12)
    const fatorYtd = mesNum * 0.96;

    return { fatorBase, fatorYtd, mesNum };
  }

  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    await new Promise(resolve => setTimeout(resolve, 120));

    const { fatorBase, fatorYtd } = this._calcularFatores();
    let fatorSegGlobal = 1.0;
    if (this.filtroSegmento.length > 0 && this.filtroSegmento.length < this.opcoesSegmento.length) {
      fatorSegGlobal = Math.max(0.14, this.filtroSegmento.length * 0.13);
    }

    let fonteBruta = [];

    if (this.abaAtiva === 'OFERTAS') {
      fonteBruta = MOCK_OFERTAS.map(item => {
        const mProd = Math.round(item.mesProd * fatorBase * fatorSegGlobal);
        const mQtd = Math.max(1, Math.round(item.mesQtd * fatorBase * fatorSegGlobal));
        const yProd = Math.round(mProd * fatorYtd);
        const yQtd = Math.max(1, Math.round(mQtd * fatorYtd));
        return {
          nome: item.nome,
          mProd, mQtd,
          yProd, yQtd,
          yoyProdNum: item.yoyProd,
          yoyQtdNum: item.yoyQtd,
          yoyTmNum: item.yoyTm
        };
      });
    } else if (this.abaAtiva === 'SEGMENTO') {
      let listaSeg = MOCK_SEGMENTOS;
      if (this.filtroSegmento.length > 0) {
        listaSeg = MOCK_SEGMENTOS.filter(s => this.filtroSegmento.includes(s.nome));
      }
      fonteBruta = listaSeg.map(item => {
        const mProd = Math.round(item.mesProd * fatorBase);
        const mQtd = Math.max(1, Math.round(item.mesQtd * fatorBase));
        const yProd = Math.round(mProd * fatorYtd);
        const yQtd = Math.max(1, Math.round(mQtd * fatorYtd));
        return {
          nome: item.nome,
          mProd, mQtd,
          yProd, yQtd,
          yoyProdNum: item.yoyProd,
          yoyQtdNum: item.yoyQtd,
          yoyTmNum: item.yoyTm
        };
      });
    } else if (this.abaAtiva === 'INTERA') {
      let listaIntera = MOCK_INTERA;
      if (this.filtroSegmento.length > 0) {
        listaIntera = MOCK_INTERA.filter(i => this.filtroSegmento.includes(i.seg));
      }
      fonteBruta = listaIntera.map(item => {
        const mProd = Math.round(item.mesProd * fatorBase);
        const mQtd = Math.max(1, Math.round(item.mesQtd * fatorBase));
        const yProd = Math.round(mProd * fatorYtd);
        const yQtd = Math.max(1, Math.round(mQtd * fatorYtd));
        return {
          seg: item.seg,
          produto: item.produto,
          mProd, mQtd,
          yProd, yQtd,
          yoyProdNum: item.yoyProd,
          yoyQtdNum: item.yoyQtd,
          yoyTmNum: item.yoyTm
        };
      });
    }

    const totalYtdProd = fonteBruta.reduce((acc, it) => acc + it.yProd, 0);

    this.dadosTabela = fonteBruta.map(it => {
      const mTm = it.mQtd > 0 ? Math.round(it.mProd / it.mQtd) : 0;
      const yTm = it.yQtd > 0 ? Math.round(it.yProd / it.yQtd) : 0;
      const repPct = totalYtdProd > 0 ? (it.yProd / totalYtdProd) * 100 : 0;

      return {
        ...it,
        mesProd: this.formatInt(it.mProd),
        mesQtd: this.formatInt(it.mQtd),
        mesTm: this.formatInt(mTm),
        ytdProd: this.formatInt(it.yProd),
        ytdQtd: this.formatInt(it.yQtd),
        ytdTm: this.formatInt(yTm),
        yoyProd: this.formatPercent(it.yoyProdNum),
        yoyQtd: this.formatPercent(it.yoyQtdNum),
        yoyTm: this.formatPercent(it.yoyTmNum),
        rep: this.formatPercent(repPct)
      };
    });

    if (fonteBruta.length > 0) {
      const totMProd = fonteBruta.reduce((acc, it) => acc + it.mProd, 0);
      const totMQtd = fonteBruta.reduce((acc, it) => acc + it.mQtd, 0);
      const totMTm = totMQtd > 0 ? Math.round(totMProd / totMQtd) : 0;

      const totYProd = totalYtdProd;
      const totYQtd = fonteBruta.reduce((acc, it) => acc + it.yQtd, 0);
      const totYTm = totYQtd > 0 ? Math.round(totYProd / totYQtd) : 0;

      const pondYoyProd = totYProd > 0
        ? fonteBruta.reduce((acc, it) => acc + (it.yoyProdNum * it.yProd), 0) / totYProd
        : 0;
      const pondYoyQtd = totYQtd > 0
        ? fonteBruta.reduce((acc, it) => acc + (it.yoyQtdNum * it.yQtd), 0) / totYQtd
        : 0;
      const pondYoyTm = totYProd > 0
        ? fonteBruta.reduce((acc, it) => acc + (it.yoyTmNum * it.yProd), 0) / totYProd
        : 0;

      this.totalTabela = {
        nome: 'Total',
        seg: 'Total',
        produto: '',
        mesProd: this.formatInt(totMProd),
        mesQtd: this.formatInt(totMQtd),
        mesTm: this.formatInt(totMTm),
        ytdProd: this.formatInt(totYProd),
        ytdQtd: this.formatInt(totYQtd),
        ytdTm: this.formatInt(totYTm),
        yoyProd: this.formatPercent(pondYoyProd),
        yoyQtd: this.formatPercent(pondYoyQtd),
        yoyTm: this.formatPercent(pondYoyTm),
        rep: '100,0%'
      };
    } else {
      this.totalTabela = null;
    }

    this.carregando = false;
  }

  formatInt(val) {
    if (val === null || val === undefined || val === '' || val === '-' || isNaN(val)) return '-';
    const num = Number(val);
    if (num === 0) return '-';
    return Math.round(num).toLocaleString('pt-BR');
  }

  formatPercent(val) {
    if (val === null || val === undefined || val === '' || val === '-') return '-';
    if (typeof val === 'string' && val.includes('%')) return val;
    const num = Number(val);
    if (isNaN(num)) return '-';
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  renderYoY(valStr) {
    if (!valStr || valStr === '-') {
      return html`<span style="color: #94a3b8;">-</span>`;
    }
    const isNeg = valStr.includes('-');
    const isNeutral = valStr === '0,0%' || valStr === '0%';
    if (isNeutral) {
      return html`<span style="color: #0284c7; font-weight: 700;">0,0%</span>`;
    }
    return html`
      <span style="color: ${isNeg ? '#dc2626' : '#16a34a'}; font-weight: 700;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  renderTotalYoY(valStr) {
    if (!valStr || valStr === '-') {
      return html`<span style="color: #94a3b8;">-</span>`;
    }
    const isNeg = valStr.includes('-');
    return html`
      <span style="color: ${isNeg ? '#fca5a5' : '#86efac'}; font-weight: 800;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  renderTabelaOfertas() {
    return html`
      <div class="table-section">
        <div class="table-title">OFERTAS</div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr class="super-header">
                <th rowspan="2" class="col-dim">Nome Oferta</th>
                <th colspan="3" class="group-mes">MÊS</th>
                <th colspan="7" class="group-ytd">YTD</th>
              </tr>
              <tr class="sub-header">
                <th>PROD</th>
                <th>QTD</th>
                <th>TM</th>
                <th>PROD</th>
                <th>QTD</th>
                <th>TM</th>
                <th>% YOY PROD</th>
                <th>% YOY QTD</th>
                <th>% YOY TM</th>
                <th>REP. PROD</th>
              </tr>
            </thead>
            <tbody>
              ${this.carregando ? html`
                <tr><td colspan="11" class="state-feedback">Carregando dados da camada LookML...</td></tr>
              ` : this.dadosTabela.length === 0 ? html`
                <tr><td colspan="11" class="state-feedback">Nenhum dado encontrado para os filtros selecionados.</td></tr>
              ` : html`
                ${this.dadosTabela.map(r => html`
                  <tr class="row-data">
                    <td class="col-dim-val">${r.nome}</td>
                    <td>${r.mesProd}</td>
                    <td>${r.mesQtd}</td>
                    <td>${r.mesTm}</td>
                    <td>${r.ytdProd}</td>
                    <td>${r.ytdQtd}</td>
                    <td>${r.ytdTm}</td>
                    <td>${this.renderYoY(r.yoyProd)}</td>
                    <td>${this.renderYoY(r.yoyQtd)}</td>
                    <td>${this.renderYoY(r.yoyTm)}</td>
                    <td>${r.rep}</td>
                  </tr>
                `)}
                ${this.totalTabela ? html`
                  <tr class="row-total">
                    <td>${this.totalTabela.nome}</td>
                    <td>${this.totalTabela.mesProd}</td>
                    <td>${this.totalTabela.mesQtd}</td>
                    <td>${this.totalTabela.mesTm}</td>
                    <td>${this.totalTabela.ytdProd}</td>
                    <td>${this.totalTabela.ytdQtd}</td>
                    <td>${this.totalTabela.ytdTm}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyProd)}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyQtd)}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyTm)}</td>
                    <td>${this.totalTabela.rep}</td>
                  </tr>
                ` : ''}
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderTabelaSegmento() {
    return html`
      <div class="table-section">
        <div class="table-title">SEGMENTO DO PRODUTO</div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr class="super-header">
                <th rowspan="2" class="col-dim">SEG. PRODUTO</th>
                <th colspan="3" class="group-mes">MÊS</th>
                <th colspan="7" class="group-ytd">YTD</th>
              </tr>
              <tr class="sub-header">
                <th>PROD</th>
                <th>QTD</th>
                <th>TM</th>
                <th>PROD</th>
                <th>QTD</th>
                <th>TM</th>
                <th>% YOY PROD</th>
                <th>% YOY QTD</th>
                <th>% YOY TM</th>
                <th>REP. PROD</th>
              </tr>
            </thead>
            <tbody>
              ${this.carregando ? html`
                <tr><td colspan="11" class="state-feedback">Carregando dados da camada LookML...</td></tr>
              ` : this.dadosTabela.length === 0 ? html`
                <tr><td colspan="11" class="state-feedback">Nenhum dado encontrado para os filtros selecionados.</td></tr>
              ` : html`
                ${this.dadosTabela.map(r => html`
                  <tr class="row-data">
                    <td class="col-dim-val">${r.nome}</td>
                    <td>${r.mesProd}</td>
                    <td>${r.mesQtd}</td>
                    <td>${r.mesTm}</td>
                    <td>${r.ytdProd}</td>
                    <td>${r.ytdQtd}</td>
                    <td>${r.ytdTm}</td>
                    <td>${this.renderYoY(r.yoyProd)}</td>
                    <td>${this.renderYoY(r.yoyQtd)}</td>
                    <td>${this.renderYoY(r.yoyTm)}</td>
                    <td>${r.rep}</td>
                  </tr>
                `)}
                ${this.totalTabela ? html`
                  <tr class="row-total">
                    <td>${this.totalTabela.nome}</td>
                    <td>${this.totalTabela.mesProd}</td>
                    <td>${this.totalTabela.mesQtd}</td>
                    <td>${this.totalTabela.mesTm}</td>
                    <td>${this.totalTabela.ytdProd}</td>
                    <td>${this.totalTabela.ytdQtd}</td>
                    <td>${this.totalTabela.ytdTm}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyProd)}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyQtd)}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyTm)}</td>
                    <td>${this.totalTabela.rep}</td>
                  </tr>
                ` : ''}
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderTabelaIntera() {
    return html`
      <div class="table-section">
        <div class="table-title">INTERA SEGMENTOS</div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr class="super-header">
                <th rowspan="2" class="col-dim">SEG. PRODUTO</th>
                <th rowspan="2" class="col-dim">DS_PRODUTO</th>
                <th colspan="3" class="group-mes">MÊS</th>
                <th colspan="7" class="group-ytd">YTD</th>
              </tr>
              <tr class="sub-header">
                <th>PROD</th>
                <th>QTD</th>
                <th>TM</th>
                <th>PROD</th>
                <th>QTD</th>
                <th>TM</th>
                <th>% YOY PROD</th>
                <th>% YOY QTD</th>
                <th>% YOY TM</th>
                <th>REP. PROD</th>
              </tr>
            </thead>
            <tbody>
              ${this.carregando ? html`
                <tr><td colspan="12" class="state-feedback">Carregando dados da camada LookML...</td></tr>
              ` : this.dadosTabela.length === 0 ? html`
                <tr><td colspan="12" class="state-feedback">Nenhum dado encontrado para os filtros selecionados.</td></tr>
              ` : html`
                ${this.dadosTabela.map(r => html`
                  <tr class="row-data">
                    <td class="col-dim-val">${r.seg}</td>
                    <td class="col-dim-val" style="color: #64748b;">${r.produto}</td>
                    <td>${r.mesProd}</td>
                    <td>${r.mesQtd}</td>
                    <td>${r.mesTm}</td>
                    <td>${r.ytdProd}</td>
                    <td>${r.ytdQtd}</td>
                    <td>${r.ytdTm}</td>
                    <td>${this.renderYoY(r.yoyProd)}</td>
                    <td>${this.renderYoY(r.yoyQtd)}</td>
                    <td>${this.renderYoY(r.yoyTm)}</td>
                    <td>${r.rep}</td>
                  </tr>
                `)}
                ${this.totalTabela ? html`
                  <tr class="row-total">
                    <td>${this.totalTabela.seg}</td>
                    <td>${this.totalTabela.produto}</td>
                    <td>${this.totalTabela.mesProd}</td>
                    <td>${this.totalTabela.mesQtd}</td>
                    <td>${this.totalTabela.mesTm}</td>
                    <td>${this.totalTabela.ytdProd}</td>
                    <td>${this.totalTabela.ytdQtd}</td>
                    <td>${this.totalTabela.ytdTm}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyProd)}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyQtd)}</td>
                    <td>${this.renderTotalYoY(this.totalTabela.yoyTm)}</td>
                    <td>${this.totalTabela.rep}</td>
                  </tr>
                ` : ''}
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderDropdownFiltro(titulo, propNome, labelVazio, listaOpcoes, isSingle = false) {
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
            ${!isSingle ? html`
              <div class="popover-actions">
                <button class="popover-action-btn" @click="${() => this.selecionarTodos(propNome, listaOpcoes)}">Todos</button>
                <button class="popover-action-btn" @click="${() => this.limparFiltro(propNome)}">Limpar</button>
              </div>
            ` : ''}
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
                    type="${isSingle ? 'radio' : 'checkbox'}" 
                    name="${propNome}"
                    .checked="${selecionados.includes(op.value)}" 
                    @change="${() => isSingle ? this.selecionarUnico(propNome, op.value) : this.toggleOpcao(propNome, op.value)}"
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

  render() {
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
          padding: 16px 24px;
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
          font-size: 22px;
          font-weight: 900;
          margin: 0 0 8px 0;
          color: #000;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .tabs-group {
          display: inline-flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #cbd5e1;
          gap: 4px;
        }

        .tab-btn {
          background: transparent;
          border: none;
          padding: 6px 16px;
          font-size: 11.5px;
          font-weight: 800;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-transform: uppercase;
        }

        .tab-btn:hover {
          color: #0f172a;
        }

        .tab-btn.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 43, 73, 0.2);
        }

        /* BARRA COM OS 5 FILTROS */
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

        .popover-item input[type="checkbox"],
        .popover-item input[type="radio"] {
          cursor: pointer;
          width: 14px;
          height: 14px;
          accent-color: #7c3aed;
        }

        /* CARD DA TABELA */
        .table-section {
          background: rgba(255, 255, 255, 0.95);
          padding: 22px 24px;
          border-radius: 12px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          backdrop-filter: blur(16px);
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .table-title {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 16px;
          text-align: center;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .table-responsive {
          overflow-x: auto;
          max-height: 580px;
          overflow-y: auto;
          border-radius: 6px;
        }

        .table-responsive::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        th {
          background-color: #002b49;
          color: white;
          text-align: center;
          padding: 10px 8px;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          letter-spacing: 0.2px;
          white-space: nowrap;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        tr.super-header th {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.5px;
          padding: 8px 10px;
        }

        tr.super-header th.group-mes {
          background-color: #003865;
          border-left: 2px solid #38bdf8;
          border-right: 2px solid #38bdf8;
        }

        tr.super-header th.group-ytd {
          background-color: #1e1b4b;
          border-left: 2px solid #a855f7;
          border-right: 2px solid #a855f7;
        }

        tr.sub-header th {
          font-size: 10.5px;
          padding: 8px 6px;
          top: 36px;
        }

        th.col-dim {
          text-align: left;
          padding-left: 12px;
        }

        td {
          padding: 9px 8px;
          border: 1px solid #e2e8f0;
          text-align: right;
          color: #334155;
          white-space: nowrap;
        }

        td.col-dim-val {
          text-align: left;
          padding-left: 12px;
          font-weight: 700;
          color: #0f172a;
        }

        .row-data {
          background-color: #ffffff;
          transition: background-color 0.2s;
        }

        .row-data:hover {
          background-color: #f8fafc;
        }

        .row-total td {
          background-color: #002b49;
          color: #ffffff !important;
          font-weight: 900;
          border-color: #002b49;
          position: sticky;
          bottom: 0;
          z-index: 2;
        }

        .row-total td.col-dim-val {
          color: #ffffff !important;
        }

        .state-feedback {
          text-align: center;
          padding: 30px;
          color: #64748b;
          font-weight: 700;
        }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO HERO OFICIAL TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="title-area">
            <h1>OFERTAS ANALÍTICAS</h1>
            <div class="tabs-group">
              <button 
                class="tab-btn ${this.abaAtiva === 'OFERTAS' ? 'active' : ''}" 
                @click="${() => this.mudarAba('OFERTAS')}">
                Ofertas
              </button>
              <button 
                class="tab-btn ${this.abaAtiva === 'SEGMENTO' ? 'active' : ''}" 
                @click="${() => this.mudarAba('SEGMENTO')}">
                Segmento do Produto
              </button>
              <button 
                class="tab-btn ${this.abaAtiva === 'INTERA' ? 'active' : ''}" 
                @click="${() => this.mudarAba('INTERA')}">
                Intera Segmentos
              </button>
            </div>
          </div>
        </div>

        <!-- BARRA COM OS FILTROS -->
        <div class="filter-bar">
          ${this.renderDropdownFiltro('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdownFiltro('MÊS REFERÊNCIA', 'filtroMes', 'Selecione um mês', OPCOES_MES, true)}
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', this.opcoesSegmento)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', this.opcoesTpUnidade)}
          ${this.renderDropdownFiltro('TIPO RECEITA', 'filtroTpReceita', 'Todas as receitas', this.opcoesTpReceita)}
        </div>

        ${this.erro ? html`
          <div class="state-feedback" style="background: #fee2e2; color: #b91c1c; border-radius: 8px; margin-bottom: 16px;">
            ⚠️ ${this.erro}
          </div>
        ` : ''}

        <!-- TABELAS DINÂMICAS -->
        ${this.abaAtiva === 'OFERTAS' ? this.renderTabelaOfertas() : ''}
        ${this.abaAtiva === 'SEGMENTO' ? this.renderTabelaSegmento() : ''}
        ${this.abaAtiva === 'INTERA' ? this.renderTabelaIntera() : ''}

      </div>
    `;
  }
}

customElements.define(elementName, OfertasAnaliticos);
