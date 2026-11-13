/**
 * @title Produção x Churn (Versão Vercel Preview)
 * @description Painel Executivo de Produção vs Churn: Gangorra Dinâmica, Realizado Preto vs Churn Vermelho e Drilldown
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'producao-churn-preview';

const MATRIZ_OFERTAS = [
  { nome: 'INTERA BACKOFFICE', prod: '8.025.042,96', churn: '1.883.255', impacto: '0,4', impNum: 0.4 },
  { nome: 'ATENDIMENTO CONTINUADO TOTVS', prod: '2.697.423,28', churn: '1.154.222', impacto: '0,4', impNum: 0.4 },
  { nome: 'FULL TOTVS', prod: '10.378.346,82', churn: '592.264', impacto: '0,7', impNum: 0.7 },
  { nome: 'AUTOMACAO COMERCIAL', prod: '0,00', churn: '573.925', impacto: '-', impNum: 0 },
  { nome: 'FEEDZ BY TOTVS', prod: '342.878,54', churn: '503.872', impacto: '1,8', impNum: 1.8 },
  { nome: 'INTERA SEGMENTOS', prod: '2.696.201,39', churn: '444.415', impacto: '0,5', impNum: 0.5 },
  { nome: 'CLOUD PRIME', prod: '649.624,72', churn: '373.963', impacto: '0,6', impNum: 0.6 },
  { nome: 'INTERA ID 17', prod: '131.854,36', churn: '299.936', impacto: '2,3', impNum: 2.3 },
  { nome: 'INTERA RH', prod: '1.565.692,05', churn: '265.178', impacto: '0,4', impNum: 0.4 },
  { nome: 'TOTVS CLOUD', prod: '253.022,03', churn: '251.259', impacto: '1,8', impNum: 1.8 },
  { nome: 'WINTHOR DISTRIBUIDOR', prod: '4.174.592,31', churn: '237.156', impacto: '0,6', impNum: 0.6 },
  { nome: 'MANUTENÇÃO DE PACOTES CUSTOM', prod: '401.722,17', churn: '217.075', impacto: '0,5', impNum: 0.5 },
  { nome: 'BUSINESS AGILITY BY CONSULTING', prod: '0,00', churn: '199.708', impacto: '-', impNum: 0 },
  { nome: 'BUSINESS AGILITY', prod: '0,00', churn: '190.039', impacto: '-', impNum: 0 },
  { nome: 'SUSTENTACAO AMS', prod: '-1.811,88', churn: '168.253', impacto: '-92,9', impNum: -92.9 }
];

const MATRIZ_CLASSIFICACAO = [
  { nome: 'CORE SEGMENTOS', prod: '22.021.078,85', churn: '2.649.821', impacto: '0,9', impNum: 0.9 },
  { nome: 'INTERA BO', prod: '4.627.635,69', churn: '1.987.207', impacto: '0,4', impNum: 0.4 },
  { nome: 'ACT', prod: '4.946.346,02', churn: '1.321.414', impacto: '0,5', impNum: 0.5 },
  { nome: 'CLOUD + CLOUD INTERA', prod: '5.295.414,55', churn: '1.174.020', impacto: '0,3', impNum: 0.3 },
  { nome: 'PARCEIROS (BO + SEG)', prod: '3.262.770,07', churn: '938.214', impacto: '0,9', impNum: 0.9 },
  { nome: 'WINTHOR (CORE + CLOUD + PARC)', prod: '7.498.948,69', churn: '803.238', impacto: '0,7', impNum: 0.7 },
  { nome: 'FULL/LIGHT/TOTVS I', prod: '13.880.100,87', churn: '801.981', impacto: '0,7', impNum: 0.7 },
  { nome: 'RH (CORE + PARC)', prod: '4.560.096,26', churn: '781.602', impacto: '0,6', impNum: 0.6 },
  { nome: 'CROSS - INTERA', prod: '584.739,14', churn: '554.087', impacto: '1,0', impNum: 1.0 },
  { nome: 'PRIME', prod: '1.495.353,20', churn: '539.217', impacto: '0,4', impNum: 0.4 },
  { nome: 'FEEDZ', prod: '727.286,93', churn: '536.205', impacto: '0,9', impNum: 0.9 },
  { nome: 'FLUIG (CORE + PARC)', prod: '1.572.129,23', churn: '415.630', impacto: '0,5', impNum: 0.5 },
  { nome: 'BUSINESS AGILITY', prod: '268.079,48', churn: '397.074', impacto: '1,5', impNum: 1.5 },
  { nome: 'TOTVS MODA', prod: '267.687,35', churn: '356.255', impacto: '3,3', impNum: 3.3, destaque: true },
  { nome: 'CORPORATIVO', prod: '25.845.565,10', churn: '292.636', impacto: '1,1', impNum: 1.1 }
];

const MATRIZ_SEGMENTOS = [
  { nome: 'SERVICOS', prod: '51.475.005,59', churn: '3.474.011', impacto: '0,57', impNum: 0.57 },
  { nome: 'MANUFATURA', prod: '49.488.526,90', churn: '3.422.742', impacto: '0,53', impNum: 0.53 },
  { nome: 'VAREJO', prod: '15.576.314,44', churn: '2.011.466', impacto: '0,80', impNum: 0.80 },
  { nome: 'DISTRIBUICAO', prod: '14.203.663,29', churn: '1.321.475', impacto: '0,50', impNum: 0.50 },
  { nome: 'LOGISTICA', prod: '13.097.869,11', churn: '1.025.512', impacto: '0,63', impNum: 0.63 },
  { nome: 'SAUDE', prod: '8.111.971,63', churn: '1.011.460', impacto: '0,71', impNum: 0.71 },
  { nome: 'CONSTRUCAO E PROJETOS', prod: '14.119.335,52', churn: '996.262', impacto: '0,43', impNum: 0.43 },
  { nome: 'EDUCACIONAL', prod: '10.854.472,59', churn: '556.323', impacto: '0,44', impNum: 0.44 },
  { nome: 'SUPERMERCADOS', prod: '15.014.347,09', churn: '544.899', impacto: '0,50', impNum: 0.50 },
  { nome: 'AGROINDUSTRIA', prod: '4.819.532,58', churn: '408.977', impacto: '0,43', impNum: 0.43 },
  { nome: 'HOSPITALITY', prod: '1.342.250,60', churn: '396.333', impacto: '1,09', impNum: 1.09, destaque: true },
  { nome: 'JURIDICO', prod: '2.131.126,04', churn: '9.221', impacto: '0,08', impNum: 0.08 }
];

const MATRIZ_UNIDADES = [
  { nome: 'TOTVS SP1', prod: '52.013.319,56', churn: '2.243.147', impacto: '0,4', impNum: 0.4 },
  { nome: 'TOTVS SUPERMERCADOS', prod: '16.381.162,89', churn: '423.585', impacto: '0,3', impNum: 0.3 },
  { nome: 'TOTVS LE', prod: '13.965.782,12', churn: '2.730.003', impacto: '1,1', impNum: 1.1, destaque: true },
  { nome: 'TOTVS SPUB', prod: '13.927.164,80', churn: '2.176', impacto: '0,0', impNum: 0.0 },
  { nome: 'TOTVS BH', prod: '10.973.567,74', churn: '992.669', impacto: '0,7', impNum: 0.7 },
  { nome: 'TOTVS RS', prod: '10.511.162,42', churn: '746.636', impacto: '0,8', impNum: 0.8 },
  { nome: 'TOTVS SAUDE', prod: '9.848.786,05', churn: '1.006.716', impacto: '0,6', impNum: 0.6 },
  { nome: 'TOTVS RJ', prod: '9.623.997,72', churn: '1.014.526', impacto: '0,7', impNum: 0.7 },
  { nome: 'TOTVS SP3', prod: '7.552.924,43', churn: '292.314', impacto: '0,3', impNum: 0.3 },
  { nome: 'TOTVS SP2', prod: '7.238.073,12', churn: '475.068', impacto: '0,5', impNum: 0.5 },
  { nome: 'TOTVS PAULISTA', prod: '4.924.847,94', churn: '434.509', impacto: '0,5', impNum: 0.5 },
  { nome: 'TOTVS BRASIL CENTRAL', prod: '4.621.206,93', churn: '424.905', impacto: '0,5', impNum: 0.5 }
];

const RELATORIO_PRODUCAO = [
  { codCli: 'TFCRA6', cliente: 'SERRA VERDE MINERACAO', undAtend: 'TOTVS MINAS GERAIS', undCons: 'TOTVS BH', segmento: 'CONSTRUCAO', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'SERVIÇOS MENSALIZADOS', codProd: '1M13301059', segProd: 'ACT', oferta: 'ATENDIMENTO', classif: 'ACT', desc: 'ACT - ATENDIMENTO', serie: '001', data: '01/03/2026', valor: '249.814,38' },
  { codCli: 'TEXSOS', cliente: 'CM HOSPITALAR S.A.', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'DISTRIBUICAO', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'SMS PRIME', codProd: '1111001173', segProd: 'PRIME', oferta: 'SUPORTE', classif: 'PRIME', desc: 'PRIME GOLD PRT', serie: '001', data: '01/03/2026', valor: '203.217,29' },
  { codCli: 'TEXSOS', cliente: 'CM HOSPITALAR S.A.', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'DISTRIBUICAO', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'SERVIÇOS MENSALIZADOS', codProd: '1M13301113', segProd: 'BUSINESS AGILITY', oferta: 'SEM OFERTA', classif: 'BUSINESS AGILITY', desc: 'BA PROFESS SERV - S', serie: '001', data: '01/03/2026', valor: '184.557,45' },
  { codCli: 'T16602', cliente: 'CROWN EMBALAGENS', undAtend: 'TOTVS SAO PAULO', undCons: 'TOTVS SP1', segmento: 'MANUFATURA', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'CONSULTORIA TRADICIONAL', codProd: '1M13301008', segProd: 'AMS', oferta: 'PRIME', classif: 'AMS', desc: 'AMS RECORRENTE', serie: '300', data: '01/03/2026', valor: '160.301,58' },
  { codCli: 'T16602', cliente: 'CROWN EMBALAGENS', undAtend: 'TOTVS SAO PAULO', undCons: 'TOTVS SP1', segmento: 'MANUFATURA', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'CONSULTORIA TRADICIONAL', codProd: '1M13301008', segProd: 'AMS', oferta: 'PRIME', classif: 'AMS', desc: 'AMS RECORRENTE', serie: '-', data: '01/01/2026', valor: '155.777,54' },
  { codCli: 'T55289', cliente: 'AGIS CONSTRUTORA', undAtend: 'TOTVS SAO PAULO', undCons: 'TOTVS SP1', segmento: 'CONSTRUCAO', tipo: 'BASE', receita: 'SAAS', agrup: 'CLOUD', codProd: '2F26001122', segProd: 'CLOUD', oferta: 'CLOUD', classif: 'CLOUD + CLOUD INTERA', desc: 'CLOUD PRIME', serie: '001', data: '01/04/2026', valor: '128.437,52' },
  { codCli: 'T55289', cliente: 'AGIS CONSTRUTORA', undAtend: 'TOTVS SAO PAULO', undCons: 'TOTVS SP1', segmento: 'CONSTRUCAO', tipo: 'BASE', receita: 'SAAS', agrup: 'CLOUD', codProd: '2F26001122', segProd: 'CLOUD', oferta: 'CLOUD', classif: 'CLOUD + CLOUD INTERA', desc: 'CLOUD PRIME', serie: '-', data: '01/03/2026', valor: '128.437,51' },
  { codCli: 'T58219', cliente: 'DOVAC INDUSTRIA METAL', undAtend: 'TOTVS SAO PAULO', undCons: 'TOTVS SP1', segmento: 'MANUFATURA', tipo: 'BASE', receita: 'SMS', agrup: 'SMS SERIE 3, SMS SER', codProd: '1131001228', segProd: 'MANUFATURA', oferta: 'MANUFATURA', classif: 'CORPORATIVO', desc: 'SMS CORP TOTVS S3', serie: '001', data: '01/04/2026', valor: '119.609,37' },
  { codCli: 'T22498', cliente: 'SERV BRASILEIRO APOIO', undAtend: 'TOTVS AR SETOR PUBLICO', undCons: 'TOTVS SPUB', segmento: 'SERVICOS', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'SERVIÇOS MENSALIZADOS', codProd: '1M13301076', segProd: 'ACT', oferta: 'ATENDIMENTO', classif: 'ACT', desc: 'SER ATEND CONT. S3', serie: '-', data: '01/03/2026', valor: '116.850,64' },
  { codCli: 'TFERA6', cliente: 'HNT COMERCIO DE ALIMENTOS', undAtend: 'TOTVS SUPERMERCADOS', undCons: 'TOTVS SUPERMERCADOS', segmento: 'VAREJO', tipo: 'NOVO', receita: 'SAAS', agrup: 'CLOUD', codProd: '2F26001122', segProd: 'CLOUD', oferta: 'CLOUD', classif: 'CLOUD + CLOUD INTERA', desc: 'CLOUD PRIME', serie: '001', data: '01/03/2026', valor: '112.760,01' }
];

const RELATORIO_CHURN = [
  { codCli: 'TFDSLF', cliente: 'DISTRIBUIDORA SAO LUIS', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'VAREJO', tipo: 'BASE', receita: 'SAAS', agrup: 'DISTRIBUICAO', codProd: '71233001', segProd: 'DISTRIBUICAO', oferta: 'AUTOMACAO COMERCIAL', classif: 'CORPORATIVO', desc: 'SISTEMA VAREJO PDV', serie: '001', data: '01/04/2026', valor: '573.925,00' },
  { codCli: 'TFEETQ', cliente: 'EMPRESA ENGENHARIA LTDA', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'SERVICOS', tipo: 'BASE', receita: 'SAAS', agrup: 'CLOUD', codProd: '2F260011', segProd: 'CLOUD', oferta: 'CLOUD PRIME', classif: 'CLOUD + INTERA', desc: 'SERVICO CLOUD GESTAO', serie: '001', data: '01/03/2026', valor: '175.087,00' },
  { codCli: 'TEZKO6', cliente: 'HOSPITAL VIDA & SAUDE', undAtend: 'TOTVS SAUDE', undCons: 'TOTVS SAUDE', segmento: 'SAUDE', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'BUSINESS AGILITY', codProd: '1M133099', segProd: 'BUSINESS AGILITY', oferta: 'BUSINESS AGILITY', classif: 'BUSINESS AGILITY', desc: 'CONSULTORIA PRODUTO', serie: '001', data: '01/02/2026', valor: '146.215,00' },
  { codCli: 'TFDSLF', cliente: 'DISTRIBUIDORA SAO LUIS', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'VAREJO', tipo: 'BASE', receita: 'SAAS', agrup: 'DISTRIBUICAO', codProd: '71233002', segProd: 'DISTRIBUICAO', oferta: 'TOTVS MODA', classif: 'CORPORATIVO', desc: 'MODULO GESTAO VAREJO', serie: '001', data: '01/03/2026', valor: '86.628,00' },
  { codCli: 'TFDSLF', cliente: 'DISTRIBUIDORA SAO LUIS', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'VAREJO', tipo: 'BASE', receita: 'SAAS', agrup: 'DISTRIBUICAO', codProd: '71233003', segProd: 'DISTRIBUICAO', oferta: 'TOTVS MODA', classif: 'CORPORATIVO', desc: 'INTEGRADOR FISCAL', serie: '001', data: '01/01/2026', valor: '83.526,00' },
  { codCli: 'TFDRE6', cliente: 'REDE SUL METALURGICA', undAtend: 'TOTVS RS', undCons: 'TOTVS RS', segmento: 'MANUFATURA', tipo: 'BASE', receita: 'SAAS', agrup: 'BACKOFFICE', codProd: '7T633012', segProd: 'BACKOFFICE', oferta: 'INTERA BO', classif: 'INTERA BO', desc: 'LICENCA INTERA CLOUD', serie: '001', data: '01/04/2026', valor: '82.568,00' },
  { codCli: 'TFCKL0', cliente: 'KL EMBALAGENS', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'MANUFATURA', tipo: 'BASE', receita: 'SERVICOS REC', agrup: 'BUSINESS AGILITY', codProd: '1M133044', segProd: 'BUSINESS AGILITY', oferta: 'BUSINESS AGILITY', classif: 'BUSINESS AGILITY', desc: 'BA CONSULTORIA FLUXO', serie: '001', data: '01/03/2026', valor: '77.241,00' },
  { codCli: 'TFDR01', cliente: 'DROGARIA POPULAR BRASIL', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'DISTRIBUICAO', tipo: 'BASE', receita: 'SMS', agrup: 'PRIME', codProd: '11110022', segProd: 'PRIME', oferta: 'PRIME GOLD', classif: 'PRIME', desc: 'SUPORTE MENSAL PRIME', serie: '001', data: '01/02/2026', valor: '76.946,00' },
  { codCli: 'TFDR02', cliente: 'DROGARIA POPULAR BRASIL', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'DISTRIBUICAO', tipo: 'BASE', receita: 'SAAS', agrup: 'BACKOFFICE', codProd: '7T633015', segProd: 'BACKOFFICE', oferta: 'INTERA BO', classif: 'INTERA BO', desc: 'ASSINATURA ERP S3', serie: '001', data: '01/01/2026', valor: '74.310,00' },
  { codCli: 'T33319', cliente: 'TEXTIL INDUSTRIAL PAULISTA', undAtend: 'TOTVS LARGE ENTERPRISE', undCons: 'TOTVS LE', segmento: 'MANUFATURA', tipo: 'BASE', receita: 'SMS', agrup: 'MANUFATURA', codProd: '11133700', segProd: 'TOTVS SMS', oferta: 'TOTVS CORP', classif: 'CORPORATIVO', desc: 'MANUTENCAO SOFTWARE', serie: '001', data: '01/03/2026', valor: '71.421,00' }
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
    return html`
      <span style="background: ${bg}; color: ${color}; font-weight: 800; padding: 3px 8px; border-radius: 4px; display: inline-block;">
        ${impactoStr}
      </span>
    `;
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

        @keyframes spinMesh {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
          overflow: hidden;
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
          padding: 18px 24px;
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

        .kpi-row {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .gangorra-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }

        .gangorra-title {
          font-size: 13px;
          font-weight: 900;
          color: #002b49;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
          margin-bottom: 12px;
        }

        .gangorra-kpis {
          display: flex;
          justify-content: space-around;
          margin-bottom: 8px;
        }

        .gkpi-label {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
        }

        .gkpi-label.churn {
          color: #dc2626;
        }

        .gkpi-val-prod {
          font-size: 24px;
          font-weight: 900;
          color: #002b49;
          margin: 2px 0;
        }

        .gkpi-val-churn {
          font-size: 24px;
          font-weight: 900;
          color: #dc2626;
          margin: 2px 0;
        }

        .yoy-sub {
          font-size: 11px;
          font-weight: 700;
        }

        .yoy-pos { color: #16a34a; }
        .yoy-neg { color: #dc2626; }

        .gangorra-svg-box {
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 6px 0;
        }

        .gangorra-bottom-index {
          padding-top: 10px;
          border-top: 1px dashed #cbd5e1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .big-index {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
        }

        .big-index-sub {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .receitas-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .receita-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 14px 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          display: grid;
          grid-template-columns: 1.4fr 1.4fr 120px;
          align-items: center;
          position: relative;
        }

        .rec-section {
          padding: 0 14px;
        }

        .rec-section:first-child {
          padding-left: 0;
        }

        .rec-section.border-left {
          border-left: 1px dashed #cbd5e1;
        }

        .rec-name {
          font-size: 14px;
          font-weight: 900;
          color: #002b49;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .rec-prod-val {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .rec-churn-val {
          font-size: 22px;
          font-weight: 900;
          color: #dc2626;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .rec-qtd-yoy {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
        }

        .index-box {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .index-title {
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .index-number {
          font-size: 26px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
        }

        .alert-pill {
          font-size: 9.5px;
          font-weight: 800;
          background: #fee2e2;
          color: #dc2626;
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
        }

        .chart-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .chart-title {
          font-size: 15px;
          font-weight: 900;
          color: #002b49;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .chart-legend {
          display: flex;
          gap: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
          text-transform: uppercase;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .trend-svg-box {
          width: 100%;
          height: 250px;
          overflow: visible;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }

        .section-heading {
          font-size: 15px;
          font-weight: 900;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tabs-pill-group {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          padding: 3px;
          border: 1px solid #cbd5e1;
          gap: 4px;
        }

        .tab-pill-btn {
          background: transparent;
          border: none;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-transform: uppercase;
        }

        .tab-pill-btn.active {
          background: #002b49;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 43, 73, 0.2);
        }

        .matrix-grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .matrix-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 18px 20px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          flex: 1;
        }

        .matrix-title {
          font-size: 14px;
          font-weight: 900;
          color: #002b49;
          margin-bottom: 12px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .matrix-table-wrap {
          max-height: 400px;
          overflow-y: auto;
          border-radius: 6px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11.5px;
        }

        th {
          background-color: #002b49;
          color: white;
          text-align: right;
          padding: 9px 8px;
          font-weight: 700;
          letter-spacing: 0.2px;
          white-space: nowrap;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        td {
          padding: 8px 8px;
          border-bottom: 1px solid #edf2f7;
          color: #334155;
          white-space: nowrap;
        }

        tr:hover td {
          background-color: #f8fafc;
        }

        .dim-name {
          font-weight: 700;
          color: #0f172a;
          text-align: left;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        tfoot td {
          background-color: #002b49;
          color: #ffffff !important;
          font-weight: 800;
          position: sticky;
          bottom: 0;
          z-index: 2;
        }

        .detail-report-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06);
          border: 1px solid rgba(255, 255, 255, 1);
          position: relative;
          z-index: 1;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .detail-title {
          font-size: 16px;
          font-weight: 900;
          color: #002b49;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-table-wrap {
          overflow-x: auto;
          max-height: 480px;
          border-radius: 6px;
        }

        .badge-base { background: #dbeafe; color: #1e40af; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
        .badge-novo { background: #dcfce7; color: #166534; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
      </style>

      <div class="dash-container">
        <div class="hero-banner">
          <div class="gradient-slant"></div>
          <div class="title-area">
            <h1>PRODUÇÃO X CHURN</h1>
          </div>
        </div>

        <div class="kpi-row">
          <div class="gangorra-card">
            <div class="gangorra-title">Representatividade Churn</div>

            <div class="gangorra-kpis">
              <div>
                <div class="gkpi-label">Produção</div>
                <div class="gkpi-val-prod">${this.prodTotal.toFixed(1).replace('.', ',')} Mi</div>
                <div class="yoy-sub yoy-neg">↘ -0,9% YoY</div>
              </div>
              <div>
                <div class="gkpi-label churn">Churn</div>
                <div class="gkpi-val-churn">${this.churnTotal.toFixed(1).replace('.', ',')} Mi</div>
                <div class="yoy-sub yoy-neg">↗ +62,7% YoY</div>
              </div>
            </div>

            <div class="gangorra-svg-box">
              <svg viewBox="0 0 200 90" width="180" height="85">
                <polygon points="90,82 110,82 100,52" fill="#002b49" />
                <rect x="75" y="80" width="50" height="4" rx="2" fill="#002b49" />
                <circle cx="100" cy="52" r="6" fill="#00d2c4" />

                <g style="transform-origin: 100px 52px; transform: rotate(${angle}deg); transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);">
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
                <div class="rec-prod-val">
                  18,0 Mi <span class="yoy-sub yoy-pos" style="font-size: 11px;">↗ 18,7%</span>
                </div>
                <div class="rec-qtd-yoy">Qtd: <strong>5.296</strong> <span class="yoy-pos">↗ 28,7%</span></div>
              </div>
              <div class="rec-section border-left">
                <div class="rec-name" style="color: #dc2626;">CHURN</div>
                <div class="rec-churn-val">
                  9,9 Mi <span class="yoy-sub yoy-neg" style="font-size: 11px;">↗ 82,5%</span>
                </div>
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
                <div class="rec-prod-val">
                  2,6 Mi <span class="yoy-sub yoy-pos" style="font-size: 11px;">↗ 17,1%</span>
                </div>
                <div class="rec-qtd-yoy">Qtd: <strong>986</strong> <span class="yoy-neg">↘ -3,2%</span></div>
              </div>
              <div class="rec-section border-left">
                <div class="rec-name" style="color: #dc2626;">CHURN</div>
                <div class="rec-churn-val">
                  3,0 Mi <span class="yoy-sub yoy-neg" style="font-size: 11px;">↗ 16,9%</span>
                </div>
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
                <div class="rec-prod-val">
                  6,2 Mi <span class="yoy-sub yoy-pos" style="font-size: 11px;">↗ 37,4%</span>
                </div>
                <div class="rec-qtd-yoy">Qtd: <strong>565</strong> <span class="yoy-pos">↗ 17,0%</span></div>
              </div>
              <div class="rec-section border-left">
                <div class="rec-name" style="color: #dc2626;">CHURN</div>
                <div class="rec-churn-val">
                  2,0 Mi <span class="yoy-sub yoy-neg" style="font-size: 11px;">↗ 69,8%</span>
                </div>
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
                <linearGradient id="realGradBlack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#0f172a" stop-opacity="0.01"/>
                </linearGradient>
                <linearGradient id="churnGradRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#dc2626" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#dc2626" stop-opacity="0.02"/>
                </linearGradient>
              </defs>

              <line x1="60" y1="20" x2="740" y2="20" stroke="#e2e8f0" stroke-dasharray="3"/>
              <text x="50" y="24" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">10M</text>

              <line x1="60" y1="75" x2="740" y2="75" stroke="#e2e8f0" stroke-dasharray="3"/>
              <text x="50" y="79" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">8M</text>

              <line x1="60" y1="130" x2="740" y2="130" stroke="#e2e8f0" stroke-dasharray="3"/>
              <text x="50" y="134" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">6M</text>

              <line x1="60" y1="185" x2="740" y2="185" stroke="#e2e8f0" stroke-dasharray="3"/>
              <text x="50" y="189" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">4M</text>

              <line x1="60" y1="220" x2="740" y2="220" stroke="#cbd5e1" />
              <text x="50" y="224" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">0M</text>

              <path d="M 100,147.6 C 133.3,149.7 233.3,157.0 300,160.4 C 366.7,163.8 433.3,169.8 500,168.1 C 566.7,166.4 666.7,153.0 700,150.0 L 700,220 L 100,220 Z" fill="url(#churnGradRed)"/>
              <path d="M 100,147.6 C 133.3,149.7 233.3,157.0 300,160.4 C 366.7,163.8 433.3,169.8 500,168.1 C 566.7,166.4 666.7,153.0 700,150.0" fill="none" stroke="#dc2626" stroke-width="2.5"/>

              <path d="M 100,130.2 C 133.3,126.1 233.3,122.6 300,105.6 C 366.7,88.5 433.3,28.0 500,27.9 C 566.7,27.8 666.7,91.9 700,104.7 L 700,220 L 100,220 Z" fill="url(#realGradBlack)"/>
              <path d="M 100,130.2 C 133.3,126.1 233.3,122.6 300,105.6 C 366.7,88.5 433.3,28.0 500,27.9 C 566.7,27.8 666.7,91.9 700,104.7" fill="none" stroke="#0f172a" stroke-width="2.8"/>

              <circle cx="100" cy="130.2" r="5" fill="#0f172a" stroke="#fff" stroke-width="2"/>
              <text x="100" y="118" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">R$ 4.99M</text>

              <circle cx="300" cy="105.6" r="5" fill="#0f172a" stroke="#fff" stroke-width="2"/>
              <text x="300" y="93" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">R$ 6.11M</text>

              <circle cx="500" cy="27.9" r="6" fill="#0f172a" stroke="#fff" stroke-width="2"/>
              <text x="500" y="16" fill="#0f172a" font-size="12" font-weight="900" text-anchor="middle">R$ 9.64M</text>

              <circle cx="700" cy="104.7" r="5" fill="#0f172a" stroke="#fff" stroke-width="2"/>
              <text x="700" y="92" fill="#0f172a" font-size="11" font-weight="900" text-anchor="middle">R$ 6.15M</text>

              <circle cx="100" cy="147.6" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/>
              <text x="100" y="166" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 4.20M</text>

              <circle cx="300" cy="160.4" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/>
              <text x="300" y="179" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 3.62M</text>

              <circle cx="500" cy="168.1" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/>
              <text x="500" y="187" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 3.27M</text>

              <circle cx="700" cy="150.0" r="5" fill="#dc2626" stroke="#fff" stroke-width="2"/>
              <text x="700" y="168" fill="#dc2626" font-size="11" font-weight="900" text-anchor="middle">R$ 4.09M</text>

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
            <button class="tab-pill-btn ${this.abaMatriz === 'OFERTAS' ? 'active' : ''}" @click="${() => { this.abaMatriz = 'OFERTAS'; this.requestUpdate(); }}">Ofertas</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'CLASSIFICACAO' ? 'active' : ''}" @click="${() => { this.abaMatriz = 'CLASSIFICACAO'; this.requestUpdate(); }}">Classificação 1</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'SEGMENTOS' ? 'active' : ''}" @click="${() => { this.abaMatriz = 'SEGMENTOS'; this.requestUpdate(); }}">Segmentos</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'UNIDADES' ? 'active' : ''}" @click="${() => { this.abaMatriz = 'UNIDADES'; this.requestUpdate(); }}">Unidades</button>
            <button class="tab-pill-btn ${this.abaMatriz === 'GRID' ? 'active' : ''}" @click="${() => { this.abaMatriz = 'GRID'; this.requestUpdate(); }}">Visão 2x2</button>
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
          <div style="margin-bottom: 24px; position: relative; z-index: 1;">
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
              <button class="tab-pill-btn ${this.abaRelatorio === 'PRODUCAO' ? 'active' : ''}" @click="${() => { this.abaRelatorio = 'PRODUCAO'; this.requestUpdate(); }}">
                📊 Relatório de Produção
              </button>
              <button class="tab-pill-btn ${this.abaRelatorio === 'CHURN' ? 'active' : ''}" @click="${() => { this.abaRelatorio = 'CHURN'; this.requestUpdate(); }}">
                🚨 Relatório de Churn
              </button>
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
