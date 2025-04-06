import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  isAutoTheme: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  enableAutoTheme: (enable: boolean) => void;
  updateTimeBasedTheme: () => void;
}

// Function to get theme based on time of day
const getTimeBasedTheme = (): Theme => {
  const hour = new Date().getHours();
  // Dark theme from 6 PM (18:00) to 6 AM (6:00)
  return (hour >= 18 || hour < 6) ? 'dark' : 'light';
};

// Function to get saved user preference
const getSavedTheme = (): { theme: Theme, isAutoTheme: boolean } => {
  try {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedAutoTheme = localStorage.getItem('autoTheme');
    
    const isAutoTheme = savedAutoTheme === 'true';
    
    if (isAutoTheme) {
      return { theme: getTimeBasedTheme(), isAutoTheme: true };
    }
    
    return { 
      theme: savedTheme || 'light', 
      isAutoTheme: false 
    };
  } catch (error) {
    // In case localStorage is not available
    return { theme: getTimeBasedTheme(), isAutoTheme: true };
  }
};

// Create the store
export const useTheme = create<ThemeState>((set) => {
  // Use a try-catch block to handle cases where localStorage is not available
  let initialTheme: Theme = 'light';
  let initialAutoTheme: boolean = true;
  
  try {
    const { theme, isAutoTheme } = getSavedTheme();
    initialTheme = theme;
    initialAutoTheme = isAutoTheme;
  } catch (error) {
    initialTheme = getTimeBasedTheme();
  }
  
  return {
    theme: initialTheme,
    isAutoTheme: initialAutoTheme,
    
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem('theme', theme);
        // Setting a theme manually disables auto theme
        localStorage.setItem('autoTheme', 'false');
      } catch (error) {
        console.warn('Could not save theme preference to localStorage');
      }
      
      set({ theme, isAutoTheme: false });
    },
    
    toggleTheme: () => {
      set((state) => {
        if (state.isAutoTheme) {
          // If auto theme is enabled, disable it first and use the current theme as base
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          try {
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('autoTheme', 'false');
          } catch (error) {
            console.warn('Could not save theme preference to localStorage');
          }
          return { theme: newTheme, isAutoTheme: false };
        } else {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          try {
            localStorage.setItem('theme', newTheme);
          } catch (error) {
            console.warn('Could not save theme preference to localStorage');
          }
          return { theme: newTheme };
        }
      });
    },
    
    enableAutoTheme: (enable: boolean) => {
      try {
        localStorage.setItem('autoTheme', String(enable));
      } catch (error) {
        console.warn('Could not save auto theme preference to localStorage');
      }
      
      if (enable) {
        const timeBasedTheme = getTimeBasedTheme();
        set({ theme: timeBasedTheme, isAutoTheme: true });
      } else {
        // Keep current theme when disabling auto theme
        set({ isAutoTheme: false });
      }
    },
    
    updateTimeBasedTheme: () => {
      set((state) => {
        if (state.isAutoTheme) {
          return { theme: getTimeBasedTheme() };
        }
        return state;
      });
    }
  };
});
