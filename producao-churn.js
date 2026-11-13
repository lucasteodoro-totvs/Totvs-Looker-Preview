/**
 * @title Produção x Churn
 * @description Painel Executivo de Produção vs Churn: Gangorra Dinâmica, Realizado Preto vs Churn Vermelho e Drilldown
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'producao-churn';

const EVOLUCAO_MENSAL = [
  { mes: '2026-01', realizado: 4.99, churn: 4.20, realLabel: 'R$ 4.99M', churnLabel: 'R$ 4.20M' },
  { mes: '2026-02', realizado: 6.11, churn: 3.62, realLabel: 'R$ 6.11M', churnLabel: 'R$ 3.62M' },
  { mes: '2026-03', realizado: 9.64, churn: 3.27, realLabel: 'R$ 9.64M', churnLabel: 'R$ 3.27M' },
  { mes: '2026-04', realizado: 6.15, churn: 4.09, realLabel: 'R$ 6.15M', churnLabel: 'R$ 4.09M' }
];

const MATRIZ_OFERTAS = [
  { nome: 'INTERA BACKOFFICE', prod: '8.025.042,96', churn: '1.883.255', impacto: '0,4', impNum: 0.4 },
  { nome: 'ATENDIMENTO CONTINUADO TOTVS', prod: '2.697.423,28', churn: '1.154.222', impacto: '0,4', impNum: 0.4 },
  { nome: 'FULL TOTVS', prod: '10.378.346,82', churn: '592.264', impacto: '0,7', impNum: 0.7 },
  { nome: 'AUTOMACAO COMERCIAL', prod: '0,00', churn: '573.925', impacto: '-', impNum: 0 },
  { nome: 'FEEDZ BY TOTVS', prod: '342.878,54', churn: '503.872', impacto: '1,8', impNum: 1.8 }
];

const MATRIZ_CLASSIFICACAO = [
  { nome: 'CORE SEGMENTOS', prod: '22.021.078,85', churn: '2.649.821', impacto: '0,9', impNum: 0.9 },
  { nome: 'INTERA BO', prod: '4.627.635,69', churn: '1.987.207', impacto: '0,4', impNum: 0.4 },
  { nome: 'ACT', prod: '4.946.346,02', churn: '1.321.414', impacto: '0,5', impNum: 0.5 },
  { nome: 'CLOUD + CLOUD INTERA', prod: '5.295.414,55', churn: '1.174.020', impacto: '0,3', impNum: 0.3 }
];

const MATRIZ_SEGMENTOS = [
  { nome: 'SERVICOS', prod: '51.475.005,59', churn: '3.474.011', impacto: '0,57', impNum: 0.57 },
  { nome: 'MANUFATURA', prod: '49.488.526,90', churn: '3.422.742', impacto: '0,53', impNum: 0.53 },
  { nome: 'VAREJO', prod: '15.576.314,44', churn: '2.011.466', impacto: '0,80', impNum: 0.80 },
  { nome: 'DISTRIBUICAO', prod: '14.203.663,29', churn: '1.321.475', impacto: '0,50', impNum: 0.50 }
];

const MATRIZ_UNIDADES = [
  { nome: 'TOTVS SP1', prod: '52.013.319,56', churn: '2.243.147', impacto: '0,4', impNum: 0.4 },
  { nome: 'TOTVS SUPERMERCADOS', prod: '16.381.162,89', churn: '423.585', impacto: '0,3', impNum: 0.3 },
  { nome: 'TOTVS LE', prod: '13.965.782,12', churn: '2.730.003', impacto: '1,1', impNum: 1.1, destaque: true }
];

const RELATORIO_PRODUCAO = [
  { codCli: 'TFCRA6', cliente: 'SERRA VERDE MINERACAO', undAtend: 'TOTVS MINAS GERAIS', undCons: 'TOTVS BH', segmento: 'CONSTRUCAO', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'SERVIÇOS MENSALIZADOS', codProd: '1M13301059', segProd: 'ACT', oferta: 'ATENDIMENTO', classif: 'ACT', desc: 'ACT - ATENDIMENTO', serie: '001', data: '01/03/2026', valor: '249.814,38' },
  { codCli: 'TEXSOS', cliente: 'CM HOSPITALAR S.A.', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'DISTRIBUICAO', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'SMS PRIME', codProd: '1111001173', segProd: 'PRIME', oferta: 'SUPORTE', classif: 'PRIME', desc: 'PRIME GOLD PRT', serie: '001', data: '01/03/2026', valor: '203.217,29' }
];

const RELATORIO_CHURN = [
  { codCli: 'TFDSLF', cliente: 'DISTRIBUIDORA SAO LUIS', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'VAREJO', tipo: 'BASE', receita: 'SAAS', agrup: 'DISTRIBUICAO', codProd: '71233001', segProd: 'DISTRIBUICAO', oferta: 'AUTOMACAO COMERCIAL', classif: 'CORPORATIVO', desc: 'SISTEMA VAREJO PDV', serie: '001', data: '01/04/2026', valor: '573.925,00' },
  { codCli: 'TFEETQ', cliente: 'EMPRESA ENGENHARIA LTDA', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'SERVICOS', tipo: 'BASE', receita: 'SAAS', agrup: 'CLOUD', codProd: '2F260011', segProd: 'CLOUD', oferta: 'CLOUD PRIME', classif: 'CLOUD + INTERA', desc: 'SERVICO CLOUD GESTAO', serie: '001', data: '01/03/2026', valor: '175.087,00' }
];

export class ProducaoChurn extends LitElement {
  static properties = {
    abaMatriz: { type: String },
    abaRelatorio: { type: String },
    prodTotal: { type: Number },
    churnTotal: { type: Number }
  };

  constructor() {
    super();
    this.abaMatriz = 'OFERTAS';
    this.abaRelatorio = 'PRODUCAO';
    this.prodTotal = 26.9;
    this.churnTotal = 15.2;
  }

  getGangorraAngle(prod, churn) {
    if (!prod && !churn) return 0;
    const diff = (churn - prod) / (churn + prod);
    return Math.max(-15, Math.min(15, diff * 32));
  }

  renderImpactBadge(impactoStr, impNum, destaque) {
    if (!impactoStr || impactoStr === '-') return html`<span style="color: #94a3b8;">-</span>`;
    let bg = '#f1f5f9';
    let color = '#475569';
    if (destaque || impNum >= 1.0) {
      bg = '#fee2e2';
      color = '#dc2626';
    } else if (impNum >= 0.7) {
      bg = '#fef3c7';
      color = '#b45309';
    }
    return html`<span style="background: ${bg}; color: ${color}; font-weight: 800; padding: 3px 8px; border-radius: 4px; display: inline-block;">${impactoStr}</span>`;
  }

  renderTabelaSimples(titulo, itens) {
    return html`
      <div class="matrix-card">
        <div class="matrix-title">${titulo}</div>
        <div class="matrix-table-wrap">
          <table>
            <thead>
              <tr>
                <th style="text-align: left;">${titulo}</th>
                <th>PROD</th>
                <th style="color: #fca5a5;">CHURN</th>
                <th>IMPACTO</th>
              </tr>
            </thead>
            <tbody>
              ${itens.map(item => html`
                <tr>
                  <td class="dim-name">${item.nome}</td>
                  <td class="text-right">${item.prod}</td>
                  <td class="text-right" style="color: #dc2626; font-weight: 800;">${item.churn}</td>
                  <td class="text-center">${this.renderImpactBadge(item.impacto, item.impNum, item.destaque)}</td>
                </tr>
              `)}
            </tbody>
            <tfoot>
              <tr>
                <td>TOTAL</td>
                <td class="text-right">200.234.415,38</td>
                <td class="text-right" style="color: #fca5a5;">15.178.682</td>
                <td class="text-center"><span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; color: #002b49;">0,6</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;
  }

  render() {
    const angle = this.getGangorraAngle(this.prodTotal, this.churnTotal);
    return html`
      <style>
        * { box-sizing: border-box; }
        .dash-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #e2e8f0; min-height: 100vh; padding: 24px; color: #0f172a; }
        .hero-banner { background-color: #ffffff; border-radius: 12px; padding: 18px 24px; margin-bottom: 20px; display: flex; align-items: center; min-height: 85px; position: relative; overflow: hidden; }
        .gradient-slant { position: absolute; top: 0; right: 0; bottom: 0; width: 48%; background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%); clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%); z-index: 1; }
        .title-area h1 { font-size: 24px; font-weight: 900; margin: 0; text-transform: uppercase; position: relative; z-index: 3; }
        .kpi-row { display: grid; grid-template-columns: 360px 1fr; gap: 20px; margin-bottom: 20px; }
        .gangorra-card { background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #fff; display: flex; flex-direction: column; justify-content: space-between; text-align: center; }
        .gangorra-title { font-size: 13px; font-weight: 900; color: #002b49; text-transform: uppercase; text-align: left; margin-bottom: 12px; }
        .gangorra-kpis { display: flex; justify-content: space-around; margin-bottom: 8px; }
        .gkpi-label { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .gkpi-label.churn { color: #dc2626; }
        .gkpi-val-prod { font-size: 24px; font-weight: 900; color: #002b49; margin: 2px 0; }
        .gkpi-val-churn { font-size: 24px; font-weight: 900; color: #dc2626; margin: 2px 0; }
        .yoy-sub { font-size: 11px; font-weight: 700; }
        .yoy-pos { color: #16a34a; } .yoy-neg { color: #dc2626; }
        .gangorra-svg-box { height: 110px; display: flex; align-items: center; justify-content: center; margin: 6px 0; }
        .gangorra-bottom-index { padding-top: 10px; border-top: 1px dashed #cbd5e1; display: flex; flex-direction: column; align-items: center; }
        .big-index { font-size: 32px; font-weight: 900; color: #0f172a; line-height: 1; }
        .big-index-sub { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-top: 2px; }
        .receitas-column { display: flex; flex-direction: column; gap: 12px; }
        .receita-card { background: #ffffff; border-radius: 12px; padding: 14px 20px; border: 1px solid #fff; display: grid; grid-template-columns: 1.4fr 1.4fr 120px; align-items: center; }
        .rec-section { padding: 0 14px; } .rec-section:first-child { padding-left: 0; } .rec-section.border-left { border-left: 1px dashed #cbd5e1; }
        .rec-name { font-size: 14px; font-weight: 900; color: #002b49; margin-bottom: 4px; }
        .rec-prod-val { font-size: 22px; font-weight: 900; color: #0f172a; display: flex; align-items: baseline; gap: 8px; }
        .rec-churn-val { font-size: 22px; font-weight: 900; color: #dc2626; display: flex; align-items: baseline; gap: 8px; }
        .rec-qtd-yoy { font-size: 11px; color: #64748b; font-weight: 600; margin-top: 2px; }
        .index-box { text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .index-title { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
        .index-number { font-size: 26px; font-weight: 900; color: #0f172a; line-height: 1; }
        .alert-pill { font-size: 9.5px; font-weight: 800; background: #fee2e2; color: #dc2626; padding: 2px 6px; border-radius: 4px; margin-top: 4px; }
        .chart-card { background: #ffffff; border-radius: 12px; padding: 22px 24px; border: 1px solid #fff; margin-bottom: 20px; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .chart-title { font-size: 15px; font-weight: 900; color: #002b49; text-transform: uppercase; margin: 0; }
        .chart-legend { display: flex; gap: 20px; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .trend-svg-box { width: 100%; height: 250px; }
        .section-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .section-heading { font-size: 15px; font-weight: 900; color: #0f172a; text-transform: uppercase; }
        .tabs-pill-group { display: inline-flex; background: rgba(255, 255, 255, 0.9); border-radius: 8px; padding: 3px; border: 1px solid #cbd5e1; gap: 4px; }
        .tab-pill-btn { background: transparent; border: none; padding: 6px 14px; font-size: 11px; font-weight: 700; color: #64748b; border-radius: 6px; cursor: pointer; text-transform: uppercase; }
        .tab-pill-btn.active { background: #002b49; color: #ffffff; }
        .matrix-grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .matrix-card { background: #ffffff; border-radius: 12px; padding: 18px 20px; border: 1px solid #fff; flex: 1; }
        .matrix-title { font-size: 14px; font-weight: 900; color: #002b49; margin-bottom: 12px; text-align: center; }
        .matrix-table-wrap { max-height: 400px; overflow-y: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
        th { background-color: #002b49; color: white; text-align: right; padding: 9px 8px; font-weight: 700; position: sticky; top: 0; z-index: 2; }
        td { padding: 8px 8px; border-bottom: 1px solid #edf2f7; color: #334155; white-space: nowrap; }
        tr:hover td { background-color: #f8fafc; }
        .dim-name { font-weight: 700; color: #0f172a; text-align: left; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        tfoot td { background-color: #002b49; color: #ffffff !important; font-weight: 800; position: sticky; bottom: 0; }
        .detail-report-card { background: #ffffff; border-radius: 12px; padding: 22px 24px; border: 1px solid #fff; }
        .detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .detail-title { font-size: 16px; font-weight: 900; color: #002b49; margin: 0; text-transform: uppercase; }
        .detail-table-wrap { overflow-x: auto; max-height: 480px; }
        .badge-base { background: #dbeafe; color: #1e40af; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
        .badge-novo { background: #dcfce7; color: #166534; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
      </style>
      <div class="dash-container">
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area"><h1>PRODUÇÃO X CHURN</h1></div>
        </div>
        <div class="kpi-row">
          <div class="gangorra-card">
            <div class="gangorra-title">Representatividade Churn</div>
            <div class="gangorra-kpis">
              <div><div class="gkpi-label">Produção</div><div class="gkpi-val-prod">${this.prodTotal.toFixed(1).replace('.', ',')} Mi</div><div class="yoy-sub yoy-neg">↘ -0,9% YoY</div></div>
              <div><div class="gkpi-label churn">Churn</div><div class="gkpi-val-churn">${this.churnTotal.toFixed(1).replace('.', ',')} Mi</div><div class="yoy-sub yoy-neg">↗ +62,7% YoY</div></div>
            </div>
            <div class="gangorra-svg-box">
              <svg viewBox="0 0 200 90" width="180" height="85">
                <polygon points="90,82 110,82 100,52" fill="#002b49" />
                <rect x="75" y="80" width="50" height="4" rx="2" fill="#002b49" />
                <circle cx="100" cy="52" r="6" fill="#00d2c4" />
                <g style="transform-origin: 100px 52px; transform: rotate(${angle}deg); transition: transform 0.8s;">
                  <rect x="20" y="49" width="160" height="6" rx="3" fill="#002b49" />
                  <rect x="25" y="36" width="22" height="13" rx="2" fill="#002b49" />
                  <text x="36" y="45" fill="#ffffff" font-size="7" font-weight="900" text-anchor="middle">PROD</text>
                  <rect x="153" y="32" width="22" height="17" rx="2" fill="#dc2626" />
                  <text x="164" y="44" fill="#ffffff" font-size="7" font-weight="900" text-anchor="middle">CHURN</text>
                </g>
              </svg>
            </div>
            <div class="gangorra-bottom-index">
              <div class="big-index">${(this.churnTotal / this.prodTotal).toFixed(2).replace('.', ',')}</div>
              <div class="big-index-sub">Índice Churn Global</div>
            </div>
          </div>
          <div class="receitas-column">
            <div class="receita-card">
              <div class="rec-section">
                <div class="rec-name">SAAS</div>
                <div class="rec-prod-val">18,0 Mi <span class="yoy-sub yoy-pos" style="font-size: 11px;">↗ 18,7%</span></div>
                <div class="rec-qtd-yoy">Qtd: <strong>5.296</strong> <span class="yoy-pos">↗ 28,7%</span></div>
              </div>
              <div class="rec-section border-left">
                <div class="rec-name" style="color: #dc2626;">CHURN</div>
                <div class="rec-churn-val">9,9 Mi <span class="yoy-sub yoy-neg" style="font-size: 11px;">↗ 82,5%</span></div>
                <div class="rec-qtd-yoy">Qtd: <strong style="color: #dc2626;">2.875</strong> <span class="yoy-neg">↗ 79,4%</span></div>
              </div>
              <div class="rec-section border-left index-box">
                <div class="index-title">Índice Churn</div>
                <div class="index-number">0,55</div>
              </div>
            </div>
            <div class="receita-card" style="border-left: 4px solid #dc2626;">
              <div class="rec-section">
                <div class="rec-name">SMS</div>
                <div class="rec-prod-val">2,6 Mi <span class="yoy-sub yoy-pos" style="font-size: 11px;">↗ 17,1%</span></div>
                <div class="rec-qtd-yoy">Qtd: <strong>986</strong> <span class="yoy-neg">↘ -3,2%</span></div>
              </div>
              <div class="rec-section border-left">
                <div class="rec-name" style="color: #dc2626;">CHURN</div>
                <div class="rec-churn-val">3,0 Mi <span class="yoy-sub yoy-neg" style="font-size: 11px;">↗ 16,9%</span></div>
                <div class="rec-qtd-yoy">Qtd: <strong style="color: #dc2626;">731</strong> <span class="yoy-neg">↗ 23,5%</span></div>
              </div>
              <div class="rec-section border-left index-box">
                <div class="index-title">Índice Churn</div>
                <div class="index-number" style="color: #dc2626;">1,14</div>
                <span class="alert-pill">⚠️ Churn > Prod</span>
              </div>
            </div>
            <div class="receita-card">
              <div class="rec-section">
                <div class="rec-name">SERV. RECORRENTES</div>
                <div class="rec-prod-val">6,2 Mi <span class="yoy-sub yoy-pos" style="font-size: 11px;">↗ 37,4%</span></div>
                <div class="rec-qtd-yoy">Qtd: <strong>565</strong> <span class="yoy-pos">↗ 17,0%</span></div>
              </div>
              <div class="rec-section border-left">
                <div class="rec-name" style="color: #dc2626;">CHURN</div>
                <div class="rec-churn-val">2,0 Mi <span class="yoy-sub yoy-neg" style="font-size: 11px;">↗ 69,8%</span></div>
                <div class="rec-qtd-yoy">Qtd: <strong style="color: #dc2626;">260</strong> <span class="yoy-neg">↗ 79,3%</span></div>
              </div>
              <div class="rec-section border-left index-box">
                <div class="index-title">Índice Churn</div>
                <div class="index-number" style="color: #16a34a;">0,37</div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h2 class="chart-title">Evolução Mensal: Produção x Churn</h2>
            <div class="chart-legend">
              <div class="legend-item"><span class="legend-dot" style="background: #0f172a;"></span><span style="color: #0f172a;">Realizado</span></div>
              <div class="legend-item"><span class="legend-dot" style="background: #dc2626;"></span><span style="color: #dc2626;">Churn</span></div>
            </div>
          </div>
          <div class="trend-svg-box">
            <svg viewBox="0 0 800 240" width="100%" height="100%" style="overflow: visible;">
              <defs>
                <linearGradient id="realGradBlack" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f172a" stop-opacity="0.25"/><stop offset="100%" stop-color="#0f172a" stop-opacity="0.01"/></linearGradient>
                <linearGradient id="churnGradRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#dc2626" stop-opacity="0.35"/><stop offset="100%" stop-color="#dc2626" stop-opacity="0.02"/></linearGradient>
              </defs>
              <line x1="60" y1="20" x2="740" y2="20" stroke="#e2e8f0" stroke-dasharray="3"/><text x="50" y="24" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">10M</text>
              <line x1="60" y1="75" x2="740" y2="75" stroke="#e2e8f0" stroke-dasharray="3"/><text x="50" y="79" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">8M</text>
              <line x1="60" y1="130" x2="740" y2="130" stroke="#e2e8f0" stroke-dasharray="3"/><text x="50" y="134" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">6M</text>
              <line x1="60" y1="185" x2="740" y2="185" stroke="#e2e8f0" stroke-dasharray="3"/><text x="50" y="189" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">4M</text>
              <line x1="60" y1="220" x2="740" y2="220" stroke="#cbd5e1" /><text x="50" y="224" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">0M</text>
              <path d="M 100,147.6 C 133.3,149.7 233.3,157.0 300,160.4 C 366.7,163.8 433.3,169.8 500,168.1 C 566.7,166.4 666.7,153.0 700,150.0 L 700,220 L 100,220 Z" fill="url(#churnGradRed)"/>
              <path d="M 100,147.6 C 133.3,149.7 233.3,157.0 300,160.4 C 366.7,163.8 433.3,169.8 500,168.1 C 566.7,166.4 666.7,153.0 700,150.0" fill="none" stroke="#dc2626" stroke-width="2.5"/>
              <path d="M 100,130.2 C 133.3,126.1 233.3,122.6 300,105.6 C 366.7,88.5 433.3,28.0 500,27.9 C 566.7,27.8 666.7,91.9 700,104.7 L 700,220 L 100,220 Z" fill="url(#realGradBlack)"/>
              <path d="M 100,130.2 C 133.3,126.1 233.3,122.6 300,105.6 C 366.7,88.5 433.3,28.0 500,27.9 C 566.7,27.8 666.7,91.9 700,104.7" fill="none" stroke="#0f172a" stroke-width="2.8"/>
              <circle cx="100" cy="130.2" r="5" fill="#0f172a" stroke="#fff" stroke-width="2"/><text x="100" y="118" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">R$ 4.99M</text>
              <circle cx="300" cy="105.6" r="5" fill="#0f172a" stroke="#fff" stroke-width="2"/><text x="300" y="93" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">R$ 6.11M</text>
              <circle cx="500" cy="27.9" r="6" fill="#0f172a" stroke="#fff" stroke-width="2"/><text x="500" y="16" fill="#0f172a" font-size="12" font-weight="900" text-anchor="middle">R$ 9.64M</text>
              <circle cx="700" cy="104.7" r="5" fill="#0f172a" stroke="#fff" stroke-width="2"/><text x="700" y="92" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">R$ 6.15M</text>
              <circle cx="100" cy="147.6" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/><text x="100" y="166" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 4.20M</text>
              <circle cx="300" cy="160.4" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/><text x="300" y="179" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 3.62M</text>
              <circle cx="500" cy="168.1" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/><text x="500" y="187" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 3.27M</text>
              <circle cx="700" cy="150.0" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/><text x="700" y="168" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 4.09M</text>
              <text x="100" y="238" fill="#475569" font-size="11" font-weight="700" text-anchor="middle">2026-01</text>
              <text x="300" y="238" fill="#475569" font-size="11" font-weight="700" text-anchor="middle">2026-02</text>
              <text x="500" y="238" fill="#475569" font-size="11" font-weight="700" text-anchor="middle">2026-03</text>
              <text x="700" y="238" fill="#475569" font-size="11" font-weight="700" text-anchor="middle">2026-04</text>
            </svg>
          </div>
        </div>

        <div class="section-header-row">
          <div class="section-heading">Matrizes de Impacto (Produção x Churn)</div>
          <div class="tabs-pill-group">
            <button class="tab-pill-btn ${this.abaMatriz === 'OFERTAS' ? 'active' : ''}" @click="${() => this.abaMatriz = 'OFERTAS'}">Ofertas</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'CLASSIFICACAO' ? 'active' : ''}" @click="${() => this.abaMatriz = 'CLASSIFICACAO'}">Classificação 1</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'SEGMENTOS' ? 'active' : ''}" @click="${() => this.abaMatriz = 'SEGMENTOS'}">Segmentos</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'UNIDADES' ? 'active' : ''}" @click="${() => this.abaMatriz = 'UNIDADES'}">Unidades</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'GRID' ? 'active' : ''}" @click="${() => this.abaMatriz = 'GRID'}">Visão 2x2</button>
          </div>
        </div>

        ${this.abaMatriz === 'GRID' ? html`
          <div class="matrix-grid-2x2">
            ${this.renderTabelaSimples('OFERTAS', MATRIZ_OFERTAS)}
            ${this.renderTabelaSimples('CLASSIFICAÇÃO 1', MATRIZ_CLASSIFICACAO)}
            ${this.renderTabelaSimples('SEGMENTOS', MATRIZ_SEGMENTOS)}
            ${this.renderTabelaSimples('UNIDADE CONSOLIDADA', MATRIZ_UNIDADES)}
          </div>
        ` : html`
          <div style="margin-bottom: 24px;">
            ${this.abaMatriz === 'OFERTAS' ? this.renderTabelaSimples('OFERTAS', MATRIZ_OFERTAS) : ''}
            ${this.abaMatriz === 'CLASSIFICACAO' ? this.renderTabelaSimples('CLASSIFICAÇÃO 1', MATRIZ_CLASSIFICACAO) : ''}
            ${this.abaMatriz === 'SEGMENTOS' ? this.renderTabelaSimples('SEGMENTOS', MATRIZ_SEGMENTOS) : ''}
            ${this.abaMatriz === 'UNIDADES' ? this.renderTabelaSimples('UNIDADE CONSOLIDADA', MATRIZ_UNIDADES) : ''}
          </div>
        `}

        <div class="detail-report-card">
          <div class="detail-header">
            <h2 class="detail-title">Drilldown Analítico</h2>
            <div class="tabs-pill-group">
              <button class="tab-pill-btn ${this.abaRelatorio === 'PRODUCAO' ? 'active' : ''}" @click="${() => this.abaRelatorio = 'PRODUCAO'}">📊 Relatório de Produção</button>
              <button class="tab-pill-btn ${this.abaRelatorio === 'CHURN' ? 'active' : ''}" @click="${() => this.abaRelatorio = 'CHURN'}">🚨 Relatório de Churn</button>
            </div>
          </div>

          ${this.abaRelatorio === 'PRODUCAO' ? html`
            <div class="detail-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style="text-align: left;">Cód Cliente</th>
                    <th style="text-align: left;">Cliente</th>
                    <th style="text-align: left;">Und Atendimento</th>
                    <th style="text-align: left;">Und Consolidada</th>
                    <th style="text-align: left;">Segmento</th>
                    <th>Tipo</th>
                    <th>Receita</th>
                    <th style="text-align: left;">Agrupamento Meta</th>
                    <th>Cód Produto</th>
                    <th>Seg Produto</th>
                    <th>Oferta</th>
                    <th>Classificação 1</th>
                    <th style="text-align: left;">Descrição Produto</th>
                    <th>Série NF</th>
                    <th>Data Prod</th>
                    <th>Produção Churn</th>
                  </tr>
                </thead>
                <tbody>
                  ${RELATORIO_PRODUCAO.map(r => html`
                    <tr>
                      <td class="dim-name">${r.codCli}</td>
                      <td style="font-weight: 600;">${r.cliente}</td>
                      <td>${r.undAtend}</td>
                      <td><strong>${r.undCons}</strong></td>
                      <td>${r.segmento}</td>
                      <td class="text-center"><span class="${r.tipo === 'BASE' ? 'badge-base' : 'badge-novo'}">${r.tipo}</span></td>
                      <td>${r.receita}</td>
                      <td>${r.agrup}</td>
                      <td>${r.codProd}</td>
                      <td>${r.segProd}</td>
                      <td>${r.oferta}</td>
                      <td>${r.classif}</td>
                      <td>${r.desc}</td>
                      <td class="text-center">${r.serie}</td>
                      <td class="text-center">${r.data}</td>
                      <td class="text-right" style="font-weight: 800; color: #002b49;">${r.valor}</td>
                    </tr>
                  `)}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="15">TOTAL CONSOLIDADO</td>
                    <td class="text-right">26.901.800,86</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ` : html`
            <div class="detail-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style="text-align: left;">Cód Cliente</th>
                    <th style="text-align: left;">Cliente</th>
                    <th style="text-align: left;">Und Atendimento</th>
                    <th style="text-align: left;">Und Consolidada</th>
                    <th style="text-align: left;">Segmento</th>
                    <th>Receita</th>
                    <th>Cód Produto</th>
                    <th>Seg Produto</th>
                    <th>Oferta</th>
                    <th>Classificação 1</th>
                    <th style="text-align: left;">Descrição Produto</th>
                    <th>Série NF</th>
                    <th>Data</th>
                    <th style="color: #fca5a5;">Churn (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  ${RELATORIO_CHURN.map(r => html`
                    <tr>
                      <td class="dim-name">${r.codCli}</td>
                      <td style="font-weight: 600;">${r.cliente}</td>
                      <td>${r.undAtend}</td>
                      <td><strong>${r.undCons}</strong></td>
                      <td>${r.segmento}</td>
                      <td>${r.receita}</td>
                      <td>${r.codProd}</td>
                      <td>${r.segProd}</td>
                      <td>${r.oferta}</td>
                      <td>${r.classif}</td>
                      <td>${r.desc}</td>
                      <td class="text-center">${r.serie}</td>
                      <td class="text-center">${r.data}</td>
                      <td class="text-right" style="font-weight: 800; color: #dc2626;">${r.valor}</td>
                    </tr>
                  `)}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="13">TOTAL CHURN</td>
                    <td class="text-right" style="color: #fca5a5; font-weight: 800;">15.178.682</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          `}
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, ProducaoChurn);
