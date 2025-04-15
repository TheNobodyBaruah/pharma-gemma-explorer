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
  
  // Get molecules for a target - using the new backend endpoint
  async getMolecules(targetId: string): Promise<Molecule[]> {
    console.log(`Fetching molecules for target: ${targetId}`);
    try {
      // Extract target name from ID (assuming format like "target-0")
      const targetName = targetId.split('-')[1] ? mockTargets[parseInt(targetId.split('-')[1])].name : targetId;
      
      const response = await axios.post(`${API_BASE_URL}/target/`, {
        target: targetName,
        count: 5
      });
      
      if (response.data && Array.isArray(response.data.molecules)) {
        return response.data.molecules;
      } else {
        console.error("Invalid response structure from /target endpoint:", response.data);
        // Fallback to mock data
        await delay(1800);
        return mockMolecules.filter(molecule => molecule.target === targetId);
      }
    } catch (error) {
      console.error('Error fetching molecules:', error);
      // Fallback to mock data
      await delay(1800);
      return mockMolecules.filter(molecule => molecule.target === targetId);
    }
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
  
  // Send chat message - using the chat endpoint
  async sendChatMessage(message: string): Promise<ChatMessage> {
    console.log(`Sending chat message: ${message}`);
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/`, {
        message: message
      });
      
      if (response.data && response.data.response) {
        return {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: response.data.response,
          timestamp: Date.now(),
        };
      } else {
        console.error("Invalid response structure from /chat endpoint:", response.data);
        throw new Error("Received invalid response format from the AI service");
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error("Failed to get chat response from the server. Please try again later.");
    }
  }
};
