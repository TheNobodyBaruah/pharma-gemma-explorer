
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MoleculeList from '@/components/MoleculeList';
import ScaffoldList from '@/components/ScaffoldList';
import MoleculeViewer from '@/components/MoleculeViewer';
import ChatInterface from '@/components/ChatInterface';
import { Molecule, Scaffold, ChatMessage } from '@/types';

interface ResultsPanelProps {
  molecules: Molecule[] | null;
  scaffolds: Scaffold[] | null;
  isLoadingMolecules: boolean;
  isLoadingScaffolds: boolean;
  selectedTargetName: string | null;
  chatMessages: ChatMessage[];
  isLoadingChat: boolean;
  onSendChatMessage: (message: string) => Promise<void>;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  molecules,
  scaffolds,
  isLoadingMolecules,
  isLoadingScaffolds,
  selectedTargetName,
  chatMessages,
  isLoadingChat,
  onSendChatMessage,
}) => {
  const [viewedSmiles, setViewedSmiles] = useState<string | null>(null);
  const [viewedType, setViewedType] = useState<'molecule' | 'scaffold'>('molecule');

  const handleViewMolecule = (smiles: string) => {
    setViewedSmiles(smiles);
    setViewedType('molecule');
  };

  const handleViewScaffold = (smiles: string) => {
    setViewedSmiles(smiles);
    setViewedType('scaffold');
  };

  return (
    <div className="space-y-6 md:col-span-2 bg-background/80 backdrop-blur-sm rounded-lg p-4">
      {viewedSmiles ? (
        <MoleculeViewer
          smiles={viewedSmiles}
          onClose={() => setViewedSmiles(null)}
          title={viewedType === 'molecule' ? 'Molecule Structure' : 'Scaffold Structure'}
        />
      ) : (
        <div className="rounded-lg border bg-muted/30 p-6 text-center">
          <p className="text-muted-foreground">
            Select a molecule or scaffold to view its structure
          </p>
        </div>
      )}

      <Tabs defaultValue="molecules" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="molecules">Molecules</TabsTrigger>
          <TabsTrigger value="scaffolds">Scaffolds</TabsTrigger>
        </TabsList>
        <TabsContent value="molecules">
          <MoleculeList
            molecules={molecules}
            onViewMolecule={handleViewMolecule}
            isLoading={isLoadingMolecules}
            selectedTargetName={selectedTargetName || ''}
          />
        </TabsContent>
        <TabsContent value="scaffolds">
          <ScaffoldList
            scaffolds={scaffolds}
            onViewScaffold={handleViewScaffold}
            isLoading={isLoadingScaffolds}
            selectedTargetName={selectedTargetName || ''}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-6 h-[500px]">
        <ChatInterface
          messages={chatMessages}
          onSendMessage={onSendChatMessage}
          isLoading={isLoadingChat}
        />
      </div>
    </div>
  );
};

export default ResultsPanel;
