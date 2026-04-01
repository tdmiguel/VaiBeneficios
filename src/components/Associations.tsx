import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Plus, 
  X, 
  Gift, 
  Users, 
  ChevronRight,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  ArrowRight
} from 'lucide-react';
import { Benefit, BeneficiaryCategory, BenefitAssociation } from '../types';
import { mockBenefits, mockCategories, mockAssociations } from '../mockData';
import { cn } from '../lib/utils';

export function Associations() {
  const [associations, setAssociations] = useState<BenefitAssociation[]>(mockAssociations);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BeneficiaryCategory | null>(null);
  const [mode, setMode] = useState<'benefit-to-category' | 'category-to-benefit'>('benefit-to-category');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddAssociation = (benefitId: string, categoryId: string) => {
    const exists = associations.some(a => a.benefitId === benefitId && a.categoryId === categoryId);
    if (!exists) {
      setAssociations([...associations, { benefitId, categoryId }]);
    }
  };

  const handleRemoveAssociation = (benefitId: string, categoryId: string) => {
    setAssociations(associations.filter(a => !(a.benefitId === benefitId && a.categoryId === categoryId)));
  };

  const filteredBenefits = mockBenefits.filter(b => b.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCategories = mockCategories.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Associação de Benefícios</h1>
          <p className="text-neutral-500 mt-1">Vincule benefícios a grupos de usuários de forma intuitiva.</p>
        </div>
        <div className="flex p-1.5 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <button 
            onClick={() => { setMode('benefit-to-category'); setSelectedBenefit(null); setSelectedCategory(null); }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2", 
              mode === 'benefit-to-category' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-neutral-500 hover:bg-neutral-50"
            )}
          >
            <Gift size={16} />
            Por Benefício
          </button>
          <button 
            onClick={() => { setMode('category-to-benefit'); setSelectedBenefit(null); setSelectedCategory(null); }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2", 
              mode === 'category-to-benefit' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-neutral-500 hover:bg-neutral-50"
            )}
          >
            <Users size={16} />
            Por Categoria
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-280px)]">
        {/* Left Panel: Selection List */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-neutral-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder={mode === 'benefit-to-category' ? "Buscar benefício..." : "Buscar categoria..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
            {mode === 'benefit-to-category' ? (
              filteredBenefits.map(benefit => (
                <button
                  key={benefit.id}
                  onClick={() => setSelectedBenefit(benefit)}
                  className={cn(
                    "w-full p-6 text-left flex items-center justify-between group transition-all relative",
                    selectedBenefit?.id === benefit.id ? "bg-blue-50/50" : "hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-2xl transition-all", 
                      selectedBenefit?.id === benefit.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-neutral-100 text-neutral-400 group-hover:bg-white group-hover:text-neutral-600"
                    )}>
                      <Gift size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{benefit.nome}</p>
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">{benefit.idBeneficio}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className={cn("transition-all", selectedBenefit?.id === benefit.id ? "text-blue-600 translate-x-1" : "text-neutral-300")} />
                  {selectedBenefit?.id === benefit.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-blue-600 rounded-r-full" />
                  )}
                </button>
              ))
            ) : (
              filteredCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "w-full p-6 text-left flex items-center justify-between group transition-all relative",
                    selectedCategory?.id === category.id ? "bg-blue-50/50" : "hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-2xl transition-all", 
                      selectedCategory?.id === category.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-neutral-100 text-neutral-400 group-hover:bg-white group-hover:text-neutral-600"
                    )}>
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{category.nome}</p>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">Categoria</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className={cn("transition-all", selectedCategory?.id === category.id ? "text-blue-600 translate-x-1" : "text-neutral-300")} />
                  {selectedCategory?.id === category.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-blue-600 rounded-r-full" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Association Management */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden relative">
          {(!selectedBenefit && mode === 'benefit-to-category') || (!selectedCategory && mode === 'category-to-benefit') ? (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-neutral-50 flex items-center justify-center mb-8 border border-neutral-100">
                <ArrowRightLeft size={48} strokeWidth={1} className="text-neutral-300" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Selecione para configurar</h3>
              <p className="max-w-xs text-sm leading-relaxed">Escolha um {mode === 'benefit-to-category' ? 'benefício' : 'categoria'} na lista ao lado para gerenciar suas associações.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-8 border-b border-neutral-100 bg-neutral-50/30">
                <div className="flex items-center gap-6">
                  <div className="p-5 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-100">
                    {mode === 'benefit-to-category' ? <Gift size={40} /> : <Users size={40} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                        {mode === 'benefit-to-category' ? 'Benefício Selecionado' : 'Categoria Selecionada'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                      {mode === 'benefit-to-category' ? selectedBenefit?.nome : selectedCategory?.nome}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-10 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Current Associations */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Vínculos Ativos</h3>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {mode === 'benefit-to-category' 
                          ? associations.filter(a => a.benefitId === selectedBenefit?.id).length 
                          : associations.filter(a => a.categoryId === selectedCategory?.id).length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {mode === 'benefit-to-category' ? (
                        associations.filter(a => a.benefitId === selectedBenefit?.id).length > 0 ? (
                          associations.filter(a => a.benefitId === selectedBenefit?.id).map(a => {
                            const category = mockCategories.find(c => c.id === a.categoryId);
                            return (
                              <div key={a.categoryId} className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100 group hover:bg-blue-50 transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                                    <CheckCircle2 size={14} />
                                  </div>
                                  <span className="text-sm font-bold text-blue-900">{category?.nome}</span>
                                </div>
                                <button 
                                  onClick={() => handleRemoveAssociation(selectedBenefit!.id, a.categoryId)}
                                  className="p-2 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-12 border-2 border-dashed border-neutral-100 rounded-3xl text-center">
                            <p className="text-sm text-neutral-400 font-medium italic">Nenhuma categoria vinculada.</p>
                          </div>
                        )
                      ) : (
                        associations.filter(a => a.categoryId === selectedCategory?.id).length > 0 ? (
                          associations.filter(a => a.categoryId === selectedCategory?.id).map(a => {
                            const benefit = mockBenefits.find(b => b.id === a.benefitId);
                            return (
                              <div key={a.benefitId} className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100 group hover:bg-blue-50 transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                                    <CheckCircle2 size={14} />
                                  </div>
                                  <span className="text-sm font-bold text-blue-900">{benefit?.nome}</span>
                                </div>
                                <button 
                                  onClick={() => handleRemoveAssociation(a.benefitId, selectedCategory!.id)}
                                  className="p-2 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-12 border-2 border-dashed border-neutral-100 rounded-3xl text-center">
                            <p className="text-sm text-neutral-400 font-medium italic">Nenhum benefício vinculado.</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Available to Add */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Disponíveis para Vincular</h3>
                    <div className="space-y-3">
                      {mode === 'benefit-to-category' ? (
                        mockCategories
                          .filter(c => !associations.some(a => a.benefitId === selectedBenefit?.id && a.categoryId === c.id))
                          .map(category => (
                            <button
                              key={category.id}
                              onClick={() => handleAddAssociation(selectedBenefit!.id, category.id)}
                              className="w-full flex items-center justify-between p-4 border border-neutral-100 hover:border-blue-300 hover:bg-blue-50/30 rounded-2xl transition-all group"
                            >
                              <span className="text-sm font-bold text-neutral-700 group-hover:text-blue-600 transition-colors">{category.nome}</span>
                              <div className="p-2 bg-neutral-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Plus size={18} />
                              </div>
                            </button>
                          ))
                      ) : (
                        mockBenefits
                          .filter(b => !associations.some(a => a.categoryId === selectedCategory?.id && a.benefitId === b.id))
                          .map(benefit => (
                            <button
                              key={benefit.id}
                              onClick={() => handleAddAssociation(benefit.id, selectedCategory!.id)}
                              className="w-full flex items-center justify-between p-4 border border-neutral-100 hover:border-blue-300 hover:bg-blue-50/30 rounded-2xl transition-all group"
                            >
                              <span className="text-sm font-bold text-neutral-700 group-hover:text-blue-600 transition-colors">{benefit.nome}</span>
                              <div className="p-2 bg-neutral-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Plus size={18} />
                              </div>
                            </button>
                          ))
                      )}
                      {((mode === 'benefit-to-category' && mockCategories.filter(c => !associations.some(a => a.benefitId === selectedBenefit?.id && a.categoryId === c.id)).length === 0) ||
                        (mode === 'category-to-benefit' && mockBenefits.filter(b => !associations.some(a => a.categoryId === selectedCategory?.id && a.benefitId === b.id)).length === 0)) && (
                        <div className="p-8 text-center">
                          <p className="text-xs text-neutral-400 font-medium">Todos os itens já estão vinculados.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
