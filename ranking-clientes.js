/**
 * @title Ranking de Clientes (Versão Vercel Preview)
 * @description Visão TOP 5 de Clientes cruzando modelos de Receita (CDU e Recorrente) e Categorias (Base e Novo)
 *              utilizando LitElement e dados simulados dinâmicos.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'ranking-clientes';

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

// Dados Mockados para os Rankings
const MOCK_CDU_BASE = [
  { cliente: 'VALVULAS FADEVA S A', segmento: 'MANUFATURA', unidade: 'FILIAIS', ofertas: 'FULL TOTVS, MANUFATURA PROTHEUS', prodBase: 4250000 },
  { cliente: 'SUPERMERCADOS IDEAL LTDA', segmento: 'SUPERMERCADOS', unidade: 'FRANQUIAS', ofertas: 'WINTHOR DISTRIBUIDOR', prodBase: 3120000 },
  { cliente: 'CONSTRUTORA HORIZONTE ENGENHARIA', segmento: 'CONSTRUCAO E PROJETOS', unidade: 'VERTICAIS', ofertas: 'SOFT COMPL BY PROGRESS', prodBase: 2850000 },
  { cliente: 'DOMO MINERALS S.A.S', segmento: 'AGROINDUSTRIA', unidade: 'MI', ofertas: 'FULL TOTVS', prodBase: 1940000 },
  { cliente: 'HOSPITAL SANTA JOANA LTDA', segmento: 'SAUDE', unidade: 'FILIAIS', ofertas: 'FULL TOTVS, GESTAO SAUDE', prodBase: 1560000 }
];

const MOCK_CDU_NOVO = [
  { cliente: 'METALURGICA PROGRESSO IND', segmento: 'MANUFATURA', unidade: 'VERTICAIS', ofertas: 'FULL TOTVS', prodBase: 1250000 },
  { cliente: 'REDE EDUCACIONAL FUTURO', segmento: 'EDUCACIONAL', unidade: 'FILIAIS', ofertas: 'SOFT COMPL BY PROGRESS', prodBase: 980000 },
  { cliente: 'AGROPECUARIA BOM JESUS S/A', segmento: 'AGROINDUSTRIA', unidade: 'FRANQUIAS', ofertas: 'WINTHOR DISTRIBUIDOR', prodBase: 760000 },
  { cliente: 'LOGISTICA RAPIDA BRASIL', segmento: 'LOGISTICA', unidade: 'FILIAIS', ofertas: 'FULL TOTVS', prodBase: 540000 },
  { cliente: 'VAREJISTA NOVA ERA', segmento: 'VAREJO', unidade: 'VERTICAIS', ofertas: 'FULL TOTVS', prodBase: 420000 }
];

const MOCK_REC_BASE = [
  { cliente: 'FUNDACAO FACULDADE DE MEDICINA', segmento: 'SAUDE', unidade: 'FILIAIS', ofertas: 'RH PONTO ELETRONICO, CLOUD INTERA', prodBase: 3890000 },
  { cliente: 'DISTRIBUIDORA NACIONAL LOGISTICA', segmento: 'LOGISTICA', unidade: 'FRANQUIAS', ofertas: 'TOTVS SERVICOS, INTERA BACKOFFICE', prodBase: 2450000 },
  { cliente: 'BANCO INVESTIMENTO SEGURO', segmento: 'FINANCIAL SERVICES', unidade: 'VERTICAIS', ofertas: 'CLOUD + CLOUD INTERA', prodBase: 1950000 },
  { cliente: 'REDE SUPERMERCADOS ABC', segmento: 'SUPERMERCADOS', unidade: 'FILIAIS', ofertas: 'CONSINCO SERVICOS', prodBase: 1720000 },
  { cliente: 'GRUPO EDUCACIONAL SABER', segmento: 'EDUCACIONAL', unidade: 'MI', ofertas: 'TOTVS SERVICOS, FEEDZ', prodBase: 1480000 }
];

const MOCK_REC_NOVO = [
  { cliente: 'SOLUS DO BRASIL LTDA', segmento: 'MANUFATURA', unidade: 'FILIAIS', ofertas: 'INTERA BACKOFFICE', prodBase: 840000 },
  { cliente: 'TECNOLOGIA AVANCADA BR', segmento: 'SERVICOS', unidade: 'VERTICAIS', ofertas: 'CLOUD + CLOUD INTERA', prodBase: 650000 },
  { cliente: 'CLINICA SAUDE INTEGRAL', segmento: 'SAUDE', unidade: 'FRANQUIAS', ofertas: 'TOTVS SERVICOS', prodBase: 510000 },
  { cliente: 'CONSTRUTORA NOVA URBANA', segmento: 'CONSTRUCAO E PROJETOS', unidade: 'FILIAIS', ofertas: 'INTERA OBRAS E PROJETOS', prodBase: 430000 },
  { cliente: 'COMERCIO VAREJISTA LTDA', segmento: 'VAREJO', unidade: 'FRANQUIAS', ofertas: 'RD STATION MARKETING', prodBase: 310000 }
];


export class RankingClientes extends LitElement {
  static properties = {
    carregando: { type: Boolean },
    erro: { type: String },

    // Filtros em Múltipla Escolha
    filtroAno: { type: Array },
    filtroMes: { type: Array },
    filtroSegmento: { type: Array },
    filtroTpUnidade: { type: Array },

    dropdownAberto: { type: String },
    buscaFiltro: { type: Object },

    // Toggles da Visão
    receitaAtiva: { type: String }, // 'CDU' ou 'REC'
    categoriaAtiva: { type: String }, // 'BASE' ou 'NOVO'

    // Estruturas das 4 Tabelas
    cduBase: { type: Array },
    cduNovo: { type: Array },
    recBase: { type: Array },
    recNovo: { type: Array }
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
    this.filtroTpUnidade = [];

    // Estado inicial dos Toggles
    this.receitaAtiva = 'CDU';
    this.categoriaAtiva = 'BASE';

    this.cduBase = [];
    this.cduNovo = [];
    this.recBase = [];
    this.recNovo = [];
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

  // Métodos de Controle dos Toggles
  setReceita(r) { this.receitaAtiva = r; }
  setCategoria(c) { this.categoriaAtiva = c; }

  /* ==========================================
     GERAÇÃO DE DADOS MOCKADOS E RANKINGS
     ========================================== */
  _calcularFatorFiltros() {
    let fator = 1.0;

    if (this.filtroAno.length > 0) {
      const maxAno = Math.max(...this.filtroAno.map(a => parseInt(a, 10)));
      fator *= (1 + (maxAno - 2026) * 0.08);
      if (this.filtroAno.length > 1) {
        fator *= (1 + (this.filtroAno.length - 1) * 0.65);
      }
    }

    if (this.filtroMes.length > 0) {
      const maxMes = Math.max(...this.filtroMes.map(m => parseInt(m, 10)));
      fator *= (0.95 + (maxMes % 3) * 0.05);
      if (this.filtroMes.length > 1) {
        fator *= (1 + (this.filtroMes.length - 1) * 0.70);
      }
    }

    if (this.filtroSegmento.length > 0 && this.filtroSegmento.length < OPCOES_SEGMENTO.length) {
      fator *= Math.max(0.15, this.filtroSegmento.length * 0.12);
    }

    if (this.filtroTpUnidade.length > 0 && this.filtroTpUnidade.length < OPCOES_TP_UNIDADE.length) {
      fator *= Math.max(0.20, this.filtroTpUnidade.length * 0.20);
    }

    return fator;
  }

  async carregarDados() {
    this.carregando = true;
    this.erro = null;

    // Simulação do tempo de resposta do Looker
    await new Promise(resolve => setTimeout(resolve, 130));

    const fator = this._calcularFatorFiltros();

    const aplicarFiltroSegmentoEUnidade = (baseMock) => {
      let dadosFiltrados = [...baseMock];
      
      // Filtragem textual básica caso haja segmento ou unidade específica selecionada
      if (this.filtroSegmento.length > 0) {
        dadosFiltrados = dadosFiltrados.filter(item => this.filtroSegmento.includes(item.segmento));
      }
      if (this.filtroTpUnidade.length > 0) {
        dadosFiltrados = dadosFiltrados.filter(item => this.filtroTpUnidade.includes(item.unidade));
      }

      return dadosFiltrados.map(item => ({
        ...item,
        prod: this.formatInt(Math.round(item.prodBase * fator))
      })).sort((a, b) => {
        // Ordenar simulando valores brutos para garantir que fiquem os 5 maiores (Top 5)
        return (b.prodBase * fator) - (a.prodBase * fator);
      }).slice(0, 5); // Mantém sempre o Top 5
    };

    this.cduBase = aplicarFiltroSegmentoEUnidade(MOCK_CDU_BASE);
    this.cduNovo = aplicarFiltroSegmentoEUnidade(MOCK_CDU_NOVO);
    this.recBase = aplicarFiltroSegmentoEUnidade(MOCK_REC_BASE);
    this.recNovo = aplicarFiltroSegmentoEUnidade(MOCK_REC_NOVO);

    this.carregando = false;
  }

  formatInt(val) {
    if (val === null || val === undefined || isNaN(val)) return '0';
    return 'R$ ' + Math.round(Number(val)).toLocaleString('pt-BR');
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
    // Definir os dados ativos de acordo com os Toggles
    let dadosAtivos = [];
    if (this.receitaAtiva === 'CDU' && this.categoriaAtiva === 'BASE') dadosAtivos = this.cduBase;
    else if (this.receitaAtiva === 'CDU' && this.categoriaAtiva === 'NOVO') dadosAtivos = this.cduNovo;
    else if (this.receitaAtiva === 'REC' && this.categoriaAtiva === 'BASE') dadosAtivos = this.recBase;
    else if (this.receitaAtiva === 'REC' && this.categoriaAtiva === 'NOVO') dadosAtivos = this.recNovo;

    const tituloAtivo = `TOP 5 | ${this.receitaAtiva === 'CDU' ? 'CDU' : 'Recorrentes'} ${this.categoriaAtiva === 'BASE' ? 'Base' : 'Novo'}`;

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
          margin-bottom: 24px;
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

        /* TOGGLES PARA ALTERNAR A TABELA */
        .view-toggles {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .toggle-group {
          display: inline-flex;
          background: #f8fafc;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .toggle-group button {
          background: transparent;
          border: none;
          padding: 8px 24px;
          font-size: 12.5px;
          font-weight: 800;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .toggle-group button.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 43, 73, 0.25);
        }

        /* ESTILO DO CARD DA TABELA */
        .table-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 24px 28px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          position: relative;
          z-index: 1;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .table-main-title {
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 20px 0;
          text-align: center;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .table-responsive {
          overflow-x: auto;
          border-radius: 6px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11.5px;
        }

        th {
          background-color: #002b49;
          color: white;
          padding: 12px 10px;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        td {
          padding: 12px 10px;
          border: 1px solid #e2e8f0;
          color: #334155;
          vertical-align: middle;
        }

        .row-area {
          background-color: #ffffff;
          transition: background-color 0.2s;
        }

        .row-area:hover {
          background-color: #f1f5f9;
        }

        .cell-cliente {
          font-weight: 800;
          color: #0f172a;
        }
        
        .cell-ofertas {
          line-height: 1.4;
        }

        .state-feedback {
          text-align: center;
          padding: 30px;
          color: #64748b;
          font-weight: 700;
          font-size: 14px;
        }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO HERO OFICIAL TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="title-area">
            <h1>RANKING DE CLIENTES</h1>
          </div>
        </div>

        <!-- BARRA COM OS FILTROS EM MULTI-SELECT -->
        <div class="filter-bar">
          ${this.renderDropdownFiltro('ANO REFERÊNCIA', 'filtroAno', 'Todos os anos', OPCOES_ANO)}
          ${this.renderDropdownFiltro('MÊS REFERÊNCIA', 'filtroMes', 'Todos os meses', OPCOES_MES)}
          ${this.renderDropdownFiltro('SEGMENTO', 'filtroSegmento', 'Todos os segmentos', OPCOES_SEGMENTO)}
          ${this.renderDropdownFiltro('UNIDADE VENDA', 'filtroTpUnidade', 'Todas as unidades', OPCOES_TP_UNIDADE)}
        </div>

        ${this.erro ? html`
          <div class="state-feedback" style="background: #fee2e2; color: #b91c1c; border-radius: 8px; margin-bottom: 16px;">
            ⚠️ ${this.erro}
          </div>
        ` : ''}

        <!-- CONTROLES DOS TOGGLES -->
        <div class="view-toggles">
          <div class="toggle-group">
            <button class="${this.receitaAtiva === 'CDU' ? 'active' : ''}" @click="${() => this.setReceita('CDU')}">CDU</button>
            <button class="${this.receitaAtiva === 'REC' ? 'active' : ''}" @click="${() => this.setReceita('REC')}">Recorrente</button>
          </div>
          
          <div class="toggle-group">
            <button class="${this.categoriaAtiva === 'BASE' ? 'active' : ''}" @click="${() => this.setCategoria('BASE')}">Base</button>
            <button class="${this.categoriaAtiva === 'NOVO' ? 'active' : ''}" @click="${() => this.categoriaAtiva = 'NOVO'}">Novo</button>
          </div>
        </div>

        <!-- TABELA DINÂMICA ÚNICA -->
        <div class="table-card">
          <h2 class="table-main-title">${tituloAtivo}</h2>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th style="width: 30%; text-align: left; padding-left: 16px;">Cliente</th>
                  <th style="width: 15%; text-align: left;">Segmento</th>
                  <th style="width: 15%; text-align: left;">Unidade</th>
                  <th style="width: 25%; text-align: left;">Ofertas</th>
                  <th style="width: 15%; text-align: right; padding-right: 16px;">Produção</th>
                </tr>
              </thead>
              <tbody>
                ${this.carregando ? html`
                  <tr>
                    <td colspan="5" class="state-feedback">Carregando dados da camada semântica LookML...</td>
                  </tr>
                ` : dadosAtivos.length === 0 ? html`
                  <tr>
                    <td colspan="5" class="state-feedback">Nenhum registro encontrado para a visão selecionada.</td>
                  </tr>
                ` : dadosAtivos.map(item => html`
                  <tr class="row-area">
                    <td style="text-align: left; padding-left: 16px;" class="cell-cliente">${item.cliente}</td>
                    <td style="text-align: left;">${item.segmento}</td>
                    <td style="text-align: left;">${item.unidade}</td>
                    <td style="text-align: left;" class="cell-ofertas">${item.ofertas}</td>
                    <td style="text-align: right; padding-right: 16px; font-weight: 800; color: #0f172a; font-size: 13px;">${item.prod}</td>
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

customElements.define(elementName, RankingClientes);
