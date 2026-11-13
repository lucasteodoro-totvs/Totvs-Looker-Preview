/**
 * @title Parceiros
 * @description Visão Analítica de Produção, Volume e Ticket Médio por Parceiro (Mês vs YTD)
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'parceiros-dashboard';

/* ==========================================
   DADOS MOCKADOS: PARCEIROS
   ========================================== */
const DADOS_PARCEIROS = [
  { parceiro: '(Venda Direta / Sem Parceiro)', mesProd: '3.205.109,00', mesQtd: '1250', mesTm: '2.852,00', ytdProd: '3.205.109', ytdQtd: '1250', ytdTm: '2.733', yoyProd: '0,0%', yoyQtd: '8,9%', yoyTm: '-3,6%', rep: '0,87' },
  { parceiro: 'SURI | CHATBOTMAKER', mesProd: '149.179,00', mesQtd: '108', mesTm: '1.381,00', ytdProd: '149.179', ytdQtd: '108', ytdTm: '1.381', yoyProd: '1471,1%', yoyQtd: '1250,0%', yoyTm: '16,4%', rep: '0,04' },
  { parceiro: 'DIGTE', mesProd: '49.652,00', mesQtd: '31', mesTm: '1.601,00', ytdProd: '49.652', ytdQtd: '31', ytdTm: '1.602', yoyProd: '-49,8%', yoyQtd: '93,8%', yoyTm: '-74,6%', rep: '0,01' },
  { parceiro: 'N3URONS', mesProd: '28.686,00', mesQtd: '11', mesTm: '2.608,00', ytdProd: '28.686', ytdQtd: '11', ytdTm: '2.608', yoyProd: '-', yoyQtd: '-', yoyTm: '-', rep: '0,01' },
  { parceiro: 'VIRTUS | DUOFY', mesProd: '25.554,00', mesQtd: '2', mesTm: '12.778,00', ytdProd: '25.554', ytdQtd: '2', ytdTm: '12.777', yoyProd: '501,8%', yoyQtd: '100,0%', yoyTm: '200,9%', rep: '0,01' },
  { parceiro: 'HOB', mesProd: '18.512,00', mesQtd: '5', mesTm: '3.702,00', ytdProd: '18.512', ytdQtd: '5', ytdTm: '3.702', yoyProd: '424,2%', yoyQtd: '66,7%', yoyTm: '214,5%', rep: '0,01' },
  { parceiro: 'LEXOS', mesProd: '18.087,00', mesQtd: '23', mesTm: '1.525,00', ytdProd: '18.087', ytdQtd: '23', ytdTm: '1.525', yoyProd: '-49,5%', yoyQtd: '43,8%', yoyTm: '-31,9%', rep: '0,00' },
  { parceiro: 'NG', mesProd: '17.130,00', mesQtd: '17', mesTm: '1.008,00', ytdProd: '17.130', ytdQtd: '17', ytdTm: '1.008', yoyProd: '-71,8%', yoyQtd: '-15,0%', yoyTm: '-66,9%', rep: '0,00' },
  { parceiro: 'PROGRESS', mesProd: '16.884,00', mesQtd: '13', mesTm: '1.299,00', ytdProd: '16.884', ytdQtd: '13', ytdTm: '1.299', yoyProd: '-35,2%', yoyQtd: '-13,3%', yoyTm: '-25,3%', rep: '0,00' },
  { parceiro: 'MERCADO ELETRÔNICO', mesProd: '16.175,00', mesQtd: '1', mesTm: '16.175,00', ytdProd: '16.175', ytdQtd: '1', ytdTm: '16.175', yoyProd: '15,6%', yoyQtd: '0,0%', yoyTm: '15,6%', rep: '0,00' },
  { parceiro: 'IT UP | RENTAL', mesProd: '13.933,00', mesQtd: '7', mesTm: '1.990,00', ytdProd: '13.933', ytdQtd: '7', ytdTm: '1.990', yoyProd: '767,9%', yoyQtd: '600,0%', yoyTm: '24,0%', rep: '0,00' },
  { parceiro: 'IOB', mesProd: '12.367,00', mesQtd: '4', mesTm: '3.092,00', ytdProd: '12.367', ytdQtd: '4', ytdTm: '3.092', yoyProd: '89,0%', yoyQtd: '-20,0%', yoyTm: '136,3%', rep: '0,00' },
  { parceiro: 'SYSTOCK', mesProd: '12.283,00', mesQtd: '4', mesTm: '3.071,00', ytdProd: '12.283', ytdQtd: '4', ytdTm: '3.071', yoyProd: '214,8%', yoyQtd: '100,0%', yoyTm: '57,4%', rep: '0,00' },
  { parceiro: 'PAGUE BEM BRASIL', mesProd: '9.881,00', mesQtd: '4', mesTm: '2.471,00', ytdProd: '9.881', ytdQtd: '4', ytdTm: '2.470', yoyProd: '-', yoyQtd: '-', yoyTm: '-', rep: '0,00' }
];

const TOTAL_PARCEIROS = {
  parceiro: 'TOTAL',
  mesProd: '3.683.651,00',
  mesQtd: '1476',
  mesTm: '2.750,00',
  ytdProd: '3.683.651',
  ytdQtd: '1476',
  ytdTm: '2.653',
  yoyProd: '0,8%',
  yoyQtd: '16,9%',
  yoyTm: '-9,6%',
  rep: '1,00'
};

