
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/lib/export';
import { FamilyData } from '@/types/family';
import { toast } from 'sonner';

interface ExportButtonProps {
  familyData: FamilyData;
  isValid: boolean;
  formSubmitted?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ familyData, isValid, formSubmitted = false }) => {
  const handleExport = () => {
    if (!isValid) {
      toast.error('Please fill in all required fields before exporting');
      return;
    }
    
    if (!formSubmitted) {
      toast.warning('Please submit the form before exporting data', {
        description: 'Click the Submit Form button first'
      });
      return;
    }
    
    try {
      exportToCSV(familyData);
      toast.success('Family data exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export family data');
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-family-blue to-primary/90 hover:opacity-90 transition-all duration-300"
      disabled={!isValid || !formSubmitted}
    >
      <Download className="h-4 w-4" />
      <span className="font-marathi">Export Family Data / कुटुंब डेटा निर्यात करा</span>
    </Button>
  );
};

export default ExportButton;
