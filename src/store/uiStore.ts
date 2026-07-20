import { create } from "zustand";

interface UiState {
  commandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  selectedDateLabel: string;
  setSelectedDateLabel: (label: string) => void;

  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
}

/**
 * Cross-cutting UI state that many unrelated components need to read/write
 * (search shortcut, top-bar date picker, etc). Sidebar collapse intentionally
 * stays in SidebarContext since it's purely a layout concern scoped to
 * AppLayout + Sidebar.
 */
export const useUiStore = create<UiState>((set) => ({
  commandPaletteOpen: false,
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),

  selectedDateLabel: "May 18, 2025",
  setSelectedDateLabel: (label) => set({ selectedDateLabel: label }),

  selectedCompany: localStorage.getItem("gp_selected_company") || "Acme Global Corp.",
  setSelectedCompany: (company) => {
    localStorage.setItem("gp_selected_company", company);
    set({ selectedCompany: company });
  },
}));
