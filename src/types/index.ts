
// Define core types for the application

export interface Target {
  id: string;
  name: string;
  type?: string;
  description?: string;
}

export interface Molecule {
  id: string;
  name?: string;
  smiles: string;
  target?: string;
  processingError?: string;
}

export interface Scaffold {
  id: string;
  name?: string;
  smiles: string;
  parentMoleculeId?: string;
  processingError?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SavedSearch {
  id: string;
  userId: string;
  diseaseName: string;
  selectedTarget: string;
  targetsFound: Target[];
  generatedMolecules: Molecule[];
  generatedScaffolds: Scaffold[];
  createdAt: number;
}
