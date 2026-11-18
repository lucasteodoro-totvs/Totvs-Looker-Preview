/**
 * @title Mapa de Oportunidades - Panorama de Regiões e Unidades
 * @description Distribuição geográfica e comercial de oportunidades por Tipo de Unidade (Filiais vs Franquias),
 *              Mapa interativo do Brasil por Região (Norte, Nordeste, Centro-Oeste, Sudeste, Sul),
 *              Top Unidades e Ranking de Cidades.
 */

import { LitElement, html, svg } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export const elementName = 'mapa-oportunidades-regioes';

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

const CANAIS_CARDS = [
  {
    id: 'FILIAIS',
    titulo: 'Filiais',
    qtd: '1,6 Mi',
    qtdRep: '44% Repr.',
    rec: 'R$ 2,8 Bi',
    recRep: '45% Repr.',
    nrec: 'R$ 16,9 Bi',
    nrecRep: '45% Repr.'
  },
  {
    id: 'FRANQUIAS',
    titulo: 'Franquias',
    qtd: '2,0 Mi',
    qtdRep: '56% Repr.',
    rec: 'R$ 3,5 Bi',
    recRep: '55% Repr.',
    nrec: 'R$ 20,8 Bi',
    nrecRep: '55% Repr.'
  }
];

/* Regiões do Brasil com polígonos geográficos precisos (viewBox 0 0 560 540) e posições dos cards */
const REGIOES_BRASIL = [
  {
    id: 'NORTE',
    nome: 'NORTE',
    baseFmt: '17 Mil',
    novoFmt: '116 Mil',
    baseNum: 17000,
    novoNum: 116000,
    fill: '#0ea5e9',
    fillHover: '#0284c7',
    cardLeft: '13%',
    cardTop: '21%',
    path: 'M 199.8,264.2 L 185.6,262.8 L 180.7,258.8 L 172.9,256.5 L 169.1,253.2 L 163.1,250.9 L 154.1,250.8 L 147.4,246.0 L 141.3,240.0 L 138.0,233.3 L 136.9,216.6 L 128.6,216.5 L 123.4,218.2 L 112.9,225.8 L 110.7,229.2 L 105.4,230.3 L 102.4,234.2 L 97.9,235.3 L 81.4,234.4 L 76.9,235.9 L 70.4,231.8 L 69.5,218.6 L 64.2,222.3 L 52.2,222.3 L 48.5,216.7 L 40.2,216.3 L 38.0,214.6 L 38.3,207.8 L 28.8,196.6 L 25.9,189.8 L 28.1,186.8 L 28.7,180.8 L 35.6,174.8 L 35.9,168.1 L 39.3,156.9 L 47.0,150.6 L 56.0,146.1 L 60.5,145.6 L 68.7,141.4 L 74.7,142.7 L 76.2,141.4 L 82.3,104.4 L 79.5,99.9 L 78.8,95.4 L 73.5,90.9 L 73.3,81.9 L 74.0,80.2 L 82.7,75.9 L 76.6,74.4 L 76.6,65.5 L 79.2,63.4 L 95.7,63.3 L 97.9,60.7 L 103.2,61.0 L 109.2,57.4 L 115.0,62.5 L 115.6,68.4 L 121.9,73.5 L 125.7,75.2 L 131.6,70.9 L 136.9,72.1 L 141.4,68.2 L 150.4,64.6 L 152.2,60.2 L 157.8,56.5 L 153.0,53.5 L 150.0,46.0 L 149.5,40.0 L 142.6,32.5 L 143.6,29.8 L 147.4,29.0 L 155.6,33.2 L 162.4,32.0 L 168.4,35.5 L 170.6,30.4 L 183.3,28.6 L 193.1,23.7 L 196.1,20.5 L 197.6,15.4 L 205.8,15.5 L 208.1,17.5 L 208.6,23.5 L 214.3,32.5 L 209.9,42.2 L 210.1,52.0 L 212.5,55.0 L 213.5,60.2 L 217.8,64.4 L 222.3,66.3 L 228.3,62.2 L 238.0,59.8 L 242.5,55.9 L 256.8,57.1 L 258.2,52.0 L 260.5,49.9 L 276.3,50.0 L 283.0,54.1 L 286.7,52.8 L 301.7,52.6 L 307.7,40.0 L 316.7,28.0 L 322.0,27.8 L 325.1,31.0 L 327.1,44.5 L 331.6,56.5 L 339.9,60.7 L 341.8,63.2 L 341.7,68.4 L 336.0,78.2 L 336.2,83.5 L 342.2,85.8 L 349.7,84.5 L 360.2,87.5 L 361.4,89.4 L 360.0,93.2 L 360.9,95.5 L 370.7,91.9 L 381.9,95.2 L 390.8,99.9 L 386.7,117.9 L 377.4,135.0 L 369.2,144.8 L 360.6,150.9 L 373.0,159.9 L 373.4,168.1 L 369.6,178.6 L 372.5,184.6 L 376.7,188.8 L 383.8,190.6 L 383.4,193.5 L 379.7,196.3 L 377.1,202.6 L 382.2,210.1 L 381.6,213.1 L 384.4,217.6 L 391.2,220.5 L 385.9,225.8 L 382.5,232.5 L 382.6,234.9 L 386.2,237.8 L 386.2,241.5 L 383.9,245.3 L 384.9,252.0 L 376.7,256.8 L 367.7,257.6 L 365.4,259.2 L 360.2,257.0 L 353.4,256.7 L 349.7,251.0 L 344.4,256.4 L 339.9,256.7 L 334.9,253.5 L 334.5,247.5 L 330.2,249.7 L 328.4,243.0 L 330.0,223.5 L 333.4,213.8 L 320.5,211.9 L 304.7,211.8 L 301.0,210.4 L 257.5,208.7 L 249.3,205.4 L 241.0,198.8 L 236.4,185.3 L 232.8,181.0 L 229.5,186.1 L 230.8,190.6 L 229.2,195.8 L 226.8,198.2 L 190.8,199.9 L 189.0,201.1 L 188.9,217.6 L 190.8,227.8 L 202.1,228.4 L 209.7,231.0 L 208.4,237.0 L 211.2,243.0 L 211.2,248.3 L 205.8,255.8 L 204.8,259.5 Z'
  },
  {
    id: 'NORDESTE',
    nome: 'NORDESTE',
    baseFmt: '50 Mil',
    novoFmt: '347 Mil',
    baseNum: 50000,
    novoNum: 347000,
    fill: '#0284c7',
    fillHover: '#0369a1',
    cardLeft: '62%',
    cardTop: '29%',
    path: 'M 465.8,328.5 L 462.8,328.7 L 458.5,326.2 L 453.1,315.7 L 453.5,312.7 L 463.3,300.7 L 458.3,296.2 L 451.6,294.5 L 447.1,295.1 L 443.2,288.7 L 429.9,283.7 L 423.8,278.2 L 416.4,279.2 L 412.6,273.5 L 407.4,273.6 L 389.4,283.5 L 387.1,282.7 L 388.3,274.5 L 383.9,267.0 L 386.7,255.8 L 383.9,246.0 L 386.2,241.5 L 386.2,237.8 L 382.4,233.3 L 385.9,225.8 L 391.2,220.5 L 384.4,217.6 L 381.6,213.1 L 382.2,210.1 L 377.1,202.6 L 379.7,196.3 L 383.4,193.5 L 383.8,190.6 L 376.7,188.8 L 372.5,184.6 L 369.6,178.6 L 373.4,168.1 L 373.0,159.9 L 360.6,150.9 L 369.2,144.8 L 377.4,135.0 L 386.7,117.9 L 389.1,111.2 L 390.0,102.2 L 391.6,100.1 L 404.4,104.2 L 410.0,108.2 L 413.8,115.7 L 411.9,122.6 L 426.1,116.0 L 437.3,121.6 L 445.6,121.9 L 451.6,124.8 L 464.3,123.3 L 471.8,125.2 L 487.1,135.9 L 506.3,153.1 L 513.0,156.3 L 522.8,156.6 L 528.8,159.7 L 532.3,168.1 L 532.6,174.8 L 535.4,182.3 L 535.5,193.6 L 532.3,206.3 L 528.9,213.1 L 513.3,230.3 L 504.6,234.8 L 503.3,238.5 L 486.8,261.0 L 483.8,261.2 L 480.8,259.1 L 477.4,264.8 L 476.9,280.5 L 475.5,284.2 L 476.9,288.7 L 476.8,299.2 L 474.1,304.5 L 470.8,323.2 Z'
  },
  {
    id: 'CENTRO-OESTE',
    nome: 'CENTRO-OESTE',
    baseFmt: '25 Mil',
    novoFmt: '228 Mil',
    baseNum: 25000,
    novoNum: 228000,
    fill: '#002b49',
    fillHover: '#0a3d62',
    cardLeft: '24%',
    cardTop: '49%',
    path: 'M 272.5,398.9 L 267.3,397.4 L 265.7,394.4 L 263.7,380.9 L 261.3,377.1 L 256.0,375.5 L 250.0,376.8 L 239.5,375.3 L 235.5,372.6 L 236.2,361.4 L 232.5,348.7 L 234.7,344.9 L 234.0,337.4 L 239.2,322.4 L 238.2,318.0 L 236.0,314.2 L 228.3,309.0 L 227.0,299.2 L 208.8,298.9 L 207.0,297.7 L 205.2,288.0 L 201.0,282.7 L 203.8,275.2 L 202.2,267.0 L 200.1,264.8 L 204.8,259.5 L 205.8,255.8 L 211.2,248.3 L 211.2,243.0 L 208.4,237.0 L 209.7,231.0 L 202.1,228.4 L 191.6,228.2 L 190.4,226.5 L 188.9,217.6 L 189.3,200.4 L 226.8,198.2 L 229.2,195.8 L 230.8,190.6 L 229.5,186.1 L 232.8,181.0 L 236.4,185.3 L 241.0,198.8 L 249.3,205.4 L 257.5,208.7 L 301.0,210.4 L 304.7,211.8 L 320.5,211.9 L 333.4,213.8 L 330.0,223.5 L 328.4,243.0 L 330.2,249.7 L 334.5,247.5 L 334.9,253.5 L 339.5,256.5 L 344.4,256.4 L 349.7,251.0 L 353.4,256.7 L 360.2,257.0 L 364.7,259.2 L 376.7,256.8 L 384.1,253.1 L 386.7,255.0 L 383.9,267.0 L 388.3,274.5 L 388.3,278.2 L 385.6,280.8 L 381.2,279.4 L 378.3,281.2 L 376.6,283.5 L 375.9,291.0 L 370.6,295.5 L 368.9,301.5 L 371.7,306.7 L 367.6,312.0 L 369.7,316.5 L 368.4,321.0 L 361.7,325.8 L 351.2,324.4 L 331.7,329.5 L 324.2,337.1 L 322.4,341.2 L 323.5,346.4 L 317.0,351.7 L 307.9,369.7 L 291.5,383.1 L 283.1,397.4 L 280.0,398.7 L 277.0,396.6 Z'
  },
  {
    id: 'SUDESTE',
    nome: 'SUDESTE',
    baseFmt: '209 Mil',
    novoFmt: '2 Mi',
    baseNum: 209000,
    novoNum: 2000000,
    fill: '#0284c7',
    fillHover: '#0369a1',
    cardLeft: '60%',
    cardTop: '60%',
    path: 'M 358.7,413.4 L 351.9,411.3 L 348.9,407.4 L 343.9,406.4 L 343.2,401.9 L 339.0,395.1 L 338.7,388.4 L 335.4,384.9 L 326.5,384.3 L 310.7,378.6 L 304.0,379.8 L 300.2,377.6 L 308.5,368.9 L 317.0,351.7 L 323.5,346.4 L 322.4,341.2 L 325.0,336.1 L 335.4,327.6 L 343.7,327.3 L 351.2,324.4 L 361.7,325.8 L 367.8,321.7 L 369.7,316.5 L 367.6,312.0 L 371.7,306.7 L 369.1,300.0 L 370.7,295.3 L 375.9,291.0 L 376.6,283.5 L 380.4,279.6 L 383.4,279.8 L 388.6,283.7 L 407.4,273.6 L 412.6,273.5 L 416.4,279.2 L 423.8,278.2 L 429.9,283.7 L 443.2,288.7 L 447.1,295.1 L 450.8,294.4 L 457.6,296.0 L 462.8,299.4 L 463.0,301.5 L 453.0,315.0 L 457.9,325.4 L 464.7,329.9 L 463.3,344.2 L 447.1,365.9 L 444.7,371.2 L 444.4,377.1 L 438.8,381.1 L 433.6,382.1 L 429.9,390.1 L 401.4,389.2 L 399.9,392.9 L 392.4,395.1 L 387.1,399.3 L 379.7,399.5 L 375.9,401.1 Z'
  },
  {
    id: 'SUL',
    nome: 'SUL',
    baseFmt: '57 Mil',
    novoFmt: '792 Mil',
    baseNum: 57000,
    novoNum: 792000,
    fill: '#002b49',
    fillHover: '#0a3d62',
    cardLeft: '36%',
    cardTop: '80%',
    path: 'M 293.5,525.0 L 290.5,525.3 L 288.1,523.3 L 287.9,516.5 L 290.8,510.5 L 284.9,502.3 L 279.3,499.3 L 277.0,496.0 L 270.3,493.5 L 267.3,489.7 L 261.3,490.3 L 260.1,486.5 L 253.0,479.5 L 244.8,480.4 L 242.0,478.3 L 257.1,458.1 L 268.0,447.1 L 286.0,436.3 L 286.2,422.8 L 283.7,419.1 L 278.5,418.8 L 276.0,416.1 L 279.5,399.6 L 284.5,395.9 L 286.7,389.5 L 292.7,381.9 L 298.0,378.6 L 305.5,379.9 L 310.0,378.5 L 326.5,384.3 L 335.4,384.9 L 338.7,388.4 L 339.0,395.1 L 343.2,401.9 L 343.9,406.4 L 348.9,407.4 L 357.8,415.4 L 352.7,418.3 L 349.6,427.3 L 350.9,448.3 L 347.6,457.3 L 336.6,467.1 L 328.1,484.3 L 321.6,494.0 L 305.1,507.5 L 301.0,517.5 Z'
  }
];

