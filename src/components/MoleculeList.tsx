
import React from 'react';
import { Molecule } from '@/types';
import { AlertCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonColorful } from '@/components/ui/button-colorful';

interface MoleculeListProps {
  molecules: Molecule[] | null;
  onViewMolecule: (smiles: string) => void;
  isLoading?: boolean;
  selectedTargetName?: string;
}

const MoleculeList: React.FC<MoleculeListProps> = ({
  molecules,
  onViewMolecule,
  isLoading = false,
  selectedTargetName = '',
}) => {
  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="h-5 w-40 rounded bg-muted"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-md bg-muted"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!molecules || molecules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Potential Molecules</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {selectedTargetName
              ? `No molecules found for ${selectedTargetName}. Please select a different target.`
              : 'Select a target to view potential molecules.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Potential Molecules</CardTitle>
        {selectedTargetName && (
          <p className="text-sm text-muted-foreground">For target: {selectedTargetName}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {molecules.map((molecule) => (
            <div
              key={molecule.id}
              className="rounded-lg border p-4 transition-all hover:border-pharma-300"
            >
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {molecule.name || `Molecule ${molecule.id}`}
                </h3>
              </div>
              <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-mono text-muted-foreground">
                {molecule.smiles}
              </div>
              {molecule.processingError ? (
                <div className="mt-3 flex items-center text-xs text-destructive">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  <span>Error: {molecule.processingError}</span>
                </div>
              ) : (
                <div className="mt-3">
                  <ButtonColorful
                    label="View Structure"
                    className="h-8 text-xs"
                    onClick={() => onViewMolecule(molecule.smiles)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoleculeList;
