/**
 * @title Curva ABC das Ofertas (Versão Vercel Preview)
 * @description Classificação Pareto das Ofertas TOTVS com cards de representatividade e matriz analítica Mês vs YTD
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'curva-abc-ofertas';

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

const OPCOES_TP_RECEITA = [
  { value: 'CDU', label: 'CDU' },
  { value: 'EM BRANCO', label: 'EM BRANCO' },
  { value: 'OUTROS', label: 'OUTROS' },
  { value: 'SAAS', label: 'SAAS' },
  { value: 'SERVICOS NÃO RECORRENTES', label: 'SERVICOS NÃO RECORRENTES' },
  { value: 'SERVICOS RECORRENTES', label: 'SERVICOS RECORRENTES' },
  { value: 'SMS', label: 'SMS' }
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

const MOCK_OFERTAS_CURVA = [
  { nome: 'SERVIÇOS NÃO RECORRENTES', mesProd: 9176177, mesQtd: 468, yoyProd: -24.3, yoyQtd: -1.8, yoyTm: -22.9, isRec: false },
  { nome: 'CORPORATIVO', mesProd: 1879166, mesQtd: 30, yoyProd: -6.3, yoyQtd: 6.9, yoyTm: -12.3, isRec: true },
  { nome: 'FULL/LIGHT/TOTVS I', mesProd: 5777017, mesQtd: 105, yoyProd: 16.4, yoyQtd: 32.5, yoyTm: -12.2, isRec: false },
  { nome: 'PROCESSOS INTERNOS', mesProd: 3804469, mesQtd: 335, yoyProd: -25.2, yoyQtd: 26.8, yoyTm: -41.0, isRec: true },
  { nome: 'CORE SEGMENTOS', mesProd: 4120444, mesQtd: 603, yoyProd: -16.6, yoyQtd: -8.6, yoyTm: -8.7, isRec: true },
  { nome: 'CES (Centro de Excelência)', mesProd: 1434828, mesQtd: 91, yoyProd: 4.8, yoyQtd: -12.4, yoyTm: 19.7, isRec: false },
  { nome: 'WINTHOR (CORE + CLOUD + PARC)', mesProd: 2439222, mesQtd: 212, yoyProd: -22.4, yoyQtd: -3.0, yoyTm: -19.9, isRec: true },
  { nome: 'INTERA ADESAO', mesProd: 2687567, mesQtd: 54, yoyProd: 23.8, yoyQtd: -11.9, yoyTm: 40.5, isRec: true },
  { nome: 'SOFTWARE COMPLEMENTAR', mesProd: 1466161, mesQtd: 64, yoyProd: -12.0, yoyQtd: -9.0, yoyTm: -3.3, isRec: false },
  { nome: 'SUPERMERCADOS', mesProd: 749301, mesQtd: 48, yoyProd: -34.2, yoyQtd: 8.2, yoyTm: -39.2, isRec: true },
  { nome: 'RH (CORE + PARC)', mesProd: 1449848, mesQtd: 246, yoyProd: -3.7, yoyQtd: 4.2, yoyTm: -7.6, isRec: true },
  { nome: 'CLOUD + CLOUD INTERA', mesProd: 2095118, mesQtd: 275, yoyProd: 39.8, yoyQtd: 18.7, yoyTm: 17.8, isRec: true },
  { nome: 'INTERA BO', mesProd: 1380450, mesQtd: 198, yoyProd: -8.4, yoyQtd: -4.1, yoyTm: -4.5, isRec: true },
  { nome: 'AHGORA PONTO ELETRÔNICO', mesProd: 965200, mesQtd: 112, yoyProd: 28.4, yoyQtd: 19.2, yoyTm: 7.7, isRec: true },
  { nome: 'RD STATION MARKETING', mesProd: 812900, mesQtd: 84, yoyProd: 15.6, yoyQtd: 11.3, yoyTm: 3.9, isRec: true },
  { nome: 'FLUIG (CORE + PARC)', mesProd: 745300, mesQtd: 62, yoyProd: -14.2, yoyQtd: -9.5, yoyTm: -5.2, isRec: true },
  { nome: 'SOLUÇÕES FISCAIS & TAX', mesProd: 618400, mesQtd: 49, yoyProd: 21.3, yoyQtd: 14.0, yoyTm: 6.4, isRec: true },
  { nome: 'FEEDZ BY TOTVS', mesProd: 485200, mesQtd: 58, yoyProd: 31.0, yoyQtd: 24.5, yoyTm: 5.2, isRec: true },
  { nome: 'GESPLAN TESOURARIA', mesProd: 392100, mesQtd: 19, yoyProd: 9.4, yoyQtd: 5.5, yoyTm: 3.7, isRec: true },
  { nome: 'GOODDATA EMBEDDED', mesProd: 274800, mesQtd: 44, yoyProd: -18.7, yoyQtd: -11.2, yoyTm: -8.4, isRec: true },
  { nome: 'TECHFIN CRÉDITO', mesProd: 218500, mesQtd: 27, yoyProd: 44.2, yoyQtd: 33.1, yoyTm: 8.3, isRec: true }
];

export class CurvaAbcOfertas extends LitElement {
  static properties = {
    filtroCurva: { type: String },
    carregando: { type: Boolean },
    erro: { type: String },

    filtroAno: { type: String },
    filtroMes: { type: String },
    filtroTpReceita: { type: Array },
    filtroSegmento: { type: Array },
    filtroTpUnidade: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    dadosOfertas: { type: Array },
    totalGeral: { type: Object },
    resumoCurvas: { type: Object }
  };

  constructor() {
    super();
    this.filtroCurva = 'TODAS';
    this.carregando = false;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.dadosOfertas = [];
    this.totalGeral = null;
    this.resumoCurvas = {
      curvaA: { curva: 'A', ofertas: 0, prodYtd: '0,0', repr: '0,0%', pctNum: 0, cor: '#a855f7' },
      curvaB: { curva: 'B', ofertas: 0, prodYtd: '0,0', repr: '0,0%', pctNum: 0, cor: '#ec4899' },
      curvaC: { curva: 'C', ofertas: 0, prodYtd: '0,0', repr: '0,0%', pctNum: 0, cor: '#f43f5e' }
    };

    this.filtroAno = '2026';
    this.filtroMes = '3';
    this.filtroTpReceita = [];
    this.filtroSegmento = [];
    this.filtroTpUnidade = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this._fecharDropdownsAoClicarFora = (e) => {
      if (!e.composedPath().some(el => el.classList && el.classList.contains('filter-dropdown-container'))) {
        this.dropdownAberto = null;
        this.requestUpdate();
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
    this.requestUpdate();
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
    this.requestUpdate();
  }

  formatTriggerText(selecionados, labelVazio, listaOpcoes) {
    if (!selecionados || selecionados.length === 0) return labelVazio;
    if (selecionados.length === 1) {
      const achado = listaOpcoes.find(o => o.value === selecionados[0]);
      return achado ? achado.label : selecionados[0];
    }
    return `${selecionados.length} selecionados`;
  }

  carregarDados() {
    this.carregando = true;
    this.erro = null;

    const anoNum = parseInt(this.filtroAno, 10) || 2026;
    const mesNum = parseInt(this.filtroMes, 10) || 3;

    let fator = 1.0;
    fator *= (1 + (anoNum - 2026) * 0.09);
    fator *= (0.94 + (mesNum % 4) * 0.04);

    if (this.filtroSegmento.length > 0 && this.filtroSegmento.length < OPCOES_SEGMENTO.length) {
      fator *= Math.max(0.14, this.filtroSegmento.length * 0.13);
    }
    if (this.filtroTpUnidade.length > 0 && this.filtroTpUnidade.length < OPCOES_TP_UNIDADE.length) {
      fator *= Math.max(0.18, this.filtroTpUnidade.length * 0.21);
    }

    let baseList = MOCK_OFERTAS_CURVA;
    if (this.filtroTpReceita.length > 0) {
      const querCdu = this.filtroTpReceita.includes('CDU') || this.filtroTpReceita.includes('SERVICOS NÃO RECORRENTES');
      const querRec = this.filtroTpReceita.some(r => ['SAAS', 'SMS', 'SERVICOS RECORRENTES'].includes(r));
      if (querCdu && !querRec) {
        baseList = MOCK_OFERTAS_CURVA.filter(o => !o.isRec);
      } else if (!querCdu && querRec) {
        baseList = MOCK_OFERTAS_CURVA.filter(o => o.isRec);
      } else {
        fator *= 0.72;
      }
    }

    const multYtd = mesNum * 1.04;

    const brutos = baseList.map((item, idx) => {
      const osc = 1 + (Math.sin(mesNum + idx) * 0.05);
      const mesProdNum = Math.round(item.mesProd * fator * osc);
      const mesQtdNum = Math.max(1, Math.round(item.mesQtd * fator * osc));
      const mesTmNum = mesQtdNum > 0 ? Math.round(mesProdNum / mesQtdNum) : 0;

      const ytdProdNum = Math.round(mesProdNum * multYtd);
      const ytdQtdNum = Math.max(1, Math.round(mesQtdNum * multYtd));
      const ytdTmNum = ytdQtdNum > 0 ? Math.round(ytdProdNum / ytdQtdNum) : 0;

      return {
        nome: item.nome,
        mesProdNum,
        mesQtdNum,
        mesTmNum,
        ytdProdNum,
        ytdQtdNum,
        ytdTmNum,
        yoyProdVal: item.yoyProd,
        yoyQtdVal: item.yoyQtd,
        yoyTmVal: item.yoyTm
      };
    });

    // Ordenar pelo YTD do maior para o menor para aplicar Pareto
    brutos.sort((a, b) => b.ytdProdNum - a.ytdProdNum);

    const totProdYtd = brutos.reduce((acc, r) => acc + r.ytdProdNum, 0);
    const totProdMes = brutos.reduce((acc, r) => acc + r.mesProdNum, 0);
    const totQtdMes = brutos.reduce((acc, r) => acc + r.mesQtdNum, 0);
    const totQtdYtd = brutos.reduce((acc, r) => acc + r.ytdQtdNum, 0);

    let acumulado = 0;
    const lista = brutos.map((item) => {
      acumulado += item.ytdProdNum;
      const pctAcc = totProdYtd > 0 ? (acumulado / totProdYtd) * 100 : 100;

      let curva = 'C';
      if (pctAcc <= 70.0) curva = 'A';
      else if (pctAcc <= 90.0) curva = 'B';
      else curva = 'C';

      const repNum = totProdYtd > 0 ? (item.ytdProdNum / totProdYtd) * 100 : 0;

      return {
        ...item,
        curva,
        repVal: repNum,
        repNum
      };
    });

    const grupos = {
      A: { ofertas: 0, prodYtd: 0 },
      B: { ofertas: 0, prodYtd: 0 },
      C: { ofertas: 0, prodYtd: 0 }
    };

    lista.forEach((item) => {
      grupos[item.curva].ofertas += 1;
      grupos[item.curva].prodYtd += item.ytdProdNum;
    });

    const calcCard = (c, cor) => {
      const g = grupos[c];
      const pct = totProdYtd > 0 ? (g.prodYtd / totProdYtd) * 100 : 0;
      return {
        curva: c,
        ofertas: g.ofertas,
        prodYtd: this.formatCompactCurrency(g.prodYtd),
        repr: pct.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%',
        pctNum: Math.min(Math.max(pct, 0), 100),
        cor
      };
    };

    this.resumoCurvas = {
      curvaA: calcCard('A', '#a855f7'),
      curvaB: calcCard('B', '#ec4899'),
      curvaC: calcCard('C', '#f43f5e')
    };

    const pondYoyProd = totProdYtd > 0 ? lista.reduce((a, b) => a + b.yoyProdVal * b.ytdProdNum, 0) / totProdYtd : 0;
    const pondYoyQtd = totQtdYtd > 0 ? lista.reduce((a, b) => a + b.yoyQtdVal * b.ytdQtdNum, 0) / totQtdYtd : 0;
    const pondYoyTm = totProdYtd > 0 ? lista.reduce((a, b) => a + b.yoyTmVal * b.ytdProdNum, 0) / totProdYtd : 0;

    this.totalGeral = {
      nome: 'Total',
      mesProd: this.formatInt(totProdMes),
      mesQtd: this.formatInt(totQtdMes),
      mesTm: this.formatInt(totQtdMes > 0 ? totProdMes / totQtdMes : 0),
      ytdProd: this.formatInt(totProdYtd),
      ytdQtd: this.formatInt(totQtdYtd),
      ytdTm: this.formatInt(totQtdYtd > 0 ? totProdYtd / totQtdYtd : 0),
      yoyProd: this.formatPercent(pondYoyProd),
      yoyQtd: this.formatPercent(pondYoyQtd),
      yoyTm: this.formatPercent(pondYoyTm),
      rep: '100,0%'
    };

    this.dadosOfertas = lista;
    this.carregando = false;
    this.requestUpdate();
  }

  formatInt(val) {
    if (val === null || val === undefined || isNaN(val) || val === '') return '-';
    return Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatCompactCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return '0,0';
    const num = Number(val);
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
    }
    if (Math.abs(num) >= 1000) {
      return (num / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mil';
    }
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatPercent(val) {
    if (val === null || val === undefined || val === '' || val === '-') return '-';
    if (typeof val === 'string' && val.includes('%')) return val;
    const num = Number(val);
    if (isNaN(num)) return '-';
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  renderYoY(valStr) {
    if (!valStr || valStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const isNeg = valStr.includes('-');
    const isNeutral = valStr === '0,0%' || valStr === '0%';
    if (isNeutral) return html`<span style="color: #0284c7; font-weight: 700;">0,0%</span>`;
    return html`
      <span style="color: ${isNeg ? '#dc2626' : '#16a34a'}; font-weight: 700;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  renderTotalYoY(valStr) {
    if (!valStr || valStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const isNeg = valStr.includes('-');
    return html`
      <span style="color: ${isNeg ? '#fca5a5' : '#86efac'}; font-weight: 800;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  renderMicroDonut(pct, cor) {
    const r = 26;
    const c = 2 * Math.PI * r;
    const filled = Math.min(Math.max((pct / 100) * c, 0), c);
    return html`
      <div class="donut-wrap">
        <svg viewBox="0 0 70 70" width="60" height="60">
          <circle cx="35" cy="35" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="10" />
          <circle
            cx="35" cy="35" r="${r}"
            fill="none"
            stroke="${cor}"
            stroke-width="10"
            stroke-dasharray="${filled} ${c}"
            stroke-dashoffset="0"
            transform="rotate(-90 35 35)" />
        </svg>
        <span class="donut-center-pct">${pct.toFixed(1).replace('.', ',')}%</span>
      </div>
    `;
  }

  renderCardCurva(info, corTema) {
    return html`
      <div class="curve-kpi-card" style="--cor-tema: ${corTema};">
        <div class="curve-card-header">
          <span class="curve-title">CURVA ${info.curva}</span>
          <span class="curve-badge">Pareto</span>
        </div>

        <div class="curve-body">
          <div class="curve-metric-row">
            <span class="icon-label">📦 Ofertas</span>
            <span class="metric-val"><strong>${info.ofertas}</strong> ofertas</span>
          </div>

          <div class="curve-metric-row">
            <span class="icon-label">💰 Prod. YTD</span>
            <span class="metric-val big" style="color: var(--cor-tema);">${info.prodYtd}</span>
          </div>

          <div class="curve-repr-row">
            <div class="repr-text-group">
              <span class="repr-label">Representatividade</span>
              <span class="repr-num">${info.repr}</span>
            </div>
            ${this.renderMicroDonut(info.pctNum, corTema)}
          </div>
        </div>
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
    const { curvaA, curvaB, curvaC } = this.resumoCurvas;
    const listaFiltrada = this.filtroCurva === 'TODAS'
      ? this.dadosOfertas
      : this.dadosOfertas.filter(item => item.curva === this.filtroCurva);

    const contagemA = this.dadosOfertas.filter(i => i.curva === 'A').length;
    const contagemB = this.dadosOfertas.filter(i => i.curva === 'B').length;
    const contagemC = this.dadosOfertas.filter(i => i.curva === 'C').length;

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
          position: relative;
          overflow: hidden;
          z-index: 2;
        }

        .gradient-slant {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 48%;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%);
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
        }

        .title-area { position: relative; z-index: 3; }
        .title-area h1 { font-size: 24px; font-weight: 900; margin: 0; color: #000; letter-spacing: -0.5px; text-transform: uppercase; }

        .filter-bar {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 12px;
          padding: 14px 20px;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: flex-end;
          border: 1px solid rgba(255,255,255,0.8);
          position: relative;
          z-index: 20;
        }

        .filter-dropdown-container { position: relative; flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 4px; }
        .filter-label { font-size: 11px; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.3px; }
        .filter-trigger-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 8px 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px;
          font-size: 12px; color: #0f172a; cursor: pointer; outline: none; height: 35px; font-weight: 600;
        }
        .filter-trigger-btn:hover, .filter-trigger-btn.active { border-color: #7c3aed; }
        .filter-trigger-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .filter-select-input {
          width: 100%; padding: 8px 12px; background: #ffffff; border: 1px solid #cbd5e1;
          border-radius: 6px; font-size: 12px; color: #0f172a; outline: none; cursor: pointer; font-weight: 600; height: 35px;
        }
        .filter-menu-popover {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 6px; background: #ffffff;
          border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
          z-index: 100; padding: 10px; display: flex; flex-direction: column; gap: 8px;
        }
        .popover-actions { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
        .popover-action-btn { background: transparent; border: none; color: #7c3aed; font-size: 11px; font-weight: 700; cursor: pointer; }
        .popover-search { width: 100%; padding: 6px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 11px; outline: none; }
        .popover-list { max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
        .popover-item { display: flex; align-items: center; gap: 8px; padding: 5px 6px; font-size: 11.5px; color: #334155; cursor: pointer; border-radius: 4px; }
        .popover-item:hover { background: #f8fafc; }

        .curves-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 8px; position: relative; z-index: 2; }
        .curve-kpi-card {
          background: rgba(255, 255, 255, 0.95); border-radius: 12px; padding: 18px 22px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); border: 1px solid rgba(255, 255, 255, 1);
          border-top: 4px solid var(--cor-tema); display: flex; flex-direction: column; gap: 12px;
        }
        .curve-card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
        .curve-title { font-size: 16px; font-weight: 900; color: #0f172a; letter-spacing: 0.3px; }
        .curve-badge { font-size: 10px; font-weight: 800; background: #f1f5f9; color: #64748b; padding: 2px 8px; border-radius: 12px; text-transform: uppercase; }
        .curve-body { display: flex; flex-direction: column; gap: 10px; }
        .curve-metric-row { display: flex; justify-content: space-between; align-items: baseline; }
        .icon-label { font-size: 12px; font-weight: 700; color: #475569; }
        .metric-val { font-size: 14px; font-weight: 700; color: #0f172a; }
        .metric-val.big { font-size: 22px; font-weight: 900; }
        .curve-repr-row { display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border-radius: 8px; padding: 8px 12px; border: 1px solid #edf2f7; margin-top: 2px; }
        .repr-text-group { display: flex; flex-direction: column; }
        .repr-label { font-size: 10.5px; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .repr-num { font-size: 20px; font-weight: 900; color: #0f172a; }
        .donut-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
        .donut-center-pct { position: absolute; font-size: 9px; font-weight: 900; color: #0f172a; }
        .footnote { font-size: 11px; font-weight: 600; color: #475569; font-style: italic; margin-bottom: 20px; position: relative; z-index: 2; }

        .table-section {
          background: rgba(255, 255, 255, 0.95); padding: 20px 24px; border-radius: 12px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); border: 1px solid rgba(255, 255, 255, 1);
          position: relative; z-index: 2;
        }
        .table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
        .table-title { font-size: 16px; font-weight: 900; color: #0f172a; letter-spacing: 0.5px; text-transform: uppercase; margin: 0; }
        .tabs-group { display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 3px; border: 1px solid #cbd5e1; gap: 4px; }
        .tab-btn { background: transparent; border: none; padding: 6px 14px; font-size: 11px; font-weight: 700; color: #64748b; border-radius: 6px; cursor: pointer; text-transform: uppercase; }
        .tab-btn.active { background: #002b49; color: #ffffff; }
        .table-responsive { overflow-x: auto; max-height: 560px; overflow-y: auto; border-radius: 6px; }
        table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
        th { background-color: #002b49; color: white; text-align: center; padding: 9px 8px; font-weight: 700; border: 1px solid #cbd5e1; position: sticky; top: 0; z-index: 2; }
        tr.super-header th { font-size: 12px; font-weight: 900; padding: 8px 10px; }
        tr.super-header th.group-mes { background-color: #003865; border-left: 2px solid #38bdf8; border-right: 2px solid #38bdf8; }
        tr.super-header th.group-ytd { background-color: #1e1b4b; border-left: 2px solid #a855f7; border-right: 2px solid #a855f7; }
        tr.sub-header th { font-size: 10.5px; padding: 8px 6px; top: 35px; }
        th.col-dim { text-align: left; padding-left: 12px; }
        td { padding: 8px 8px; border: 1px solid #e2e8f0; text-align: right; color: #334155; white-space: nowrap; }
        td.col-dim-val { text-align: left; padding-left: 12px; font-weight: 700; color: #0f172a; }
        .row-data { background-color: #ffffff; transition: background-color 0.2s; }
        .row-data:hover { background-color: #f8fafc; }
        .badge-curva { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 4px; font-size: 11px; font-weight: 900; color: #ffffff; }
        .badge-curva.curva-A { background: #a855f7; }
        .badge-curva.curva-B { background: #ec4899; }
        .badge-curva.curva-C { background: #f43f5e; }
        .row-total td { background-color: #002b49; color: #ffffff !important; font-weight: 900; border-color: #002b49; position: sticky; bottom: 0; z-index: 2; }
        .row-total td.col-dim-val { color: #ffffff !important; }
      </style>

      <div class="dash-container">
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area"><h1>CURVA ABC DAS OFERTAS</h1></div>
        </div>

        <div class="filter-bar">
          <div class="filter-dropdown-container">
            <label class="filter-label">ANO REFERÊNCIA</label>
            <select class="filter-select-input" .value="${this.filtroAno}" @change="${(e) => { this.filtroAno = e.target.value; this.carregarDados(); }}">
              ${OPCOES_ANO.map(o => html`<option value="${o.value}" ?selected="${o.value === this.filtroAno}">${o.label}</option>`)}
            </select>
          </div>
          <div class="filter-dropdown-container">
            <label class="filter-label">MÊS REFERÊNCIA</label>
            <select class="filter-select-input" .value="${this.filtroMes}" @change="${(e) => { this.filtroMes = e.target.value; this.carregarDados(); }}">
              ${OPCOES_MES.map(o => html`<option value="${o.value}" ?selected="${o.value === this.filtroMes}">${o.label}</option>`)}
            </select>
          </div>
          ${this.renderDropdownFiltro('TIPO RECEITA', 'filtroTpReceita', 'Todas as receitas', OPCOES_TP_RECEITA)}
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', OPCOES_TP_UNIDADE)}
        </div>

        <div class="curves-grid">
          ${this.renderCardCurva(curvaA, '#a855f7')}
          ${this.renderCardCurva(curvaB, '#ec4899')}
          ${this.renderCardCurva(curvaC, '#f43f5e')}
        </div>

        <div class="footnote">*A curva se baseia na Produção YTD para ser classificada.</div>

        <div class="table-section">
          <div class="table-toolbar">
            <h2 class="table-title">Detalhamento das Ofertas</h2>
            <div class="tabs-group">
              <button class="tab-btn ${this.filtroCurva === 'TODAS' ? 'active' : ''}" @click="${() => { this.filtroCurva = 'TODAS'; this.requestUpdate(); }}">Todas (${this.dadosOfertas.length})</button>
              <button class="tab-btn ${this.filtroCurva === 'A' ? 'active' : ''}" @click="${() => { this.filtroCurva = 'A'; this.requestUpdate(); }}">Curva A (${contagemA})</button>
              <button class="tab-btn ${this.filtroCurva === 'B' ? 'active' : ''}" @click="${() => { this.filtroCurva = 'B'; this.requestUpdate(); }}">Curva B (${contagemB})</button>
              <button class="tab-btn ${this.filtroCurva === 'C' ? 'active' : ''}" @click="${() => { this.filtroCurva = 'C'; this.requestUpdate(); }}">Curva C (${contagemC})</button>
            </div>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr class="super-header">
                  <th rowspan="2" style="width: 50px;">CURVA</th>
                  <th rowspan="2" class="col-dim">OFERTA CURVA ABC</th>
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
                ${listaFiltrada.map(r => html`
                  <tr class="row-data">
                    <td style="text-align: center;"><span class="badge-curva curva-${r.curva}">${r.curva}</span></td>
                    <td class="col-dim-val">${r.nome}</td>
                    <td>${this.formatInt(r.mesProdNum)}</td>
                    <td>${this.formatInt(r.mesQtdNum)}</td>
                    <td>${this.formatInt(r.mesTmNum)}</td>
                    <td>${this.formatInt(r.ytdProdNum)}</td>
                    <td>${this.formatInt(r.ytdQtdNum)}</td>
                    <td>${this.formatInt(r.ytdTmNum)}</td>
                    <td>${this.renderYoY(this.formatPercent(r.yoyProdVal))}</td>
                    <td>${this.renderYoY(this.formatPercent(r.yoyQtdVal))}</td>
                    <td>${this.renderYoY(this.formatPercent(r.yoyTmVal))}</td>
                    <td><strong>${this.formatPercent(r.repVal)}</strong></td>
                  </tr>
                `)}
                ${this.totalGeral ? html`
                  <tr class="row-total">
                    <td></td>
                    <td class="col-dim-val">${this.totalGeral.nome}</td>
                    <td>${this.totalGeral.mesProd}</td>
                    <td>${this.totalGeral.mesQtd}</td>
                    <td>${this.totalGeral.mesTm}</td>
                    <td>${this.totalGeral.ytdProd}</td>
                    <td>${this.totalGeral.ytdQtd}</td>
                    <td>${this.totalGeral.ytdTm}</td>
                    <td>${this.renderTotalYoY(this.totalGeral.yoyProd)}</td>
                    <td>${this.renderTotalYoY(this.totalGeral.yoyQtd)}</td>
                    <td>${this.renderTotalYoY(this.totalGeral.yoyTm)}</td>
                    <td>${this.totalGeral.rep}</td>
                  </tr>
                ` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(elementName, CurvaAbcOfertas);
