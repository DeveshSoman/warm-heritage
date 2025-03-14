
import React from 'react';
import { Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 animate-slide-down">
      <div className="container px-4 mx-auto flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">Family Data Storage</h1>
        </div>
        <div className="chip px-3 py-1 bg-family-blue/20 text-primary rounded-full text-sm">
          Safe & Secure
        </div>
        <p className="text-muted-foreground text-center max-w-2xl">
          A beautiful space to store and organize your family's important information. 
          Enter details for each family member in a structured format.
        </p>
      </div>
    </header>
  );
};

export default Header;
