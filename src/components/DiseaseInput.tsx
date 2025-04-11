
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DiseaseInputProps {
  onSearch: (disease: string) => void;
  isLoading?: boolean;
}

const DiseaseInput: React.FC<DiseaseInputProps> = ({ onSearch, isLoading = false }) => {
  const [disease, setDisease] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disease.trim()) {
      onSearch(disease.trim());
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-card-foreground">Disease Search</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Enter a disease name to identify potential therapeutic targets and molecules.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter disease name (e.g., 'lung cancer', 'diabetes')"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={!disease.trim() || isLoading}
          variant="default"
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find Targets
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DiseaseInput;
