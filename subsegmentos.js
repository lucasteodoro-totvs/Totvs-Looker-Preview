/**
 * @title Performance Subsegmentos (Versão Vercel Preview)
 * @description Visão Analítica de Subsegmentos com Cabeçalho Oficial e Tabela
 *              interativa mockada (com filtros e ordenação funcionando sem servidor Looker).
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'performance-subsegmentos';

// Opções dos Filtros Globais
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

const OPCOES_SUBSEGMENTO = [
  'AGROINDUSTRIA', 'ATACADISTA E DISTRIBUIDOR', 'BANCOS E FINANCEIRAS', 'BASICO',
  'BENS DE CAPITAL', 'BENS DE CONSUMO', 'BENS DURAVEIS', 'BPO', 'CENTROS CLINICOS',
  'CLUBES', 'CONCESSIONARIA DE VEICULOS', 'CONDOMINIO', 'CONSTRUTORAS',
  'COOPERATIVA AGROPECUARIA', 'DROGARIA', 'EDUCACAO CONTINUADA', 'EM BRANCO',
  'ENERGIA', 'ENGENHARIA & DESIGN', 'ENTIDADES ABERTAS/FECHADAS DE PREVIDENCI',
  'ESCRITORIO DE ADVOCACIA', 'EXTRATIVISTA & BENEFICIAMENTO',
  'FINANCEIRO - CARTOES DE CREDITO / DEBITO', 'FINANCEIRO - CORRETORAS E BOLSAS',
  'FINANCEIRO - CREDITO E FINANCIAMENTO', 'FINANCEIRO - HOLDINGS',
  'FINANCEIRO - INVESTIMENTOS', 'FOOD', 'GRAOS', 'HOSPEDAGEM', 'HOSPITAIS',
  'IMOBILIARIA', 'INCORPORADORAS', 'INTERNACIONAL', 'JURIDICO',
  'LIMPEZA & SEGURANÇA', 'LOCAÇÃO', 'MAGAZINE E LOJA DE DEPARTAMENTOS',
  'MATERIAL DE CONSTRUCAO', 'METAL-MECANICO & PLASTICO', 'MIDIA', 'MODA',
  'OPERADOR LOGISTICO', 'OPERADORAS DE PLANOS DE SAUDE', 'ORIGINACAO E BENEFICIAMENTO',
  'OUTRAS ATIVIDADES DE SERVIÇOS FINANCEIRO', 'PAPEL & CELULOSE',
  'PORTOS, RECINTOS ADUANEIROS', 'PRODUCAO DE ANIMAIS, AVES E PEIXES',
  'PRODUCAO DE CULTIVOS', 'PROJETOS & SERVICOS ESPECIAIS', 'PROVEDOR DE SERVICOS',
  'PROVEDOR SERVICOS', 'PUBLICO', 'QUALQUER COISA', 'QUIMICA & RECICLAGEM',
  'SAUDE', 'SEGURADORAS', 'SERVICOS DE RESERVA', 'SHOPPING', 'SUCROENERGETICO',
  'SUPERIOR', 'SUPERMERCADO', 'TEXTIL & VESTUARIO', 'TI & TELECOM', 'TOTVS',
  'TRANSPORTADOR', 'TRANSPORTE DE PASSAGEIROS', 'UTILITES', 'UTILITIES', 'VAREJO', 'VIAGENS'
].map(s => ({ value: s, label: s }));

// MOCK DATA PARA AS DUAS ABAS DE RECEITA
const MOCK_NAO_RECORRENTE = [
  { subsegmento: 'SUPERMERCADO', producaoNum: 2450000, qtdNum: 65, yoyProdVal: 15.2, yoyQtdVal: 8.5 },
  { subsegmento: 'CONSTRUTORAS', producaoNum: 1820000, qtdNum: 38, yoyProdVal: -12.4, yoyQtdVal: -9.1 },
  { subsegmento: 'BENS DE CONSUMO', producaoNum: 1510000, qtdNum: 42, yoyProdVal: 22.1, yoyQtdVal: 14.8 },
  { subsegmento: 'HOSPITAIS', producaoNum: 1340000, qtdNum: 28, yoyProdVal: 18.5, yoyQtdVal: 11.2 },
  { subsegmento: 'ATACADISTA E DISTRIBUIDOR', producaoNum: 1150000, qtdNum: 56, yoyProdVal: -8.9, yoyQtdVal: -5.4 },
  { subsegmento: 'GRAOS', producaoNum: 950000, qtdNum: 18, yoyProdVal: 32.4, yoyQtdVal: 24.6 },
  { subsegmento: 'METAL-MECANICO & PLASTICO', producaoNum: 880000, qtdNum: 24, yoyProdVal: 5.6, yoyQtdVal: 2.1 },
  { subsegmento: 'ESCRITORIO DE ADVOCACIA', producaoNum: 760000, qtdNum: 12, yoyProdVal: 11.8, yoyQtdVal: 6.9 },
  { subsegmento: 'MODA', producaoNum: 620000, qtdNum: 35, yoyProdVal: -18.5, yoyQtdVal: -14.2 },
  { subsegmento: 'TI & TELECOM', producaoNum: 540000, qtdNum: 15, yoyProdVal: 45.2, yoyQtdVal: 31.8 },
  { subsegmento: 'PROVEDOR DE SERVICOS', producaoNum: 490000, qtdNum: 48, yoyProdVal: 8.4, yoyQtdVal: 5.5 },
  { subsegmento: 'BENS DE CAPITAL', producaoNum: 410000, qtdNum: 14, yoyProdVal: -21.4, yoyQtdVal: -15.8 },
  { subsegmento: 'FOOD', producaoNum: 380000, qtdNum: 22, yoyProdVal: 14.1, yoyQtdVal: 9.8 },
  { subsegmento: 'BANCOS E FINANCEIRAS', producaoNum: 310000, qtdNum: 8, yoyProdVal: -5.6, yoyQtdVal: -3.2 },
  { subsegmento: 'EDUCACAO CONTINUADA', producaoNum: 250000, qtdNum: 16, yoyProdVal: 19.5, yoyQtdVal: 12.4 }
];

const MOCK_RECORRENTE = [
  { subsegmento: 'PROVEDOR DE SERVICOS', producaoNum: 3850000, qtdNum: 142, yoyProdVal: 24.5, yoyQtdVal: 18.2 },
  { subsegmento: 'SUPERMERCADO', producaoNum: 3120000, qtdNum: 88, yoyProdVal: 12.8, yoyQtdVal: 9.4 },
  { subsegmento: 'ATACADISTA E DISTRIBUIDOR', producaoNum: 2840000, qtdNum: 115, yoyProdVal: -6.4, yoyQtdVal: -4.1 },
  { subsegmento: 'CONSTRUTORAS', producaoNum: 2560000, qtdNum: 75, yoyProdVal: 19.2, yoyQtdVal: 14.8 },
  { subsegmento: 'HOSPITAIS', producaoNum: 2150000, qtdNum: 58, yoyProdVal: 31.5, yoyQtdVal: 22.4 },
  { subsegmento: 'BENS DE CONSUMO', producaoNum: 1940000, qtdNum: 92, yoyProdVal: -11.8, yoyQtdVal: -8.6 },
  { subsegmento: 'METAL-MECANICO & PLASTICO', producaoNum: 1680000, qtdNum: 64, yoyProdVal: 15.4, yoyQtdVal: 11.2 },
  { subsegmento: 'GRAOS', producaoNum: 1420000, qtdNum: 41, yoyProdVal: 42.1, yoyQtdVal: 28.5 },
  { subsegmento: 'TI & TELECOM', producaoNum: 1250000, qtdNum: 85, yoyProdVal: 18.6, yoyQtdVal: 14.1 },
  { subsegmento: 'MODA', producaoNum: 980000, qtdNum: 56, yoyProdVal: -15.4, yoyQtdVal: -11.8 },
  { subsegmento: 'ESCRITORIO DE ADVOCACIA', producaoNum: 890000, qtdNum: 34, yoyProdVal: 21.4, yoyQtdVal: 15.9 },
  { subsegmento: 'EDUCACAO CONTINUADA', producaoNum: 760000, qtdNum: 48, yoyProdVal: 9.5, yoyQtdVal: 6.2 },
  { subsegmento: 'BANCOS E FINANCEIRAS', producaoNum: 650000, qtdNum: 22, yoyProdVal: 28.4, yoyQtdVal: 19.8 },
  { subsegmento: 'FOOD', producaoNum: 540000, qtdNum: 45, yoyProdVal: -8.2, yoyQtdVal: -5.4 },
  { subsegmento: 'BENS DE CAPITAL', producaoNum: 420000, qtdNum: 28, yoyProdVal: 11.2, yoyQtdVal: 8.1 }
];


export class PerformanceSubsegmentos extends LitElement {
  static properties = {
    tipoReceita: { type: String }, // 'NAO_RECORRENTE' | 'RECORRENTE'
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros de seleção única
    filtroAno: { type: String },
    filtroMes: { type: String },

    // Filtros de múltipla escolha
    filtroSegmento: { type: Array },
    filtroSubsegmento: { type: Array },
    filtroTpUnidade: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    dadosSubsegmentos: { type: Array },
    totalGeral: { type: Object },
    criterioOrdenacao: { type: String }
  };

  constructor() {
    super();
    this.tipoReceita = 'NAO_RECORRENTE';
    this.carregando = true;
    this.erro = null;

    this.dropdownAberto = null;
    this.buscaFiltro = {};

    this.dadosSubsegmentos = [];
    this.totalGeral = null;

    this.filtroAno = '2026';
    this.filtroMes = '11';
    this.filtroSegmento = [];
    this.filtroSubsegmento = [];
    this.filtroTpUnidade = [];
    
    this.criterioOrdenacao = 'prod_desc';
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

  mudarReceita(tipo) {
    if (this.tipoReceita === tipo) return;
    this.tipoReceita = tipo;
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

  /* =========================================================
     MECANISMO DE ORDENAÇÃO DINÂMICA
     ========================================================= */
  alterarOrdenacao(novoCriterio) {
    this.criterioOrdenacao = novoCriterio;
    this.dadosSubsegmentos = this.ordenarItens(this.dadosSubsegmentos, novoCriterio);
    this.requestUpdate();
  }

  ordenarItens(itens, criterio) {
    if (!itens || itens.length === 0) return [];
    const copia = [...itens];
    
    copia.sort((a, b) => {
      switch (criterio) {
        case 'prod_desc': return b.producaoNum - a.producaoNum;
        case 'prod_asc': return a.producaoNum - b.producaoNum;
        case 'qtd_desc': return b.qtdNum - a.qtdNum;
        case 'qtd_asc': return a.qtdNum - b.qtdNum;
        case 'tm_desc': return b.tmNum - a.tmNum;
        case 'tm_asc': return a.tmNum - b.tmNum;
        case 'yoy_prod_desc': return b.yoyProdVal - a.yoyProdVal;
        case 'yoy_prod_asc': return a.yoyProdVal - b.yoyProdVal;
        case 'yoy_qtd_desc': return b.yoyQtdVal - a.yoyQtdVal;
        case 'yoy_qtd_asc': return a.yoyQtdVal - b.yoyQtdVal;
        case 'yoy_tm_desc': return b.yoyTmVal - a.yoyTmVal;
        case 'yoy_tm_asc': return a.yoyTmVal - b.yoyTmVal;
        case 'rep_desc': return b.repProdVal - a.repProdVal;
        case 'rep_asc': return a.repProdVal - b.repProdVal;
        default: return b.producaoNum - a.producaoNum;
      }
    });
    return copia;
  }

  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    // Atraso simulado leve
    await new Promise(resolve => setTimeout(resolve, 140));

    // Impacto leve dos filtros nos totais
    let fator = 1.0;
    const anoNum = parseInt(this.filtroAno, 10);
    const mesNum = parseInt(this.filtroMes, 10);
    
    fator *= (1 + (anoNum - 2026) * 0.12);
    fator *= (0.9 + (mesNum % 3) * 0.05);

    if (this.filtroSegmento.length > 0) fator *= Math.max(0.18, this.filtroSegmento.length * 0.12);
    if (this.filtroTpUnidade.length > 0) fator *= Math.max(0.20, this.filtroTpUnidade.length * 0.15);

    // Seleção da Fonte Mockada
    let baseList = this.tipoReceita === 'NAO_RECORRENTE' ? MOCK_NAO_RECORRENTE : MOCK_RECORRENTE;
    
    // Filtragem direta pelo multi-select de subsegmentos
    if (this.filtroSubsegmento.length > 0) {
      baseList = baseList.filter(s => this.filtroSubsegmento.includes(s.subsegmento));
    }

    let totProd = 0;
    let totQtd = 0;
    let somaYoyProd = 0;
    let somaYoyQtd = 0;

    let lista = baseList.map(item => {
      const prod = Math.round(item.producaoNum * fator);
      const qtd = Math.max(1, Math.round(item.qtdNum * fator));
      const tm = qtd > 0 ? (prod / qtd) : 0;
      
      const yoyProd = item.yoyProdVal + (Math.random() * 4 - 2);
      const yoyQtd = item.yoyQtdVal + (Math.random() * 4 - 2);
      const yoyTm = yoyProd - yoyQtd;

      totProd += prod;
      totQtd += qtd;
      somaYoyProd += yoyProd * prod;
      somaYoyQtd += yoyQtd * qtd;

      return {
        subsegmento: item.subsegmento,
        producaoNum: prod,
        qtdNum: qtd,
        tmNum: tm,
        yoyProdVal: yoyProd,
        yoyQtdVal: yoyQtd,
        yoyTmVal: yoyTm
      };
    });

    lista = lista.map(it => {
      return {
        ...it,
        repProdVal: totProd > 0 ? (it.producaoNum / totProd) * 100 : 0
      };
    });

    this.dadosSubsegmentos = this.ordenarItens(lista, this.criterioOrdenacao);
    
    if (lista.length > 0) {
      const globalYoyP = totProd > 0 ? (somaYoyProd / totProd) : 0;
      const globalYoyQ = totQtd > 0 ? (somaYoyQtd / totQtd) : 0;

      this.totalGeral = {
        subsegmento: 'Total',
        producao: this.formatInt(totProd),
        yoyProd: this.formatPercent(globalYoyP),
        repProd: '100,0%',
        qtd: this.formatInt(totQtd),
        yoyQtd: this.formatPercent(globalYoyQ),
        tm: this.formatCurrency(totQtd > 0 ? (totProd / totQtd) : 0),
        yoyTm: this.formatPercent(globalYoyP - globalYoyQ)
      };
    } else {
      this.totalGeral = null;
    }

    this.carregando = false;
    this.requestUpdate();
  }

  formatInt(val) {
    if (val === null || val === undefined || isNaN(val) || val === '') return '-';
    return Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatCurrency(val) {
    if (val === null || val === undefined || isNaN(val) || val === '') return '-';
    return 'R$ ' + Math.round(Number(val)).toLocaleString('pt-BR');
  }

  formatPercent(val) {
    if (val === null || val === undefined || val === '' || val === '-') return '-';
    if (typeof val === 'string' && val.includes('%')) return val;
    let num = Number(val);
    if (isNaN(num)) return '-';
    if (Math.abs(num) <= 1.0 && num !== 0) {
      num = num * 100;
    }
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  renderFormattedMetric(valStr) {
    if (!valStr || valStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const isNegative = valStr.includes('-');
    const isNeutral = valStr === '0,0%' || valStr === '0%';
    if (isNeutral) {
      return html`<span style="color: #0284c7; font-weight: 700;">0,0%</span>`;
    }
    return html`
      <span style="color: ${isNegative ? '#dc2626' : '#16a34a'}; font-weight: 700;">
        <span style="font-size: 13px;">${isNegative ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  renderFormattedTotalMetric(valStr) {
    if (!valStr || valStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const isNegative = valStr.includes('-');
    return html`
      <span style="color: ${isNegative ? '#fca5a5' : '#86efac'}; font-weight: 800;">
        <span style="font-size: 13px;">${isNegative ? '↘' : '↗'}</span> ${valStr}
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
    const isNaoRec = this.tipoReceita === 'NAO_RECORRENTE';

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
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIwAAAFkCAYAAABCeaDnAABKJklEQVR4nO3dZ5glZbW38bsnwZCT5CRBUCSLHgVUQFDQIxwVQVAURQUUFVAxHnNCQVEERAyIcMSEERUxEFREkIyAgKQhw5BmBib1+2F1v8wMM9N7d1fVqnD/rqsv0lD137tr165a9TzrGRgcHESSJEmSJEkaNi47gCRJkiRJkurFgpEkSZIkSZLmY8FIkiRJkiRJ87FgJEmSJEmSpPlYMJIkSZIkSdJ8LBhJkiRJkiRpPhaMJEmSJEmSNB8LRpIkSZIkSZqPBSNJkiRJkiTNx4KRJEmSJEmS5mPBSJIkSZIkSfOxYCRJkiRJkqT5/D/CtaeBvfOsTAAAAABJRU5ErkJggg==');
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
          margin: 0 0 6px 0;
          color: #000;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .toggle-group {
          display: inline-flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 3px;
          border: 1px solid #cbd5e1;
          gap: 4px;
        }

        .toggle-group button {
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

        .toggle-group button.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 43, 73, 0.2);
        }

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

        .filter-select-input {
          width: 100%;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 12px;
          color: #0f172a;
          outline: none;
          cursor: pointer;
          font-weight: 600;
          height: 35px;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .filter-select-input:hover, .filter-select-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.15);
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

        .popover-list::-webkit-scrollbar {
          width: 5px;
        }
        .popover-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
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

        .table-section {
          background: rgba(255, 255, 255, 0.95);
          padding: 24px;
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
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
          text-align: center;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .table-responsive {
          overflow-x: auto;
          max-height: 600px;
          border-radius: 6px;
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
          cursor: pointer;
          user-select: none;
        }

        th:first-child {
          text-align: left;
          padding-left: 14px;
        }
        
        th:hover {
          color: #38bdf8;
        }

        td {
          padding: 9px 8px;
          border: 1px solid #e2e8f0;
          text-align: right;
          color: #334155;
          white-space: nowrap;
        }

        td:first-child {
          text-align: left;
          padding-left: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .row-area {
          background-color: #ffffff;
          transition: background-color 0.2s;
        }

        .row-area:hover {
          background-color: #f1f5f9;
        }

        .row-total td {
          background-color: #002b49;
          color: white !important;
          font-weight: 800;
          border-color: #002b49;
          position: sticky;
          bottom: 0;
          z-index: 2;
        }

        .state-feedback {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-weight: 700;
        }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO HERO TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="title-area">
            <h1>PERFORMANCE DOS SUBSEGMENTOS</h1>
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <div class="toggle-group">
                <button class="${isNaoRec ? 'active' : ''}" @click="${() => this.mudarReceita('NAO_RECORRENTE')}">Não Recorrente</button>
                <button class="${!isNaoRec ? 'active' : ''}" @click="${() => this.mudarReceita('RECORRENTE')}">Recorrente</button>
              </div>
            </div>
          </div>
        </div>

        <!-- BARRA DE FILTROS FIXA -->
        <div class="filter-bar">
          <!-- ESCOLHA ÚNICA: ANO REFERÊNCIA -->
          <div class="filter-dropdown-container">
            <label class="filter-label">ANO REFERÊNCIA</label>
            <select class="filter-select-input" .value="${this.filtroAno}" @change="${(e) => { this.filtroAno = e.target.value; this.carregarDados(); }}">
              ${OPCOES_ANO.map(o => html`<option value="${o.value}">${o.label}</option>`)}
            </select>
          </div>

          <!-- ESCOLHA ÚNICA: MÊS REFERÊNCIA -->
          <div class="filter-dropdown-container">
            <label class="filter-label">MÊS REFERÊNCIA</label>
            <select class="filter-select-input" .value="${this.filtroMes}" @change="${(e) => { this.filtroMes = e.target.value; this.carregarDados(); }}">
              ${OPCOES_MES.map(o => html`<option value="${o.value}">${o.label}</option>`)}
            </select>
          </div>

          <!-- MÚLTIPLA ESCOLHA: SEGMENTO, SUBSEGMENTO E UNIDADE -->
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
          ${this.renderDropdownFiltro('SUBSEGMENTO', 'filtroSubsegmento', 'Todos os subsegmentos', OPCOES_SUBSEGMENTO)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', OPCOES_TP_UNIDADE)}
        </div>

        <!-- MENSAGEM DE ERRO (SE HOUVER) -->
        ${this.erro ? html`
          <div class="state-feedback" style="background: #fee2e2; color: #b91c1c; border-radius: 8px; margin-bottom: 16px;">
            ⚠️ ${this.erro}
          </div>
        ` : ''}

        <!-- TABELA ANALÍTICA DE SUBSEGMENTOS -->
        <div class="table-section">
          <div class="table-title">${isNaoRec ? 'NÃO RECORRENTE' : 'RECORRENTE'}</div>
          
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>SUBSEGMENTO</th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'prod_desc' ? 'prod_asc' : 'prod_desc')}">
                    PRODUCAO ${this.criterioOrdenacao.startsWith('prod') ? (this.criterioOrdenacao === 'prod_desc' ? '▼' : '▲') : ''}
                  </th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'yoy_prod_desc' ? 'yoy_prod_asc' : 'yoy_prod_desc')}">
                    % YOY PROD ${this.criterioOrdenacao.startsWith('yoy_prod') ? (this.criterioOrdenacao === 'yoy_prod_desc' ? '▼' : '▲') : ''}
                  </th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'rep_desc' ? 'rep_asc' : 'rep_desc')}">
                    % REP PROD ${this.criterioOrdenacao.startsWith('rep') ? (this.criterioOrdenacao === 'rep_desc' ? '▼' : '▲') : ''}
                  </th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'qtd_desc' ? 'qtd_asc' : 'qtd_desc')}">
                    QTD ${this.criterioOrdenacao.startsWith('qtd') ? (this.criterioOrdenacao === 'qtd_desc' ? '▼' : '▲') : ''}
                  </th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'yoy_qtd_desc' ? 'yoy_qtd_asc' : 'yoy_qtd_desc')}">
                    % YOY QTD ${this.criterioOrdenacao.startsWith('yoy_qtd') ? (this.criterioOrdenacao === 'yoy_qtd_desc' ? '▼' : '▲') : ''}
                  </th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'tm_desc' ? 'tm_asc' : 'tm_desc')}">
                    TICKET MÉDIO ${this.criterioOrdenacao.startsWith('tm') ? (this.criterioOrdenacao === 'tm_desc' ? '▼' : '▲') : ''}
                  </th>
                  <th @click="${() => this.alterarOrdenacao(this.criterioOrdenacao === 'yoy_tm_desc' ? 'yoy_tm_asc' : 'yoy_tm_desc')}">
                    % YOY TM ${this.criterioOrdenacao.startsWith('yoy_tm') ? (this.criterioOrdenacao === 'yoy_tm_desc' ? '▼' : '▲') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                ${this.carregando ? html`
                  <tr>
                    <td colspan="8" class="state-feedback">Carregando dados da camada semântica LookML...</td>
                  </tr>
                ` : this.dadosSubsegmentos.length === 0 ? html`
                  <tr>
                    <td colspan="8" class="state-feedback">Nenhum dado encontrado para os filtros selecionados.</td>
                  </tr>
                ` : html`
                  ${this.dadosSubsegmentos.map(item => html`
                    <tr class="row-area">
                      <td>${item.subsegmento}</td>
                      <td>${this.formatCurrency(item.producaoNum)}</td>
                      <td>${this.renderFormattedMetric(this.formatPercent(item.yoyProdVal))}</td>
                      <td>${this.formatPercent(item.repProdVal)}</td>
                      <td>${this.formatInt(item.qtdNum)}</td>
                      <td>${this.renderFormattedMetric(this.formatPercent(item.yoyQtdVal))}</td>
                      <td>${this.formatCurrency(item.tmNum)}</td>
                      <td>${this.renderFormattedMetric(this.formatPercent(item.yoyTmVal))}</td>
                    </tr>
                  `)}
                  ${this.totalGeral ? html`
                    <tr class="row-total">
                      <td>${this.totalGeral.subsegmento}</td>
                      <td>${this.totalGeral.producao}</td>
                      <td>${this.renderFormattedTotalMetric(this.totalGeral.yoyProd)}</td>
                      <td>${this.totalGeral.repProd}</td>
                      <td>${this.totalGeral.qtd}</td>
                      <td>${this.renderFormattedTotalMetric(this.totalGeral.yoyQtd)}</td>
                      <td>${this.totalGeral.tm}</td>
                      <td>${this.renderFormattedTotalMetric(this.totalGeral.yoyTm)}</td>
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

customElements.define(elementName, PerformanceSubsegmentos);
