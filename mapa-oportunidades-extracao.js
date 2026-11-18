/**
 * @title Mapa de Oportunidades - Extração de Relatórios
 * @description Área de extração analítica com alternância entre Base das Oportunidades e Perfis de Clientes (ICP),
 *              filtros dinâmicos, rolagem horizontal/vertical com colunas fixas e exportação direta em CSV.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-extracao';

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

const BASE_OPORTUNIDADES_DATA = [
  { tipo: 'NOVO', codigo: 'AAHQG2', cnpj: '95391835000126', razaoSocial: 'COMERCIO DE PEDRAS ALTO VALE LTDA', segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'MATERIAIS DE CONSTRUCAO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', unidade: 'TOTVS SANTA CATARINA', uf: 'SC', oferta: 'TOTVS GESTAO DE RECEITA RECORRENTE', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 1035, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'AAHQG2', cnpj: '95391835000126', razaoSocial: 'COMERCIO DE PEDRAS ALTO VALE LTDA', segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'MATERIAIS DE CONSTRUCAO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', unidade: 'TOTVS SANTA CATARINA', uf: 'SC', oferta: 'TOTVS PROCESSOS FISCAIS', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 674, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'AAHQG2', cnpj: '95391835000126', razaoSocial: 'COMERCIO DE PEDRAS ALTO VALE LTDA', segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'MATERIAIS DE CONSTRUCAO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', unidade: 'TOTVS SANTA CATARINA', uf: 'SC', oferta: 'TOTVS TRACKING', dimensao: 'Gestão', icp: 'Esperado', potRec: 324, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'AAHQG2', cnpj: '95391835000126', razaoSocial: 'COMERCIO DE PEDRAS ALTO VALE LTDA', segmento: 'CONSTRUCAO E PROJETOS', subsegmento: 'MATERIAIS DE CONSTRUCAO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', unidade: 'TOTVS SANTA CATARINA', uf: 'SC', oferta: 'TOTVS ASSINATURA ELETRONICA (TAE)', dimensao: 'Gestão', icp: 'Esperado', potRec: 682, potNRec: 0 },
  { tipo: 'NOVO', codigo: '', cnpj: '06081260000115', razaoSocial: '.H. F. COMERCIO E REPRESENTACOES LTDA', segmento: 'DISTRIBUICAO', subsegmento: 'ATACADISTA E DISTRIBUIDOR', porte: 'PEQUENO PORTE', faixaFat: '01 - Até 1,5M', unidade: 'TOTVS SP1', uf: 'SP', oferta: 'TOTVS TEF', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 350, potNRec: 0 },
  { tipo: 'NOVO', codigo: '', cnpj: '06081260000115', razaoSocial: '.H. F. COMERCIO E REPRESENTACOES LTDA', segmento: 'DISTRIBUICAO', subsegmento: 'ATACADISTA E DISTRIBUIDOR', porte: 'PEQUENO PORTE', faixaFat: '01 - Até 1,5M', unidade: 'TOTVS SP1', uf: 'SP', oferta: 'CHAT COMMERCE BY CHATBOT MAKER', dimensao: 'Digital Commerce', icp: 'Esperado', potRec: 1676, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'CXAAAH', cnpj: '07207572000195', razaoSocial: 'LFB - HEMODERIVADOS E BIOTECNOLOGIA LTDA', segmento: 'SAUDE', subsegmento: 'INDUSTRIA FARMACEUTICA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS RIO DE JANEIRO', uf: 'RJ', oferta: 'TOTVS WMS', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 1565, potNRec: 43768 },
  { tipo: 'NOVO', codigo: 'CXAAAH', cnpj: '07207572000195', razaoSocial: 'LFB - HEMODERIVADOS E BIOTECNOLOGIA LTDA', segmento: 'SAUDE', subsegmento: 'INDUSTRIA FARMACEUTICA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS RIO DE JANEIRO', uf: 'RJ', oferta: 'INTERA BACKOFFICE: QUARTETO', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 2446, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'CXAAAH', cnpj: '07207572000195', razaoSocial: 'LFB - HEMODERIVADOS E BIOTECNOLOGIA LTDA', segmento: 'SAUDE', subsegmento: 'INDUSTRIA FARMACEUTICA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS RIO DE JANEIRO', uf: 'RJ', oferta: 'TOTVS INTELIGENCIA TRIBUTARIA', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 291, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'CXAAAH', cnpj: '07207572000195', razaoSocial: 'LFB - HEMODERIVADOS E BIOTECNOLOGIA LTDA', segmento: 'SAUDE', subsegmento: 'INDUSTRIA FARMACEUTICA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS RIO DE JANEIRO', uf: 'RJ', oferta: 'Roteirizacao e Entregas', dimensao: 'Gestão', icp: 'Esperado', potRec: 2499, potNRec: 12688 },
  { tipo: 'NOVO', codigo: 'CXAAAH', cnpj: '07207572000195', razaoSocial: 'LFB - HEMODERIVADOS E BIOTECNOLOGIA LTDA', segmento: 'SAUDE', subsegmento: 'INDUSTRIA FARMACEUTICA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS RIO DE JANEIRO', uf: 'RJ', oferta: 'TOTVS CLOUD STANDARD', dimensao: 'Gestão', icp: 'Esperado', potRec: 2392, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'BBK901', cnpj: '18492731000140', razaoSocial: '2B EQUIPAMENTOS E SOLUCOES INDUSTRIAIS LTDA', segmento: 'MANUFATURA', subsegmento: 'BENS DE CAPITAL', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', unidade: 'TOTVS SP1', uf: 'SP', oferta: 'MINHA PRODUCAO', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 449, potNRec: 0 },
  { tipo: 'NOVO', codigo: 'BBK901', cnpj: '18492731000140', razaoSocial: '2B EQUIPAMENTOS E SOLUCOES INDUSTRIAIS LTDA', segmento: 'MANUFATURA', subsegmento: 'BENS DE CAPITAL', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', unidade: 'TOTVS SP1', uf: 'SP', oferta: 'INTERA SEGMENTOS MANUFATURA', dimensao: 'Gestão', icp: 'Esperado', potRec: 1469, potNRec: 0 },
  { tipo: 'BASE ATIVO', codigo: 'T04821', cnpj: '43810529000112', razaoSocial: 'METALURGICA SANTA RITA S.A.', segmento: 'MANUFATURA', subsegmento: 'METALURGIA E SIDERURGIA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS PAULISTA', uf: 'SP', oferta: 'TOTVS BI FAST ANALYTICS', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 1700, potNRec: 0 },
  { tipo: 'BASE ATIVO', codigo: 'T04821', cnpj: '43810529000112', razaoSocial: 'METALURGICA SANTA RITA S.A.', segmento: 'MANUFATURA', subsegmento: 'METALURGIA E SIDERURGIA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', unidade: 'TOTVS PAULISTA', uf: 'SP', oferta: 'TOTVS RH CLOCK IN', dimensao: 'Gestão', icp: 'Esperado', potRec: 920, potNRec: 0 },
  { tipo: 'BASE ATIVO', codigo: 'T09114', cnpj: '61504920000173', razaoSocial: 'REDE PRIME COMERCIO VAREJISTA LTDA', segmento: 'VAREJO', subsegmento: 'VAREJO DE MODA E VESTUARIO', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', unidade: 'TOTVS LESTE', uf: 'SP', oferta: 'SHOPIFY E-COMMERCE', dimensao: 'Digital Commerce', icp: 'Acima do Esperado', potRec: 4803, potNRec: 0 },
  { tipo: 'BASE ATIVO', codigo: 'T09114', cnpj: '61504920000173', razaoSocial: 'REDE PRIME COMERCIO VAREJISTA LTDA', segmento: 'VAREJO', subsegmento: 'VAREJO DE MODA E VESTUARIO', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', unidade: 'TOTVS LESTE', uf: 'SP', oferta: 'INTEGRADOR MARKETPLACES BY LEXOS', dimensao: 'Digital Commerce', icp: 'Esperado', potRec: 1796, potNRec: 0 },
  { tipo: 'BASE DORMENTE', codigo: 'T02749', cnpj: '09645182000188', razaoSocial: 'DISTRIBUIDORA NOVA ERA LOGISTICA LTDA', segmento: 'DISTRIBUICAO', subsegmento: 'ATACADISTA E DISTRIBUIDOR', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', unidade: 'TOTVS OESTE', uf: 'SP', oferta: 'TOTVS WMS', dimensao: 'Gestão', icp: 'Acima do Esperado', potRec: 1565, potNRec: 43768 },
  { tipo: 'BASE DORMENTE', codigo: 'T02749', cnpj: '09645182000188', razaoSocial: 'DISTRIBUIDORA NOVA ERA LOGISTICA LTDA', segmento: 'DISTRIBUICAO', subsegmento: 'ATACADISTA E DISTRIBUIDOR', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', unidade: 'TOTVS OESTE', uf: 'SP', oferta: 'EXACT SALES', dimensao: 'Digital Commerce', icp: 'Esperado', potRec: 1632, potNRec: 0 }
];

const PERFIS_ICP_DATA = [
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'AGRO MOBILE PIMS', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', dimensao: 'Gestão', tmRec: 2150, tmNRec: 18400 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'AGRO MOBILE PIMS', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ESPERADA', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', dimensao: 'Gestão', tmRec: 2150, tmNRec: 18400 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'AGRO PESAGEM', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'GRANDE PORTE', faixaFat: '05 - De 300M a 1B', dimensao: 'Gestão', tmRec: 1890, tmNRec: 14200 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'AGRO PESAGEM', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ESPERADA', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', dimensao: 'Gestão', tmRec: 1890, tmNRec: 14200 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'INTERA SEGMENTOS AGRO', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', dimensao: 'Gestão', tmRec: 1540, tmNRec: 0 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'RECOMENDACAO AGRONOMICA BY SENSIX', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', dimensao: 'Gestão', tmRec: 3280, tmNRec: 0 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'TOTVS AGRO COMERCIALIZACAO PRODUTOS AGRICOLAS', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'GRANDE PORTE', faixaFat: '05 - De 300M a 1B', dimensao: 'Gestão', tmRec: 4120, tmNRec: 65000 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'TOTVS AGRO CONECTA DADOS EQUIPAMENTOS', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ESPERADA', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', dimensao: 'Gestão', tmRec: 2740, tmNRec: 22000 },
  { segProduto: 'AGROINDUSTRIA - CORE', oferta: 'TOTVS AGRO DISTRIBUIDOR - LINHA PROTHEUS', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', dimensao: 'Gestão', tmRec: 3490, tmNRec: 48500 },
  { segProduto: 'MANUFATURA - CORE', oferta: 'TOTVS WMS', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', dimensao: 'Gestão', tmRec: 1565, tmNRec: 43768 },
  { segProduto: 'MANUFATURA - CORE', oferta: 'MINHA PRODUCAO', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', dimensao: 'Gestão', tmRec: 449, tmNRec: 0 },
  { segProduto: 'MANUFATURA - CORE', oferta: 'INTERA BACKOFFICE: QUARTETO', tipoCliente: 'NOVO', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', dimensao: 'Gestão', tmRec: 2446, tmNRec: 0 },
  { segProduto: 'VAREJO - DIGITAL', oferta: 'SHOPIFY E-COMMERCE', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'MÉDIO PORTE', faixaFat: '03 - De 4,8M a 30M', dimensao: 'Digital Commerce', tmRec: 4803, tmNRec: 0 },
  { segProduto: 'VAREJO - DIGITAL', oferta: 'CHAT COMMERCE BY CHATBOT MAKER', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ESPERADA', porte: 'PEQUENO PORTE', faixaFat: '01 - Até 1,5M', dimensao: 'Digital Commerce', tmRec: 1676, tmNRec: 0 },
  { segProduto: 'LOGISTICA - CORE', oferta: 'Roteirizacao e Entregas', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ACIMA DO ESPERADO', porte: 'GRANDE PORTE', faixaFat: '04 - De 30M a 300M', dimensao: 'Gestão', tmRec: 2499, tmNRec: 12688 },
  { segProduto: 'LOGISTICA - CORE', oferta: 'TOTVS TRACKING', tipoCliente: 'AMBOS', icp: 'ICP PERFORMANCE ESPERADA', porte: 'MÉDIO PORTE', faixaFat: '02 - De 1,5M a 4,8M', dimensao: 'Gestão', tmRec: 324, tmNRec: 0 }
];

export class MapaOportunidadesExtracao extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    avisoGuiaPendente: { type: String },
    mostrarFiltros: { type: Boolean },
    modoTabela: { type: String }, // 'OPORTUNIDADES' | 'PERFIS_ICP'
    buscaTexto: { type: String },
    filtroTipoCliente: { type: String },
    filtroSegmento: { type: String },
    filtroIcp: { type: String },
    feedbackExportacao: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.avisoGuiaPendente = '';
    this.mostrarFiltros = false;
    this.modoTabela = 'OPORTUNIDADES';
    this.buscaTexto = '';
    this.filtroTipoCliente = 'TODOS';
    this.filtroSegmento = 'TODOS';
    this.filtroIcp = 'TODOS';
    this.feedbackExportacao = '';

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

    if (guia.id === 'extracao-relatorios') {
      this.avisoGuiaPendente = '';
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Extracao_relatorios|Extracao/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  alternarTabela() {
    this.modoTabela = this.modoTabela === 'OPORTUNIDADES' ? 'PERFIS_ICP' : 'OPORTUNIDADES';
    this.buscaTexto = '';
    this.filtroTipoCliente = 'TODOS';
    this.filtroSegmento = 'TODOS';
    this.filtroIcp = 'TODOS';
    this.feedbackExportacao = '';
    this.requestUpdate();
  }

  formatExactBRL(val) {
    const num = Math.round(Number(val) || 0);
    return `R$ ${num.toLocaleString('pt-BR')}`;
  }

  exportarCSV(linhas) {
    if (!linhas || linhas.length === 0) return;

    const escapeCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    let csvContent = '';
    let filename = '';

    if (this.modoTabela === 'OPORTUNIDADES') {
      const headers = [
        'Tipo', 'Código', 'CNPJ', 'Razão Social', 'Segmento', 'Subsegmento',
        'Porte', 'Faixa de Faturamento', 'Unidade', 'UF', 'Oportunidade',
        'Dimensão', 'ICP', 'Potencial Recorrente (R$)', 'Potencial Não Recorrente (R$)'
      ];
      const rows = linhas.map(r => [
        r.tipo, r.codigo, r.cnpj, r.razaoSocial, r.segmento, r.subsegmento,
        r.porte, r.faixaFat, r.unidade, r.uf, r.oferta,
        r.dimensao, r.icp, r.potRec, r.potNRec
      ].map(escapeCsv).join(';'));
      csvContent = '\uFEFF' + [headers.map(escapeCsv).join(';'), ...rows].join('\n');
      filename = 'mapa_oportunidades_base.csv';
    } else {
      const headers = [
        'Segmento Produto', 'Oportunidade', 'Tipo de Cliente', 'ICP',
        'Porte', 'Faixa de Faturamento', 'Dimensão', 'TM Recorrente (R$)', 'TM Não Recorrente (R$)'
      ];
      const rows = linhas.map(r => [
        r.segProduto, r.oferta, r.tipoCliente, r.icp,
        r.porte, r.faixaFat, r.dimensao, r.tmRec, r.tmNRec
      ].map(escapeCsv).join(';'));
      csvContent = '\uFEFF' + [headers.map(escapeCsv).join(';'), ...rows].join('\n');
      filename = 'mapa_oportunidades_perfis_icp.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.feedbackExportacao = `Arquivo "${filename}" exportado (${linhas.length} registros).`;
    this.requestUpdate();
  }

  render() {
    const isOportunidades = this.modoTabela === 'OPORTUNIDADES';
    const termo = (this.buscaTexto || '').trim().toLowerCase();

    const segmentosDisponiveis = isOportunidades
      ? [...new Set(BASE_OPORTUNIDADES_DATA.map(r => r.segmento))].sort()
      : [...new Set(PERFIS_ICP_DATA.map(r => r.segProduto))].sort();

    const linhasFiltradas = isOportunidades
      ? BASE_OPORTUNIDADES_DATA.filter((r) => {
          if (this.filtroTipoCliente !== 'TODOS' && r.tipo !== this.filtroTipoCliente) return false;
          if (this.filtroSegmento !== 'TODOS' && r.segmento !== this.filtroSegmento) return false;
          if (this.filtroIcp !== 'TODOS' && r.icp !== this.filtroIcp) return false;
          if (termo) {
            const hay = `${r.codigo} ${r.cnpj} ${r.razaoSocial} ${r.oferta} ${r.unidade}`.toLowerCase();
            if (!hay.includes(termo)) return false;
          }
          return true;
        })
      : PERFIS_ICP_DATA.filter((r) => {
          if (this.filtroTipoCliente !== 'TODOS' && r.tipoCliente !== this.filtroTipoCliente) return false;
          if (this.filtroSegmento !== 'TODOS' && r.segProduto !== this.filtroSegmento) return false;
          if (this.filtroIcp !== 'TODOS' && r.icp !== this.filtroIcp) return false;
          if (termo) {
            const hay = `${r.segProduto} ${r.oferta} ${r.icp} ${r.porte}`.toLowerCase();
            if (!hay.includes(termo)) return false;
          }
          return true;
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
           BARRA DE AÇÃO SUPERIOR (ALTERNÂNCIA DE BASE + EXPORTAÇÃO CSV)
           ========================================================= */
        .action-switch-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-switch-base {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 999px;
          padding: 11px 22px;
          font-size: 12.5px;
          font-weight: 800;
          color: #172e4d;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
          transition: all 0.15s ease;
        }

        .btn-switch-base:hover {
          border-color: #7c3aed;
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .btn-export-csv {
          background: #172e4d;
          color: #ffffff;
          border: none;
          border-radius: 999px;
          padding: 11px 22px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(23, 46, 77, 0.22);
          transition: all 0.15s ease;
        }

        .btn-export-csv:hover {
          background: #7c3aed;
          transform: translateY(-1px);
        }

        /* =========================================================
           CARD DA TABELA ANALÍTICA COM ROLAGEM
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

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 260px;
          max-width: 440px;
        }

        .search-input-wrap svg {
          position: absolute;
          left: 11px;
          color: #64748b;
          pointer-events: none;
        }

        .search-table-input {
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

        .search-table-input:focus {
          border-color: #7c3aed;
          background: #ffffff;
        }

        .toolbar-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .count-tag {
          font-size: 11.5px;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 5px 11px;
          border-radius: 6px;
        }

        .extract-table-scroll {
          width: 100%;
          max-height: 560px;
          overflow-x: auto;
          overflow-y: auto;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
        }

        .extract-table-scroll::-webkit-scrollbar {
          width: 9px;
          height: 9px;
        }

        .extract-table-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }

        .extract-table-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 8px;
          border: 2px solid #f1f5f9;
        }

        .extract-table-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        .extract-table {
          width: 100%;
          min-width: 1520px;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 12.5px;
        }

        .extract-table.icp-mode {
          min-width: 1240px;
        }

        .extract-table thead th {
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
          text-align: left;
        }

        .extract-table thead th.num,
        .extract-table tbody td.num {
          text-align: right;
        }

        .extract-table thead th.col-sticky-1 {
          position: sticky;
          left: 0;
          z-index: 20;
          min-width: 115px;
        }

        .extract-table tbody td {
          padding: 9px 14px;
          border-bottom: 1px solid #e2e8f0;
          border-right: 1px solid #f1f5f9;
          color: #1e293b;
          white-space: nowrap;
          background: #ffffff;
        }

        .extract-table tbody tr:nth-child(even) td {
          background: #f8fafc;
        }

        .extract-table tbody tr:hover td {
          background: #f3e8ff;
        }

        .extract-table tbody td.col-sticky-1 {
          position: sticky;
          left: 0;
          z-index: 5;
          font-weight: 800;
          box-shadow: 3px 0 6px -3px rgba(15, 23, 42, 0.12);
        }

        .tipo-pill {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 5px;
        }

        .tipo-NOVO {
          background: #f3e8ff;
          color: #6d28d9;
        }

        .tipo-BASE-ATIVO {
          background: #e0f2fe;
          color: #0284c7;
        }

        .tipo-BASE-DORMENTE {
          background: #ccfbf1;
          color: #0f766e;
        }

        .tipo-AMBOS {
          background: #f1f5f9;
          color: #334155;
        }

        .icp-pill {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .icp-acima {
          background: #f3e8ff;
          color: #6d28d9;
        }

        .icp-esperado {
          background: #e0f2fe;
          color: #0284c7;
        }

        .mono-code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 12px;
          color: #334155;
        }

        .empty-row {
          text-align: center !important;
          padding: 36px !important;
          color: #64748b !important;
          font-weight: 700;
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
            <div class="title-sub">Extração</div>
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
                      class="nav-option-btn ${g.id === 'extracao-relatorios' ? 'active' : ''}"
                      @click="${() => this.selecionarGuia(g)}">
                      <span class="nav-opt-dot"></span>
                      <div class="nav-opt-text">
                        <div class="nav-opt-title">
                          <span>${g.titulo}</span>
                          ${g.id === 'extracao-relatorios' ? html`<span class="badge-atual">Atual</span>` : ''}
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
              <select class="filter-select" .value="${this.filtroTipoCliente}" @change="${(e) => { this.filtroTipoCliente = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos</option>
                ${isOportunidades ? html`
                  <option value="NOVO">NOVO</option>
                  <option value="BASE ATIVO">BASE ATIVO</option>
                  <option value="BASE DORMENTE">BASE DORMENTE</option>
                ` : html`
                  <option value="AMBOS">AMBOS</option>
                  <option value="NOVO">NOVO</option>
                  <option value="BASE">BASE</option>
                `}
              </select>
            </div>

            <div class="filter-item">
              <span>${isOportunidades ? 'Segmento:' : 'Segmento Produto:'}</span>
              <select class="filter-select" .value="${this.filtroSegmento}" @change="${(e) => { this.filtroSegmento = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos os Segmentos</option>
                ${segmentosDisponiveis.map(s => html`<option value="${s}">${s}</option>`)}
              </select>
            </div>

            <div class="filter-item">
              <span>Classificação ICP:</span>
              <select class="filter-select" .value="${this.filtroIcp}" @change="${(e) => { this.filtroIcp = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Todos os ICPs</option>
                ${isOportunidades ? html`
                  <option value="Acima do Esperado">Acima do Esperado</option>
                  <option value="Esperado">Esperado</option>
                ` : html`
                  <option value="ICP PERFORMANCE ACIMA DO ESPERADO">ICP PERFORMANCE ACIMA DO ESPERADO</option>
                  <option value="ICP PERFORMANCE ESPERADA">ICP PERFORMANCE ESPERADA</option>
                `}
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

        ${this.feedbackExportacao ? html`
          <div class="toast-banner">
            <span>${this.feedbackExportacao}</span>
            <button class="toast-close" @click="${() => { this.feedbackExportacao = ''; this.requestUpdate(); }}">✕</button>
          </div>
        ` : ''}

        <!-- BARRA SUPERIOR: BOTÃO DE ALTERNÂNCIA ENTRE AS DUAS TABELAS + EXPORTAÇÃO CSV -->
        <div class="action-switch-bar">
          <button
            type="button"
            class="btn-switch-base"
            @click="${() => this.alternarTabela()}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <span>
              ${isOportunidades
                ? 'Clique aqui para visualizar a base de perfis (ICP) dos produtos'
                : 'Clique aqui para visualizar a base de oportunidades mapeadas'}
            </span>
          </button>

          <button
            type="button"
            class="btn-export-csv"
            @click="${() => this.exportarCSV(linhasFiltradas)}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Exportar CSV (${linhasFiltradas.length})</span>
          </button>
        </div>

        <!-- CARD DA TABELA ATIVA -->
        <div class="table-card">
          <div class="section-header">
            <h2 class="section-title-pill">
              ${isOportunidades ? 'BASE DAS OPORTUNIDADES' : 'PERFIS DE CLIENTES (ICP)'}
            </h2>
            <div class="section-header-line"></div>
          </div>

          <div class="table-toolbar">
            <div class="search-input-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                class="search-table-input"
                placeholder="${isOportunidades ? 'Buscar por razão social, CNPJ, código ou oferta...' : 'Buscar por segmento produto ou oportunidade...'}"
                .value="${this.buscaTexto}"
                @input="${(e) => { this.buscaTexto = e.target.value; this.requestUpdate(); }}"
              />
            </div>

            <div class="toolbar-meta">
              <span class="count-tag">${linhasFiltradas.length} registros</span>
            </div>
          </div>

          <div class="extract-table-scroll">
            ${isOportunidades ? html`
              <table class="extract-table">
                <thead>
                  <tr>
                    <th class="col-sticky-1">Tipo</th>
                    <th>Código</th>
                    <th>CNPJ</th>
                    <th>Razão Social</th>
                    <th>Segmento</th>
                    <th>Subsegmento</th>
                    <th>Porte</th>
                    <th>Faixa de Faturamento</th>
                    <th>Unidade</th>
                    <th>UF</th>
                    <th>Oportunidade</th>
                    <th>Dimensão</th>
                    <th>ICP</th>
                    <th class="num">Recorrente (R$)</th>
                    <th class="num">Não Recorrente (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  ${linhasFiltradas.length === 0 ? html`
                    <tr><td colspan="15" class="empty-row">Nenhum registro encontrado para os filtros aplicados.</td></tr>
                  ` : linhasFiltradas.map((r) => {
                    const tipoCls = r.tipo.replace(/\s+/g, '-');
                    const isAcima = r.icp === 'Acima do Esperado';
                    return html`
                      <tr>
                        <td class="col-sticky-1">
                          <span class="tipo-pill tipo-${tipoCls}">${r.tipo}</span>
                        </td>
                        <td class="mono-code">${r.codigo || '--'}</td>
                        <td class="mono-code">${r.cnpj}</td>
                        <td style="font-weight: 800; color: #0f172a;">${r.razaoSocial}</td>
                        <td>${r.segmento}</td>
                        <td>${r.subsegmento}</td>
                        <td>${r.porte}</td>
                        <td>${r.faixaFat}</td>
                        <td style="font-weight: 700;">${r.unidade}</td>
                        <td style="font-weight: 700;">${r.uf}</td>
                        <td style="font-weight: 800; color: #172e4d;">${r.oferta}</td>
                        <td>${r.dimensao}</td>
                        <td>
                          <span class="icp-pill ${isAcima ? 'icp-acima' : 'icp-esperado'}">${r.icp}</span>
                        </td>
                        <td class="num" style="font-weight: 800;">${this.formatExactBRL(r.potRec)}</td>
                        <td class="num" style="font-weight: ${r.potNRec > 0 ? '800' : '500'}; color: ${r.potNRec > 0 ? '#0f172a' : '#94a3b8'};">
                          ${this.formatExactBRL(r.potNRec)}
                        </td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            ` : html`
              <table class="extract-table icp-mode">
                <thead>
                  <tr>
                    <th class="col-sticky-1" style="min-width: 210px;">Segmento Produto</th>
                    <th>Oportunidade</th>
                    <th>Tipo de Cliente</th>
                    <th>ICP</th>
                    <th>Porte</th>
                    <th>Faixa de Faturamento</th>
                    <th>Dimensão</th>
                    <th class="num">TM Recorrente (R$)</th>
                    <th class="num">TM Não Recorrente (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  ${linhasFiltradas.length === 0 ? html`
                    <tr><td colspan="9" class="empty-row">Nenhum perfil ICP encontrado para os filtros aplicados.</td></tr>
                  ` : linhasFiltradas.map((r) => {
                    const isAcima = r.icp.includes('ACIMA');
                    return html`
                      <tr>
                        <td class="col-sticky-1" style="color: #172e4d;">${r.segProduto}</td>
                        <td style="font-weight: 800; color: #0f172a;">${r.oferta}</td>
                        <td>
                          <span class="tipo-pill tipo-${r.tipoCliente}">${r.tipoCliente}</span>
                        </td>
                        <td>
                          <span class="icp-pill ${isAcima ? 'icp-acima' : 'icp-esperado'}">${r.icp}</span>
                        </td>
                        <td>${r.porte}</td>
                        <td>${r.faixaFat}</td>
                        <td>${r.dimensao}</td>
                        <td class="num" style="font-weight: 800;">${this.formatExactBRL(r.tmRec)}</td>
                        <td class="num" style="font-weight: ${r.tmNRec > 0 ? '800' : '500'}; color: ${r.tmNRec > 0 ? '#0f172a' : '#94a3b8'};">
                          ${this.formatExactBRL(r.tmNRec)}
                        </td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            `}
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, MapaOportunidadesExtracao);
