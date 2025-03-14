
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/lib/export';
import { FamilyData } from '@/types/family';
import { toast } from 'sonner';

interface ExportButtonProps {
  familyData: FamilyData;
  isValid: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ familyData, isValid }) => {
  const handleExport = () => {
    if (!isValid) {
      toast.error('Please fill in all required fields before exporting');
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
      className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-all duration-300"
      disabled={!isValid}
    >
      <Download className="h-4 w-4" />
      <span>Export Family Data</span>
    </Button>
  );
};

export default ExportButton;
