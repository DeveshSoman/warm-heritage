
import React from 'react';
import { Child } from '@/types/family';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChildDetails from './ChildDetails';

interface ChildrenSectionProps {
  children: Child[];
  updateChild: (index: number, updatedChild: Partial<Child>) => void;
  addChild: () => void;
  removeChild: (index: number) => void;
}

const ChildrenSection: React.FC<ChildrenSectionProps> = ({ 
  children, 
  updateChild, 
  addChild, 
  removeChild 
}) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-family-pink/20 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Children</h2>
        </div>
        <Button
          onClick={addChild}
          className="bg-family-pink/20 hover:bg-family-pink/30 text-primary hover:text-primary transition-all-300 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Child
        </Button>
      </div>
      
      {children.length > 0 ? (
        <div className="space-y-4">
          {children.map((child, index) => (
            <ChildDetails
              key={index}
              child={child}
              index={index}
              updateChild={updateChild}
              removeChild={removeChild}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-6 text-center">
          <p className="text-muted-foreground">No children added yet.</p>
          <Button
            onClick={addChild}
            className="mt-4 bg-family-pink/20 hover:bg-family-pink/30 text-primary hover:text-primary transition-all-300 flex items-center gap-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            Add First Child
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChildrenSection;
