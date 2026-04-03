import { create } from 'zustand';

export type MaterialType = 'obsidian' | 'frosted-glass' | 'gold';
export type Phase = 'identity' | 'essence' | 'arsenal' | 'signature' | 'finale';

export interface AtelierModule {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface AtelierState {
  phase: Phase;
  brandName: string;
  material: MaterialType;
  modules: AtelierModule[];
  hasAccess: boolean;
  email: string;

  setPhase: (phase: Phase) => void;
  setBrandName: (name: string) => void;
  setMaterial: (material: MaterialType) => void;
  toggleModule: (id: string) => void;
  setHasAccess: (access: boolean) => void;
  setEmail: (email: string) => void;
}

const defaultModules: AtelierModule[] = [
  { id: 'ecommerce', name: 'E-COMMERCE IMMERSIVO 3D', description: 'Catalogo prodotti con viewer 3D integrato e checkout cinematografico', active: false },
  { id: 'ai-concierge', name: 'PORTIERATO AI INTEGRATO', description: 'Assistente artificiale conversazionale con personalità su misura', active: false },
  { id: 'parallax', name: 'SCROLL CINEMATOGRAFICO PARALLASSE', description: 'Navigazione narrativa con profondità e movimenti di camera', active: false },
  { id: 'analytics', name: 'INTELLIGENCE DASHBOARD', description: 'Analytics avanzati con heatmap e comportamento utente in tempo reale', active: false },
  { id: 'multilang', name: 'ARCHITETTURA MULTILINGUA', description: 'Localizzazione professionale con routing geografico automatico', active: false },
  { id: 'cms', name: 'CMS HEADLESS ENTERPRISE', description: 'Gestione contenuti decentralizzata con API GraphQL', active: false },
];

export const useAtelierStore = create<AtelierState>((set) => ({
  phase: 'identity',
  brandName: '',
  material: 'obsidian',
  modules: defaultModules,
  hasAccess: false,
  email: '',

  setPhase: (phase) => set({ phase }),
  setBrandName: (brandName) => set({ brandName }),
  setMaterial: (material) => set({ material }),
  toggleModule: (id) =>
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m
      ),
    })),
  setHasAccess: (hasAccess) => set({ hasAccess }),
  setEmail: (email) => set({ email }),
}));
