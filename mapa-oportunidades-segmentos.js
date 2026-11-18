/**
 * @title Mapa de Oportunidades - Panorama de Segmentos
 * @description Distribuição de oportunidades por segmento (Base vs Novo), pirâmide por faixa de faturamento,
 *              resumo consolidado por ICP e Dimensão, pódio de Top Subsegmentos e visão completa integrada
 *              de Oportunidades por Subsegmentos.
 */

import { LitElement, html, svg } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-segmentos';

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

const SEGMENTOS_DATA = [
  {
    id: 'MANUFATURA',
    nome: 'MANUFATURA',
    labelCurto: 'MANUFATURA',
    total: 1318176,
    base: 148147,
    novo: 1170029,
    icpAcimaPct: 45,
    gestaoPct: 94,
    faixas: [66400, 126600, 848900, 1800000, 1100000, 4100]
  },
  {
    id: 'VAREJO',
    nome: 'VAREJO',
    labelCurto: 'VAREJO',
    total: 926465,
    base: 65977,
    novo: 860488,
    icpAcimaPct: 41,
    gestaoPct: 89,
    faixas: [14200, 28400, 192000, 418000, 272800, 1065]
  },
  {
    id: 'SERVICOS',
    nome: 'SERVICOS',
    labelCurto: 'SERVICOS',
    total: 633084,
    base: 44829,
    novo: 588255,
    icpAcimaPct: 44,
    gestaoPct: 93,
    faixas: [11500, 21800, 138400, 284000, 176600, 784]
  },
  {
    id: 'LOGISTICA',
    nome: 'LOGISTICA',
    labelCurto: 'LOGISTICA',
    total: 393362,
    base: 24677,
    novo: 368685,
    icpAcimaPct: 39,
    gestaoPct: 95,
    faixas: [6800, 14200, 88500, 176000, 107400, 462]
  },
  {
    id: 'CONSTRUCAO E PROJETOS',
    nome: 'CONSTRUCAO E PROJETOS',
    labelCurto: 'CONSTRUCAO E P...',
    total: 328285,
    base: 16884,
    novo: 311401,
    icpAcimaPct: 40,
    gestaoPct: 96,
    faixas: [5400, 11900, 74200, 148000, 88400, 385]
  },
  {
    id: 'DISTRIBUICAO',
    nome: 'DISTRIBUICAO',
    labelCurto: 'DISTRIBUICAO',
    total: 254620,
    base: 38890,
    novo: 215730,
    icpAcimaPct: 43,
    gestaoPct: 91,
    faixas: [4900, 9800, 58400, 114000, 67200, 320]
  },
  {
    id: 'EDUCACIONAL',
    nome: 'EDUCACIONAL',
    labelCurto: 'EDUCACIONAL',
    total: 75242,
    base: 6420,
    novo: 68822,
    icpAcimaPct: 38,
    gestaoPct: 92,
    faixas: [1400, 3100, 17800, 33500, 19300, 142]
  },
  {
    id: 'AGROINDUSTRIA',
    nome: 'AGROINDUSTRIA',
    labelCurto: 'AGROINDUSTRIA',
    total: 46051,
    base: 4180,
    novo: 41871,
    icpAcimaPct: 46,
    gestaoPct: 97,
    faixas: [1900, 3600, 12400, 18900, 9150, 101]
  },
  {
    id: 'SAUDE',
    nome: 'SAUDE',
    labelCurto: 'SAUDE',
    total: 35210,
    base: 3120,
    novo: 32090,
    icpAcimaPct: 41,
    gestaoPct: 94,
    faixas: [1200, 2400, 9100, 14800, 7620, 90]
  },
  {
    id: 'HOSPITALITY',
    nome: 'HOSPITALITY',
    labelCurto: 'HOSPITALITY',
    total: 8616,
    base: 1450,
    novo: 7166,
    icpAcimaPct: 35,
    gestaoPct: 90,
    faixas: [210, 480, 2100, 3650, 2140, 36]
  },
  {
    id: 'JURIDICO',
    nome: 'JURIDICO',
    labelCurto: 'JURIDICO',
    total: 3163,
    base: 480,
    novo: 2683,
    icpAcimaPct: 37,
    gestaoPct: 95,
    faixas: [90, 220, 780, 1340, 715, 18]
  }
];

const FAIXAS_GLOBAL = [
  { label: '+1B', valorFmt: '66,4 Mil', valorNum: 66400, cor: '#0369a1' },
  { label: 'De 300M a 1B', valorFmt: '126,6 Mil', valorNum: 126600, cor: '#0284c7' },
  { label: 'De 30M a 300M', valorFmt: '848,9 Mil', valorNum: 848900, cor: '#0ea5e9' },
  { label: 'De 4.8M a 30M', valorFmt: '1,8 Mi', valorNum: 1800000, cor: '#2596be' },
  { label: 'Até 4.8M', valorFmt: '1,1 Mi', valorNum: 1100000, cor: '#38bdf8' },
  { label: 'Sem Informação', valorFmt: '4,1 Mil', valorNum: 4100, cor: '#0284c7' }
];

/* Pódio global consolidado por subsegmento (conforme imagem de referência) */
const PODIO_GLOBAL = [
  { nome: 'BENS DE CAPITAL', nomeCurto: 'BENS DE CAPITAL', segmento: 'MANUFATURA', qtd: 362672, valorFmt: '363 Mil' },
  { nome: 'ATACADISTA E DISTRIBUIDOR', nomeCurto: 'ATACADISTA E...', segmento: 'DISTRIBUICAO', qtd: 283120, valorFmt: '283 Mil' },
  { nome: 'BENS DE CONSUMO', nomeCurto: 'BENS DE CONSUMO', segmento: 'MANUFATURA', qtd: 280034, valorFmt: '280 Mil' }
];

