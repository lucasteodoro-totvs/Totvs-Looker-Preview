/**
 * @title Mapa de Oportunidades - Panorama de Oportunidades
 * @description Visão consolidada de Big Numbers (Total, Base, Novos) com abertura por tipo de receita,
 *              gráfico de rosca com porcentagens e legenda integradas via linhas de chamada e análise por ICP.
 */

import { LitElement, html, svg } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-panorama';

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

const MOCK_CARDS = [
  {
    key: 'total',
    titulo: 'Total de Oportunidades',
    subtitulo: 'Quantidade',
    qtd: '4,0 Mi',
    tags: [],
    recorrente: {
      valor: 'R$ 7,4 Bi',
      repr: null,
      gestao: 91,
      dc: 9
    },
    naoRecorrente: {
      valor: 'R$ 38,8 Bi',
      repr: null,
      gestao: 100,
      dc: 0
    }
  },
  {
    key: 'base',
    titulo: 'Oportunidades na Base',
    subtitulo: 'Quantidade',
    qtd: '368,6 Mil',
    tags: ['9% Repr.', '23% Dormente'],
    recorrente: {
      valor: 'R$ 659,3 Mi',
      repr: '9% Repr.',
      gestao: 83,
      dc: 17
    },
    naoRecorrente: {
      valor: 'R$ 4,5 Bi',
      repr: '12% Repr.',
      gestao: 100,
      dc: 0
    }
  },
  {
    key: 'novos',
    titulo: 'Oportunidades em Novos',
    subtitulo: 'Quantidade',
    qtd: '3,7 Mi',
    tags: ['91% Repr.'],
    recorrente: {
      valor: 'R$ 6,7 Bi',
      repr: '91% Repr.',
      gestao: 92,
      dc: 8
    },
    naoRecorrente: {
      valor: 'R$ 34,3 Bi',
      repr: '88% Repr.',
      gestao: 100,
      dc: 0
    }
  }
];

const MOCK_ICPS = [
  {
    titulo: 'Performance Acima do Esperado',
    tipoIcone: 'up',
    qtd: '1,7 Mi',
    rep: '42%',
    rec: 'R$ 2,8 Bi',
    nrec: 'R$ 20,8 Bi',
    bars: {
      qtd: { gestaoBase: 8, gestaoNovo: 92, dcBase: 24, dcNovo: 76 },
      rec: { gestaoBase: 8, gestaoNovo: 92, dcBase: 24, dcNovo: 76 },
      nrec: { gestaoBase: 11, gestaoNovo: 89, dcBase: 0, dcNovo: 0 }
    }
  },
  {
    titulo: 'Performance Esperada',
    tipoIcone: 'fit',
    qtd: '2,3 Mi',
    rep: '58%',
    rec: 'R$ 4,6 Bi',
    nrec: 'R$ 18,0 Bi',
    bars: {
      qtd: { gestaoBase: 9, gestaoNovo: 91, dcBase: 14, dcNovo: 86 },
      rec: { gestaoBase: 8, gestaoNovo: 92, dcBase: 14, dcNovo: 86 },
      nrec: { gestaoBase: 12, gestaoNovo: 88, dcBase: 0, dcNovo: 0 }
    }
  }
];

