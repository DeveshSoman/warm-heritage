
import { FamilyData, Child, Grandchild } from '../types/family';
import { format } from 'date-fns';

interface ExportRow {
  [key: string]: string | number;
}

export const exportToCSV = (familyData: FamilyData): void => {
  const rows: ExportRow[] = [];
  
  // Family Head Row
  const head = familyData.familyHead;
  rows.push({
    Relationship: 'Family Head',
    Name: head.name,
    DOB: head.dob ? format(head.dob, 'yyyy-MM-dd') : '',
    Occupation: head.occupation,
    'Phone Number': head.phoneNumber,
  });
  
  // Children Rows
  familyData.children.forEach((child, childIndex) => {
    rows.push({
      Relationship: `Child ${childIndex + 1}`,
      Name: child.name,
      DOB: child.dob ? format(child.dob, 'yyyy-MM-dd') : '',
      Occupation: child.occupation,
      'Phone Number': child.phoneNumber,
      'Additional Phone Numbers': child.additionalPhoneNumbers.join(', '),
      'Marital Status': child.maritalStatus,
    });
    
    // Spouse Row (if married)
    if (child.maritalStatus === 'Married' && child.spouse) {
      rows.push({
        Relationship: `Child ${childIndex + 1}'s Spouse`,
        Name: child.spouse.name,
        DOB: child.spouse.dob ? format(child.spouse.dob, 'yyyy-MM-dd') : '',
        Occupation: child.spouse.occupation,
        'Phone Number': child.spouse.phoneNumber,
        'Number of Grandchildren': child.spouse.numberOfGrandchildren,
      });
    }
    
    // Grandchildren Rows
    child.children.forEach((grandchild, grandchildIndex) => {
      rows.push({
        Relationship: `Child ${childIndex + 1}'s Child ${grandchildIndex + 1}`,
        Name: grandchild.name,
        DOB: grandchild.dob ? format(grandchild.dob, 'yyyy-MM-dd') : '',
        Occupation: grandchild.occupation,
        'Phone Number': grandchild.phoneNumber,
      });
    });
  });
  
  // Convert to CSV
  const headers = Object.keys(rows.reduce((result, row) => {
    Object.keys(row).forEach(key => {
      result[key] = true;
    });
    return result;
  }, {} as Record<string, boolean>));
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      headers.map(header => {
        const value = row[header] !== undefined ? row[header] : '';
        // Properly escape and quote values with commas
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    )
  ].join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `family_data_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
