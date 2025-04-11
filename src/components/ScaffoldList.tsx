
import React from 'react';
import { Scaffold } from '@/types';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScaffoldListProps {
  scaffolds: Scaffold[] | null;
  onViewScaffold: (smiles: string) => void;
  isLoading?: boolean;
  selectedTargetName?: string;
}

const ScaffoldList: React.FC<ScaffoldListProps> = ({
  scaffolds,
  onViewScaffold,
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

  if (!scaffolds || scaffolds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Molecular Scaffolds</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {selectedTargetName
              ? `No scaffolds generated for ${selectedTargetName}. Please select a different target.`
              : 'Select a target to view molecular scaffolds.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Molecular Scaffolds</CardTitle>
        {selectedTargetName && (
          <p className="text-sm text-muted-foreground">For target: {selectedTargetName}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scaffolds.map((scaffold) => (
            <div
              key={scaffold.id}
              className="cursor-pointer rounded-lg border p-4 transition-all hover:border-pharma-300 hover:shadow-sm"
              onClick={() => !scaffold.processingError && onViewScaffold(scaffold.smiles)}
            >
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {scaffold.name || `Scaffold ${scaffold.id}`}
                </h3>
                {scaffold.processingError ? (
                  <span className="flex items-center text-xs text-destructive">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Error
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">View structure</span>
                )}
              </div>
              <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-mono text-muted-foreground">
                {scaffold.smiles}
              </div>
              {scaffold.processingError && (
                <p className="mt-1 text-xs text-destructive">{scaffold.processingError}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScaffoldList;
