
import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-6">
        {children}
      </main>
      <footer className="bg-muted py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 TxAI Assistant | Therapeutic Development Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
