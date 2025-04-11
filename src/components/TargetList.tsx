
import React from 'react';
import { Target } from '@/types';
import { RadioGroup } from '@/components/ui/radio-group';
import { Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TargetListProps {
  targets: Target[] | null;
  selectedTargetId: string | null;
  onSelectTarget: (targetId: string) => void;
  isLoading?: boolean;
  disease?: string;
}

const TargetList: React.FC<TargetListProps> = ({
  targets,
  selectedTargetId,
  onSelectTarget,
  isLoading = false,
  disease = '',
}) => {
  if (isLoading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Identifying Targets...
          </CardTitle>
          <CardDescription>Analyzing potential targets for {disease}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-md bg-muted"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!targets || targets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Potential Targets</CardTitle>
          {disease && <CardDescription>Targets for {disease}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            {disease 
              ? `No targets found for ${disease}. Please try a different search.` 
              : 'Search for a disease to see potential targets.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Potential Targets</CardTitle>
        {disease && <CardDescription>Targets for {disease}</CardDescription>}
      </CardHeader>
      <CardContent>
        <RadioGroup className="space-y-3">
          {targets.map((target) => (
            <div
              key={target.id}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                selectedTargetId === target.id
                  ? 'border-pharma-500 bg-pharma-50'
                  : 'hover:border-pharma-200 hover:bg-muted'
              }`}
              onClick={() => onSelectTarget(target.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 h-4 w-4 rounded-full border border-pharma-500">
                  {selectedTargetId === target.id && (
                    <div className="h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full bg-pharma-500"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{target.name}</h3>
                    {target.type && (
                      <Badge variant="outline" className="bg-pharma-50 text-pharma-700">
                        {target.type}
                      </Badge>
                    )}
                  </div>
                  {target.description && (
                    <p className="mt-1 text-sm">{target.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TargetList;
