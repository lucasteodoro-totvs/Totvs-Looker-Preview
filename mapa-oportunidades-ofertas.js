/**
 * @title Mapa de Oportunidades - Panorama de Ofertas
 * @description Análise de portfólio por Curva ABC (Curvas A, B e C) com indicadores consolidados
 *              de volume, representatividade, potencial recorrente/não recorrente e matriz detalhada com rolagem.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-ofertas';

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

const CURVAS_CARDS = [
  {
    id: 'A',
    titulo: 'Curva A',
    corBadge: '#0284c7',
    bgBadge: '#e0f2fe',
    oportunidades: '2,2 Mi',
    representatividade: '60,3%',
    ofertas: '44',
    recorrente: 'R$ 3,9 Bi',
    naoRecorrente: 'R$ 9,2 Bi'
  },
  {
    id: 'B',
    titulo: 'Curva B',
    corBadge: '#7c3aed',
    bgBadge: '#f3e8ff',
    oportunidades: '1,1 Mi',
    representatividade: '30,0%',
    ofertas: '73',
    recorrente: 'R$ 1,8 Bi',
    naoRecorrente: 'R$ 25,2 Bi'
  },
  {
    id: 'C',
    titulo: 'Curva C',
    corBadge: '#475569',
    bgBadge: '#f1f5f9',
    oportunidades: '354,6 Mil',
    representatividade: '9,8%',
    ofertas: '291',
    recorrente: 'R$ 672,8 Mi',
    naoRecorrente: 'R$ 3,8 Bi'
  }
];

const OFERTAS_ABC_DATA = [
  { curva: 'A', oferta: 'TOTVS GESTAO DE RECEITA RECORRENTE', qtd: 238650, rep: 6.6, rec: 247074178, tmRec: 1035, nRec: 0, tmNRec: 0, pctBase: 3, pctNovo: 97, pctAcima: 99, pctEsperado: 1 },
  { curva: 'A', oferta: 'TOTVS TRACKING', qtd: 146729, rep: 4.0, rec: 47598888, tmRec: 324, nRec: 0, tmNRec: 0, pctBase: 7, pctNovo: 93, pctAcima: 8, pctEsperado: 92 },
  { curva: 'A', oferta: 'TOTVS PROCESSOS FISCAIS', qtd: 110996, rep: 3.1, rec: 74784676, tmRec: 674, nRec: 0, tmNRec: 0, pctBase: 8, pctNovo: 92, pctAcima: 78, pctEsperado: 22 },
  { curva: 'A', oferta: 'CHAT COMMERCE BY CHATBOT MAKER', qtd: 108059, rep: 3.0, rec: 181107014, tmRec: 1676, nRec: 0, tmNRec: 0, pctBase: 14, pctNovo: 86, pctAcima: 14, pctEsperado: 86 },
  { curva: 'A', oferta: 'TOTVS WMS', qtd: 102981, rep: 2.8, rec: 161180259, tmRec: 1565, nRec: 4507313405, tmNRec: 43768, pctBase: 9, pctNovo: 91, pctAcima: 84, pctEsperado: 16 },
  { curva: 'A', oferta: 'Roteirizacao e Entregas', qtd: 86603, rep: 2.4, rec: 216413484, tmRec: 2499, nRec: 1098813884, tmNRec: 12688, pctBase: 8, pctNovo: 92, pctAcima: 10, pctEsperado: 90 },
  { curva: 'A', oferta: 'TOTVS TEF', qtd: 68145, rep: 1.9, rec: 23874710, tmRec: 350, nRec: 0, tmNRec: 0, pctBase: 8, pctNovo: 92, pctAcima: 78, pctEsperado: 22 },
  { curva: 'A', oferta: 'INTERA BACKOFFICE: QUARTETO', qtd: 67925, rep: 1.9, rec: 166151417, tmRec: 2446, nRec: 0, tmNRec: 0, pctBase: 1, pctNovo: 99, pctAcima: 34, pctEsperado: 66 },
  { curva: 'A', oferta: 'TOTVS CLOUD STANDARD', qtd: 60944, rep: 1.7, rec: 145751688, tmRec: 2392, nRec: 0, tmNRec: 0, pctBase: 5, pctNovo: 95, pctAcima: 26, pctEsperado: 74 },
  { curva: 'A', oferta: 'INTERA BO: FISCAL + ATIVO FIXO', qtd: 58659, rep: 1.6, rec: 35915779, tmRec: 612, nRec: 0, tmNRec: 0, pctBase: 1, pctNovo: 99, pctAcima: 17, pctEsperado: 83 },
  { curva: 'A', oferta: 'TOTVS ASSINATURA ELETRONICA (TAE)', qtd: 58308, rep: 1.6, rec: 39790825, tmRec: 682, nRec: 0, tmNRec: 0, pctBase: 15, pctNovo: 85, pctAcima: 2, pctEsperado: 98 },
  { curva: 'A', oferta: 'TRANSMITE GESTAO DE DOCUMENTOS ELETRONICOS', qtd: 56412, rep: 1.6, rec: 38507254, tmRec: 683, nRec: 0, tmNRec: 0, pctBase: 4, pctNovo: 96, pctAcima: 24, pctEsperado: 76 },
  { curva: 'A', oferta: 'INTEGRADOR MARKETPLACES BY LEXOS', qtd: 52185, rep: 1.4, rec: 93723775, tmRec: 1796, nRec: 0, tmNRec: 0, pctBase: 19, pctNovo: 81, pctAcima: 30, pctEsperado: 70 },
  { curva: 'A', oferta: 'MINHA PRODUCAO', qtd: 52077, rep: 1.4, rec: 23396415, tmRec: 449, nRec: 0, tmNRec: 0, pctBase: 8, pctNovo: 92, pctAcima: 18, pctEsperado: 82 },
  { curva: 'A', oferta: 'INTERA SEGMENTOS MANUFATURA', qtd: 49895, rep: 1.4, rec: 73307720, tmRec: 1469, nRec: 0, tmNRec: 0, pctBase: 1, pctNovo: 99, pctAcima: 16, pctEsperado: 84 },
  { curva: 'A', oferta: 'SHOPIFY E-COMMERCE', qtd: 49476, rep: 1.4, rec: 237640075, tmRec: 4803, nRec: 0, tmNRec: 0, pctBase: 20, pctNovo: 80, pctAcima: 32, pctEsperado: 68 },
  { curva: 'A', oferta: 'TOTVS INTELIGENCIA TRIBUTARIA', qtd: 47096, rep: 1.3, rec: 13683804, tmRec: 291, nRec: 0, tmNRec: 0, pctBase: 4, pctNovo: 96, pctAcima: 36, pctEsperado: 64 },
  { curva: 'A', oferta: 'EXACT SALES', qtd: 43215, rep: 1.2, rec: 70505826, tmRec: 1632, nRec: 0, tmNRec: 0, pctBase: 14, pctNovo: 86, pctAcima: 33, pctEsperado: 67 },
  // Amostras representativas de Curva B e Curva C para navegação interativa
  { curva: 'B', oferta: 'TOTVS CRM AUTOMACAO FORCA DE VENDAS', qtd: 34820, rep: 1.0, rec: 62410500, tmRec: 1792, nRec: 0, tmNRec: 0, pctBase: 12, pctNovo: 88, pctAcima: 41, pctEsperado: 59 },
  { curva: 'B', oferta: 'TOTVS RH CLOCK IN', qtd: 31450, rep: 0.9, rec: 28934000, tmRec: 920, nRec: 0, tmNRec: 0, pctBase: 16, pctNovo: 84, pctAcima: 38, pctEsperado: 62 },
  { curva: 'B', oferta: 'TOTVS GESTAO DE ESTOQUES E MATERIAIS', qtd: 28910, rep: 0.8, rec: 51459800, tmRec: 1780, nRec: 842150000, tmNRec: 29130, pctBase: 11, pctNovo: 89, pctAcima: 47, pctEsperado: 53 },
  { curva: 'B', oferta: 'TOTVS BI FAST ANALYTICS', qtd: 26340, rep: 0.7, rec: 44778000, tmRec: 1700, nRec: 0, tmNRec: 0, pctBase: 18, pctNovo: 82, pctAcima: 35, pctEsperado: 65 },
  { curva: 'B', oferta: 'RD STATION MARKETING PRO', qtd: 24190, rep: 0.7, rec: 41123000, tmRec: 1700, nRec: 0, tmNRec: 0, pctBase: 21, pctNovo: 79, pctAcima: 29, pctEsperado: 71 },
  { curva: 'C', oferta: 'TOTVS CONTABILIDADE GERENCIAL', qtd: 9840, rep: 0.3, rec: 14760000, tmRec: 1500, nRec: 186960000, tmNRec: 19000, pctBase: 10, pctNovo: 90, pctAcima: 44, pctEsperado: 56 },
  { curva: 'C', oferta: 'TOTVS PORTAL DO COLABORADOR', qtd: 8420, rep: 0.2, rec: 9262000, tmRec: 1100, nRec: 0, tmNRec: 0, pctBase: 19, pctNovo: 81, pctAcima: 39, pctEsperado: 61 },
  { curva: 'C', oferta: 'TOTVS GESTAO DE CONTRATOS', qtd: 7190, rep: 0.2, rec: 11504000, tmRec: 1600, nRec: 129420000, tmNRec: 18000, pctBase: 13, pctNovo: 87, pctAcima: 42, pctEsperado: 58 },
  { curva: 'C', oferta: 'TOTVS APP MINHA GESTAO', qtd: 5830, rep: 0.2, rec: 4955500, tmRec: 850, nRec: 0, tmNRec: 0, pctBase: 15, pctNovo: 85, pctAcima: 31, pctEsperado: 69 }
];

export class MapaOportunidadesOfertas extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    avisoGuiaPendente: { type: String },
    mostrarFiltros: { type: Boolean },
    curvaSelecionada: { type: String },
    filtroDimensao: { type: String },
    buscaOferta: { type: String },
    sortField: { type: String },
    sortDir: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.avisoGuiaPendente = '';
    this.mostrarFiltros = false;
    this.curvaSelecionada = 'TODAS';
    this.filtroDimensao = 'TODAS';
    this.buscaOferta = '';
    this.sortField = 'qtd';
    this.sortDir = 'desc';

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

    if (guia.id === 'panorama-ofertas') {
      this.avisoGuiaPendente = '';
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Panorama_ofertas/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  toggleCurva(curvaId) {
    this.curvaSelecionada = this.curvaSelecionada === curvaId ? 'TODAS' : curvaId;
    this.requestUpdate();
  }

  ordenarPor(campo) {
    if (this.sortField === campo) {
      this.sortDir = this.sortDir === 'desc' ? 'asc' : 'desc';
    } else {
      this.sortField = campo;
      this.sortDir = campo === 'oferta' || campo === 'curva' ? 'asc' : 'desc';
    }
    this.requestUpdate();
  }

  formatInt(val) {
    return Math.round(Number(val) || 0).toLocaleString('pt-BR');
  }

  formatExactBRL(val) {
    const num = Math.round(Number(val) || 0);
    return `R$ ${num.toLocaleString('pt-BR')}`;
  }

  formatPct1(val) {
    return `${Number(val || 0).toFixed(1).replace('.', ',')}%`;
  }

  renderSortIndicator(field) {
    if (this.sortField !== field) return '';
    return this.sortDir === 'desc' ? ' ▼' : ' ▲';
  }

  render() {
    const termo = (this.buscaOferta || '').trim().toLowerCase();

    let linhasFiltradas = OFERTAS_ABC_DATA.filter((item) => {
      if (this.curvaSelecionada !== 'TODAS' && item.curva !== this.curvaSelecionada) {
        return false;
      }
      if (termo && !item.oferta.toLowerCase().includes(termo)) {
        return false;
      }
      return true;
    });

    linhasFiltradas = [...linhasFiltradas].sort((a, b) => {
      const f = this.sortField;
      const mult = this.sortDir === 'desc' ? -1 : 1;
      if (typeof a[f] === 'string') {
        return a[f].localeCompare(b[f], 'pt-BR') * mult;
      }
      return ((a[f] || 0) - (b[f] || 0)) * mult;
    });

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
          padding: 20px 28px 56px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* CABEÇALHO OFICIAL TOTVS */
        .hero-banner {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 18px 24px;
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

        .hero-actions {
          position: relative;
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-right: 92px;
        }

        .btn-filter-toggle {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s ease;
        }
        .btn-filter-toggle:hover {
          background: rgba(255, 255, 255, 0.26);
        }

        /* MENU RETRÁTIL DE NAVEGAÇÃO */
        .nav-menu-wrapper {
          position: relative;
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

        .nav-option-btn:hover { background: #f8fafc; }
        .nav-option-btn.active { background: #f3e8ff; border-color: #e9d5ff; }

        .nav-opt-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #cbd5e1;
          flex-shrink: 0;
        }
        .nav-option-btn.active .nav-opt-dot { background: #7c3aed; }
        .nav-opt-text { flex: 1; min-width: 0; }
        .nav-opt-title { font-size: 12.5px; font-weight: 800; color: #0f172a; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
        .nav-opt-sub { font-size: 11px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
        .badge-atual { font-size: 9.5px; font-weight: 800; background: #7c3aed; color: #ffffff; padding: 1px 6px; border-radius: 4px; text-transform: uppercase; }

        /* BARRA DE FILTROS RETRÁTIL */
        .filters-bar {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          flex-wrap: wrap;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }

        .filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
        }

        .filter-select {
          padding: 6px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          cursor: pointer;
        }

        .toast-banner {
          background: #ffffff; border: 1px solid #cbd5e1; color: #0f172a; padding: 10px 16px; border-radius: 8px;
          display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; font-weight: 700; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
        }
        .toast-close { background: transparent; border: none; color: #64748b; font-weight: 800; cursor: pointer; font-size: 13px; padding: 2px 6px; }

        /* =========================================================
           GRID DOS 3 CARDS DE CURVA (A, B, C)
           ========================================================= */
        .curvas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .curva-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .curva-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.09);
          border-color: #94a3b8;
        }

        .curva-card.selected {
          border: 2px solid #7c3aed;
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.14);
        }

        .curva-card.dimmed {
          opacity: 0.55;
        }

        .curva-card-head {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
        }

        .curva-card-title {
          font-size: 16px;
          font-weight: 900;
          color: #172e4d;
          letter-spacing: -0.2px;
        }

        .curva-badge-pill {
          position: absolute;
          right: 0;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .curva-metrics-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .curva-metric-row {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 6px 10px;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
        }

        .curva-icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          background: #f3e8ff;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .curva-metric-text {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-wrap: wrap;
        }

        .curva-metric-text strong {
          font-size: 14.5px;
          font-weight: 900;
          color: #0f172a;
        }

        /* =========================================================
           BLOCO DA TABELA CURVA ABC COM ROLAGEM HORIZONTAL E VERTICAL
           ========================================================= */
        .table-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0;
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

        .table-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .curva-pills-group {
          display: inline-flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          gap: 3px;
        }

        .curva-pill-btn {
          background: transparent;
          border: none;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .curva-pill-btn:hover {
          color: #0f172a;
        }

        .curva-pill-btn.active {
          background: #ffffff;
          color: #172e4d;
          font-weight: 800;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.1);
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input-wrap svg {
          position: absolute;
          left: 10px;
          color: #64748b;
          pointer-events: none;
        }

        .search-oferta-input {
          padding: 6px 12px 6px 30px;
          border: 1px solid #cbd5e1;
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          min-width: 250px;
          outline: none;
        }

        .search-oferta-input:focus {
          border-color: #7c3aed;
          background: #ffffff;
        }

        .count-tag {
          font-size: 11.5px;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 5px 10px;
          border-radius: 6px;
        }

        /* CONTAINER COM BARRA DE ROLAGEM HORIZONTAL E VERTICAL VISÍVEL */
        .abc-table-scroll {
          width: 100%;
          max-height: 510px;
          overflow-x: auto;
          overflow-y: auto;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
        }

        .abc-table-scroll::-webkit-scrollbar {
          width: 9px;
          height: 9px;
        }

        .abc-table-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }

        .abc-table-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 8px;
          border: 2px solid #f1f5f9;
        }

        .abc-table-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        .abc-table {
          width: 100%;
          min-width: 1360px;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 12.5px;
        }

        .abc-table thead th {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #172e4d;
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          padding: 12px 14px;
          border-bottom: 2px solid #0f172a;
          border-right: 1px solid rgba(255, 255, 255, 0.12);
          white-space: nowrap;
          cursor: pointer;
          user-select: none;
          text-align: right;
        }

        .abc-table thead th:hover {
          background: #1e3a5f;
        }

        .abc-table thead th.col-curva {
          position: sticky;
          left: 0;
          z-index: 20;
          text-align: center;
          width: 68px;
          min-width: 68px;
        }

        .abc-table thead th.col-oferta {
          position: sticky;
          left: 68px;
          z-index: 20;
          text-align: left;
          min-width: 310px;
          box-shadow: 3px 0 6px -2px rgba(15, 23, 42, 0.25);
        }

        .abc-table tbody td {
          padding: 10px 14px;
          border-bottom: 1px solid #e2e8f0;
          border-right: 1px solid #f1f5f9;
          color: #1e293b;
          white-space: nowrap;
          text-align: right;
          background: #ffffff;
        }

        .abc-table tbody tr:nth-child(even) td {
          background: #f8fafc;
        }

        .abc-table tbody tr:hover td {
          background: #f3e8ff;
        }

        .abc-table tbody td.col-curva {
          position: sticky;
          left: 0;
          z-index: 5;
          text-align: center;
          font-weight: 900;
        }

        .abc-table tbody td.col-oferta {
          position: sticky;
          left: 68px;
          z-index: 5;
          text-align: left;
          font-weight: 800;
          color: #0f172a;
          box-shadow: 3px 0 6px -3px rgba(15, 23, 42, 0.12);
        }

        .curva-letter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 900;
        }

        .curva-A {
          background: #e0f2fe;
          color: #0284c7;
        }

        .curva-B {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .curva-C {
          background: #f1f5f9;
          color: #475569;
        }

        .val-strong {
          font-weight: 800;
          color: #0f172a;
        }

        .val-muted {
          color: #94a3b8;
        }

        .empty-row {
          text-align: center !important;
          padding: 36px !important;
          color: #64748b !important;
          font-weight: 700;
        }

        @media (max-width: 1180px) {
          .curvas-grid {
            grid-template-columns: 1fr;
          }
          .hero-actions {
            margin-right: 0;
          }
        }
      </style>

      <div class="dash-container">

        <!-- CABEÇALHO OFICIAL TOTVS -->
        <div class="hero-banner">
          <div class="hero-bg-clip">
            <div class="gradient-slant"></div>
            <div class="totvs-logo-layer"></div>
          </div>

          <div class="title-area">
            <h1>MAPA DE OPORTUNIDADES</h1>
            <div class="title-sub">Panorama de Ofertas</div>
            <div class="purple-line"></div>
          </div>

          <div class="hero-actions">
            <button
              type="button"
              class="btn-filter-toggle"
              @click="${() => { this.mostrarFiltros = !this.mostrarFiltros; this.requestUpdate(); }}"
              title="Mostrar ou ocultar filtros">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Filtros</span>
            </button>

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
                  ${GUIAS_MAPA.map((g) => html`
                    <button
                      type="button"
                      class="nav-option-btn ${g.id === 'panorama-ofertas' ? 'active' : ''}"
                      @click="${() => this.selecionarGuia(g)}">
                      <span class="nav-opt-dot"></span>
                      <div class="nav-opt-text">
                        <div class="nav-opt-title">
                          <span>${g.titulo}</span>
                          ${g.id === 'panorama-ofertas' ? html`<span class="badge-atual">Atual</span>` : ''}
                        </div>
                        <div class="nav-opt-sub">${g.subtitulo}</div>
                      </div>
                    </button>
                  `)}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        ${this.mostrarFiltros ? html`
          <div class="filters-bar">
            <div class="filter-item">
              <span>Curva ABC:</span>
              <select class="filter-select" .value="${this.curvaSelecionada}" @change="${(e) => { this.curvaSelecionada = e.target.value; this.requestUpdate(); }}">
                <option value="TODAS">Todas as Curvas (A, B e C)</option>
                <option value="A">Curva A</option>
                <option value="B">Curva B</option>
                <option value="C">Curva C</option>
              </select>
            </div>
            <div class="filter-item">
              <span>Dimensão:</span>
              <select class="filter-select" .value="${this.filtroDimensao}" @change="${(e) => { this.filtroDimensao = e.target.value; this.requestUpdate(); }}">
                <option value="TODAS">Gestão + Digital Commerce</option>
                <option value="GESTAO">Gestão</option>
                <option value="DC">Digital Commerce (DC+RD)</option>
              </select>
            </div>
          </div>
        ` : ''}

        ${this.avisoGuiaPendente ? html`
          <div class="toast-banner">
            <span>${this.avisoGuiaPendente}</span>
            <button class="toast-close" @click="${() => { this.avisoGuiaPendente = ''; this.requestUpdate(); }}">✕</button>
          </div>
        ` : ''}

        <!-- BLOCO 1: CARDS DE CURVA A, CURVA B E CURVA C -->
        <div class="curvas-grid">
          ${CURVAS_CARDS.map((card) => {
            const isSelected = this.curvaSelecionada === card.id;
            const isDimmed = this.curvaSelecionada !== 'TODAS' && !isSelected;

            return html`
              <div
                class="curva-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
                @click="${() => this.toggleCurva(card.id)}"
                title="Clique para filtrar ofertas da ${card.titulo}">
                <div class="curva-card-head">
                  <span class="curva-card-title">${card.titulo}</span>
                  <span class="curva-badge-pill" style="background: ${card.bgBadge}; color: ${card.corBadge};">
                    ${card.representatividade}
                  </span>
                </div>

                <div class="curva-metrics-list">
                  <!-- Oportunidades -->
                  <div class="curva-metric-row">
                    <div class="curva-icon-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                    <div class="curva-metric-text">
                      <span>Oportunidades</span>
                      <strong>${card.oportunidades}</strong>
                    </div>
                  </div>

                  <!-- Representatividade -->
                  <div class="curva-metric-row">
                    <div class="curva-icon-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="5" x2="5" y2="19"></line>
                        <circle cx="6.5" cy="6.5" r="2.5"></circle>
                        <circle cx="17.5" cy="17.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <div class="curva-metric-text">
                      <span>Representatividade</span>
                      <strong>${card.representatividade}</strong>
                    </div>
                  </div>

                  <!-- Ofertas -->
                  <div class="curva-metric-row">
                    <div class="curva-icon-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <div class="curva-metric-text">
                      <span>Ofertas</span>
                      <strong>${card.ofertas}</strong>
                    </div>
                  </div>

                  <!-- R$ Recorrente -->
                  <div class="curva-metric-row">
                    <div class="curva-icon-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                      </svg>
                    </div>
                    <div class="curva-metric-text">
                      <span>R$ Recorrente</span>
                      <strong>${card.recorrente}</strong>
                    </div>
                  </div>

                  <!-- R$ Não Recorrente -->
                  <div class="curva-metric-row">
                    <div class="curva-icon-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div class="curva-metric-text">
                      <span>R$ Não Recorrente</span>
                      <strong>${card.naoRecorrente}</strong>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>

        <!-- BLOCO 2: TABELA DETALHADA CURVA ABC -->
        <div class="table-card">
          <div class="section-header" style="margin-bottom: 4px;">
            <h2 class="section-title-pill">CURVA ABC</h2>
            <div class="section-header-line"></div>
          </div>

          <div class="table-toolbar">
            <div class="curva-pills-group">
              ${[
                { id: 'TODAS', label: 'Todas' },
                { id: 'A', label: 'Curva A' },
                { id: 'B', label: 'Curva B' },
                { id: 'C', label: 'Curva C' }
              ].map((tab) => html`
                <button
                  type="button"
                  class="curva-pill-btn ${this.curvaSelecionada === tab.id ? 'active' : ''}"
                  @click="${() => { this.curvaSelecionada = tab.id; this.requestUpdate(); }}">
                  ${tab.label}
                </button>
              `)}
            </div>

            <div class="toolbar-right">
              <div class="search-input-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  class="search-oferta-input"
                  placeholder="Buscar oferta..."
                  .value="${this.buscaOferta}"
                  @input="${(e) => { this.buscaOferta = e.target.value; this.requestUpdate(); }}"
                />
              </div>
              <span class="count-tag">${linhasFiltradas.length} ofertas</span>
            </div>
          </div>

          <div class="abc-table-scroll">
            <table class="abc-table">
              <thead>
                <tr>
                  <th class="col-curva" @click="${() => this.ordenarPor('curva')}">Curva${this.renderSortIndicator('curva')}</th>
                  <th class="col-oferta" @click="${() => this.ordenarPor('oferta')}">Oportunidade${this.renderSortIndicator('oferta')}</th>
                  <th @click="${() => this.ordenarPor('qtd')}">Qtd${this.renderSortIndicator('qtd')}</th>
                  <th @click="${() => this.ordenarPor('rep')}">% Rep.${this.renderSortIndicator('rep')}</th>
                  <th @click="${() => this.ordenarPor('rec')}">Recorrente (R$)${this.renderSortIndicator('rec')}</th>
                  <th @click="${() => this.ordenarPor('tmRec')}">TM Recorrente (R$)${this.renderSortIndicator('tmRec')}</th>
                  <th @click="${() => this.ordenarPor('nRec')}">Não Recorrente (R$)${this.renderSortIndicator('nRec')}</th>
                  <th @click="${() => this.ordenarPor('tmNRec')}">TM Não Recorrente (R$)${this.renderSortIndicator('tmNRec')}</th>
                  <th @click="${() => this.ordenarPor('pctBase')}">% Qtd Base${this.renderSortIndicator('pctBase')}</th>
                  <th @click="${() => this.ordenarPor('pctNovo')}">% Qtd Novo${this.renderSortIndicator('pctNovo')}</th>
                  <th @click="${() => this.ordenarPor('pctAcima')}">% Qtd Acima${this.renderSortIndicator('pctAcima')}</th>
                  <th @click="${() => this.ordenarPor('pctEsperado')}">% Qtd Esperado${this.renderSortIndicator('pctEsperado')}</th>
                </tr>
              </thead>
              <tbody>
                ${linhasFiltradas.length === 0 ? html`
                  <tr>
                    <td colspan="12" class="empty-row">Nenhuma oferta encontrada para o filtro selecionado.</td>
                  </tr>
                ` : linhasFiltradas.map((row) => html`
                  <tr>
                    <td class="col-curva">
                      <span class="curva-letter curva-${row.curva}">${row.curva}</span>
                    </td>
                    <td class="col-oferta">${row.oferta}</td>
                    <td class="val-strong">${this.formatInt(row.qtd)}</td>
                    <td>${this.formatPct1(row.rep)}</td>
                    <td class="val-strong">${this.formatExactBRL(row.rec)}</td>
                    <td>${this.formatExactBRL(row.tmRec)}</td>
                    <td class="${row.nRec > 0 ? 'val-strong' : 'val-muted'}">${this.formatExactBRL(row.nRec)}</td>
                    <td class="${row.tmNRec > 0 ? '' : 'val-muted'}">${this.formatExactBRL(row.tmNRec)}</td>
                    <td>${row.pctBase}%</td>
                    <td>${row.pctNovo}%</td>
                    <td>${row.pctAcima}%</td>
                    <td>${row.pctEsperado}%</td>
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

customElements.define(elementName, MapaOportunidadesOfertas);