const UNIDADES_ALL = [
  { nome: 'TOTVS SP1', labelLinha1: 'TOTVS SP1', labelLinha2: '', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 62502, novo: 363266 },
  { nome: 'TOTVS OESTE', labelLinha1: 'TOTVS OESTE', labelLinha2: '', regiao: 'SUDESTE', tipo: 'FRANQUIAS', base: 18239, novo: 297583 },
  { nome: 'TOTVS LESTE', labelLinha1: 'TOTVS LESTE', labelLinha2: '', regiao: 'SUDESTE', tipo: 'FRANQUIAS', base: 21806, novo: 258827 },
  { nome: 'TOTVS PAULISTA', labelLinha1: 'TOTVS', labelLinha2: 'PAULISTA', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 17362, novo: 259064 },
  { nome: 'TOTVS SANTA CATARINA', labelLinha1: 'TOTVS SANTA', labelLinha2: 'CATARINA', regiao: 'SUL', tipo: 'FRANQUIAS', base: 14350, novo: 254452 },
  // Unidades complementares para filtro por região/canal
  { nome: 'TOTVS RIO DE JANEIRO', labelLinha1: 'TOTVS RIO DE', labelLinha2: 'JANEIRO', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 19420, novo: 198450 },
  { nome: 'TOTVS MINAS GERAIS', labelLinha1: 'TOTVS MINAS', labelLinha2: 'GERAIS', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 15840, novo: 174210 },
  { nome: 'TOTVS PARANA', labelLinha1: 'TOTVS', labelLinha2: 'PARANA', regiao: 'SUL', tipo: 'FRANQUIAS', base: 16210, novo: 189340 },
  { nome: 'TOTVS RIO GRANDE DO SUL', labelLinha1: 'TOTVS RIO', labelLinha2: 'GRANDE DO SUL', regiao: 'SUL', tipo: 'FILIAIS', base: 14890, novo: 168920 },
  { nome: 'TOTVS NORDESTE RECIFE', labelLinha1: 'TOTVS NE', labelLinha2: 'RECIFE', regiao: 'NORDESTE', tipo: 'FILIAIS', base: 14320, novo: 112450 },
  { nome: 'TOTVS BAHIA', labelLinha1: 'TOTVS', labelLinha2: 'BAHIA', regiao: 'NORDESTE', tipo: 'FRANQUIAS', base: 12180, novo: 96340 },
  { nome: 'TOTVS CEARA', labelLinha1: 'TOTVS', labelLinha2: 'CEARA', regiao: 'NORDESTE', tipo: 'FRANQUIAS', base: 9840, novo: 78920 },
  { nome: 'TOTVS CENTRO-OESTE DF', labelLinha1: 'TOTVS', labelLinha2: 'BRASILIA', regiao: 'CENTRO-OESTE', tipo: 'FILIAIS', base: 11240, novo: 98760 },
  { nome: 'TOTVS GOIAS', labelLinha1: 'TOTVS', labelLinha2: 'GOIAS', regiao: 'CENTRO-OESTE', tipo: 'FRANQUIAS', base: 8420, novo: 74580 },
  { nome: 'TOTVS AMAZONAS', labelLinha1: 'TOTVS', labelLinha2: 'AMAZONAS', regiao: 'NORTE', tipo: 'FRANQUIAS', base: 7850, novo: 54320 },
  { nome: 'TOTVS PARA', labelLinha1: 'TOTVS', labelLinha2: 'PARA', regiao: 'NORTE', tipo: 'FRANQUIAS', base: 5420, novo: 38910 }
];

