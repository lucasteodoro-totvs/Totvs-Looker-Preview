/**
 * @title Unidades Analítico (Versão Vercel Preview)
 * @description Visão Analítica Detalhada por Unidade (Filiais, Franquias, Verticais e MI)
 *              com filtros dinâmicos e dados simulados.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'unidades-analitico';

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

// Dados Mockados para cada Canal
const MOCK_FILIAIS = [
  { unidade: 'UNIDADE SP - PAULISTA', prodBase: 3840000, metaBase: 3520000, yoyProd: 12.5, yoyQtd: 8.2, qtdBase: 145 },
  { unidade: 'UNIDADE RJ - BARRA', prodBase: 2410000, metaBase: 2290000, yoyProd: 9.8, yoyQtd: 5.4, qtdBase: 112 },
  { unidade: 'UNIDADE SUL - PORTO ALEGRE', prodBase: 1890000, metaBase: 1960000, yoyProd: -4.5, yoyQtd: -2.1, qtdBase: 94 },
  { unidade: 'UNIDADE MG - BELO HORIZONTE', prodBase: 1540000, metaBase: 1490000, yoyProd: 18.2, yoyQtd: 14.5, qtdBase: 78 },
  { unidade: 'UNIDADE DF - BRASILIA', prodBase: 910000, metaBase: 1090000, yoyProd: -15.4, yoyQtd: -9.8, qtdBase: 52 },
  { unidade: 'UNIDADE PE - RECIFE', prodBase: 480000, metaBase: 760000, yoyProd: -24.8, yoyQtd: -18.5, qtdBase: 31 },
  { unidade: 'UNIDADE BA - SALVADOR', prodBase: 420000, metaBase: 380000, yoyProd: 28.5, yoyQtd: 21.4, qtdBase: 28 }
];

const MOCK_FRANQUIAS = [
  { unidade: 'FRANQUIA CAMPINAS', prodBase: 1985000, metaBase: 1640000, yoyProd: 22.4, yoyQtd: 18.1, qtdBase: 98 },
  { unidade: 'FRANQUIA CURITIBA', prodBase: 1420000, metaBase: 1120000, yoyProd: 19.5, yoyQtd: 15.2, qtdBase: 75 },
  { unidade: 'FRANQUIA RIBEIRAO PRETO', prodBase: 980000, metaBase: 1180000, yoyProd: -12.4, yoyQtd: -8.5, qtdBase: 54 },
  { unidade: 'FRANQUIA GOIANIA', prodBase: 520000, metaBase: 790000, yoyProd: -28.5, yoyQtd: -22.4, qtdBase: 32 },
  { unidade: 'FRANQUIA SAO JOSE DO RIO PRETO', prodBase: 480000, metaBase: 410000, yoyProd: 14.8, yoyQtd: 11.5, qtdBase: 28 },
  { unidade: 'FRANQUIA LONDRINA', prodBase: 340000, metaBase: 450000, yoyProd: -18.2, yoyQtd: -12.4, qtdBase: 21 }
];

const MOCK_VERTICAIS = [
  { unidade: 'VERTICAL MANUFATURA SP', prodBase: 1620000, metaBase: 1280000, yoyProd: 28.4, yoyQtd: 22.1, qtdBase: 84 },
  { unidade: 'VERTICAL SAUDE', prodBase: 860000, metaBase: 740000, yoyProd: 15.2, yoyQtd: 9.8, qtdBase: 45 },
  { unidade: 'VERTICAL LOGISTICA RJ', prodBase: 640000, metaBase: 710000, yoyProd: -8.5, yoyQtd: -5.4, qtdBase: 38 },
  { unidade: 'VERTICAL AGRO MT', prodBase: 580000, metaBase: 420000, yoyProd: 32.5, yoyQtd: 25.8, qtdBase: 32 },
  { unidade: 'VERTICAL VAREJO SC', prodBase: 420000, metaBase: 580000, yoyProd: -21.4, yoyQtd: -15.8, qtdBase: 26 }
];

const MOCK_MI = [
  { unidade: 'TOTVS MEXICO', prodBase: 1290000, metaBase: 1210000, yoyProd: 11.5, yoyQtd: 8.2, qtdBase: 65 },
  { unidade: 'TOTVS ARGENTINA', prodBase: 640000, metaBase: 920000, yoyProd: -22.4, yoyQtd: -18.5, qtdBase: 38 },
  { unidade: 'TOTVS COLOMBIA', prodBase: 480000, metaBase: 410000, yoyProd: 15.8, yoyQtd: 11.4, qtdBase: 26 },
  { unidade: 'TOTVS CHILE', prodBase: 320000, metaBase: 450000, yoyProd: -28.5, yoyQtd: -21.4, qtdBase: 18 }
];

export class UnidadesAnalitico extends LitElement {
  static properties = {
    abaAtiva: { type: String }, // 'FILIAIS' | 'FRANQUIAS' | 'VERTICAIS' | 'MI'
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroSegmento: { type: Array },
    filtroTpReceita: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    dadosTabela: { type: Array },
    totalTabela: { type: Object }
  };

  constructor() {
    super();
    this.abaAtiva = 'FILIAIS';
    this.carregando = true;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.filtroAno = ['2026'];
    this.filtroMes = ['1'];
    this.filtroSegmento = [];
    this.filtroTpReceita = [];

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
     GERAÇÃO DE DADOS MOCKADOS
     ========================================== */
  _calcularFatorFiltros() {
    let fator = 1.0;
    if (this.filtroAno.length > 0) {
      const maxAno = Math.max(...this.filtroAno.map(a => parseInt(a, 10)));
      fator *= (1 + (maxAno - 2026) * 0.08);
      if (this.filtroAno.length > 1) fator *= (1 + (this.filtroAno.length - 1) * 0.65);
    }
    if (this.filtroMes.length > 0) {
      const maxMes = Math.max(...this.filtroMes.map(m => parseInt(m, 10)));
      fator *= (0.95 + (maxMes % 3) * 0.05);
      if (this.filtroMes.length > 1) fator *= (1 + (this.filtroMes.length - 1) * 0.70);
    }
    if (this.filtroSegmento.length > 0 && this.filtroSegmento.length < OPCOES_SEGMENTO.length) {
      fator *= Math.max(0.15, this.filtroSegmento.length * 0.12);
    }
    if (this.filtroTpReceita.length > 0 && this.filtroTpReceita.length < OPCOES_TP_RECEITA.length) {
      fator *= Math.max(0.20, this.filtroTpReceita.length * 0.20);
    }
    return fator;
  }

  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    // Simulação do Looker
    await new Promise(resolve => setTimeout(resolve, 120));

    const fator = this._calcularFatorFiltros();
    let baseData = [];

    if (this.abaAtiva === 'FILIAIS') baseData = MOCK_FILIAIS;
    else if (this.abaAtiva === 'FRANQUIAS') baseData = MOCK_FRANQUIAS;
    else if (this.abaAtiva === 'VERTICAIS') baseData = MOCK_VERTICAIS;
    else if (this.abaAtiva === 'MI') baseData = MOCK_MI;

    let totProd = 0, totMeta = 0, totQtd = 0, somaYoyProd = 0, somaYoyQtd = 0;

    const lista = baseData.map(item => {
      const prod = Math.round(item.prodBase * fator);
      const meta = Math.round(item.metaBase * fator);
      const delta = prod - meta;
      const atingNum = meta > 0 ? (prod / meta) * 100 : 0;
      const qtd = Math.max(1, Math.round(item.qtdBase * fator));
      const tm = qtd > 0 ? prod / qtd : 0;
      
      const yoyProd = item.yoyProd + (Math.random() * 4 - 2);
      const yoyQtd = item.yoyQtd + (Math.random() * 4 - 2);
      const yoyTm = yoyProd - yoyQtd;

      totProd += prod;
      totMeta += meta;
      totQtd += qtd;
      somaYoyProd += yoyProd * prod;
      somaYoyQtd += yoyQtd * qtd;

      return {
        unidade: item.unidade,
        meta: this.formatCurrencyWithDecimals(meta),
        prod: this.formatCurrencyWithDecimals(prod),
        ating: `${atingNum.toFixed(1).replace('.', ',')}%`,
        atingNum,
        delta: this.formatDelta(delta),
        deltaNum: delta,
        yoyProd: this.formatPercent(yoyProd),
        qtd: this.formatInt(qtd),
        yoyQtd: this.formatPercent(yoyQtd),
        tm: this.formatInt(tm),
        yoyTm: this.formatPercent(yoyTm)
      };
    });

    // Ordenar por produção (decrescente)
    this.dadosTabela = lista.sort((a, b) => {
      const vA = parseFloat(a.prod.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      const vB = parseFloat(b.prod.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      return vB - vA;
    });

    if (lista.length > 0) {
      const totDelta = totProd - totMeta;
      const totAtingNum = totMeta > 0 ? (totProd / totMeta) * 100 : 0;
      
      this.totalTabela = {
        unidade: 'Total',
        meta: this.formatCurrencyWithDecimals(totMeta),
        prod: this.formatCurrencyWithDecimals(totProd),
        ating: `${totAtingNum.toFixed(1).replace('.', ',')}%`,
        atingNum: totAtingNum,
        delta: this.formatDelta(totDelta),
        deltaNum: totDelta,
        yoyProd: this.formatPercent(totProd > 0 ? somaYoyProd / totProd : 0),
        qtd: this.formatInt(totQtd),
        yoyQtd: this.formatPercent(totQtd > 0 ? somaYoyQtd / totQtd : 0),
        tm: this.formatInt(totQtd > 0 ? totProd / totQtd : 0),
        yoyTm: this.formatPercent((totProd > 0 ? somaYoyProd / totProd : 0) - (totQtd > 0 ? somaYoyQtd / totQtd : 0))
      };
    } else {
      this.totalTabela = null;
    }

    this.carregando = false;
    this.requestUpdate();
  }

  formatCurrencyWithDecimals(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '-';
    return Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatInt(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '-';
    return Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatDelta(val) {
    if (val === null || val === undefined || isNaN(val)) return '-';
    const num = Number(val);
    if (num === 0) return '0';
    const sinal = num > 0 ? '+' : '';
    return sinal + Math.round(num).toLocaleString('pt-BR');
  }

  formatPercent(val) {
    if (val === null || val === undefined || val === '' || val === '-') return '-';
    let num = Number(val);
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

  renderAtingimento(atingStr, atingNum) {
    if (atingStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const isGreen = atingNum >= 100;
    return html`
      <span style="color: ${isGreen ? '#16a34a' : '#dc2626'}; font-weight: 800;">
        ${atingStr}
      </span>
    `;
  }

  renderDelta(deltaStr) {
    if (deltaStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const isNeg = deltaStr.includes('-');
    return html`
      <span style="color: ${isNeg ? '#dc2626' : '#16a34a'}; font-weight: 700;">
        ${deltaStr}
      </span>
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
    const titulos = {
      FILIAIS: 'FILIAIS',
      FRANQUIAS: 'FRANQUIAS',
      VERTICAIS: 'VERTICAIS',
      MI: 'MI (MERCADO INTERNACIONAL)'
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
          max-height: 600px;
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
          padding: 11px 8px;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          letter-spacing: 0.2px;
          white-space: nowrap;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        th.col-dim {
          text-align: left;
          padding-left: 12px;
        }

        td {
          padding: 10px 8px;
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

        /* TOTAL FIXO NA BASE */
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
        
        <!-- CABEÇALHO HERO BANNER OFICIAL TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="title-area">
            <h1>UNIDADES ANALÍTICO</h1>
            <div class="tabs-group">
              <button 
                class="tab-btn ${this.abaAtiva === 'FILIAIS' ? 'active' : ''}" 
                @click="${() => this.mudarAba('FILIAIS')}">
                Filiais
              </button>
              <button 
                class="tab-btn ${this.abaAtiva === 'FRANQUIAS' ? 'active' : ''}" 
                @click="${() => this.mudarAba('FRANQUIAS')}">
                Franquias
              </button>
              <button 
                class="tab-btn ${this.abaAtiva === 'VERTICAIS' ? 'active' : ''}" 
                @click="${() => this.mudarAba('VERTICAIS')}">
                Verticais
              </button>
              <button 
                class="tab-btn ${this.abaAtiva === 'MI' ? 'active' : ''}" 
                @click="${() => this.mudarAba('MI')}">
                MI (Internacional)
              </button>
            </div>
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

        <!-- TABELA ANALÍTICA DINÂMICA CONECTADA AO LOOKER -->
        <div class="table-section">
          <div class="table-title">${titulos[this.abaAtiva]}</div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th class="col-dim">Unidade</th>
                  <th>Meta</th>
                  <th>Prod.</th>
                  <th>Ating</th>
                  <th>Delta</th>
                  <th>% Prod. YoY</th>
                  <th>QTD</th>
                  <th>YoY QTD</th>
                  <th>TM</th>
                  <th>YoY TM</th>
                </tr>
              </thead>
              <tbody>
                ${this.carregando ? html`
                  <tr><td colspan="10" class="state-feedback">Carregando dados da camada LookML...</td></tr>
                ` : this.dadosTabela.length === 0 ? html`
                  <tr><td colspan="10" class="state-feedback">Nenhum dado encontrado para os filtros selecionados.</td></tr>
                ` : html`
                  ${this.dadosTabela.map(r => html`
                    <tr class="row-data">
                      <td class="col-dim-val">${r.unidade}</td>
                      <td>${r.meta}</td>
                      <td>${r.prod}</td>
                      <td>${this.renderAtingimento(r.ating, r.atingNum)}</td>
                      <td>${this.renderDelta(r.delta)}</td>
                      <td>${this.renderYoY(r.yoyProd)}</td>
                      <td>${r.qtd}</td>
                      <td>${this.renderYoY(r.yoyQtd)}</td>
                      <td>${r.tm}</td>
                      <td>${this.renderYoY(r.yoyTm)}</td>
                    </tr>
                  `)}
                  ${this.totalTabela ? html`
                    <tr class="row-total">
                      <td class="col-dim-val">${this.totalTabela.unidade}</td>
                      <td>${this.totalTabela.meta}</td>
                      <td>${this.totalTabela.prod}</td>
                      <td><span style="color: ${this.totalTabela.atingNum >= 100 ? '#86efac' : '#fca5a5'}; font-weight: 800;">${this.totalTabela.ating}</span></td>
                      <td><span style="color: ${this.totalTabela.deltaNum < 0 ? '#fca5a5' : '#86efac'}; font-weight: 800;">${this.totalTabela.delta}</span></td>
                      <td>${this.renderTotalYoY(this.totalTabela.yoyProd)}</td>
                      <td>${this.totalTabela.qtd}</td>
                      <td>${this.renderTotalYoY(this.totalTabela.yoyQtd)}</td>
                      <td>${this.totalTabela.tm}</td>
                      <td>${this.renderTotalYoY(this.totalTabela.yoyTm)}</td>
                    </tr>
                  ` : ''}
                `}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, UnidadesAnalitico);
