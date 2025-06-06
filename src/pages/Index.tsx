
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchPanel from '@/components/SearchPanel';
import ResultsPanel from '@/components/ResultsPanel';
import { Target, Molecule, Scaffold, ChatMessage } from '@/types';
import { api } from '@/services/api';
import { mockChatMessages } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';
import { Vortex } from "@/components/ui/vortex";

const Index: React.FC = () => {
  const { toast } = useToast();
  
  // State for search flow
  const [disease, setDisease] = useState<string>('');
  const [isLoadingTargets, setIsLoadingTargets] = useState<boolean>(false);
  const [targets, setTargets] = useState<Target[] | null>(null);
  
  // State for selected target and its molecules/scaffolds
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [selectedTargetName, setSelectedTargetName] = useState<string | null>(null);
  const [isLoadingMolecules, setIsLoadingMolecules] = useState<boolean>(false);
  const [molecules, setMolecules] = useState<Molecule[] | null>(null);
  const [isLoadingScaffolds, setIsLoadingScaffolds] = useState<boolean>(false);
  const [scaffolds, setScaffolds] = useState<Scaffold[] | null>(null);
  
  // State for chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);
  
  // Handle disease search
  const handleDiseaseSearch = async (diseaseName: string) => {
    setDisease(diseaseName);
    setIsLoadingTargets(true);
    setTargets(null);
    setSelectedTargetId(null);
    setSelectedTargetName(null);
    setMolecules(null);
    setScaffolds(null);
    
    try {
      const result = await api.getTargets(diseaseName);
      setTargets(result);
      toast({
        title: "Targets Retrieved",
        description: `Found ${result.length} potential targets for ${diseaseName}`,
      });
    } catch (error) {
      console.error('Error fetching targets:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch targets. Please try again.",
      });
    } finally {
      setIsLoadingTargets(false);
    }
  };
  
  // Handle target selection
  const handleTargetSelection = async (targetId: string) => {
    setSelectedTargetId(targetId);
    const target = targets?.find(t => t.id === targetId);
    setSelectedTargetName(target?.name || null);
    
    // Fetch molecules for this target
    setIsLoadingMolecules(true);
    setMolecules(null);
    setIsLoadingScaffolds(true);
    setScaffolds(null);
    
    try {
      const moleculeResults = await api.getMolecules(targetId);
      setMolecules(moleculeResults);
      
      const scaffoldResults = await api.getScaffolds(targetId);
      setScaffolds(scaffoldResults);
    } catch (error) {
      console.error('Error fetching molecules/scaffolds:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch molecules or scaffolds. Please try again.",
      });
    } finally {
      setIsLoadingMolecules(false);
      setIsLoadingScaffolds(false);
    }
  };
  
  // Handle sending chat message
  const handleSendChatMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    
    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoadingChat(true);
    
    try {
      const response = await api.sendChatMessage(message);
      setChatMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Chat Error",
        description: "Failed to get a response. Please try again.",
      });
    } finally {
      setIsLoadingChat(false);
    }
  };
  
  return (
    <Layout>
      <Vortex 
        className="absolute inset-0 -z-10"
        backgroundColor="#0a0a1f"
        baseHue={210}
        rangeHue={40}
        particleCount={600}
        rangeY={150}
        rangeSpeed={1.2}
      />
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground text-metallic">
            Therapeutic Development Assistant
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover potential therapeutic targets and molecules for disease treatment
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left column - Search panel */}
          <SearchPanel 
            disease={disease}
            isLoadingTargets={isLoadingTargets}
            targets={targets}
            selectedTargetId={selectedTargetId}
            onSearch={handleDiseaseSearch}
            onSelectTarget={handleTargetSelection}
          />
          
          {/* Middle & right column - Results panel */}
          <ResultsPanel 
            molecules={molecules}
            scaffolds={scaffolds}
            isLoadingMolecules={isLoadingMolecules}
            isLoadingScaffolds={isLoadingScaffolds}
            selectedTargetName={selectedTargetName}
            chatMessages={chatMessages}
            isLoadingChat={isLoadingChat}
            onSendChatMessage={handleSendChatMessage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
