import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronLeft,
  Users as UsersIcon,
  AlertCircle,
  MoreVertical,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { BeneficiaryCategory } from '../types';
import { mockCategories } from '../mockData';
import { cn } from '../lib/utils';

export function Categories() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [categories, setCategories] = useState<BeneficiaryCategory[]>(mockCategories);
  const [editingCategory, setEditingCategory] = useState<BeneficiaryCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<BeneficiaryCategory>>({
    nome: '',
    descricao: ''
  });

  const filteredCategories = useMemo(() => {
    return categories.filter(c => 
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const handleEdit = (category: BeneficiaryCategory) => {
    setEditingCategory(category);
    setFormData(category);
    setView('form');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({ nome: '', descricao: '' });
    setView('form');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('O nome da categoria é obrigatório.');
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } as BeneficiaryCategory : c));
    } else {
      const newCategory: BeneficiaryCategory = {
        id: Math.random().toString(36).substr(2, 9),
        nome: formData.nome || '',
        descricao: formData.descricao || ''
      };
      setCategories([newCategory, ...categories]);
    }
    setView('list');
  };

  if (view === 'form') {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('list')}
              className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-500 hover:text-neutral-900 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              <p className="text-sm text-neutral-500">Defina os critérios e descrição para este grupo.</p>
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
              {editingCategory ? 'Salvar Alterações' : 'Criar Categoria'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nome da Categoria *</label>
              <input 
                type="text" 
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Alunos Ensino Fundamental"
                className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Descrição Detalhada</label>
              <textarea 
                rows={6}
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descreva quem faz parte desta categoria e quais os critérios de inclusão..."
                className="w-full px-5 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium"
              />
            </div>
          </div>
          <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Info size={18} />
            </div>
            <p className="text-xs text-neutral-500 font-medium">As categorias são usadas para organizar usuários e facilitar a distribuição em massa de benefícios específicos.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Categorias de Beneficiários</h1>
          <p className="text-neutral-500 mt-1">Organize os usuários em grupos lógicos para gestão eficiente.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          <Plus size={20} />
          Nova Categoria
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input 
            type="text" 
            placeholder="Pesquisar categorias..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-50 group-hover:shadow-blue-200">
                  <UsersIcon size={28} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button 
                    onClick={() => handleEdit(category)}
                    className="p-2.5 hover:bg-blue-50 text-neutral-400 hover:text-blue-600 rounded-xl transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="p-2.5 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-xl text-neutral-900 mb-3 tracking-tight">{category.nome}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-6">{category.descricao}</p>
            </div>

            <div className="relative z-10 mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Usuários</span>
                <span className="text-sm font-bold text-blue-600">--</span>
              </div>
              <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-xl transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <div className="flex flex-col items-center gap-4 text-neutral-400">
              <div className="p-6 bg-neutral-50 rounded-full">
                <AlertCircle size={48} strokeWidth={1} />
              </div>
              <div>
                <p className="text-lg font-bold text-neutral-900">Nenhuma categoria encontrada</p>
                <p className="text-sm">Tente ajustar seus termos de busca.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
