/**
 * @title Produção x Churn (Versão Vercel Preview)
 * @description Tela de "Em Construção" com layout imersivo para o painel financeiro de Produção x Churn.
 */

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'producao-churn-preview';

export class ProducaoChurnPreview extends LitElement {
  render() {
    return html`
      <style>
        * { box-sizing: border-box; }

        @keyframes spinMesh {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(220, 38, 38, 0.2); }
          50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.5); }
          100% { box-shadow: 0 0 15px rgba(220, 38, 38, 0.2); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
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
          align-items: center;
          justify-content: center;
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

        .construction-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 50px 40px;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
          border: 1px solid rgba(255, 255, 255, 1);
          border-top: 6px solid #dc2626;
          position: relative;
          z-index: 1;
          animation: float 6s ease-in-out infinite;
        }

        .icon-container {
          width: 90px;
          height: 90px;
          margin: 0 auto 24px auto;
          background: #fee2e2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: #dc2626;
          animation: pulseGlow 2s infinite;
        }

        .title {
          font-size: 26px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .description {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
          margin: 0 0 30px 0;
          font-weight: 500;
        }

        .highlight-box {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .highlight-title {
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .highlight-text {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #002b49;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 43, 73, 0.2);
        }

        .back-btn:hover {
          background: #003865;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 43, 73, 0.3);
        }
      </style>

      <div class="dash-container">
        <div class="construction-card">
          <div class="icon-container">📉</div>
          <h1 class="title">Produção x Churn</h1>
          <p class="description">
            Este painel financeiro irá cruzar a Produção Nova com a Taxa de Churn, permitindo a análise de retenção e crescimento líquido da carteira.
          </p>
          
          <div class="highlight-box">
            <div class="highlight-title">Status de Desenvolvimento</div>
            <div class="highlight-text">
              🚧 Os dados de Churn ainda não foram disponibilizados na camada de dados (LookML) e estão atualmente em fase de validação pela equipe de engenharia.
            </div>
          </div>

          <a href="?dash=hub" class="back-btn">
            ← Voltar para o Hub
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define(elementName, ProducaoChurnPreview);
