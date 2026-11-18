/**
 * @title Mapa de Oportunidades - Painel de Ação
 * @description Visão focada no cliente com distribuição por tipo de carteira, faixas de quantidade de oportunidades,
 *              seletor pesquisável de clientes, perfil completo e listagem de ofertas por propensão ICP.
 */

import { LitElement, html, svg } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-painel-acao';

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

const TIPO_CLIENTE_DIST = [
  { id: 'NOVO', label: 'NOVO', pct: 90, qtdFmt: '233,1 Mil', color: '#7c3aed' },
  { id: 'BASE ATIVO', label: 'BASE ATIVO', pct: 8, qtdFmt: '20,7 Mil', color: '#0ea5e9' },
  { id: 'BASE DORMENTE', label: 'BASE DORMENTE', pct: 2, qtdFmt: '5,2 Mil', color: '#14b8a6' }
];

const FAIXAS_OPORTUNIDADES_CLIENTE = [
  { id: '01', linha1: '01. Até 10', linha2: 'oportunidades', valorNum: 112000, valorFmt: '112 Mil' },
  { id: '02', linha1: '02. De 11 a 20', linha2: 'oportunidades', valorNum: 104000, valorFmt: '104 Mil' },
  { id: '03', linha1: '03. De 21 a 30', linha2: 'oportunidades', valorNum: 19000, valorFmt: '19 Mil' },
  { id: '04', linha1: '04. De 31 a 40', linha2: 'oportunidades', valorNum: 8000, valorFmt: '8 Mil' },
  { id: '05', linha1: '05. Mais de 40', linha2: 'oportunidades', valorNum: 16000, valorFmt: '16 Mil' }
];

