// Website updates and version management
// Update this file whenever you add new features or make changes

export interface Update {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'content' | 'fix' | 'announcement';
  priority?: 'high' | 'medium' | 'low';
}

export interface VersionInfo {
  version: string;
  releaseDate: string;
  description: string;
}

// Current version information
export const currentVersion: VersionInfo = {
  version: '1.0.0',
  releaseDate: '2024-12-19',
  description: 'Initial release of Skåre 2025 website'
};

// Recent updates - add new updates at the top of the array
export const recentUpdates: Update[] = [
  {
    id: 1,
    date: '2024-12-19',
    title: 'Skåre 2025 webbplats lanserad',
    description: 'Den officiella webbplatsen för Skåre 2025 är nu live med alla funktioner!',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: 2,
    date: '2024-12-19',
    title: 'Röstningssystem aktiverat',
    description: 'Nytt röstningssystem för evenemangets tema, matpreferenser och aktiviteter.',
    type: 'feature',
    priority: 'high'
  },
  {
    id: 3,
    date: '2024-12-19',
    title: 'Användarregistrering tillgänglig',
    description: 'Användare kan nu registrera sig och välja mellan grupperna Manägers, Assar och Gollar.',
    type: 'feature',
    priority: 'high'
  },
  {
    id: 4,
    date: '2024-12-19',
    title: 'Bildarkiv struktur skapad',
    description: 'Fotoarkiv från 2022 och framåt är redo för uppladdning av bilder.',
    type: 'content',
    priority: 'medium'
  },
  {
    id: 5,
    date: '2024-12-19',
    title: 'Lösenordsskydd implementerat',
    description: 'Webbplatsen skyddas nu av lösenord "Trellehulla" för säker åtkomst.',
    type: 'feature',
    priority: 'high'
  },
  {
    id: 6,
    date: '2024-12-19',
    title: 'Senaste uppdateringar sektion',
    description: 'Ny sektion på hemsidan som visar de senaste uppdateringarna och förändringarna.',
    type: 'feature',
    priority: 'medium'
  }
];

// Helper functions
export const getUpdateIcon = (type: string): string => {
  switch (type) {
    case 'feature': return '✨';
    case 'content': return '📸';
    case 'fix': return '🔧';
    case 'announcement': return '📢';
    default: return '📝';
  }
};

export const getUpdateColor = (type: string): string => {
  switch (type) {
    case 'feature': return '#28a745';
    case 'content': return '#17a2b8';
    case 'fix': return '#ffc107';
    case 'announcement': return '#dc3545';
    default: return '#6c757d';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high': return '#dc3545';
    case 'medium': return '#ffc107';
    case 'low': return '#28a745';
    default: return '#6c757d';
  }
};

// Get updates by type
export const getUpdatesByType = (type: string): Update[] => {
  return recentUpdates.filter(update => update.type === type);
};

// Get high priority updates
export const getHighPriorityUpdates = (): Update[] => {
  return recentUpdates.filter(update => update.priority === 'high');
};

// Get latest updates (most recent 3)
export const getLatestUpdates = (count: number = 3): Update[] => {
  return recentUpdates.slice(0, count);
};

// Add new update function (for future use)
export const addUpdate = (update: Omit<Update, 'id'>): void => {
  const newId = Math.max(...recentUpdates.map(u => u.id)) + 1;
  const newUpdate: Update = {
    ...update,
    id: newId
  };
  recentUpdates.unshift(newUpdate); // Add to beginning of array
};

// Example of how to add a new update:
// addUpdate({
//   date: '2024-12-20',
//   title: 'Ny funktion tillagd',
//   description: 'Beskrivning av den nya funktionen',
//   type: 'feature',
//   priority: 'medium'
// }); 