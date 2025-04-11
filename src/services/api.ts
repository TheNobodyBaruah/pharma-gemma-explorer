
// This is a placeholder service for API calls
// In a real application, this would connect to your FastAPI backend

import { mockTargets, mockMolecules, mockScaffolds, mockChatMessages } from '../lib/mockData';
import { Target, Molecule, Scaffold, ChatMessage } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get targets for a disease
  async getTargets(disease: string): Promise<Target[]> {
    console.log(`Fetching targets for disease: ${disease}`);
    // Simulate API call
    await delay(1500);
    return mockTargets;
  },
  
  // Get molecules for a target
  async getMolecules(targetId: string): Promise<Molecule[]> {
    console.log(`Fetching molecules for target: ${targetId}`);
    // Simulate API call
    await delay(1800);
    return mockMolecules.filter(molecule => molecule.target === targetId);
  },
  
  // Get scaffolds for a target
  async getScaffolds(targetId: string): Promise<Scaffold[]> {
    console.log(`Fetching scaffolds for target: ${targetId}`);
    // Simulate API call
    await delay(2000);
    const molecules = mockMolecules.filter(molecule => molecule.target === targetId);
    const moleculeIds = molecules.map(molecule => molecule.id);
    return mockScaffolds.filter(scaffold => 
      scaffold.parentMoleculeId && moleculeIds.includes(scaffold.parentMoleculeId));
  },
  
  // Send chat message and get response
  async sendChatMessage(message: string): Promise<ChatMessage> {
    console.log(`Sending chat message: ${message}`);
    // Simulate API call
    await delay(2000);
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `This is a simulated response to: "${message}". In a real application, this would come from TxGemma via Vertex AI.`,
      timestamp: Date.now(),
    };
  }
};
