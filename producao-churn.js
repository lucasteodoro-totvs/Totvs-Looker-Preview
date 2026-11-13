/**
 * @title Produção x Churn (Prévia Visual - Versão Vercel Preview)
 * @description Painel demonstrativo cruzando Produção Recorrente Bruta, Churn e Crescimento Líquido (Net New)
 *              com dados simulados enquanto a camada LookML de Churn é homologada.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'producao-churn-preview';

const OPCOES_ANO = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' }
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
  { value: 'MANUFATURA', label: 'MANUFATURA' },
  { value: 'VAREJO', label: 'VAREJO' },
  { value: 'SERVICOS', label: 'SERVICOS' },
  { value: 'DISTRIBUICAO', label: 'DISTRIBUICAO' },
  { value: 'SAUDE', label: 'SAUDE' },
  { value: 'SUPERMERCADOS', label: 'SUPERMERCADOS' },
  { value: 'CONSTRUCAO E PROJETOS', label: 'CONSTRUCAO E PROJETOS' },
  { value: 'AGROINDUSTRIA', label: 'AGROINDUSTRIA' }
];

const MOCK_CHURN_SEGMENTOS = [
  { seg: 'MANUFATURA', baseAtiva: 42500000, prodRec: 3840000, churn: 620000, yoyLiq: 24.5 },
  { seg: 'SERVICOS', baseAtiva: 36800000, prodRec: 3420000, churn: 580000, yoyLiq: 21.8 },
  { seg: 'VAREJO', baseAtiva: 31200000, prodRec: 2690000, churn: 890000, yoyLiq: -4.2 },
  { seg: 'DISTRIBUICAO', baseAtiva: 22400000, prodRec: 1980000, churn: 410000, yoyLiq: 12.6 },
  { seg: 'SAUDE', baseAtiva: 19600000, prodRec: 1850000, churn: 290000, yoyLiq: 29.4 },
  { seg: 'SUPERMERCADOS', baseAtiva: 17400000, prodRec: 1490000, churn: 340000, yoyLiq: 11.3 },
  { seg: 'CONSTRUCAO E PROJETOS', baseAtiva: 14800000, prodRec: 1380000, churn: 260000, yoyLiq: 26.1 },
  { seg: 'AGROINDUSTRIA', baseAtiva: 12900000, prodRec: 1240000, churn: 190000, yoyLiq: 31.0 }
];

export class ProducaoChurnPreview extends LitElement {
  static properties = {
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroSegmento: { type: Array },
    dropdownAberto: { type: String }
  };

  constructor() {
    super();
    this.filtroAno = ['2026'];
    this.filtroMes = ['1'];
    this.filtroSegmento = [];
    this.dropdownAberto = null;

    this._fecharDropdowns = (e) => {
      if (!e.composedPath().some(el => el.classList && el.classList.contains('filter-dropdown-container'))) {
        this.dropdownAberto = null;
        this.requestUpdate();
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._fecharDropdowns);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._fecharDropdowns);
  }

  toggleDropdown(nome, e) {
    e.stopPropagation();
    this.dropdownAberto = this.dropdownAberto === nome ? null : nome;
    this.requestUpdate();
  }

  toggleOpcao(prop, val) {
    const atual = [...this[prop]];
    const idx = atual.indexOf(val);
    if (idx > -1) atual.splice(idx, 1);
    else atual.push(val);
    this[prop] = atual;
    this.requestUpdate();
  }

  formatTrigger(sel, vazio, opcoes) {
    if (!sel || sel.length === 0) return vazio;
    if (sel.length === 1) return opcoes.find(o => o.value === sel[0])?.label || sel[0];
    return `${sel.length} selecionados`;
  }

  formatCompact(num) {
    const abs = Math.abs(num);
    const s = num < 0 ? '-' : '';
    if (abs >= 1e6) return `${s}R$ ${(abs / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mi`;
    if (abs >= 1e3) return `${s}R$ ${(abs / 1e3).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Mil`;
    return `${s}R$ ${Math.round(abs).toLocaleString('pt-BR')}`;
  }

  formatCurrency(num) {
    const s = num < 0 ? '-' : '';
    return `${s}R$ ${Math.abs(Math.round(num)).toLocaleString('pt-BR')}`;
  }

  _getFator() {
    let f = 1.0;
    if (this.filtroAno.length > 0) {
      const maxA = Math.max(...this.filtroAno.map(Number));
      f *= (1 + (maxA - 2026) * 0.09);
      if (this.filtroAno.length > 1) f *= (1 + (this.filtroAno.length - 1) * 0.70);
    }
    if (this.filtroMes.length > 0) {
      const maxM = Math.max(...this.filtroMes.map(Number));
      f *= (0.94 + (maxM % 4) * 0.04);
      if (this.filtroMes.length > 1) f *= (1 + (this.filtroMes.length - 1) * 0.75);
    }
    return f;
  }

  renderDropdown(titulo, prop, vazio, opcoes) {
    const aberto = this.dropdownAberto === prop;
    const sel = this[prop];
    return html`
      <div class="filter-dropdown-container">
        <label class="filter-label">${titulo}</label>
        <button class="filter-trigger-btn ${aberto ? 'active' : ''}" @click="${(e) => this.toggleDropdown(prop, e)}">
          <span class="filter-trigger-text">${this.formatTrigger(sel, vazio, opcoes)}</span>
          <span class="filter-arrow">▾</span>
        </button>
        ${aberto ? html`
          <div class="filter-menu-popover" @click="${(e) => e.stopPropagation()}">
            <div class="popover-actions">
              <button class="popover-action-btn" @click="${() => { this[prop] = opcoes.map(o => o.value); this.requestUpdate(); }}">Todos</button>
              <button class="popover-action-btn" @click="${() => { this[prop] = []; this.requestUpdate(); }}">Limpar</button>
            </div>
            <div class="popover-list">
              ${opcoes.map(op => html`
                <label class="popover-item">
                  <input type="checkbox" .checked="${sel.includes(op.value)}" @change="${() => this.toggleOpcao(prop, op.value)}" />
                  <span>${op.label}</span>
                </label>
              `)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderChartSvg(totProd, totChurn) {
    const anoRef = this.filtroAno.length > 0 ? Math.max(...this.filtroAno.map(Number)) : 2026;
    const mesRef = this.filtroMes.length > 0 ? Math.max(...this.filtroMes.map(Number)) : 1;

    const series = [];
    let y = anoRef - 1;
    let m = mesRef;
    for (let i = 0; i < 13; i++) {
      const mStr = String(m).padStart(2, '0');
      const onda = Math.sin(i * 0.75);
      const prod = Math.round(totProd * (0.90 + (i / 12) * 0.12 + onda * 0.06));
      const churn = Math.round(totChurn * (1.04 - (i / 12) * 0.06 + Math.cos(i * 0.8) * 0.08));
      const liq = prod - churn;
      series.push({ label: `${mStr}/${String(y).slice(-2)}`, prod, churn, liq });
      m++;
      if (m > 12) { m = 1; y++; }
    }

    const w = 1120, h = 290, padL = 75, padR = 25, padT = 26, padB = 42;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const maxVal = Math.max(...series.map(s => s.prod), 1000) * 1.18;
    const slotW = plotW / series.length;
    const barW = Math.min(slotW * 0.32, 22);

    const getX = (i) => padL + i * slotW + slotW / 2;
    const getY = (v) => padT + plotH - (Math.max(v, 0) / maxVal) * plotH;

    const linePts = series.map((s, i) => `${getX(i).toFixed(1)},${getY(s.liq).toFixed(1)}`).join(' ');

    return html`
      <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: 280px; overflow: visible;">
        ${[0, 0.25, 0.5, 0.75, 1].map(f => {
          const yp = padT + plotH - f * plotH;
          return html`
            <line x1="${padL}" y1="${yp}" x2="${w - padR}" y2="${yp}" stroke="#e2e8f0" stroke-dasharray="4,4" />
            <text x="${padL - 8}" y="${yp + 4}" text-anchor="end" font-size="10" font-weight="700" fill="#64748b">
              ${this.formatCompact(f * maxVal)}
            </text>
          `;
        })}

        ${series.map((s, i) => {
          const cx = getX(i);
          const yProd = getY(s.prod);
          const hProd = padT + plotH - yProd;
          const yChurn = getY(s.churn);
          const hChurn = padT + plotH - yChurn;
          return html`
            <rect x="${cx - barW - 1}" y="${yProd}" width="${barW}" height="${hProd}" fill="#7c3aed" rx="3" />
            <rect x="${cx + 1}" y="${yChurn}" width="${barW}" height="${hChurn}" fill="#ef4444" rx="3" />
            <text x="${cx}" y="${padT + plotH + 16}" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">${s.label}</text>
          `;
        })}

        <polyline points="${linePts}" fill="none" stroke="#002b49" stroke-width="2.8" />
        ${series.map((s, i) => {
          const cx = getX(i);
          const cy = getY(s.liq);
          return html`
            <circle cx="${cx}" cy="${cy}" r="4.5" fill="#10b981" stroke="#002b49" stroke-width="2" />
            <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0f172a">
              ${this.formatCompact(s.liq).replace('R$ ', '')}
            </text>
          `;
        })}
      </svg>
    `;
  }

  render() {
    const fator = this._getFator();

    const lista = MOCK_CHURN_SEGMENTOS.filter(item =>
      this.filtroSegmento.length === 0 || this.filtroSegmento.includes(item.seg)
    ).map(item => {
      const base = Math.round(item.baseAtiva * fator);
      const prod = Math.round(item.prodRec * fator);
      const churn = Math.round(item.churn * fator);
      const liq = prod - churn;
      const churnRate = base > 0 ? (churn / base) * 100 : 0;
      const cobertura = churn > 0 ? prod / churn : 0;
      return { ...item, base, prod, churn, liq, churnRate, cobertura };
    }).sort((a, b) => b.liq - a.liq);

    const totBase = lista.reduce((a, b) => a + b.base, 0);
    const totProd = lista.reduce((a, b) => a + b.prod, 0);
    const totChurn = lista.reduce((a, b) => a + b.churn, 0);
    const totLiq = totProd - totChurn;
    const totChurnRate = totBase > 0 ? (totChurn / totBase) * 100 : 0;
    const totCobertura = totChurn > 0 ? totProd / totChurn : 0;
    const yoyLiqGeral = totProd > 0
      ? lista.reduce((a, b) => a + b.yoyLiq * b.prod, 0) / totProd
      : 0;

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
          padding: 20px 28px 56px 28px;
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
          background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.35), transparent 50%),
                      radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.30), transparent 55%),
                      radial-gradient(circle at 40% 80%, rgba(10, 25, 47, 0.35), transparent 50%);
          animation: spinMesh 28s linear infinite;
          z-index: 0;
          pointer-events: none;
        }

        .preview-ribbon {
          position: relative;
          z-index: 5;
          background: linear-gradient(90deg, #7f1d1d 0%, #991b1b 45%, #4c1d95 100%);
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 10px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(127, 29, 29, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          flex-wrap: wrap;
        }

        .ribbon-badge {
          background: #fbbf24;
          color: #0f172a;
          font-size: 10.5px;
          font-weight: 900;
          padding: 3px 9px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .ribbon-text { font-size: 12.5px; font-weight: 700; flex: 1; }

        .hero-banner {
          background-color: rgba(255, 255, 255, 0.96);
          border-radius: 12px;
          padding: 16px 24px;
          margin-bottom: 14px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          min-height: 82px;
          overflow: hidden;
          position: relative;
          z-index: 4;
        }

        .gradient-slant {
          position: absolute;
          top: 0; right: 0; bottom: 0; width: 48%;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%);
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
          z-index: 1;
        }

        .title-area { position: relative; z-index: 3; }
        .title-area h1 { font-size: 23px; font-weight: 900; margin: 0 0 2px 0; color: #000; text-transform: uppercase; letter-spacing: -0.5px; }
        .title-area p { font-size: 12.5px; font-weight: 700; color: #475569; margin: 0; }

        .filter-bar {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 12px;
          padding: 14px 20px;
          margin-bottom: 18px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          position: relative;
          z-index: 20;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: flex-end;
        }

        .filter-dropdown-container { position: relative; flex: 1; min-width: 160px; display: flex; flex-direction: column; gap: 4px; }
        .filter-label { font-size: 10.5px; font-weight: 800; color: #334155; text-transform: uppercase; }
        .filter-trigger-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 8px 12px; background: #fff; border: 1px solid #cbd5e1; border-radius: 6px;
          font-size: 12px; font-weight: 600; color: #0f172a; cursor: pointer; height: 35px;
        }
        .filter-trigger-btn:hover, .filter-trigger-btn.active { border-color: #7c3aed; }
        .filter-menu-popover {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 6px; background: #fff;
          border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          z-index: 100; padding: 10px; display: flex; flex-direction: column; gap: 6px;
        }
        .popover-actions { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
        .popover-action-btn { background: transparent; border: none; color: #7c3aed; font-size: 11px; font-weight: 700; cursor: pointer; }
        .popover-list { max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
        .popover-item { display: flex; align-items: center; gap: 8px; font-size: 11.5px; padding: 4px; cursor: pointer; }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .kpi-card {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 12px;
          padding: 18px 20px;
          border: 1px solid #fff;
          border-top: 4px solid #7c3aed;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .kpi-lbl { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .kpi-val { font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
        .kpi-sub { font-size: 11.5px; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 6px; }
        .pill-pos { background: #dcfce7; color: #15803d; padding: 2px 7px; border-radius: 5px; font-weight: 800; font-size: 11px; }
        .pill-neg { background: #fee2e2; color: #dc2626; padding: 2px 7px; border-radius: 5px; font-weight: 800; font-size: 11px; }

        .panel-card {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 12px;
          padding: 20px 24px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid #fff;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .panel-title {
          font-size: 14.5px;
          font-weight: 900;
          color: #002b49;
          text-transform: uppercase;
          margin: 0;
        }

        .legend-row { display: flex; gap: 16px; font-size: 11.5px; font-weight: 800; color: #334155; }
        .dot-leg { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 5px; }

        .table-wrap { overflow-x: auto; margin-top: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background: #002b49; color: #fff; padding: 10px 8px; text-align: right; border: 1px solid #cbd5e1; white-space: nowrap; }
        th:first-child { text-align: left; }
        td { padding: 9px 8px; border: 1px solid #e2e8f0; text-align: right; white-space: nowrap; background: #fff; }
        td:first-child { text-align: left; font-weight: 800; }
        tr:hover td { background: #f8fafc; }
        tr.row-tot td { background: #002b49; color: #fff; font-weight: 900; border-color: #002b49; }
      </style>

      <div class="dash-container">
        <div class="preview-ribbon">
          <span class="ribbon-badge">🚧 Em Construção • Prévia Visual</span>
          <span class="ribbon-text">
            Layout demonstrativo com dados simulados — os indicadores de <strong>Churn e Cancelamentos</strong> estão em validação na camada LookML.
          </span>
        </div>

        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area">
            <h1>PRODUÇÃO X CHURN</h1>
            <p>Balanço de Crescimento Recorrente, Cancelamentos & Retenção Líquida</p>
          </div>
        </div>

        <div class="filter-bar">
          ${this.renderDropdown('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdown('MÊS REFERÊNCIA', 'filtroMes', 'Todos os meses', OPCOES_MES)}
          ${this.renderDropdown('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-lbl">Produção Recorrente Bruta</span>
            <span class="kpi-val">${this.formatCompact(totProd)}</span>
            <span class="kpi-sub"><span class="pill-pos">↗ +19,4% YoY</span> <span>Base + New Names</span></span>
          </div>

          <div class="kpi-card" style="border-top-color: #dc2626;">
            <span class="kpi-lbl">Churn (Cancelamentos)</span>
            <span class="kpi-val" style="color: #dc2626;">-${this.formatCompact(totChurn)}</span>
            <span class="kpi-sub">Churn Rate: <strong>${totChurnRate.toFixed(2).replace('.', ',')}%</strong> da base</span>
          </div>

          <div class="kpi-card" style="border-top-color: #16a34a;">
            <span class="kpi-lbl">Crescimento Líquido (Net)</span>
            <span class="kpi-val" style="color: #15803d;">${this.formatCompact(totLiq)}</span>
            <span class="kpi-sub"><span class="${yoyLiqGeral >= 0 ? 'pill-pos' : 'pill-neg'}">${yoyLiqGeral >= 0 ? '↗ +' : '↘ '}${yoyLiqGeral.toFixed(1).replace('.', ',')}% YoY</span></span>
          </div>

          <div class="kpi-card" style="border-top-color: #0284c7;">
            <span class="kpi-lbl">Índice de Cobertura</span>
            <span class="kpi-val">${totCobertura.toFixed(2).replace('.', ',')}x</span>
            <span class="kpi-sub">Produção / Churn (Meta ≥ 4,0x)</span>
          </div>
        </div>

        <div class="panel-card">
          <div class="chart-header">
            <h2 class="panel-title">Evolução 13 Meses: Produção Bruta x Churn x Saldo Líquido</h2>
            <div class="legend-row">
              <span><span class="dot-leg" style="background: #7c3aed;"></span>Produção Recorrente</span>
              <span><span class="dot-leg" style="background: #ef4444;"></span>Churn</span>
              <span><span class="dot-leg" style="background: #10b981; border-radius: 50%;"></span>Saldo Líquido</span>
            </div>
          </div>
          ${this.renderChartSvg(totProd, totChurn)}
        </div>

        <div class="panel-card">
          <h2 class="panel-title">Balanço Produção x Churn por Segmento</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Segmento</th>
                  <th>Base Ativa</th>
                  <th>Produção Rec.</th>
                  <th>Churn</th>
                  <th>Saldo Líquido</th>
                  <th>% Churn Rate</th>
                  <th>Cobertura</th>
                  <th>% YoY Líquido</th>
                </tr>
              </thead>
              <tbody>
                ${lista.map(r => html`
                  <tr>
                    <td>${r.seg}</td>
                    <td>${this.formatCompact(r.base)}</td>
                    <td style="font-weight: 800; color: #4c1d95;">${this.formatCurrency(r.prod)}</td>
                    <td style="font-weight: 800; color: #dc2626;">-${this.formatCurrency(r.churn)}</td>
                    <td style="font-weight: 900; color: ${r.liq >= 0 ? '#15803d' : '#dc2626'};">${this.formatCurrency(r.liq)}</td>
                    <td>${r.churnRate.toFixed(2).replace('.', ',')}%</td>
                    <td style="font-weight: 800;">${r.cobertura.toFixed(2).replace('.', ',')}x</td>
                    <td><span class="${r.yoyLiq >= 0 ? 'pill-pos' : 'pill-neg'}">${r.yoyLiq >= 0 ? '↗ +' : '↘ '}${r.yoyLiq.toFixed(1).replace('.', ',')}%</span></td>
                  </tr>
                `)}
                <tr class="row-tot">
                  <td>TOTAL CONSOLIDADO</td>
                  <td>${this.formatCompact(totBase)}</td>
                  <td>${this.formatCurrency(totProd)}</td>
                  <td>-${this.formatCurrency(totChurn)}</td>
                  <td>${this.formatCurrency(totLiq)}</td>
                  <td>${totChurnRate.toFixed(2).replace('.', ',')}%</td>
                  <td>${totCobertura.toFixed(2).replace('.', ',')}x</td>
                  <td>${yoyLiqGeral >= 0 ? '+' : ''}${yoyLiqGeral.toFixed(1).replace('.', ',')}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(elementName, ProducaoChurnPreview);
