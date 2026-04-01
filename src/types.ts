export type BenefitCategory = 'Social' | 'Corporativo' | 'Educação' | 'Saúde' | 'Outros';
export type Periodicity = 'Mensal' | 'Trimestral' | 'Semestral' | 'Anual' | 'Único';
export type ConcessionType = 'Valor Fixo' | 'Crédito' | 'Lista de Itens';
export type Status = 'Ativo' | 'Inativo';

export interface ListItem {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface ItemList {
  id: string;
  nomeLista: string;
  descricao: string;
  itens: ListItem[];
  valorTotalLista: number;
}

export interface Benefit {
  id: string;
  idBeneficio: string;
  nome: string;
  categoria: BenefitCategory;
  periodicidade: Periodicity;
  valorBase: number;
  regrasElegibilidade: string;
  obrigatoriedade: boolean;
  status: Status;
  fonteLegal: string;
  tipoConcessao: ConcessionType;
  detalhesItens?: ItemList[];
  regraExclusividade?: string;
}

export interface BeneficiaryCategory {
  id: string;
  nome: string;
  descricao: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  categoriasIds: string[];
}

export interface BenefitAssociation {
  benefitId: string;
  categoryId: string;
}
