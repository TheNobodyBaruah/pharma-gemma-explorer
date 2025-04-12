
import React from 'react';
import { Beaker, AtomIcon, Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pharma-800 to-accent py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white p-2 shadow-sm">
            <Beaker className="h-6 w-6 text-pharma-700" />
          </div>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/11c2e267-7256-4e84-83c7-60ca7cd6fdd5.png" 
              alt="TheraSpark" 
              className="h-8 md:h-10"
            />
          </div>
        </div>
        
        <div className="hidden items-center space-x-4 md:flex">
          <div className="flex items-center space-x-1">
            <AtomIcon className="h-5 w-5 text-pharma-200" />
            <span className="text-sm text-white">Powered by TxGemma</span>
          </div>
          <div className="flex items-center space-x-1">
            <Brain className="h-5 w-5 text-pharma-200" />
            <span className="text-sm text-white">Vertex AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
