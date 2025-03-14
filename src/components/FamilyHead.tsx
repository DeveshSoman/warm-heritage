
import React from 'react';
import { FamilyHead as FamilyHeadType } from '@/types/family';
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

interface FamilyHeadProps {
  familyHead: FamilyHeadType;
  updateFamilyHead: (updatedHead: Partial<FamilyHeadType>) => void;
}

const FamilyHead: React.FC<FamilyHeadProps> = ({ familyHead, updateFamilyHead }) => {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-center mb-4 space-x-2">
        <div className="h-8 w-8 rounded-full bg-family-blue/30 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Family Head</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="head-name" className="flex items-center gap-1">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="head-name"
            value={familyHead.name}
            onChange={(e) => updateFamilyHead({ name: e.target.value })}
            placeholder="Enter full name"
            className="rounded-lg transition-all-300 focus:border-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="head-dob" className="flex items-center gap-1">
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-lg transition-all-300 border bg-background",
                  !familyHead.dob && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {familyHead.dob ? (
                  format(familyHead.dob, "PPP")
                ) : (
                  <span>Select date</span>
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
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="head-occupation" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 mr-1" />
            Occupation <span className="text-destructive">*</span>
          </Label>
          <Input
            id="head-occupation"
            value={familyHead.occupation}
            onChange={(e) => updateFamilyHead({ occupation: e.target.value })}
            placeholder="Enter occupation"
            className="rounded-lg transition-all-300 focus:border-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="head-phone" className="flex items-center gap-1">
            <Phone className="h-4 w-4 mr-1" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="head-phone"
            value={familyHead.phoneNumber}
            onChange={(e) => updateFamilyHead({ phoneNumber: e.target.value })}
            placeholder="Enter phone number"
            className="rounded-lg transition-all-300 focus:border-primary"
            type="tel"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyHead;
