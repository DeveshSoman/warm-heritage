
import React from 'react';
import { Child, Spouse, Grandchild } from '@/types/family';
import { Calendar, Briefcase, Phone, PlusCircle, MinusCircle, User, Check, X, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SpouseDetails from './SpouseDetails';
import GrandchildrenSection from './GrandchildrenSection';

interface ChildDetailsProps {
  child: Child;
  index: number;
  updateChild: (index: number, updatedChild: Partial<Child>) => void;
  removeChild: (index: number) => void;
}

const ChildDetails: React.FC<ChildDetailsProps> = ({ child, index, updateChild, removeChild }) => {
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
    
    // If changing to married and no spouse yet, create one
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`child-${index}-name`} className="flex items-center gap-1">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`child-${index}-name`}
            value={child.name}
            onChange={(e) => updateChild(index, { name: e.target.value })}
            placeholder="Enter name"
            className="rounded-lg transition-all-300"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`child-${index}-dob`} className="flex items-center gap-1">
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-lg transition-all-300",
                  !child.dob && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {child.dob ? (
                  format(child.dob, "PPP")
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={child.dob || undefined}
                onSelect={(date) => updateChild(index, { dob: date })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`child-${index}-occupation`} className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 mr-1" />
            Occupation <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`child-${index}-occupation`}
            value={child.occupation}
            onChange={(e) => updateChild(index, { occupation: e.target.value })}
            placeholder="Enter occupation"
            className="rounded-lg transition-all-300"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`child-${index}-phone`} className="flex items-center gap-1">
            <Phone className="h-4 w-4 mr-1" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`child-${index}-phone`}
            value={child.phoneNumber}
            onChange={(e) => updateChild(index, { phoneNumber: e.target.value })}
            placeholder="Enter phone number"
            className="rounded-lg transition-all-300"
            type="tel"
            required
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1">
              Additional Phone Numbers
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={addPhoneNumber}
              className="h-8 px-2 text-xs hover:bg-primary/10 transition-all-300"
            >
              <PlusCircle className="h-3 w-3 mr-1" />
              Add Number
            </Button>
          </div>
          
          {child.additionalPhoneNumbers.length > 0 ? (
            <div className="space-y-2">
              {child.additionalPhoneNumbers.map((phone, phoneIndex) => (
                <div key={phoneIndex} className="flex gap-2">
                  <Input
                    value={phone}
                    onChange={(e) => updatePhoneNumber(phoneIndex, e.target.value)}
                    placeholder={`Additional phone number ${phoneIndex + 1}`}
                    className="rounded-lg transition-all-300"
                    type="tel"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePhoneNumber(phoneIndex)}
                    className="hover:bg-destructive/10 hover:text-destructive transition-all-300"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No additional phone numbers added</p>
          )}
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label className="flex items-center gap-1">
            Marital Status <span className="text-destructive">*</span>
          </Label>
          <RadioGroup 
            value={child.maritalStatus} 
            onValueChange={(value) => updateMaritalStatus(value as 'Married' | 'Unmarried')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Married" id={`married-${index}`} />
              <Label htmlFor={`married-${index}`} className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-family-green" />
                Married
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Unmarried" id={`unmarried-${index}`} />
              <Label htmlFor={`unmarried-${index}`} className="flex items-center">
                <X className="h-4 w-4 mr-1 text-family-pink" />
                Unmarried
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
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
