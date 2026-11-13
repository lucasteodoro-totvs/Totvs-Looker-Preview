/**
 * @title One Page Executivo (Versão Vercel Preview)
 * @description Cockpit Executivo Consolidado com Visões Comparativas, CDU e Recorrentes
 *              utilizando dados simulados dinâmicos integrados à estrutura LitElement.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'one-page-app';

// Bases Mockadas Iniciais
const BASELINE_CDU = {
  cenario: {
    mes: { rawProd: 9800000, rawAting: 0.893, rawDelta: -1200000, rawYoy: -0.007 },
    ytd: { rawProd: 74200000, rawAting: 0.954, rawDelta: -3600000, rawYoy: 0.042 }
  },
  newNames: {
    mes: { rawYoyProd: 0.056, rawYoyQtd: -0.132, rawRep: 0.138 },
    ytd: { rawYoyProd: 0.112, rawYoyQtd: -0.045, rawRep: 0.152 }
  },
  segmentos: {
    maiorMes: { nome: 'Construção e Projetos', rawAting: 1.699, rawValor: 606800 },
    menorMes: { nome: 'Jurídico', rawAting: 0.344, rawValor: 21600 },
    maiorYtd: { nome: 'Manufatura', rawAting: 1.452, rawValor: 8400500 },
    menorYtd: { nome: 'Logística', rawAting: 0.621, rawValor: 950000 }
  },
  unidades: [
    { canal: 'Filiais', rawRepMes: 0.494, rawAtingMes: 1.037, rawRepYtd: 0.512, rawAtingYtd: 1.015 },
    { canal: 'Franquias', rawRepMes: 0.293, rawAtingMes: 0.655, rawRepYtd: 0.285, rawAtingYtd: 0.824 },
    { canal: 'Verticais', rawRepMes: 0.086, rawAtingMes: 0.409, rawRepYtd: 0.091, rawAtingYtd: 0.552 },
    { canal: 'MI', rawRepMes: 0.127, rawAtingMes: 0.982, rawRepYtd: 0.112, rawAtingYtd: 1.084 }
  ],
  clientes: {
    base: { valor: '437,6 Mil', cliente: 'VALVULAS FADEVA S A', oferta: 'FULL TOTVS' },
    novo: { valor: '330,1 Mil', cliente: 'DOMO MINERALS S.A.S', oferta: 'FULL TOTVS' }
  },
  topOfertas: [
    { rank: '1º', nome: 'FULL TOTVS', rawValor: 3124331, rawYoy: 1.547 },
    { rank: '2º', nome: 'SOFT COMPL by PROGRESS', rawValor: 1057591, rawYoy: -0.185 },
    { rank: '3º', nome: 'WINTHOR DISTRIBUIDOR', rawValor: 1008026, rawYoy: -0.281 }
  ]
};

const BASELINE_RECORRENTES = {
  cenario: {
    mes: { rawProd: 6800000, rawAting: 0.932, rawDelta: -493300, rawYoy: 0.226 },
    ytd: { rawProd: 62400000, rawAting: 1.058, rawDelta: 3400000, rawYoy: 0.315 }
  },
  newNames: {
    mes: { rawYoyProd: 0.286, rawYoyQtd: 0.054, rawRep: 0.088 },
    ytd: { rawYoyProd: 0.342, rawYoyQtd: 0.125, rawRep: 0.104 }
  },
  segmentos: {
    maiorMes: { nome: 'Jurídico', rawAting: 1.800, rawValor: 57600 },
    menorMes: { nome: 'Agroindústria', rawAting: 0.408, rawValor: 157400 },
    maiorYtd: { nome: 'Serviços', rawAting: 1.624, rawValor: 7200400 },
    menorYtd: { nome: 'Varejo', rawAting: 0.741, rawValor: 2100800 }
  },
  unidades: [
    { canal: 'Filiais', rawRepMes: 0.508, rawAtingMes: 0.801, rawRepYtd: 0.495, rawAtingYtd: 0.954 },
    { canal: 'Franquias', rawRepMes: 0.367, rawAtingMes: 1.030, rawRepYtd: 0.372, rawAtingYtd: 1.120 },
    { canal: 'Verticais', rawRepMes: 0.106, rawAtingMes: 0.744, rawRepYtd: 0.114, rawAtingYtd: 0.885 },
    { canal: 'MI', rawRepMes: 0.019, rawAtingMes: 0.474, rawRepYtd: 0.019, rawAtingYtd: 0.652 }
  ],
  clientes: {
    base: { valor: '147,0 Mil', cliente: 'FUNDACAO FACULDADE DE MEDICINA', oferta: 'RH PONTO ELETRONICO' },
    novo: { valor: '82,0 Mil', cliente: 'SOLUS DO BRASIL LTDA', oferta: 'INTERA BACKOFFICE' }
  },
  topOfertas: [
    { rank: '1º', nome: 'TOTVS SERVICOS', rawValor: 14864735, rawYoy: 0.326 },
    { rank: '2º', nome: 'CLOUD + CLOUD INTERA', rawValor: 4277882, rawYoy: 0.615 },
    { rank: '3º', nome: 'CONSINCO SERVICOS', rawValor: 3684304, rawYoy: 0.880 }
  ]
};

export class OnePageApp extends LitElement {
  static properties = {
    visaoAtiva: { type: String },
    dadosCDU: { type: Object },
    dadosRecorrentes: { type: Object },
    carregando: { type: Boolean }
  };

  constructor() {
    super();
    this.visaoAtiva = 'COMPARATIVO';
    this.carregando = true;
    this.dadosCDU = null;
    this.dadosRecorrentes = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.simularCarregamento();
  }

  async simularCarregamento() {
    this.carregando = true;
    // Simula tempo de rede/Looker API
    await new Promise(resolve => setTimeout(resolve, 300));
    this.processarDadosMockados();
    this.carregando = false;
  }

  /* ==========================================================================
     FORMATAÇÃO E PROCESSAMENTO
     ========================================================================== */
  formatCompactCurrency(num) {
    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (abs >= 1000000) return `${sign}${Number(abs / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mi`;
    if (abs >= 1000) return `${sign}${Number(abs / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mil`;
    return `${sign}${Number(abs).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
  }

  formatExactCurrency(num) {
    return Number(num).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }

  formatPercent(num) {
    return (num * 100).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  processarBloco(baseData) {
    const proc = JSON.parse(JSON.stringify(baseData)); // Deep copy manual leve
    
    // Cenário Mês
    proc.cenario.mes.prod = this.formatCompactCurrency(baseData.cenario.mes.rawProd);
    proc.cenario.mes.delta = this.formatCompactCurrency(baseData.cenario.mes.rawDelta);
    proc.cenario.mes.ating = this.formatPercent(baseData.cenario.mes.rawAting);
    proc.cenario.mes.atingNum = baseData.cenario.mes.rawAting * 100;
    proc.cenario.mes.yoy = this.formatPercent(baseData.cenario.mes.rawYoy);
    proc.cenario.mes.isPos = baseData.cenario.mes.rawDelta >= 0;

    // Cenário YTD
    proc.cenario.ytd.prod = this.formatCompactCurrency(baseData.cenario.ytd.rawProd);
    proc.cenario.ytd.delta = this.formatCompactCurrency(baseData.cenario.ytd.rawDelta);
    proc.cenario.ytd.ating = this.formatPercent(baseData.cenario.ytd.rawAting);
    proc.cenario.ytd.atingNum = baseData.cenario.ytd.rawAting * 100;
    proc.cenario.ytd.yoy = this.formatPercent(baseData.cenario.ytd.rawYoy);
    proc.cenario.ytd.isPos = baseData.cenario.ytd.rawDelta >= 0;

    // New Names Mês
    proc.newNames.mes.yoyProd = this.formatPercent(baseData.newNames.mes.rawYoyProd);
    proc.newNames.mes.prodPos = baseData.newNames.mes.rawYoyProd >= 0;
    proc.newNames.mes.yoyQtd = this.formatPercent(baseData.newNames.mes.rawYoyQtd);
    proc.newNames.mes.qtdPos = baseData.newNames.mes.rawYoyQtd >= 0;
    proc.newNames.mes.repr = this.formatPercent(baseData.newNames.mes.rawRep);

    // New Names YTD
    proc.newNames.ytd.yoyProd = this.formatPercent(baseData.newNames.ytd.rawYoyProd);
    proc.newNames.ytd.prodPos = baseData.newNames.ytd.rawYoyProd >= 0;
    proc.newNames.ytd.yoyQtd = this.formatPercent(baseData.newNames.ytd.rawYoyQtd);
    proc.newNames.ytd.qtdPos = baseData.newNames.ytd.rawYoyQtd >= 0;
    proc.newNames.ytd.repr = this.formatPercent(baseData.newNames.ytd.rawRep);

    // Segmentos
    proc.segmentos.maiorMes.ating = this.formatPercent(baseData.segmentos.maiorMes.rawAting);
    proc.segmentos.maiorMes.valor = this.formatCompactCurrency(baseData.segmentos.maiorMes.rawValor);
    proc.segmentos.menorMes.ating = this.formatPercent(baseData.segmentos.menorMes.rawAting);
    proc.segmentos.menorMes.valor = this.formatCompactCurrency(baseData.segmentos.menorMes.rawValor);
    
    proc.segmentos.maiorYtd.ating = this.formatPercent(baseData.segmentos.maiorYtd.rawAting);
    proc.segmentos.maiorYtd.valor = this.formatCompactCurrency(baseData.segmentos.maiorYtd.rawValor);
    proc.segmentos.menorYtd.ating = this.formatPercent(baseData.segmentos.menorYtd.rawAting);
    proc.segmentos.menorYtd.valor = this.formatCompactCurrency(baseData.segmentos.menorYtd.rawValor);

    // Unidades
    proc.unidades = baseData.unidades.map(u => ({
      canal: u.canal,
      reprMes: this.formatPercent(u.rawRepMes),
      atingMes: this.formatPercent(u.rawAtingMes),
      atingMesNum: u.rawAtingMes * 100,
      reprYtd: this.formatPercent(u.rawRepYtd),
      atingYtd: this.formatPercent(u.rawAtingYtd),
      atingYtdNum: u.rawAtingYtd * 100
    }));

    // Top Ofertas
    proc.topOfertas = baseData.topOfertas.map(o => ({
      rank: o.rank,
      nome: o.nome,
      valor: this.formatExactCurrency(o.rawValor),
      yoy: this.formatPercent(o.rawYoy),
      isPos: o.rawYoy >= 0
    }));

    // Clientes Destaque mantém texto fixo do mock
    proc.clientes = baseData.clientes;

    return proc;
  }

  processarDadosMockados() {
    this.dadosCDU = this.processarBloco(BASELINE_CDU);
    this.dadosRecorrentes = this.processarBloco(BASELINE_RECORRENTES);
  }

  /* ==========================================================================
     RENDERIZAÇÃO DE COMPONENTES
     ========================================================================== */
  renderYoY(valStr, isPos) {
    if (!valStr || valStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    const seta = isPos ? '↗' : '↘';
    return html`
      <span style="color: ${isPos ? '#16a34a' : '#dc2626'}; font-weight: 800;">
        ${seta} ${valStr}
      </span>
    `;
  }

  renderAtingBadge(atingStr, atingNum) {
    let bg = '#fee2e2'; let color = '#b91c1c';
    if (atingNum >= 100) { bg = '#dcfce7'; color = '#15803d'; } 
    else if (atingNum >= 85) { bg = '#fef3c7'; color = '#b45309'; }
    return html`
      <span style="background: ${bg}; color: ${color}; font-weight: 800; padding: 3px 8px; border-radius: 6px; font-size: 11.5px; letter-spacing: 0.2px;">
        ${atingStr}
      </span>
    `;
  }

  renderBlocoExecutivo(titulo, dados, corAcento) {
    if (!dados) return '';

    return html`
      <div class="col-executiva" style="--cor-acento: ${corAcento};">
        
        <div class="bloco-header">
          <span class="bloco-title">${titulo}</span>
        </div>

        <!-- 1. CENÁRIO GERAL -->
        <div class="op-card">
          <div class="card-section-title">Cenário Geral</div>

          <div class="scenario-grid">
            <!-- MÊS -->
            <div class="scenario-box">
              <div class="scenario-box-header">
                <span class="periodo-badge">MÊS</span>
                <span class="cenario-big-val">${dados.cenario.mes.prod}</span>
              </div>
              <div class="scenario-metrics">
                <div class="scen-row">
                  <span class="scen-label">Ating. Meta</span>
                  ${this.renderAtingBadge(dados.cenario.mes.ating, dados.cenario.mes.atingNum)}
                </div>
                <div class="scen-row">
                  <span class="scen-label">Desvio (Delta)</span>
                  <span class="scen-val ${dados.cenario.mes.delta.includes('-') ? 'text-red' : 'text-green'}">${dados.cenario.mes.delta}</span>
                </div>
                <div class="scen-row">
                  <span class="scen-label">Cresc. YoY</span>
                  ${this.renderYoY(dados.cenario.mes.yoy, dados.cenario.mes.isPos)}
                </div>
              </div>
            </div>

            <!-- YTD -->
            <div class="scenario-box">
              <div class="scenario-box-header">
                <span class="periodo-badge ytd-badge">YTD</span>
                <span class="cenario-big-val">${dados.cenario.ytd.prod}</span>
              </div>
              <div class="scenario-metrics">
                <div class="scen-row">
                  <span class="scen-label">Ating. Meta</span>
                  ${this.renderAtingBadge(dados.cenario.ytd.ating, dados.cenario.ytd.atingNum)}
                </div>
                <div class="scen-row">
                  <span class="scen-label">Desvio (Delta)</span>
                  <span class="scen-val ${dados.cenario.ytd.delta.includes('-') ? 'text-red' : 'text-green'}">${dados.cenario.ytd.delta}</span>
                </div>
                <div class="scen-row">
                  <span class="scen-label">Cresc. YoY</span>
                  ${this.renderYoY(dados.cenario.ytd.yoy, dados.cenario.ytd.isPos)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. NEW NAMES -->
        <div class="op-card">
          <div class="card-section-title">New Names</div>

          <div class="newnames-grid">
            <div class="nn-row">
              <span class="periodo-tag">MÊS</span>
              <div class="nn-pill"><span>YoY Prod:</span> ${this.renderYoY(dados.newNames.mes.yoyProd, dados.newNames.mes.prodPos)}</div>
              <div class="nn-pill"><span>YoY Qtd:</span> ${this.renderYoY(dados.newNames.mes.yoyQtd, dados.newNames.mes.qtdPos)}</div>
              <div class="nn-pill highlight"><span>Repr. Prod:</span> <strong>${dados.newNames.mes.repr}</strong></div>
            </div>
            
            <div class="nn-row">
              <span class="periodo-tag ytd-tag">YTD</span>
              <div class="nn-pill"><span>YoY Prod:</span> ${this.renderYoY(dados.newNames.ytd.yoyProd, dados.newNames.ytd.prodPos)}</div>
              <div class="nn-pill"><span>YoY Qtd:</span> ${this.renderYoY(dados.newNames.ytd.yoyQtd, dados.newNames.ytd.qtdPos)}</div>
              <div class="nn-pill highlight"><span>Repr. Prod:</span> <strong>${dados.newNames.ytd.repr}</strong></div>
            </div>
          </div>
        </div>

        <!-- 3. SEGMENTOS: EXTREMOS -->
        <div class="op-card">
          <div class="card-section-title">Segmentos (Extremos)</div>

          <div class="extremos-grid">
            <!-- MÊS -->
            <div class="extremo-box maior">
              <div class="extremo-title">🏆 Maior Atingimento (MÊS)</div>
              <div class="extremo-item">
                <div class="extremo-details">
                  <span class="extremo-nome">${dados.segmentos.maiorMes.nome}</span>
                  <div class="extremo-nums">
                    <span class="badge-green">${dados.segmentos.maiorMes.ating}</span>
                    <span class="extremo-val">${dados.segmentos.maiorMes.valor}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="extremo-box menor">
              <div class="extremo-title">⚠️ Menor Atingimento (MÊS)</div>
              <div class="extremo-item">
                <div class="extremo-details">
                  <span class="extremo-nome">${dados.segmentos.menorMes.nome}</span>
                  <div class="extremo-nums">
                    <span class="badge-red">${dados.segmentos.menorMes.ating}</span>
                    <span class="extremo-val">${dados.segmentos.menorMes.valor}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- YTD -->
            <div class="extremo-box maior">
              <div class="extremo-title" style="color: #4338ca;">🏆 Maior Atingimento (YTD)</div>
              <div class="extremo-item">
                <div class="extremo-details">
                  <span class="extremo-nome">${dados.segmentos.maiorYtd.nome}</span>
                  <div class="extremo-nums">
                    <span class="badge-green">${dados.segmentos.maiorYtd.ating}</span>
                    <span class="extremo-val">${dados.segmentos.maiorYtd.valor}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="extremo-box menor">
              <div class="extremo-title" style="color: #be123c;">⚠️ Menor Atingimento (YTD)</div>
              <div class="extremo-item">
                <div class="extremo-details">
                  <span class="extremo-nome">${dados.segmentos.menorYtd.nome}</span>
                  <div class="extremo-nums">
                    <span class="badge-red">${dados.segmentos.menorYtd.ating}</span>
                    <span class="extremo-val">${dados.segmentos.menorYtd.valor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. UNIDADES (CANAIS DE DISTRIBUIÇÃO) -->
        <div class="op-card">
          <div class="card-section-title">Unidades de Venda (Canais)</div>

          <div class="micro-table-wrap">
            <table>
              <thead>
                <tr>
                  <th style="text-align: left;">Canal</th>
                  <th>Repr. Mês</th>
                  <th>Ating. Mês</th>
                  <th style="border-left: 2px solid #e2e8f0; background: #0f172a;">Repr. YTD</th>
                  <th style="background: #0f172a;">Ating. YTD</th>
                </tr>
              </thead>
              <tbody>
                ${dados.unidades.map(u => html`
                  <tr>
                    <td class="canal-nome">${u.canal}</td>
                    <td class="text-center font-bold">${u.reprMes}</td>
                    <td class="text-center">${this.renderAtingBadge(u.atingMes, u.atingMesNum)}</td>
                    <td class="text-center font-bold" style="border-left: 2px solid #e2e8f0; background: #f8fafc;">${u.reprYtd}</td>
                    <td class="text-center" style="background: #f8fafc;">${this.renderAtingBadge(u.atingYtd, u.atingYtdNum)}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 5. CLIENTES DE DESTAQUE -->
        <div class="op-card">
          <div class="card-section-title">Clientes de Destaque (Mês Atual)</div>

          <div class="clientes-grid">
            <div class="cliente-box">
              <div class="cliente-badge base">BASE</div>
              <div class="cliente-info">
                <span class="cliente-val">${dados.clientes.base.valor}</span>
                <span class="cliente-name" title="${dados.clientes.base.cliente}">${dados.clientes.base.cliente}</span>
                <span class="cliente-oferta">${dados.clientes.base.oferta}</span>
              </div>
            </div>
            <div class="cliente-box">
              <div class="cliente-badge novo">NOVO</div>
              <div class="cliente-info">
                <span class="cliente-val" style="color: #15803d;">${dados.clientes.novo.valor}</span>
                <span class="cliente-name" title="${dados.clientes.novo.cliente}">${dados.clientes.novo.cliente}</span>
                <span class="cliente-oferta">${dados.clientes.novo.oferta}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. TOP 3 OFERTAS DO MÊS -->
        <div class="op-card">
          <div class="card-section-title">Top 3 Ofertas (Mês Atual)</div>

          <div class="top3-list">
            ${dados.topOfertas.map(o => html`
              <div class="top3-item">
                <div class="top3-rank-wrap">
                  <span class="top3-medal ${o.rank === '1º' ? 'ouro' : o.rank === '2º' ? 'prata' : 'bronze'}">${o.rank}</span>
                  <span class="top3-name">${o.nome}</span>
                </div>
                <div class="top3-val-wrap">
                  <span class="top3-val">R$ ${o.valor}</span>
                  <span class="top3-yoy ${o.isPos ? 'pos' : 'neg'}">${o.yoy} YoY</span>
                </div>
              </div>
            `)}
          </div>
        </div>

      </div>
    `;
  }

  render() {
    return html`
      <style>
        * { box-sizing: border-box; }
        @keyframes spinMesh { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .dash-container { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
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
          top: -50%; left: -50%; width: 200%; height: 200%; 
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
          position: absolute; top: 0; right: 0; bottom: 0; width: 48%; 
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%); 
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%); 
          z-index: 1; 
        }
        
        .totvs-logo-layer { 
          position: absolute; right: 80px; top: 50%; transform: translateY(-50%); width: 80px; height: 80px; 
          background-size: contain; background-position: right center; background-repeat: no-repeat; 
          z-index: 2; pointer-events: none; 
        }
        
        .title-area { position: relative; z-index: 3; flex: 1; }
        .title-area h1 { font-size: 24px; font-weight: 900; margin: 0 0 12px 0; color: #000; letter-spacing: -0.5px; text-transform: uppercase; }
        
        .tabs-group { 
          display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 4px; border: 1px solid #cbd5e1; gap: 4px; 
        }
        
        .tab-btn { 
          background: transparent; border: none; padding: 8px 18px; font-size: 12.5px; font-weight: 800; color: #64748b; 
          border-radius: 6px; cursor: pointer; transition: all 0.2s ease; outline: none; text-transform: uppercase; 
        }
        
        .tab-btn:hover { color: #0f172a; }
        .tab-btn.active { background: #ffffff; color: #6366f1; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        
        .state-feedback {
          text-align: center; padding: 60px; color: #0f172a; font-weight: 800; font-size: 16px; background: rgba(255,255,255,0.8);
          backdrop-filter: blur(10px); border-radius: 12px; margin-top: 20px; position: relative; z-index: 2;
        }

        .onepage-grid { display: grid; gap: 24px; position: relative; z-index: 1; align-items: start; }
        .onepage-grid.comparativo { grid-template-columns: 1fr 1fr; }
        .onepage-grid.single { grid-template-columns: 1fr; max-width: 960px; margin: 0 auto; width: 100%; }
        
        .col-executiva { display: flex; flex-direction: column; gap: 18px; }
        .bloco-header { 
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(16px); border-radius: 10px; padding: 14px 20px; 
          border: 1px solid rgba(255, 255, 255, 1); border-left: 7px solid var(--cor-acento); box-shadow: 0 4px 14px -2px rgba(0,0,0,0.06); 
        }
        
        .bloco-title { font-size: 18px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: -0.3px; }
        
        .op-card { 
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(16px); border-radius: 12px; padding: 20px; 
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); border: 1px solid rgba(255, 255, 255, 1); display: flex; flex-direction: column; gap: 14px; 
        }
        
        .card-section-title { font-size: 14px; font-weight: 900; color: #002b49; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
        
        /* 1. Cenário Geral */
        .scenario-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .scenario-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .scenario-box-header { display: flex; justify-content: space-between; align-items: baseline; }
        .periodo-badge { font-size: 11px; font-weight: 900; background: #e2e8f0; color: #334155; padding: 3px 8px; border-radius: 6px; letter-spacing: 0.5px; }
        .ytd-badge { background: #1e1b4b; color: #c4b5fd; }
        .cenario-big-val { font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
        .scenario-metrics { display: flex; flex-direction: column; gap: 6px; border-top: 1px dashed #cbd5e1; padding-top: 10px; }
        .scen-row { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; }
        .scen-label { color: #475569; font-weight: 700; }
        .scen-val { font-weight: 800; }
        .text-green { color: #16a34a; } .text-red { color: #dc2626; }
        
        /* 2. New Names */
        .newnames-grid { display: flex; flex-direction: column; gap: 10px; }
        .nn-row { display: flex; align-items: center; gap: 10px; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #edf2f7; flex-wrap: wrap; }
        .periodo-tag { font-size: 10.5px; font-weight: 900; background: #e2e8f0; color: #475569; padding: 3px 8px; border-radius: 6px; min-width: 38px; text-align: center; }
        .ytd-tag { background: #1e1b4b; color: #c4b5fd; }
        .nn-pill { font-size: 12px; color: #475569; font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .nn-pill.highlight { margin-left: auto; background: #f1f5f9; padding: 4px 10px; border-radius: 6px; }
        
        /* 3. Segmentos Extremos */
        .extremos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .extremo-box { border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
        .extremo-box.maior { background: #f0fdf4; border: 1px solid #bbf7d0; }
        .extremo-box.menor { background: #fef2f2; border: 1px solid #fecaca; }
        .extremo-title { font-size: 12px; font-weight: 800; text-transform: uppercase; }
        .extremo-box.maior .extremo-title { color: #15803d; } .extremo-box.menor .extremo-title { color: #b91c1c; }
        .extremo-item { display: flex; flex-direction: column; gap: 2px; background: #ffffff; padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .extremo-details { width: 100%; }
        .extremo-nome { font-size: 12px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; margin-bottom: 4px; }
        .extremo-nums { display: flex; justify-content: space-between; align-items: center; }
        .badge-green { font-size: 11.5px; font-weight: 900; background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 6px; }
        .badge-red { font-size: 11.5px; font-weight: 900; background: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 6px; }
        .extremo-val { font-size: 12px; font-weight: 800; color: #475569; }
        
        /* 4. Tabela Unidades */
        .micro-table-wrap { border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th { background-color: #002b49; color: #ffffff; padding: 10px 8px; font-weight: 800; text-align: center; }
        td { padding: 10px 8px; border-bottom: 1px solid #edf2f7; color: #334155; }
        tr:last-child td { border-bottom: none; }
        .canal-nome { font-weight: 800; color: #0f172a; } .font-bold { font-weight: 800; color: #0f172a; } .text-center { text-align: center; }
        
        /* 5. Clientes */
        .clientes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cliente-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
        .cliente-badge { font-size: 10px; font-weight: 900; padding: 3px 8px; border-radius: 6px; width: fit-content; }
        .cliente-badge.base { background: #dbeafe; color: #1e40af; } .cliente-badge.novo { background: #dcfce7; color: #166534; }
        .cliente-val { font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 4px; letter-spacing: -0.3px; }
        .cliente-name { font-size: 12px; font-weight: 800; color: #002b49; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
        .cliente-oferta { font-size: 10.5px; color: #64748b; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        /* 6. Top Ofertas */
        .top3-list { display: flex; flex-direction: column; gap: 8px; }
        .top3-item { display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid #edf2f7; border-radius: 8px; padding: 10px 14px; }
        .top3-rank-wrap { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .top3-medal { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 900; flex-shrink: 0; }
        .top3-medal.ouro { background: #fef08a; color: #854d0e; } .top3-medal.prata { background: #e2e8f0; color: #475569; } .top3-medal.bronze { background: #fed7aa; color: #9a3412; }
        .top3-name { font-size: 12.5px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .top3-val-wrap { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .top3-val { font-size: 14px; font-weight: 900; color: #0f172a; }
        .top3-yoy { font-size: 11.5px; font-weight: 900; padding: 3px 8px; border-radius: 6px; }
        .top3-yoy.pos { background: #dcfce7; color: #15803d; } .top3-yoy.neg { background: #fee2e2; color: #b91c1c; }
      </style>

      <div class="dash-container">
        
        <!-- CABEÇALHO HERO OFICIAL TOTVS -->
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="totvs-logo-layer"></div>
          
          <div class="title-area">
            <h1>ONE PAGE EXECUTIVO</h1>
            <div class="tabs-group">
              <button 
                class="tab-btn ${this.visaoAtiva === 'COMPARATIVO' ? 'active' : ''}" 
                @click="${() => this.visaoAtiva = 'COMPARATIVO'}">
                Visão Comparativa (Lado a Lado)
              </button>
              <button 
                class="tab-btn ${this.visaoAtiva === 'CDU' ? 'active' : ''}" 
                @click="${() => this.visaoAtiva = 'CDU'}">
                CDU (Não Recorrente)
              </button>
              <button 
                class="tab-btn ${this.visaoAtiva === 'RECORRENTES' ? 'active' : ''}" 
                @click="${() => this.visaoAtiva = 'RECORRENTES'}">
                Recorrentes
              </button>
            </div>
          </div>
        </div>

        <!-- CONTEÚDO PRINCIPAL -->
        ${this.carregando ? html`
          <div class="state-feedback">
            Carregando e consolidando métricas da One Page...
          </div>
        ` : html`
          <div class="onepage-grid ${this.visaoAtiva === 'COMPARATIVO' ? 'comparativo' : 'single'}">
            ${this.visaoAtiva === 'COMPARATIVO' || this.visaoAtiva === 'CDU'
              ? this.renderBlocoExecutivo('CDU (NÃO RECORRENTE)', this.dadosCDU, '#002b49') : ''}
            
            ${this.visaoAtiva === 'COMPARATIVO' || this.visaoAtiva === 'RECORRENTES'
              ? this.renderBlocoExecutivo('RECORRENTES', this.dadosRecorrentes, '#7c3aed') : ''}
          </div>
        `}

      </div>
    `;
  }
}

customElements.define(elementName, OnePageApp);
