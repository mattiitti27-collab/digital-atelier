import { create } from 'zustand';

export type ElementType = 'text' | 'button' | 'section' | 'image' | 'nav' | 'container';

export interface SiteElement {
  id: string;
  type: ElementType;
  label: string;
  parentId: string | null;
  children?: string[];
}

export interface ElementOverrides {
  fontSize?: number;
  fontWeight?: string;
  letterSpacing?: number;
  textContent?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
  opacity?: number;
}

interface EditorState {
  selectedElementId: string | null;
  hoveredElementId: string | null;
  elements: SiteElement[];
  overrides: Record<string, ElementOverrides>;
  sidebarTab: 'phases' | 'layers' | 'properties';

  setSelectedElement: (id: string | null) => void;
  setHoveredElement: (id: string | null) => void;
  setElements: (elements: SiteElement[]) => void;
  setSidebarTab: (tab: 'phases' | 'layers' | 'properties') => void;
  updateOverride: (elementId: string, overrides: Partial<ElementOverrides>) => void;
  getOverrides: (elementId: string) => ElementOverrides;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  selectedElementId: null,
  hoveredElementId: null,
  elements: [],
  overrides: {},
  sidebarTab: 'phases',

  setSelectedElement: (id) => set({ selectedElementId: id, sidebarTab: id ? 'properties' : get().sidebarTab }),
  setHoveredElement: (id) => set({ hoveredElementId: id }),
  setElements: (elements) => set({ elements }),
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  updateOverride: (elementId, newOverrides) =>
    set((state) => ({
      overrides: {
        ...state.overrides,
        [elementId]: { ...state.overrides[elementId], ...newOverrides },
      },
    })),
  getOverrides: (elementId) => get().overrides[elementId] || {},
}));
