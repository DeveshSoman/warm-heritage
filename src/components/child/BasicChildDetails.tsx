
import React from 'react';
import { Calendar, Briefcase, Phone, User } from 'lucide-react';
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={`child-${index}-name`} className="flex items-center gap-1">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`child-${index}-name`}
          value={name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Enter name / नाव प्रविष्ट करा"
          className="rounded-lg transition-all-300 font-marathi"
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
                !dob && "text-muted-foreground font-marathi"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dob ? (
                format(dob, "PPP")
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
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`child-${index}-occupation`} className="flex items-center gap-1">
          <Briefcase className="h-4 w-4 mr-1" />
          Occupation <span className="text-destructive">*</span>
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
        <Label htmlFor={`child-${index}-phone`} className="flex items-center gap-1">
          <Phone className="h-4 w-4 mr-1" />
          Phone Number <span className="text-destructive">*</span>
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
