import { Benefit, BeneficiaryCategory, User, BenefitAssociation } from './types';

export const mockCategories: BeneficiaryCategory[] = [
  { id: 'cat1', nome: 'Alunos Ensino Fundamental', descricao: 'Estudantes matriculados do 1º ao 9º ano da rede pública.' },
  { id: 'cat2', nome: 'Colaboradores CLT', descricao: 'Funcionários com contrato de trabalho regido pela CLT.' },
  { id: 'cat3', nome: 'Famílias de Baixa Renda', descricao: 'Famílias cadastradas no CadÚnico com renda per capita até meio salário mínimo.' },
  { id: 'cat4', nome: 'Alunos Ensino Médio', descricao: 'Estudantes matriculados do 1º ao 3º ano do ensino médio.' },
  { id: 'cat5', nome: 'Servidores Públicos', descricao: 'Funcionários estatutários e comissionados do município.' },
];

export const mockBenefits: Benefit[] = [
  {
    id: 'ben1',
    idBeneficio: 'BEN-001',
    nome: 'Auxílio Alimentação Corporativo',
    categoria: 'Corporativo',
    periodicidade: 'Mensal',
    valorBase: 650.00,
    regrasElegibilidade: 'Colaboradores ativos com jornada superior a 20h semanais.',
    obrigatoriedade: true,
    status: 'Ativo',
    fonteLegal: 'Acordo Coletivo 2024 / Lei 12.345',
    tipoConcessao: 'Crédito'
  },
  {
    id: 'ben2',
    idBeneficio: 'EDU-MAC-01',
    nome: 'Educa Mais Macaé - Kit Escolar Completo',
    categoria: 'Educação',
    periodicidade: 'Anual',
    valorBase: 125.50,
    regrasElegibilidade: 'Alunos da rede pública municipal de Macaé devidamente matriculados.',
    obrigatoriedade: false,
    status: 'Ativo',
    fonteLegal: 'Lei Municipal 4.567/2023',
    tipoConcessao: 'Lista de Itens',
    detalhesItens: [
      {
        id: 'list1',
        nomeLista: 'Kit Básico 1º ao 5º Ano',
        descricao: 'Materiais essenciais para o início do ano letivo.',
        itens: [
          { id: 'item1', nome: 'Caderno 10 Matérias', quantidade: 2, valorUnitario: 15.50, valorTotal: 31.00 },
          { id: 'item2', nome: 'Lápis de Cor (12 cores)', quantidade: 1, valorUnitario: 12.00, valorTotal: 12.00 },
          { id: 'item3', nome: 'Caneta Azul/Preta', quantidade: 5, valorUnitario: 2.50, valorTotal: 12.50 }
        ],
        valorTotalLista: 55.50
      },
      {
        id: 'list2',
        nomeLista: 'Kit de Artes',
        descricao: 'Materiais para aulas de artes e desenho.',
        itens: [
          { id: 'item4', nome: 'Bloco de Desenho A3', quantidade: 1, valorUnitario: 25.00, valorTotal: 25.00 },
          { id: 'item5', nome: 'Tinta Guache (6 cores)', quantidade: 1, valorUnitario: 18.00, valorTotal: 18.00 },
          { id: 'item6', nome: 'Pincéis Sortidos', quantidade: 3, valorUnitario: 9.00, valorTotal: 27.00 }
        ],
        valorTotalLista: 70.00
      }
    ],
    regraExclusividade: 'Não acumulativo com outros kits escolares no mesmo ano letivo.'
  },
  {
    id: 'ben3',
    idBeneficio: 'SOC-002',
    nome: 'Bolsa Família Municipal',
    categoria: 'Social',
    periodicidade: 'Mensal',
    valorBase: 300.00,
    regrasElegibilidade: 'Famílias em situação de extrema pobreza cadastradas no CadÚnico.',
    obrigatoriedade: true,
    status: 'Ativo',
    fonteLegal: 'Decreto Municipal 123/2022',
    tipoConcessao: 'Valor Fixo'
  },
  {
    id: 'ben4',
    idBeneficio: 'SAU-005',
    nome: 'Auxílio Medicamentos Crônicos',
    categoria: 'Saúde',
    periodicidade: 'Mensal',
    valorBase: 150.00,
    regrasElegibilidade: 'Pacientes com doenças crônicas comprovadas por laudo médico.',
    obrigatoriedade: false,
    status: 'Inativo',
    fonteLegal: 'Portaria SMS 045/2023',
    tipoConcessao: 'Crédito'
  }
];

export const mockUsers: User[] = [
  { id: 'u1', nome: 'João Silva Santos', email: 'joao.silva@email.com', cpf: '123.456.789-00', categoriasIds: ['cat1', 'cat3'] },
  { id: 'u2', nome: 'Maria Oliveira Souza', email: 'maria.o@email.com', cpf: '987.654.321-11', categoriasIds: ['cat2', 'cat5'] },
  { id: 'u3', nome: 'Carlos Eduardo Santos', email: 'carlos.s@email.com', cpf: '456.789.123-22', categoriasIds: ['cat3', 'cat4'] },
  { id: 'u4', nome: 'Ana Beatriz Costa', email: 'ana.c@email.com', cpf: '321.654.987-33', categoriasIds: ['cat1'] },
  { id: 'u5', nome: 'Ricardo Pereira Lima', email: 'ricardo.p@email.com', cpf: '159.753.456-44', categoriasIds: ['cat2'] },
];

export const mockAssociations: BenefitAssociation[] = [
  { benefitId: 'ben1', categoryId: 'cat2' },
  { benefitId: 'ben1', categoryId: 'cat5' },
  { benefitId: 'ben2', categoryId: 'cat1' },
  { benefitId: 'ben2', categoryId: 'cat4' },
  { benefitId: 'ben3', categoryId: 'cat3' },
];
