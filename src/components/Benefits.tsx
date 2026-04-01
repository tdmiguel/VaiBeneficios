import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ChevronLeft,
  PlusCircle,
  X,
  Calculator,
  FileText,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  ChevronRight,
  Info,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Benefit, BenefitCategory, Periodicity, ConcessionType, Status, ItemList, ListItem } from '../types';
import { mockBenefits } from '../mockData';
import { cn } from '../lib/utils';

export function Benefits() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [benefits, setBenefits] = useState<Benefit[]>(mockBenefits);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<BenefitCategory | 'Todos'>('Todos');

  // Form State
  const [formData, setFormData] = useState<Partial<Benefit>>({
    idBeneficio: '',
    nome: '',
    categoria: 'Social',
    periodicidade: 'Mensal',
    valorBase: 0,
    regrasElegibilidade: '',
    obrigatoriedade: false,
    status: 'Ativo',
    fonteLegal: '',
    tipoConcessao: 'Valor Fixo',
    detalhesItens: [],
    regraExclusividade: ''
  });

  // Sync valorBase with list total when tipoConcessao is 'Lista de Itens'
  useEffect(() => {
    if (formData.tipoConcessao === 'Lista de Itens' && formData.detalhesItens) {
      const total = formData.detalhesItens.reduce((acc, list) => acc + list.valorTotalLista, 0);
      if (formData.valorBase !== total) {
        setFormData(prev => ({ ...prev, valorBase: total }));
      }
    }
  }, [formData.detalhesItens, formData.tipoConcessao]);

  const filteredBenefits = useMemo(() => {
    return benefits.filter(b => {
      const matchesSearch = b.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.idBeneficio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'Todos' || b.categoria === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [benefits, searchTerm, categoryFilter]);

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    setFormData(benefit);
    setView('form');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este benefício?')) {
      setBenefits(benefits.filter(b => b.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingBenefit(null);
    setFormData({
      idBeneficio: `BEN-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      nome: '',
      categoria: 'Social',
      periodicidade: 'Mensal',
      valorBase: 0,
      regrasElegibilidade: '',
      obrigatoriedade: false,
      status: 'Ativo',
      fonteLegal: '',
      tipoConcessao: 'Valor Fixo',
      detalhesItens: [],
      regraExclusividade: ''
    });
    setView('form');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.idBeneficio) {
      alert('Por favor, preencha os campos obrigatórios (Nome e ID).');
      return;
    }

    if (editingBenefit) {
      setBenefits(benefits.map(b => b.id === editingBenefit.id ? { ...b, ...formData } as Benefit : b));
    } else {
      const newBenefit: Benefit = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Benefit;
      setBenefits([newBenefit, ...benefits]);
    }
    setView('list');
  };

  // Item List Management
  const addList = () => {
    const newList: ItemList = {
      id: Math.random().toString(36).substr(2, 9),
      nomeLista: '',
      descricao: '',
      itens: [],
      valorTotalLista: 0
    };
    setFormData(prev => ({
      ...prev,
      detalhesItens: [...(prev.detalhesItens || []), newList]
    }));
  };

  const removeList = (listId: string) => {
    setFormData(prev => ({
      ...prev,
      detalhesItens: (prev.detalhesItens || []).filter(l => l.id !== listId)
    }));
  };

  const updateList = (listId: string, field: keyof ItemList, value: any) => {
    setFormData(prev => ({
      ...prev,
      detalhesItens: (prev.detalhesItens || []).map(l => 
        l.id === listId ? { ...l, [field]: value } : l
      )
    }));
  };

  const addItemToList = (listId: string) => {
    const newItem: ListItem = {
      id: Math.random().toString(36).substr(2, 9),
      nome: '',
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0
    };
    setFormData(prev => ({
      ...prev,
      detalhesItens: (prev.detalhesItens || []).map(l => {
        if (l.id === listId) {
          return { ...l, itens: [...l.itens, newItem] };
        }
        return l;
      })
    }));
  };

  const updateItemInList = (listId: string, itemId: string, field: keyof ListItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      detalhesItens: (prev.detalhesItens || []).map(l => {
        if (l.id === listId) {
          const newItens = l.itens.map(i => {
            if (i.id === itemId) {
              const updatedItem = { ...i, [field]: value };
              if (field === 'quantidade' || field === 'valorUnitario') {
                updatedItem.valorTotal = updatedItem.quantidade * updatedItem.valorUnitario;
              }
              return updatedItem;
            }
            return i;
          });
          const newTotal = newItens.reduce((acc, curr) => acc + curr.valorTotal, 0);
          return { ...l, itens: newItens, valorTotalLista: newTotal };
        }
        return l;
      })
    }));
  };

  const removeItemFromList = (listId: string, itemId: string) => {
    setFormData(prev => ({
      ...prev,
      detalhesItens: (prev.detalhesItens || []).map(l => {
        if (l.id === listId) {
          const newItens = l.itens.filter(i => i.id !== itemId);
          const newTotal = newItens.reduce((acc, curr) => acc + curr.valorTotal, 0);
          return { ...l, itens: newItens, valorTotalLista: newTotal };
        }
        return l;
      })
    }));
  };

  if (view === 'form') {
    return (
      <div className="space-y-8 max-w-5xl mx-auto pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('list')}
              className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-500 hover:text-neutral-900 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {editingBenefit ? 'Editar Benefício' : 'Novo Benefício'}
              </h2>
              <p className="text-sm text-neutral-500">Configure os parâmetros e regras do benefício.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setView('list')}
              className="px-6 py-3 rounded-2xl border border-neutral-200 bg-white font-bold text-neutral-700 hover:bg-neutral-50 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              {editingBenefit ? 'Salvar Alterações' : 'Criar Benefício'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">ID do Benefício *</label>
                    <input 
                      type="text" 
                      value={formData.idBeneficio}
                      onChange={(e) => setFormData({ ...formData, idBeneficio: e.target.value })}
                      disabled={!!editingBenefit}
                      placeholder="Ex: BEN-001"
                      className={cn(
                        "w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold",
                        editingBenefit ? "bg-neutral-50 text-neutral-400 cursor-not-allowed border-neutral-100" : "bg-white"
                      )}
                    />
                    {editingBenefit && <p className="text-[10px] text-neutral-400 mt-1">O identificador não pode ser alterado após a criação.</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nome Comercial *</label>
                    <input 
                      type="text" 
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Nome do benefício"
                      className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Categoria</label>
                    <select 
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value as BenefitCategory })}
                      className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white font-medium"
                    >
                      <option value="Social">Social</option>
                      <option value="Corporativo">Corporativo</option>
                      <option value="Educação">Educação</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Periodicidade</label>
                    <select 
                      value={formData.periodicidade}
                      onChange={(e) => setFormData({ ...formData, periodicidade: e.target.value as Periodicity })}
                      className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white font-medium"
                    >
                      <option value="Mensal">Mensal</option>
                      <option value="Trimestral">Trimestral</option>
                      <option value="Semestral">Semestral</option>
                      <option value="Anual">Anual</option>
                      <option value="Único">Único</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Regras de Elegibilidade</label>
                  <textarea 
                    rows={4}
                    value={formData.regrasElegibilidade}
                    onChange={(e) => setFormData({ ...formData, regrasElegibilidade: e.target.value })}
                    placeholder="Descreva os critérios para que um usuário tenha direito a este benefício..."
                    className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Fonte Legal</label>
                    <input 
                      type="text" 
                      value={formData.fonteLegal}
                      onChange={(e) => setFormData({ ...formData, fonteLegal: e.target.value })}
                      placeholder="Ex: Lei Municipal 4.567/2023"
                      className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Valor Base (R$)</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">R$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        value={formData.valorBase}
                        onChange={(e) => setFormData({ ...formData, valorBase: Number(e.target.value) })}
                        disabled={formData.tipoConcessao === 'Lista de Itens'}
                        className={cn(
                          "w-full pl-12 pr-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg",
                          formData.tipoConcessao === 'Lista de Itens' ? "bg-blue-50 text-blue-600 border-blue-100 cursor-not-allowed" : "bg-white"
                        )}
                      />
                    </div>
                    {formData.tipoConcessao === 'Lista de Itens' && (
                      <p className="text-[10px] text-blue-500 mt-1 font-bold flex items-center gap-1">
                        <Info size={10} />
                        Calculado automaticamente com base nas listas de itens.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Item List Section */}
            <AnimatePresence>
              {formData.tipoConcessao === 'Lista de Itens' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between px-2">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Listas de Materiais</h3>
                      <p className="text-sm text-neutral-500">Gerencie os itens físicos que compõem este benefício.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={addList}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1A1C1E] text-white text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg"
                    >
                      <Plus size={18} />
                      Nova Lista
                    </button>
                  </div>

                  <div className="space-y-6">
                    {formData.detalhesItens?.map((list, listIdx) => (
                      <div key={list.id} className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 space-y-6 relative group border-l-8 border-l-blue-600">
                        <button 
                          onClick={() => removeList(list.id)}
                          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <X size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nome da Lista</label>
                            <input 
                              type="text" 
                              value={list.nomeLista}
                              onChange={(e) => updateList(list.id, 'nomeLista', e.target.value)}
                              placeholder="Ex: Kit Básico 1º ao 5º Ano"
                              className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Descrição Curta</label>
                            <input 
                              type="text" 
                              value={list.descricao}
                              onChange={(e) => updateList(list.id, 'descricao', e.target.value)}
                              placeholder="Breve resumo da lista"
                              className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            />
                          </div>
                        </div>

                        {/* Items Table */}
                        <div className="bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-neutral-100/50 border-b border-neutral-200">
                              <tr>
                                <th className="px-6 py-4 font-bold text-neutral-600 uppercase tracking-wider text-[10px]">Item</th>
                                <th className="px-6 py-4 font-bold text-neutral-600 uppercase tracking-wider text-[10px] w-24 text-center">Qtd</th>
                                <th className="px-6 py-4 font-bold text-neutral-600 uppercase tracking-wider text-[10px] w-36">V. Unitário</th>
                                <th className="px-6 py-4 font-bold text-neutral-600 uppercase tracking-wider text-[10px] w-36">Total</th>
                                <th className="px-6 py-4 w-12"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                              {list.itens.map((item) => (
                                <tr key={item.id} className="hover:bg-white transition-colors">
                                  <td className="px-6 py-3">
                                    <input 
                                      type="text"
                                      value={item.nome}
                                      onChange={(e) => updateItemInList(list.id, item.id, 'nome', e.target.value)}
                                      className="w-full border-none focus:ring-0 p-0 text-sm font-bold bg-transparent"
                                      placeholder="Nome do item"
                                    />
                                  </td>
                                  <td className="px-6 py-3">
                                    <input 
                                      type="number"
                                      value={item.quantidade}
                                      onChange={(e) => updateItemInList(list.id, item.id, 'quantidade', Number(e.target.value))}
                                      className="w-full border-none focus:ring-0 p-0 text-sm text-center font-bold bg-transparent"
                                    />
                                  </td>
                                  <td className="px-6 py-3">
                                    <div className="flex items-center gap-1">
                                      <span className="text-neutral-400 text-xs font-bold">R$</span>
                                      <input 
                                        type="number"
                                        step="0.01"
                                        value={item.valorUnitario}
                                        onChange={(e) => updateItemInList(list.id, item.id, 'valorUnitario', Number(e.target.value))}
                                        className="w-full border-none focus:ring-0 p-0 text-sm font-bold bg-transparent"
                                      />
                                    </div>
                                  </td>
                                  <td className="px-6 py-3 font-bold text-neutral-900">
                                    R$ {item.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-6 py-3">
                                    <button 
                                      onClick={() => removeItemFromList(list.id, item.id)}
                                      className="text-neutral-300 hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              {list.itens.length === 0 && (
                                <tr>
                                  <td colSpan={5} className="px-6 py-10 text-center text-neutral-400 italic text-sm">
                                    Nenhum item adicionado a esta lista.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot className="bg-white font-bold border-t border-neutral-200">
                              <tr>
                                <td colSpan={3} className="px-6 py-4 text-right text-neutral-400 uppercase tracking-wider text-[10px]">Subtotal da Lista</td>
                                <td className="px-6 py-4 text-blue-600 text-xl tracking-tight">
                                  R$ {list.valorTotalLista.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        <button 
                          type="button"
                          onClick={() => addItemToList(list.id)}
                          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all w-fit"
                        >
                          <PlusCircle size={18} />
                          Adicionar Item à Lista
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 space-y-4">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Regra de Exclusividade</h3>
                    <textarea 
                      rows={2}
                      value={formData.regraExclusividade}
                      onChange={(e) => setFormData({ ...formData, regraExclusividade: e.target.value })}
                      placeholder="Ex: Não acumulativo com outros kits no mesmo ano..."
                      className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Form Area */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 space-y-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Settings size={20} className="text-blue-600" />
                Configurações
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Status do Benefício</label>
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-100 rounded-2xl">
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'Ativo' })}
                      className={cn(
                        "py-2.5 rounded-xl text-sm font-bold transition-all", 
                        formData.status === 'Ativo' ? "bg-white shadow-sm text-green-600" : "text-neutral-500"
                      )}
                    >
                      Ativo
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'Inativo' })}
                      className={cn(
                        "py-2.5 rounded-xl text-sm font-bold transition-all", 
                        formData.status === 'Inativo' ? "bg-white shadow-sm text-red-600" : "text-neutral-500"
                      )}
                    >
                      Inativo
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Obrigatoriedade</label>
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-100 rounded-2xl">
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, obrigatoriedade: true })}
                      className={cn(
                        "py-2.5 rounded-xl text-sm font-bold transition-all", 
                        formData.obrigatoriedade ? "bg-white shadow-sm text-blue-600" : "text-neutral-500"
                      )}
                    >
                      Obrigatório
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, obrigatoriedade: false })}
                      className={cn(
                        "py-2.5 rounded-xl text-sm font-bold transition-all", 
                        !formData.obrigatoriedade ? "bg-white shadow-sm text-blue-600" : "text-neutral-500"
                      )}
                    >
                      Opcional
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 space-y-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Calculator size={20} className="text-blue-600" />
                Tipo de Concessão
              </h3>
              <div className="space-y-3">
                {['Valor Fixo', 'Crédito', 'Lista de Itens'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoConcessao: type as ConcessionType })}
                    className={cn(
                      "w-full p-5 rounded-2xl border-2 transition-all text-left flex items-start justify-between group",
                      formData.tipoConcessao === type 
                        ? "border-blue-600 bg-blue-50/50" 
                        : "border-neutral-100 hover:border-neutral-200"
                    )}
                  >
                    <div>
                      <p className={cn("font-bold", formData.tipoConcessao === type ? "text-blue-600" : "text-neutral-700")}>{type}</p>
                      <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
                        {type === 'Valor Fixo' && 'Pagamento direto em dinheiro para o beneficiário.'}
                        {type === 'Crédito' && 'Crédito em cartão ou conta específica.'}
                        {type === 'Lista de Itens' && 'Entrega física de materiais ou produtos específicos.'}
                      </p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-1",
                      formData.tipoConcessao === type ? "border-blue-600 bg-blue-600" : "border-neutral-200"
                    )}>
                      {formData.tipoConcessao === type && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Gestão de Benefícios</h1>
          <p className="text-neutral-500 mt-1">Visualize e gerencie todos os benefícios cadastrados no sistema.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          <Plus size={20} />
          Novo Benefício
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-wrap items-center gap-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome, ID ou fonte legal..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neutral-50 rounded-2xl text-neutral-400">
            <Filter size={20} />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="bg-neutral-50 border-none rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="Todos">Todas Categorias</option>
            <option value="Social">Social</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Educação">Educação</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Identificação</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Categoria</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Tipo de Concessão</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Valor Base</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredBenefits.map((benefit) => (
                <tr key={benefit.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md w-fit mb-1">{benefit.idBeneficio}</span>
                      <span className="text-sm font-bold text-neutral-900">{benefit.nome}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider",
                      benefit.categoria === 'Educação' ? "bg-purple-50 text-purple-600" :
                      benefit.categoria === 'Social' ? "bg-orange-50 text-orange-600" :
                      benefit.categoria === 'Corporativo' ? "bg-blue-50 text-blue-600" :
                      benefit.categoria === 'Saúde' ? "bg-green-50 text-green-600" :
                      "bg-neutral-100 text-neutral-600"
                    )}>
                      {benefit.categoria}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2.5 text-sm text-neutral-600 font-medium">
                      {benefit.tipoConcessao === 'Lista de Itens' ? <FileText size={16} className="text-blue-500" /> : <Calculator size={16} className="text-neutral-400" />}
                      {benefit.tipoConcessao}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-neutral-900">
                      R$ {benefit.valorBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                      benefit.status === 'Ativo' ? "text-green-600" : "text-red-600"
                    )}>
                      <div className={cn("w-2 h-2 rounded-full", benefit.status === 'Ativo' ? "bg-green-600 animate-pulse" : "bg-red-600")} />
                      {benefit.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleEdit(benefit)}
                        className="p-2.5 hover:bg-blue-50 text-neutral-400 hover:text-blue-600 rounded-xl transition-colors"
                        title="Editar Benefício"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(benefit.id)}
                        className="p-2.5 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-xl transition-colors"
                        title="Excluir Benefício"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2.5 hover:bg-neutral-100 text-neutral-400 rounded-xl transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBenefits.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-neutral-400">
                      <div className="p-6 bg-neutral-50 rounded-full">
                        <AlertCircle size={48} strokeWidth={1} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-neutral-900">Nenhum benefício encontrado</p>
                        <p className="text-sm">Tente ajustar seus filtros ou termos de busca.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between text-sm">
          <p className="text-neutral-500 font-medium">
            Exibindo <span className="text-neutral-900 font-bold">{filteredBenefits.length}</span> de <span className="text-neutral-900 font-bold">{benefits.length}</span> benefícios cadastrados
          </p>
          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-xl border border-neutral-200 bg-white font-bold text-neutral-400 cursor-not-allowed" disabled>Anterior</button>
            <button className="px-5 py-2 rounded-xl border border-neutral-200 bg-white font-bold text-neutral-700 hover:bg-neutral-50 transition-all">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