/* Tabela completa de Oportunidades por Subsegmentos (dados fiéis às imagens de referência) */
const SUBSEGMENTOS_TABELA = [
  { segmento: 'MANUFATURA', subsegmento: 'BENS DE CAPITAL', qtd: 362672, rec: 657580452, tmRec: 1813, nRec: 4276362695, tmNRec: 11791 },
  { segmento: 'MANUFATURA', subsegmento: 'BENS DE CONSUMO', qtd: 280034, rec: 536457221, tmRec: 1916, nRec: 9798421305, tmNRec: 34990 },
  { segmento: 'LOGISTICA', subsegmento: 'TRANSPORTADOR', qtd: 237763, rec: 390624456, tmRec: 1643, nRec: 2601547285, tmNRec: 10942 },
  { segmento: 'MANUFATURA', subsegmento: 'EXTRATIVISTA & BENEFICIAMENTO', qtd: 214866, rec: 336561369, tmRec: 1566, nRec: 2863580718, tmNRec: 13327 },
  { segmento: 'VAREJO', subsegmento: 'VAREJO', qtd: 211096, rec: 531628084, tmRec: 2518, nRec: 634391246, tmNRec: 3005 },
  { segmento: 'MANUFATURA', subsegmento: 'METAL-MECANICO & PLASTICO', qtd: 199195, rec: 323405518, tmRec: 1624, nRec: 2542455220, tmNRec: 12764 },
  { segmento: 'VAREJO', subsegmento: 'SUPERMERCADO', qtd: 194154, rec: 214840382, tmRec: 1107, nRec: 489317963, tmNRec: 2520 },
  { segmento: 'VAREJO', subsegmento: 'MATERIAL DE CONSTRUCAO', qtd: 167187, rec: 264688865, tmRec: 1583, nRec: 798303692, tmNRec: 4775 },
  { segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'CONSTRUTORAS', qtd: 157394, rec: 267263462, tmRec: 1698, nRec: 691927611, tmNRec: 4396 },
  { segmento: 'VAREJO', subsegmento: 'CONCESSIONARIA DE VEICULOS', qtd: 156371, rec: 309394189, tmRec: 1979, nRec: 2183016908, tmNRec: 13960 },
  { segmento: 'DISTRIBUICAO', subsegmento: 'ATACADISTA E DISTRIBUIDOR', qtd: 137143, rec: 192095000, tmRec: 1401, nRec: 897709174, tmNRec: 6546 },
  { segmento: 'LOGISTICA', subsegmento: 'ATACADISTA E DISTRIBUIDOR', qtd: 133637, rec: 210806228, tmRec: 1577, nRec: 2372373798, tmNRec: 17752 },
  { segmento: 'MANUFATURA', subsegmento: 'BENS DURAVEIS', qtd: 132887, rec: 254556842, tmRec: 1916, nRec: 1783147505, tmNRec: 13419 },
  { segmento: 'MANUFATURA', subsegmento: 'QUIMICA & RECICLAGEM', qtd: 115618, rec: 192001428, tmRec: 1661, nRec: 1543279396, tmNRec: 13348 },
  { segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'INCORPORADORAS', qtd: 110173, rec: 199832508, tmRec: 1814, nRec: 153558570, tmNRec: 1394 },
  { segmento: 'VAREJO', subsegmento: 'MAGAZINE E LOJA DE DEPARTAMENTOS', qtd: 107193, rec: 212909628, tmRec: 1986, nRec: 366370127, tmNRec: 3418 },
  { segmento: 'MANUFATURA', subsegmento: 'TEXTIL & VESTUARIO', qtd: 94877, rec: 183071814, tmRec: 1930, nRec: 718863630, tmNRec: 7577 },
  { segmento: 'MANUFATURA', subsegmento: 'PAPEL & CELULOSE', qtd: 76713, rec: 137342847, tmRec: 1790, nRec: 859121090, tmNRec: 11199 },
  { segmento: 'VAREJO', subsegmento: 'MODA', qtd: 60039, rec: 95330700, tmRec: 1588, nRec: 77195329, tmNRec: 1286 },
  { segmento: 'EDUCACIONAL', subsegmento: 'BASICO', qtd: 42002, rec: 73167789, tmRec: 1742, nRec: 173835455, tmNRec: 4139 },
  { segmento: 'VAREJO', subsegmento: 'DROGARIA', qtd: 38354, rec: 51131172, tmRec: 1333, nRec: 34724305, tmNRec: 905 },
  { segmento: 'LOGISTICA', subsegmento: 'OPERADOR LOGISTICO', qtd: 29230, rec: 55153177, tmRec: 1887, nRec: 344535548, tmNRec: 11787 },
  { segmento: 'SERVICOS', subsegmento: 'PROVEDOR DE SERVICOS', qtd: 28332, rec: 56998388, tmRec: 2012, nRec: 134002129, tmNRec: 4730 },
  { segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'ENGENHARIA & DESIGN', qtd: 27770, rec: 60336795, tmRec: 2173, nRec: 125995344, tmNRec: 4537 },
  { segmento: 'SERVICOS', subsegmento: 'OUTRAS ATIVIDADES DE SERVICOS FINANCEIRO', qtd: 27766, rec: 61714721, tmRec: 2223, nRec: 85707337, tmNRec: 3087 },
  { segmento: 'AGROINDUSTRIA', subsegmento: 'PRODUCAO DE CULTIVOS', qtd: 21340, rec: 47196077, tmRec: 2212, nRec: 58379342, tmNRec: 2736 },
  { segmento: 'EDUCACIONAL', subsegmento: 'SUPERIOR', qtd: 20788, rec: 33611625, tmRec: 1617, nRec: 138800674, tmNRec: 6677 },
  { segmento: 'SAUDE', subsegmento: 'HOSPITAIS E CLINICAS', qtd: 19840, rec: 38490120, tmRec: 1940, nRec: 94210500, tmNRec: 4748 },
  { segmento: 'HOSPITALITY', subsegmento: 'HOTEIS E RESORTS', qtd: 8616, rec: 14820400, tmRec: 1720, nRec: 28410200, tmNRec: 3297 },
  { segmento: 'JURIDICO', subsegmento: 'ESCRITORIOS DE ADVOCACIA', qtd: 3163, rec: 6199480, tmRec: 1960, nRec: 8940100, tmNRec: 2826 }
];

