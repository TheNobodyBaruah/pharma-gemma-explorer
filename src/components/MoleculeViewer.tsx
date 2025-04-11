
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SmilesDrawer from 'smiles-drawer';

interface MoleculeViewerProps {
  smiles: string | null;
  onClose: () => void;
  title?: string;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  smiles,
  onClose,
  title = 'Molecular Structure',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (smiles && canvasRef.current) {
      try {
        // Initialize SmilesDrawer
        const drawer = new SmilesDrawer.Drawer({
          width: 400,
          height: 300,
          bondThickness: 1.2,
          shortBondLength: 0.8,
          bondSpacing: 5.1,
          atomVisualization: 'default',
          isomeric: true,
          debug: false,
          terminalCarbons: true,
          explicitHydrogens: true,
          overlapSensitivity: 0.42,
          atomColoring: true
        });

        // Parse and draw the molecule
        SmilesDrawer.parse(smiles, (tree: any) => {
          if (canvasRef.current) {
            drawer.draw(tree, canvasRef.current.id, 'light');
          }
        }, (error: Error) => {
          // Handle parsing error
          console.error('Error parsing SMILES:', error);
          const ctx = canvasRef.current?.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#DC2626'; // text-red-600
            ctx.textAlign = 'center';
            ctx.fillText('Error rendering molecule structure', canvasRef.current.width / 2, 150);
            ctx.font = '14px Arial';
            ctx.fillStyle = '#666';
            ctx.fillText(`SMILES: ${smiles}`, canvasRef.current.width / 2, 180);
          }
        });
      } catch (error) {
        console.error('Error initializing SmilesDrawer:', error);
        // Fallback to basic error display
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.font = '16px Arial';
          ctx.fillStyle = '#DC2626'; // text-red-600
          ctx.textAlign = 'center';
          ctx.fillText('Failed to initialize molecular renderer', canvasRef.current.width / 2, 150);
        }
      }
    }
  }, [smiles]);

  if (!smiles) return null;

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-white p-4">
          <canvas 
            ref={canvasRef} 
            id="molecule-structure-canvas"
            width={400} 
            height={300} 
            className="mx-auto"
          ></canvas>
          <div className="mt-4">
            <h4 className="font-medium">SMILES</h4>
            <p className="mt-1 break-all font-mono text-sm text-muted-foreground">
              {smiles}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoleculeViewer;
