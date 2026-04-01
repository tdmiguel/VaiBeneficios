import React from 'react';
import { 
  LayoutDashboard, 
  Gift, 
  Users, 
  Link as LinkIcon, 
  UserCircle, 
  Menu, 
  X,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'benefits', label: 'Gestão de Benefícios', icon: Gift },
  { id: 'categories', label: 'Categorias de Beneficiários', icon: Users },
  { id: 'associations', label: 'Associações', icon: LinkIcon },
  { id: 'users', label: 'Usuários', icon: UserCircle },
];

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-neutral-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-[#1A1C1E] text-white transition-all duration-300 flex flex-col z-50 fixed inset-y-0 left-0",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          {isSidebarOpen ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">B</div>
              <span className="font-bold text-xl tracking-tight">Benefix<span className="text-blue-400">.</span></span>
            </motion.div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">B</div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-xl transition-all group relative",
                activeTab === item.id 
                  ? "bg-blue-600 text-white" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={22} className={cn(activeTab === item.id ? "text-white" : "text-neutral-400 group-hover:text-white")} />
              {isSidebarOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-0 w-1 h-6 bg-white rounded-l-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button className="w-full flex items-center gap-4 p-3 rounded-xl text-neutral-400 hover:bg-white/5 hover:text-white transition-all group">
            <Settings size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Configurações</span>}
          </button>
          <button className="w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-500"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>Home</span>
              <ChevronRight size={14} />
              <span className="text-neutral-900 font-semibold capitalize">
                {menuItems.find(i => i.id === activeTab)?.label}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar no sistema..." 
                className="bg-neutral-100 border-none rounded-full px-10 py-2 text-sm w-80 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-neutral-100 rounded-full text-neutral-500 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-neutral-200 mx-1"></div>
              <div className="flex items-center gap-3 pl-1">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">Thiago Miguel</p>
                  <p className="text-xs text-neutral-400 mt-1">Admin Master</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
                  TM
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