export class MapaOportunidadesSegmentos extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    avisoGuiaPendente: { type: String },
    mostrarFiltros: { type: Boolean },
    segmentoSelecionado: { type: String },
    filtroPerfil: { type: String },
    exibindoTabelaSubsegmentos: { type: Boolean },
    buscaSubsegmento: { type: String },
    sortField: { type: String },
    sortDir: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.avisoGuiaPendente = '';
    this.mostrarFiltros = false;
    this.segmentoSelecionado = 'TODOS';
    this.filtroPerfil = 'TODOS';
    this.exibindoTabelaSubsegmentos = false;
    this.buscaSubsegmento = '';
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
      if (e.key === 'Escape') {
        if (this.menuNavegacaoAberto) {
          this.menuNavegacaoAberto = false;
          this.requestUpdate();
          return;
        }
        if (this.exibindoTabelaSubsegmentos) {
          this.exibindoTabelaSubsegmentos = false;
          this.requestUpdate();
        }
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

    if (guia.id === 'panorama-segmentos') {
      this.avisoGuiaPendente = '';
      this.exibindoTabelaSubsegmentos = false;
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Panorama_segmentos/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  toggleSelecionarSegmento(segId) {
    this.segmentoSelecionado = this.segmentoSelecionado === segId ? 'TODOS' : segId;
    this.requestUpdate();
  }

  ordenarTabela(campo) {
    if (this.sortField === campo) {
      this.sortDir = this.sortDir === 'desc' ? 'asc' : 'desc';
    } else {
      this.sortField = campo;
      this.sortDir = campo === 'segmento' || campo === 'subsegmento' ? 'asc' : 'desc';
    }
    this.requestUpdate();
  }

  renderSortIndicator(field) {
    if (this.sortField !== field) return '';
    return this.sortDir === 'desc' ? ' ▼' : ' ▲';
  }

  formatInt(val) {
    return Math.round(Number(val) || 0).toLocaleString('pt-BR');
  }

  formatExactBRL(val) {
    const num = Math.round(Number(val) || 0);
    return `R$ ${num.toLocaleString('pt-BR')}`;
  }

  formatCompact(val) {
    const n = Number(val) || 0;
    if (n >= 1e6) {
      return (n / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Mi';
    }
    if (n >= 1e3) {
      return Math.round(n / 1e3).toLocaleString('pt-BR') + ' Mil';
    }
    return this.formatInt(n);
  }

  /* Pirâmide SVG de Faixa de Faturamento (6 níveis alinhados) */
  renderPiramideFaturamento(faixasLista) {
    const w = 360;
    const h = 326;
    const cx = w / 2;
    const topY = 8;
    const bottomY = 318;
    const gap = 3.5;
    const n = faixasLista.length;
    const totalH = bottomY - topY;
    const tierH = (totalH - gap * (n - 1)) / n;
    const maxHalfW = 166;
    const minHalfW = 6;

    return html`
      <div class="pyramid-svg-wrap">
        <svg viewBox="0 0 ${w} ${h}" style="width: 100%; max-width: 370px; height: auto; display: block; margin: 0 auto;">
          ${faixasLista.map((item, idx) => {
            const y1 = topY + idx * (tierH + gap);
            const y2 = y1 + tierH;
            const frac1 = (y1 - topY) / totalH;
            const frac2 = (y2 - topY) / totalH;

            const hw1 = minHalfW + frac1 * (maxHalfW - minHalfW);
            const hw2 = minHalfW + frac2 * (maxHalfW - minHalfW);

            const p1 = `${(cx - hw1).toFixed(1)},${y1.toFixed(1)}`;
            const p2 = `${(cx + hw1).toFixed(1)},${y1.toFixed(1)}`;
            const p3 = `${(cx + hw2).toFixed(1)},${y2.toFixed(1)}`;
            const p4 = `${(cx - hw2).toFixed(1)},${y2.toFixed(1)}`;

            const midY = (y1 + y2) / 2;
            const isApex = idx === 0;

            return svg`
              <g>
                <polygon
                  points="${p1} ${p2} ${p3} ${p4}"
                  fill="${item.cor}"
                  stroke="#ffffff"
                  stroke-width="0.6"
                />
                <text
                  x="${cx}"
                  y="${(midY - (isApex ? 2 : 3.5)).toFixed(1)}"
                  text-anchor="middle"
                  font-size="${isApex ? '12.5' : '14'}"
                  font-weight="900"
                  fill="#0f172a">
                  ${item.valorFmt}
                </text>
                <text
                  x="${cx}"
                  y="${(midY + (isApex ? 12 : 12.5)).toFixed(1)}"
                  text-anchor="middle"
                  font-size="${isApex ? '9.5' : '10.5'}"
                  font-weight="800"
                  fill="#ffffff">
                  ${item.label}
                </text>
              </g>
            `;
          })}
        </svg>
      </div>
    `;
  }

  /* Visão Interna: Tabela Completa de Oportunidades por Subsegmentos (com botão Voltar) */
  renderVisaoSubsegmentos() {
    const termo = (this.buscaSubsegmento || '').trim().toLowerCase();

    const fatorPerfil = this.filtroPerfil === 'BASE'
      ? 0.092
      : this.filtroPerfil === 'NOVO'
        ? 0.908
        : 1;

    let linhas = SUBSEGMENTOS_TABELA.filter((row) => {
      if (this.segmentoSelecionado !== 'TODOS' && row.segmento !== this.segmentoSelecionado) {
        return false;
      }
      if (termo) {
        const hay = `${row.segmento} ${row.subsegmento}`.toLowerCase();
        if (!hay.includes(termo)) return false;
      }
      return true;
    }).map((row) => ({
      ...row,
      qtdExib: Math.round(row.qtd * fatorPerfil),
      recExib: Math.round(row.rec * fatorPerfil),
      nRecExib: Math.round(row.nRec * fatorPerfil)
    }));

    linhas = [...linhas].sort((a, b) => {
      const f = this.sortField;
      const mult = this.sortDir === 'desc' ? -1 : 1;
      if (typeof a[f] === 'string') {
        return a[f].localeCompare(b[f], 'pt-BR') * mult;
      }
      return ((a[f] || 0) - (b[f] || 0)) * mult;
    });

    return html`
      <div class="subseg-back-row">
        <button
          type="button"
          class="btn-voltar-panorama"
          @click="${() => { this.exibindoTabelaSubsegmentos = false; this.requestUpdate(); }}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Voltar</span>
        </button>

        ${this.segmentoSelecionado !== 'TODOS' ? html`
          <button
            type="button"
            class="active-seg-chip"
            @click="${() => { this.segmentoSelecionado = 'TODOS'; this.requestUpdate(); }}">
            <span>Segmento: ${this.segmentoSelecionado}</span>
            <span>✕</span>
          </button>
        ` : ''}
      </div>

      <div class="subseg-table-card">
        <div class="section-header" style="margin-bottom: 6px;">
          <h2 class="section-title-pill">OPORTUNIDADES POR SUBSEGMENTOS</h2>
          <div class="section-header-line"></div>
        </div>

        <div class="subseg-toolbar">
          <div class="subseg-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              class="subseg-search-input"
              placeholder="Buscar por segmento ou subsegmento..."
              .value="${this.buscaSubsegmento}"
              @input="${(e) => { this.buscaSubsegmento = e.target.value; this.requestUpdate(); }}"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <select
              class="filter-select"
              .value="${this.segmentoSelecionado}"
              @change="${(e) => { this.segmentoSelecionado = e.target.value; this.requestUpdate(); }}">
              <option value="TODOS">Todos os Segmentos</option>
              ${SEGMENTOS_DATA.map(s => html`<option value="${s.id}">${s.nome}</option>`)}
            </select>
            <span class="subseg-count-pill">${linhas.length} subsegmentos</span>
          </div>
        </div>

        <div class="subseg-table-scroll">
          <table class="subseg-table">
            <thead>
              <tr>
                <th class="col-sticky-seg" @click="${() => this.ordenarTabela('segmento')}">
                  Segmento${this.renderSortIndicator('segmento')}
                </th>
                <th class="col-sticky-subseg" @click="${() => this.ordenarTabela('subsegmento')}">
                  Subsegmento${this.renderSortIndicator('subsegmento')}
                </th>
                <th class="num" @click="${() => this.ordenarTabela('qtdExib')}">
                  Qtd${this.renderSortIndicator('qtdExib')}
                </th>
                <th class="num" @click="${() => this.ordenarTabela('recExib')}">
                  Recorrente (R$)${this.renderSortIndicator('recExib')}
                </th>
                <th class="num" @click="${() => this.ordenarTabela('tmRec')}">
                  TM Recorrente (R$)${this.renderSortIndicator('tmRec')}
                </th>
                <th class="num" @click="${() => this.ordenarTabela('nRecExib')}">
                  Não Recorrente (R$)${this.renderSortIndicator('nRecExib')}
                </th>
                <th class="num" @click="${() => this.ordenarTabela('tmNRec')}">
                  TM Não Recorrente (R$)${this.renderSortIndicator('tmNRec')}
                </th>
              </tr>
            </thead>
            <tbody>
              ${linhas.length === 0 ? html`
                <tr>
                  <td colspan="7" class="empty-row">Nenhum subsegmento encontrado para o filtro selecionado.</td>
                </tr>
              ` : linhas.map((row) => html`
                <tr>
                  <td class="col-sticky-seg">${row.segmento}</td>
                  <td class="col-sticky-subseg">${row.subsegmento}</td>
                  <td class="num val-bold">${this.formatInt(row.qtdExib)}</td>
                  <td class="num val-bold">${this.formatExactBRL(row.recExib)}</td>
                  <td class="num">${this.formatExactBRL(row.tmRec)}</td>
                  <td class="num val-bold">${this.formatExactBRL(row.nRecExib)}</td>
                  <td class="num">${this.formatExactBRL(row.tmNRec)}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  render() {
    const segObjAtivo = this.segmentoSelecionado !== 'TODOS'
      ? SEGMENTOS_DATA.find(s => s.id === this.segmentoSelecionado)
      : null;

    const barrasCalculadas = SEGMENTOS_DATA.map((s) => {
      const baseVal = this.filtroPerfil === 'NOVO' ? 0 : s.base;
      const novoVal = this.filtroPerfil === 'BASE' ? 0 : s.novo;
      const totalVal = baseVal + novoVal;
      return {
        ...s,
        baseExib: baseVal,
        novoExib: novoVal,
        totalExib: totalVal
      };
    });

    const maxBarra = Math.max(...barrasCalculadas.map(b => b.totalExib), 1);

    const resumoKpis = segObjAtivo
      ? (() => {
          const tot = this.filtroPerfil === 'BASE'
            ? segObjAtivo.base
            : this.filtroPerfil === 'NOVO'
              ? segObjAtivo.novo
              : segObjAtivo.total;
          const acimaPct = segObjAtivo.icpAcimaPct;
          const espPct = 100 - acimaPct;
          const acimaVal = Math.round(tot * (acimaPct / 100));
          const espVal = tot - acimaVal;

          const gestaoPct = segObjAtivo.gestaoPct;
          const dcPct = 100 - gestaoPct;
          const gestaoVal = Math.round(tot * (gestaoPct / 100));
          const dcVal = tot - gestaoVal;

          return {
            tituloResumo: `Resumo: ${segObjAtivo.nome}`,
            totalFmt: this.formatCompact(tot),
            acimaFmt: this.formatCompact(acimaVal),
            acimaPct: `${acimaPct}%`,
            espFmt: this.formatCompact(espVal),
            espPct: `${espPct}%`,
            gestaoFmt: this.formatCompact(gestaoVal),
            gestaoPct: `${gestaoPct}%`,
            dcFmt: this.formatCompact(dcVal),
            dcPct: `${dcPct}%`
          };
        })()
      : {
          tituloResumo: 'Resumo dos Segmentos',
          totalFmt: this.filtroPerfil === 'BASE' ? '368,6 Mil' : this.filtroPerfil === 'NOVO' ? '3,7 Mi' : '4,0 Mi',
          acimaFmt: this.filtroPerfil === 'BASE' ? '154,8 Mil' : this.filtroPerfil === 'NOVO' ? '1,5 Mi' : '1,7 Mi',
          acimaPct: '42%',
          espFmt: this.filtroPerfil === 'BASE' ? '213,8 Mil' : this.filtroPerfil === 'NOVO' ? '2,1 Mi' : '2,3 Mi',
          espPct: '58%',
          gestaoFmt: this.filtroPerfil === 'BASE' ? '342,8 Mil' : this.filtroPerfil === 'NOVO' ? '3,4 Mi' : '3,7 Mi',
          gestaoPct: '93%',
          dcFmt: this.filtroPerfil === 'BASE' ? '25,8 Mil' : this.filtroPerfil === 'NOVO' ? '251,9 Mil' : '277,7 Mil',
          dcPct: '7%'
        };

    const faixasExibidas = segObjAtivo
      ? FAIXAS_GLOBAL.map((f, idx) => {
          const fator = this.filtroPerfil === 'BASE'
            ? (segObjAtivo.base / segObjAtivo.total)
            : this.filtroPerfil === 'NOVO'
              ? (segObjAtivo.novo / segObjAtivo.total)
              : 1;
          const v = Math.round((segObjAtivo.faixas[idx] || 0) * fator);
          return {
            ...f,
            valorNum: v,
            valorFmt: this.formatCompact(v)
          };
        })
      : FAIXAS_GLOBAL.map((f) => {
          const fator = this.filtroPerfil === 'BASE' ? 0.092 : this.filtroPerfil === 'NOVO' ? 0.908 : 1;
          const v = Math.round(f.valorNum * fator);
          return {
            ...f,
            valorNum: v,
            valorFmt: fator === 1 ? f.valorFmt : this.formatCompact(v)
          };
        });

    const subsegmentosPodio = this.segmentoSelecionado !== 'TODOS'
      ? (() => {
          const filtrados = SUBSEGMENTOS_TABELA
            .filter(s => s.segmento === this.segmentoSelecionado)
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 3)
            .map(s => ({
              nome: s.subsegmento,
              nomeCurto: s.subsegmento.length > 18 ? s.subsegmento.slice(0, 15) + '...' : s.subsegmento,
              segmento: s.segmento,
              qtd: s.qtd,
              valorFmt: this.formatCompact(s.qtd)
            }));
          return filtrados.length > 0 ? filtrados : PODIO_GLOBAL;
        })()
      : PODIO_GLOBAL;

    const maxPodioQtd = Math.max(...subsegmentosPodio.map(s => s.qtd), 1);

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

        /* CABEÇALHO PÍLULA DAS SEÇÕES */
        .section-header {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 16px;
        }

        .section-title-pill {
          display: inline-flex;
          align-items: center;
          background-color: #172e4d;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.45px;
          padding: 6px 22px 6px 14px;
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

        /* =========================================================
           BLOCO SUPERIOR: OPORTUNIDADES POR SEGMENTOS (QTD)
           ========================================================= */
        .chart-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 22px 26px 18px 26px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
        }

        .chart-top-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chart-legend-group {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 11.5px;
          font-weight: 800;
          color: #475569;
        }

        .leg-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .leg-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .active-seg-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f3e8ff;
          border: 1px solid #d8b4fe;
          color: #6d28d9;
          font-size: 11.5px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 999px;
          cursor: pointer;
        }

        .bars-stage {
          display: grid;
          grid-template-columns: repeat(11, minmax(64px, 1fr));
          gap: 12px;
          align-items: end;
          padding-top: 24px;
          padding-bottom: 6px;
          border-bottom: 1px solid #cbd5e1;
          overflow-x: auto;
        }

        .seg-col-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.15s ease;
          position: relative;
        }

        .seg-col-item:hover {
          transform: translateY(-2px);
        }

        .seg-col-item.dimmed {
          opacity: 0.42;
        }

        .seg-total-lbl {
          font-size: 11.5px;
          font-weight: 800;
          color: #334155;
          margin-bottom: 6px;
          white-space: nowrap;
        }

        .seg-bar-track {
          width: 100%;
          max-width: 78px;
          height: 195px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .seg-bar-stack {
          width: 100%;
          border-radius: 5px 5px 0 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 3px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
        }

        .seg-col-item.selected .seg-bar-stack {
          outline: 2.5px solid #172e4d;
          outline-offset: 2px;
        }

        .seg-part-novo {
          width: 100%;
          background: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: height 0.3s ease;
        }

        .seg-part-base {
          width: 100%;
          background: #0ea5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: height 0.3s ease;
        }

        .bar-inner-val {
          font-size: 10.5px;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
          padding: 0 2px;
        }

        .bars-labels-row {
          display: grid;
          grid-template-columns: repeat(11, minmax(64px, 1fr));
          gap: 12px;
          padding-top: 10px;
          padding-bottom: 18px;
          overflow-x: auto;
        }

        .seg-x-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #475569;
          text-align: center;
          transform: rotate(-24deg);
          transform-origin: top center;
          white-space: nowrap;
          margin-top: 4px;
          cursor: pointer;
        }

        .seg-x-label.selected {
          color: #7c3aed;
          font-weight: 900;
        }

        /* =========================================================
           GRID INFERIOR DE 3 CARDS (PIRÂMIDE | RESUMO | TOP SUBSEGMENTOS)
           ========================================================= */
        .bottom-3-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        .bottom-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 22px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
        }

        .pyramid-svg-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 0;
        }

        .resumo-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
          justify-content: space-between;
        }

        .resumo-total-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
        }

        .resumo-total-lbl {
          font-size: 12.5px;
          font-weight: 700;
          color: #64748b;
        }

        .resumo-total-val {
          font-size: 20px;
          font-weight: 900;
          color: #0f172a;
        }

        .resumo-subblock {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .resumo-sub-title {
          font-size: 12.5px;
          font-weight: 900;
          color: #172e4d;
          padding-bottom: 6px;
          border-bottom: 1px solid #f1f5f9;
        }

        .icp-mini-row {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icp-mini-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #e0f2fe;
          color: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icp-mini-icon.fit {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .icp-mini-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .icp-mini-line1 {
          font-size: 13px;
          color: #475569;
          font-weight: 700;
        }

        .icp-mini-line1 strong {
          font-size: 15px;
          font-weight: 900;
          color: #0f172a;
          margin-left: 4px;
        }

        .icp-mini-line2 {
          font-size: 11.5px;
          color: #64748b;
          font-weight: 600;
        }

        .icp-mini-line2 strong {
          color: #0f172a;
          font-weight: 800;
        }

        .dim-mini-row {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .btn-ranking-completo {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          padding: 9px 16px;
          font-size: 11.5px;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
          transition: all 0.15s ease;
          margin-bottom: 16px;
        }

        .btn-ranking-completo:hover {
          background: #172e4d;
          color: #ffffff;
          border-color: #172e4d;
        }

        .podium-stage {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          align-items: end;
          padding-top: 8px;
          min-height: 250px;
        }

        .podium-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          justify-content: flex-end;
        }

        .podium-name {
          font-size: 10.5px;
          font-weight: 800;
          color: #334155;
          line-height: 1.25;
          margin-bottom: 4px;
          max-width: 96px;
          word-break: break-word;
        }

        .podium-val {
          font-size: 12px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .podium-bar {
          width: 100%;
          max-width: 62px;
          border-radius: 10px 10px 6px 6px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 10px;
          transition: height 0.3s ease;
        }

        .podium-badge {
          width: 32px;
          height: 34px;
          background: #ffffff;
          color: #0f172a;
          font-size: 15px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(50% 0%, 95% 22%, 95% 78%, 50% 100%, 5% 78%, 5% 22%);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        /* =========================================================
           VISÃO INTERNA: BOTÃO VOLTAR + TABELA OPORTUNIDADES POR SUBSEGMENTOS
           ========================================================= */
        .subseg-back-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          animation: fadeSlideDown 0.16s ease-out;
        }

        .btn-voltar-panorama {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          padding: 8px 18px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
          transition: all 0.15s ease;
        }

        .btn-voltar-panorama:hover {
          background: #172e4d;
          color: #ffffff;
          border-color: #172e4d;
          transform: translateX(-2px);
        }

        .subseg-table-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 14px;
          animation: fadeSlideDown 0.16s ease-out;
        }

        .subseg-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .subseg-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 240px;
          max-width: 380px;
        }

        .subseg-search-wrap svg {
          position: absolute;
          left: 11px;
          color: #64748b;
          pointer-events: none;
        }

        .subseg-search-input {
          width: 100%;
          padding: 7px 12px 7px 32px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
        }

        .subseg-search-input:focus {
          border-color: #7c3aed;
          background: #ffffff;
        }

        .subseg-count-pill {
          font-size: 11.5px;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 5px 11px;
          border-radius: 6px;
        }

        .subseg-table-scroll {
          width: 100%;
          max-height: 580px;
          overflow-x: auto;
          overflow-y: auto;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
        }

        .subseg-table-scroll::-webkit-scrollbar {
          width: 9px;
          height: 9px;
        }

        .subseg-table-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }

        .subseg-table-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 8px;
          border: 2px solid #f1f5f9;
        }

        .subseg-table-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        .subseg-table {
          width: 100%;
          min-width: 1160px;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 12.5px;
        }

        .subseg-table thead th {
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
          text-align: left;
        }

        .subseg-table thead th:hover {
          background: #1e3a5f;
        }

        .subseg-table thead th.num,
        .subseg-table tbody td.num {
          text-align: right;
        }

        .subseg-table thead th.col-sticky-seg {
          position: sticky;
          left: 0;
          z-index: 20;
          min-width: 195px;
        }

        .subseg-table thead th.col-sticky-subseg {
          position: sticky;
          left: 195px;
          z-index: 20;
          min-width: 280px;
          box-shadow: 3px 0 6px -2px rgba(15, 23, 42, 0.25);
        }

        .subseg-table tbody td {
          padding: 9px 14px;
          border-bottom: 1px solid #e2e8f0;
          border-right: 1px solid #f1f5f9;
          color: #1e293b;
          white-space: nowrap;
          background: #ffffff;
        }

        .subseg-table tbody tr:nth-child(even) td {
          background: #f8fafc;
        }

        .subseg-table tbody tr:hover td {
          background: #f3e8ff;
        }

        .subseg-table tbody td.col-sticky-seg {
          position: sticky;
          left: 0;
          z-index: 5;
          font-weight: 700;
          color: #475569;
        }

        .subseg-table tbody td.col-sticky-subseg {
          position: sticky;
          left: 195px;
          z-index: 5;
          font-weight: 800;
          color: #0f172a;
          box-shadow: 3px 0 6px -3px rgba(15, 23, 42, 0.12);
        }

        .val-bold {
          font-weight: 800;
          color: #0f172a;
        }

        .empty-row {
          text-align: center !important;
          padding: 36px !important;
          color: #64748b !important;
          font-weight: 700;
        }

        @media (max-width: 1240px) {
          .bottom-3-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
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
            <div class="title-sub">Panorama de Segmentos</div>
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
                      class="nav-option-btn ${g.id === 'panorama-segmentos' ? 'active' : ''}"
                      @click="${() => this.selecionarGuia(g)}">
                      <span class="nav-opt-dot"></span>
                      <div class="nav-opt-text">
                        <div class="nav-opt-title">
                          <span>${g.titulo}</span>
                          ${g.id === 'panorama-segmentos' ? html`<span class="badge-atual">Atual</span>` : ''}
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
              <select class="filter-select" .value="${this.segmentoSelecionado}" @change="${(e) => { this.segmentoSelecionado = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos os Segmentos</option>
                ${SEGMENTOS_DATA.map(s => html`<option value="${s.id}">${s.nome}</option>`)}
              </select>
            </div>
            <div class="filter-item">
              <span>Tipo de Oportunidade:</span>
              <select class="filter-select" .value="${this.filtroPerfil}" @change="${(e) => { this.filtroPerfil = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Base + Novo (Todos)</option>
                <option value="BASE">Somente Base</option>
                <option value="NOVO">Somente Novo</option>
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

        ${this.exibindoTabelaSubsegmentos ? this.renderVisaoSubsegmentos() : html`
          <!-- BLOCO 1: OPORTUNIDADES POR SEGMENTOS (QTD) -->
          <div class="chart-card">
            <div class="section-header" style="margin-bottom: 10px;">
              <h2 class="section-title-pill">OPORTUNIDADES POR SEGMENTOS (QTD)</h2>
              <div class="section-header-line"></div>
            </div>

            <div class="chart-top-controls">
              <div class="chart-legend-group">
                <span class="leg-item"><span class="leg-dot" style="background: #0ea5e9;"></span>BASE</span>
                <span class="leg-item"><span class="leg-dot" style="background: #7c3aed;"></span>NOVO</span>
              </div>

              ${this.segmentoSelecionado !== 'TODOS' ? html`
                <button
                  type="button"
                  class="active-seg-chip"
                  @click="${() => { this.segmentoSelecionado = 'TODOS'; this.requestUpdate(); }}"
                  title="Clique para limpar filtro de segmento">
                  <span>Segmento: ${this.segmentoSelecionado}</span>
                  <span>✕</span>
                </button>
              ` : html`
                <span style="font-size: 11px; color: #64748b; font-weight: 600;">
                  Clique em uma coluna para filtrar os indicadores abaixo
                </span>
              `}
            </div>

            <div class="bars-stage">
              ${barrasCalculadas.map((seg) => {
                const hTotalPct = (seg.totalExib / maxBarra) * 100;
                const hNovoPct = seg.totalExib > 0 ? (seg.novoExib / seg.totalExib) * 100 : 0;
                const hBasePct = seg.totalExib > 0 ? (seg.baseExib / seg.totalExib) * 100 : 0;
                const isSelected = this.segmentoSelecionado === seg.id;
                const isDimmed = this.segmentoSelecionado !== 'TODOS' && !isSelected;

                return html`
                  <div
                    class="seg-col-item ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
                    @click="${() => this.toggleSelecionarSegmento(seg.id)}"
                    title="${seg.nome}: ${this.formatInt(seg.totalExib)} oportunidades (Base: ${this.formatInt(seg.baseExib)} | Novo: ${this.formatInt(seg.novoExib)})">
                    <div class="seg-total-lbl">${this.formatInt(seg.totalExib)}</div>
                    <div class="seg-bar-track">
                      <div class="seg-bar-stack" style="height: ${Math.max(hTotalPct, 1.5).toFixed(2)}%;">
                        ${seg.novoExib > 0 ? html`
                          <div class="seg-part-novo" style="height: ${hNovoPct.toFixed(2)}%;">
                            ${hTotalPct >= 14 && hNovoPct >= 35 ? html`<span class="bar-inner-val">${this.formatInt(seg.novoExib)}</span>` : ''}
                          </div>
                        ` : ''}
                        ${seg.baseExib > 0 ? html`
                          <div class="seg-part-base" style="height: ${hBasePct.toFixed(2)}%;">
                            ${hTotalPct >= 65 && hBasePct >= 10 ? html`<span class="bar-inner-val">${this.formatInt(seg.baseExib)}</span>` : ''}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>

            <div class="bars-labels-row">
              ${barrasCalculadas.map((seg) => html`
                <div
                  class="seg-x-label ${this.segmentoSelecionado === seg.id ? 'selected' : ''}"
                  @click="${() => this.toggleSelecionarSegmento(seg.id)}"
                  title="${seg.nome}">
                  ${seg.labelCurto}
                </div>
              `)}
            </div>
          </div>

          <!-- BLOCO 2: GRID INFERIOR DE 3 CARDS -->
          <div class="bottom-3-grid">

            <!-- CARD 1: PIRÂMIDE POR FAIXA DE FATURAMENTO -->
            <div class="bottom-card">
              <div class="section-header" style="margin-bottom: 10px;">
                <h2 class="section-title-pill">OPORTUNIDADES POR FAIXA DE FATURAMENTO (QTD)</h2>
                <div class="section-header-line"></div>
              </div>
              ${this.renderPiramideFaturamento(faixasExibidas)}
            </div>

            <!-- CARD 2: RESUMO DOS SEGMENTOS -->
            <div class="bottom-card">
              <div class="section-header" style="margin-bottom: 12px;">
                <h2 class="section-title-pill">${resumoKpis.tituloResumo}</h2>
                <div class="section-header-line"></div>
              </div>

              <div class="resumo-body">
                <div class="resumo-total-box">
                  <span class="resumo-total-lbl">Total de Oportunidades (Qtd)</span>
                  <span class="resumo-total-val">${resumoKpis.totalFmt}</span>
                </div>

                <!-- Oportunidades por ICP (Qtd) -->
                <div class="resumo-subblock">
                  <div class="resumo-sub-title">Oportunidades por ICP (Qtd)</div>

                  <div class="icp-mini-row">
                    <div class="icp-mini-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <div class="icp-mini-info">
                      <div class="icp-mini-line1">Acima do Esperado: <strong>${resumoKpis.acimaFmt}</strong></div>
                      <div class="icp-mini-line2">% Representatividade: <strong>(${resumoKpis.acimaPct})</strong></div>
                    </div>
                  </div>

                  <div class="icp-mini-row">
                    <div class="icp-mini-icon fit">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                    </div>
                    <div class="icp-mini-info">
                      <div class="icp-mini-line1">Esperado: <strong>${resumoKpis.espFmt}</strong></div>
                      <div class="icp-mini-line2">% Representatividade: <strong>(${resumoKpis.espPct})</strong></div>
                    </div>
                  </div>
                </div>

                <!-- Oportunidades por Dimensão (Qtd) -->
                <div class="resumo-subblock">
                  <div class="resumo-sub-title">Oportunidades por Dimensão (Qtd)</div>

                  <div class="dim-mini-row">
                    <div class="icp-mini-line1">Gestão: <strong>${resumoKpis.gestaoFmt}</strong></div>
                    <div class="icp-mini-line2">% Representatividade: <strong>(${resumoKpis.gestaoPct})</strong></div>
                  </div>

                  <div class="dim-mini-row">
                    <div class="icp-mini-line1">Digital Commerce: <strong>${resumoKpis.dcFmt}</strong></div>
                    <div class="icp-mini-line2">% Representatividade: <strong>(${resumoKpis.dcPct})</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CARD 3: TOP SUBSEGMENTOS -->
            <div class="bottom-card">
              <div class="section-header" style="margin-bottom: 12px;">
                <h2 class="section-title-pill">TOP SUBSEGMENTOS</h2>
                <div class="section-header-line"></div>
              </div>

              <button
                type="button"
                class="btn-ranking-completo"
                @click="${() => { this.exibindoTabelaSubsegmentos = true; this.buscaSubsegmento = ''; this.requestUpdate(); }}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span>Clique aqui para visualizar o ranking completo dos subsegmentos</span>
              </button>

              <div class="podium-stage">
                ${subsegmentosPodio.map((sub, idx) => {
                  const alturas = [178, 134, 96];
                  const cores = ['#0a192f', '#475569', '#94a3b8'];
                  const barH = Math.max(76, Math.round((sub.qtd / maxPodioQtd) * alturas[0]));
                  const finalH = idx === 0 ? alturas[0] : Math.min(barH, alturas[idx]);

                  return html`
                    <div class="podium-col" title="${sub.nome} (${sub.segmento}) — ${this.formatInt(sub.qtd)} oportunidades">
                      <div class="podium-name">${sub.nomeCurto}</div>
                      <div class="podium-val">${sub.valorFmt}</div>
                      <div class="podium-bar" style="height: ${finalH}px; background: ${cores[idx]};">
                        <div class="podium-badge">${idx + 1}</div>
                      </div>
                    </div>
                  `;
                })}
              </div>
            </div>

          </div>
        `}

      </div>
    `;
  }
}

customElements.define(elementName, MapaOportunidadesSegmentos);
