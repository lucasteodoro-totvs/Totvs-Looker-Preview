/**
 * @title Curva ABC das Ofertas
 * @description Classificação Pareto das Ofertas TOTVS (Classificação 1 - NM_CURVA_ABC) com cards executivos
 *              e matriz analítica Histórica completa (2024, 2025, 2025 YTD e 2026 YTD).
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'curva-abc-ofertas';

// Opções dos Filtros
const OPCOES_ANO = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' }
];

const OPCOES_MES = [
  { value: '1', label: '01 - Janeiro', curto: 'JAN' },
  { value: '2', label: '02 - Fevereiro', curto: 'FEV' },
  { value: '3', label: '03 - Março', curto: 'MAR' },
  { value: '4', label: '04 - Abril', curto: 'ABR' },
  { value: '5', label: '05 - Maio', curto: 'MAI' },
  { value: '6', label: '06 - Junho', curto: 'JUN' },
  { value: '7', label: '07 - Julho', curto: 'JUL' },
  { value: '8', label: '08 - Agosto', curto: 'AGO' },
  { value: '9', label: '09 - Setembro', curto: 'SET' },
  { value: '10', label: '10 - Outubro', curto: 'OUT' },
  { value: '11', label: '11 - Novembro', curto: 'NOV' },
  { value: '12', label: '12 - Dezembro', curto: 'DEZ' }
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

// Dados Mockados Realistas para a Curva ABC (Classificação 1)
const MOCK_OFERTAS_CURVA = [
  { nome: 'CLOUD + CLOUD INTERA', baseProd: 3850000, baseQtd: 125, baseTm: 30800, yoyFactor: 1.15, isRecorrente: true },
  { nome: 'INTERA BACKOFFICE', baseProd: 2950000, baseQtd: 140, baseTm: 21071, yoyFactor: -1.08, isRecorrente: true },
  { nome: 'RH (CORE + PARC)', baseProd: 2100000, baseQtd: 95, baseTm: 22105, yoyFactor: 1.22, isRecorrente: true },
  { nome: 'CORE SEGMENTOS', baseProd: 1850000, baseQtd: 180, baseTm: 10277, yoyFactor: -1.05, isRecorrente: true },
  { nome: 'FULL TOTVS', baseProd: 4200000, baseQtd: 210, baseTm: 20000, yoyFactor: 1.12, isRecorrente: false },
  { nome: 'SOFT COMPL BY PROGRESS', baseProd: 1550000, baseQtd: 65, baseTm: 23846, yoyFactor: -1.18, isRecorrente: false },
  { nome: 'AHGORA', baseProd: 1450000, baseQtd: 110, baseTm: 13181, yoyFactor: 1.35, isRecorrente: true },
  { nome: 'RD STATION', baseProd: 1100000, baseQtd: 45, baseTm: 24444, yoyFactor: 1.45, isRecorrente: true },
  { nome: 'FLUIG (CORE + PARC)', baseProd: 950000, baseQtd: 35, baseTm: 27142, yoyFactor: -1.15, isRecorrente: true },
  { nome: 'WINTHOR DISTRIBUIDOR', baseProd: 1250000, baseQtd: 85, baseTm: 14705, yoyFactor: -1.25, isRecorrente: false },
  { nome: 'CROSS - INTERA', baseProd: 750000, baseQtd: 155, baseTm: 4838, yoyFactor: 1.18, isRecorrente: true },
  { nome: 'FEEDZ', baseProd: 520000, baseQtd: 25, baseTm: 20800, yoyFactor: 1.28, isRecorrente: true },
  { nome: 'SOLUCOES FISCAIS', baseProd: 480000, baseQtd: 15, baseTm: 32000, yoyFactor: 1.55, isRecorrente: true },
  { nome: 'GESPLAN', baseProd: 320000, baseQtd: 8, baseTm: 40000, yoyFactor: -1.12, isRecorrente: true },
  { nome: 'TAE', baseProd: 280000, baseQtd: 42, baseTm: 6666, yoyFactor: 1.15, isRecorrente: true },
  { nome: 'GOODDATA', baseProd: 190000, baseQtd: 38, baseTm: 5000, yoyFactor: -1.45, isRecorrente: true },
  { nome: 'TECHFIN', baseProd: 145000, baseQtd: 12, baseTm: 12083, yoyFactor: 2.15, isRecorrente: true },
  { nome: 'TECNOLOGIA', baseProd: 110000, baseQtd: 5, baseTm: 22000, yoyFactor: -1.65, isRecorrente: true },
  { nome: 'BO APPS', baseProd: 85000, baseQtd: 18, baseTm: 4722, yoyFactor: 1.25, isRecorrente: true },
  { nome: 'LINX EQUALS', baseProd: 45000, baseQtd: 3, baseTm: 15000, yoyFactor: 1.85, isRecorrente: true }
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
    resumoCurvas: { type: Object }
  };

  constructor() {
    super();
    this.filtroCurva = 'TODAS';
    this.carregando = true;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.dadosOfertas = [];
    
    this.filtroAno = '2026';
    this.filtroMes = '11';
    this.filtroTpReceita = [];
    this.filtroSegmento = [];
    this.filtroTpUnidade = [];

    this.resumoCurvas = {
      geral: { titulo: 'RECEITA TOTAL', valor: '0,0', sub: 'PRODUÇÃO TOTAL DAS OFERTAS', periodo: 'PERÍODO ACUMULADO' },
      ytdAtual: { titulo: 'PRODUÇÃO YTD', valor: '0,0', sub: 'PRODUÇÃO YTD DAS OFERTAS', periodo: 'PERÍODO ACUMULADO' },
      crescYtd: { titulo: 'CRESCIMENTO YTD', valor: '0%', sub: 'CRESC. YTD PRODUÇÃO DAS OFERTAS', periodo: 'PERÍODO ACUMULADO' }
    };
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
     GERAÇÃO DE DADOS MOCKADOS E PARETO
     ========================================== */
  async carregarDados() {
    this.carregando = true;
    this.erro = null;
    this.requestUpdate();

    await new Promise(resolve => setTimeout(resolve, 150));

    let fator = 1.0;
    if (this.filtroSegmento.length > 0) fator *= Math.max(0.15, this.filtroSegmento.length * 0.12);
    if (this.filtroTpUnidade.length > 0) fator *= Math.max(0.20, this.filtroTpUnidade.length * 0.18);
    
    let baseList = MOCK_OFERTAS_CURVA;
    
    // Filtro agressivo para Receita (CDU vs Recorrente)
    if (this.filtroTpReceita.length > 0) {
      const isCduFilter = this.filtroTpReceita.includes('CDU');
      const isRecFilter = this.filtroTpReceita.some(r => ['SAAS', 'SMS', 'SERVICOS RECORRENTES'].includes(r));
      
      if (isCduFilter && !isRecFilter) {
        baseList = MOCK_OFERTAS_CURVA.filter(o => !o.isRecorrente);
      } else if (!isCduFilter && isRecFilter) {
        baseList = MOCK_OFERTAS_CURVA.filter(o => o.isRecorrente);
      } else {
        fator *= 0.65; // Mistura mas reduz um pouco
      }
    }

    // Calcula os 4 frames temporais (2024, 2025, 2025YTD, 2026YTD) com base no yoyFactor da oferta
    const mesLimit = parseInt(this.filtroMes, 10);
    const ytdFactor = mesLimit / 12.0;

    let lista = baseList.map(of => {
      const isPos = of.yoyFactor > 0;
      const factor25 = isPos ? of.yoyFactor : 1 / Math.abs(of.yoyFactor);
      const factor26 = isPos ? (of.yoyFactor * 1.08) : 1 / (Math.abs(of.yoyFactor) * 1.05);

      const prod24 = Math.round(of.baseProd * fator);
      const prod25 = Math.round(prod24 * factor25);
      const prod25Ytd = Math.round(prod25 * ytdFactor);
      const prod26Ytd = Math.round(prod25Ytd * factor26);

      const qtd24 = Math.round(of.baseQtd * fator);
      const qtd25 = Math.max(1, Math.round(qtd24 * factor25));
      const qtd25Ytd = Math.max(1, Math.round(qtd25 * ytdFactor));
      const qtd26Ytd = Math.max(1, Math.round(qtd25Ytd * factor26));

      return {
        nome: of.nome,
        ret: { prod: prod24, qtd: qtd24, tm: qtd24 > 0 ? prod24 / qtd24 : 0 },
        antFull: { prod: prod25, qtd: qtd25, tm: qtd25 > 0 ? prod25 / qtd25 : 0 },
        antYtd: { prod: prod25Ytd, qtd: qtd25Ytd, tm: qtd25Ytd > 0 ? prod25Ytd / qtd25Ytd : 0 },
        atualYtd: { prod: prod26Ytd, qtd: qtd26Ytd, tm: qtd26Ytd > 0 ? prod26Ytd / qtd26Ytd : 0 }
      };
    });

    // Ordena pelo YTD Atual do maior para o menor para aplicar a regra de Pareto
    lista.sort((a, b) => b.atualYtd.prod - a.atualYtd.prod);
    
    const totalProdPositiva = lista.reduce((acc, curr) => acc + (curr.atualYtd.prod > 0 ? curr.atualYtd.prod : 0), 0);
    
    let accProd = 0;
    lista = lista.map(item => {
      if (item.atualYtd.prod > 0) {
        accProd += item.atualYtd.prod;
      }
      
      const accPct = totalProdPositiva > 0 ? (accProd / totalProdPositiva) * 100 : 0;

      let curva = 'C';
      if (item.atualYtd.prod <= 0) curva = 'C';
      else if (accPct <= 70.0) curva = 'A';
      else if (accPct <= 90.0) curva = 'B';
      else curva = 'C';

      const yoy25Prod = this.calcularVariacaoPct(item.antFull.prod, item.ret.prod);
      const yoy25Qtd = this.calcularVariacaoPct(item.antFull.qtd, item.ret.qtd);
      const yoy25Tm = this.calcularVariacaoPct(item.antFull.tm, item.ret.tm);

      const yoy26Prod = this.calcularVariacaoPct(item.atualYtd.prod, item.antYtd.prod);
      const yoy26Qtd = this.calcularVariacaoPct(item.atualYtd.qtd, item.antYtd.qtd);
      const yoy26Tm = this.calcularVariacaoPct(item.atualYtd.tm, item.antYtd.tm);

      return {
        ...item,
        curva,
        yoy25Prod, yoy25Qtd, yoy25Tm,
        yoy26Prod, yoy26Qtd, yoy26Tm
      };
    });

    this.dadosOfertas = lista;

    const totaisGlobais = this.calcularSubtotais(lista);
    const anoRefNum = parseInt(this.filtroAno, 10);
    const anoRetStr = String(anoRefNum - 2);
    const mesObj = OPCOES_MES.find(m => m.value === this.filtroMes);
    const mesCurto = mesObj ? mesObj.curto : 'NOV';
    const anoCurto = String(this.filtroAno).slice(-2);

    const receitaLabelCard = this.filtroTpReceita.length === 1 ? this.filtroTpReceita[0] : 'RECEITA TOTAL';
    const escopoTexto = this.filtroTpReceita.length === 1 ? `DE ${this.filtroTpReceita[0]}` : 'DAS OFERTAS';

    this.resumoCurvas = {
      geral: {
        titulo: receitaLabelCard,
        valor: this.formatCompactCurrency(totaisGlobais.ret.prod + totaisGlobais.antFull.prod + totaisGlobais.atualYtd.prod),
        sub: `PRODUÇÃO TOTAL ${escopoTexto}`,
        periodo: `PERÍODO ACUMULADO JAN/${anoRetStr.slice(-2)} A ${mesCurto}/${anoCurto}`
      },
      ytdAtual: {
        titulo: `${this.filtroTpReceita.length === 1 ? this.filtroTpReceita[0] + ' ' : 'PRODUÇÃO '}${this.filtroAno}`,
        valor: this.formatCompactCurrency(totaisGlobais.atualYtd.prod),
        sub: `PRODUÇÃO YTD ${escopoTexto}`,
        periodo: `PERÍODO ACUMULADO JAN/${anoCurto} A ${mesCurto}/${anoCurto}`
      },
      crescYtd: {
        titulo: `Crescimento ${this.filtroAno} YTD`,
        valor: this.formatPercent(totaisGlobais.yoy26Prod),
        sub: `CRESC. YTD PRODUÇÃO ${escopoTexto}`,
        periodo: `PERÍODO ACUMULADO JAN/${anoCurto} A ${mesCurto}/${anoCurto}`
      }
    };

    this.carregando = false;
    this.requestUpdate();
  }

  calcularVariacaoPct(atual, anterior) {
    if (anterior === 0 && atual > 0) return 100;
    if (anterior === 0 && atual === 0) return 0;
    return ((atual - anterior) / Math.abs(anterior)) * 100;
  }

  calcularSubtotais(listaItens) {
    let retProd = 0, retQtd = 0;
    let antFullProd = 0, antFullQtd = 0;
    let antYtdProd = 0, antYtdQtd = 0;
    let atualYtdProd = 0, atualYtdQtd = 0;

    listaItens.forEach(i => {
      retProd += i.ret.prod;
      retQtd += i.ret.qtd;
      antFullProd += i.antFull.prod;
      antFullQtd += i.antFull.qtd;
      antYtdProd += i.antYtd.prod;
      antYtdQtd += i.antYtd.qtd;
      atualYtdProd += i.atualYtd.prod;
      atualYtdQtd += i.atualYtd.qtd;
    });

    const retTm = retQtd > 0 ? retProd / retQtd : 0;
    const antFullTm = antFullQtd > 0 ? antFullProd / antFullQtd : 0;
    const antYtdTm = antYtdQtd > 0 ? antYtdProd / antYtdQtd : 0;
    const atualYtdTm = atualYtdQtd > 0 ? atualYtdProd / atualYtdQtd : 0;

    return {
      ret: { prod: retProd, qtd: retQtd, tm: retTm },
      antFull: { prod: antFullProd, qtd: antFullQtd, tm: antFullTm },
      antYtd: { prod: antYtdProd, qtd: antYtdQtd, tm: antYtdTm },
      atualYtd: { prod: atualYtdProd, qtd: atualYtdQtd, tm: atualYtdTm },
      yoy25Prod: this.calcularVariacaoPct(antFullProd, retProd),
      yoy25Qtd: this.calcularVariacaoPct(antFullQtd, retQtd),
      yoy25Tm: this.calcularVariacaoPct(antFullTm, retTm),
      yoy26Prod: this.calcularVariacaoPct(atualYtdProd, antYtdProd),
      yoy26Qtd: this.calcularVariacaoPct(atualYtdQtd, antYtdQtd),
      yoy26Tm: this.calcularVariacaoPct(atualYtdTm, antYtdTm)
    };
  }

  formatIntCurrency(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '-';
    return Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatCompactCurrency(val) {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '0,0';
    const num = Number(val);
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'M';
    }
    if (Math.abs(num) >= 1000) {
      return (num / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mil';
    }
    return Math.round(num).toLocaleString('pt-BR');
  }

  formatPercent(val) {
    if (val === null || val === undefined || val === '' || val === '-' || isNaN(val)) return '-';
    return Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + '%';
  }

  renderYoY(valNum) {
    if (valNum === null || valNum === undefined || isNaN(valNum) || valNum === 0) {
      return html`<span style="color: #94a3b8; font-weight: 700;">-</span>`;
    }
    const isNeg = valNum < 0;
    const valFmt = Math.round(Math.abs(valNum)).toLocaleString('pt-BR') + '%';
    
    return html`
      <span class="yoy-cell-val ${isNeg ? 'yoy-neg' : 'yoy-pos'}">
        <span class="yoy-arrow">${isNeg ? '↓' : '↑'}</span>
        <span>${valFmt}</span>
      </span>
    `;
  }

  renderTotalYoY(valNum) {
    if (valNum === null || valNum === undefined || isNaN(valNum) || valNum === 0) {
      return html`<span style="color: rgba(255,255,255,0.7); font-weight: 700;">-</span>`;
    }
    const isNeg = valNum < 0;
    const valFmt = Math.round(Math.abs(valNum)).toLocaleString('pt-BR') + '%';

    return html`
      <span class="total-yoy-pill ${isNeg ? 'pill-neg' : 'pill-pos'}">
        <span>${isNeg ? '↓' : '↑'}</span>
        <span>${valFmt}</span>
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

  renderIconSacoDinheiro(corFundo) {
    return html`
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12C24 9.79086 25.7909 8 28 8H36C38.2091 8 40 9.79086 40 12L37 18H27L24 12Z" fill="${corFundo}"/>
        <rect x="25" y="17" width="14" height="3.5" rx="1.75" fill="${corFundo}"/>
        <path d="M26 21C18 24 13 33 13 43C13 51.5 19.5 56 32 56C44.5 56 51 51.5 51 43C51 33 46 24 38 21H26Z" fill="${corFundo}"/>
        <text x="32" y="46" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">$</text>
      </svg>
    `;
  }

  renderIconCrescimento() {
    return html`
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="42" width="7" height="12" rx="1.5" fill="#0f172a"/>
        <rect x="23" y="35" width="7" height="19" rx="1.5" fill="#0f172a"/>
        <rect x="34" y="27" width="7" height="27" rx="1.5" fill="#0f172a"/>
        <rect x="45" y="19" width="7" height="35" rx="1.5" fill="#0f172a"/>
        <path d="M13 32C23 30 35 23 47 11" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <path d="M38 10H48V20" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  render() {
    const listaFiltrada = this.filtroCurva === 'TODAS'
      ? this.dadosOfertas
      : this.dadosOfertas.filter(item => item.curva === this.filtroCurva);

    const subtotaisExibidos = this.calcularSubtotais(listaFiltrada);

    const contagemA = this.dadosOfertas.filter(i => i.curva === 'A').length;
    const contagemB = this.dadosOfertas.filter(i => i.curva === 'B').length;
    const contagemC = this.dadosOfertas.filter(i => i.curva === 'C').length;

    const anoRef = parseInt(this.filtroAno, 10);
    const anoAtualStr = String(anoRef);
    const anoAntStr = String(anoRef - 1);
    const anoRetStr = String(anoRef - 2);

    const subtituloPagina = this.filtroTpReceita.length === 1
      ? `Produção ${this.filtroTpReceita[0]} de Ofertas`
      : 'Produção Geral de Ofertas';

    const tituloMatriz = this.filtroTpReceita.length === 1
      ? `MATRIZ DE RECEITA (${this.filtroTpReceita[0]})`
      : 'MATRIZ DE OFERTAS (CURVA ABC)';

    const labelTotalLinha = this.filtroCurva === 'TODAS'
      ? 'TOTAL'
      : `SUBTOTAL CURVA ${this.filtroCurva}`;

    return html`
      <style>
        * { box-sizing: border-box; }

        .dash-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          min-height: 100vh;
          color: #0f172a;
          padding: 20px 28px 48px 28px;
          display: flex;
          flex-direction: column;
        }

        .page-top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .page-title-block h1 {
          font-size: 28px;
          font-weight: 800;
          color: #042f49;
          margin: 0 0 2px 0;
          letter-spacing: -0.5px;
        }

        .page-title-block p {
          font-size: 15px;
          font-weight: 500;
          color: #0f172a;
          margin: 0;
        }

        .filter-bar {
          background: #ffffff;
          border-radius: 12px;
          padding: 12px 18px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: flex-end;
          border: 1px solid #e2e8f0;
          position: relative;
          z-index: 30;
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
          font-size: 10.5px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .filter-select-input {
          width: 100%;
          padding: 7px 12px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          outline: none;
          cursor: pointer;
          height: 34px;
        }

        .filter-select-input:hover { border-color: #a855f7; }
        
        .filter-trigger-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 12px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 12px;
          color: #0f172a;
          cursor: pointer;
          outline: none;
          font-weight: 700;
          height: 34px;
        }

        .filter-trigger-btn:hover, .filter-trigger-btn.active { border-color: #a855f7; }
        .filter-trigger-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .filter-menu-popover { position: absolute; top: 100%; left: 0; right: 0; margin-top: 6px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2); z-index: 100; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
        .popover-actions { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
        .popover-action-btn { background: transparent; border: none; color: #9333ea; font-size: 11px; font-weight: 700; cursor: pointer; padding: 2px 4px; }
        .popover-action-btn:hover { text-decoration: underline; }
        .popover-search { width: 100%; padding: 6px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 11px; outline: none; }
        .popover-list { max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
        .popover-item { display: flex; align-items: center; gap: 8px; padding: 5px 6px; font-size: 11.5px; color: #334155; cursor: pointer; border-radius: 4px; }
        .popover-item:hover { background: #f8fafc; }

        /* 3 CARDS SUPERIORES EXATOS DA IMAGEM */
        .curves-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-bottom: 22px;
        }

        .exec-kpi-card {
          background: #ffffff;
          border-radius: 22px;
          padding: 20px 26px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .exec-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
        }

        .exec-icon-col {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exec-text-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .exec-card-title {
          font-size: 17px;
          font-weight: 800;
          color: #a855f7;
          letter-spacing: 0.2px;
          margin-bottom: 2px;
        }

        .exec-card-val {
          font-size: 46px;
          font-weight: 900;
          color: #000000;
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin: 2px 0 6px 0;
        }

        .exec-card-sub {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 4px;
        }

        .exec-card-period {
          font-size: 10.5px;
          font-weight: 800;
          color: #0a2540;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* TÍTULO CENTRALIZADO E BARRA AZUL MARINHO ESCURA */
        .matrix-section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
        }

        .matrix-main-title {
          font-size: 20px;
          font-weight: 900;
          color: #0a2540;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 8px 0;
        }

        .navy-divider-bar {
          width: 100%;
          height: 12px;
          background-color: #0a2540;
          border-radius: 6px;
        }

        /* CONTAINER DA MATRIZ */
        .table-section {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .table-hint {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          font-style: italic;
        }

        .tabs-group {
          display: inline-flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 3px;
          border: 1px solid #cbd5e1;
          gap: 3px;
        }

        .tab-btn {
          background: transparent;
          border: none;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .tab-btn.active {
          background: #0a2540;
          color: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }

        /* SCROLL CONTAINER COM STICKY HEADER 100% OPACO */
        .table-responsive {
          overflow-x: auto;
          max-height: 620px;
          overflow-y: auto;
          position: relative;
          background: #ffffff;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 11.5px;
        }

        thead {
          position: sticky;
          top: 0;
          z-index: 20;
          background-color: #ffffff;
        }

        /* LINHA 1 DO CABEÇALHO (MEGA-HEADER DOS ANOS) - TOTALMENTE OPACA */
        tr.mega-header th {
          background-color: #ffffff !important;
          height: 48px;
          padding: 6px 4px;
          vertical-align: middle;
          border-bottom: 4px solid #ffffff;
          position: sticky;
          top: 0;
          z-index: 21;
        }

        .year-pill-box {
          border: 1.5px solid #a855f7;
          border-radius: 4px;
          background-color: #ffffff;
          color: #000000;
          font-size: 20px;
          font-weight: 900;
          padding: 3px 8px;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          box-shadow: 0 1px 3px rgba(168, 85, 247, 0.12);
        }

        .year-pill-box span.ytd-tag {
          font-size: 12px;
          font-weight: 800;
          color: #334155;
        }

        /* LINHA 2 DO CABEÇALHO (COLUNAS AZUL MARINHO) */
        tr.super-header th {
          font-size: 10px;
          font-weight: 800;
          padding: 8px 6px;
          background-color: #163a5f;
          color: #ffffff;
          position: sticky;
          top: 48px;
          z-index: 20;
          border-right: 1px solid #2b547e;
          border-bottom: 1px solid #0a2540;
          text-transform: uppercase;
          line-height: 1.2;
        }

        tr.super-header th.col-tier {
          background-color: #475569;
          width: 48px;
          text-align: center;
        }

        tr.super-header th.col-dim {
          background-color: #334155;
          text-align: left;
          padding-left: 14px;
          min-width: 210px;
        }

        tr.super-header th.sep-left {
          border-left: 3px solid #ffffff;
        }

        /* CÉLULAS DE DADOS */
        td {
          padding: 6px 8px;
          border-bottom: 1px solid #e2e8f0;
          border-right: 1px solid #f1f5f9;
          text-align: right;
          color: #1e293b;
          white-space: nowrap;
          background-color: #ffffff;
        }

        td.sep-left {
          border-left: 3px solid #e2e8f0;
        }

        td.col-dim-val {
          text-align: left;
          padding-left: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .row-data:hover td {
          background-color: #f8fafc;
        }

        .badge-curva {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 22px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 900;
          color: #ffffff;
        }

        .badge-curva.curva-A { background-color: #a855f7; }
        .badge-curva.curva-B { background-color: #d946ef; }
        .badge-curva.curva-C { background-color: #a8a29e; }

        /* YOY FORMATADO COM SETA À ESQUERDA E VALOR À DIREITA */
        .yoy-cell-val {
          font-weight: 800;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-width: 48px;
          gap: 4px;
        }
        .yoy-pos { color: #16a34a; }
        .yoy-neg { color: #dc2626; }
        .yoy-arrow { font-size: 11px; font-weight: 900; }

        /* LINHA DE SUBTOTAL / TOTAL FIXA NO RODAPÉ */
        tr.row-total td {
          background-color: #a855f7 !important;
          color: #ffffff !important;
          font-weight: 900;
          font-size: 13px;
          padding: 10px 8px;
          position: sticky;
          bottom: 0;
          z-index: 20;
          border-top: 2px solid #7e22ce;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        tr.row-total td.sep-left {
          border-left: 3px solid #ffffff;
        }

        .total-yoy-pill {
          background-color: #ffffff;
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 11.5px;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.18);
        }
        .total-yoy-pill.pill-pos { color: #15803d; }
        .total-yoy-pill.pill-neg { color: #dc2626; }

        .state-feedback {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-weight: 700;
          font-size: 14px;
        }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO LIMPO IDÊNTICO AO PRINT EXECUTIVO -->
        <div class="page-top-header">
          <div class="page-title-block">
            <h1>Performance de Produto / Curva ABC</h1>
            <p>${subtituloPagina}</p>
          </div>
        </div>

        <!-- BARRA DE FILTROS -->
        <div class="filter-bar">
          <div class="filter-dropdown-container">
            <label class="filter-label">ANO REFERÊNCIA</label>
            <select class="filter-select-input" @change="${(e) => { this.filtroAno = e.target.value; this.carregarDados(); }}">
              ${OPCOES_ANO.map(o => html`
                <option value="${o.value}" ?selected="${o.value === this.filtroAno}">${o.label}</option>
              `)}
            </select>
          </div>

          <div class="filter-dropdown-container">
            <label class="filter-label">MÊS YTD LIMITE</label>
            <select class="filter-select-input" @change="${(e) => { this.filtroMes = e.target.value; this.carregarDados(); }}">
              ${OPCOES_MES.map(o => html`
                <option value="${o.value}" ?selected="${o.value === this.filtroMes}">${o.label}</option>
              `)}
            </select>
          </div>

          ${this.renderDropdownFiltro('TIPO RECEITA', 'filtroTpReceita', 'Todas as receitas', OPCOES_TP_RECEITA)}
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', OPCOES_TP_UNIDADE)}
        </div>

        ${this.erro ? html`
          <div class="state-feedback" style="background: #fee2e2; color: #b91c1c; border-radius: 8px; margin-bottom: 16px;">
            ⚠️ ${this.erro}
          </div>
        ` : ''}

        <!-- 3 CARDS SUPERIORES COM ÍCONES VETORIAIS -->
        <div class="curves-grid">
          <!-- CARD 1: RECEITA TOTAL -->
          <div class="exec-kpi-card">
            <div class="exec-icon-col">
              ${this.renderIconSacoDinheiro('#0a2540')}
            </div>
            <div class="exec-text-col">
              <div class="exec-card-title">${this.resumoCurvas.geral.titulo}</div>
              <div class="exec-card-val">${this.resumoCurvas.geral.valor}</div>
              <div class="exec-card-sub">${this.resumoCurvas.geral.sub}</div>
              <div class="exec-card-period">${this.resumoCurvas.geral.periodo}</div>
            </div>
          </div>
          
          <!-- CARD 2: PRODUÇÃO YTD ATUAL -->
          <div class="exec-kpi-card">
            <div class="exec-icon-col">
              ${this.renderIconSacoDinheiro('#cbd5e1')}
            </div>
            <div class="exec-text-col">
              <div class="exec-card-title">${this.resumoCurvas.ytdAtual.titulo}</div>
              <div class="exec-card-val">${this.resumoCurvas.ytdAtual.valor}</div>
              <div class="exec-card-sub">${this.resumoCurvas.ytdAtual.sub}</div>
              <div class="exec-card-period">${this.resumoCurvas.ytdAtual.periodo}</div>
            </div>
          </div>

          <!-- CARD 3: CRESCIMENTO YTD -->
          <div class="exec-kpi-card">
            <div class="exec-icon-col">
              ${this.renderIconCrescimento()}
            </div>
            <div class="exec-text-col">
              <div class="exec-card-title">${this.resumoCurvas.crescYtd.titulo}</div>
              <div class="exec-card-val">${this.resumoCurvas.crescYtd.valor}</div>
              <div class="exec-card-sub">${this.resumoCurvas.crescYtd.sub}</div>
              <div class="exec-card-period">${this.resumoCurvas.crescYtd.periodo}</div>
            </div>
          </div>
        </div>

        <!-- TÍTULO CENTRALIZADO + BARRA AZUL MARINHO -->
        <div class="matrix-section-header">
          <h2 class="matrix-main-title">${tituloMatriz}</h2>
          <div class="navy-divider-bar"></div>
        </div>

        <!-- TABELA MATRIZ COMPLETA (20 COLUNAS) -->
        <div class="table-section">
          <div class="table-toolbar">
            <span class="table-hint">*Classificação Pareto (A: até 70% | B: 70% a 90% | C: acima de 90%) baseada na Produção ${anoAtualStr} YTD.</span>
            <div class="tabs-group">
              <button class="tab-btn ${this.filtroCurva === 'TODAS' ? 'active' : ''}" @click="${() => this.filtroCurva = 'TODAS'}">
                Todas (${this.dadosOfertas.length})
              </button>
              <button class="tab-btn ${this.filtroCurva === 'A' ? 'active' : ''}" @click="${() => this.filtroCurva = 'A'}">
                Curva A (${contagemA})
              </button>
              <button class="tab-btn ${this.filtroCurva === 'B' ? 'active' : ''}" @click="${() => this.filtroCurva = 'B'}">
                Curva B (${contagemB})
              </button>
              <button class="tab-btn ${this.filtroCurva === 'C' ? 'active' : ''}" @click="${() => this.filtroCurva = 'C'}">
                Curva C (${contagemC})
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr class="mega-header">
                  <th colspan="2"></th>
                  <th colspan="3"><div class="year-pill-box">${anoRetStr}</div></th>
                  <th colspan="6"><div class="year-pill-box">${anoAntStr}</div></th>
                  <th colspan="3"><div class="year-pill-box">${anoAntStr} <span class="ytd-tag">YTD</span></div></th>
                  <th colspan="6"><div class="year-pill-box">${anoAtualStr} <span class="ytd-tag">YTD</span></div></th>
                </tr>
                <tr class="super-header">
                  <th class="col-tier">TIER</th>
                  <th class="col-dim">OFERTA</th>
                  
                  <!-- 2024 (3 Colunas) -->
                  <th class="sep-left">VALOR<br>PRODUÇÃO</th>
                  <th>QTD<br>VENDA</th>
                  <th>TM</th>

                  <!-- 2025 (6 Colunas) -->
                  <th class="sep-left">VALOR<br>PRODUÇÃO</th>
                  <th>QTD<br>VENDA</th>
                  <th>TM</th>
                  <th>YOY (R$)<br><span style="font-size: 8px; opacity: 0.85;">${anoAntStr.slice(-2)} x ${anoRetStr.slice(-2)}</span></th>
                  <th>YOY (QTD)<br><span style="font-size: 8px; opacity: 0.85;">${anoAntStr.slice(-2)} x ${anoRetStr.slice(-2)}</span></th>
                  <th>YOY (TM)<br><span style="font-size: 8px; opacity: 0.85;">${anoAntStr.slice(-2)} x ${anoRetStr.slice(-2)}</span></th>

                  <!-- 2025 YTD (3 Colunas) -->
                  <th class="sep-left">VALOR<br>PRODUÇÃO</th>
                  <th>QTD<br>VENDA</th>
                  <th>TM</th>

                  <!-- 2026 YTD (6 Colunas) -->
                  <th class="sep-left">VALOR<br>PRODUÇÃO</th>
                  <th>QTD<br>VENDA</th>
                  <th>TM</th>
                  <th>YOY (R$)<br><span style="font-size: 8px; opacity: 0.85;">${anoAtualStr.slice(-2)} x ${anoAntStr.slice(-2)}</span></th>
                  <th>YOY (QTD)<br><span style="font-size: 8px; opacity: 0.85;">${anoAtualStr.slice(-2)} x ${anoAntStr.slice(-2)}</span></th>
                  <th>YOY (TM)<br><span style="font-size: 8px; opacity: 0.85;">${anoAtualStr.slice(-2)} x ${anoAntStr.slice(-2)}</span></th>
                </tr>
              </thead>
              <tbody>
                ${this.carregando ? html`
                  <tr>
                    <td colspan="20" class="state-feedback">Carregando e consolidando 4 safras temporais...</td>
                  </tr>
                ` : listaFiltrada.length === 0 ? html`
                  <tr>
                    <td colspan="20" class="state-feedback">Nenhum dado encontrado para os filtros selecionados.</td>
                  </tr>
                ` : html`
                  ${listaFiltrada.map(r => html`
                    <tr class="row-data">
                      <td style="text-align: center;">
                        <span class="badge-curva curva-${r.curva}">${r.curva}</span>
                      </td>
                      <td class="col-dim-val">${r.nome}</td>
                      
                      <!-- 2024 -->
                      <td class="sep-left">${this.formatIntCurrency(r.ret.prod)}</td>
                      <td>${this.formatIntCurrency(r.ret.qtd)}</td>
                      <td>${this.formatIntCurrency(r.ret.tm)}</td>

                      <!-- 2025 Full -->
                      <td class="sep-left">${this.formatIntCurrency(r.antFull.prod)}</td>
                      <td>${this.formatIntCurrency(r.antFull.qtd)}</td>
                      <td>${this.formatIntCurrency(r.antFull.tm)}</td>
                      <td>${this.renderYoY(r.yoy25Prod)}</td>
                      <td>${this.renderYoY(r.yoy25Qtd)}</td>
                      <td>${this.renderYoY(r.yoy25Tm)}</td>

                      <!-- 2025 YTD -->
                      <td class="sep-left">${this.formatIntCurrency(r.antYtd.prod)}</td>
                      <td>${this.formatIntCurrency(r.antYtd.qtd)}</td>
                      <td>${this.formatIntCurrency(r.antYtd.tm)}</td>

                      <!-- 2026 YTD -->
                      <td class="sep-left" style="font-weight: 800; color: #0f172a;">${this.formatIntCurrency(r.atualYtd.prod)}</td>
                      <td style="font-weight: 800; color: #0f172a;">${this.formatIntCurrency(r.atualYtd.qtd)}</td>
                      <td style="font-weight: 800; color: #0f172a;">${this.formatIntCurrency(r.atualYtd.tm)}</td>
                      <td>${this.renderYoY(r.yoy26Prod)}</td>
                      <td>${this.renderYoY(r.yoy26Qtd)}</td>
                      <td>${this.renderYoY(r.yoy26Tm)}</td>
                    </tr>
                  `)}
                  ${listaFiltrada.length > 0 ? html`
                    <tr class="row-total">
                      <td colspan="2" style="text-align: center; letter-spacing: 1.5px;">${labelTotalLinha}</td>
                      
                      <!-- 2024 Subtotal (Somente Valor Produção) -->
                      <td class="sep-left">${this.formatIntCurrency(subtotaisExibidos.ret.prod)}</td>
                      <td></td>
                      <td></td>

                      <!-- 2025 Full Subtotal (Valor Produção + YoY R$) -->
                      <td class="sep-left">${this.formatIntCurrency(subtotaisExibidos.antFull.prod)}</td>
                      <td></td>
                      <td></td>
                      <td>${this.renderTotalYoY(subtotaisExibidos.yoy25Prod)}</td>
                      <td></td>
                      <td></td>

                      <!-- 2025 YTD Subtotal (Somente Valor Produção) -->
                      <td class="sep-left">${this.formatIntCurrency(subtotaisExibidos.antYtd.prod)}</td>
                      <td></td>
                      <td></td>

                      <!-- 2026 YTD Subtotal (Valor Produção + YoY R$) -->
                      <td class="sep-left">${this.formatIntCurrency(subtotaisExibidos.atualYtd.prod)}</td>
                      <td></td>
                      <td></td>
                      <td>${this.renderTotalYoY(subtotaisExibidos.yoy26Prod)}</td>
                      <td></td>
                      <td></td>
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

customElements.define(elementName, CurvaAbcOfertas);
