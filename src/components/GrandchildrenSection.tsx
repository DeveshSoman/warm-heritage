
import React from 'react';
import { Grandchild, OccupationType } from '@/types/family';
import { Calendar, Briefcase, Phone, Baby, Plus, Trash2 } from 'lucide-react';
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

interface GrandchildrenSectionProps {
  grandchildren: Grandchild[];
  updateGrandchild: (index: number, updatedGrandchild: Partial<Grandchild>) => void;
  addGrandchild: () => void;
  removeGrandchild: (index: number) => void;
}

const GrandchildrenSection: React.FC<GrandchildrenSectionProps> = ({ 
  grandchildren, 
  updateGrandchild, 
  addGrandchild, 
  removeGrandchild 
}) => {
  const occupationOptions: OccupationType[] = ['Salaried', 'Business', 'Housewife', 'Retired'];

  if (grandchildren.length === 0) {
    return (
      <div className="ml-8 mt-2 border-l-2 border-family-green/30 pl-6 pb-4 animate-fade-in">
        <Button
          variant="outline"
          onClick={addGrandchild}
          className="flex items-center gap-2 text-sm mt-2 border-dashed border-family-green hover:bg-family-green/10 transition-all-300 font-marathi"
        >
          <Plus className="h-3 w-3" />
          Add Grandchild / नातवंड जोडा
        </Button>
      </div>
    );
  }
  
  return (
    <div className="ml-8 mt-2 border-l-2 border-family-green/30 pl-6 pb-4 animate-fade-in">
      <div className="flex items-center mb-3 space-x-2">
        <div className="h-6 w-6 rounded-full bg-family-green/30 flex items-center justify-center">
          <Baby className="h-3 w-3 text-primary" />
        </div>
        <h3 className="text-md font-medium">Grandchildren</h3>
      </div>
      
      {grandchildren.map((grandchild, index) => (
        <div key={index} className="mb-4 p-3 rounded-lg bg-family-green/5 border border-family-green/20 animate-slide-up">
          <div className="flex justify-between items-center mb-2">
            <div className="chip px-2 py-0.5 bg-family-green/20 text-xs rounded-full">
              Grandchild {index + 1}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeGrandchild(index)}
              className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-all-300"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor={`grandchild-${index}-name`} className="text-xs">Name</Label>
              <Input
                id={`grandchild-${index}-name`}
                value={grandchild.name}
                onChange={(e) => updateGrandchild(index, { name: e.target.value })}
                placeholder="Enter name / नाव प्रविष्ट करा"
                className="rounded-lg text-sm h-8 transition-all-300 font-marathi"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor={`grandchild-${index}-dob`} className="text-xs">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-8 justify-start text-left font-normal text-sm rounded-lg transition-all-300",
                      !grandchild.dob && "text-muted-foreground font-marathi"
                    )}
                  >
                    <Calendar className="mr-2 h-3 w-3" />
                    {grandchild.dob ? (
                      format(grandchild.dob, "PPP")
                    ) : (
                      <span>Select date / तारीख निवडा</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={grandchild.dob || undefined}
                    onSelect={(date) => updateGrandchild(index, { dob: date })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor={`grandchild-${index}-occupation`} className="text-xs flex items-center">
                <Briefcase className="h-3 w-3 mr-1" />
                Occupation
              </Label>
              <Select
                value={grandchild.occupation}
                onValueChange={(value) => updateGrandchild(index, { occupation: value })}
              >
                <SelectTrigger 
                  id={`grandchild-${index}-occupation`}
                  className="rounded-lg text-sm h-8 transition-all-300 font-marathi"
                >
                  <SelectValue placeholder="Select occupation / व्यवसाय निवडा" />
                </SelectTrigger>
                <SelectContent>
                  {occupationOptions.map((option) => (
                    <SelectItem key={option} value={option} className="font-marathi text-sm">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor={`grandchild-${index}-phone`} className="text-xs flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                Phone Number
              </Label>
              <Input
                id={`grandchild-${index}-phone`}
                value={grandchild.phoneNumber}
                onChange={(e) => updateGrandchild(index, { phoneNumber: e.target.value })}
                placeholder="Enter phone number / फोन नंबर प्रविष्ट करा"
                className="rounded-lg text-sm h-8 transition-all-300 font-marathi"
                type="tel"
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addGrandchild}
        className="flex items-center gap-2 text-sm mt-2 border-dashed border-family-green hover:bg-family-green/10 transition-all-300 font-marathi"
      >
        <Plus className="h-3 w-3" />
        Add Another Grandchild / आणखी नातवंड जोडा
      </Button>
    </div>
  );
};

export default GrandchildrenSection;
