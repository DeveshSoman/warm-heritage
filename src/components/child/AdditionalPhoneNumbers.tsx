
import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AdditionalPhoneNumbersProps {
  phoneNumbers: string[];
  addPhoneNumber: () => void;
  updatePhoneNumber: (index: number, value: string) => void;
  removePhoneNumber: (index: number) => void;
}

const AdditionalPhoneNumbers: React.FC<AdditionalPhoneNumbersProps> = ({
  phoneNumbers,
  addPhoneNumber,
  updatePhoneNumber,
  removePhoneNumber
}) => {
  return (
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
      
      {phoneNumbers.length > 0 ? (
        <div className="space-y-2">
          {phoneNumbers.map((phone, phoneIndex) => (
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
  );
};

export default AdditionalPhoneNumbers;
