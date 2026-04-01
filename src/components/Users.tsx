import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus,
  UserCircle, 
  Mail, 
  CreditCard, 
  Tag, 
  ChevronRight,
  Filter,
  AlertCircle,
  MoreVertical,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { mockUsers, mockCategories } from '../mockData';
import { cn } from '../lib/utils';

export function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | 'Todos'>('Todos');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(u => {
      const matchesSearch = u.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.cpf.includes(searchTerm);
      const matchesCategory = categoryFilter === 'Todos' || u.categoriasIds.includes(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Gestão de Usuários</h1>
          <p className="text-neutral-500 mt-1">Consulte a base de beneficiários e suas associações de grupo.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1A1C1E] text-white font-bold hover:bg-neutral-800 transition-all shadow-xl">
          <Plus size={20} className="hidden" /> {/* Hidden for now as per basic requirements */}
          Exportar Base
          <ExternalLink size={18} />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-wrap items-center gap-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, email ou CPF..." 
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
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-neutral-50 border-none rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="Todos">Todas Categorias</option>
            {mockCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-lg shadow-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {user.nome.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 truncate max-w-[180px] tracking-tight">{user.nome}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold mt-1">
                    <ShieldCheck size={14} />
                    Verificado
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-neutral-100 rounded-xl text-neutral-400 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="p-2 bg-white rounded-xl text-neutral-400">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-medium text-neutral-600 truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="p-2 bg-white rounded-xl text-neutral-400">
                  <CreditCard size={16} />
                </div>
                <span className="text-sm font-bold text-neutral-900">{user.cpf}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Tag size={12} />
                Categorias de Beneficiário
              </p>
              <div className="flex flex-wrap gap-2">
                {user.categoriasIds.map(catId => {
                  const category = mockCategories.find(c => c.id === catId);
                  return (
                    <span key={catId} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                      {category?.nome}
                    </span>
                  );
                })}
                {user.categoriasIds.length === 0 && (
                  <span className="text-xs text-neutral-400 italic">Nenhuma categoria associada</span>
                )}
              </div>
            </div>

            <div className="mt-8 pt-2">
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-100 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                Visualizar Dossiê Completo
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <div className="flex flex-col items-center gap-4 text-neutral-400">
              <div className="p-6 bg-neutral-50 rounded-full">
                <AlertCircle size={48} strokeWidth={1} />
              </div>
              <div>
                <p className="text-lg font-bold text-neutral-900">Nenhum usuário encontrado</p>
                <p className="text-sm">Tente ajustar seus termos de busca ou filtros.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
