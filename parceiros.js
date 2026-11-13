/**
 * @title Parceiros Homologados (Prévia Visual - Versão Vercel Preview)
 * @description Painel demonstrativo do ecossistema de Parceiros Homologados TOTVS com dados simulados
 *              e aviso de prévia visual enquanto a dimensão DS_PARCEIRO é modelada no LookML.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'parceiros-preview';

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

const OPCOES_MODALIDADE = [
  { value: 'REVENDA AUTORIZADA', label: 'REVENDA AUTORIZADA' },
  { value: 'CANAL INDICACAO', label: 'CANAL INDICAÇÃO' },
  { value: 'ALIANCAS ESTRATEGICAS', label: 'ALIANÇAS ESTRATÉGICAS' },
  { value: 'BPO & TECH', label: 'BPO & TECH' }
];

const OPCOES_SEGMENTO = [
  { value: 'MANUFATURA', label: 'MANUFATURA' },
  { value: 'VAREJO', label: 'VAREJO' },
  { value: 'SERVICOS', label: 'SERVICOS' },
  { value: 'DISTRIBUICAO', label: 'DISTRIBUICAO' },
  { value: 'SAUDE', label: 'SAUDE' },
  { value: 'AGROINDUSTRIA', label: 'AGROINDUSTRIA' }
];

const MOCK_PARCEIROS = [
  { nome: 'ALFA SOLUCOES CORPORATIVAS LTDA', tier: 'DIAMOND', modalidade: 'REVENDA AUTORIZADA', seg: 'MANUFATURA', cdu: 1850000, rec: 2940000, meta: 4350000, qtd: 94, yoy: 22.4 },
  { nome: 'NEXUS CONSULTORIA & ERP S/A', tier: 'DIAMOND', modalidade: 'ALIANCAS ESTRATEGICAS', seg: 'SERVICOS', cdu: 1420000, rec: 2680000, meta: 3820000, qtd: 81, yoy: 18.9 },
  { nome: 'PRIME GESTAO VAREJO DIGITAL', tier: 'GOLD', modalidade: 'REVENDA AUTORIZADA', seg: 'VAREJO', cdu: 980000, rec: 1940000, meta: 3120000, qtd: 76, yoy: -6.2 },
  { nome: 'VANGUARDA TECH & CLOUD PARTNER', tier: 'GOLD', modalidade: 'BPO & TECH', seg: 'DISTRIBUICAO', cdu: 840000, rec: 1790000, meta: 2450000, qtd: 63, yoy: 29.5 },
  { nome: 'SINERGIA NEGOCIOS & INDICACOES', tier: 'GOLD', modalidade: 'CANAL INDICACAO', seg: 'SAUDE', cdu: 720000, rec: 1510000, meta: 2100000, qtd: 52, yoy: 14.8 },
  { nome: 'AGROCONECTA SISTEMAS INTEGRADOS', tier: 'SILVER', modalidade: 'REVENDA AUTORIZADA', seg: 'AGROINDUSTRIA', cdu: 690000, rec: 1180000, meta: 1750000, qtd: 38, yoy: 31.2 },
  { nome: 'HORIZONTE BPO & FISCAL LTDA', tier: 'SILVER', modalidade: 'BPO & TECH', seg: 'SERVICOS', cdu: 410000, rec: 1090000, meta: 1620000, qtd: 49, yoy: -8.4 },
  { nome: 'CONEXAO DISTRIBUICAO INTELIGENTE', tier: 'SILVER', modalidade: 'CANAL INDICACAO', seg: 'DISTRIBUICAO', cdu: 380000, rec: 890000, meta: 1340000, qtd: 34, yoy: 9.7 }
];

export class ParceirosPreview extends LitElement {
  static properties = {
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroModalidade: { type: Array },
    filtroSegmento: { type: Array },
    dropdownAberto: { type: String },
    termoBusca: { type: String },
    criterioOrdenacao: { type: String }
  };

  constructor() {
    super();
    this.filtroAno = ['2026'];
    this.filtroMes = ['1'];
    this.filtroModalidade = [];
    this.filtroSegmento = [];
    this.dropdownAberto = null;
    this.termoBusca = '';
    this.criterioOrdenacao = 'tot_desc';

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
    return 'R$ ' + Math.round(num).toLocaleString('pt-BR');
  }

  _getFator() {
    let f = 1.0;
    if (this.filtroAno.length > 0) {
      const maxA = Math.max(...this.filtroAno.map(Number));
      f *= (1 + (maxA - 2026) * 0.09);
      if (this.filtroAno.length > 1) f *= (1 + (this.filtroAno.length - 1) * 0.68);
    }
    if (this.filtroMes.length > 0) {
      const maxM = Math.max(...this.filtroMes.map(Number));
      f *= (0.93 + (maxM % 4) * 0.05);
      if (this.filtroMes.length > 1) f *= (1 + (this.filtroMes.length - 1) * 0.74);
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

  render() {
    const fator = this._getFator();

    let lista = MOCK_PARCEIROS.filter(p => {
      const mMod = this.filtroModalidade.length === 0 || this.filtroModalidade.includes(p.modalidade);
      const mSeg = this.filtroSegmento.length === 0 || this.filtroSegmento.includes(p.seg);
      const mBusca = p.nome.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
                     p.modalidade.toLowerCase().includes(this.termoBusca.toLowerCase());
      return mMod && mSeg && mBusca;
    }).map(p => {
      const cdu = Math.round(p.cdu * fator);
      const rec = Math.round(p.rec * fator);
      const tot = cdu + rec;
      const meta = Math.round(p.meta * fator);
      const ating = meta > 0 ? (tot / meta) * 100 : 0;
      const qtd = Math.max(1, Math.round(p.qtd * fator));
      const tm = Math.round(tot / qtd);
      return { ...p, cdu, rec, tot, meta, ating, qtd, tm };
    });

    const somaTotal = lista.reduce((acc, p) => acc + p.tot, 0);
    const somaMeta = lista.reduce((acc, p) => acc + p.meta, 0);
    const somaQtd = lista.reduce((acc, p) => acc + p.qtd, 0);
    const tmGeral = somaQtd > 0 ? Math.round(somaTotal / somaQtd) : 0;
    const atingGeral = somaMeta > 0 ? (somaTotal / somaMeta) * 100 : 0;
    const yoyGeral = somaTotal > 0
      ? lista.reduce((acc, p) => acc + p.yoy * p.tot, 0) / somaTotal
      : 0;

    lista = lista.map(p => ({
      ...p,
      repPct: somaTotal > 0 ? (p.tot / somaTotal) * 100 : 0
    }));

    lista.sort((a, b) => {
      if (this.criterioOrdenacao === 'ating_desc') return b.ating - a.ating;
      if (this.criterioOrdenacao === 'yoy_desc') return b.yoy - a.yoy;
      if (this.criterioOrdenacao === 'tm_desc') return b.tm - a.tm;
      return b.tot - a.tot;
    });

    // Agrupamento por modalidade
    const modalidadesMap = {};
    lista.forEach(p => {
      if (!modalidadesMap[p.modalidade]) {
        modalidadesMap[p.modalidade] = { nome: p.modalidade, cdu: 0, rec: 0, tot: 0, count: 0 };
      }
      modalidadesMap[p.modalidade].cdu += p.cdu;
      modalidadesMap[p.modalidade].rec += p.rec;
      modalidadesMap[p.modalidade].tot += p.tot;
      modalidadesMap[p.modalidade].count += 1;
    });
    const modalidadesArr = Object.values(modalidadesMap).sort((a, b) => b.tot - a.tot);

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
          background: linear-gradient(90deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%);
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 10px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(76, 29, 149, 0.25);
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

        .ribbon-text {
          font-size: 12.5px;
          font-weight: 700;
          flex: 1;
        }

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

        .filter-dropdown-container { position: relative; flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 4px; }
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

        .mid-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .panel-card {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 12px;
          padding: 20px 22px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid #fff;
        }

        .panel-title {
          font-size: 14px;
          font-weight: 900;
          color: #002b49;
          text-transform: uppercase;
          margin: 0 0 14px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #f1f5f9;
        }

        .mod-row { margin-bottom: 12px; }
        .mod-head { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; margin-bottom: 4px; }
        .mod-bar-track { height: 10px; background: #e2e8f0; border-radius: 999px; overflow: hidden; display: flex; }
        .mod-bar-cdu { background: #002b49; height: 100%; }
        .mod-bar-rec { background: #7c3aed; height: 100%; }

        .top-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 12px; background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 8px; margin-bottom: 8px;
        }
        .rank-circle {
          width: 22px; height: 22px; border-radius: 50%; background: #002b49; color: #fff;
          font-size: 11px; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px;
        }
        .tier-badge {
          font-size: 9.5px; font-weight: 900; padding: 2px 6px; border-radius: 4px; margin-left: 6px;
        }
        .tier-DIAMOND { background: #e0e7ff; color: #3730a3; }
        .tier-GOLD { background: #fef3c7; color: #92400e; }
        .tier-SILVER { background: #f1f5f9; color: #475569; }

        .table-toolbar {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 12px; flex-wrap: wrap;
        }
        .search-input {
          padding: 7px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; min-width: 240px;
        }
        .sort-select {
          padding: 7px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; font-weight: 700;
        }

        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background: #002b49; color: #fff; padding: 10px 8px; text-align: right; border: 1px solid #cbd5e1; white-space: nowrap; }
        th:first-child, th:nth-child(2), th:nth-child(3) { text-align: left; }
        td { padding: 9px 8px; border: 1px solid #e2e8f0; text-align: right; white-space: nowrap; background: #fff; }
        td:first-child, td:nth-child(2), td:nth-child(3) { text-align: left; }
        tr:hover td { background: #f8fafc; }
      </style>

      <div class="dash-container">
        <div class="preview-ribbon">
          <span class="ribbon-badge">🚧 Em Construção • Prévia Visual</span>
          <span class="ribbon-text">
            Layout demonstrativo com dados simulados — a dimensão <strong>DS_PARCEIRO</strong> está em fase final de homologação na camada LookML.
          </span>
        </div>

        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area">
            <h1>PARCEIROS HOMOLOGADOS</h1>
            <p>Performance de Canais Indiretos, Revendas & Alianças Estratégicas</p>
          </div>
        </div>

        <div class="filter-bar">
          ${this.renderDropdown('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdown('MÊS REFERÊNCIA', 'filtroMes', 'Todos os meses', OPCOES_MES)}
          ${this.renderDropdown('MODALIDADE', 'filtroModalidade', 'Todas as modalidades', OPCOES_MODALIDADE)}
          ${this.renderDropdown('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-lbl">Produção via Parceiros</span>
            <span class="kpi-val">${this.formatCompact(somaTotal)}</span>
            <span class="kpi-sub">
              <span class="${yoyGeral >= 0 ? 'pill-pos' : 'pill-neg'}">${yoyGeral >= 0 ? '↗ +' : '↘ '}${yoyGeral.toFixed(1).replace('.', ',')}% YoY</span>
              <span>Meta: ${this.formatCompact(somaMeta)}</span>
            </span>
          </div>

          <div class="kpi-card" style="border-top-color: #002b49;">
            <span class="kpi-lbl">Atingimento Orçado</span>
            <span class="kpi-val" style="color: ${atingGeral >= 100 ? '#16a34a' : '#dc2626'};">${atingGeral.toFixed(1).replace('.', ',')}%</span>
            <span class="kpi-sub">Desvio: <strong>${this.formatCompact(somaTotal - somaMeta)}</strong></span>
          </div>

          <div class="kpi-card" style="border-top-color: #0284c7;">
            <span class="kpi-lbl">Volume de Negócios</span>
            <span class="kpi-val">${somaQtd.toLocaleString('pt-BR')} un</span>
            <span class="kpi-sub"><strong>${lista.length}</strong> parceiros ativos no recorte</span>
          </div>

          <div class="kpi-card" style="border-top-color: #10b981;">
            <span class="kpi-lbl">Ticket Médio Parceiros</span>
            <span class="kpi-val">${this.formatCurrency(tmGeral)}</span>
            <span class="kpi-sub">Mix: <strong>68% Recorrente</strong> | 32% CDU</span>
          </div>
        </div>

        <div class="mid-grid">
          <div class="panel-card">
            <h2 class="panel-title">Produção por Modalidade (CDU vs Recorrente)</h2>
            ${modalidadesArr.map(m => {
              const pctTot = somaTotal > 0 ? (m.tot / somaTotal) * 100 : 0;
              const pctCdu = m.tot > 0 ? (m.cdu / m.tot) * 100 : 0;
              const pctRec = m.tot > 0 ? (m.rec / m.tot) * 100 : 0;
              return html`
                <div class="mod-row">
                  <div class="mod-head">
                    <span>${m.nome} (${m.count})</span>
                    <span>${this.formatCompact(m.tot)} (${pctTot.toFixed(1).replace('.', ',')}%)</span>
                  </div>
                  <div class="mod-bar-track">
                    <div class="mod-bar-cdu" style="width: ${pctCdu}%;" title="CDU: ${this.formatCurrency(m.cdu)}"></div>
                    <div class="mod-bar-rec" style="width: ${pctRec}%;" title="Recorrente: ${this.formatCurrency(m.rec)}"></div>
                  </div>
                </div>
              `;
            })}
            <div style="display: flex; gap: 16px; font-size: 11px; font-weight: 800; margin-top: 12px; color: #475569;">
              <span><span style="display:inline-block;width:10px;height:10px;background:#002b49;border-radius:2px;margin-right:4px;"></span>CDU</span>
              <span><span style="display:inline-block;width:10px;height:10px;background:#7c3aed;border-radius:2px;margin-right:4px;"></span>Recorrente</span>
            </div>
          </div>

          <div class="panel-card">
            <h2 class="panel-title">Top 5 Parceiros Homologados</h2>
            ${lista.slice(0, 5).map((p, idx) => html`
              <div class="top-item">
                <div style="min-width: 0; flex: 1;">
                  <span class="rank-circle">${idx + 1}º</span>
                  <strong style="font-size: 12px;">${p.nome}</strong>
                  <span class="tier-badge tier-${p.tier}">${p.tier}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                  <strong style="font-size: 12.5px;">${this.formatCompact(p.tot)}</strong>
                  <span class="${p.yoy >= 0 ? 'pill-pos' : 'pill-neg'}">${p.yoy >= 0 ? '+' : ''}${p.yoy.toFixed(1).replace('.', ',')}%</span>
                </div>
              </div>
            `)}
          </div>
        </div>

        <div class="panel-card" style="position: relative; z-index: 2;">
          <div class="table-toolbar">
            <h2 class="panel-title" style="margin: 0; border: none; padding: 0;">Detalhamento por Parceiro Homologado</h2>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <input type="text" class="search-input" placeholder="Buscar parceiro ou modalidade..."
                     .value="${this.termoBusca}" @input="${(e) => { this.termoBusca = e.target.value; this.requestUpdate(); }}" />
              <select class="sort-select" .value="${this.criterioOrdenacao}" @change="${(e) => { this.criterioOrdenacao = e.target.value; this.requestUpdate(); }}">
                <option value="tot_desc">Ordenar: Maior Produção</option>
                <option value="ating_desc">Ordenar: Maior Atingimento</option>
                <option value="yoy_desc">Ordenar: Maior YoY %</option>
                <option value="tm_desc">Ordenar: Maior Ticket Médio</option>
              </select>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Parceiro Homologado</th>
                  <th>Tier</th>
                  <th>Modalidade</th>
                  <th>Produção CDU</th>
                  <th>Produção Rec.</th>
                  <th>Produção Total</th>
                  <th>% Repr.</th>
                  <th>Ating. Meta</th>
                  <th>Qtd</th>
                  <th>Ticket Médio</th>
                  <th>% YoY</th>
                </tr>
              </thead>
              <tbody>
                ${lista.map(p => html`
                  <tr>
                    <td style="font-weight: 800;">${p.nome}</td>
                    <td><span class="tier-badge tier-${p.tier}">${p.tier}</span></td>
                    <td>${p.modalidade}</td>
                    <td>${this.formatCurrency(p.cdu)}</td>
                    <td>${this.formatCurrency(p.rec)}</td>
                    <td style="font-weight: 900;">${this.formatCurrency(p.tot)}</td>
                    <td>${p.repPct.toFixed(1).replace('.', ',')}%</td>
                    <td style="font-weight: 800; color: ${p.ating >= 100 ? '#16a34a' : '#dc2626'};">${p.ating.toFixed(1).replace('.', ',')}%</td>
                    <td>${p.qtd}</td>
                    <td>${this.formatCurrency(p.tm)}</td>
                    <td><span class="${p.yoy >= 0 ? 'pill-pos' : 'pill-neg'}">${p.yoy >= 0 ? '↗ +' : '↘ '}${p.yoy.toFixed(1).replace('.', ',')}%</span></td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(elementName, ParceirosPreview);