export class MapaOportunidadesPanorama extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    avisoGuiaPendente: { type: String },
    mostrarFiltros: { type: Boolean },
    filtroSegmento: { type: String },
    filtroCanal: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.avisoGuiaPendente = '';
    this.mostrarFiltros = false;
    this.filtroSegmento = 'TODOS';
    this.filtroCanal = 'TODOS';

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

    if (guia.id === 'panorama-oportunidades') {
      this.avisoGuiaPendente = '';
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Panorama_oportunidades/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  /* Gráfico de Rosca com Fatias, Linhas de Chamada, Legenda e Percentuais Integrados */
  renderDonutCallout(pctGestao, pctDc) {
    const cx = 118;
    const cy = 58;
    const r = 27;
    const strokeW = 13;
    const rOuter = r + strokeW / 2;
    const rElbow = rOuter + 9;
    const horizLen = 13;
    const c = 2 * Math.PI * r;

    const slices = [];
    if (pctDc > 0) {
      slices.push({ label: 'DC+RD', pct: pctDc, color: '#7c3aed' });
    }
    if (pctGestao > 0) {
      slices.push({ label: 'Gestão', pct: pctGestao, color: '#0ea5e9' });
    }

    let curDeg = -90.0;
    const arcs = [];
    const callouts = [];

    slices.forEach((s) => {
      const sweep = (s.pct / 100) * 360;
      const dash = (s.pct / 100) * c;
      const offset = -((curDeg + 90) / 360) * c;

      arcs.push(svg`
        <circle
          cx="${cx}"
          cy="${cy}"
          r="${r}"
          fill="none"
          stroke="${s.color}"
          stroke-width="${strokeW}"
          stroke-dasharray="${dash.toFixed(2)} ${c.toFixed(2)}"
          stroke-dashoffset="${offset.toFixed(2)}"
          transform="rotate(-90 ${cx} ${cy})"
        />
      `);

      const midDeg = s.pct === 100 ? 45 : curDeg + sweep / 2;
      const rad = (midDeg * Math.PI) / 180;
      const cosA = Math.cos(rad);
      const sinA = Math.sin(rad);

      const x1 = cx + rOuter * cosA;
      const y1 = cy + rOuter * sinA;
      const x2 = cx + rElbow * cosA;
      const y2 = cy + rElbow * sinA;

      const isRight = cosA >= -0.05;
      const x3 = x2 + (isRight ? horizLen : -horizLen);
      const y3 = y2;

      const textX = x3 + (isRight ? 6 : -6);
      const anchor = isRight ? 'start' : 'end';

      callouts.push(svg`
        <polyline
          points="${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)}"
          fill="none"
          stroke="#94a3b8"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="${x3.toFixed(1)}" cy="${y3.toFixed(1)}" r="3" fill="${s.color}" />
        <text
          x="${textX.toFixed(1)}"
          y="${(y3 - 1.5).toFixed(1)}"
          text-anchor="${anchor}"
          font-size="9.5"
          font-weight="800"
          fill="#475569">
          ${s.label}
        </text>
        <text
          x="${textX.toFixed(1)}"
          y="${(y3 + 9.5).toFixed(1)}"
          text-anchor="${anchor}"
          font-size="11.5"
          font-weight="900"
          fill="${s.color}">
          ${s.pct}%
        </text>
      `);

      curDeg += sweep;
    });

    return html`
      <div class="donut-callout-box">
        <svg viewBox="0 0 236 118" width="236" height="118">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="${strokeW}" />
          ${arcs}
          ${callouts}
        </svg>
      </div>
    `;
  }

  /* Barra 100% Empilhada Horizontal (Base vs Novo) */
  renderBarraIcp(pctBase, pctNovo) {
    const semDados = pctBase === 0 && pctNovo === 0;
    return html`
      <div class="stacked-bar-wrapper">
        ${semDados ? html`
          <div class="bar-empty">Sem potencial não recorrente</div>
        ` : html`
          ${pctBase > 0 ? html`
            <div class="bar-seg" style="width: ${pctBase}%; background: #0ea5e9;" title="Base: ${pctBase}%">
              ${pctBase >= 18 ? html`<span class="bar-text">${pctBase}%</span>` : ''}
            </div>
          ` : ''}
          ${pctNovo > 0 ? html`
            <div class="bar-seg" style="width: ${pctNovo}%; background: #7c3aed;" title="Novo: ${pctNovo}%">
              ${pctNovo >= 18 ? html`<span class="bar-text">${pctNovo}%</span>` : ''}
            </div>
          ` : ''}
        `}
      </div>
    `;
  }

  render() {
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
           GRID DOS 3 CARDS SUPERIORES (ALTURAS 100% UNIFORMES)
           ========================================================= */
        .top-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .summary-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 22px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: grid;
          grid-template-rows: 144px 142px 142px;
          gap: 14px;
        }

        .sc-top-kpi {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 5px;
          height: 100%;
        }

        .sc-title {
          font-size: 14.5px;
          font-weight: 900;
          color: #172e4d;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .sc-subtitle {
          font-size: 11.5px;
          color: #64748b;
          font-weight: 700;
        }

        .sc-qtd-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 2px 0;
        }

        .sc-qtd-val {
          font-size: 30px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.6px;
          line-height: 1.1;
        }

        .sc-tags-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          min-height: 24px;
        }

        .sc-tags-row.empty {
          visibility: hidden;
        }

        .sc-tag-pill {
          font-size: 11px;
          font-weight: 800;
          color: #334155;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 2px 10px;
          border-radius: 999px;
        }

        .sc-tag-pill.alert {
          color: #6d28d9;
          background: #f3e8ff;
          border-color: #d8b4fe;
        }

        /* BLOCOS DE RECEITA (RECORRENTE / NÃO RECORRENTE) COM ROSCA E CALLOUTS */
        .sc-metric-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 14px 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          height: 100%;
        }

        .sc-metric-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          min-width: 0;
        }

        .sc-metric-label {
          font-size: 11.5px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .sc-metric-val {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.4px;
          line-height: 1.15;
        }

        .sc-metric-repr {
          display: inline-block;
          align-self: flex-start;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 2px 8px;
          border-radius: 5px;
        }

        .donut-callout-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* =========================================================
           SEÇÃO: OPORTUNIDADES POR ICP
           ========================================================= */
        .icp-container {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 24px 28px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 22px;
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

        .icp-row {
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
          align-items: stretch;
        }

        .icp-row:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .icp-summary-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }

        .icp-title {
          font-size: 13px;
          font-weight: 900;
          color: #172e4d;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }

        .icp-main-metric-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-radius: 12px;
          padding: 8px 16px 8px 8px;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.08); /* Brilho azul translúcido sutil */
          border: 1px solid rgba(14, 165, 233, 0.15);
        }

        .icp-main-metric-box.fit {
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.08); /* Brilho roxo translúcido sutil */
          border-color: rgba(124, 58, 237, 0.15);
        }

        .icp-icon-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icp-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #e0f2fe;
          color: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icp-main-metric-box.fit .icp-icon-box {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .icp-qtd-val {
          font-size: 24px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.5px;
        }

        .icp-rep-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .icp-rep-val {
          font-weight: 800;
          color: #002b49;
          font-size: 14px;
        }

        .icp-finance-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
        }

        .icp-fin-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .icp-fin-lbl {
          font-size: 11px;
          color: #64748b;
          font-weight: 700;
        }

        .icp-fin-val {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
        }

        /* BARRAS EMPILHADAS ICP */
        .icp-charts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .icp-bar-group {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }

        .icp-chart-title {
          font-size: 12px;
          font-weight: 800;
          color: #172e4d;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          text-align: center;
        }

        .icp-bars-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .icp-bar-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icp-bar-label {
          width: 48px;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .stacked-bar-wrapper {
          flex: 1;
          height: 22px;
          background: #e2e8f0;
          border-radius: 6px;
          display: flex;
          overflow: hidden;
        }

        .bar-seg {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s ease;
        }

        .bar-text {
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
        }

        .bar-empty {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10.5px;
          font-weight: 700;
          color: #64748b;
        }

        .icp-legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding-top: 8px;
          border-top: 1px solid #e2e8f0;
          font-size: 10.5px;
          font-weight: 800;
          color: #475569;
        }

        .icp-leg-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        @media (max-width: 1320px) {
          .top-cards-grid {
            grid-template-columns: 1fr;
          }
          .summary-card {
            grid-template-rows: auto;
          }
          .icp-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .icp-charts-grid {
            grid-template-columns: 1fr;
          }
          .hero-actions {
            margin-right: 0;
          }
        }
      </style>

      <div class="dash-container">

        <!-- CABEÇALHO -->
        <div class="hero-banner">
          <div class="hero-bg-clip">
            <div class="gradient-slant"></div>
            <div class="totvs-logo-layer"></div>
          </div>

          <div class="title-area">
            <h1>MAPA DE OPORTUNIDADES</h1>
            <div class="title-sub">Panorama de Oportunidades</div>
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
                      class="nav-option-btn ${g.id === 'panorama-oportunidades' ? 'active' : ''}"
                      @click="${() => this.selecionarGuia(g)}">
                      <span class="nav-opt-dot"></span>
                      <div class="nav-opt-text">
                        <div class="nav-opt-title">
                          <span>${g.titulo}</span>
                          ${g.id === 'panorama-oportunidades' ? html`<span class="badge-atual">Atual</span>` : ''}
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
              <span>Segmento:</span>
              <select class="filter-select" .value="${this.filtroSegmento}" @change="${(e) => { this.filtroSegmento = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos os Segmentos</option>
                <option value="MANUFATURA">Manufatura</option>
                <option value="SERVICOS">Serviços</option>
                <option value="VAREJO">Varejo</option>
                <option value="AGROINDUSTRIA">Agroindústria</option>
              </select>
            </div>
            <div class="filter-item">
              <span>Tipo de Unidade:</span>
              <select class="filter-select" .value="${this.filtroCanal}" @change="${(e) => { this.filtroCanal = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos os Canais</option>
                <option value="FILIAIS">Filiais</option>
                <option value="FRANQUIAS">Franquias</option>
                <option value="VERTICAIS">Verticais</option>
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

        <!-- GRID DOS 3 CARDS SUPERIORES -->
        <div class="top-cards-grid">
          ${MOCK_CARDS.map((card) => html`
            <div class="summary-card">
              <!-- Bloco Quantidade (Mesma altura e alinhamento nos 3 cards) -->
              <div class="sc-top-kpi">
                <div class="sc-title">${card.titulo}</div>
                <div class="sc-subtitle">${card.subtitulo}</div>
                <div class="sc-qtd-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <div class="sc-qtd-val">${card.qtd}</div>
                </div>
                <div class="sc-tags-row ${card.tags.length === 0 ? 'empty' : ''}">
                  ${card.tags.length > 0
                    ? card.tags.map((t) => html`
                        <span class="sc-tag-pill ${t.includes('Dormente') ? 'alert' : ''}">${t}</span>
                      `)
                    : html`<span class="sc-tag-pill">100%</span>`}
                </div>
              </div>

              <!-- Bloco Recorrente (R$) -->
              <div class="sc-metric-panel">
                <div class="sc-metric-left">
                  <div class="sc-metric-label">Recorrente (R$)</div>
                  <div class="sc-metric-val">${card.recorrente.valor}</div>
                  ${card.recorrente.repr ? html`<span class="sc-metric-repr">${card.recorrente.repr}</span>` : ''}
                </div>
                ${this.renderDonutCallout(card.recorrente.gestao, card.recorrente.dc)}
              </div>

              <!-- Bloco Não Recorrente (R$) -->
              <div class="sc-metric-panel">
                <div class="sc-metric-left">
                  <div class="sc-metric-label">Não Recorrente (R$)</div>
                  <div class="sc-metric-val">${card.naoRecorrente.valor}</div>
                  ${card.naoRecorrente.repr ? html`<span class="sc-metric-repr">${card.naoRecorrente.repr}</span>` : ''}
                </div>
                ${this.renderDonutCallout(card.naoRecorrente.gestao, card.naoRecorrente.dc)}
              </div>
            </div>
          `)}
        </div>

        <!-- OPORTUNIDADES POR ICP -->
        <div class="icp-container">
          <div class="section-header">
            <h2 class="section-title-pill">OPORTUNIDADES POR ICP</h2>
            <div class="section-header-line"></div>
          </div>

          ${MOCK_ICPS.map((icp) => html`
            <div class="icp-row">
              <!-- Resumo ICP -->
              <div class="icp-summary-card">
                <div class="icp-title">${icp.titulo}</div>
                <div class="icp-main-metric-box ${icp.tipoIcone === 'fit' ? 'fit' : ''}">
                  <div class="icp-icon-group">
                    <div class="icp-icon-box">
                      ${icp.tipoIcone === 'up' ? html`
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      ` : html`
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="6"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                      `}
                    </div>
                    <div class="icp-qtd-val">${icp.qtd}</div>
                  </div>
                  <div class="icp-rep-badge">
                    <span>% Rep.</span>
                    <span class="icp-rep-val">(${icp.rep})</span>
                  </div>
                </div>

                <div class="icp-finance-row">
                  <div class="icp-fin-item">
                    <span class="icp-fin-lbl">R$ Rec.</span>
                    <span class="icp-fin-val">${icp.rec}</span>
                  </div>
                  <div class="icp-fin-item">
                    <span class="icp-fin-lbl">R$ Não Rec.</span>
                    <span class="icp-fin-val">${icp.nrec}</span>
                  </div>
                </div>
              </div>

              <!-- Barras ICP -->
              <div class="icp-charts-grid">
                <!-- QTD -->
                <div class="icp-bar-group">
                  <div class="icp-chart-title">Quantidade</div>
                  <div class="icp-bars-stack">
                    <div class="icp-bar-row">
                      <span class="icp-bar-label">GESTÃO</span>
                      ${this.renderBarraIcp(icp.bars.qtd.gestaoBase, icp.bars.qtd.gestaoNovo)}
                    </div>
                    <div class="icp-bar-row">
                      <span class="icp-bar-label">DC+RD</span>
                      ${this.renderBarraIcp(icp.bars.qtd.dcBase, icp.bars.qtd.dcNovo)}
                    </div>
                  </div>
                  <div class="icp-legend">
                    <span class="icp-leg-item"><span class="legend-dot" style="background: #0ea5e9;"></span> BASE</span>
                    <span class="icp-leg-item"><span class="legend-dot" style="background: #7c3aed;"></span> NOVO</span>
                  </div>
                </div>

                <!-- REC -->
                <div class="icp-bar-group">
                  <div class="icp-chart-title">Potencial Recorrente</div>
                  <div class="icp-bars-stack">
                    <div class="icp-bar-row">
                      <span class="icp-bar-label">GESTÃO</span>
                      ${this.renderBarraIcp(icp.bars.rec.gestaoBase, icp.bars.rec.gestaoNovo)}
                    </div>
                    <div class="icp-bar-row">
                      <span class="icp-bar-label">DC+RD</span>
                      ${this.renderBarraIcp(icp.bars.rec.dcBase, icp.bars.rec.dcNovo)}
                    </div>
                  </div>
                  <div class="icp-legend">
                    <span class="icp-leg-item"><span class="legend-dot" style="background: #0ea5e9;"></span> BASE</span>
                    <span class="icp-leg-item"><span class="legend-dot" style="background: #7c3aed;"></span> NOVO</span>
                  </div>
                </div>

                <!-- NÃO REC -->
                <div class="icp-bar-group">
                  <div class="icp-chart-title">Potencial Não Recorrente</div>
                  <div class="icp-bars-stack">
                    <div class="icp-bar-row">
                      <span class="icp-bar-label">GESTÃO</span>
                      ${this.renderBarraIcp(icp.bars.nrec.gestaoBase, icp.bars.nrec.gestaoNovo)}
                    </div>
                    <div class="icp-bar-row">
                      <span class="icp-bar-label">DC+RD</span>
                      ${this.renderBarraIcp(icp.bars.nrec.dcBase, icp.bars.nrec.dcNovo)}
                    </div>
                  </div>
                  <div class="icp-legend">
                    <span class="icp-leg-item"><span class="legend-dot" style="background: #0ea5e9;"></span> BASE</span>
                    <span class="icp-leg-item"><span class="legend-dot" style="background: #7c3aed;"></span> NOVO</span>
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

customElements.define(elementName, MapaOportunidadesPanorama);
