
import React from 'react';
import { FamilyHead as FamilyHeadType, OccupationType } from '@/types/family';
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

interface FamilyHeadProps {
  familyHead: FamilyHeadType;
  updateFamilyHead: (updatedHead: Partial<FamilyHeadType>) => void;
}

const FamilyHead: React.FC<FamilyHeadProps> = ({ familyHead, updateFamilyHead }) => {
  const occupationOptions: OccupationType[] = ['Salaried', 'Business', 'Housewife', 'Retired'];
  
  // Calculate age if DOB is available
  const calculateAge = (dob: Date | null): number => {
    if (!dob) return 0;
    return differenceInYears(new Date(), dob);
  };
  
  const age = calculateAge(familyHead.dob);

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-center mb-4 space-x-2">
        <div className="h-8 w-8 rounded-full bg-family-blue/30 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold font-marathi">Family Head / कुटुंब प्रमुख</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="head-name" className="flex items-center gap-1 font-marathi">
            Name / नाव <span className="text-destructive">*</span>
          </Label>
          <Input
            id="head-name"
            value={familyHead.name}
            onChange={(e) => updateFamilyHead({ name: e.target.value })}
            placeholder="Enter full name / पूर्ण नाव प्रविष्ट करा"
            className="rounded-lg transition-all-300 focus:border-primary font-marathi uppercase"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="head-dob" className="flex items-center gap-1 font-marathi">
            Date of Birth / जन्मतारीख <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-lg transition-all-300 border bg-background",
                    !familyHead.dob && "text-muted-foreground font-marathi"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {familyHead.dob ? (
                    format(familyHead.dob, "dd-MM-yyyy")
                  ) : (
                    <span>Select date / तारीख निवडा</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={familyHead.dob || undefined}
                  onSelect={(date) => updateFamilyHead({ dob: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  captionLayout="dropdown-buttons"
                  fromYear={1940}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
            
            {familyHead.dob && (
              <div className="px-3 py-2 bg-family-purple/10 rounded-lg flex items-center gap-1 text-sm">
                <Calculator className="h-4 w-4 text-family-purple" />
                <span className="font-semibold">{age} Years</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="head-occupation" className="flex items-center gap-1 font-marathi">
            <Briefcase className="h-4 w-4 mr-1" />
            Occupation / व्यवसाय <span className="text-destructive">*</span>
          </Label>
          <Select
            value={familyHead.occupation}
            onValueChange={(value) => updateFamilyHead({ occupation: value })}
          >
            <SelectTrigger id="head-occupation" className="rounded-lg transition-all-300 focus:border-primary font-marathi">
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
          <Label htmlFor="head-phone" className="flex items-center gap-1 font-marathi">
            <Phone className="h-4 w-4 mr-1" />
            Phone Number / फोन नंबर <span className="text-destructive">*</span>
          </Label>
          <Input
            id="head-phone"
            value={familyHead.phoneNumber}
            onChange={(e) => updateFamilyHead({ phoneNumber: e.target.value })}
            placeholder="Enter phone number / फोन नंबर प्रविष्ट करा"
            className="rounded-lg transition-all-300 focus:border-primary font-marathi"
            type="tel"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyHead;
