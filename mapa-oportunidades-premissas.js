/**
 * @title Mapa de Oportunidades - Premissas
 * @description Guia inicial do Mapa de Oportunidades com fontes de dados, resumo de navegação, conceitos e metodologia de ICPs.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-premissas';

const GUIAS_MAPA = [
  {
    id: 'premissas',
    titulo: 'Premissas',
    subtitulo: 'Fontes, conceitos e definição dos ICPs',
    disponivel: true
  },
  {
    id: 'panorama-oportunidades',
    titulo: 'Panorama de Oportunidades',
    subtitulo: 'Resumo dos big numbers e potencial de receita',
    disponivel: true
  },
  {
    id: 'panorama-segmentos',
    titulo: 'Panorama de Segmentos',
    subtitulo: 'Distribuição por segmento e subsegmento',
    disponivel: true
  },
  {
    id: 'panorama-ofertas',
    titulo: 'Panorama de Ofertas',
    subtitulo: 'Visão sobre o potencial por produto',
    disponivel: true
  },
  {
    id: 'panorama-regioes',
    titulo: 'Panorama de Regiões e Unidades',
    subtitulo: 'Distribuição por tipo de unidade, região e cidades',
    disponivel: true
  },
  {
    id: 'painel-acao',
    titulo: 'Painel de Ação',
    subtitulo: 'Status da carteira e oportunidades por cliente',
    disponivel: true
  },
  {
    id: 'extracao-relatorios',
    titulo: 'Extração de Relatórios',
    subtitulo: 'Filtros e tabelas detalhadas para exportação',
    disponivel: true
  }
];

const FONTES_UTILIZADAS = [
  'Versionamento de Contrato',
  'Realizado de Vendas',
  'Bases de Mercado (VADU)',
  'Faturamento de Clientes (EC)',
  'Estudo de Dormentes (EC)'
];

const GUIA_NAVEGACAO = [
  {
    titulo: 'PANORAMA DE OPORTUNIDADES',
    desc: 'Resumo dos principais big numbers. Entenda o total de oportunidades mapeadas, assim como o potencial de ganho de receita.'
  },
  {
    titulo: 'PANORAMA DE SEGMENTOS',
    desc: 'Distribuição das oportunidades por segmento e subsegmento.'
  },
  {
    titulo: 'PANORAMA DE OFERTAS',
    desc: 'Visão sobre o potencial por produto.'
  },
  {
    titulo: 'PANORAMA DE REGIÕES E UNIDADES',
    desc: 'Distribuição das oportunidades por tipo de unidade e região, e quais as unidades e cidades com mais oportunidades.'
  },
  {
    titulo: 'PAINEL DE AÇÃO',
    desc: 'Visão focada no cliente. Entenda o status da sua carteira e qual as principais oportunidades para cada dos seus clientes e/ou novos.'
  },
  {
    titulo: 'EXTRAÇÃO DE RELATÓRIOS',
    desc: 'Área destinada para a extração de relatório, com filtros e tabelas detalhando as oportunidades por cliente e/ou novos.'
  }
];

const CONCEITOS_LISTA = [
  {
    termo: 'Oportunidades',
    definicao: 'Uma oportunidade é a possibilidade de venda de um produto em um cliente. Ou seja, você pode ter mais de uma oportunidade de venda em um mesmo clientes/CNPJ.'
  },
  {
    termo: 'Potencial Recorrente',
    definicao: 'Ticket médio de venda do produto nas linhas de receita SaaS e SMS (exceto SMS Prime). O total é obtido pela produção do ticket médio x quantidade de oportunidades daquele produto.'
  },
  {
    termo: 'Potencial Não Recorrente',
    definicao: 'Ticket médio de venda do produto na linha de receita de CDU. O total é obtido pela produção do ticket médio x quantidade de oportunidades daquele produto.'
  },
  {
    termo: 'Gestão',
    definicao: 'Produtos de gestão da TOTVS.'
  },
  {
    termo: 'DC',
    definicao: 'Produtos de Digital Commerce. Aqui entram os produtos Digital Commerce e RD Station.'
  },
  {
    termo: 'Faixa de Faturamento',
    definicao: 'Faturamento anual estimado do cliente. Informações disponibilizadas pelo time de Estratégia Comercial da TOTVS.'
  },
  {
    termo: 'Dormente',
    definicao: 'Cliente que não realizou nenhuma compra nos últimos 18 meses. Informação disponibilizadas pelo time de Estratégia Comercial da TOTVS.'
  },
  {
    termo: 'Porte',
    definicao: 'Classificação do porte do cliente baseado na sua faixa de faturamento e segmento.'
  },
  {
    termo: 'Performance Acima do Esperado',
    definicao: 'ICPs que tem um desempenho acima do esperado em relação aos demais. Demonstram ser perfis com uma maior probabilidade de conversão.'
  },
  {
    termo: 'Performance Esperada',
    definicao: 'ICPs que demonstram um desempenho conforme o esperado. Demonstram ser perfis com um bom fit ao produto.'
  }
];

const ETAPAS_ICP = [
  'Levantamento dos principais ICPs através de análises estatísticas, para definir baseado em dados quais os principais ICPs para cada um dos produtos TOTVS;',
  'Revisão dos dados com os times de produtos, fazendo uma análise qualitativa em cima dos resultados para entender quais os perfis que mais tem aderência com o produto.'
];

export class MapaOportunidadesPremissas extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    termoBuscaConceito: { type: String },
    avisoGuiaPendente: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.termoBuscaConceito = '';
    this.avisoGuiaPendente = '';

    this._fecharMenuAoClicarFora = (e) => {
      if (!e.composedPath().some(el => el.classList && el.classList.contains('nav-menu-wrapper'))) {
        if (this.menuNavegacaoAberto) {
          this.menuNavegacaoAberto = false;
          this.requestUpdate();
        }
      }
    };

    this._tecladoListener = (e) => {
      if (e.key === 'Escape' && this.menuNavegacaoAberto) {
        this.menuNavegacaoAberto = false;
        this.requestUpdate();
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._fecharMenuAoClicarFora);
    window.addEventListener('keydown', this._tecladoListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._fecharMenuAoClicarFora);
    window.removeEventListener('keydown', this._tecladoListener);
  }

  toggleMenuNavegacao(e) {
    e.stopPropagation();
    this.menuNavegacaoAberto = !this.menuNavegacaoAberto;
    this.requestUpdate();
  }

  selecionarGuia(guia) {
    this.menuNavegacaoAberto = false;
    const params = new URLSearchParams(window.location.search);
    const hasAppParam = params.has('app');

    const mapRotas = {
      'premissas': { folder: 'Premissas', dash: 'mapa-oportunidades' },
      'panorama-oportunidades': { folder: 'Panorama_oportunidades', dash: 'mapa-oportunidades-panorama' },
      'panorama-segmentos': { folder: 'Panorama_segmentos', dash: 'mapa-oportunidades-segmentos' },
      'panorama-ofertas': { folder: 'Panorama_ofertas', dash: 'mapa-oportunidades-ofertas' },
      'panorama-regioes': { folder: 'Panorama_regioes', dash: 'mapa-oportunidades-regioes' },
      'painel-acao': { folder: 'Painel_acao', dash: 'mapa-oportunidades-painel-acao' },
      'extracao-relatorios': { folder: 'Extracao_relatorios', dash: 'mapa-oportunidades-extracao' }
    };

    if (guia.id === 'premissas') {
      this.avisoGuiaPendente = '';
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Premissas/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  render() {
    const termo = (this.termoBuscaConceito || '').trim().toLowerCase();
    const conceitosFiltrados = termo
      ? CONCEITOS_LISTA.filter(
          c => c.termo.toLowerCase().includes(termo) ||
               c.definicao.toLowerCase().includes(termo)
        )
      : CONCEITOS_LISTA;

    return html`
      <style>
        * { box-sizing: border-box; }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dash-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #e2e8f0;
          min-height: 100vh;
          color: #0f172a;
          padding: 18px 28px 48px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* CABEÇALHO OFICIAL TOTVS */
        .hero-banner {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 18px 24px;
          margin-bottom: 16px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 86px;
          position: relative;
          z-index: 30;
        }

        .hero-bg-clip {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 11px;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .gradient-slant {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 46%;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 35%, #6d28d9 75%, #9333ea 100%);
          clip-path: polygon(24% 0, 100% 0, 100% 100%, 0 100%);
        }

        .totvs-logo-layer {
          position: absolute;
          right: 26px;
          top: 50%;
          transform: translateY(-50%);
          width: 72px;
          height: 72px;
          background-image: url('./logo.png');
          background-size: contain;
          background-position: right center;
          background-repeat: no-repeat;
        }

        .title-area {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .title-area h1 {
          font-size: 22px;
          font-weight: 900;
          margin: 0;
          color: #0f172a;
          letter-spacing: -0.4px;
          text-transform: uppercase;
        }

        .title-sub {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
        }

        .purple-line {
          height: 3.5px;
          width: 110px;
          background: #7c3aed;
          border-radius: 2px;
          margin-top: 3px;
        }

        /* MENU RETRÁTIL DE NAVEGAÇÃO NO CABEÇALHO */
        .nav-menu-wrapper {
          position: relative;
          z-index: 40;
          margin-right: 92px;
        }

        .nav-menu-trigger {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          padding: 8px 15px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          box-shadow: 0 2px 8px rgba(10, 25, 47, 0.18);
          transition: all 0.15s ease;
          user-select: none;
        }

        .nav-menu-trigger:hover, .nav-menu-trigger.open {
          border-color: #7c3aed;
          background: #f8fafc;
        }

        .nav-menu-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 330px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          box-shadow: 0 14px 32px -8px rgba(15, 23, 42, 0.25);
          padding: 8px;
          z-index: 100;
          animation: fadeSlideDown 0.15s ease-out;
        }

        .popover-header-lbl {
          font-size: 10.5px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 10px 7px 10px;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 5px;
        }

        .nav-option-btn {
          width: 100%;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 7px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease;
          margin-bottom: 2px;
        }

        .nav-option-btn:hover {
          background: #f8fafc;
        }

        .nav-option-btn.active {
          background: #f3e8ff;
          border-color: #e9d5ff;
        }

        .nav-opt-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #cbd5e1;
          flex-shrink: 0;
        }

        .nav-option-btn.active .nav-opt-dot {
          background: #7c3aed;
        }

        .nav-opt-text {
          flex: 1;
          min-width: 0;
        }

        .nav-opt-title {
          font-size: 12.5px;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .nav-opt-sub {
          font-size: 11px;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }

        .badge-atual {
          font-size: 9.5px;
          font-weight: 800;
          background: #7c3aed;
          color: #ffffff;
          padding: 1px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .toast-banner {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          padding: 10px 16px;
          border-radius: 8px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12.5px;
          font-weight: 700;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
        }

        .toast-close {
          background: transparent;
          border: none;
          color: #64748b;
          font-weight: 800;
          cursor: pointer;
          font-size: 13px;
          padding: 2px 6px;
        }

        /* CONTEÚDO PRINCIPAL */
        .intro-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 16px 24px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          font-size: 14px;
          line-height: 1.55;
          color: #1e293b;
        }

        .intro-card strong {
          color: #0f172a;
          font-weight: 800;
        }

        .section-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 20px 24px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          margin-bottom: 16px;
        }

        .section-card:last-child {
          margin-bottom: 0;
        }

        /* TÍTULO PÍLULA AZUL MARINHO COM LINHA DE EXTENSÃO */
        .section-header {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 18px;
        }

        .section-title-pill {
          display: inline-flex;
          align-items: center;
          background-color: #172e4d;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 7px 26px 7px 16px;
          border-radius: 6px 999px 999px 6px;
          margin: 0;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .section-header-line {
          flex: 1;
          height: 1px;
          background-color: #94a3b8;
          opacity: 0.65;
        }

        /* INFORMAÇÕES GERAIS - DISTRIBUIÇÃO EQUILIBRADA */
        .info-gerais-layout {
          display: grid;
          grid-template-columns: 2.3fr auto 1fr;
          gap: 24px;
          align-items: stretch;
        }

        .info-divider {
          width: 1px;
          background-color: #e2e8f0;
          margin: 10px 0;
        }

        .info-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sub-block-label {
          font-size: 11.5px;
          font-weight: 900;
          color: #002b49;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .fontes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          flex: 1;
        }

        .fonte-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .fonte-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #172e4d;
          flex-shrink: 0;
        }

        .freq-card {
          background: #172e4d;
          color: #ffffff;
          border-radius: 8px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        .freq-value {
          font-size: 16.5px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.35;
        }

        /* COMO NAVEGAR */
        .nav-lead {
          font-size: 13px;
          color: #475569;
          margin: 0 0 14px 0;
          line-height: 1.5;
        }

        .nav-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .nav-guide-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .nav-guide-card:hover {
          background: #ffffff;
          border-color: #cbd5e1;
        }

        .ngc-title {
          font-size: 12px;
          font-weight: 900;
          color: #172e4d;
          letter-spacing: 0.2px;
        }

        .ngc-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: #334155;
        }

        /* CONCEITOS */
        .search-conceito-wrap {
          position: relative;
          display: flex;
          align-items: center;
          margin-left: 12px;
          flex-shrink: 0;
        }

        .search-conceito-wrap svg {
          position: absolute;
          left: 10px;
          color: #64748b;
          pointer-events: none;
        }

        .search-conceito-input {
          padding: 6px 12px 6px 30px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          min-width: 230px;
          outline: none;
        }

        .search-conceito-input:focus {
          border-color: #172e4d;
          background: #ffffff;
        }

        .conceitos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .conceito-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .conceito-termo {
          font-size: 13px;
          font-weight: 800;
          color: #172e4d;
        }

        .conceito-desc {
          font-size: 12.5px;
          line-height: 1.55;
          color: #334155;
        }

        /* DEFINIÇÃO DOS ICPS */
        .icp-lead {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 12px;
        }

        .icp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .icp-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px 18px;
          font-size: 13px;
          line-height: 1.55;
          color: #1e293b;
        }

        @media (max-width: 1100px) {
          .info-gerais-layout, .fontes-grid, .nav-cards-grid, .conceitos-grid, .icp-grid {
            grid-template-columns: 1fr;
          }
          .nav-menu-wrapper {
            margin-right: 0;
          }
        }
      </style>

      <div class="dash-container">

        <!-- CABEÇALHO OFICIAL TOTVS COM MENU RETRÁTIL -->
        <div class="hero-banner">
          <div class="hero-bg-clip">
            <div class="gradient-slant"></div>
            <div class="totvs-logo-layer"></div>
          </div>

          <div class="title-area">
            <h1>MAPA DE OPORTUNIDADES</h1>
            <div class="title-sub">Premissas</div>
            <div class="purple-line"></div>
          </div>

          <div class="nav-menu-wrapper">
            <button
              type="button"
              class="nav-menu-trigger ${this.menuNavegacaoAberto ? 'open' : ''}"
              @click="${(e) => this.toggleMenuNavegacao(e)}"
              title="Abrir opções de navegação">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#172e4d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span>Guias do Painel</span>
              <span style="font-size: 9px; color: #64748b;">${this.menuNavegacaoAberto ? '▲' : '▼'}</span>
            </button>

            ${this.menuNavegacaoAberto ? html`
              <div class="nav-menu-popover" @click="${(e) => e.stopPropagation()}">
                <div class="popover-header-lbl">Navegação · Mapa de Oportunidades</div>
                ${GUIAS_MAPA.map(g => html`
                  <button
                    type="button"
                    class="nav-option-btn ${g.id === 'premissas' ? 'active' : ''}"
                    @click="${() => this.selecionarGuia(g)}">
                    <span class="nav-opt-dot"></span>
                    <div class="nav-opt-text">
                      <div class="nav-opt-title">
                        <span>${g.titulo}</span>
                        ${g.id === 'premissas' ? html`<span class="badge-atual">Atual</span>` : ''}
                      </div>
                      <div class="nav-opt-sub">${g.subtitulo}</div>
                    </div>
                  </button>
                `)}
              </div>
            ` : ''}
          </div>
        </div>

        ${this.avisoGuiaPendente ? html`
          <div class="toast-banner">
            <span>${this.avisoGuiaPendente}</span>
            <button class="toast-close" @click="${() => { this.avisoGuiaPendente = ''; this.requestUpdate(); }}">✕</button>
          </div>
        ` : ''}

        <!-- INTRODUÇÃO -->
        <div class="intro-card">
          O <strong>Mapa de Oportunidades</strong> é uma ferramenta desenvolvida para apoiar na prospecção e identificação de oportunidades de vendas, tanto em clientes quanto em novos.
        </div>

        <!-- INFORMAÇÕES GERAIS -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title-pill">INFORMAÇÕES GERAIS</h2>
            <div class="section-header-line"></div>
          </div>

          <div class="info-gerais-layout">
            <div class="info-col">
              <div class="sub-block-label">FONTES UTILIZADAS</div>
              <div class="fontes-grid">
                ${FONTES_UTILIZADAS.map(fonte => html`
                  <div class="fonte-item">
                    <span class="fonte-dot"></span>
                    <span>${fonte}</span>
                  </div>
                `)}
              </div>
            </div>

            <div class="info-divider"></div>

            <div class="info-col">
              <div class="sub-block-label">FREQUÊNCIA DE ATUALIZAÇÃO</div>
              <div class="freq-card">
                <span class="freq-value">Todo terceiro dia útil do mês.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- COMO NAVEGAR -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title-pill">COMO NAVEGAR</h2>
            <div class="section-header-line"></div>
          </div>
          <p class="nav-lead">
            No menu de navegação no cabeçalho superior (botão <strong>Guias do Painel</strong>), é possível navegar entre as páginas do dashboard. Abaixo um resumo das informações disponíveis em cada aba.
          </p>
          <div class="nav-cards-grid">
            ${GUIA_NAVEGACAO.map(item => html`
              <div class="nav-guide-card">
                <div class="ngc-title">${item.titulo}</div>
                <div class="ngc-desc">${item.desc}</div>
              </div>
            `)}
          </div>
        </div>

        <!-- CONCEITOS -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title-pill">CONCEITOS</h2>
            <div class="section-header-line"></div>
            <div class="search-conceito-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                class="search-conceito-input"
                placeholder="Buscar conceito..."
                .value="${this.termoBuscaConceito}"
                @input="${(e) => { this.termoBuscaConceito = e.target.value; this.requestUpdate(); }}"
              />
            </div>
          </div>

          <div class="conceitos-grid">
            ${conceitosFiltrados.map(c => html`
              <div class="conceito-item">
                <div class="conceito-termo">${c.termo}</div>
                <div class="conceito-desc">${c.definicao}</div>
              </div>
            `)}
          </div>
        </div>

        <!-- DEFINIÇÃO DOS ICPS -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title-pill">DEFINIÇÃO DOS ICPS</h2>
            <div class="section-header-line"></div>
          </div>
          <div class="icp-lead">A definição dos ICPs foi feita em dois momentos:</div>
          <div class="icp-grid">
            ${ETAPAS_ICP.map(etapa => html`
              <div class="icp-card">${etapa}</div>
            `)}
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, MapaOportunidadesPremissas);
