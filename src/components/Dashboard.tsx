import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Gift, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockBenefits, mockUsers, mockCategories } from '../mockData';
import { cn } from '../lib/utils';

export function Dashboard() {
  const stats = [
    { label: 'Benefícios Ativos', value: mockBenefits.filter(b => b.status === 'Ativo').length, icon: Gift, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2 este mês', trendUp: true },
    { label: 'Usuários Cadastrados', value: mockUsers.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+12% vs mês anterior', trendUp: true },
    { label: 'Categorias de Beneficiários', value: mockCategories.length, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: 'Estável', trendUp: true },
    { label: 'Solicitações Pendentes', value: 24, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', trend: '-5% vs ontem', trendUp: false },
  ];

  const recentActivities = [
    { id: 1, user: 'Thiago Miguel', action: 'Criou novo benefício', target: 'Educa Mais Macaé', time: 'Há 10 minutos', type: 'create' },
    { id: 2, user: 'Sistema', action: 'Associação automática', target: 'Kit Escolar -> Alunos', time: 'Há 2 horas', type: 'auto' },
    { id: 3, user: 'Ana Paula', action: 'Editou categoria', target: 'Famílias Baixa Renda', time: 'Há 5 horas', type: 'edit' },
    { id: 4, user: 'Thiago Miguel', action: 'Excluiu benefício', target: 'Vale Cultura Antigo', time: 'Ontem', type: 'delete' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Dashboard Administrativo</h1>
          <p className="text-neutral-500 mt-1">Visão geral do sistema de gestão de benefícios.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="p-2 bg-neutral-100 rounded-lg">
            <Calendar size={18} className="text-neutral-500" />
          </div>
          <span className="text-sm font-bold pr-2">1 de Abril, 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
              <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full", stat.trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-4xl font-bold mt-1 text-neutral-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity size={20} className="text-blue-600" />
              </div>
              <h2 className="font-bold text-lg">Atividades Recentes</h2>
            </div>
            <button className="text-sm text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">Ver Histórico</button>
          </div>
          <div className="divide-y divide-neutral-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-5 hover:bg-neutral-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold",
                    activity.type === 'create' ? "bg-green-50 text-green-600" :
                    activity.type === 'delete' ? "bg-red-50 text-red-600" :
                    activity.type === 'edit' ? "bg-blue-50 text-blue-600" : "bg-neutral-100 text-neutral-500"
                  )}>
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-relaxed">
                      <span className="text-neutral-900 font-bold">{activity.user}</span>
                      <span className="text-neutral-500 mx-1.5">{activity.action}</span>
                      <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg">{activity.target}</span>
                    </p>
                    <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1">
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-neutral-200 rounded-xl transition-colors">
                    <ArrowUpRight size={18} className="text-neutral-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Summary & Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 space-y-6">
            <h2 className="font-bold text-lg">Status do Sistema</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold">Servidor Online</span>
                </div>
                <span className="text-xs font-medium text-neutral-400">99.9% uptime</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-blue-500" />
                  <span className="text-sm font-bold">Backup Diário</span>
                </div>
                <span className="text-xs font-medium text-neutral-400">Há 4h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex items-center gap-3">
                  <AlertCircle size={18} className="text-orange-500" />
                  <span className="text-sm font-bold">Licenças</span>
                </div>
                <span className="text-xs font-medium text-neutral-400">45 dias</span>
              </div>
            </div>
            
            <button className="w-full bg-[#1A1C1E] text-white py-4 rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200 flex items-center justify-center gap-2">
              Gerar Relatório Geral
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Precisa de Ajuda?</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">Acesse nossa central de suporte ou consulte a documentação do sistema.</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-colors">
                Abrir Chamado
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
