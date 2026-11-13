/**
 * @title Performance dos Segmentos V2 (Versão Vercel Preview)
 * @description Dashboard executivo de Segmentos com Cards de KPIs, Matriz Cruzada,
 *              Gráfico SVG de Evolução e Filtros Interativos Mockados.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'performance-segmentos-v2';

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

// Base Mockada para os 4 Cartões
const MOCK_KPIS = [
  { key: 'AT', titulo: 'Atingimento %', valor: 98.4, sub: 'Frente ao orçado' },
  { key: 'YOY', titulo: 'YoY Produção', valor: 14.2, sub: 'Crescimento anual' },
  { key: 'TM', titulo: 'Ticket Médio', valor: 12450, sub: 'Valor por venda', currency: true },
  { key: 'DELTA', titulo: 'Delta Orçado', valor: -320000, sub: 'Diferença da meta', currency: true }
];

// Base Mockada para os Segmentos (Matriz e Gráfico)
const MOCK_SEGMENTOS = [
  { nome: 'MANUFATURA', pcd: 1250000, prec: 4800000, ptot: 6050000, meta: 5800000, ating: 104.3, delta: 250000, yoy: 15.2, qtd: 142, tm: 42605 },
  { nome: 'VAREJO', pcd: 980000, prec: 3950000, ptot: 4930000, meta: 5200000, ating: 94.8, delta: -270000, yoy: -8.4, qtd: 210, tm: 23476 },
  { nome: 'SERVICOS', pcd: 850000, prec: 3750000, ptot: 4600000, meta: 4300000, ating: 106.9, delta: 300000, yoy: 18.1, qtd: 185, tm: 24864 },
  { nome: 'DISTRIBUICAO', pcd: 710000, prec: 2840000, ptot: 3550000, meta: 3600000, ating: 98.6, delta: -50000, yoy: -4.2, qtd: 124, tm: 28629 },
  { nome: 'CONSTRUCAO', pcd: 620000, prec: 2680000, ptot: 3300000, meta: 2900000, ating: 113.7, delta: 400000, yoy: 22.4, qtd: 96, tm: 34375 },
  { nome: 'SAUDE', pcd: 540000, prec: 2150000, ptot: 2690000, meta: 2600000, ating: 103.4, delta: 90000, yoy: 12.8, qtd: 82, tm: 32804 },
  { nome: 'AGROINDUSTRIA', pcd: 480000, prec: 1920000, ptot: 2400000, meta: 2100000, ating: 114.2, delta: 300000, yoy: 26.5, qtd: 64, tm: 37500 },
  { nome: 'EDUCACIONAL', pcd: 410000, prec: 1580000, ptot: 1990000, meta: 2100000, ating: 94.7, delta: -110000, yoy: -6.8, qtd: 72, tm: 27638 },
  { nome: 'LOGISTICA', pcd: 380000, prec: 1450000, ptot: 1830000, meta: 1950000, ating: 93.8, delta: -120000, yoy: -11.2, qtd: 85, tm: 21529 },
  { nome: 'FINANCIAL SERVICES', pcd: 290000, prec: 1180000, ptot: 1470000, meta: 1300000, ating: 113.0, delta: 170000, yoy: 19.4, qtd: 38, tm: 38684 }
];

export class PerformanceSegmentosV2 extends LitElement {
  static properties = {
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroTpUnidade: { type: Array },
    filtroTpReceita: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    // Dados Mockados
    kpisTop: { type: Array },
    dadosMatriz: { type: Array },
    totalMatriz: { type: Object },
    dadosGrafico: { type: Array },

    // Estado da Visualização
    criterioOrdenacao: { type: String },
    temaEscuro: { type: Boolean },
    abaGraficoAtiva: { type: String } // 'PROD', 'ATING', 'YOY'
  };

  constructor() {
    super();
    this.carregando = true;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.filtroAno = ['2026'];
    this.filtroMes = ['1'];
    this.filtroTpUnidade = [];
    this.filtroTpReceita = [];

    this.kpisTop = [];
    this.dadosMatriz = [];
    this.totalMatriz = null;
    this.dadosGrafico = [];

    this.criterioOrdenacao = 'ptot_desc';
    this.temaEscuro = false;
    this.abaGraficoAtiva = 'PROD';
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
     GERAÇÃO DE DADOS MOCKADOS E ORDENAÇÃO
     ========================================== */
  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    await new Promise(resolve => setTimeout(resolve, 150));

    // Simulação do impacto dos filtros
    let fator = 1.0;
    if (this.filtroAno.length > 0) fator *= (1 + (parseInt(this.filtroAno[0]) - 2025) * 0.1);
    if (this.filtroMes.length > 0) fator *= (0.9 + (parseInt(this.filtroMes[0]) % 4) * 0.05);
    if (this.filtroTpUnidade.length > 0) fator *= 0.85;
    if (this.filtroTpReceita.length > 0) fator *= 0.60;

    // Kpis Top
    this.kpisTop = MOCK_KPIS.map(k => {
      let val = k.valor;
      if (k.currency) val = Math.round(val * fator);
      else val = Number((val + (Math.random() * 4 - 2)).toFixed(1));
      
      return { ...k, calcValue: val };
    });

    // Matriz de Segmentos
    let lista = MOCK_SEGMENTOS.map(s => {
      const pcd = Math.round(s.pcd * fator);
      const prec = Math.round(s.prec * fator);
      const ptot = pcd + prec;
      const meta = Math.round(s.meta * fator);
      const delta = ptot - meta;
      const ating = meta > 0 ? (ptot / meta) * 100 : 0;
      const yoy = s.yoy;
      const qtd = Math.max(1, Math.round(s.qtd * fator));
      const tm = Math.round(ptot / qtd);

      return { nome: s.nome, pcd, prec, ptot, meta, delta, ating, yoy, qtd, tm };
    });

    // Subtotais
    const totPcd = lista.reduce((a, b) => a + b.pcd, 0);
    const totPrec = lista.reduce((a, b) => a + b.prec, 0);
    const totPtot = lista.reduce((a, b) => a + b.ptot, 0);
    const totMeta = lista.reduce((a, b) => a + b.meta, 0);
    const totDelta = totPtot - totMeta;
    const totAting = totMeta > 0 ? (totPtot / totMeta) * 100 : 0;
    const totQtd = lista.reduce((a, b) => a + b.qtd, 0);
    const totTm = totQtd > 0 ? Math.round(totPtot / totQtd) : 0;
    const totYoy = lista.reduce((a, b) => a + (b.yoy * b.ptot), 0) / totPtot; // YoY Ponderado

    // O percentual representativo de cada linha em relação ao total de produção
    this.dadosMatriz = this.ordenarMatriz(lista).map(item => ({
      ...item,
      repPct: totPtot > 0 ? (item.ptot / totPtot) * 100 : 0
    }));

    this.totalMatriz = { pcd: totPcd, prec: totPrec, ptot: totPtot, meta: totMeta, delta: totDelta, ating: totAting, yoy: totYoy, qtd: totQtd, tm: totTm };

    // Gráfico de Barras com as TOP 10 (baseado na ordenação atual)
    this.dadosGrafico = this.dadosMatriz.slice(0, 10);

    this.carregando = false;
    this.requestUpdate();
  }

  mudarAbaGrafico(aba) {
    if (this.abaGraficoAtiva === aba) return;
    this.abaGraficoAtiva = aba;
    this.requestUpdate();
  }

  alterarOrdenacao(novoCriterio) {
    this.criterioOrdenacao = novoCriterio;
    this.dadosMatriz = this.ordenarMatriz(this.dadosMatriz);
    this.dadosGrafico = this.dadosMatriz.slice(0, 10);
    this.requestUpdate();
  }

  ordenarMatriz(itens) {
    const copia = [...itens];
    copia.sort((a, b) => {
      switch (this.criterioOrdenacao) {
        case 'ptot_desc': return b.ptot - a.ptot;
        case 'ptot_asc': return a.ptot - b.ptot;
        case 'ating_desc': return b.ating - a.ating;
        case 'ating_asc': return a.ating - b.ating;
        case 'yoy_desc': return b.yoy - a.yoy;
        case 'yoy_asc': return a.yoy - b.yoy;
        case 'tm_desc': return b.tm - a.tm;
        case 'tm_asc': return a.tm - b.tm;
        default: return b.ptot - a.ptot;
      }
    });
    return copia;
  }

  /* ==========================================
     FORMATAÇÕES
     ========================================== */
  formatCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return 'R$ ' + Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatCompactCurrency(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return 'R$ 0';
    const num = Math.abs(Number(val));
    const sinal = Number(val) < 0 ? '-' : '';
    if (num >= 1000000) return `${sinal}R$ ${(num / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mi`;
    if (num >= 1000) return `${sinal}R$ ${(num / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mil`;
    return `${sinal}R$ ${num.toLocaleString('pt-BR')}`;
  }

  formatPercent(val) {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  formatInt(val) {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return Math.round(Number(val)).toLocaleString('pt-BR');
  }

  renderYoY(valNum) {
    if (valNum === null || valNum === undefined || isNaN(valNum)) return html`<span style="color: #94a3b8;">-</span>`;
    const isNeg = valNum < 0;
    return html`
      <span style="color: ${isNeg ? '#dc2626' : '#16a34a'}; font-weight: 800; white-space: nowrap;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${this.formatPercent(Math.abs(valNum))}
      </span>
    `;
  }

  renderAtingimento(valNum) {
    if (valNum === null || valNum === undefined || isNaN(valNum)) return html`<span style="color: #94a3b8;">-</span>`;
    const isGreen = valNum >= 100;
    return html`
      <span style="color: ${isGreen ? '#16a34a' : '#b91c1c'}; font-weight: 900; background: ${isGreen ? '#dcfce7' : '#fee2e2'}; padding: 3px 8px; border-radius: 6px;">
        ${this.formatPercent(valNum)}
      </span>
    `;
  }

  renderDelta(valNum) {
    if (valNum === null || valNum === undefined || isNaN(valNum)) return html`<span style="color: #94a3b8;">-</span>`;
    const isNeg = valNum < 0;
    return html`
      <span style="color: ${isNeg ? '#dc2626' : '#16a34a'}; font-weight: 800;">
        ${this.formatCurrency(valNum)}
      </span>
    `;
  }

  /* ==========================================
     RENDER DO GRÁFICO SVG NATIVO
     ========================================== */
  buildHighchartsSvg() {
    const data = this.dadosGrafico;
    if (!data || data.length === 0) {
      return html`<div class="empty-state">Sem dados para exibição do gráfico.</div>`;
    }

    const isDark = this.temaEscuro;
    const w = 1100;
    const h = 380;
    const padL = 90;
    const padR = 30;
    const padT = 30;
    const padB = 70;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    let maxVal = 1;
    if (this.abaGraficoAtiva === 'PROD') {
      maxVal = Math.max(...data.map(d => d.ptot)) * 1.15;
    } else if (this.abaGraficoAtiva === 'ATING') {
      maxVal = Math.max(...data.map(d => d.ating)) * 1.2;
    } else {
      maxVal = Math.max(...data.map(d => Math.abs(d.yoy))) * 1.2;
    }
    if (maxVal === 0) maxVal = 1;

    const n = data.length;
    const slotW = plotW / n;
    const barW = Math.min(slotW * 0.45, 45);

    const getX = (i) => padL + i * slotW + slotW / 2;
    const getYVal = (v) => (padT + plotH) - (Math.abs(v) / maxVal) * plotH;

    const colorGrid = isDark ? '#1e293b' : '#e2e8f0';
    const colorAxisText = isDark ? '#94a3b8' : '#64748b';
    const colorBaseline = isDark ? '#334155' : '#cbd5e1';
    const colorLabel = isDark ? '#f1f5f9' : '#0f172a';
    
    // Cores das Barras
    const barColors = {
      'PROD': isDark ? 'url(#gradDarkProd)' : 'url(#gradLightProd)',
      'ATING': isDark ? 'url(#gradDarkAting)' : 'url(#gradLightAting)',
      'YOY': isDark ? '#0ea5e9' : '#0284c7'
    };
    
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: 100%; overflow: visible; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">`;
    
    svg += `
      <defs>
        <linearGradient id="gradLightProd" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4c1d95;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="gradDarkProd" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="gradLightAting" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#064e3b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="gradDarkAting" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
        </linearGradient>
      </defs>
    `;

    // Linhas de Grade e Eixo Y
    [0, 0.25, 0.5, 0.75, 1.0].forEach(frac => {
      const yPos = (padT + plotH) - frac * plotH;
      const valAt = frac * maxVal;
      svg += `<line x1="${padL}" y1="${yPos.toFixed(1)}" x2="${w - padR}" y2="${yPos.toFixed(1)}" stroke="${colorGrid}" stroke-width="1" stroke-dasharray="4,4"/>`;
      
      let labelText = '';
      if (this.abaGraficoAtiva === 'PROD') labelText = this.formatCompactCurrency(valAt);
      else labelText = this.formatPercent(valAt);
      
      svg += `<text x="${padL - 10}" y="${(yPos + 4).toFixed(1)}" text-anchor="end" font-size="11" font-weight="600" fill="${colorAxisText}">${labelText}</text>`;
    });

    svg += `<line x1="${padL}" y1="${(padT + plotH).toFixed(1)}" x2="${w - padR}" y2="${(padT + plotH).toFixed(1)}" stroke="${colorBaseline}" stroke-width="1.5"/>`;

    // Barras e Labels X
    data.forEach((d, i) => {
      const cx = getX(i);
      let val = 0;
      let label = '';
      
      if (this.abaGraficoAtiva === 'PROD') { val = d.ptot; label = this.formatCompactCurrency(d.ptot); }
      else if (this.abaGraficoAtiva === 'ATING') { val = d.ating; label = this.formatPercent(d.ating); }
      else { val = d.yoy; label = this.formatPercent(d.yoy); }

      const yp = getYVal(val);
      const hp = Math.max((padT + plotH) - yp, 2);
      
      let barFill = barColors[this.abaGraficoAtiva];
      if (this.abaGraficoAtiva === 'YOY' && val < 0) {
        barFill = isDark ? '#ef4444' : '#dc2626';
      }

      svg += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${yp.toFixed(1)}" width="${barW.toFixed(1)}" height="${hp.toFixed(1)}" fill="${barFill}" rx="4"/>`;
      
      svg += `<text x="${cx.toFixed(1)}" y="${(yp - 8).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="800" fill="${colorLabel}">${label}</text>`;

      // Nome do Segmento Quebrado
      const segName = d.nome.length > 15 ? d.nome.substring(0, 13) + '...' : d.nome;
      svg += `<text x="${cx.toFixed(1)}" y="${(padT + plotH + 20).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="700" fill="${colorAxisText}">${segName}</text>`;
    });

    svg += '</svg>';
    return html`<div class="chart-wrapper">${html([svg])}</div>`;
  }

  render() {
    return html`
      <style>
        * { box-sizing: border-box; }

        .dash-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f1f5f9;
          min-height: 100vh;
          color: #0f172a;
          padding: 24px 28px 48px 28px;
          display: flex;
          flex-direction: column;
          transition: background-color 0.3s, color 0.3s;
        }

        .dash-container.dark {
          background-color: #02121d;
          color: #f1f5f9;
        }

        /* HERO HEADER */
        .hero-banner {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          min-height: 85px;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .dash-container.dark .hero-banner {
          background-color: #071f30;
          border: 1px solid #143e5c;
        }

        .gradient-slant {
          position: absolute; top: 0; right: 0; bottom: 0; width: 48%;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%);
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
          z-index: 1;
        }

        .title-area { position: relative; z-index: 3; flex: 1; }
        .title-area h1 { font-size: 24px; font-weight: 900; margin: 0 0 6px 0; letter-spacing: -0.5px; }
        .dash-container.dark .title-area h1 { color: #ffffff; }

        .theme-toggle-btn {
          position: absolute; right: 28px; top: 50%; transform: translateY(-50%);
          z-index: 4; cursor: pointer; font-size: 22px;
          background: rgba(255,255,255,0.2); padding: 8px; border-radius: 50%;
          backdrop-filter: blur(4px); transition: transform 0.2s;
        }
        .theme-toggle-btn:hover { transform: translateY(-50%) scale(1.1); }

        /* FILTROS */
        .filter-bar {
          background: #ffffff; border-radius: 12px; padding: 14px 20px; margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; flex-wrap: wrap; gap: 14px;
          align-items: flex-end; border: 1px solid #e2e8f0; position: relative; z-index: 30;
        }

        .dash-container.dark .filter-bar {
          background: #071f30; border-color: #143e5c; box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .filter-dropdown-container { position: relative; flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 4px; }
        .filter-label { font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; }
        .dash-container.dark .filter-label { color: #8eaabf; }

        .filter-trigger-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 8px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px;
          font-size: 12px; font-weight: 700; color: #0f172a; cursor: pointer; outline: none; height: 36px;
        }
        .dash-container.dark .filter-trigger-btn {
          background: #09263a; border-color: #194e73; color: #f1f5f9;
        }
        .filter-trigger-btn:hover { border-color: #7c3aed; }
        .filter-trigger-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .filter-menu-popover {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 6px;
          background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2); z-index: 100; padding: 10px;
        }
        .dash-container.dark .filter-menu-popover {
          background: #071f30; border-color: #194e73; box-shadow: 0 10px 25px rgba(0,0,0,0.6);
        }

        .popover-list { max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
        .popover-item { display: flex; align-items: center; gap: 8px; padding: 6px; font-size: 11.5px; cursor: pointer; border-radius: 4px; }
        .popover-item:hover { background: #f8fafc; }
        .dash-container.dark .popover-item { color: #f1f5f9; }
        .dash-container.dark .popover-item:hover { background: #123f57; }

        /* KPIS SUPERIORES */
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 24px; }
        .kpi-card {
          background: #ffffff; border-radius: 12px; padding: 20px 24px; border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dash-container.dark .kpi-card {
          background: #123f57; border-color: #1c5574; box-shadow: 0 4px 16px -2px rgba(0,0,0,0.4);
        }
        .kpi-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .dash-container.dark .kpi-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.6); border-color: #2b7ca8; }

        .kpi-title { font-size: 14px; font-weight: 800; color: #475569; text-transform: uppercase; }
        .dash-container.dark .kpi-title { color: #8eaabf; }
        .kpi-val { font-size: 28px; font-weight: 900; color: #0f172a; line-height: 1.1; letter-spacing: -0.5px; }
        .dash-container.dark .kpi-val { color: #ffffff; }
        .kpi-sub { font-size: 11.5px; font-weight: 600; color: #94a3b8; }

        /* MATRIZ */
        .table-section {
          background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.05); margin-bottom: 24px; overflow: hidden;
        }
        .dash-container.dark .table-section {
          background: #0b2738; border-color: #14445f; box-shadow: 0 4px 16px -2px rgba(0,0,0,0.4);
        }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .section-title { font-size: 18px; font-weight: 900; letter-spacing: -0.2px; text-transform: uppercase; }
        .dash-container.dark .section-title { color: #ffffff; }

        .table-responsive { overflow-x: auto; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th { background: #002b49; color: #ffffff; padding: 12px 10px; font-weight: 800; text-align: right; border: 1px solid #cbd5e1; white-space: nowrap; cursor: pointer; user-select: none; }
        .dash-container.dark th { border-color: #1e3a5f; }
        th:first-child { text-align: left; }
        th:hover { color: #38bdf8; }

        td { padding: 10px 10px; border: 1px solid #e2e8f0; text-align: right; color: #334155; }
        .dash-container.dark td { border-color: #194e73; color: #cbd5e1; }
        td.cell-name { text-align: left; font-weight: 800; color: #0f172a; }
        .dash-container.dark td.cell-name { color: #f1f5f9; }

        .row-data:hover td { background: #f8fafc; }
        .dash-container.dark .row-data:hover td { background: #0f3046; }

        .row-total td { background: #1e1b4b; color: #ffffff !important; font-weight: 900; border-color: #1e1b4b; }
        .dash-container.dark .row-total td { background: #0f172a; border-color: #0f172a; }

        .rep-bar-container { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
        .rep-track { width: 60px; height: 5px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .dash-container.dark .rep-track { background: #194e73; }
        .rep-fill { height: 100%; background: #7c3aed; border-radius: 4px; }

        /* GRÁFICO SVG */
        .chart-section {
          background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.05);
        }
        .dash-container.dark .chart-section {
          background: #0b2738; border-color: #14445f; box-shadow: 0 4px 16px -2px rgba(0,0,0,0.4);
        }

        .chart-tabs { display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 4px; border: 1px solid #cbd5e1; }
        .dash-container.dark .chart-tabs { background: #061d2b; border-color: #14445f; }
        .chart-tabs button { background: transparent; border: none; padding: 8px 20px; font-size: 12px; font-weight: 800; color: #64748b; border-radius: 6px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; }
        .dash-container.dark .chart-tabs button { color: #8eaabf; }
        .chart-tabs button.active { background: #002b49; color: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
        .dash-container.dark .chart-tabs button.active { background: #7c3aed; }

        .chart-wrapper { width: 100%; height: 380px; margin-top: 16px; }
      </style>

      <div class="dash-container ${this.temaEscuro ? 'dark' : ''}">
        
        <!-- HERO BANNER -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area">
            <h1>PERFORMANCE DOS SEGMENTOS V2</h1>
          </div>
          <div class="theme-toggle-btn" @click="${() => this.temaEscuro = !this.temaEscuro}" title="Alternar Tema">
            ${this.temaEscuro ? '☀️' : '🌙'}
          </div>
        </div>

        <!-- BARRA DE FILTROS -->
        <div class="filter-bar">
          ${this.renderDropdownFiltro('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdownFiltro('MÊS REFERÊNCIA', 'filtroMes', 'Todos os meses', OPCOES_MES)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', OPCOES_TP_UNIDADE_LIST)}
          ${this.renderDropdownFiltro('TIPO RECEITA', 'filtroTpReceita', 'Todas as receitas', OPCOES_TP_RECEITA_LIST)}
        </div>

        <!-- 4 KPIS SUPERIORES -->
        <div class="kpi-grid">
          ${this.kpisTop.map(k => html`
            <div class="kpi-card">
              <span class="kpi-title">${k.titulo}</span>
              <span class="kpi-val">${k.currency ? this.formatCompactCurrency(k.calcValue) : this.formatPercent(k.calcValue)}</span>
              <span class="kpi-sub">${k.sub}</span>
            </div>
          `)}
        </div>

        <!-- MATRIZ ANALÍTICA -->
        <div class="table-section">
          <div class="section-header">
            <h2 class="section-title">DETALHAMENTO DE SEGMENTOS</h2>
          </div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Segmento</th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'ptot_desc' ? 'ptot_asc' : 'ptot_desc')}">
                    Produção Total (R$) ${this.criterioOrdenacao.startsWith('ptot') ? (this.criterioOrdenacao.includes('desc') ? '▼' : '▲') : ''}
                  </th>
                  <th>Produção CDU</th>
                  <th>Produção Rec.</th>
                  <th>Representatividade</th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'ating_desc' ? 'ating_asc' : 'ating_desc')}">
                    Atingimento Meta ${this.criterioOrdenacao.startsWith('ating') ? (this.criterioOrdenacao.includes('desc') ? '▼' : '▲') : ''}
                  </th>
                  <th>Delta Meta</th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'yoy_desc' ? 'yoy_asc' : 'yoy_desc')}">
                    YoY Prod (%) ${this.criterioOrdenacao.startsWith('yoy') ? (this.criterioOrdenacao.includes('desc') ? '▼' : '▲') : ''}
                  </th>
                  <th>Qtd</th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'tm_desc' ? 'tm_asc' : 'tm_desc')}">
                    Ticket Médio ${this.criterioOrdenacao.startsWith('tm') ? (this.criterioOrdenacao.includes('desc') ? '▼' : '▲') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                ${this.dadosMatriz.map(item => html`
                  <tr class="row-data">
                    <td class="cell-name">${item.nome}</td>
                    <td style="font-weight: 800;">${this.formatCurrency(item.ptot)}</td>
                    <td>${this.formatCurrency(item.pcd)}</td>
                    <td>${this.formatCurrency(item.prec)}</td>
                    <td>
                      <div class="rep-bar-container">
                        <span>${item.repPct.toFixed(1).replace('.', ',')}%</span>
                        <div class="rep-track"><div class="rep-fill" style="width: ${item.repPct}%;"></div></div>
                      </div>
                    </td>
                    <td>${this.renderAtingimento(item.ating)}</td>
                    <td>${this.renderDelta(item.delta)}</td>
                    <td>${this.renderYoY(item.yoy)}</td>
                    <td>${this.formatInt(item.qtd)}</td>
                    <td style="font-weight: 800;">${this.formatCurrency(item.tm)}</td>
                  </tr>
                `)}
                ${this.totalMatriz ? html`
                  <tr class="row-total">
                    <td class="cell-name">TOTAL</td>
                    <td>${this.formatCurrency(this.totalMatriz.ptot)}</td>
                    <td>${this.formatCurrency(this.totalMatriz.pcd)}</td>
                    <td>${this.formatCurrency(this.totalMatriz.prec)}</td>
                    <td>100,0%</td>
                    <td>${this.renderAtingimento(this.totalMatriz.ating)}</td>
                    <td>${this.renderDelta(this.totalMatriz.delta)}</td>
                    <td>${this.renderYoY(this.totalMatriz.yoy)}</td>
                    <td>${this.formatInt(this.totalMatriz.qtd)}</td>
                    <td>${this.formatCurrency(this.totalMatriz.tm)}</td>
                  </tr>
                ` : ''}
              </tbody>
            </table>
          </div>
        </div>

        <!-- GRÁFICO SVG RANKING TOP 10 -->
        <div class="chart-section">
          <div class="section-header">
            <h2 class="section-title">RANKING TOP 10 SEGMENTOS (ORDENAÇÃO ATUAL)</h2>
            <div class="chart-tabs">
              <button class="${this.abaGraficoAtiva === 'PROD' ? 'active' : ''}" @click="${() => this.mudarAbaGrafico('PROD')}">Produção R$</button>
              <button class="${this.abaGraficoAtiva === 'ATING' ? 'active' : ''}" @click="${() => this.mudarAbaGrafico('ATING')}">Atingimento %</button>
              <button class="${this.abaGraficoAtiva === 'YOY' ? 'active' : ''}" @click="${() => this.mudarAbaGrafico('YOY')}">Crescimento YoY</button>
            </div>
          </div>
          ${this.buildHighchartsSvg()}
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, PerformanceSegmentosV2);
