
import React from 'react';
import DiseaseInput from '@/components/DiseaseInput';
import TargetList from '@/components/TargetList';
import { Target } from '@/types';

interface SearchPanelProps {
  disease: string;
  isLoadingTargets: boolean;
  targets: Target[] | null;
  selectedTargetId: string | null;
  onSearch: (diseaseName: string) => Promise<void>;
  onSelectTarget: (targetId: string) => Promise<void>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  disease,
  isLoadingTargets,
  targets,
  selectedTargetId,
  onSearch,
  onSelectTarget,
}) => {
  return (
    <div className="space-y-6 bg-background/80 backdrop-blur-sm rounded-lg p-4">
      <DiseaseInput onSearch={onSearch} isLoading={isLoadingTargets} />
      <TargetList
        targets={targets}
        selectedTargetId={selectedTargetId}
        onSelectTarget={onSelectTarget}
        isLoading={isLoadingTargets}
        disease={disease}
      />
    </div>
  );
};

export default SearchPanel;
