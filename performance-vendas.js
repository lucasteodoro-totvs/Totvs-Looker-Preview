/**
 * @title Performance de Vendas (Versão Vercel Preview)
 * @description Dashboard executivo com dados simulados dinâmicos, alternância de tema (Claro / Escuro Petróleo)
 *              e gráfico SVG combinado de 13 meses (Meta, Produção, Quantidade e Atingimento %).
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'sales-performance-dash';

const OPCOES_GRAFICO = [
  { key: 'CDU', label: 'CDU', title: 'CDU' },
  { key: 'SAAS', label: 'SAAS', title: 'SAAS' },
  { key: 'SMS', label: 'SMS', title: 'SMS' },
  { key: 'SERVICOS RECORRENTES', label: 'SERVIÇOS RECORRENTES', title: 'SERVIÇOS RECORRENTES' }
];

const LISTA_SEGMENTOS = [
  'AGROINDUSTRIA',
  'CONSTRUCAO E PROJETOS',
  'DISTRIBUICAO',
  'EDUCACIONAL',
  'FINANCIAL SERVICES',
  'HOSPITALITY',
  'JURIDICO',
  'LOGISTICA',
  'MANUFATURA',
  'SAUDE',
  'SEGMENTO INTERNACIONAL',
  'SERVICOS',
  'SMALL BUSINESS',
  'SUPERMERCADOS',
  'VAREJO'
];

const LISTA_RECEITAS = ['CDU', 'SAAS', 'SMS', 'SERVICOS RECORRENTES'];

const BASE_CARDS_MOCK = [
  {
    key: 'CDU',
    title: 'CDU',
    baseProd: 9850000,
    baseMeta: 11030000,
    yoyProd: -0.7,
    baseQtd: 412,
    yoyQtd: -13.2,
    yoyTkt: 14.4
  },
  {
    key: 'SAAS',
    title: 'SAAS',
    baseProd: 5420000,
    baseMeta: 5180000,
    yoyProd: 26.4,
    baseQtd: 318,
    yoyQtd: 11.8,
    yoyTkt: 13.1
  },
  {
    key: 'SMS',
    title: 'SMS',
    baseProd: 1890000,
    baseMeta: 2050000,
    yoyProd: 8.9,
    baseQtd: 195,
    yoyQtd: 3.2,
    yoyTkt: 5.5
  },
  {
    key: 'SERVICOS RECORRENTES',
    title: 'SERVICOS RECORRENTES',
    baseProd: 5980000,
    baseMeta: 6150000,
    yoyProd: 19.2,
    baseQtd: 284,
    yoyQtd: 7.4,
    yoyTkt: 11.0
  }
];

export class SalesPerformanceDash extends LitElement {
  static properties = {
    loading: { type: Boolean },
    loadingCharts: { type: Boolean },
    loadingFilters: { type: Boolean },
    error: { type: String },
    cardsData: { type: Array },
    chartsData: { type: Object },
    filtros: { type: Object },
    opcoesSegmento: { type: Array },
    opcoesReceita: { type: Array },
    dropdownAberto: { type: String },
    mostrarFiltros: { type: Boolean },
    abaGraficoAtiva: { type: String },
    temaEscuro: { type: Boolean }
  };

  constructor() {
    super();
    this.loading = true;
    this.loadingCharts = true;
    this.loadingFilters = false;
    this.error = null;
    this.cardsData = [];
    this.chartsData = {};
    this.opcoesSegmento = [...LISTA_SEGMENTOS];
    this.opcoesReceita = [...LISTA_RECEITAS];
    this.dropdownAberto = null;
    this.mostrarFiltros = true;
    this.filtros = { ano: [], mes: [], receita: [], segmento: [] };
    this.abaGraficoAtiva = 'CDU';
    this.temaEscuro = false;

    this._handleOutsideClick = (e) => {
      if (!e.composedPath().find(el => el.classList && el.classList.contains('multi-select-container'))) {
        this.dropdownAberto = null;
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
    this.atualizarDadosSimulados();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  updated(changedProperties) {
    if (
      changedProperties.has('chartsData') ||
      changedProperties.has('loadingCharts') ||
      changedProperties.has('abaGraficoAtiva') ||
      changedProperties.has('temaEscuro')
    ) {
      this.renderActiveChart();
    }
  }

  mudarAbaGrafico(tipoKey) {
    this.abaGraficoAtiva = tipoKey;
    this.requestUpdate();
  }

  toggleFiltro(tipo, valor) {
    const atual = this.filtros[tipo];
    if (atual.includes(valor)) {
      this.filtros = { ...this.filtros, [tipo]: atual.filter(v => v !== valor) };
    } else {
      this.filtros = { ...this.filtros, [tipo]: [...atual, valor] };
    }
    this.atualizarDadosSimulados();
  }

  formatCurrency(val) {
    if (val === null || val === undefined || val === '') return '--';
    let n = Number(val);
    if (isNaN(n)) return val;
    const isNeg = n < 0;
    n = Math.abs(n);
    let str = '';
    if (n >= 1e6) {
      str = (n / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
    } else if (n >= 1e3) {
      str = (n / 1e3).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mil';
    } else {
      str = n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return (isNeg ? '-R$ ' : 'R$ ') + str;
  }

  formatPct(val) {
    if (val === null || val === undefined || val === '') return '--';
    let n = Number(val);
    if (isNaN(n)) return val;
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  formatNum(val) {
    if (val === null || val === undefined || val === '') return '--';
    let n = Number(val);
    if (isNaN(n)) return val;
    return n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }

  getTrendDir(val) {
    const num = Number(val);
    if (isNaN(num)) return 'neutral';
    if (num > 0) return 'up';
    if (num < 0) return 'down';
    return 'neutral';
  }

  getTrendColor(dir) {
    return dir === 'up' ? '#16a34a' : dir === 'down' ? '#dc2626' : '#64748b';
  }

  getTrendIcon(dir) {
    return dir === 'up' ? '↑' : dir === 'down' ? '↓' : '';
  }

  _calcularFatorFiltros() {
    let fator = 1.0;

    if (this.filtros.ano.length > 0) {
      const maxAno = Math.max(...this.filtros.ano.map(a => parseInt(a, 10)));
      fator *= (1 + (maxAno - 2026) * 0.09);
      if (this.filtros.ano.length > 1) {
        fator *= (1 + (this.filtros.ano.length - 1) * 0.72);
      }
    }

    if (this.filtros.mes.length > 0) {
      const maxMes = Math.max(...this.filtros.mes.map(m => parseInt(m, 10)));
      fator *= (0.92 + (maxMes % 4) * 0.05);
      if (this.filtros.mes.length > 1) {
        fator *= (1 + (this.filtros.mes.length - 1) * 0.78);
      }
    }

    if (this.filtros.segmento.length > 0 && this.filtros.segmento.length < this.opcoesSegmento.length) {
      fator *= Math.max(0.12, this.filtros.segmento.length * 0.11);
    }

    return fator;
  }

  async atualizarDadosSimulados() {
    this.loading = true;
    this.loadingCharts = true;
    this.error = null;

    await new Promise(resolve => setTimeout(resolve, 140));

    const fator = this._calcularFatorFiltros();

    const filtrados = this.filtros.receita.length > 0
      ? BASE_CARDS_MOCK.filter(c => this.filtros.receita.includes(c.key))
      : BASE_CARDS_MOCK;

    const calculados = filtrados.map((item, idx) => {
      const variacaoSazonal = this.filtros.mes.length > 0 ? (1 + ((idx % 2 === 0 ? 1 : -1) * 0.03)) : 1;
      const prod = Math.round(item.baseProd * fator * variacaoSazonal);
      const meta = Math.round(item.baseMeta * fator);
      const delta = prod - meta;
      const atingPctVal = meta > 0 ? (prod / meta) * 100 : 0;
      const qtd = Math.max(1, Math.round(item.baseQtd * fator));
      const ticketMedio = qtd > 0 ? Math.round(prod / qtd) : 0;

      return {
        ...item,
        prod,
        meta,
        delta,
        atingPctVal,
        qtd,
        ticketMedio
      };
    });

    const recorrentes = calculados.filter(c => c.key !== 'CDU');
    const totalProdRecorrente = recorrentes.reduce((acc, c) => acc + c.prod, 0);

    // Calcula representatividade dos recorrentes garantindo soma exata de 100,0%
    const repMap = {};
    if (recorrentes.length > 0 && totalProdRecorrente > 0) {
      const rawReps = recorrentes.map(c => ({
        key: c.key,
        pct: Math.round(((c.prod / totalProdRecorrente) * 100) * 10) / 10
      }));
      const somaAtual = rawReps.reduce((acc, r) => acc + r.pct, 0);
      const diff = Math.round((100 - somaAtual) * 10) / 10;
      if (diff !== 0) {
        const maior = rawReps.reduce((prev, curr) => (curr.pct > prev.pct ? curr : prev), rawReps[0]);
        maior.pct = Math.round((maior.pct + diff) * 10) / 10;
      }
      rawReps.forEach(r => { repMap[r.key] = r.pct; });
    }

    this.cardsData = calculados.map(c => {
      const isCdu = c.key === 'CDU';
      const repPct = isCdu ? null : (repMap[c.key] ?? 0);
      const yoyStr = (c.yoyProd > 0 ? '+' : '') + this.formatPct(c.yoyProd);
      const qtdYoyStr = (c.yoyQtd > 0 ? '+' : '') + this.formatPct(c.yoyQtd);
      const tktYoyStr = (c.yoyTkt > 0 ? '+' : '') + this.formatPct(c.yoyTkt);

      const gridItems = isCdu
        ? [
            { label: 'Qtd', val: this.formatNum(c.qtd), var: qtdYoyStr, dir: this.getTrendDir(c.yoyQtd) },
            { label: 'Ticket Médio', val: this.formatCurrency(c.ticketMedio), var: tktYoyStr, dir: this.getTrendDir(c.yoyTkt) },
            { label: 'Meta Orçada', val: this.formatCurrency(c.meta), var: null, dir: null, fullSpan: true }
          ]
        : [
            { label: 'Qtd', val: this.formatNum(c.qtd), var: qtdYoyStr, dir: this.getTrendDir(c.yoyQtd) },
            { label: 'Ticket Médio', val: this.formatCurrency(c.ticketMedio), var: tktYoyStr, dir: this.getTrendDir(c.yoyTkt) },
            { label: 'Repres.', val: this.formatPct(repPct), var: null, dir: null },
            { label: 'Meta Orçada', val: this.formatCurrency(c.meta), var: null, dir: null }
          ];

      return {
        title: c.title,
        key: c.key,
        rev: this.formatCurrency(c.prod),
        delta: this.formatCurrency(c.delta),
        yoy: yoyStr,
        yoyDir: this.getTrendDir(c.yoyProd),
        atingPercent: Math.min(Math.max(c.atingPctVal, 0), 100),
        atingNum: c.atingPctVal,
        atingLabel: this.formatPct(c.atingPctVal) + ' Ating.',
        grid: gridItems
      };
    });

    // Gera série de 13 meses para cada categoria
    const anoRef = this.filtros.ano.length > 0 ? Math.max(...this.filtros.ano.map(a => parseInt(a, 10))) : 2026;
    const mesRef = this.filtros.mes.length > 0 ? Math.max(...this.filtros.mes.map(m => parseInt(m, 10))) : 11;
    const fatorSeg = (this.filtros.segmento.length > 0 && this.filtros.segmento.length < this.opcoesSegmento.length)
      ? Math.max(0.12, this.filtros.segmento.length * 0.11)
      : 1.0;

    const chartMap = {};
    BASE_CARDS_MOCK.forEach((baseItem, catIdx) => {
      const serie = [];
      let y = anoRef - 1;
      let m = mesRef;

      for (let i = 0; i < 13; i++) {
        const mesLabel = `${y}-${String(m).padStart(2, '0')}`;
        const ondaAting = Math.sin((i + catIdx * 1.3) * 0.85);
        const ondaQtd = Math.cos((i + catIdx * 0.9) * 0.65);
        const sazonalMeta = 0.92 + ((m % 3) * 0.06);
        const metaMes = Math.round(baseItem.baseMeta * fatorSeg * sazonalMeta);
        const perfFactor = (baseItem.baseProd / baseItem.baseMeta) + ondaAting * 0.11;
        const prodMes = Math.round(metaMes * Math.max(0.72, perfFactor));
        const qtdMes = Math.max(4, Math.round(baseItem.baseQtd * fatorSeg * (0.86 + ondaQtd * 0.18)));
        const atingMes = metaMes > 0 ? (prodMes / metaMes) * 100 : 0;

        serie.push({
          mes: mesLabel,
          meta: metaMes,
          producao: prodMes,
          qtd: qtdMes,
          atingimento: atingMes
        });

        m++;
        if (m > 12) {
          m = 1;
          y++;
        }
      }

      chartMap[baseItem.key] = serie;
    });

    this.chartsData = chartMap;

    if (this.cardsData.length > 0 && !this.cardsData.some(c => c.key === this.abaGraficoAtiva)) {
      this.abaGraficoAtiva = this.cardsData[0].key;
    }

    this.loading = false;
    this.loadingCharts = false;
    this.requestUpdate();
  }

  renderActiveChart() {
    const configAtiva = OPCOES_GRAFICO.find(o => o.key === this.abaGraficoAtiva) || OPCOES_GRAFICO[0];
    const el = this.shadowRoot ? this.shadowRoot.getElementById('container-grafico-ativo') : document.getElementById('container-grafico-ativo');
    
    if (el) {
      const dadosDoGrafico = (this.chartsData && this.chartsData[configAtiva.key]) || [];
      el.innerHTML = this.buildHighchartsSvg(configAtiva.title, dadosDoGrafico, this.temaEscuro);
    }
  }

  buildHighchartsSvg(title, data, isDark = false) {
    if (!data || data.length === 0) {
      return `<div style="padding: 60px 20px; text-align: center; color: ${isDark ? '#8eaabf' : '#64748b'}; font-size: 13px; font-weight: 700;">Sem dados para exibição do tipo selecionado.</div>`;
    }

    const w = 1200;
    const h = 360;
    const padL = 80;
    const padR = 25;
    const padT = 28;
    const padB = 54;

    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const linesTop = padT;
    const linesH = plotH * 0.48;
    const linesBot = linesTop + linesH;

    const colsTop = padT + plotH * 0.58;
    const colsH = plotH * 0.42;
    const colsBot = colsTop + colsH;

    const maxVal = Math.max(...data.map(d => Math.max(d.meta, d.producao)), 1000) * 1.25;

    const qtdVals = data.map(d => d.qtd);
    const minQtd = Math.min(...qtdVals);
    const maxQtd = Math.max(...qtdVals);
    const spanQtd = Math.max(maxQtd - minQtd, 1);

    const atingVals = data.map(d => d.atingimento);
    const minAting = Math.min(...atingVals);
    const maxAting = Math.max(...atingVals);
    const spanAting = Math.max(maxAting - minAting, 1);

    // Faixas verticais dedicadas para manter as bolinhas de Atingimento % e Quantidade bem afastadas
    const atingBandTop = linesTop + 14;
    const atingBandBot = linesTop + linesH * 0.44;
    const qtdBandTop = linesTop + linesH * 0.62;
    const qtdBandBot = linesBot - 6;

    const n = data.length;
    const slotW = plotW / n;
    const barW = Math.min(slotW * 0.35, 26);

    const getX = (i) => padL + i * slotW + slotW / 2;
    const getYVal = (v) => colsBot - (v / maxVal) * colsH;
    const getYAting = (a) => atingBandBot - ((a - minAting) / spanAting) * (atingBandBot - atingBandTop);
    const getYQtd = (q) => qtdBandBot - ((q - minQtd) / spanQtd) * (qtdBandBot - qtdBandTop);

    const fmtCurr = (v) => {
      if (v >= 1e6) return 'R$ ' + (v / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
      if (v >= 1e3) return 'R$ ' + (v / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) + ' Mil';
      return 'R$ ' + v.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    };

    const colorTitle = isDark ? '#ffffff' : '#1e1b4b';
    const colorGrid = isDark ? '#163b52' : '#e2e8f0';
    const colorAxisText = isDark ? '#8eaabf' : '#64748b';
    const colorBaseline = isDark ? '#1a4968' : '#cbd5e1';
    const colorMonthText = isDark ? '#94a3b8' : '#475569';
    
    const colorMetaBar = isDark ? '#506e84' : '#B57CFF';
    const colorMetaText = isDark ? '#8eaabf' : '#B57CFF';
    const colorProdBar = isDark ? '#a855f7' : '#012233';
    const colorProdText = isDark ? '#d8b4fe' : '#012233';
    const colorQtdLine = isDark ? '#c084fc' : '#A020F0';
    const colorAtingLine = isDark ? '#00e5ff' : '#012233';
    const colorLegendText = isDark ? '#cbd5e1' : '#334155';

    let svg = `<svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: 100%; overflow: visible; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">`;

    svg += `<text x="${w / 2}" y="18" text-anchor="middle" font-size="13.5" font-weight="900" fill="${colorTitle}" letter-spacing="0.4px">EVOLUÇÃO DE VENDAS ($) E ATINGIMENTO (%) - ${title}</text>`;

    [0.0, 0.5, 1.0].forEach(frac => {
      const yPos = colsBot - frac * colsH;
      const valAt = frac * maxVal;
      svg += `<line x1="${padL}" y1="${yPos.toFixed(1)}" x2="${w - padR}" y2="${yPos.toFixed(1)}" stroke="${colorGrid}" stroke-width="1" stroke-dasharray="3,3"/>`;
      svg += `<text x="${padL - 8}" y="${(yPos + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="${colorAxisText}">${fmtCurr(valAt)}</text>`;
    });

    svg += `<text x="20" y="${(colsTop + colsH / 2).toFixed(1)}" transform="rotate(-90, 20, ${(colsTop + colsH / 2).toFixed(1)})" text-anchor="middle" font-size="9.5" font-weight="700" fill="${colorAxisText}">Valores (R$)</text>`;
    svg += `<line x1="${padL}" y1="${colsBot.toFixed(1)}" x2="${w - padR}" y2="${colsBot.toFixed(1)}" stroke="${colorBaseline}" stroke-width="1"/>`;

    data.forEach((d, i) => {
      const cx = getX(i);
      const ym = getYVal(d.meta);
      const yp = getYVal(d.producao);
      const hm = Math.max(colsBot - ym, 0);
      const hp = Math.max(colsBot - yp, 0);

      let lblM = ym - 5;
      let lblP = yp - 5;
      if (Math.abs(ym - yp) < 14) {
        if (ym < yp) {
          lblM = ym - 14;
          lblP = yp - 4;
        } else {
          lblP = yp - 14;
          lblM = ym - 4;
        }
      }

      svg += `<rect x="${(cx - barW - 1).toFixed(1)}" y="${ym.toFixed(1)}" width="${barW.toFixed(1)}" height="${hm.toFixed(1)}" fill="${colorMetaBar}" rx="2"/>`;
      svg += `<text x="${(cx - barW / 2 - 1).toFixed(1)}" y="${lblM.toFixed(1)}" text-anchor="middle" font-size="8" font-weight="bold" fill="${colorMetaText}">${fmtCurr(d.meta)}</text>`;

      svg += `<rect x="${(cx + 1).toFixed(1)}" y="${yp.toFixed(1)}" width="${barW.toFixed(1)}" height="${hp.toFixed(1)}" fill="${colorProdBar}" rx="2"/>`;
      svg += `<text x="${(cx + barW / 2 + 1).toFixed(1)}" y="${lblP.toFixed(1)}" text-anchor="middle" font-size="8" font-weight="bold" fill="${colorProdText}">${fmtCurr(d.producao)}</text>`;

      svg += `<text x="${cx.toFixed(1)}" y="${(colsBot + 16).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="600" fill="${colorMonthText}">${d.mes}</text>`;
    });

    const ptsQtd = data.map((d, i) => `${getX(i).toFixed(1)},${getYQtd(d.qtd).toFixed(1)}`).join(' ');
    const ptsAting = data.map((d, i) => `${getX(i).toFixed(1)},${getYAting(d.atingimento).toFixed(1)}`).join(' ');

    svg += `<polyline points="${ptsQtd}" fill="none" stroke="${colorQtdLine}" stroke-width="2.5"/>`;
    svg += `<polyline points="${ptsAting}" fill="none" stroke="${colorAtingLine}" stroke-width="2.5"/>`;

    data.forEach((d, i) => {
      const cx = getX(i);
      const yq = getYQtd(d.qtd);
      const ya = getYAting(d.atingimento);

      const lblA = ya - 8;
      const lblQ = yq - 8;

      svg += `<circle cx="${cx.toFixed(1)}" cy="${yq.toFixed(1)}" r="4.5" fill="${colorQtdLine}" stroke="${isDark ? '#123F57' : '#ffffff'}" stroke-width="1.5"/>`;
      svg += `<text x="${cx.toFixed(1)}" y="${lblQ.toFixed(1)}" text-anchor="middle" font-size="9" font-weight="bold" fill="${colorQtdLine}">${d.qtd}</text>`;

      svg += `<circle cx="${cx.toFixed(1)}" cy="${ya.toFixed(1)}" r="4.5" fill="${colorAtingLine}" stroke="${isDark ? '#123F57' : '#ffffff'}" stroke-width="1.5"/>`;
      svg += `<text x="${cx.toFixed(1)}" y="${lblA.toFixed(1)}" text-anchor="middle" font-size="9" font-weight="bold" fill="${colorAtingLine}">${d.atingimento.toFixed(1).replace('.', ',')}%</text>`;
    });

    svg += `<text x="${(padL + plotW / 2).toFixed(1)}" y="${(colsBot + 32).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${colorAxisText}">Data Month</text>`;

    const legY = h - 6;
    svg += `
      <g transform="translate(${(w / 2 - 170).toFixed(1)}, ${legY})">
        <circle cx="0" cy="-3" r="4.5" fill="${colorMetaBar}"/>
        <text x="10" y="0" font-size="9.5" font-weight="700" fill="${colorLegendText}">Meta</text>
        
        <circle cx="70" cy="-3" r="4.5" fill="${colorProdBar}"/>
        <text x="80" y="0" font-size="9.5" font-weight="700" fill="${colorLegendText}">Produção</text>
        
        <line x1="160" y1="-3" x2="180" y2="-3" stroke="${colorQtdLine}" stroke-width="2"/>
        <circle cx="170" cy="-3" r="3.5" fill="${colorQtdLine}"/>
        <text x="188" y="0" font-size="9.5" font-weight="700" fill="${colorLegendText}">Quantidade</text>
        
        <line x1="280" y1="-3" x2="300" y2="-3" stroke="${colorAtingLine}" stroke-width="2"/>
        <circle cx="290" cy="-3" r="3.5" fill="${colorAtingLine}"/>
        <text x="308" y="0" font-size="9.5" font-weight="700" fill="${colorLegendText}">Atingimento %</text>
      </g>
    `;

    svg += '</svg>';
    return svg;
  }

  renderMultiSelect(id, label, options) {
    const abertos = this.dropdownAberto === id;
    const selecionados = this.filtros[id];
    let displayText = label;
    if (selecionados.length === 1) displayText = options.find(o => o.val === selecionados[0])?.lbl || selecionados[0];
    else if (selecionados.length > 1) displayText = `${selecionados.length} selecionados`;

    return html`
      <div class="multi-select-container">
        <div class="multi-select-btn" @click="${() => this.dropdownAberto = abertos ? null : id}">
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

  render() {
    const anosOpt = ['2023', '2024', '2025', '2026'].map(a => ({ lbl: a, val: a }));
    const mesesOpt = [
      { lbl: 'Janeiro', val: '1' }, { lbl: 'Fevereiro', val: '2' }, { lbl: 'Março', val: '3' },
      { lbl: 'Abril', val: '4' }, { lbl: 'Maio', val: '5' }, { lbl: 'Junho', val: '6' },
      { lbl: 'Julho', val: '7' }, { lbl: 'Agosto', val: '8' }, { lbl: 'Setembro', val: '9' },
      { lbl: 'Outubro', val: '10' }, { lbl: 'Novembro', val: '11' }, { lbl: 'Dezembro', val: '12' }
    ];
    const segOpt = this.opcoesSegmento.map(s => ({ lbl: s, val: s }));
    const recOpt = this.opcoesReceita.map(r => ({ lbl: r, val: r }));

    return html`
      <style>
        /* ========================================================
           1. ESTILOS BASE (TEMA CLARO PRESERVADO)
           ======================================================== */
        .dashboard-container { 
          padding: 16px 28px 36px 28px; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
          background-color: #e2e8f0; 
          min-height: 100vh; 
          color: #0f172a; 
          box-sizing: border-box; 
          position: relative;
          overflow: hidden; 
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .dashboard-container::before {
          content: "";
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.40), transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.35), transparent 55%),
            radial-gradient(circle at 40% 80%, rgba(10, 25, 47, 0.40), transparent 50%);
          background-size: 100% 100%;
          animation: spinMesh 28s linear infinite;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes spinMesh {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .hero-banner, .section-title, .kpi-grid, .charts-section, .status-box {
          position: relative;
          z-index: 1;
        }

        .hero-banner { 
          background-color: rgba(255, 255, 255, 0.95); 
          border-radius: 12px; 
          padding: 16px 24px; 
          margin-bottom: 14px; 
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.08); 
          display: flex; 
          align-items: center; 
          min-height: 85px; 
          overflow: hidden; 
          backdrop-filter: blur(10px); 
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .gradient-slant { 
          position: absolute; 
          top: 0; right: 0; bottom: 0; width: 48%; 
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%); 
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%); 
          z-index: 1; 
        }
        
        .totvs-logo-layer { 
          position: absolute; 
          right: 28px; 
          top: 50%; 
          transform: translateY(-50%); 
          width: 120px; 
          height: 44px; 
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIwAAAFkCAYAAABCeaDnAABKJklEQVR4nO3dZ5glZbW38bsnwZCT5CRBUCSLHgVUQFDQIxwVQVAURQUUFVAxHnNCQVEERAyIcMSEERUxEFREkIyAgKQhw5BmBib1+2F1v8wMM9N7d1fVqnD/rqsv0lD137tr165a9TzrGRgcHESSJEmSJEkaNi47gCRJkiRJkurFgpEkSZIkSZLmY8FIkiRJkiRJ87FgJEmSJEmSpPlYMJIkSZIkSdJ8LBhJkiRJkiRpPhaMJEmSJEmSNB8LRpIkSZIkSZqPBSNJkiRJkiTNx4KRJEmSJEmS5mPBSJIkSZIkSfOxYCRJkiRJkqT5/D/CtaeBvfOsTAAAAABJRU5ErkJggg==);
          background-size: contain; 
          background-position: center right; 
          background-repeat: no-repeat; 
          z-index: 2; 
          pointer-events: none; 
        }

        .title-area { position: relative; z-index: 3; }
        .title-area h1 { font-size: 22px; font-weight: 900; margin: 0 0 2px 0; color: #000; letter-spacing: -0.5px; }
        .title-area p { font-size: 13px; color: #1e293b; margin: 0 0 4px 0; font-weight: 600; }
        .purple-line { height: 4px; width: 120px; background: #a855f7; border-radius: 3px; }
        
        .filter-icon-btn { 
          position: absolute; 
          top: 50%; 
          right: 175px; 
          transform: translateY(-50%); 
          z-index: 4; 
          cursor: pointer; 
          width: 38px; 
          height: 38px; 
          border-radius: 50%; 
          background: rgba(255, 255, 255, 0.16); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          backdrop-filter: blur(6px); 
          transition: background 0.2s ease, transform 0.2s ease; 
        }
        .filter-icon-btn:hover { 
          background: rgba(255, 255, 255, 0.28); 
          transform: translateY(-50%) scale(1.08); 
        }

        .theme-toggle-btn {
          position: absolute;
          top: 50%;
          right: 225px;
          transform: translateY(-50%);
          z-index: 4;
          cursor: pointer;
          font-size: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          user-select: none;
        }
        .theme-toggle-btn:hover { 
          transform: translateY(-50%) scale(1.18); 
        }

        .filters-bar { 
          display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: flex-end; 
          margin-bottom: 16px; background: rgba(255, 255, 255, 0.85); 
          padding: 8px 16px; border-radius: 8px; backdrop-filter: blur(12px); 
          border: 1px solid rgba(255, 255, 255, 0.9); animation: slideDown 0.3s ease-out forwards; 
          position: relative; 
          z-index: 50;
          transition: background 0.3s, border-color 0.3s;
        }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        
        .multi-select-container { position: relative; display: inline-block; }
        .multi-select-btn { background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #334155; min-width: 140px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.02); user-select: none; transition: all 0.2s; }
        .multi-select-btn:hover { border-color: #7c3aed; }
        .multi-select-btn span { font-size: 9px; color: #94a3b8; }
        .multi-select-dropdown { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: white; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 24px -5px rgba(0,0,0,0.18); z-index: 100; max-height: 220px; overflow-y: auto; padding: 6px 0; }
        .multi-select-option { display: flex; align-items: center; gap: 8px; padding: 6px 12px; font-size: 11.5px; color: #1e293b; cursor: pointer; transition: background 0.15s; }
        .multi-select-option:hover { background: #f8fafc; }

        .section-title { font-size: 13px; font-weight: 900; color: #0f172a; margin-bottom: 10px; letter-spacing: 0.3px; text-transform: uppercase; }
        
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
        .card { 
          background: rgba(255, 255, 255, 0.95); 
          border-radius: 12px; 
          padding: 16px 18px; 
          border: 1.5px solid #ffffff; 
          display: flex; 
          flex-direction: column; 
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); 
          backdrop-filter: blur(16px); 
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.3s ease; 
          cursor: pointer;
        }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 43, 73, 0.1); border-color: #cbd5e1; }
        .card.card-active { border-color: #7c3aed; box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2), 0 8px 20px rgba(0,0,0,0.08); }

        .card-header { font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center; }
        .icon-placeholder { width: 18px; height: 18px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 9px; }
        .main-val { font-size: 26px; font-weight: 900; text-align: center; line-height: 1.1; letter-spacing: -0.5px; margin: 4px 0; color: #0f172a; }
        .delta-yoy { text-align: center; font-size: 11.5px; margin-top: 2px; color: #475569; font-weight: 600; }
        .yoy-val { font-weight: 800; }
        .progress-container { margin: 10px 0 0; }
        .progress-track { height: 5px; background-color: #e2e8f0; border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; background-color: #a855f7; border-radius: 3px; transition: width 0.6s ease; }
        .progress-label { text-align: center; font-size: 11px; font-weight: 800; margin-top: 4px; color: #334155; }
        
        .sub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 6px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .sub-item { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .sub-label { font-size: 10.5px; color: #64748b; margin-bottom: 2px; font-weight: 600; }
        .sub-val { font-size: 12.5px; font-weight: 800; color: #0f172a; }
        .sub-var { font-size: 10.5px; font-weight: 700; margin-top: 1px; }

        .charts-section {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 16px 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid #ffffff;
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .chart-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chart-toolbar-title {
          font-size: 13.5px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .chart-tabs-group {
          display: inline-flex;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 3px;
          gap: 4px;
        }

        .chart-tab-btn {
          background: transparent;
          border: none;
          padding: 7px 18px;
          font-size: 11.5px;
          font-weight: 800;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .chart-tab-btn:hover {
          color: #002b49;
          background: #e2e8f0;
        }

        .chart-tab-btn.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 43, 73, 0.25);
        }

        .chart-stage {
          width: 100%;
          height: 380px;
          position: relative;
        }

        .chart-canvas-container { 
          width: 100%; 
          height: 100%; 
        }

        .status-box { 
          background: rgba(255,255,255,0.9); 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          padding: 30px; 
          text-align: center; 
          max-width: 450px; 
          margin: 30px auto; 
          color: #475569; 
          backdrop-filter: blur(12px); 
          box-shadow: 0 4px 12px -2px rgba(0,0,0,0.08); 
        }

        /* ========================================================
           2. TEMA ESCURO (SUPERFÍCIE OFICIAL #123F57)
           ======================================================== */
        .dashboard-container.dark-theme {
          background-color: #02121d; 
          color: #f1f5f9;
        }

        .dashboard-container.dark-theme::before {
          background: 
            radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.10), transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.12), transparent 55%),
            radial-gradient(circle at 40% 80%, rgba(2, 18, 29, 0.85), transparent 50%);
        }

        .dashboard-container.dark-theme .hero-banner {
          background-color: #071f30;
          border: 1px solid #143e5c;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.5);
        }

        .dashboard-container.dark-theme .title-area h1 {
          color: #ffffff;
        }

        .dashboard-container.dark-theme .title-area p {
          color: #7dd3fc;
        }

        .dashboard-container.dark-theme .filters-bar {
          background: rgba(7, 31, 48, 0.90);
          border: 1px solid #143e5c;
        }

        .dashboard-container.dark-theme .multi-select-btn {
          background: #09263a;
          border: 1px solid #194e73;
          color: #f1f5f9;
          box-shadow: none;
        }

        .dashboard-container.dark-theme .multi-select-btn:hover {
          border-color: #00e5ff;
        }

        .dashboard-container.dark-theme .multi-select-btn span {
          color: #7dd3fc;
        }

        .dashboard-container.dark-theme .multi-select-dropdown {
          background: #071f30;
          border: 1px solid #194e73;
          box-shadow: 0 10px 24px -5px rgba(0, 0, 0, 0.7);
        }

        .dashboard-container.dark-theme .multi-select-option {
          color: #f1f5f9;
        }

        .dashboard-container.dark-theme .multi-select-option:hover {
          background: #123F57;
        }

        .dashboard-container.dark-theme .section-title {
          color: #ffffff;
        }

        .dashboard-container.dark-theme .card {
          background: #123F57;
          border: 1.5px solid #1c5574;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.45);
        }

        .dashboard-container.dark-theme .card:hover {
          border-color: #2b7ca8;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
        }

        .dashboard-container.dark-theme .card.card-active {
          background: linear-gradient(135deg, #174d6b 0%, #123F57 55%, #232c58 100%);
          border: 1.5px solid #2a7da8;
          box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .dashboard-container.dark-theme .card-header {
          color: #a2c4d9;
        }

        .dashboard-container.dark-theme .icon-placeholder {
          background: #0c2b3d;
          color: #7dd3fc;
        }

        .dashboard-container.dark-theme .main-val {
          color: #ffffff;
        }

        .dashboard-container.dark-theme .delta-yoy {
          color: #8eaabf;
        }

        .dashboard-container.dark-theme .progress-track {
          background-color: #0c2b3d;
        }

        .dashboard-container.dark-theme .progress-fill {
          background-color: #a855f7;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
        }

        .dashboard-container.dark-theme .progress-label {
          color: #7dd3fc;
        }

        .dashboard-container.dark-theme .sub-grid {
          border-top: 1px solid #1b4d6b;
        }

        .dashboard-container.dark-theme .sub-label {
          color: #8eaabf;
        }

        .dashboard-container.dark-theme .sub-val {
          color: #ffffff;
        }

        .dashboard-container.dark-theme .charts-section {
          background: #0b2738;
          border: 1px solid #14445f;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.45);
        }

        .dashboard-container.dark-theme .chart-toolbar {
          border-bottom: 1px solid #14445f;
        }

        .dashboard-container.dark-theme .chart-toolbar-title {
          color: #ffffff;
        }

        .dashboard-container.dark-theme .chart-tabs-group {
          background: #061d2b;
          border: 1px solid #14445f;
        }

        .dashboard-container.dark-theme .chart-tab-btn {
          color: #8eaabf;
        }

        .dashboard-container.dark-theme .chart-tab-btn:hover {
          color: #ffffff;
          background: #123F57;
        }

        .dashboard-container.dark-theme .chart-tab-btn.active {
          background: #7c3aed;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.5);
        }

        .dashboard-container.dark-theme .status-box {
          background: #0b2738;
          border: 1px solid #14445f;
          color: #8eaabf;
        }
      </style>

      <div class="dashboard-container ${this.temaEscuro ? 'dark-theme' : ''}">
        
        <!-- CABEÇALHO HERO -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>

          <div class="filter-icon-btn" @click="${() => this.mostrarFiltros = !this.mostrarFiltros}" title="Mostrar/Ocultar Filtros">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M3 4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v2c0 .27-.11.52-.29.71L15 12.41V20c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-6.59L4.29 6.71C4.11 6.52 4 6.27 4 6V4z"/></svg>
          </div>

          <div class="theme-toggle-btn" @click="${() => this.temaEscuro = !this.temaEscuro}" title="Alternar Tema (Claro / Escuro)">
            ${this.temaEscuro ? html`☀️` : html`🌙`}
          </div>

          <div class="title-area">
            <h1>PERFORMANCE DE VENDAS</h1>
            <p>Performance Geral</p>
            <div class="purple-line"></div>
          </div>
        </div>

        <!-- BARRA DE FILTROS -->
        ${this.mostrarFiltros ? html`
          <div class="filters-bar">
            ${this.renderMultiSelect('ano', 'Ano (Todos)', anosOpt)}
            ${this.renderMultiSelect('mes', 'Mês (Todos)', mesesOpt)}
            ${this.renderMultiSelect('receita', this.loadingFilters ? 'A carregar...' : 'Tipo Receita (Todos)', recOpt)}
            ${this.renderMultiSelect('segmento', this.loadingFilters ? 'A carregar...' : 'Segmento (Todos)', segOpt)}
          </div>
        ` : ''}

        <div class="section-title">PRINCIPAIS KPIs</div>

        <!-- CARDS DE RECEITA -->
        ${this.loading ? html`<div class="status-box"><p>A calcular métricas...</p></div>` 
        : this.error ? html`<div class="status-box" style="border-color: #fecaca; background: #fef2f2; color: #991b1b;"><strong>Erro:</strong> ${this.error}</div>` 
        : this.cardsData.length === 0 ? html`<div class="status-box"><p>Nenhum dado encontrado para os filtros ativos.</p></div>` 
        : html`
          <div class="kpi-grid">
            ${this.cardsData.map(data => {
              const isCardActive = this.abaGraficoAtiva === data.key;
              return html`
                <div class="card ${isCardActive ? 'card-active' : ''}" 
                     @click="${() => this.mudarAbaGrafico(data.key)}"
                     title="Clique para exibir o gráfico de ${data.title}">
                  <div class="card-header">
                    <span>${data.title}</span>
                    <div class="icon-placeholder">■</div>
                  </div>
                  <div class="main-val">${data.rev}</div>
                  <div class="delta-yoy">
                    <span>${data.delta} Delta</span> &nbsp;|&nbsp; 
                    <span class="yoy-val" style="color: ${this.getTrendColor(data.yoyDir)}">${this.getTrendIcon(data.yoyDir)} ${data.yoy} YoY</span>
                  </div>
                  <div class="progress-container">
                    <div class="progress-track"><div class="progress-fill" style="width: ${data.atingPercent}%"></div></div>
                    <div class="progress-label">${data.atingLabel}</div>
                  </div>
                  <div class="sub-grid">
                    ${data.grid.map(item => html`
                      <div class="sub-item" style="${item.fullSpan ? 'grid-column: 1 / -1; padding-top: 2px;' : ''}">
                        <div class="sub-label">${item.label}</div>
                        <div class="sub-val">${item.val}</div>
                        ${item.var ? html`<div class="sub-var" style="color: ${this.getTrendColor(item.dir)}">${this.getTrendIcon(item.dir)} ${item.var}</div>` : ''}
                      </div>
                    `)}
                  </div>
                </div>
              `;
            })}
          </div>
        `}

        <!-- SEÇÃO UNIFICADA DO GRÁFICO COM BOTÕES DE ALTERNÂNCIA -->
        <div class="charts-section">
          <div class="chart-toolbar">
            <span class="chart-toolbar-title">Evolução Histórica (13 Meses)</span>
            
            <div class="chart-tabs-group">
              ${OPCOES_GRAFICO.map(opt => html`
                <button 
                  type="button"
                  class="chart-tab-btn ${this.abaGraficoAtiva === opt.key ? 'active' : ''}"
                  @click="${() => this.mudarAbaGrafico(opt.key)}">
                  ${opt.label}
                </button>
              `)}
            </div>
          </div>

          <div class="chart-stage">
            ${this.loadingCharts ? html`
              <div class="status-box" style="margin-top: 60px;">
                <p>A carregar evolução histórica de 13 meses...</p>
              </div>
            ` : html`
              <div class="chart-canvas-container" id="container-grafico-ativo"></div>
            `}
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, SalesPerformanceDash);
