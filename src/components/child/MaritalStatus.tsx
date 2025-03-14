
import React from 'react';
import { Check, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MaritalStatusProps {
  maritalStatus: 'Married' | 'Unmarried';
  updateMaritalStatus: (status: 'Married' | 'Unmarried') => void;
  index: number;
}

const MaritalStatus: React.FC<MaritalStatusProps> = ({
  maritalStatus,
  updateMaritalStatus,
  index
}) => {
  return (
    <div className="space-y-2 col-span-2">
      <Label className="flex items-center gap-1">
        Marital Status <span className="text-destructive">*</span>
      </Label>
      <RadioGroup 
        value={maritalStatus} 
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
  );
};

export default MaritalStatus;
