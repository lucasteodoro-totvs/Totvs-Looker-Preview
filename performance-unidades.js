/**
 * @title Performance das Unidades (Versão Vercel Preview)
 * @description Visão Executiva de Canais (Filiais, Franquias, Verticais, MI) com Top 3 Podiums
 *              e Quantidades Reais utilizando LitElement e dados simulados dinâmicos.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'performance-unidades';

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

const OPCOES_TP_RECEITA = [
  { value: 'CDU', label: 'CDU' },
  { value: 'EM BRANCO', label: 'EM BRANCO' },
  { value: 'OUTROS', label: 'OUTROS' },
  { value: 'SAAS', label: 'SAAS' },
  { value: 'SERVICOS NÃO RECORRENTES', label: 'SERVICOS NÃO RECORRENTES' },
  { value: 'SERVICOS RECORRENTES', label: 'SERVICOS RECORRENTES' },
  { value: 'SMS', label: 'SMS' }
];

const CANAIS_CONFIG = [
  { id: 'FILIAIS', nome: 'FILIAIS', cor: '#00d2c4' },
  { id: 'FRANQUIAS', nome: 'FRANQUIAS', cor: '#6366f1' },
  { id: 'VERTICAIS', nome: 'VERTICAIS', cor: '#0ea5e9' },
  { id: 'MI', nome: 'MI', cor: '#a855f7' }
];

// Base Mockada Realista de Unidades de Atendimento (para Top 3 Podiums)
const MOCK_UNIDADES_ATENDIMENTO = [
  { unidade: 'UNIDADE SP - PAULISTA', canal: 'FILIAIS', baseProd: 3840000, baseMeta: 3520000 },
  { unidade: 'UNIDADE RJ - BARRA', canal: 'FILIAIS', baseProd: 2410000, baseMeta: 2290000 },
  { unidade: 'FRANQUIA CAMPINAS', canal: 'FRANQUIAS', baseProd: 1985000, baseMeta: 1640000 },
  { unidade: 'UNIDADE SUL - PORTO ALEGRE', canal: 'FILIAIS', baseProd: 1890000, baseMeta: 1960000 },
  { unidade: 'VERTICAL MANUFATURA SP', canal: 'VERTICAIS', baseProd: 1620000, baseMeta: 1280000 },
  { unidade: 'UNIDADE MG - BELO HORIZONTE', canal: 'FILIAIS', baseProd: 1540000, baseMeta: 1490000 },
  { unidade: 'FRANQUIA CURITIBA', canal: 'FRANQUIAS', baseProd: 1420000, baseMeta: 1120000 },
  { unidade: 'TOTVS MEXICO', canal: 'MI', baseProd: 1290000, baseMeta: 1210000 },
  { unidade: 'FRANQUIA RIBEIRAO PRETO', canal: 'FRANQUIAS', baseProd: 980000, baseMeta: 1180000 },
  { unidade: 'UNIDADE DF - BRASILIA', canal: 'FILIAIS', baseProd: 910000, baseMeta: 1090000 },
  { unidade: 'VERTICAL SAUDE', canal: 'VERTICAIS', baseProd: 860000, baseMeta: 740000 },
  { unidade: 'TOTVS ARGENTINA', canal: 'MI', baseProd: 640000, baseMeta: 920000 },
  { unidade: 'FRANQUIA GOIANIA', canal: 'FRANQUIAS', baseProd: 520000, baseMeta: 790000 },
  { unidade: 'UNIDADE PE - RECIFE', canal: 'FILIAIS', baseProd: 480000, baseMeta: 760000 }
];

// Base Mockada Realista dos 4 Canais (Totais + Composição Base / Adesão / Novo)
const MOCK_CANAIS_BASE = {
  FILIAIS: {
    baseProd: 11450000,
    baseMeta: 10780000,
    yoyProd: 14.8,
    compProd: { base: 0.64, adesao: 0.21, novo: 0.15 },
    baseQtd: 642,
    compQtd: { base: 0.58, adesao: 0.27, novo: 0.15 }
  },
  FRANQUIAS: {
    baseProd: 7320000,
    baseMeta: 7980000,
    yoyProd: -4.2,
    compProd: { base: 0.61, adesao: 0.23, novo: 0.16 },
    baseQtd: 488,
    compQtd: { base: 0.55, adesao: 0.29, novo: 0.16 }
  },
  VERTICAIS: {
    baseProd: 2890000,
    baseMeta: 2680000,
    yoyProd: 21.6,
    compProd: { base: 0.69, adesao: 0.18, novo: 0.13 },
    baseQtd: 154,
    compQtd: { base: 0.63, adesao: 0.23, novo: 0.14 }
  },
  MI: {
    baseProd: 2140000,
    baseMeta: 2290000,
    yoyProd: 9.4,
    compProd: { base: 0.57, adesao: 0.19, novo: 0.24 },
    baseQtd: 118,
    compQtd: { base: 0.52, adesao: 0.24, novo: 0.24 }
  }
};

export class PerformanceUnidades extends LitElement {
  static properties = {
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros em Múltipla Escolha
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroSegmento: { type: Array },
    filtroTpReceita: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    top3Volume: { type: Array },
    top3MaioresAting: { type: Array },
    top3MenoresAting: { type: Array },
    canaisUnidades: { type: Array }
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
    this.filtroTpReceita = [];

    this.top3Volume = [];
    this.top3MaioresAting = [];
    this.top3MenoresAting = [];
    this.canaisUnidades = [];
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
     GERAÇÃO DE DADOS MOCKADOS INTERATIVOS
     ========================================== */
  _calcularFatorFiltros() {
    let fator = 1.0;

    if (this.filtroAno.length > 0) {
      const maxAno = Math.max(...this.filtroAno.map(a => parseInt(a, 10)));
      fator *= (1 + (maxAno - 2026) * 0.08);
      if (this.filtroAno.length > 1) {
        fator *= (1 + (this.filtroAno.length - 1) * 0.70);
      }
    }

    if (this.filtroMes.length > 0) {
      const maxMes = Math.max(...this.filtroMes.map(m => parseInt(m, 10)));
      fator *= (0.93 + (maxMes % 4) * 0.05);
      if (this.filtroMes.length > 1) {
        fator *= (1 + (this.filtroMes.length - 1) * 0.76);
      }
    }

    if (this.filtroSegmento.length > 0 && this.filtroSegmento.length < OPCOES_SEGMENTO.length) {
      fator *= Math.max(0.14, this.filtroSegmento.length * 0.13);
    }

    if (this.filtroTpReceita.length > 0 && this.filtroTpReceita.length < OPCOES_TP_RECEITA.length) {
      fator *= Math.max(0.20, this.filtroTpReceita.length * 0.23);
    }

    return fator;
  }

  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    await new Promise(resolve => setTimeout(resolve, 140));

    const fator = this._calcularFatorFiltros();
    const mesSeed = this.filtroMes.length > 0 ? parseInt(this.filtroMes[0], 10) : 1;

    // 1. Processa Top 3 Podiums
    const unidadesCalculadas = MOCK_UNIDADES_ATENDIMENTO.map((u, idx) => {
      const osc = 1 + (Math.sin(mesSeed + idx) * 0.06);
      const prod = Math.round(u.baseProd * fator * osc);
      const meta = Math.round(u.baseMeta * fator);
      const deltaNum = prod - meta;
      const atingNum = meta > 0 ? (prod / meta) * 100 : 0;
      return {
        unidade: u.unidade,
        prod,
        atingNum,
        deltaNum
      };
    });

    this.processarTop3(unidadesCalculadas);

    // 2. Processa os 4 Canais
    const canaisRaw = CANAIS_CONFIG.map((cfg, idx) => {
      const baseCfg = MOCK_CANAIS_BASE[cfg.id];
      const osc = 1 + (Math.cos(mesSeed + idx) * 0.04);
      const prod = Math.round(baseCfg.baseProd * fator * osc);
      const meta = Math.round(baseCfg.baseMeta * fator);
      const delta = prod - meta;
      const atingNum = meta > 0 ? (prod / meta) * 100 : 0;
      const qtdTotal = Math.max(10, Math.round(baseCfg.baseQtd * fator * osc));

      return {
        cfg,
        baseCfg,
        prod,
        delta,
        atingNum,
        qtdTotal
      };
    });

    const somaTotalCanais = canaisRaw.reduce((acc, c) => acc + c.prod, 0);

    this.canaisUnidades = canaisRaw.map(({ cfg, baseCfg, prod, delta, atingNum, qtdTotal }) => {
      const repr = somaTotalCanais > 0 ? (prod / somaTotalCanais) * 100 : 0;

      const pb = Math.round(prod * baseCfg.compProd.base);
      const pa = Math.round(prod * baseCfg.compProd.adesao);
      const pn = Math.max(0, prod - pb - pa);

      const pctPb = prod > 0 ? (pb / prod) * 100 : 0;
      const pctPa = prod > 0 ? (pa / prod) * 100 : 0;
      const pctPn = prod > 0 ? (pn / prod) * 100 : 0;

      const qb = Math.round(qtdTotal * baseCfg.compQtd.base);
      const qa = Math.round(qtdTotal * baseCfg.compQtd.adesao);
      const qn = Math.max(0, qtdTotal - qb - qa);

      const pctQb = qtdTotal > 0 ? (qb / qtdTotal) * 100 : 0;
      const pctQa = qtdTotal > 0 ? (qa / qtdTotal) * 100 : 0;
      const pctQn = qtdTotal > 0 ? (qn / qtdTotal) * 100 : 0;

      const yoyPos = baseCfg.yoyProd >= 0;

      return {
        id: cfg.id,
        nome: cfg.nome,
        cor: cfg.cor,
        prod: this.formatCompactCurrency(prod),
        yoy: `${yoyPos ? '+' : ''}${baseCfg.yoyProd.toFixed(1).replace('.', ',')}%`,
        yoyPos,
        delta: this.formatDelta(delta),
        ating: `${atingNum.toFixed(1).replace('.', ',')}%`,
        atingNum,
        repr: `${repr.toFixed(1).replace('.', ',')}%`,
        prodBreakdown: {
          base: { label: 'Base', valor: this.formatCompactCurrency(pb), pct: pctPb, cor: cfg.cor },
          adesao: { label: 'Adesão', valor: this.formatCompactCurrency(pa), pct: pctPa, cor: '#94a3b8' },
          novo: { label: 'Novo', valor: this.formatCompactCurrency(pn), pct: pctPn, cor: '#002b49' }
        },
        qtdTotal: `${this.formatInt(qtdTotal)} un`,
        qtdBreakdown: {
          base: { label: 'Base', qtd: `${this.formatInt(qb)} un`, pct: pctQb, cor: cfg.cor },
          adesao: { label: 'Adesão', qtd: `${this.formatInt(qa)} un`, pct: pctQa, cor: '#94a3b8' },
          novo: { label: 'Novo', qtd: `${this.formatInt(qn)} un`, pct: pctQn, cor: '#002b49' }
        }
      };
    });

    this.carregando = false;
  }

  formatCompactCurrency(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return 'R$ 0';
    const num = Number(val);
    const abs = Math.abs(num);
    const sinal = num < 0 ? '-' : '';
    if (abs >= 1000000) {
      return sinal + (abs / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
    }
    if (abs >= 1000) {
      return sinal + (abs / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' Mil';
    }
    return sinal + abs.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatExactCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return 'R$ -';
    const num = Number(val);
    const sinal = num < 0 ? '-' : '';
    return sinal + 'R$ ' + Math.abs(Math.round(num)).toLocaleString('pt-BR');
  }

  formatDelta(val) {
    if (val === null || val === undefined || isNaN(val)) return '-';
    const num = Number(val);
    const sinal = num > 0 ? '+' : num < 0 ? '-' : '';
    const abs = Math.abs(num);
    if (abs >= 1000000) {
      return `${sinal}R$ ${(abs / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mi`;
    }
    if (abs >= 1000) {
      return `${sinal}R$ ${(abs / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Mil`;
    }
    return `${sinal}R$ ${abs.toLocaleString('pt-BR')}`;
  }

  formatInt(val) {
    if (val === null || val === undefined || isNaN(val)) return '0';
    return Math.round(Number(val)).toLocaleString('pt-BR');
  }

  processarTop3(list) {
    const sortedVol = [...list].sort((a, b) => b.prod - a.prod).slice(0, 3);
    this.top3Volume = sortedVol.map((it, idx) => ({
      rank: `${idx + 1}º`,
      unidade: it.unidade,
      valor: this.formatExactCurrency(it.prod),
      ating: `${it.atingNum.toFixed(1).replace('.', ',')}%`,
      isPos: it.atingNum >= 100
    }));

    const sortedMaiores = [...list].sort((a, b) => b.atingNum - a.atingNum).slice(0, 3);
    this.top3MaioresAting = sortedMaiores.map((it, idx) => ({
      rank: `${idx + 1}º`,
      unidade: it.unidade,
      ating: `${it.atingNum.toFixed(1).replace('.', ',')}%`,
      delta: this.formatDelta(it.deltaNum)
    }));

    const sortedMenores = [...list].sort((a, b) => a.atingNum - b.atingNum).slice(0, 3);
    this.top3MenoresAting = sortedMenores.map((it, idx) => ({
      rank: `${idx + 1}º`,
      unidade: it.unidade,
      ating: `${it.atingNum.toFixed(1).replace('.', ',')}%`,
      delta: this.formatDelta(it.deltaNum)
    }));
  }

  /* =========================================================
     MICRO DONUT COM MIOLO TOTALMENTE VAZIO (SEM TEXTO)
     ========================================================= */
  renderMicroDonut(pBase, pAdesao, pNovo, corCanal) {
    const tot = (pBase || 0) + (pAdesao || 0) + (pNovo || 0);
    const r = 25;
    const c = 2 * Math.PI * r;

    const b = tot > 0 ? (pBase / tot) * 100 : 0;
    const a = tot > 0 ? (pAdesao / tot) * 100 : 0;
    const n = tot > 0 ? (pNovo / tot) * 100 : 0;

    const dBase = (b / 100) * c;
    const dAdesao = (a / 100) * c;
    const dNovo = (n / 100) * c;

    const offBase = 0;
    const offAdesao = -dBase;
    const offNovo = -(dBase + dAdesao);

    return html`
      <div class="mini-donut-wrapper">
        <svg viewBox="0 0 70 70" width="62" height="62">
          <circle cx="35" cy="35" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="12" />
          <circle 
            cx="35" cy="35" r="${r}" 
            fill="none" stroke="${corCanal}" stroke-width="12"
            stroke-dasharray="${dBase} ${c}" stroke-dashoffset="${offBase}"
            transform="rotate(-90 35 35)" />
          <circle 
            cx="35" cy="35" r="${r}" 
            fill="none" stroke="#94a3b8" stroke-width="12"
            stroke-dasharray="${dAdesao} ${c}" stroke-dashoffset="${offAdesao}"
            transform="rotate(-90 35 35)" />
          <circle 
            cx="35" cy="35" r="${r}" 
            fill="none" stroke="#002b49" stroke-width="12"
            stroke-dasharray="${dNovo} ${c}" stroke-dashoffset="${offNovo}"
            transform="rotate(-90 35 35)" />
        </svg>
      </div>
    `;
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

        /* BARRA COM OS FILTROS EM MULTI-SELECT */
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

        /* GRID DOS TOP 3 DESTAQUES */
        .top3-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .top3-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 16px 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          border-top: 4px solid var(--accent-color);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .top3-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .top3-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .top3-title {
          font-size: 14px;
          font-weight: 900;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.2px;
        }

        .top3-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 12px;
          text-transform: uppercase;
          background: #f1f5f9;
          color: #475569;
        }

        .top3-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .top3-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          border-radius: 6px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
        }

        .top3-rank-name {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
        }

        .rank-badge {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10.5px;
          font-weight: 900;
          background: #e2e8f0;
          color: #334155;
          flex-shrink: 0;
        }

        .rank-1 { background: #fef08a; color: #854d0e; }
        .rank-2 { background: #e2e8f0; color: #475569; }
        .rank-3 { background: #fed7aa; color: #9a3412; }

        .top3-name {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .top3-metrics {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .top3-val {
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
        }

        .badge-pill {
          font-size: 11px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .badge-green { background: #dcfce7; color: #15803d; }
        .badge-red { background: #fee2e2; color: #b91c1c; }
        .badge-amber { background: #fef3c7; color: #b45309; }

        /* GRID DOS 4 CANAIS */
        .canais-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          position: relative;
          z-index: 1;
        }

        .canal-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 18px 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          border-top: 4px solid var(--canal-color);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .canal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .canal-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .canal-title {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.3px;
        }

        .canal-repr-badge {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .canal-big-prod {
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
          letter-spacing: -0.5px;
          margin-top: 2px;
        }

        .pills-row {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          align-items: center;
        }

        .ating-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: #f8fafc;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #edf2f7;
        }

        .ating-label-val {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          font-weight: 700;
        }

        .micro-progress-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
        }

        .micro-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: #16a34a;
        }

        .card-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 2px 0;
        }

        .comp-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .comp-title {
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          display: flex;
          justify-content: space-between;
        }

        .comp-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mini-donut-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .comp-breakdown {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .breakdown-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }

        .breakdown-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #475569;
          font-weight: 600;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .breakdown-val {
          font-weight: 800;
          color: #0f172a;
        }

        .breakdown-pct {
          color: #64748b;
          font-size: 10px;
          margin-left: 2px;
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
            <h1>PERFORMANCE DAS UNIDADES</h1>
          </div>
        </div>

        <!-- BARRA COM OS FILTROS EM MULTI-SELECT -->
        <div class="filter-bar">
          ${this.renderDropdownFiltro('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdownFiltro('MÊS REFERÊNCIA', 'filtroMes', 'Todos os meses', OPCOES_MES)}
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
          ${this.renderDropdownFiltro('TIPO RECEITA', 'filtroTpReceita', 'Todas as receitas', OPCOES_TP_RECEITA)}
        </div>

        ${this.erro ? html`
          <div class="state-feedback" style="background: #fee2e2; color: #b91c1c; border-radius: 8px; margin-bottom: 16px;">
            ⚠️ ${this.erro}
          </div>
        ` : ''}

        <!-- TOP 3 PODIUMS EXECUTIVOS -->
        <div class="top3-grid">
          
          <!-- TOP 3 VOLUME -->
          <div class="top3-card" style="--accent-color: #00d2c4;">
            <div class="top3-header">
              <div class="top3-title">
                <span>💰</span> Top 3 - Volume de Vendas
              </div>
              <span class="top3-tag">Faturamento</span>
            </div>
            <div class="top3-list">
              ${this.carregando ? html`
                <div class="state-feedback">Carregando...</div>
              ` : this.top3Volume.length === 0 ? html`
                <div class="state-feedback">Sem dados</div>
              ` : this.top3Volume.map(item => html`
                <div class="top3-item">
                  <div class="top3-rank-name">
                    <span class="rank-badge ${item.rank === '1º' ? 'rank-1' : item.rank === '2º' ? 'rank-2' : 'rank-3'}">${item.rank}</span>
                    <span class="top3-name">${item.unidade}</span>
                  </div>
                  <div class="top3-metrics">
                    <span class="top3-val">${item.valor}</span>
                    <span class="badge-pill ${item.isPos ? 'badge-green' : 'badge-amber'}">${item.ating}</span>
                  </div>
                </div>
              `)}
            </div>
          </div>

          <!-- TOP 3 MAIORES ATINGIMENTOS -->
          <div class="top3-card" style="--accent-color: #6366f1;">
            <div class="top3-header">
              <div class="top3-title">
                <span>🎯</span> Top 3 - Maiores Atingimentos
              </div>
              <span class="top3-tag">Superação</span>
            </div>
            <div class="top3-list">
              ${this.carregando ? html`
                <div class="state-feedback">Carregando...</div>
              ` : this.top3MaioresAting.length === 0 ? html`
                <div class="state-feedback">Sem dados</div>
              ` : this.top3MaioresAting.map(item => html`
                <div class="top3-item">
                  <div class="top3-rank-name">
                    <span class="rank-badge ${item.rank === '1º' ? 'rank-1' : item.rank === '2º' ? 'rank-2' : 'rank-3'}">${item.rank}</span>
                    <span class="top3-name">${item.unidade}</span>
                  </div>
                  <div class="top3-metrics">
                    <span class="top3-val" style="color: #15803d;">${item.ating}</span>
                    <span class="badge-pill badge-green">${item.delta}</span>
                  </div>
                </div>
              `)}
            </div>
          </div>

          <!-- TOP 3 MENORES ATINGIMENTOS (ATENÇÃO) -->
          <div class="top3-card" style="--accent-color: #f43f5e;">
            <div class="top3-header">
              <div class="top3-title">
                <span>⚠️</span> Top 3 - Menores Atingimentos
              </div>
              <span class="top3-tag" style="background: #ffe4e6; color: #be123c;">Atenção</span>
            </div>
            <div class="top3-list">
              ${this.carregando ? html`
                <div class="state-feedback">Carregando...</div>
              ` : this.top3MenoresAting.length === 0 ? html`
                <div class="state-feedback">Sem dados</div>
              ` : this.top3MenoresAting.map(item => html`
                <div class="top3-item">
                  <div class="top3-rank-name">
                    <span class="rank-badge ${item.rank === '1º' ? 'rank-1' : item.rank === '2º' ? 'rank-2' : 'rank-3'}">${item.rank}</span>
                    <span class="top3-name">${item.unidade}</span>
                  </div>
                  <div class="top3-metrics">
                    <span class="top3-val" style="color: #b91c1c;">${item.ating}</span>
                    <span class="badge-pill ${item.delta.includes('-') ? 'badge-red' : 'badge-amber'}">${item.delta}</span>
                  </div>
                </div>
              `)}
            </div>
          </div>

        </div>

        <!-- OS 4 CANAIS / UNIDADES -->
        <div class="canais-grid">
          ${this.carregando ? html`
            <div class="state-feedback" style="grid-column: span 4;">Carregando canais e composições da camada LookML...</div>
          ` : this.canaisUnidades.map(canal => html`
            <div class="canal-card" style="--canal-color: ${canal.cor};">
              
              <!-- TOPO DO CANAL -->
              <div class="canal-header">
                <span class="canal-title">${canal.nome}</span>
                <span class="canal-repr-badge">Repr. ${canal.repr}</span>
              </div>

              <!-- VALOR PRINCIPAL -->
              <div class="canal-big-prod">${canal.prod}</div>

              <!-- PILLS YOY E DELTA -->
              <div class="pills-row">
                <span class="badge-pill ${canal.yoyPos ? 'badge-green' : 'badge-red'}">
                  ${canal.yoyPos ? '↗' : '↘'} ${canal.yoy} YoY
                </span>
                <span class="badge-pill ${canal.delta.includes('-') ? 'badge-red' : 'badge-green'}">
                  Delta ${canal.delta}
                </span>
              </div>

              <!-- ATINGIMENTO -->
              <div class="ating-row">
                <div class="ating-label-val">
                  <span style="color: #64748b;">Ating. Meta</span>
                  <span style="color: ${canal.atingNum >= 100 ? '#15803d' : '#b91c1c'}; font-weight: 800;">${canal.ating}</span>
                </div>
                <div class="micro-progress-bar">
                  <div class="micro-progress-fill" style="width: ${Math.min(canal.atingNum, 100)}%; background: ${canal.atingNum >= 100 ? '#16a34a' : '#dc2626'};"></div>
                </div>
              </div>

              <div class="card-divider"></div>

              <!-- COMPOSIÇÃO PRODUÇÃO (R$) -->
              <div class="comp-section">
                <div class="comp-title">
                  <span>Composição Produção</span>
                  <span style="color: #94a3b8; font-weight: 600;">(R$)</span>
                </div>
                <div class="comp-content">
                  ${this.renderMicroDonut(
                    canal.prodBreakdown.base.pct,
                    canal.prodBreakdown.adesao.pct,
                    canal.prodBreakdown.novo.pct,
                    canal.cor
                  )}
                  <div class="comp-breakdown">
                    <div class="breakdown-row">
                      <span class="breakdown-tag"><span class="dot" style="background: ${canal.cor};"></span>Base</span>
                      <span class="breakdown-val">${canal.prodBreakdown.base.valor}<span class="breakdown-pct">(${canal.prodBreakdown.base.pct.toFixed(1).replace('.', ',')}%)</span></span>
                    </div>
                    <div class="breakdown-row">
                      <span class="breakdown-tag"><span class="dot" style="background: #94a3b8;"></span>Adesão</span>
                      <span class="breakdown-val">${canal.prodBreakdown.adesao.valor}<span class="breakdown-pct">(${canal.prodBreakdown.adesao.pct.toFixed(1).replace('.', ',')}%)</span></span>
                    </div>
                    ${canal.prodBreakdown.novo.pct > 0 ? html`
                      <div class="breakdown-row">
                        <span class="breakdown-tag"><span class="dot" style="background: #002b49;"></span>Novo</span>
                        <span class="breakdown-val">${canal.prodBreakdown.novo.valor}<span class="breakdown-pct">(${canal.prodBreakdown.novo.pct.toFixed(1).replace('.', ',')}%)</span></span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <div class="card-divider"></div>

              <!-- COMPOSIÇÃO QUANTIDADE (UNIDADES REAIS) -->
              <div class="comp-section">
                <div class="comp-title">
                  <span>Composição Quantidade</span>
                  <span style="color: #6366f1; font-weight: 800;">${canal.qtdTotal}</span>
                </div>
                <div class="comp-content">
                  ${this.renderMicroDonut(
                    canal.qtdBreakdown.base.pct,
                    canal.qtdBreakdown.adesao.pct,
                    canal.qtdBreakdown.novo.pct,
                    canal.cor
                  )}
                  <div class="comp-breakdown">
                    <div class="breakdown-row">
                      <span class="breakdown-tag"><span class="dot" style="background: ${canal.cor};"></span>Base</span>
                      <span class="breakdown-val">${canal.qtdBreakdown.base.qtd}<span class="breakdown-pct">(${canal.qtdBreakdown.base.pct.toFixed(1).replace('.', ',')}%)</span></span>
                    </div>
                    <div class="breakdown-row">
                      <span class="breakdown-tag"><span class="dot" style="background: #94a3b8;"></span>Adesão</span>
                      <span class="breakdown-val">${canal.qtdBreakdown.adesao.qtd}<span class="breakdown-pct">(${canal.qtdBreakdown.adesao.pct.toFixed(1).replace('.', ',')}%)</span></span>
                    </div>
                    ${canal.qtdBreakdown.novo.pct > 0 ? html`
                      <div class="breakdown-row">
                        <span class="breakdown-tag"><span class="dot" style="background: #002b49;"></span>Novo</span>
                        <span class="breakdown-val">${canal.qtdBreakdown.novo.qtd}<span class="breakdown-pct">(${canal.qtdBreakdown.novo.pct.toFixed(1).replace('.', ',')}%)</span></span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>

            </div>
          `)}
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, PerformanceUnidades);