const CIDADES_ALL = [
  { nome: 'SAO PAULO - SP', l1: 'SAO PAULO -', l2: 'SP', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 47886, novo: 360919 },
  { nome: 'RIO DE JANEIRO - RJ', l1: 'RIO DE', l2: 'JANEIRO - RJ', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 12177, novo: 114880 },
  { nome: 'CURITIBA - PR', l1: 'CURITIBA - PR', l2: '', regiao: 'SUL', tipo: 'FRANQUIAS', base: 6179, novo: 59420 },
  { nome: 'BELO HORIZONTE - MG', l1: 'BELO', l2: 'HORIZONTE - MG', regiao: 'SUDESTE', tipo: 'FILIAIS', base: 5569, novo: 59810 },
  { nome: 'GUARULHOS - SP', l1: 'GUARULHOS -', l2: 'SP', regiao: 'SUDESTE', tipo: 'FRANQUIAS', base: 4870, novo: 41950 },
  { nome: 'BRASILIA - DF', l1: 'BRASILIA - DF', l2: '', regiao: 'CENTRO-OESTE', tipo: 'FILIAIS', base: 4170, novo: 39640 },
  { nome: 'PORTO ALEGRE - RS', l1: 'PORTO', l2: 'ALEGRE - RS', regiao: 'SUL', tipo: 'FILIAIS', base: 3881, novo: 33920 },
  { nome: 'GOIANIA - GO', l1: 'GOIANIA - GO', l2: '', regiao: 'CENTRO-OESTE', tipo: 'FRANQUIAS', base: 3704, novo: 33890 },
  { nome: 'MANAUS - AM', l1: 'MANAUS -', l2: 'AM', regiao: 'NORTE', tipo: 'FRANQUIAS', base: 4357, novo: 32450 },
  { nome: 'FORTALEZA - CE', l1: 'FORTALEZA -', l2: 'CE', regiao: 'NORDESTE', tipo: 'FRANQUIAS', base: 4185, novo: 31890 },
  // Cidades adicionais para enriquecer quando filtrar por região específica
  { nome: 'CAMPINAS - SP', l1: 'CAMPINAS -', l2: 'SP', regiao: 'SUDESTE', tipo: 'FRANQUIAS', base: 4120, novo: 31480 },
  { nome: 'JOINVILLE - SC', l1: 'JOINVILLE -', l2: 'SC', regiao: 'SUL', tipo: 'FRANQUIAS', base: 3420, novo: 29840 },
  { nome: 'FLORIANOPOLIS - SC', l1: 'FLORIANOPOLIS', l2: '- SC', regiao: 'SUL', tipo: 'FRANQUIAS', base: 2980, novo: 26410 },
  { nome: 'RECIFE - PE', l1: 'RECIFE - PE', l2: '', regiao: 'NORDESTE', tipo: 'FILIAIS', base: 3890, novo: 29450 },
  { nome: 'SALVADOR - BA', l1: 'SALVADOR -', l2: 'BA', regiao: 'NORDESTE', tipo: 'FRANQUIAS', base: 3640, novo: 28120 },
  { nome: 'BELEM - PA', l1: 'BELEM - PA', l2: '', regiao: 'NORTE', tipo: 'FRANQUIAS', base: 2890, novo: 22410 },
  { nome: 'CUIABA - MT', l1: 'CUIABA - MT', l2: '', regiao: 'CENTRO-OESTE', tipo: 'FRANQUIAS', base: 2650, novo: 21890 }
];

