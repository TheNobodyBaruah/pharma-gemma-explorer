
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      // In a real application, this would use SmilesDrawer to render the molecule
      // For this mock-up, we'll just display a placeholder
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('Molecule Visualization Placeholder', canvasRef.current.width / 2, 50);
        ctx.fillText(`SMILES: ${smiles}`, canvasRef.current.width / 2, 80);
        
        // Draw a simple representation
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(250, 100);
        ctx.lineTo(300, 180);
        ctx.lineTo(200, 220);
        ctx.lineTo(100, 180);
        ctx.closePath();
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw some atoms (circles)
        const drawAtom = (x: number, y: number, label: string) => {
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, 2 * Math.PI);
          ctx.fillStyle = '#DBEAFE';
          ctx.fill();
          ctx.strokeStyle = '#3B82F6';
          ctx.stroke();
          ctx.fillStyle = '#1E40AF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, x, y);
        };
        
        drawAtom(150, 100, 'C');
        drawAtom(250, 100, 'N');
        drawAtom(300, 180, 'O');
        drawAtom(200, 220, 'C');
        drawAtom(100, 180, 'C');
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
