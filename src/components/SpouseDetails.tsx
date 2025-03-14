
import React from 'react';
import { Spouse, OccupationType } from '@/types/family';
import { Calendar, Briefcase, Phone, Heart, Users } from 'lucide-react';
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

interface SpouseDetailsProps {
  spouse: Spouse;
  updateSpouse: (updatedSpouse: Partial<Spouse>) => void;
}

const SpouseDetails: React.FC<SpouseDetailsProps> = ({ spouse, updateSpouse }) => {
  const occupationOptions: OccupationType[] = ['Salaried', 'Business', 'Housewife', 'Retired'];
  
  // Calculate age if DOB is available
  const calculateAge = (dob: Date | null): number => {
    if (!dob) return 0;
    return differenceInYears(new Date(), dob);
  };
  
  const age = calculateAge(spouse.dob);

  return (
    <div className="ml-8 mt-4 border-l-2 border-family-purple/30 pl-6 pb-4 animate-slide-up">
      <div className="flex items-center mb-3 space-x-2">
        <div className="h-6 w-6 rounded-full bg-family-purple/30 flex items-center justify-center">
          <Heart className="h-3 w-3 text-primary" />
        </div>
        <h3 className="text-md font-medium font-marathi">Spouse Details / जीवनसाथी तपशील</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="spouse-name" className="text-sm font-marathi">Name / नाव</Label>
          <Input
            id="spouse-name"
            value={spouse.name}
            onChange={(e) => updateSpouse({ name: e.target.value.toUpperCase() })}
            placeholder="Enter spouse's name / जीवनसाथीचे नाव प्रविष्ट करा"
            className="rounded-lg text-sm transition-all-300 font-marathi uppercase"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-dob" className="text-sm font-marathi">Date of Birth / जन्मतारीख</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-sm rounded-lg transition-all-300",
                    !spouse.dob && "text-muted-foreground font-marathi"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {spouse.dob ? (
                    format(spouse.dob, "dd-MM-yyyy")
                  ) : (
                    <span className="font-marathi">Select date / तारीख निवडा</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={spouse.dob || undefined}
                  onSelect={(date) => updateSpouse({ dob: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  captionLayout="dropdown-buttons"
                  fromYear={1940}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
            
            {spouse.dob && (
              <div className="px-3 py-2 bg-family-purple/10 rounded-lg flex items-center gap-1 text-sm whitespace-nowrap">
                <Calendar className="h-4 w-4 text-family-purple" />
                <span className="font-semibold">{age} Years</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-occupation" className="text-sm flex items-center font-marathi">
            <Briefcase className="h-4 w-4 mr-1" />
            Occupation / व्यवसाय
          </Label>
          <Select
            value={spouse.occupation}
            onValueChange={(value) => updateSpouse({ occupation: value })}
          >
            <SelectTrigger 
              id="spouse-occupation"
              className="rounded-lg text-sm transition-all-300 font-marathi"
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
          <Label htmlFor="spouse-phone" className="text-sm flex items-center font-marathi">
            <Phone className="h-4 w-4 mr-1" />
            Phone Number / फोन नंबर
          </Label>
          <Input
            id="spouse-phone"
            value={spouse.phoneNumber}
            onChange={(e) => updateSpouse({ phoneNumber: e.target.value })}
            placeholder="Enter phone number / फोन नंबर प्रविष्ट करा"
            className="rounded-lg text-sm transition-all-300 font-marathi"
            type="tel"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-grandchildren" className="text-sm flex items-center font-marathi">
            <Users className="h-4 w-4 mr-1" />
            Number of Grandchildren / नातू-नातींची संख्या
          </Label>
          <Input
            id="spouse-grandchildren"
            value={spouse.numberOfGrandchildren.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              updateSpouse({ numberOfGrandchildren: isNaN(value) ? 0 : value });
            }}
            placeholder="Number of grandchildren / नातू-नातींची संख्या"
            className="rounded-lg text-sm transition-all-300 font-marathi"
            type="number"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default SpouseDetails;