export class ParceirosDashboard extends LitElement {
  renderYoY(valStr) {
    if (!valStr || valStr === '-') {
      return html`<span style="color: #94a3b8;">-</span>`;
    }
    const isNeg = valStr.includes('-');
    const isNeutral = valStr === '0,0%' || valStr === '0%';
    if (isNeutral) {
      return html`<span style="color: #0284c7; font-weight: 700;">0,0%</span>`;
    }
    return html`
      <span style="color: ${isNeg ? '#dc2626' : '#16a34a'}; font-weight: 700;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  renderTotalYoY(valStr) {
    if (!valStr || valStr === '-') {
      return html`<span style="color: #94a3b8;">-</span>`;
    }
    const isNeg = valStr.includes('-');
    return html`
      <span style="color: ${isNeg ? '#fca5a5' : '#86efac'}; font-weight: 800;">
        <span style="font-size: 11px;">${isNeg ? '↘' : '↗'}</span> ${valStr}
      </span>
    `;
  }

  render() {
    return html`
      <style>
        * { box-sizing: border-box; }
        .dash-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #e2e8f0;
          min-height: 100vh;
          color: #0f172a;
          padding: 24px 28px 48px 28px;
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
          position: relative;
          overflow: hidden;
        }
        .gradient-slant {
          position: absolute;
          top: 0; right: 0; bottom: 0; width: 48%;
          background: linear-gradient(125deg, #0a192f 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%);
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
        }
        .totvs-logo-layer {
          position: absolute;
          right: 80px; top: 50%; transform: translateY(-50%); width: 80px; height: 80px;
          background-size: contain; background-position: right center; background-repeat: no-repeat;
        }
        .title-area h1 { font-size: 24px; font-weight: 900; margin: 0; color: #000; text-transform: uppercase; }
        .table-section {
          background: rgba(255, 255, 255, 0.95); padding: 22px 24px; border-radius: 12px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06); border: 1px solid rgba(255, 255, 255, 1);
        }
        .table-title { font-size: 16px; font-weight: 900; color: #0f172a; margin-bottom: 16px; text-align: center; }
        .table-responsive { overflow-x: auto; max-height: 600px; border-radius: 6px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background-color: #002b49; color: white; text-align: center; padding: 10px 8px; font-weight: 700; border: 1px solid #cbd5e1; position: sticky; top: 0; z-index: 2; }
        tr.super-header th { font-size: 12px; font-weight: 900; padding: 8px 10px; }
        tr.super-header th.group-mes { background-color: #003865; border-left: 2px solid #00d2c4; border-right: 2px solid #00d2c4; }
        tr.super-header th.group-ytd { background-color: #1e1b4b; border-left: 2px solid #a855f7; border-right: 2px solid #a855f7; }
        tr.sub-header th { font-size: 10.5px; padding: 8px 6px; top: 36px; }
        th.col-dim { text-align: left; padding-left: 12px; }
        td { padding: 10px 8px; border: 1px solid #e2e8f0; text-align: right; color: #334155; white-space: nowrap; }
        td.col-dim-val { text-align: left; padding-left: 12px; font-weight: 700; color: #0f172a; }
        .row-data { background-color: #ffffff; transition: background-color 0.2s; }
        .row-data:hover { background-color: #f8fafc; }
        .row-total td { background-color: #002b49; color: #ffffff !important; font-weight: 900; border-color: #002b49; position: sticky; bottom: 0; z-index: 2; }
      </style>
      <div class="dash-container">
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area"><h1>PARCEIROS</h1></div>
        </div>
        <div class="table-section">
          <div class="table-title">PARCEIROS</div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr class="super-header">
                  <th rowspan="2" class="col-dim">PARCEIRO</th>
                  <th colspan="3" class="group-mes">MÊS</th>
                  <th colspan="5" class="group-ytd">YTD</th>
                </tr>
                <tr class="sub-header">
                  <th>PROD</th>
                  <th>QTD</th>
                  <th>TM</th>
                  <th>PROD</th>
                  <th>QTD</th>
                  <th>TM</th>
                  <th>% YOY PROD</th>
                  <th>% YOY QTD</th>
                  <th>% YOY TM</th>
                  <th>% REP PROD</th>
                </tr>
              </thead>
              <tbody>
                ${DADOS_PARCEIROS.map(r => html`
                  <tr class="row-data">
                    <td class="col-dim-val">${r.parceiro}</td>
                    <td>${r.mesProd}</td>
                    <td>${r.mesQtd}</td>
                    <td>${r.mesTm}</td>
                    <td>${r.ytdProd}</td>
                    <td>${r.ytdQtd}</td>
                    <td>${r.ytdTm}</td>
                    <td>${this.renderYoY(r.yoyProd)}</td>
                    <td>${this.renderYoY(r.yoyQtd)}</td>
                    <td>${this.renderYoY(r.yoyTm)}</td>
                    <td>${r.rep}</td>
                  </tr>
                `)}
                <tr class="row-total">
                  <td class="col-dim-val">${TOTAL_PARCEIROS.parceiro}</td>
                  <td>${TOTAL_PARCEIROS.mesProd}</td>
                  <td>${TOTAL_PARCEIROS.mesQtd}</td>
                  <td>${TOTAL_PARCEIROS.mesTm}</td>
                  <td>${TOTAL_PARCEIROS.ytdProd}</td>
                  <td>${TOTAL_PARCEIROS.ytdQtd}</td>
                  <td>${TOTAL_PARCEIROS.ytdTm}</td>
                  <td>${this.renderTotalYoY(TOTAL_PARCEIROS.yoyProd)}</td>
                  <td>${this.renderTotalYoY(TOTAL_PARCEIROS.yoyQtd)}</td>
                  <td>${this.renderTotalYoY(TOTAL_PARCEIROS.yoyTm)}</td>
                  <td>${TOTAL_PARCEIROS.rep}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(elementName, ParceirosDashboard);
