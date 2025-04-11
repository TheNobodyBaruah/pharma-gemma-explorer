
import axios from 'axios';
import { mockTargets, mockMolecules, mockScaffolds, mockChatMessages } from '../lib/mockData';
import { Target, Molecule, Scaffold, ChatMessage } from '../types';

// Base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Simulate API delay for endpoints still using mock data
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get targets for a disease
  async getTargets(disease: string): Promise<Target[]> {
    console.log(`Fetching targets for disease: ${disease}`);
    try {
      const response = await axios.post(`${API_BASE_URL}/disease/`, {
        disease: disease,
      });
      
      // Transform the response into Target objects
      if (response.data && Array.isArray(response.data.targets)) {
        return response.data.targets.map((name: string, index: number) => ({
          id: `target-${index}`,
          name: name,
          type: index % 2 === 0 ? 'Receptor' : 'Enzyme', // Mock type for now
          description: `Potential target for ${disease}` // Mock description
        }));
      } else {
        console.error("Invalid response structure from /disease endpoint:", response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching targets:', error);
      throw error;
    }
  },
  
  // Get molecules for a target - still using mock data
  async getMolecules(targetId: string): Promise<Molecule[]> {
    console.log(`Fetching molecules for target: ${targetId}`);
    // Simulate API call
    await delay(1800);
    return mockMolecules.filter(molecule => molecule.target === targetId);
  },
  
  // Get scaffolds for a target - still using mock data
  async getScaffolds(targetId: string): Promise<Scaffold[]> {
    console.log(`Fetching scaffolds for target: ${targetId}`);
    // Simulate API call
    await delay(2000);
    const molecules = mockMolecules.filter(molecule => molecule.target === targetId);
    const moleculeIds = molecules.map(molecule => molecule.id);
    return mockScaffolds.filter(scaffold => 
      scaffold.parentMoleculeId && moleculeIds.includes(scaffold.parentMoleculeId));
  },
  
  // Send chat message - still using mock data
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
