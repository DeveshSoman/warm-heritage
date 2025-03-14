
import React from 'react';
import { Calendar, Briefcase, Phone, User, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, differenceInYears } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OccupationType } from '@/types/family';

interface BasicChildDetailsProps {
  name: string;
  dob: Date | null;
  occupation: string;
  phoneNumber: string;
  index: number;
  updateField: (field: string, value: any) => void;
}

const BasicChildDetails: React.FC<BasicChildDetailsProps> = ({
  name,
  dob,
  occupation,
  phoneNumber,
  index,
  updateField
}) => {
  const occupationOptions: OccupationType[] = ['Salaried', 'Business', 'Housewife', 'Retired'];
  
  // Calculate age if DOB is available
  const calculateAge = (dob: Date | null): number => {
    if (!dob) return 0;
    return differenceInYears(new Date(), dob);
  };
  
  const age = calculateAge(dob);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={`child-${index}-name`} className="flex items-center gap-1 font-marathi">
          Name / नाव <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`child-${index}-name`}
          value={name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Enter name / नाव प्रविष्ट करा"
          className="rounded-lg transition-all-300 font-marathi uppercase"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`child-${index}-dob`} className="flex items-center gap-1 font-marathi">
          Date of Birth / जन्मतारीख <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-lg transition-all-300",
                  !dob && "text-muted-foreground font-marathi"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dob ? (
                  format(dob, "dd-MM-yyyy")
                ) : (
                  <span>Select date / तारीख निवडा</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dob || undefined}
                onSelect={(date) => updateField('dob', date)}
                initialFocus
                className="p-3 pointer-events-auto"
                captionLayout="dropdown-buttons"
                fromYear={1940}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
          
          {dob && (
            <div className="px-3 py-2 bg-family-pink/10 rounded-lg flex items-center gap-1 text-sm whitespace-nowrap">
              <Calculator className="h-4 w-4 text-family-pink" />
              <span className="font-semibold">{age} Years</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`child-${index}-occupation`} className="flex items-center gap-1 font-marathi">
          <Briefcase className="h-4 w-4 mr-1" />
          Occupation / व्यवसाय <span className="text-destructive">*</span>
        </Label>
        <Select
          value={occupation}
          onValueChange={(value) => updateField('occupation', value)}
        >
          <SelectTrigger 
            id={`child-${index}-occupation`}
            className="rounded-lg transition-all-300 font-marathi"
          >
            <SelectValue placeholder="Select occupation / व्यवसाय निवडा" />
          </SelectTrigger>
          <SelectContent>
            {occupationOptions.map((option) => (
              <SelectItem key={option} value={option} className="font-marathi">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`child-${index}-phone`} className="flex items-center gap-1 font-marathi">
          <Phone className="h-4 w-4 mr-1" />
          Phone Number / फोन नंबर <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`child-${index}-phone`}
          value={phoneNumber}
          onChange={(e) => updateField('phoneNumber', e.target.value)}
          placeholder="Enter phone number / फोन नंबर प्रविष्ट करा"
          className="rounded-lg transition-all-300 font-marathi"
          type="tel"
          required
        />
      </div>
    </div>
  );
};

export default BasicChildDetails;
