
import React from 'react';
import { Spouse } from '@/types/family';
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
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SpouseDetailsProps {
  spouse: Spouse;
  updateSpouse: (updatedSpouse: Partial<Spouse>) => void;
}

const SpouseDetails: React.FC<SpouseDetailsProps> = ({ spouse, updateSpouse }) => {
  return (
    <div className="ml-8 mt-4 border-l-2 border-family-purple/30 pl-6 pb-4 animate-slide-up">
      <div className="flex items-center mb-3 space-x-2">
        <div className="h-6 w-6 rounded-full bg-family-purple/30 flex items-center justify-center">
          <Heart className="h-3 w-3 text-primary" />
        </div>
        <h3 className="text-md font-medium">Spouse Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="spouse-name" className="text-sm">Name</Label>
          <Input
            id="spouse-name"
            value={spouse.name}
            onChange={(e) => updateSpouse({ name: e.target.value })}
            placeholder="Enter spouse's name"
            className="rounded-lg text-sm transition-all-300"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-dob" className="text-sm">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-sm rounded-lg transition-all-300",
                  !spouse.dob && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-3 w-3" />
                {spouse.dob ? (
                  format(spouse.dob, "PPP")
                ) : (
                  <span>Select date</span>
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
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-occupation" className="text-sm flex items-center">
            <Briefcase className="h-3 w-3 mr-1" />
            Occupation
          </Label>
          <Input
            id="spouse-occupation"
            value={spouse.occupation}
            onChange={(e) => updateSpouse({ occupation: e.target.value })}
            placeholder="Enter occupation"
            className="rounded-lg text-sm transition-all-300"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-phone" className="text-sm flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            Phone Number
          </Label>
          <Input
            id="spouse-phone"
            value={spouse.phoneNumber}
            onChange={(e) => updateSpouse({ phoneNumber: e.target.value })}
            placeholder="Enter phone number"
            className="rounded-lg text-sm transition-all-300"
            type="tel"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouse-grandchildren" className="text-sm flex items-center">
            <Users className="h-3 w-3 mr-1" />
            Number of Grandchildren
          </Label>
          <Input
            id="spouse-grandchildren"
            value={spouse.numberOfGrandchildren.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              updateSpouse({ numberOfGrandchildren: isNaN(value) ? 0 : value });
            }}
            placeholder="Number of grandchildren"
            className="rounded-lg text-sm transition-all-300"
            type="number"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default SpouseDetails;
