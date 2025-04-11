
import { Target, Molecule, Scaffold, ChatMessage } from '../types';

// Mock targets for initial UI development
export const mockTargets: Target[] = [
  { id: '1', name: 'EGFR (Epidermal Growth Factor Receptor)', type: 'Receptor Tyrosine Kinase', description: 'Cell surface receptor for epidermal growth factors' },
  { id: '2', name: 'TNF-α (Tumor Necrosis Factor alpha)', type: 'Cytokine', description: 'Cell signaling protein involved in inflammation' },
  { id: '3', name: 'ACE2 (Angiotensin-Converting Enzyme 2)', type: 'Membrane protein', description: 'Entry point for coronaviruses' },
  { id: '4', name: 'PD-1 (Programmed Cell Death Protein 1)', type: 'Cell surface receptor', description: 'Immune checkpoint receptor' },
  { id: '5', name: 'HER2 (Human Epidermal Growth Factor Receptor 2)', type: 'Receptor Tyrosine Kinase', description: 'Protein involved in cell growth' },
];

// Mock molecules for initial UI development
export const mockMolecules: Molecule[] = [
  { id: '1', name: 'Gefitinib', smiles: 'COc1cc2ncnc(Nc3ccc(F)c(Cl)c3)c2cc1OCCCN4CCOCC4', target: '1' },
  { id: '2', name: 'Erlotinib', smiles: 'COCCOc1cc2ncnc(Nc3cccc(C#C)c3)c2cc1OC', target: '1' },
  { id: '3', name: 'Afatinib', smiles: 'CN(C)C/C=C/C(=O)Nc1cc2c(Nc3ccc(F)c(Cl)c3)ncnc2cc1OC', target: '1' },
  { id: '4', name: 'Infliximab', smiles: 'Invalid SMILES for antibody', target: '2', processingError: 'Invalid SMILES format' },
  { id: '5', name: 'Etanercept', smiles: 'Complex protein structure', target: '2', processingError: 'Cannot represent as SMILES' },
];

// Mock scaffolds for initial UI development
export const mockScaffolds: Scaffold[] = [
  { id: '1', smiles: 'c1cc2ncncc2cc1', parentMoleculeId: '1' },
  { id: '2', smiles: 'c1cc2ncncc2cc1', parentMoleculeId: '2' },
  { id: '3', smiles: 'c1cc2ncncc2cc1', parentMoleculeId: '3' },
  { id: '4', name: 'Core-TNF-Scaffold', smiles: 'c1ccccc1', parentMoleculeId: '4' },
  { id: '5', name: 'Core-TNF-Scaffold-2', smiles: 'c1ccccc1C', parentMoleculeId: '5' },
];

// Mock chat messages for initial UI development
export const mockChatMessages: ChatMessage[] = [
  { id: '1', role: 'assistant', content: 'Hello! I am TxGemma, an AI assistant for therapeutic development. How can I help you today?', timestamp: Date.now() - 5000 },
  { id: '2', role: 'user', content: 'Can you tell me more about EGFR as a target for lung cancer?', timestamp: Date.now() - 3000 },
  { id: '3', role: 'assistant', content: 'EGFR (Epidermal Growth Factor Receptor) is a significant target for lung cancer treatment, especially in non-small cell lung cancer (NSCLC). EGFR mutations are present in approximately 10-15% of NSCLC cases in Western populations and 30-40% in Asian populations. These mutations lead to constitutively active EGFR signaling, promoting cancer cell proliferation, survival, and metastasis. Several EGFR tyrosine kinase inhibitors (TKIs) like gefitinib, erlotinib, afatinib, osimertinib, and dacomitinib have been developed to target these mutations. These drugs work by binding to the ATP-binding site of the tyrosine kinase domain of EGFR, preventing its activation and downstream signaling.', timestamp: Date.now() - 1000 },
];