export class MapaOportunidadesRegioes extends LitElement {
  static properties = {
    menuNavegacaoAberto: { type: Boolean },
    avisoGuiaPendente: { type: String },
    mostrarFiltros: { type: Boolean },
    regiaoSelecionada: { type: String },
    regiaoHover: { type: String },
    tipoUnidadeSelecionado: { type: String },
    filtroPerfil: { type: String }
  };

  constructor() {
    super();
    this.menuNavegacaoAberto = false;
    this.avisoGuiaPendente = '';
    this.mostrarFiltros = false;
    this.regiaoSelecionada = 'TODAS';
    this.regiaoHover = null;
    this.tipoUnidadeSelecionado = 'TODOS';
    this.filtroPerfil = 'TODOS';

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

    if (guia.id === 'panorama-regioes') {
      this.avisoGuiaPendente = '';
    } else if (mapRotas[guia.id]) {
      const dest = mapRotas[guia.id];
      if (hasAppParam) {
        const atual = params.get('app');
        const novoPath = atual.replace(/Panorama_regioes|Panorama_unidades|Panorama_regioes_unidades/i, dest.folder);
        window.location.href = `?app=${encodeURIComponent(novoPath)}`;
      } else {
        window.location.href = `?dash=${dest.dash}`;
      }
    }
    this.requestUpdate();
  }

