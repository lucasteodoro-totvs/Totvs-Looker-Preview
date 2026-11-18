/**
 * @title Portal Executivo TOTVS & Hub Analítico (Versão Vercel Preview)
 * @description Central unificada de dashboards corporativos com blocos expansíveis
 *              (Performance de Vendas e Mapa de Oportunidades), Persona Tetris retrátil e navegação integrada.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'portal-executivo';

/* ==========================================
   BLOCO 1: PERFORMANCE DE VENDAS (12)
   ========================================== */
const DASHBOARDS_PERFORMANCE_VENDAS = [
  {
    id: 'One_page',
    categoria: 'Estratégico',
    nome: 'One Page Executivo',
    metricas: ['Cenário Mês/YTD', 'New Names', 'Extremos Segmento', 'Top Ofertas'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=one-page',
    emConstrucao: false
  },
  {
    id: 'Performance_vendas',
    categoria: 'Comercial',
    nome: 'Performance de Vendas',
    metricas: ['Produção R$', 'Meta & Atingimento', 'Volume (Qtd)', 'Ticket Médio'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=performance-vendas',
    emConstrucao: false
  },
  {
    id: 'Performance_segmentosv2',
    categoria: 'Comercial',
    nome: 'Performance dos Segmentos V2',
    metricas: ['Atingimento %', 'YoY Produção', 'Ticket Médio', 'Delta Orçado'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=performance-segmentos',
    emConstrucao: false
  },
  {
    id: 'Curva_abc',
    categoria: 'Comercial',
    nome: 'Curva ABC de Vendas',
    metricas: ['Pareto 80/20', 'Curva A/B/C', 'Concentração', 'Volume Acumulado'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=curva-abc',
    emConstrucao: false
  },
  {
    id: 'Performance_subsegmentos',
    categoria: 'Comercial',
    nome: 'Performance dos Subsegmentos',
    metricas: ['Produção', 'YoY %', 'Rep. %', 'Volume Real'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=subsegmentos',
    emConstrucao: false
  },
  {
    id: 'Composicao_vendas',
    categoria: 'Comercial',
    nome: 'Composição das Vendas V2',
    metricas: ['Base vs Novo', 'Rosca Receita', 'Rosca Qtd', 'Histórico 13M'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=composicao-vendas',
    emConstrucao: false
  },
  {
    id: 'Ofertas_analiticos',
    categoria: 'Comercial',
    nome: 'Ofertas Analíticas',
    metricas: ['Mês vs YTD', 'Ofertas Core', 'Intera Segmentos', 'YoY TM'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=ofertas-analitico',
    emConstrucao: false
  },
  {
    id: 'Performance_unidades',
    categoria: 'Canais',
    nome: 'Performance das Unidades',
    metricas: ['Top 3 Volume', 'Atingimento Canais', 'Volumetria Real (un)', 'Delta R$'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=performance-unidades',
    emConstrucao: false
  },
  {
    id: 'Unidades_analitico',
    categoria: 'Canais',
    nome: 'Unidades Analítico',
    metricas: ['Filiais', 'Franquias', 'Verticais', 'MI Internacional'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=unidades-analitico',
    emConstrucao: false
  },
  {
    id: 'Ranking_clientes',
    categoria: 'Estratégico',
    nome: 'Ranking de Clientes (Top 5)',
    metricas: ['Top 5 CDU', 'Top 5 Recorrente', 'Base vs Novo', 'Ofertas Associadas'],
    dataAtualizacao: '30/10/2026 às 11:00',
    url: '?dash=ranking-clientes',
    emConstrucao: false
  },
  {
    id: 'Parceiros',
    categoria: 'Canais',
    nome: 'Parceiros Homologados',
    metricas: ['Dimensão de parceiros não disponibilizada no Looker'],
    dataAtualizacao: 'Em breve',
    url: '?dash=parceiros',
    emConstrucao: true
  },
  {
    id: 'Producao_churn',
    categoria: 'Financeiro',
    nome: 'Produção x Churn',
    metricas: ['Dados do Churn ainda não disponibilizados no looker'],
    dataAtualizacao: 'Em breve',
    url: '?dash=producao-churn',
    emConstrucao: true
  }
];

/* ==========================================
   BLOCO 2: MAPA DE OPORTUNIDADES (7 GUIAS EM ORDEM)
   ========================================== */
const DASHBOARDS_MAPA_OPORTUNIDADES = [
  {
    id: 'Mapa_premissas',
    categoria: 'Estratégico',
    nome: 'Premissas',
    metricas: ['Fontes Utilizadas', 'Guia de Navegação', 'Glossário de Conceitos', 'Definição dos ICPs'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades',
    emConstrucao: false
  },
  {
    id: 'Mapa_panorama_oportunidades',
    categoria: 'Estratégico',
    nome: 'Panorama de Oportunidades',
    metricas: ['Total vs Base vs Novos', 'Recorrente vs Não Rec.', 'Gestão vs DC+RD', 'Performance por ICP'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades-panorama',
    emConstrucao: false
  },
  {
    id: 'Mapa_panorama_segmentos',
    categoria: 'Comercial',
    nome: 'Panorama de Segmentos',
    metricas: ['11 Segmentos (Base/Novo)', 'Faixa de Faturamento', 'Resumo ICP & Dimensão', 'Top Subsegmentos'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades-segmentos',
    emConstrucao: false
  },
  {
    id: 'Mapa_panorama_ofertas',
    categoria: 'Comercial',
    nome: 'Panorama de Ofertas',
    metricas: ['Curvas A, B e C', 'Ticket Médio Rec./Não Rec.', '% Qtd Base vs Novo', '% Acima vs Esperado'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades-ofertas',
    emConstrucao: false
  },
  {
    id: 'Mapa_panorama_regioes',
    categoria: 'Canais',
    nome: 'Panorama de Regiões e Unidades',
    metricas: ['Filiais vs Franquias', 'Mapa do Brasil por Região', 'Top 5 Unidades', 'Top 10 Cidades'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades-regioes',
    emConstrucao: false
  },
  {
    id: 'Mapa_painel_acao',
    categoria: 'Comercial',
    nome: 'Painel de Ação',
    metricas: ['Novo vs Ativo vs Dormente', 'Faixas por Cliente', 'Perfil do Cliente', 'Ofertas Acima/Esperado'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades-painel-acao',
    emConstrucao: false
  },
  {
    id: 'Mapa_extracao_relatorios',
    categoria: 'Estratégico',
    nome: 'Extração de Relatórios',
    metricas: ['Base das Oportunidades', 'Perfis de Clientes (ICP)', 'Filtros Dinâmicos', 'Exportação CSV'],
    dataAtualizacao: '3º dia útil do mês',
    url: '?dash=mapa-oportunidades-extracao',
    emConstrucao: false
  }
];

/* ==========================================
   PERSONAS E TETROMINOES
   ========================================== */
const TETRIS_PERSONAS = {
  'I': { nome: 'Robert', cor: '#a855f7', icone: '👑', shape: [[1, 1, 1, 1]] },
  'O': { nome: 'Homer', cor: '#06b6d4', icone: '🍩', shape: [[1, 1], [1, 1]] },
  'T': { nome: 'Milhouse', cor: '#6366f1', icone: '👓', shape: [[0, 1, 0], [1, 1, 1]] },
  'L': { nome: 'Bernard', cor: '#f59e0b', icone: '🍺', shape: [[1, 0], [1, 0], [1, 1]] },
  'Z': { nome: 'Bart', cor: '#ea580c', icone: '🛹', shape: [[1, 1, 0], [0, 1, 1]] },
  'J': { nome: 'Marge', cor: '#3b82f6', icone: '🧵', shape: [[0, 1], [0, 1], [1, 1]] },
  'S': { nome: 'Lisa', cor: '#10b981', icone: '🎷', shape: [[0, 1, 1], [1, 1, 0]] }
};

const TETRIS_KEYS = ['Z', 'O', 'T', 'L', 'I', 'S', 'J'];

export class PortalExecutivo extends LitElement {
  static properties = {
    termoBusca: { type: String },
    filtroCategoria: { type: String },
    tetrisMinimizado: { type: Boolean },
    performanceVendasAberto: { type: Boolean },
    mapaOportunidadesAberto: { type: Boolean },

    board: { type: Array },
    score: { type: Number },
    lines: { type: Number },
    currentPiece: { type: Object },
    nextPieceKey: { type: String },
    afterNextKey: { type: String },
    isPaused: { type: Boolean },
    gameOver: { type: Boolean },
    notificacao: { type: String }
  };

  constructor() {
    super();
    this.termoBusca = '';
    this.filtroCategoria = 'TODOS';
    this.tetrisMinimizado = true;
    this.performanceVendasAberto = true;
    this.mapaOportunidadesAberto = true;

    this.COLS = 10;
    this.ROWS = 20;
    this.score = 0;
    this.lines = 0;
    this.isPaused = false;
    this.gameOver = false;
    this.notificacao = '';

    this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(0));
    this.initTetrisBag();

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    this.startGameLoop();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.gameInterval) clearInterval(this.gameInterval);
  }

  initTetrisBag() {
    this.nextPieceKey = 'S';
    this.afterNextKey = 'T';
    this.spawnPiece('Z');
  }

  getRandomKey() {
    return TETRIS_KEYS[Math.floor(Math.random() * TETRIS_KEYS.length)];
  }

  spawnPiece(typeKey) {
    const key = typeKey || this.nextPieceKey;
    const persona = TETRIS_PERSONAS[key];
    this.nextPieceKey = this.afterNextKey;
    this.afterNextKey = this.getRandomKey();

    this.currentPiece = {
      key,
      shape: persona.shape.map(row => [...row]),
      color: persona.cor,
      x: Math.floor((this.COLS - persona.shape[0].length) / 2),
      y: 0
    };

    if (this.checkCollision(this.currentPiece.x, this.currentPiece.y, this.currentPiece.shape)) {
      this.gameOver = true;
    }
  }

  startGameLoop() {
    if (this.gameInterval) clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => {
      if (!this.isPaused && !this.gameOver && !this.tetrisMinimizado) {
        this.stepDown();
      }
    }, 750);
  }

  checkCollision(targetX, targetY, shape) {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const bx = targetX + c;
          const by = targetY + r;
          if (bx < 0 || bx >= this.COLS || by >= this.ROWS) return true;
          if (by >= 0 && this.board[by][bx] !== 0) return true;
        }
      }
    }
    return false;
  }

  rotateMatrix(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
  }

  moveLeft() {
    if (this.isPaused || this.gameOver || this.tetrisMinimizado) return;
    if (!this.checkCollision(this.currentPiece.x - 1, this.currentPiece.y, this.currentPiece.shape)) {
      this.currentPiece.x--;
      this.requestUpdate();
    }
  }

  moveRight() {
    if (this.isPaused || this.gameOver || this.tetrisMinimizado) return;
    if (!this.checkCollision(this.currentPiece.x + 1, this.currentPiece.y, this.currentPiece.shape)) {
      this.currentPiece.x++;
      this.requestUpdate();
    }
  }

  spin() {
    if (this.isPaused || this.gameOver || this.tetrisMinimizado) return;
    const rotated = this.rotateMatrix(this.currentPiece.shape);
    if (!this.checkCollision(this.currentPiece.x, this.currentPiece.y, rotated)) {
      this.currentPiece.shape = rotated;
      this.requestUpdate();
    } else if (!this.checkCollision(this.currentPiece.x - 1, this.currentPiece.y, rotated)) {
      this.currentPiece.x--;
      this.currentPiece.shape = rotated;
      this.requestUpdate();
    } else if (!this.checkCollision(this.currentPiece.x + 1, this.currentPiece.y, rotated)) {
      this.currentPiece.x++;
      this.currentPiece.shape = rotated;
      this.requestUpdate();
    }
  }

  stepDown() {
    if (this.isPaused || this.gameOver || this.tetrisMinimizado) return;
    if (!this.checkCollision(this.currentPiece.x, this.currentPiece.y + 1, this.currentPiece.shape)) {
      this.currentPiece.y++;
      this.requestUpdate();
    } else {
      this.lockPiece();
    }
  }

  fastFall() {
    this.score += 1;
    this.stepDown();
  }

  slam() {
    if (this.isPaused || this.gameOver || this.tetrisMinimizado) return;
    let drops = 0;
    while (!this.checkCollision(this.currentPiece.x, this.currentPiece.y + 1, this.currentPiece.shape)) {
      this.currentPiece.y++;
      drops++;
    }
    this.score += drops * 2;
    this.lockPiece();
  }

  lockPiece() {
    const { x, y, shape, color } = this.currentPiece;
    const newBoard = this.board.map(row => [...row]);

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && y + r >= 0) {
          newBoard[y + r][x + c] = color;
        }
      }
    }

    const filteredBoard = newBoard.filter(row => row.some(cell => cell === 0));
    const cleared = this.ROWS - filteredBoard.length;

    while (filteredBoard.length < this.ROWS) {
      filteredBoard.unshift(Array(this.COLS).fill(0));
    }

    this.board = filteredBoard;
    if (cleared > 0) {
      this.lines += cleared;
      this.score += cleared === 1 ? 100 : cleared === 2 ? 300 : cleared === 3 ? 500 : 800;
    }

    this.spawnPiece();
    this.requestUpdate();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.requestUpdate();
  }

  restartGame() {
    this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(0));
    this.score = 0;
    this.lines = 0;
    this.gameOver = false;
    this.isPaused = false;
    this.initTetrisBag();
    this.requestUpdate();
  }

  handleKeyDown(e) {
    if (this.tetrisMinimizado) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); this.moveLeft(); }
    else if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); this.moveRight(); }
    else if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); this.spin(); }
    else if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); this.fastFall(); }
    else if (e.key === ' ') { e.preventDefault(); this.slam(); }
    else if (['p', 'P'].includes(e.key)) { e.preventDefault(); this.togglePause(); }
    else if (['r', 'R'].includes(e.key)) { e.preventDefault(); this.restartGame(); }
  }

  getGhostY() {
    let ghostY = this.currentPiece.y;
    while (!this.checkCollision(this.currentPiece.x, ghostY + 1, this.currentPiece.shape)) {
      ghostY++;
    }
    return ghostY;
  }

  getGridCells() {
    const cells = [];
    const { currentPiece, board } = this;
    const ghostY = this.getGhostY();

    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        let color = board[r][c] || null;
        let type = color ? 'locked' : 'empty';

        if (currentPiece && currentPiece.shape) {
          const gr = r - ghostY;
          const gc = c - currentPiece.x;
          if (gr >= 0 && gr < currentPiece.shape.length && gc >= 0 && gc < currentPiece.shape[0].length) {
            if (currentPiece.shape[gr][gc] && type === 'empty') {
              type = 'ghost';
              color = currentPiece.color;
            }
          }

          const pr = r - currentPiece.y;
          const pc = c - currentPiece.x;
          if (pr >= 0 && pr < currentPiece.shape.length && pc >= 0 && pc < currentPiece.shape[0].length) {
            if (currentPiece.shape[pr][pc]) {
              type = 'active';
              color = currentPiece.color;
            }
          }
        }

        cells.push({ r, c, type, color });
      }
    }
    return cells;
  }

  copiarUrl(dash, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!dash.url) return;

    const fullUrl = new URL(dash.url, window.location.href).href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl);
    } else {
      const input = document.createElement('input');
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }

    this.notificacao = `📋 Link do "${dash.nome}" copiado com sucesso!`;
    this.requestUpdate();
    setTimeout(() => {
      this.notificacao = '';
      this.requestUpdate();
    }, 3200);
  }

  filtrarLista(lista) {
    const termo = (this.termoBusca || '').trim().toLowerCase();
    return lista.filter(d => {
      const matchCat = this.filtroCategoria === 'TODOS' || d.categoria.toUpperCase() === this.filtroCategoria;
      const matchTermo = !termo ||
                         d.nome.toLowerCase().includes(termo) ||
                         d.metricas.some(m => m.toLowerCase().includes(termo));
      return matchCat && matchTermo;
    });
  }

  renderDashboardCard(dash, isMapaOportunidades = false) {
    return html`
      <div class="dash-card ${isMapaOportunidades ? 'mapa-card' : ''}">
        <div class="card-top">
          <div class="card-meta-row">
            <span class="cat-pill cat-${dash.categoria.toLowerCase().replace('é', 'e')}">${dash.categoria}</span>
            ${dash.emConstrucao ? html`<span class="badge-construcao">Em Construção</span>` : ''}
          </div>
          <h3 class="dash-card-title">${dash.nome}</h3>

          ${dash.emConstrucao ? html`
            <div class="msg-indisponivel">
              <span>ℹ️</span>
              <span>${dash.metricas[0]}</span>
            </div>
          ` : html`
            <div class="metric-tags-row">
              ${dash.metricas.map(m => html`<span class="metric-tag">${m}</span>`)}
            </div>
          `}
        </div>

        <div class="card-bottom">
          <div class="update-time">
            ${dash.emConstrucao ? 'Previsão: Em breve' : `Atualizado em ${dash.dataAtualizacao}`}
          </div>

          ${dash.emConstrucao ? html`
            <div class="actions-row">
              <a
                class="btn-previa"
                href="${dash.url}"
                title="Ver prévia visual de ${dash.nome}">
                <span>Ver Prévia</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>

              <button
                type="button"
                class="btn-copiar"
                @click="${(e) => this.copiarUrl(dash, e)}"
                title="Copiar link da prévia">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>

            <div class="hint-shortcut">
              Ctrl + Clique ou Botão Direito
            </div>
          ` : html`
            <div class="actions-row">
              <a
                class="btn-acessar"
                href="${dash.url}"
                title="Abrir ${dash.nome}">
                <span>Acessar</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>

              <button
                type="button"
                class="btn-copiar"
                @click="${(e) => this.copiarUrl(dash, e)}"
                title="Copiar link do dashboard">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>

            <div class="hint-shortcut">
              Ctrl + Clique ou Botão Direito
            </div>
          `}
        </div>
      </div>
    `;
  }

  render() {
    const filtradosPerformance = this.filtrarLista(DASHBOARDS_PERFORMANCE_VENDAS);
    const filtradosMapa = this.filtrarLista(DASHBOARDS_MAPA_OPORTUNIDADES);
    const totalGeral = DASHBOARDS_PERFORMANCE_VENDAS.length + DASHBOARDS_MAPA_OPORTUNIDADES.length;

    const temBuscaAtiva = (this.termoBusca || '').trim().length > 0;
    const perfExpandido = temBuscaAtiva ? filtradosPerformance.length > 0 : this.performanceVendasAberto;
    const mapaExpandido = temBuscaAtiva ? filtradosMapa.length > 0 : this.mapaOportunidadesAberto;

    const nextPersona = TETRIS_PERSONAS[this.nextPieceKey];
    const afterNextPersona = TETRIS_PERSONAS[this.afterNextKey];
    const gridCells = this.getGridCells();

    return html`
      <style>
        * { box-sizing: border-box; }

        @keyframes spinMesh {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes accordionSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
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
          overflow-x: hidden;
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
          margin-bottom: 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          min-height: 85px;
          overflow: hidden;
          position: relative;
          z-index: 1;
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

        .hub-split-layout {
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 1;
          align-items: flex-start;
        }

        .btn-expand-tetris-strip {
          background: #080d1a;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          color: #38bdf8;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .btn-expand-tetris-strip:hover {
          background: #0f172a;
          border-color: #7c3aed;
          transform: scale(1.02);
        }

        .vertical-strip-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          color: #f1f5f9;
          text-transform: uppercase;
        }

        .tetris-aside {
          width: 250px;
          background: #080d1a;
          border: 1.5px solid #1e293b;
          border-radius: 14px;
          padding: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
          color: #ffffff;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          outline: none;
        }

        .arcade-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 8px;
        }

        .arcade-title-text {
          font-size: 12px;
          font-weight: 900;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.3px;
        }

        .arcade-top-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .btn-mini-action {
          background: #0f172a;
          border: 1px solid #334155;
          color: #f8fafc;
          padding: 3px 6px;
          border-radius: 4px;
          font-size: 9.5px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-mini-action:hover { background: #1e293b; }
        .btn-minimize { background: #1e293b; color: #38bdf8; border-color: #475569; }

        .arcade-stats-bar {
          display: flex;
          gap: 6px;
        }

        .stat-mini-card {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 5px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .stat-label {
          font-size: 8px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .stat-val {
          font-size: 15px;
          font-weight: 900;
          color: #c084fc;
          line-height: 1.1;
        }

        .preview-mini-card {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 5px 6px;
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1.2;
        }

        .preview-mini-card.active-border { border-color: #ea580c; }
        .preview-avatar { font-size: 12px; }
        .preview-meta { display: flex; flex-direction: column; }
        .preview-tag { font-size: 7px; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .preview-char { font-size: 10px; font-weight: 900; }

        .mini-shape-preview {
          display: flex;
          flex-direction: column;
          gap: 1.5px;
          margin-left: auto;
        }
        .mini-shape-row { display: flex; gap: 1.5px; }
        .mini-block { width: 5px; height: 5px; border-radius: 1px; }

        .board-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .tetris-board-grid {
          width: 200px;
          height: 400px;
          background: #040814;
          border: 2px solid #1e293b;
          border-radius: 8px;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: repeat(20, 1fr);
          gap: 1.5px;
          padding: 3px;
          box-shadow: inset 0 0 16px rgba(0,0,0,0.85);
        }

        .t-cell {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }

        .t-cell.empty {
          background: rgba(15, 23, 42, 0.45);
        }

        .t-cell.filled {
          border-radius: 2px;
        }

        .t-cell.ghost {
          background: transparent;
          border: 1.5px dashed;
          opacity: 0.55;
        }

        .touch-pad {
          display: flex;
          gap: 4px;
          width: 100%;
          justify-content: center;
        }

        .pad-btn {
          background: #0f172a;
          border: 1px solid #334155;
          color: #ffffff;
          padding: 6px 8px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pad-btn:hover { background: #1e293b; }
        .pad-btn:active { transform: scale(0.95); }
        .pad-btn.spin { background: #7c3aed; border-color: #6d28d9; }
        .pad-btn.fast { background: #0284c7; border-color: #0369a1; }
        .pad-btn.slam { background: #ea580c; border-color: #c2410c; }

        .keys-hint {
          font-size: 9px;
          font-weight: 600;
          color: #64748b;
          text-align: center;
        }

        .dashboards-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        .hub-controls-bar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          gap: 12px;
          flex-wrap: wrap;
        }

        .category-tabs {
          display: inline-flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 3px;
          border: 1px solid #cbd5e1;
          gap: 4px;
          flex-wrap: wrap;
        }

        .cat-tab-btn {
          background: transparent;
          border: none;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-transform: uppercase;
        }

        .cat-tab-btn.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 43, 73, 0.25);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 240px;
        }

        .search-input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 7px 12px 7px 32px;
          font-size: 11.5px;
          font-weight: 600;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .search-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .search-icon {
          position: absolute;
          left: 10px;
          width: 14px;
          height: 14px;
          fill: #94a3b8;
          pointer-events: none;
        }

        /* =========================================================
           BLOCOS EXPANSÍVEIS / RETRÁTEIS (ACCORDION)
           ========================================================= */
        .hub-accordion-section {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(14px);
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 18px -2px rgba(15, 23, 42, 0.07);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .hub-accordion-header {
          width: 100%;
          background: #ffffff;
          border: none;
          border-bottom: 1px solid transparent;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
          user-select: none;
        }

        .hub-accordion-header:hover {
          background: #f8fafc;
        }

        .hub-accordion-header.open {
          border-bottom-color: #e2e8f0;
        }

        .acc-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .acc-accent-bar {
          width: 5px;
          height: 28px;
          border-radius: 999px;
          background: #002b49;
          flex-shrink: 0;
        }

        .acc-accent-bar.mapa {
          background: #7c3aed;
        }

        .acc-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .acc-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .acc-title {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.3px;
          margin: 0;
        }

        .acc-count-pill {
          font-size: 11px;
          font-weight: 800;
          background: #e0f2fe;
          color: #0369a1;
          padding: 2px 9px;
          border-radius: 999px;
        }

        .acc-count-pill.mapa {
          background: #f3e8ff;
          color: #6d28d9;
        }

        .acc-subtitle {
          font-size: 11.5px;
          font-weight: 600;
          color: #64748b;
        }

        .acc-right {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        .acc-chevron {
          display: inline-flex;
          transition: transform 0.2s ease;
        }

        .acc-chevron.open {
          transform: rotate(180deg);
        }

        .hub-accordion-body {
          padding: 18px;
          animation: accordionSlideDown 0.18s ease-out;
        }

        .empty-section-msg {
          text-align: center;
          padding: 24px;
          font-size: 12.5px;
          font-weight: 700;
          color: #64748b;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          border: 1px dashed #cbd5e1;
        }

        .dashboards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
          gap: 16px;
        }

        .dash-card {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 16px 18px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          border-top: 4px solid #002b49;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-top-color 0.2s ease;
        }

        .dash-card.mapa-card {
          border-top-color: #7c3aed;
        }

        .dash-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(0, 43, 73, 0.12);
          border-top-color: #6366f1;
        }

        .card-top {
          margin-bottom: 12px;
        }

        .card-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .cat-pill {
          font-size: 9.5px;
          font-weight: 900;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.4px;
        }

        .cat-comercial { background: #dbeafe; color: #1e40af; }
        .cat-canais { background: #e0e7ff; color: #3730a3; }
        .cat-financeiro { background: #fee2e2; color: #b91c1c; }
        .cat-estrategico { background: #fef3c7; color: #92400e; }

        .badge-construcao {
          background: #fef3c7;
          color: #b45309;
          border: 1px solid #fde68a;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .dash-card-title {
          font-size: 15px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 10px 0;
          letter-spacing: -0.3px;
          line-height: 1.25;
        }

        .metric-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .metric-tag {
          font-size: 9.5px;
          font-weight: 700;
          background: #f1f5f9;
          color: #475569;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .msg-indisponivel {
          font-size: 11px;
          font-weight: 600;
          color: #b45309;
          background: #fffbeb;
          border: 1px dashed #fde68a;
          border-radius: 6px;
          padding: 8px 10px;
          line-height: 1.35;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .card-bottom {
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .update-time {
          font-size: 10px;
          font-weight: 600;
          color: #64748b;
        }

        .actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .btn-acessar {
          flex: 1;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 35%, #7c3aed 80%, #a855f7 100%);
          color: #ffffff !important;
          border: none;
          padding: 9px 12px;
          border-radius: 7px;
          font-size: 11.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          outline: none;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
          letter-spacing: 0.3px;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-acessar:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.35);
          color: #ffffff !important;
        }

        .btn-previa {
          flex: 1;
          background: #f8fafc;
          border: 1.5px solid #7c3aed;
          color: #7c3aed !important;
          padding: 8px 12px;
          border-radius: 7px;
          font-size: 11.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          outline: none;
          letter-spacing: 0.3px;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-previa:hover {
          background: #7c3aed;
          color: #ffffff !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25);
        }

        .btn-copiar {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 8px 10px;
          border-radius: 7px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          outline: none;
          flex-shrink: 0;
        }

        .btn-copiar:hover {
          background: #e2e8f0;
          color: #0f172a;
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        .hint-shortcut {
          font-size: 9px;
          font-weight: 700;
          color: #94a3b8;
          text-align: center;
          letter-spacing: 0.2px;
          user-select: none;
        }

        .toast-notify {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #002b49;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 800;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid #38bdf8;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
          max-width: 440px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="dash-container">

        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>

          <div class="title-area">
            <h1>HUB DE DASHBOARDS</h1>
          </div>
        </div>

        <div class="hub-split-layout">

          <!-- TETRIS RETRÁTIL -->
          ${this.tetrisMinimizado ? html`
            <div class="btn-expand-tetris-strip" @click="${() => { this.tetrisMinimizado = false; this.isPaused = false; }}" title="Jogar Persona Tetris">
              <span>🕹️</span>
              <span class="vertical-strip-text">Jogar Tetris</span>
              <span>▶</span>
            </div>
          ` : html`
            <aside class="tetris-aside" tabindex="0">
              <div class="arcade-header">
                <span class="arcade-title-text">🕹️ PERSONA TETRIS</span>
                <div class="arcade-top-actions">
                  <button class="btn-mini-action" @click="${() => this.togglePause()}">
                    ${this.isPaused ? '▶️' : '⏸'}
                  </button>
                  <button class="btn-mini-action" @click="${() => this.restartGame()}">
                    🔄
                  </button>
                  <button class="btn-mini-action btn-minimize" @click="${() => this.tetrisMinimizado = true}" title="Minimizar">
                    ◀ Minimizar
                  </button>
                </div>
              </div>

              <div class="arcade-stats-bar">
                <div class="stat-mini-card">
                  <span class="stat-label">SCORE</span>
                  <span class="stat-val">${this.score}</span>
                </div>
                <div class="stat-mini-card">
                  <span class="stat-label">LINES</span>
                  <span class="stat-val" style="color: #38bdf8;">${this.lines}</span>
                </div>

                <div class="preview-mini-card active-border">
                  <span class="preview-avatar">${nextPersona.icone}</span>
                  <div class="preview-meta">
                    <span class="preview-tag">NEXT</span>
                    <span class="preview-char" style="color: ${nextPersona.cor};">${nextPersona.nome}</span>
                  </div>
                  <div class="mini-shape-preview">
                    ${nextPersona.shape.map(row => html`
                      <div class="mini-shape-row">
                        ${row.map(cell => html`
                          <div class="mini-block" style="background: ${cell ? nextPersona.cor : 'transparent'};"></div>
                        `)}
                      </div>
                    `)}
                  </div>
                </div>

                <div class="preview-mini-card">
                  <span class="preview-avatar">${afterNextPersona.icone}</span>
                  <div class="preview-meta">
                    <span class="preview-tag">AFTER</span>
                    <span class="preview-char" style="color: ${afterNextPersona.cor};">${afterNextPersona.nome}</span>
                  </div>
                  <div class="mini-shape-preview">
                    ${afterNextPersona.shape.map(row => html`
                      <div class="mini-shape-row">
                        ${row.map(cell => html`
                          <div class="mini-block" style="background: ${cell ? afterNextPersona.cor : 'transparent'};"></div>
                        `)}
                      </div>
                    `)}
                  </div>
                </div>
              </div>

              <div class="board-container">
                <div class="tetris-board-grid">
                  ${gridCells.map(cell => {
                    if (cell.type === 'active' || cell.type === 'locked') {
                      return html`<div class="t-cell filled" style="background-color: ${cell.color}; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4), 0 0 6px ${cell.color}88;"></div>`;
                    }
                    if (cell.type === 'ghost') {
                      return html`<div class="t-cell ghost" style="border-color: ${cell.color};"></div>`;
                    }
                    return html`<div class="t-cell empty"></div>`;
                  })}
                </div>

                <div class="touch-pad">
                  <button class="pad-btn" @click="${() => this.moveLeft()}">⬅️</button>
                  <button class="pad-btn spin" @click="${() => this.spin()}">🔄 Spin</button>
                  <button class="pad-btn" @click="${() => this.moveRight()}">➡️</button>
                  <button class="pad-btn fast" @click="${() => this.fastFall()}">⚡ Fast</button>
                  <button class="pad-btn slam" @click="${() => this.slam()}">💥 Slam</button>
                </div>

                <div class="keys-hint">
                  Teclas: ⬅️ ➡️ ou A/D | ⬆️ ou W (Girar) | Espaço (Slam)
                </div>
              </div>
            </aside>
          `}

          <!-- ÁREA PRINCIPAL COM OS 2 BLOCOS EXPANSÍVEIS -->
          <main class="dashboards-main">
            <div class="hub-controls-bar">
              <div class="category-tabs">
                <button class="cat-tab-btn ${this.filtroCategoria === 'TODOS' ? 'active' : ''}" @click="${() => this.filtroCategoria = 'TODOS'}">
                  Todos (${totalGeral})
                </button>
                <button class="cat-tab-btn ${this.filtroCategoria === 'COMERCIAL' ? 'active' : ''}" @click="${() => this.filtroCategoria = 'COMERCIAL'}">
                  Comercial
                </button>
                <button class="cat-tab-btn ${this.filtroCategoria === 'CANAIS' ? 'active' : ''}" @click="${() => this.filtroCategoria = 'CANAIS'}">
                  Canais
                </button>
                <button class="cat-tab-btn ${this.filtroCategoria === 'FINANCEIRO' ? 'active' : ''}" @click="${() => this.filtroCategoria = 'FINANCEIRO'}">
                  Financeiro
                </button>
                <button class="cat-tab-btn ${this.filtroCategoria === 'ESTRATÉGICO' ? 'active' : ''}" @click="${() => this.filtroCategoria = 'ESTRATÉGICO'}">
                  Estratégico
                </button>
              </div>

              <div class="search-box">
                <svg class="search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 14z"/></svg>
                <input
                  type="text"
                  class="search-input"
                  placeholder="Buscar dashboard..."
                  .value="${this.termoBusca}"
                  @input="${(e) => this.termoBusca = e.target.value}" />
              </div>
            </div>

            <!-- SEÇÃO EXPANSÍVEL 1: PERFORMANCE DE VENDAS -->
            <section class="hub-accordion-section">
              <button
                type="button"
                class="hub-accordion-header ${perfExpandido ? 'open' : ''}"
                @click="${() => { this.performanceVendasAberto = !this.performanceVendasAberto; this.requestUpdate(); }}"
                aria-expanded="${perfExpandido}">
                <div class="acc-left">
                  <span class="acc-accent-bar"></span>
                  <div class="acc-title-wrap">
                    <div class="acc-title-row">
                      <h2 class="acc-title">Performance de Vendas</h2>
                      <span class="acc-count-pill">${filtradosPerformance.length}</span>
                    </div>
                    <span class="acc-subtitle">Painéis executivos de produção, metas, segmentos, curva ABC, ofertas, unidades e clientes</span>
                  </div>
                </div>

                <div class="acc-right">
                  <span>${perfExpandido ? 'Recolher' : 'Expandir'}</span>
                  <span class="acc-chevron ${perfExpandido ? 'open' : ''}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </button>

              ${perfExpandido ? html`
                <div class="hub-accordion-body">
                  ${filtradosPerformance.length === 0 ? html`
                    <div class="empty-section-msg">Nenhum dashboard de Performance de Vendas corresponde ao filtro selecionado.</div>
                  ` : html`
                    <div class="dashboards-grid">
                      ${filtradosPerformance.map(dash => this.renderDashboardCard(dash, false))}
                    </div>
                  `}
                </div>
              ` : ''}
            </section>

            <!-- SEÇÃO EXPANSÍVEL 2: MAPA DE OPORTUNIDADES -->
            <section class="hub-accordion-section">
              <button
                type="button"
                class="hub-accordion-header ${mapaExpandido ? 'open' : ''}"
                @click="${() => { this.mapaOportunidadesAberto = !this.mapaOportunidadesAberto; this.requestUpdate(); }}"
                aria-expanded="${mapaExpandido}">
                <div class="acc-left">
                  <span class="acc-accent-bar mapa"></span>
                  <div class="acc-title-wrap">
                    <div class="acc-title-row">
                      <h2 class="acc-title">Mapa de Oportunidades</h2>
                      <span class="acc-count-pill mapa">${filtradosMapa.length}</span>
                    </div>
                    <span class="acc-subtitle">Guias de prospecção, premissas, potencial recorrente/não recorrente, regiões, ação e extração</span>
                  </div>
                </div>

                <div class="acc-right">
                  <span>${mapaExpandido ? 'Recolher' : 'Expandir'}</span>
                  <span class="acc-chevron ${mapaExpandido ? 'open' : ''}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </button>

              ${mapaExpandido ? html`
                <div class="hub-accordion-body">
                  ${filtradosMapa.length === 0 ? html`
                    <div class="empty-section-msg">Nenhuma guia de Mapa de Oportunidades corresponde ao filtro selecionado.</div>
                  ` : html`
                    <div class="dashboards-grid">
                      ${filtradosMapa.map(dash => this.renderDashboardCard(dash, true))}
                    </div>
                  `}
                </div>
              ` : ''}
            </section>

          </main>
        </div>

        ${this.notificacao ? html`
          <div class="toast-notify">${this.notificacao}</div>
        ` : ''}

      </div>
    `;
  }
}

customElements.define(elementName, PortalExecutivo);