
import React from 'react';
import { Child, Spouse, Grandchild } from '@/types/family';
import { User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpouseDetails from './SpouseDetails';
import GrandchildrenSection from './GrandchildrenSection';
import BasicChildDetails from './child/BasicChildDetails';
import AdditionalPhoneNumbers from './child/AdditionalPhoneNumbers';
import MaritalStatus from './child/MaritalStatus';

interface ChildDetailsProps {
  child: Child;
  index: number;
  updateChild: (index: number, updatedChild: Partial<Child>) => void;
  removeChild: (index: number) => void;
}

const ChildDetails: React.FC<ChildDetailsProps> = ({ child, index, updateChild, removeChild }) => {
  const updateField = (field: string, value: any) => {
    updateChild(index, { [field]: value });
  };

  const addPhoneNumber = () => {
    updateChild(index, {
      additionalPhoneNumbers: [...child.additionalPhoneNumbers, '']
    });
  };

  const updatePhoneNumber = (phoneIndex: number, value: string) => {
    const newPhoneNumbers = [...child.additionalPhoneNumbers];
    newPhoneNumbers[phoneIndex] = value;
    updateChild(index, { additionalPhoneNumbers: newPhoneNumbers });
  };

  const removePhoneNumber = (phoneIndex: number) => {
    const newPhoneNumbers = [...child.additionalPhoneNumbers];
    newPhoneNumbers.splice(phoneIndex, 1);
    updateChild(index, { additionalPhoneNumbers: newPhoneNumbers });
  };

  const updateSpouse = (updatedSpouse: Partial<Spouse>) => {
    updateChild(index, {
      spouse: { ...child.spouse!, ...updatedSpouse }
    });
  };

  const updateGrandchild = (grandchildIndex: number, updatedGrandchild: Partial<Grandchild>) => {
    const newChildren = [...child.children];
    newChildren[grandchildIndex] = { ...newChildren[grandchildIndex], ...updatedGrandchild };
    updateChild(index, { children: newChildren });
  };

  const addGrandchild = () => {
    updateChild(index, {
      children: [
        ...child.children,
        { name: '', dob: null, occupation: '', phoneNumber: '' }
      ]
    });
  };

  const removeGrandchild = (grandchildIndex: number) => {
    const newChildren = [...child.children];
    newChildren.splice(grandchildIndex, 1);
    updateChild(index, { children: newChildren });
  };

  const updateMaritalStatus = (status: 'Married' | 'Unmarried') => {
    const updates: Partial<Child> = { maritalStatus: status };
    
    if (status === 'Married' && !child.spouse) {
      updates.spouse = {
        name: '',
        dob: null,
        occupation: '',
        phoneNumber: '',
        numberOfGrandchildren: 0
      };
    }
    
    updateChild(index, updates);
  };

  return (
    <div className="glass-card rounded-xl p-5 mb-6 animate-fade-in hover-elevate">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-family-pink/30 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Child {index + 1}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeChild(index)}
          className="hover:bg-destructive/10 hover:text-destructive transition-all-300"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <BasicChildDetails 
        name={child.name}
        dob={child.dob}
        occupation={child.occupation}
        phoneNumber={child.phoneNumber}
        index={index}
        updateField={updateField}
      />
      
      <AdditionalPhoneNumbers 
        phoneNumbers={child.additionalPhoneNumbers}
        addPhoneNumber={addPhoneNumber}
        updatePhoneNumber={updatePhoneNumber}
        removePhoneNumber={removePhoneNumber}
      />
      
      <MaritalStatus 
        maritalStatus={child.maritalStatus}
        updateMaritalStatus={updateMaritalStatus}
        index={index}
      />
      
      {child.maritalStatus === 'Married' && child.spouse && (
        <SpouseDetails 
          spouse={child.spouse} 
          updateSpouse={updateSpouse} 
        />
      )}
      
      {child.maritalStatus === 'Married' && (
        <GrandchildrenSection 
          grandchildren={child.children} 
          updateGrandchild={updateGrandchild}
          addGrandchild={addGrandchild}
          removeGrandchild={removeGrandchild}
        />
      )}
    </div>
  );
};

export default ChildDetails;