  toggleRegiao(regId) {
    this.regiaoSelecionada = this.regiaoSelecionada === regId ? 'TODAS' : regId;
    this.requestUpdate();
  }

  toggleTipoUnidade(tipoId) {
    this.tipoUnidadeSelecionado = this.tipoUnidadeSelecionado === tipoId ? 'TODOS' : tipoId;
    this.requestUpdate();
  }

  formatInt(val) {
    return Math.round(Number(val) || 0).toLocaleString('pt-BR');
  }

  formatCompact(val) {
    const n = Number(val) || 0;
    if (n >= 1e6) {
      const num = n / 1e6;
      return (Number.isInteger(num) ? num.toString() : num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })) + ' Mi';
    }
    if (n >= 1e3) {
      return Math.round(n / 1e3).toLocaleString('pt-BR') + ' Mil';
    }
    return this.formatInt(n);
  }

  render() {
    // 1. Filtra Top Unidades (Top 5)
    let unidadesFiltradas = UNIDADES_ALL.filter((u) => {
      if (this.regiaoSelecionada !== 'TODAS' && u.regiao !== this.regiaoSelecionada) return false;
      if (this.tipoUnidadeSelecionado !== 'TODOS' && u.tipo !== this.tipoUnidadeSelecionado) return false;
      return true;
    }).map((u) => {
      const baseExib = this.filtroPerfil === 'NOVO' ? 0 : u.base;
      const novoExib = this.filtroPerfil === 'BASE' ? 0 : u.novo;
      return {
        ...u,
        baseExib,
        novoExib,
        totalExib: baseExib + novoExib
      };
    }).sort((a, b) => b.totalExib - a.totalExib).slice(0, 5);

    const maxUnidadeVal = Math.max(...unidadesFiltradas.map(u => u.totalExib), 1);

    // 2. Filtra Top Cidades (Top 10)
    let cidadesFiltradas = CIDADES_ALL.filter((c) => {
      if (this.regiaoSelecionada !== 'TODAS' && c.regiao !== this.regiaoSelecionada) return false;
      if (this.tipoUnidadeSelecionado !== 'TODOS' && c.tipo !== this.tipoUnidadeSelecionado) return false;
      return true;
    }).map((c) => {
      const baseExib = this.filtroPerfil === 'NOVO' ? 0 : c.base;
      const novoExib = this.filtroPerfil === 'BASE' ? 0 : c.novo;
      return {
        ...c,
        baseExib,
        novoExib,
        totalExib: baseExib + novoExib
      };
    }).sort((a, b) => b.totalExib - a.totalExib).slice(0, 10);

    const maxCidadeVal = Math.max(...cidadesFiltradas.map(c => c.totalExib), 1);

    // 3. Fator de exibição para os cards do mapa quando Filiais ou Franquias estiver selecionado
    const fatorCanal = this.tipoUnidadeSelecionado === 'FILIAIS'
      ? 0.44
      : this.tipoUnidadeSelecionado === 'FRANQUIAS'
        ? 0.56
        : 1;

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

        /* BARRA DE FILTROS */
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
           GRID SUPERIOR: ESQUERDA (FILIAIS/FRANQUIAS + TOP UNIDADES) | DIREITA (MAPA DO BRASIL)
           ========================================================= */
        .upper-split-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        .left-stack-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* 2 CARDS DE CANAL (FILIAIS & FRANQUIAS) */
        .canais-2-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .canal-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 22px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .canal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.09);
          border-color: #94a3b8;
        }

        .canal-card.selected {
          border: 2px solid #0284c7;
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.14);
        }

        .canal-card.dimmed {
          opacity: 0.55;
        }

        .canal-top-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
        }

        .canal-title {
          font-size: 15px;
          font-weight: 900;
          color: #172e4d;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .canal-subtitle {
          font-size: 11.5px;
          font-weight: 700;
          color: #64748b;
        }

        .canal-qtd-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 2px 0;
        }

        .canal-qtd-val {
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .canal-rep-pill {
          font-size: 11px;
          font-weight: 800;
          color: #334155;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 2px 10px;
          border-radius: 999px;
        }

        .canal-metric-row {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 11px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .canal-metric-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #e0f2fe;
          color: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .canal-metric-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .canal-metric-lbl {
          font-size: 11.5px;
          font-weight: 700;
          color: #64748b;
        }

        .canal-metric-val-line {
          display: flex;
          align-items: baseline;
          gap: 7px;
          flex-wrap: wrap;
        }

        .canal-metric-val {
          font-size: 17px;
          font-weight: 900;
          color: #0f172a;
        }

        .canal-metric-rep {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
        }

        /* CARD TOP UNIDADES (QTD) */
        .unidades-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 24px 16px 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .chart-legend-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          padding-top: 10px;
        }

        .leg-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .leg-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
        }

        .unidades-bars-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          align-items: end;
          flex: 1;
          padding-top: 16px;
          border-bottom: 1px solid #cbd5e1;
        }

        .u-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }

        .u-total-lbl {
          font-size: 11.5px;
          font-weight: 800;
          color: #334155;
          margin-bottom: 6px;
          white-space: nowrap;
        }

        .u-bar-track {
          width: 100%;
          max-width: 84px;
          height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .u-bar-stack {
          width: 100%;
          border-radius: 5px 5px 0 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 4px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
        }

        .u-seg-novo {
          width: 100%;
          background: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: height 0.3s ease;
        }

        .u-seg-base {
          width: 100%;
          background: #0ea5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: height 0.3s ease;
        }

        .bar-inner-txt {
          font-size: 10.5px;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
        }

        .u-labels-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          padding-top: 8px;
        }

        .u-x-lbl {
          font-size: 10.5px;
          font-weight: 800;
          color: #475569;
          text-align: center;
          line-height: 1.25;
        }

        /* =========================================================
           CARD DIREITO: MAPA DO BRASIL POR REGIÃO
           ========================================================= */
        .map-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
        }

        .map-status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 28px;
          margin-bottom: 4px;
          gap: 8px;
          flex-wrap: wrap;
        }

        .map-hint {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
        }

        .active-filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #f3e8ff;
          border: 1px solid #d8b4fe;
          color: #6d28d9;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 999px;
          cursor: pointer;
        }

        .brazil-map-stage {
          position: relative;
          width: 100%;
          max-width: 540px;
          aspect-ratio: 560 / 540;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .brazil-svg {
          width: 100%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 8px 18px rgba(15, 23, 42, 0.12));
        }

        .region-poly {
          stroke: #ffffff;
          stroke-width: 2;
          stroke-linejoin: round;
          cursor: pointer;
          transition: fill 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
        }

        .region-poly.dimmed {
          opacity: 0.38;
        }

        .region-poly.selected {
          stroke: #7c3aed;
          stroke-width: 3;
        }

        /* CARDS FLUTUANTES SOBRE AS REGIÕES */
        .region-callout-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(6px);
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          padding: 8px 14px;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.14);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          min-width: 138px;
          z-index: 10;
        }

        .region-callout-card:hover {
          transform: translateY(-2px);
          border-color: #0284c7;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
        }

        .region-callout-card.selected {
          border: 2px solid #7c3aed;
          background: #ffffff;
          box-shadow: 0 8px 22px rgba(124, 58, 237, 0.22);
        }

        .region-callout-card.dimmed {
          opacity: 0.55;
        }

        .rc-title {
          font-size: 11px;
          font-weight: 900;
          color: #172e4d;
          text-align: center;
          letter-spacing: 0.4px;
          margin-bottom: 5px;
          padding-bottom: 4px;
          border-bottom: 1px solid #f1f5f9;
        }

        .rc-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          text-align: center;
        }

        .rc-col {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .rc-lbl-base {
          font-size: 9.5px;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.3px;
        }

        .rc-val-base {
          font-size: 12.5px;
          font-weight: 900;
          color: #0ea5e9;
          white-space: nowrap;
        }

        .rc-lbl-novo {
          font-size: 9.5px;
          font-weight: 800;
          color: #6d28d9;
          letter-spacing: 0.3px;
        }

        .rc-val-novo {
          font-size: 12.5px;
          font-weight: 900;
          color: #7c3aed;
          white-space: nowrap;
        }

        /* =========================================================
           BLOCO INFERIOR: OPORTUNIDADES POR CIDADE (QTD)
           ========================================================= */
        .cidades-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 20px 24px 16px 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
        }

        .cidades-bars-grid {
          display: grid;
          grid-template-columns: repeat(10, minmax(72px, 1fr));
          gap: 12px;
          align-items: end;
          padding-top: 16px;
          border-bottom: 1px solid #cbd5e1;
          overflow-x: auto;
        }

        .c-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }

        .c-total-lbl {
          font-size: 11.5px;
          font-weight: 800;
          color: #334155;
          margin-bottom: 6px;
          white-space: nowrap;
        }

        .c-bar-track {
          width: 100%;
          max-width: 82px;
          height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .c-bar-stack {
          width: 100%;
          border-radius: 5px 5px 0 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 4px;
        }

        .cidades-labels-grid {
          display: grid;
          grid-template-columns: repeat(10, minmax(72px, 1fr));
          gap: 12px;
          padding-top: 8px;
          overflow-x: auto;
        }

        .c-x-lbl {
          font-size: 10.5px;
          font-weight: 800;
          color: #475569;
          text-align: center;
          line-height: 1.25;
        }

        @media (max-width: 1240px) {
          .upper-split-grid {
            grid-template-columns: 1fr;
          }
          .hero-actions {
            margin-right: 0;
          }
        }

        @media (max-width: 720px) {
          .canais-2-grid {
            grid-template-columns: 1fr;
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
            <div class="title-sub">Panorama de Regiões e Unidades</div>
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
                      class="nav-option-btn ${g.id === 'panorama-regioes' ? 'active' : ''}"
                      @click="${() => this.selecionarGuia(g)}">
                      <span class="nav-opt-dot"></span>
                      <div class="nav-opt-text">
                        <div class="nav-opt-title">
                          <span>${g.titulo}</span>
                          ${g.id === 'panorama-regioes' ? html`<span class="badge-atual">Atual</span>` : ''}
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
              <span>Região:</span>
              <select class="filter-select" .value="${this.regiaoSelecionada}" @change="${(e) => { this.regiaoSelecionada = e.target.value; this.requestUpdate(); }}">
                <option value="TODAS">Todas as Regiões</option>
                ${REGIOES_BRASIL.map(r => html`<option value="${r.id}">${r.nome}</option>`)}
              </select>
            </div>
            <div class="filter-item">
              <span>Tipo de Unidade:</span>
              <select class="filter-select" .value="${this.tipoUnidadeSelecionado}" @change="${(e) => { this.tipoUnidadeSelecionado = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Filiais + Franquias</option>
                <option value="FILIAIS">Somente Filiais</option>
                <option value="FRANQUIAS">Somente Franquias</option>
              </select>
            </div>
            <div class="filter-item">
              <span>Perfil:</span>
              <select class="filter-select" .value="${this.filtroPerfil}" @change="${(e) => { this.filtroPerfil = e.target.value; this.requestUpdate(); }}">
                <option value="TODOS">Base + Novo</option>
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

        <!-- BLOCO SUPERIOR: ESQUERDA (FILIAIS/FRANQUIAS + TOP UNIDADES) | DIREITA (MAPA DO BRASIL) -->
        <div class="upper-split-grid">

          <!-- COLUNA ESQUERDA -->
          <div class="left-stack-col">
            <!-- 2 CARDS: FILIAIS E FRANQUIAS -->
            <div class="canais-2-grid">
              ${CANAIS_CARDS.map((canal) => {
                const isSelected = this.tipoUnidadeSelecionado === canal.id;
                const isDimmed = this.tipoUnidadeSelecionado !== 'TODOS' && !isSelected;

                return html`
                  <div
                    class="canal-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
                    @click="${() => this.toggleTipoUnidade(canal.id)}"
                    title="Clique para filtrar por ${canal.titulo}">
                    <div class="canal-top-box">
                      <div class="canal-title">${canal.titulo}</div>
                      <div class="canal-subtitle">Quantidade</div>
                      <div class="canal-qtd-row">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span class="canal-qtd-val">${canal.qtd}</span>
                      </div>
                      <span class="canal-rep-pill">(${canal.qtdRep})</span>
                    </div>

                    <div class="canal-metric-row">
                      <div class="canal-metric-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <polyline points="1 20 1 14 7 14"></polyline>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                      </div>
                      <div class="canal-metric-info">
                        <span class="canal-metric-lbl">Recorrente (R$)</span>
                        <div class="canal-metric-val-line">
                          <span class="canal-metric-val">${canal.rec}</span>
                          <span class="canal-metric-rep">(${canal.recRep})</span>
                        </div>
                      </div>
                    </div>

                    <div class="canal-metric-row">
                      <div class="canal-metric-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div class="canal-metric-info">
                        <span class="canal-metric-lbl">Não Recorrente (R$)</span>
                        <div class="canal-metric-val-line">
                          <span class="canal-metric-val">${canal.nrec}</span>
                          <span class="canal-metric-rep">(${canal.nrecRep})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>

            <!-- CARD TOP UNIDADES (QTD) -->
            <div class="unidades-card">
              <div class="section-header" style="margin-bottom: 6px;">
                <h2 class="section-title-pill">TOP UNIDADES (QTD)</h2>
                <div class="section-header-line"></div>
              </div>

              <div class="unidades-bars-grid">
                ${unidadesFiltradas.map((un) => {
                  const hTotalPct = (un.totalExib / maxUnidadeVal) * 100;
                  const hNovoPct = un.totalExib > 0 ? (un.novoExib / un.totalExib) * 100 : 0;
                  const hBasePct = un.totalExib > 0 ? (un.baseExib / un.totalExib) * 100 : 0;

                  return html`
                    <div class="u-col" title="${un.nome}: ${this.formatInt(un.totalExib)} (Base: ${this.formatInt(un.baseExib)} | Novo: ${this.formatInt(un.novoExib)})">
                      <div class="u-total-lbl">${this.formatInt(un.totalExib)}</div>
                      <div class="u-bar-track">
                        <div class="u-bar-stack" style="height: ${Math.max(hTotalPct, 4).toFixed(2)}%;">
                          ${un.novoExib > 0 ? html`
                            <div class="u-seg-novo" style="height: ${hNovoPct.toFixed(2)}%;">
                              ${hTotalPct >= 22 && hNovoPct >= 30 ? html`<span class="bar-inner-txt">${this.formatInt(un.novoExib)}</span>` : ''}
                            </div>
                          ` : ''}
                          ${un.baseExib > 0 ? html`
                            <div class="u-seg-base" style="height: ${hBasePct.toFixed(2)}%;">
                              ${hTotalPct >= 55 && hBasePct >= 11 ? html`<span class="bar-inner-txt">${this.formatInt(un.baseExib)}</span>` : ''}
                            </div>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  `;
                })}
              </div>

              <div class="u-labels-grid">
                ${unidadesFiltradas.map((un) => html`
                  <div class="u-x-lbl">
                    <div>${un.labelLinha1}</div>
                    ${un.labelLinha2 ? html`<div>${un.labelLinha2}</div>` : ''}
                  </div>
                `)}
              </div>

              <div class="chart-legend-row">
                <span class="leg-item"><span class="leg-dot" style="background: #0ea5e9;"></span>BASE</span>
                <span class="leg-item"><span class="leg-dot" style="background: #7c3aed;"></span>NOVO</span>
              </div>
            </div>
          </div>

          <!-- COLUNA DIREITA: MAPA DO BRASIL POR REGIÃO -->
          <div class="map-card">
            <div class="section-header" style="margin-bottom: 6px;">
              <h2 class="section-title-pill">OPORTUNIDADES POR REGIÃO (QTD)</h2>
              <div class="section-header-line"></div>
            </div>

            <div class="map-status-bar">
              <span class="map-hint">Clique em uma região para filtrar unidades e cidades</span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${this.regiaoSelecionada !== 'TODAS' ? html`
                  <button
                    type="button"
                    class="active-filter-chip"
                    @click="${() => { this.regiaoSelecionada = 'TODAS'; this.requestUpdate(); }}">
                    <span>Região: ${this.regiaoSelecionada}</span>
                    <span>✕</span>
                  </button>
                ` : ''}
                ${this.tipoUnidadeSelecionado !== 'TODOS' ? html`
                  <button
                    type="button"
                    class="active-filter-chip"
                    @click="${() => { this.tipoUnidadeSelecionado = 'TODOS'; this.requestUpdate(); }}">
                    <span>Canal: ${this.tipoUnidadeSelecionado}</span>
                    <span>✕</span>
                  </button>
                ` : ''}
              </div>
            </div>

            <div class="brazil-map-stage">
              <svg class="brazil-svg" viewBox="0 0 560 540">
                ${REGIOES_BRASIL.map((reg) => {
                  const isSelected = this.regiaoSelecionada === reg.id;
                  const isHovered = this.regiaoHover === reg.id;
                  const isDimmed = this.regiaoSelecionada !== 'TODAS' && !isSelected;

                  return svg`
                    <path
                      d="${reg.path}"
                      class="region-poly ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
                      fill="${isHovered || isSelected ? reg.fillHover : reg.fill}"
                      @mouseenter="${() => { this.regiaoHover = reg.id; this.requestUpdate(); }}"
                      @mouseleave="${() => { this.regiaoHover = null; this.requestUpdate(); }}"
                      @click="${() => this.toggleRegiao(reg.id)}"
                    />
                  `;
                })}
              </svg>

              <!-- CARDS FLUTUANTES SOBRE AS 5 REGIÕES -->
              ${REGIOES_BRASIL.map((reg) => {
                const isSelected = this.regiaoSelecionada === reg.id;
                const isDimmed = this.regiaoSelecionada !== 'TODAS' && !isSelected;
                const baseDisp = fatorCanal === 1 ? reg.baseFmt : this.formatCompact(reg.baseNum * fatorCanal);
                const novoDisp = fatorCanal === 1 ? reg.novoFmt : this.formatCompact(reg.novoNum * fatorCanal);

                return html`
                  <div
                    class="region-callout-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
                    style="left: ${reg.cardLeft}; top: ${reg.cardTop};"
                    @mouseenter="${() => { this.regiaoHover = reg.id; this.requestUpdate(); }}"
                    @mouseleave="${() => { this.regiaoHover = null; this.requestUpdate(); }}"
                    @click="${() => this.toggleRegiao(reg.id)}"
                    title="Filtrar pela região ${reg.nome}">
                    <div class="rc-title">${reg.nome}</div>
                    <div class="rc-metrics">
                      <div class="rc-col">
                        <span class="rc-lbl-base">BASE</span>
                        <span class="rc-val-base">${baseDisp}</span>
                      </div>
                      <div class="rc-col">
                        <span class="rc-lbl-novo">NOVO</span>
                        <span class="rc-val-novo">${novoDisp}</span>
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>

        </div>

        <!-- BLOCO INFERIOR: OPORTUNIDADES POR CIDADE (QTD) -->
        <div class="cidades-card">
          <div class="section-header" style="margin-bottom: 6px;">
            <h2 class="section-title-pill">OPORTUNIDADES POR CIDADE (QTD)</h2>
            <div class="section-header-line"></div>
          </div>

          <div class="cidades-bars-grid">
            ${cidadesFiltradas.map((cid) => {
              const hTotalPct = (cid.totalExib / maxCidadeVal) * 100;
              const hNovoPct = cid.totalExib > 0 ? (cid.novoExib / cid.totalExib) * 100 : 0;
              const hBasePct = cid.totalExib > 0 ? (cid.baseExib / cid.totalExib) * 100 : 0;

              return html`
                <div class="c-col" title="${cid.nome}: ${this.formatInt(cid.totalExib)} (Base: ${this.formatInt(cid.baseExib)} | Novo: ${this.formatInt(cid.novoExib)})">
                  <div class="c-total-lbl">${this.formatInt(cid.totalExib)}</div>
                  <div class="c-bar-track">
                    <div class="c-bar-stack" style="height: ${Math.max(hTotalPct, 4).toFixed(2)}%;">
                      ${cid.novoExib > 0 ? html`
                        <div class="u-seg-novo" style="height: ${hNovoPct.toFixed(2)}%;">
                          ${hTotalPct >= 24 && hNovoPct >= 35 ? html`<span class="bar-inner-txt">${this.formatInt(cid.novoExib)}</span>` : ''}
                        </div>
                      ` : ''}
                      ${cid.baseExib > 0 ? html`
                        <div class="u-seg-base" style="height: ${hBasePct.toFixed(2)}%;">
                          ${hTotalPct >= 65 && hBasePct >= 10 ? html`<span class="bar-inner-txt">${this.formatInt(cid.baseExib)}</span>` : ''}
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `;
            })}
          </div>

          <div class="cidades-labels-grid">
            ${cidadesFiltradas.map((cid) => html`
              <div class="c-x-lbl">
                <div>${cid.l1}</div>
                ${cid.l2 ? html`<div>${cid.l2}</div>` : ''}
              </div>
            `)}
          </div>

          <div class="chart-legend-row">
            <span class="leg-item"><span class="leg-dot" style="background: #0ea5e9;"></span>BASE</span>
            <span class="leg-item"><span class="leg-dot" style="background: #7c3aed;"></span>NOVO</span>
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define(elementName, MapaOportunidadesRegioes);