const CLIENTES_ACTION_DATA = [
  {
    id: 'NOVO-2B',
    nomeExibicao: 'NOVO - 2B EQUIPAMENTOS E SOLUCOES INDUSTRIAIS LTDA',
    razaoSocial: '2B EQUIPAMENTOS E SOLUCOES INDUSTRIAIS LTDA',
    cnpj: '18.492.731/0001-40',
    tipoCliente: 'NOVO',
    faixaQtdId: '02',
    unidade: 'TOTVS SP1',
    perfil: {
      segmento: 'MANUFATURA',
      subsegmento: 'BENS DE CAPITAL',
      porte: 'MÉDIO PORTE',
      faixaFaturamento: '02 - De 1,5M a 4,8M',
      dormente: 'Não (Prospect Novo)'
    },
    acimaEsperado: [
      { oferta: 'INTERA BACKOFFICE: QUARTETO', dimensao: 'Gestão', curva: 'A', rec: 'R$ 2.446', nrec: 'R$ 0' },
      { oferta: 'INTERA BO: FISCAL + ATIVO FIXO', dimensao: 'Gestão', curva: 'A', rec: 'R$ 612', nrec: 'R$ 0' },
      { oferta: 'TOTVS GESTAO DE RECEITA RECORRENTE', dimensao: 'Gestão', curva: 'A', rec: 'R$ 1.035', nrec: 'R$ 0' },
      { oferta: 'TOTVS PROCESSOS FISCAIS', dimensao: 'Gestão', curva: 'A', rec: 'R$ 674', nrec: 'R$ 0' },
      { oferta: 'TOTVS WMS', dimensao: 'Gestão', curva: 'A', rec: 'R$ 1.565', nrec: 'R$ 43.768' }
    ],
    esperado: [
      { oferta: 'GS APPLY (INTERA TERCERIZACAO)', dimensao: 'Gestão', curva: 'B', rec: 'R$ 1.420', nrec: 'R$ 0' },
      { oferta: 'INTERA SEGMENTOS MANUFATURA', dimensao: 'Gestão', curva: 'A', rec: 'R$ 1.469', nrec: 'R$ 0' },
      { oferta: 'MINHA MANUTENCAO', dimensao: 'Gestão', curva: 'B', rec: 'R$ 580', nrec: 'R$ 0' },
      { oferta: 'MINHA PRODUCAO', dimensao: 'Gestão', curva: 'A', rec: 'R$ 449', nrec: 'R$ 0' },
      { oferta: 'MINHAS ORDENS DE SERVICO', dimensao: 'Gestão', curva: 'B', rec: 'R$ 510', nrec: 'R$ 0' },
      { oferta: 'Roteirizacao e Entregas', dimensao: 'Gestão', curva: 'A', rec: 'R$ 2.499', nrec: 'R$ 12.688' },
      { oferta: 'TOTVS INTERA FIELD SERVICE', dimensao: 'Gestão', curva: 'B', rec: 'R$ 1.890', nrec: 'R$ 0' },
      { oferta: 'TOTVS TRACKING', dimensao: 'Gestão', curva: 'A', rec: 'R$ 324', nrec: 'R$ 0' },
      { oferta: 'TRANSMITE GESTAO DE DOCUMENTOS ELETRONICOS', dimensao: 'Gestão', curva: 'A', rec: 'R$ 683', nrec: 'R$ 0' }
    ]
  },
  {
    id: 'BASE-ATIVO-SANTA-RITA',
    nomeExibicao: 'BASE ATIVO - METALURGICA SANTA RITA S.A.',
    razaoSocial: 'METALURGICA SANTA RITA S.A.',
    cnpj: '43.810.529/0001-12',
    tipoCliente: 'BASE ATIVO',
    faixaQtdId: '02',
    unidade: 'TOTVS PAULISTA',
    perfil: {
      segmento: 'MANUFATURA',
      subsegmento: 'METALURGIA E SIDERURGIA',
      porte: 'GRANDE PORTE',
      faixaFaturamento: '04 - De 30M a 300M',
      dormente: 'Não (Ativo)'
    },
    acimaEsperado: [
      { oferta: 'TOTVS MES (MANUFACTURING EXECUTION SYSTEM)', dimensao: 'Gestão', curva: 'B', rec: 'R$ 3.850', nrec: 'R$ 58.400' },
      { oferta: 'TOTVS APS PLANEJAMENTO AVANCADO', dimensao: 'Gestão', curva: 'B', rec: 'R$ 2.940', nrec: 'R$ 41.200' },
      { oferta: 'TOTVS BI FAST ANALYTICS', dimensao: 'Gestão', curva: 'B', rec: 'R$ 1.700', nrec: 'R$ 0' },
      { oferta: 'TOTVS CLOUD STANDARD', dimensao: 'Gestão', curva: 'A', rec: 'R$ 2.392', nrec: 'R$ 0' },
      { oferta: 'TOTVS INTELIGENCIA TRIBUTARIA', dimensao: 'Gestão', curva: 'A', rec: 'R$ 291', nrec: 'R$ 0' }
    ],
    esperado: [
      { oferta: 'TOTVS ASSINATURA ELETRONICA (TAE)', dimensao: 'Gestão', curva: 'A', rec: 'R$ 682', nrec: 'R$ 0' },
      { oferta: 'TOTVS CRM AUTOMACAO FORCA DE VENDAS', dimensao: 'Gestão', curva: 'B', rec: 'R$ 1.792', nrec: 'R$ 0' },
      { oferta: 'TOTVS GESTAO DE CONTRATOS', dimensao: 'Gestão', curva: 'C', rec: 'R$ 1.600', nrec: 'R$ 18.000' },
      { oferta: 'TOTVS RH CLOCK IN', dimensao: 'Gestão', curva: 'B', rec: 'R$ 920', nrec: 'R$ 0' },
      { oferta: 'TOTVS TECHFIN ANTECIPA', dimensao: 'Gestão', curva: 'B', rec: 'R$ 1.450', nrec: 'R$ 0' },
      { oferta: 'MINHA PRODUCAO', dimensao: 'Gestão', curva: 'A', rec: 'R$ 449', nrec: 'R$ 0' },
      { oferta: 'Roteirizacao e Entregas', dimensao: 'Gestão', curva: 'A', rec: 'R$ 2.499', nrec: 'R$ 12.688' }
    ]
  },
  {
    id: 'BASE-DORMENTE-NOVA-ERA',
    nomeExibicao: 'BASE DORMENTE - DISTRIBUIDORA NOVA ERA LOGISTICA LTDA',
    razaoSocial: 'DISTRIBUIDORA NOVA ERA LOGISTICA LTDA',
    cnpj: '09.645.182/0001-88',
    tipoCliente: 'BASE DORMENTE',
    faixaQtdId: '01',
    unidade: 'TOTVS OESTE',
    perfil: {
      segmento: 'DISTRIBUICAO',
      subsegmento: 'ATACADISTA E DISTRIBUIDOR',
      porte: 'MÉDIO PORTE',
      faixaFaturamento: '03 - De 4,8M a 30M',
      dormente: 'Sim (22 meses sem compra)'
    },
    acimaEsperado: [
      { oferta: 'TOTVS WMS', dimensao: 'Gestão', curva: 'A', rec: 'R$ 1.565', nrec: 'R$ 43.768' },
      { oferta: 'Roteirizacao e Entregas', dimensao: 'Gestão', curva: 'A', rec: 'R$ 2.499', nrec: 'R$ 12.688' },
      { oferta: 'CHAT COMMERCE BY CHATBOT MAKER', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 1.676', nrec: 'R$ 0' },
      { oferta: 'INTEGRADOR MARKETPLACES BY LEXOS', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 1.796', nrec: 'R$ 0' }
    ],
    esperado: [
      { oferta: 'TOTVS TRACKING', dimensao: 'Gestão', curva: 'A', rec: 'R$ 324', nrec: 'R$ 0' },
      { oferta: 'TOTVS TEF', dimensao: 'Gestão', curva: 'A', rec: 'R$ 350', nrec: 'R$ 0' },
      { oferta: 'TOTVS GESTAO DE RECEITA RECORRENTE', dimensao: 'Gestão', curva: 'A', rec: 'R$ 1.035', nrec: 'R$ 0' },
      { oferta: 'SHOPIFY E-COMMERCE', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 4.803', nrec: 'R$ 0' },
      { oferta: 'EXACT SALES', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 1.632', nrec: 'R$ 0' },
      { oferta: 'TOTVS APP MINHA GESTAO', dimensao: 'Gestão', curva: 'C', rec: 'R$ 850', nrec: 'R$ 0' }
    ]
  },
  {
    id: 'NOVO-ALVORADA-AGRO',
    nomeExibicao: 'NOVO - AGROPECUARIA ALVORADA DO SUL S.A.',
    razaoSocial: 'AGROPECUARIA ALVORADA DO SUL S.A.',
    cnpj: '27.319.804/0001-55',
    tipoCliente: 'NOVO',
    faixaQtdId: '03',
    unidade: 'TOTVS PARANA',
    perfil: {
      segmento: 'AGROINDUSTRIA',
      subsegmento: 'PRODUCAO DE GRAOS E SEMENTES',
      porte: 'GRANDE PORTE',
      faixaFaturamento: '05 - De 300M a 1B',
      dormente: 'Não (Prospect Novo)'
    },
    acimaEsperado: [
      { oferta: 'TOTVS AGRO MULTICULTIVO', dimensao: 'Gestão', curva: 'A', rec: 'R$ 4.120', nrec: 'R$ 65.000' },
      { oferta: 'TOTVS AGRO GESTAO DE FROTA', dimensao: 'Gestão', curva: 'B', rec: 'R$ 2.380', nrec: 'R$ 28.500' },
      { oferta: 'TOTVS PROCESSOS FISCAIS', dimensao: 'Gestão', curva: 'A', rec: 'R$ 674', nrec: 'R$ 0' },
      { oferta: 'TOTVS BI FAST ANALYTICS', dimensao: 'Gestão', curva: 'B', rec: 'R$ 1.700', nrec: 'R$ 0' }
    ],
    esperado: [
      { oferta: 'TOTVS ASSINATURA ELETRONICA (TAE)', dimensao: 'Gestão', curva: 'A', rec: 'R$ 682', nrec: 'R$ 0' },
      { oferta: 'TOTVS RH CLOCK IN', dimensao: 'Gestão', curva: 'B', rec: 'R$ 920', nrec: 'R$ 0' },
      { oferta: 'TOTVS CLOUD STANDARD', dimensao: 'Gestão', curva: 'A', rec: 'R$ 2.392', nrec: 'R$ 0' },
      { oferta: 'TOTVS TRACKING', dimensao: 'Gestão', curva: 'A', rec: 'R$ 324', nrec: 'R$ 0' }
    ]
  },
  {
    id: 'BASE-ATIVO-VAREJO-PRIME',
    nomeExibicao: 'BASE ATIVO - REDE PRIME COMERCIO VAREJISTA LTDA',
    razaoSocial: 'REDE PRIME COMERCIO VAREJISTA LTDA',
    cnpj: '61.504.920/0001-73',
    tipoCliente: 'BASE ATIVO',
    faixaQtdId: '01',
    unidade: 'TOTVS LESTE',
    perfil: {
      segmento: 'VAREJO',
      subsegmento: 'VAREJO DE MODA E VESTUARIO',
      porte: 'MÉDIO PORTE',
      faixaFaturamento: '03 - De 4,8M a 30M',
      dormente: 'Não (Ativo)'
    },
    acimaEsperado: [
      { oferta: 'SHOPIFY E-COMMERCE', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 4.803', nrec: 'R$ 0' },
      { oferta: 'CHAT COMMERCE BY CHATBOT MAKER', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 1.676', nrec: 'R$ 0' },
      { oferta: 'RD STATION MARKETING PRO', dimensao: 'Digital Commerce', curva: 'B', rec: 'R$ 1.700', nrec: 'R$ 0' },
      { oferta: 'TOTVS TEF', dimensao: 'Gestão', curva: 'A', rec: 'R$ 350', nrec: 'R$ 0' }
    ],
    esperado: [
      { oferta: 'INTEGRADOR MARKETPLACES BY LEXOS', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 1.796', nrec: 'R$ 0' },
      { oferta: 'EXACT SALES', dimensao: 'Digital Commerce', curva: 'A', rec: 'R$ 1.632', nrec: 'R$ 0' },
      { oferta: 'TOTVS GESTAO DE RECEITA RECORRENTE', dimensao: 'Gestão', curva: 'A', rec: 'R$ 1.035', nrec: 'R$ 0' },
      { oferta: 'TOTVS ASSINATURA ELETRONICA (TAE)', dimensao: 'Gestão', curva: 'A', rec: 'R$ 682', nrec: 'R$ 0' }
    ]
  }
];

export class MapaOportunidadesPainelAcao extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    avisoGuiaPendente: { type: String },
    mostrarFiltros: { type: Boolean },
    tipoClienteFiltro: { type: String },
    faixaFiltro: { type: String },
    clienteSelecionadoId: { type: String },
    buscaCliente: { type: String },
    dropdownClientesAberto: { type: Boolean },
    modalOportunidadesAberto: { type: Boolean },
    buscaModalOferta: { type: String },
    filtroModalIcp: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.avisoGuiaPendente = '';
    this.mostrarFiltros = false;
    this.tipoClienteFiltro = 'TODOS';
    this.faixaFiltro = 'TODAS';
    this.clienteSelecionadoId = CLIENTES_ACTION_DATA[0].id;
    this.buscaCliente = '';
    this.dropdownClientesAberto = false;
    this.modalOportunidadesAberto = false;
    this.buscaModalOferta = '';
    this.filtroModalIcp = 'TODOS';

    this._fecharPopoversAoClicarFora = (e) => {
      const path = e.composedPath();
      if (!path.some(el => el.classList && el.classList.contains('nav-menu-wrapper'))) {
        if (this.menuNavegacaoAberto) {
          this.menuNavegacaoAberto = false;
          this.requestUpdate();
        }
      }
      if (!path.some(el => el.classList && el.classList.contains('client-combobox-wrapper'))) {
        if (this.dropdownClientesAberto) {
          this.dropdownClientesAberto = false;
          this.requestUpdate();
        }
      }
    };

    this._tecladoListener = (e) => {
      if (e.key === 'Escape') {
        if (this.modalOportunidadesAberto) {
          this.modalOportunidadesAberto = false;
          this.requestUpdate();
          return;
        }
        if (this.dropdownClientesAberto) {
          this.dropdownClientesAberto = false;
          this.requestUpdate();
          return;
        }
        if (this.menuNavegacaoAberto) {
          this.menuNavegacaoAberto = false;
          this.requestUpdate();
        }
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._fecharPopoversAoClicarFora);
    window.addEventListener('keydown', this._tecladoListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._fecharPopoversAoClicarFora);
    window.removeEventListener('keydown', this._tecladoListener);
  }

  toggleMenuNavegacao(e) {
    e.stopPropagation();
    this.menuNavegacaoAberto = !this.menuNavegacaoAberto;
    this.dropdownClientesAberto = false;
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

    if (guia.id === 'painel-acao') {
      this.avisoGuiaPendente = '';
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Painel_acao|Painel_de_acao/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  toggleTipoCliente(tipoId) {
    this.tipoClienteFiltro = this.tipoClienteFiltro === tipoId ? 'TODOS' : tipoId;
    const disponiveis = this.getClientesFiltrados();
    if (disponiveis.length > 0 && !disponiveis.some(c => c.id === this.clienteSelecionadoId)) {
      this.clienteSelecionadoId = disponiveis[0].id;
    }
    this.requestUpdate();
  }

  toggleFaixa(faixaId) {
    this.faixaFiltro = this.faixaFiltro === faixaId ? 'TODAS' : faixaId;
    const disponiveis = this.getClientesFiltrados();
    if (disponiveis.length > 0 && !disponiveis.some(c => c.id === this.clienteSelecionadoId)) {
      this.clienteSelecionadoId = disponiveis[0].id;
    }
    this.requestUpdate();
  }

  getClientesFiltrados() {
    const filtrados = CLIENTES_ACTION_DATA.filter((c) => {
      if (this.tipoClienteFiltro !== 'TODOS' && c.tipoCliente !== this.tipoClienteFiltro) return false;
      if (this.faixaFiltro !== 'TODAS' && c.faixaQtdId !== this.faixaFiltro) return false;
      return true;
    });
    return filtrados.length > 0 ? filtrados : CLIENTES_ACTION_DATA;
  }

  selecionarCliente(clienteId) {
    this.clienteSelecionadoId = clienteId;
    this.dropdownClientesAberto = false;
    this.requestUpdate();
  }

  /* Gráfico de Rosca sem nenhuma faixa cinza (100% preenchido pelas 3 fatias) */
  renderDonutTipoCliente() {
    const cx = 120;
    const cy = 78;
    const r = 42;
    const strokeW = 19;
    const rOuter = r + strokeW / 2;
    const rElbow = rOuter + 10;
    const horizLen = 14;
    const c = 2 * Math.PI * r;

    const orderedSlices = [
      TIPO_CLIENTE_DIST[2], // BASE DORMENTE 2%
      TIPO_CLIENTE_DIST[1], // BASE ATIVO 8%
      TIPO_CLIENTE_DIST[0]  // NOVO 90%
    ];

    let curDeg = -126.0;
    let cumPct = 0;
    const arcs = [];
    const callouts = [];

    orderedSlices.forEach((s) => {
      const startLen = (cumPct / 100) * c;
      const dashLen = (s.pct / 100) * c;
      const sweep = (s.pct / 100) * 360;

      const isSelected = this.tipoClienteFiltro === s.id;
      const isDimmed = this.tipoClienteFiltro !== 'TODOS' && !isSelected;

      arcs.push(svg`
        <circle
          cx="${cx}"
          cy="${cy}"
          r="${r}"
          fill="none"
          stroke="${s.color}"
          stroke-width="${isSelected ? strokeW + 3 : strokeW}"
          stroke-dasharray="${dashLen.toFixed(3)} ${(c * 2).toFixed(3)}"
          stroke-dashoffset="${(-startLen).toFixed(3)}"
          transform="rotate(-126 ${cx} ${cy})"
          style="cursor: pointer; opacity: ${isDimmed ? 0.35 : 1}; transition: opacity 0.2s;"
          @click="${() => this.toggleTipoCliente(s.id)}"
        />
      `);

      const midDeg = curDeg + sweep / 2;
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
        <g style="cursor: pointer; opacity: ${isDimmed ? 0.45 : 1};" @click="${() => this.toggleTipoCliente(s.id)}">
          <polyline
            points="${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)}"
            fill="none"
            stroke="#94a3b8"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="${x3.toFixed(1)}" cy="${y3.toFixed(1)}" r="2.8" fill="${s.color}" />
          <text
            x="${textX.toFixed(1)}"
            y="${(y3 + 4).toFixed(1)}"
            text-anchor="${anchor}"
            font-size="12"
            font-weight="900"
            fill="${s.color}">
            ${s.pct}%
          </text>
        </g>
      `);

      cumPct += s.pct;
      curDeg += sweep;
    });

    return html`
      <div class="donut-stage">
        <svg viewBox="0 0 240 156" width="240" height="156">
          ${arcs}
          ${callouts}
        </svg>
      </div>
    `;
  }

  /* Modal Completo de Todas as Oportunidades do Cliente */
  renderModalOportunidades(cliente) {
    if (!this.modalOportunidadesAberto || !cliente) return '';

    const todas = [
      ...cliente.acimaEsperado.map(item => ({ ...item, icp: 'Acima do Esperado' })),
      ...cliente.esperado.map(item => ({ ...item, icp: 'Esperado' }))
    ];

    const termo = (this.buscaModalOferta || '').trim().toLowerCase();
    const filtradas = todas.filter((o) => {
      if (this.filtroModalIcp === 'ACIMA' && o.icp !== 'Acima do Esperado') return false;
      if (this.filtroModalIcp === 'ESPERADO' && o.icp !== 'Esperado') return false;
      if (termo && !o.oferta.toLowerCase().includes(termo)) return false;
      return true;
    });

    return html`
      <div class="modal-backdrop-blur" @click="${() => { this.modalOportunidadesAberto = false; this.requestUpdate(); }}">
        <div class="modal-window-72" @click="${(e) => e.stopPropagation()}">
          <div class="modal-head">
            <div>
              <div class="modal-crumb-tag">
                PAINEL DE AÇÃO • ${cliente.tipoCliente} • ${cliente.unidade}
              </div>
              <h2 class="modal-head-title">${cliente.razaoSocial}</h2>
              <div class="modal-kpi-sub">
                <span>CNPJ: <strong>${cliente.cnpj}</strong> • Segmento: <strong>${cliente.perfil.segmento}</strong> (${cliente.perfil.subsegmento})</span>
              </div>
            </div>
            <button
              type="button"
              class="modal-btn-close"
              @click="${() => { this.modalOportunidadesAberto = false; this.requestUpdate(); }}"
              title="Fechar (Esc)">
              ✕
            </button>
          </div>

          <div class="modal-sort-bar">
            <div class="icp-pills-group">
              ${[
                { id: 'TODOS', label: `Todas (${todas.length})` },
                { id: 'ACIMA', label: `Acima do Esperado (${cliente.acimaEsperado.length})` },
                { id: 'ESPERADO', label: `Esperado (${cliente.esperado.length})` }
              ].map((tab) => html`
                <button
                  type="button"
                  class="icp-pill-btn ${this.filtroModalIcp === tab.id ? 'active' : ''}"
                  @click="${() => { this.filtroModalIcp = tab.id; this.requestUpdate(); }}">
                  ${tab.label}
                </button>
              `)}
            </div>

            <input
              type="text"
              class="modal-search-input"
              placeholder="Filtrar produto / oferta..."
              .value="${this.buscaModalOferta}"
              @input="${(e) => { this.buscaModalOferta = e.target.value; this.requestUpdate(); }}"
            />
          </div>

          <div class="modal-table-scroll-area">
            <table class="modal-expanded-table">
              <thead>
                <tr>
                  <th style="width: 38%;">Oferta / Produto</th>
                  <th style="width: 20%;">Classificação ICP</th>
                  <th style="width: 14%;">Dimensão</th>
                  <th style="width: 8%; text-align: center;">Curva</th>
                  <th style="width: 10%; text-align: right;">TM Recorrente</th>
                  <th style="width: 10%; text-align: right;">TM Não Rec.</th>
                </tr>
              </thead>
              <tbody>
                ${filtradas.length === 0 ? html`
                  <tr><td colspan="6" class="drill-empty">Nenhuma oportunidade encontrada para o filtro aplicado.</td></tr>
                ` : filtradas.map((row) => html`
                  <tr>
                    <td style="font-weight: 800; color: #0f172a;">${row.oferta}</td>
                    <td>
                      <span class="icp-tag ${row.icp === 'Acima do Esperado' ? 'acima' : 'esperado'}">
                        ${row.icp}
                      </span>
                    </td>
                    <td style="color: #475569; font-weight: 700;">${row.dimensao}</td>
                    <td style="text-align: center;">
                      <span class="curva-badge curva-${row.curva}">${row.curva}</span>
                    </td>
                    <td style="text-align: right; font-weight: 800; color: #0f172a;">${row.rec}</td>
                    <td style="text-align: right; font-weight: 700; color: ${row.nrec !== 'R$ 0' ? '#0f172a' : '#94a3b8'};">${row.nrec}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <div class="modal-foot">
            <span class="modal-count-txt">${filtradas.length} oportunidades mapeadas exibidas</span>
            <button
              type="button"
              class="btn-fechar-modal"
              @click="${() => { this.modalOportunidadesAberto = false; this.requestUpdate(); }}">
              Fechar (Esc)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const clientesDisponiveis = this.getClientesFiltrados();
    const clienteAtivo = clientesDisponiveis.find(c => c.id === this.clienteSelecionadoId) || clientesDisponiveis[0];

    const termoBuscaCli = (this.buscaCliente || '').trim().toLowerCase();
    const clientesPesquisados = termoBuscaCli
      ? clientesDisponiveis.filter(
          c => c.nomeExibicao.toLowerCase().includes(termoBuscaCli) ||
               c.cnpj.toLowerCase().includes(termoBuscaCli) ||
               c.perfil.segmento.toLowerCase().includes(termoBuscaCli)
        )
      : clientesDisponiveis;

    const fatorTipo = this.tipoClienteFiltro === 'NOVO'
      ? 0.90
      : this.tipoClienteFiltro === 'BASE ATIVO'
        ? 0.08
        : this.tipoClienteFiltro === 'BASE DORMENTE'
          ? 0.02
          : 1.0;

    const maxFaixaVal = Math.max(...FAIXAS_OPORTUNIDADES_CLIENTE.map(f => f.valorNum * fatorTipo), 1);

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
          margin-bottom: 14px;
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
           LINHA SUPERIOR: TIPO DE CLIENTE (DONUT) + QTD POR CLIENTE (BARRAS)
           ========================================================= */
        .top-analytics-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
          align-items: stretch;
        }

        .panel-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 22px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
        }

        .donut-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 4px 0;
        }

        .donut-legend-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 8px;
          border-top: 1px solid #f1f5f9;
        }

        .leg-pill-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 3px 8px;
          font-size: 10.5px;
          font-weight: 800;
          color: #475569;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .leg-pill-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .leg-pill-btn.active {
          background: #f3e8ff;
          border-color: #d8b4fe;
          color: #6d28d9;
        }

        .leg-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        /* BARRAS QUANTIDADE DE OPORTUNIDADES POR CLIENTE */
        .faixas-bars-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          align-items: end;
          flex: 1;
          padding-top: 10px;
          border-bottom: 1px solid #cbd5e1;
        }

        .faixa-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .faixa-col:hover {
          transform: translateY(-2px);
        }

        .faixa-col.dimmed {
          opacity: 0.42;
        }

        .faixa-bar-track {
          width: 100%;
          max-width: 104px;
          height: 148px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .faixa-bar-fill {
          width: 100%;
          background: #0a192f;
          border-radius: 5px 5px 0 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 7px;
          min-height: 10px;
          transition: height 0.3s ease, background 0.15s ease;
        }

        .faixa-col.selected .faixa-bar-fill {
          background: #7c3aed;
        }

        .faixa-bar-val {
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
        }

        .faixa-top-val {
          font-size: 11px;
          font-weight: 800;
          color: #334155;
          margin-bottom: 4px;
        }

        .faixas-labels-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          padding-top: 8px;
        }

        .faixa-x-lbl {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          text-align: center;
          line-height: 1.3;
          cursor: pointer;
        }

        .faixa-x-lbl.selected {
          color: #7c3aed;
          font-weight: 900;
        }

        /* =========================================================
           BARRA CENTRAL: SELETOR PESQUISÁVEL DE CLIENTE + BOTÃO OPORTUNIDADES
           ========================================================= */
        .client-selector-bar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: center;
          position: relative;
          z-index: 25;
        }

        .selector-box {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 12px 18px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .selector-label {
          font-size: 14px;
          font-weight: 900;
          color: #172e4d;
          white-space: nowrap;
        }

        .client-combobox-wrapper {
          position: relative;
          flex: 1;
          min-width: 300px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .client-search-field {
          position: relative;
          width: 240px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .client-search-field svg {
          position: absolute;
          left: 11px;
          color: #64748b;
          pointer-events: none;
        }

        .client-search-input {
          width: 100%;
          padding: 9px 30px 9px 32px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .client-search-input:focus {
          border-color: #7c3aed;
          background: #ffffff;
        }

        .clear-search-btn {
          position: absolute;
          right: 8px;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          padding: 2px 5px;
        }
        .clear-search-btn:hover {
          color: #0f172a;
        }

        .client-active-trigger {
          flex: 1;
          min-width: 240px;
          padding: 9px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
          background: #f8fafc;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          text-align: left;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .client-active-trigger:hover,
        .client-active-trigger.open {
          border-color: #7c3aed;
          background: #ffffff;
        }

        .client-active-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .client-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          box-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.25);
          max-height: 290px;
          overflow-y: auto;
          padding: 6px;
          z-index: 90;
          animation: fadeSlideDown 0.14s ease-out;
        }

        .client-option-item {
          width: 100%;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 9px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-align: left;
          cursor: pointer;
          transition: background 0.12s ease;
          margin-bottom: 2px;
        }

        .client-option-item:hover {
          background: #f8fafc;
        }

        .client-option-item.selected {
          background: #f3e8ff;
          border-color: #e9d5ff;
        }

        .co-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .co-title {
          font-size: 12.5px;
          font-weight: 800;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .co-sub {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        .co-badge {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 999px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .co-badge.novo {
          background: #f3e8ff;
          color: #6d28d9;
        }

        .co-badge.ativo {
          background: #e0f2fe;
          color: #0284c7;
        }

        .co-badge.dormente {
          background: #ccfbf1;
          color: #0f766e;
        }

        .btn-all-opps {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          padding: 12px 22px;
          font-size: 12px;
          font-weight: 800;
          color: #172e4d;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .btn-all-opps:hover {
          background: #172e4d;
          color: #ffffff;
          border-color: #172e4d;
          transform: translateY(-1px);
        }

        /* =========================================================
           GRID INFERIOR DE 3 COLUNAS: PERFIL | ACIMA DO ESPERADO | ESPERADO
           ========================================================= */
        .bottom-3-cols {
          display: grid;
          grid-template-columns: 1fr 1.15fr 1.15fr;
          gap: 20px;
          align-items: stretch;
        }

        .perfil-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
          flex: 1;
          justify-content: space-between;
        }

        .perfil-item-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 11px 14px;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .perfil-icon-box {
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

        .perfil-text-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .perfil-field-lbl {
          font-size: 11.5px;
          font-weight: 700;
          color: #64748b;
        }

        .perfil-field-val {
          font-size: 13px;
          font-weight: 900;
          color: #0f172a;
          word-break: break-word;
        }

        .offers-list-wrap {
          display: flex;
          flex-direction: column;
          flex: 1;
          border-top: 2px solid #7c3aed;
        }

        .offers-list-wrap.esperado {
          border-top-color: #0ea5e9;
        }

        .offer-row-item {
          padding: 10px 8px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-size: 12.5px;
          font-weight: 700;
          color: #1e293b;
          transition: background 0.15s ease;
        }

        .offer-row-item:hover {
          background: #f8fafc;
        }

        .offer-name-txt {
          flex: 1;
          min-width: 0;
        }

        .offer-curva-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          background: #f1f5f9;
          color: #475569;
          flex-shrink: 0;
        }

        .count-badge-pill {
          margin-left: 10px;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 3px 9px;
          border-radius: 999px;
          flex-shrink: 0;
        }

        /* =========================================================
           MODAL TODAS AS OPORTUNIDADES DO CLIENTE
           ========================================================= */
        .modal-backdrop-blur {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.70);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeSlideDown 0.18s ease;
        }

        .modal-window-72 {
          background: #ffffff;
          width: 72vw;
          min-width: 880px;
          max-width: 1380px;
          max-height: 86vh;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-head {
          padding: 20px 28px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-crumb-tag {
          font-size: 11px;
          font-weight: 800;
          color: #7c3aed;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
        }

        .modal-head-title {
          font-size: 19px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .modal-kpi-sub {
          font-size: 12.5px;
          color: #475569;
        }

        .modal-btn-close {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-btn-close:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .modal-sort-bar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .icp-pills-group {
          display: inline-flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          gap: 3px;
        }

        .icp-pill-btn {
          background: transparent;
          border: none;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
        }

        .icp-pill-btn.active {
          background: #ffffff;
          color: #172e4d;
          font-weight: 800;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.1);
        }

        .modal-search-input {
          padding: 6px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #0f172a;
          min-width: 250px;
          outline: none;
        }
        .modal-search-input:focus {
          border-color: #7c3aed;
        }

        .modal-table-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: 14px 28px;
        }

        .modal-expanded-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .modal-expanded-table th {
          background: #ffffff;
          color: #64748b;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 10px 12px;
          border-bottom: 2px solid #e2e8f0;
          position: sticky;
          top: 0;
          text-align: left;
        }

        .modal-expanded-table td {
          padding: 11px 12px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
        }

        .icp-tag {
          font-size: 11px;
          font-weight: 800;
          padding: 3px 9px;
          border-radius: 999px;
        }

        .icp-tag.acima {
          background: #f3e8ff;
          color: #6d28d9;
        }

        .icp-tag.esperado {
          background: #e0f2fe;
          color: #0284c7;
        }

        .curva-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 22px;
          border-radius: 5px;
          font-size: 11px;
          font-weight: 900;
          background: #f1f5f9;
          color: #334155;
        }

        .drill-empty {
          text-align: center;
          padding: 40px;
          color: #94a3b8;
          font-weight: 700;
        }

        .modal-foot {
          padding: 14px 28px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-count-txt {
          font-size: 12px;
          color: #64748b;
          font-weight: 700;
        }

        .btn-fechar-modal {
          background: #172e4d;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        @media (max-width: 1180px) {
          .top-analytics-grid,
          .bottom-3-cols,
          .client-selector-bar {
            grid-template-columns: 1fr;
          }
          .hero-actions {
            margin-right: 0;
          }
          .modal-window-72 {
            width: 94vw;
            min-width: 0;
          }
        }

        @media (max-width: 760px) {
          .client-combobox-wrapper {
            flex-direction: column;
            align-items: stretch;
          }
          .client-search-field {
            width: 100%;
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
            <div class="title-sub">Painel de Ação</div>
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
                      class="nav-option-btn ${g.id === 'painel-acao' ? 'active' : ''}"
                      @click="${() => this.selecionarGuia(g)}">
                      <span class="nav-opt-dot"></span>
                      <div class="nav-opt-text">
                        <div class="nav-opt-title">
                          <span>${g.titulo}</span>
                          ${g.id === 'painel-acao' ? html`<span class="badge-atual">Atual</span>` : ''}
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
              <span>Tipo de Cliente:</span>
              <select class="filter-select" .value="${this.tipoClienteFiltro}" @change="${(e) => { this.tipoClienteFiltro = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos (Novo + Base Ativo + Dormente)</option>
                <option value="NOVO">Novo</option>
                <option value="BASE ATIVO">Base Ativo</option>
                <option value="BASE DORMENTE">Base Dormente</option>
              </select>
            </div>
            <div class="filter-item">
              <span>Faixa de Oportunidades:</span>
              <select class="filter-select" .value="${this.faixaFiltro}" @change="${(e) => { this.faixaFiltro = e.target.value; this.requestUpdate(); }}">
                <option value="TODAS">Todas as Faixas</option>
                ${FAIXAS_OPORTUNIDADES_CLIENTE.map(f => html`<option value="${f.id}">${f.linha1} ${f.linha2}</option>`)}
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

        <!-- LINHA 1: OPORTUNIDADE POR TIPO DE CLIENTE + QUANTIDADE DE OPORTUNIDADES POR CLIENTE -->
        <div class="top-analytics-grid">
          <div class="panel-card">
            <div class="section-header" style="margin-bottom: 6px;">
              <h2 class="section-title-pill">OPORTUNIDADE POR TIPO DE CLIENTE</h2>
              <div class="section-header-line"></div>
            </div>

            ${this.renderDonutTipoCliente()}

            <div class="donut-legend-row">
              ${TIPO_CLIENTE_DIST.map((t) => html`
                <button
                  type="button"
                  class="leg-pill-btn ${this.tipoClienteFiltro === t.id ? 'active' : ''}"
                  @click="${() => this.toggleTipoCliente(t.id)}"
                  title="Filtrar por ${t.label}">
                  <span class="leg-dot" style="background: ${t.color};"></span>
                  <span>${t.label}</span>
                </button>
              `)}
            </div>
          </div>

          <div class="panel-card">
            <div class="section-header" style="margin-bottom: 6px;">
              <h2 class="section-title-pill">QUANTIDADE DE OPORTUNIDADES POR CLIENTE</h2>
              <div class="section-header-line"></div>
            </div>

            <div class="faixas-bars-grid">
              ${FAIXAS_OPORTUNIDADES_CLIENTE.map((f) => {
                const valAjust = Math.round(f.valorNum * fatorTipo);
                const hPct = (valAjust / maxFaixaVal) * 100;
                const isSelected = this.faixaFiltro === f.id;
                const isDimmed = this.faixaFiltro !== 'TODAS' && !isSelected;
                const valLabel = fatorTipo === 1
                  ? f.valorFmt
                  : (valAjust >= 1000 ? `${Math.round(valAjust / 1000)} Mil` : `${valAjust}`);

                return html`
                  <div
                    class="faixa-col ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
                    @click="${() => this.toggleFaixa(f.id)}"
                    title="${f.linha1} ${f.linha2}: ${valLabel} clientes">
                    ${hPct < 22 ? html`<span class="faixa-top-val">${valLabel}</span>` : ''}
                    <div class="faixa-bar-track">
                      <div class="faixa-bar-fill" style="height: ${Math.max(hPct, 7).toFixed(1)}%;">
                        ${hPct >= 22 ? html`<span class="faixa-bar-val">${valLabel}</span>` : ''}
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>

            <div class="faixas-labels-grid">
              ${FAIXAS_OPORTUNIDADES_CLIENTE.map((f) => html`
                <div
                  class="faixa-x-lbl ${this.faixaFiltro === f.id ? 'selected' : ''}"
                  @click="${() => this.toggleFaixa(f.id)}">
                  <div>${f.linha1}</div>
                  <div>${f.linha2}</div>
                </div>
              `)}
            </div>
          </div>
        </div>

        <!-- LINHA 2: SELETOR COM BARRA DE PESQUISA DE CLIENTE + BOTÃO TODAS OPORTUNIDADES -->
        <div class="client-selector-bar">
          <div class="selector-box">
            <span class="selector-label">Selecione um cliente:</span>

            <div class="client-combobox-wrapper">
              <!-- Barra de pesquisa por nome do cliente -->
              <div class="client-search-field">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  class="client-search-input"
                  placeholder="Pesquisar cliente..."
                  .value="${this.buscaCliente}"
                  @focus="${() => { this.dropdownClientesAberto = true; this.requestUpdate(); }}"
                  @input="${(e) => {
                    this.buscaCliente = e.target.value;
                    this.dropdownClientesAberto = true;
                    this.requestUpdate();
                  }}"
                  @keydown="${(e) => {
                    if (e.key === 'Enter' && clientesPesquisados.length > 0) {
                      this.selecionarCliente(clientesPesquisados[0].id);
                    }
                  }}"
                />
                ${this.buscaCliente ? html`
                  <button
                    type="button"
                    class="clear-search-btn"
                    @click="${() => { this.buscaCliente = ''; this.dropdownClientesAberto = true; this.requestUpdate(); }}"
                    title="Limpar pesquisa">
                    ✕
                  </button>
                ` : ''}
              </div>

              <!-- Seletor do cliente ativo -->
              <button
                type="button"
                class="client-active-trigger ${this.dropdownClientesAberto ? 'open' : ''}"
                @click="${(e) => {
                  e.stopPropagation();
                  this.dropdownClientesAberto = !this.dropdownClientesAberto;
                  this.menuNavegacaoAberto = false;
                  this.requestUpdate();
                }}">
                <span class="client-active-name">${clienteAtivo.nomeExibicao}</span>
                <span style="font-size: 10px; color: #64748b; flex-shrink: 0;">
                  ${this.dropdownClientesAberto ? '▲' : '▼'}
                </span>
              </button>

              ${this.dropdownClientesAberto ? html`
                <div class="client-dropdown-menu" @click="${(e) => e.stopPropagation()}">
                  ${clientesPesquisados.length === 0 ? html`
                    <div style="padding: 16px; text-align: center; font-size: 12px; color: #64748b; font-weight: 700;">
                      Nenhum cliente encontrado para "${this.buscaCliente}".
                    </div>
                  ` : clientesPesquisados.map((c) => {
                    const badgeCls = c.tipoCliente === 'NOVO'
                      ? 'novo'
                      : c.tipoCliente === 'BASE ATIVO'
                        ? 'ativo'
                        : 'dormente';

                    return html`
                      <button
                        type="button"
                        class="client-option-item ${c.id === clienteAtivo.id ? 'selected' : ''}"
                        @click="${() => this.selecionarCliente(c.id)}">
                        <div class="co-main">
                          <span class="co-title">${c.nomeExibicao}</span>
                          <span class="co-sub">CNPJ: ${c.cnpj} • ${c.perfil.segmento} • ${c.unidade}</span>
                        </div>
                        <span class="co-badge ${badgeCls}">${c.tipoCliente}</span>
                      </button>
                    `;
                  })}
                </div>
              ` : ''}
            </div>
          </div>

          <button
            type="button"
            class="btn-all-opps"
            @click="${() => { this.modalOportunidadesAberto = true; this.buscaModalOferta = ''; this.filtroModalIcp = 'TODOS'; this.requestUpdate(); }}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <span>Clique aqui para visualizar todas as oportunidades</span>
          </button>
        </div>

        <!-- LINHA 3: 3 COLUNAS (PERFIL | PERFIL ACIMA DO ESPERADO | PERFIL ESPERADO) -->
        <div class="bottom-3-cols">

          <!-- COLUNA 1: PERFIL -->
          <div class="panel-card">
            <div class="section-header">
              <h2 class="section-title-pill">PERFIL</h2>
              <div class="section-header-line"></div>
            </div>

            <div class="perfil-list">
              <div class="perfil-item-box">
                <div class="perfil-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div class="perfil-text-col">
                  <span class="perfil-field-lbl">Segmento</span>
                  <span class="perfil-field-val">${clienteAtivo.perfil.segmento}</span>
                </div>
              </div>

              <div class="perfil-item-box">
                <div class="perfil-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <div class="perfil-text-col">
                  <span class="perfil-field-lbl">Subsegmento</span>
                  <span class="perfil-field-val">${clienteAtivo.perfil.subsegmento}</span>
                </div>
              </div>

              <div class="perfil-item-box">
                <div class="perfil-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </div>
                <div class="perfil-text-col">
                  <span class="perfil-field-lbl">Porte</span>
                  <span class="perfil-field-val">${clienteAtivo.perfil.porte}</span>
                </div>
              </div>

              <div class="perfil-item-box">
                <div class="perfil-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                </div>
                <div class="perfil-text-col">
                  <span class="perfil-field-lbl">Faixa de Faturamento</span>
                  <span class="perfil-field-val">${clienteAtivo.perfil.faixaFaturamento}</span>
                </div>
              </div>

              <div class="perfil-item-box">
                <div class="perfil-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div class="perfil-text-col">
                  <span class="perfil-field-lbl">Dormente</span>
                  <span class="perfil-field-val">${clienteAtivo.perfil.dormente}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUNA 2: PERFIL ACIMA DO ESPERADO -->
          <div class="panel-card">
            <div class="section-header">
              <h2 class="section-title-pill">PERFIL ACIMA DO ESPERADO</h2>
              <div class="section-header-line"></div>
              <span class="count-badge-pill">${clienteAtivo.acimaEsperado.length}</span>
            </div>

            <div class="offers-list-wrap">
              ${clienteAtivo.acimaEsperado.map((item) => html`
                <div class="offer-row-item">
                  <span class="offer-name-txt">${item.oferta}</span>
                  <span class="offer-curva-tag">Curva ${item.curva}</span>
                </div>
              `)}
            </div>
          </div>

          <!-- COLUNA 3: PERFIL ESPERADO -->
          <div class="panel-card">
            <div class="section-header">
              <h2 class="section-title-pill">PERFIL ESPERADO</h2>
              <div class="section-header-line"></div>
              <span class="count-badge-pill">${clienteAtivo.esperado.length}</span>
            </div>

            <div class="offers-list-wrap esperado">
              ${clienteAtivo.esperado.map((item) => html`
                <div class="offer-row-item">
                  <span class="offer-name-txt">${item.oferta}</span>
                  <span class="offer-curva-tag">Curva ${item.curva}</span>
                </div>
              `)}
            </div>
          </div>

        </div>

        <!-- MODAL TODAS AS OPORTUNIDADES DO CLIENTE -->
        ${this.renderModalOportunidades(clienteAtivo)}

      </div>
    `;
  }
}

customElements.define(elementName, MapaOportunidadesPainelAcao);
