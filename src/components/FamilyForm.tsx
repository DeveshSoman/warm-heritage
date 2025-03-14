
import React, { useState } from 'react';
import { FamilyData, FamilyHead, Child } from '@/types/family';
import FamilyHeadComponent from './FamilyHead';
import ChildrenSection from './ChildrenSection';
import ExportButton from './ExportButton';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Save } from 'lucide-react';

const initialFamilyData: FamilyData = {
  familyHead: {
    name: '',
    dob: null,
    occupation: '',
    phoneNumber: ''
  },
  children: []
};

const FamilyForm: React.FC = () => {
  const [familyData, setFamilyData] = useState<FamilyData>(initialFamilyData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const updateFamilyHead = (updatedHead: Partial<FamilyHead>) => {
    // Convert name to uppercase if it's a string
    const processedUpdate = { ...updatedHead };
    if (typeof processedUpdate.name === 'string') {
      processedUpdate.name = processedUpdate.name.toUpperCase();
    }
    
    setFamilyData({
      ...familyData,
      familyHead: {
        ...familyData.familyHead,
        ...processedUpdate
      }
    });
  };
  
  const updateChild = (index: number, updatedChild: Partial<Child>) => {
    const processedUpdate = { ...updatedChild };
    
    // Convert name and other text fields to uppercase
    if (typeof processedUpdate.name === 'string') {
      processedUpdate.name = processedUpdate.name.toUpperCase();
    }
    
    // Process spouse name if provided
    if (processedUpdate.spouse && typeof processedUpdate.spouse.name === 'string') {
      processedUpdate.spouse = {
        ...processedUpdate.spouse,
        name: processedUpdate.spouse.name.toUpperCase()
      };
    }
    
    const newChildren = [...familyData.children];
    newChildren[index] = {
      ...newChildren[index],
      ...processedUpdate
    };
    
    setFamilyData({
      ...familyData,
      children: newChildren
    });
  };
  
  const addChild = () => {
    setFamilyData({
      ...familyData,
      children: [
        ...familyData.children,
        {
          name: '',
          dob: null,
          occupation: '',
          phoneNumber: '',
          additionalPhoneNumbers: [],
          maritalStatus: 'Unmarried',
          children: []
        }
      ]
    });
    
    toast('Child added successfully', {
      description: 'Please fill in the required details',
    });
  };
  
  const removeChild = (index: number) => {
    const newChildren = [...familyData.children];
    newChildren.splice(index, 1);
    setFamilyData({
      ...familyData,
      children: newChildren
    });
    
    toast('Child removed successfully', {
      description: 'The child has been removed from your family data',
    });
  };
  
  const validateFamilyData = (): boolean => {
    // Check if family head has all required fields
    if (
      !familyData.familyHead.name ||
      !familyData.familyHead.dob ||
      !familyData.familyHead.occupation ||
      !familyData.familyHead.phoneNumber
    ) {
      return false;
    }
    
    // Check if all children have required fields
    for (const child of familyData.children) {
      if (
        !child.name ||
        !child.dob ||
        !child.occupation ||
        !child.phoneNumber
      ) {
        return false;
      }
      
      // If married, check spouse details
      if (child.maritalStatus === 'Married' && child.spouse) {
        if (!child.spouse.name) {
          return false;
        }
      }
      
      // Check all grandchildren if they exist
      for (const grandchild of child.children) {
        if (!grandchild.name || !grandchild.dob) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  const handleSubmit = () => {
    if (validateFamilyData()) {
      toast.success('Form submitted successfully', {
        description: 'Your family data has been processed',
      });
      setFormSubmitted(true);
    } else {
      toast.error('Please fill in all required fields', {
        description: 'All fields marked with * are mandatory',
      });
    }
  };
  
  return (
    <div className="container px-4 mx-auto mb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary font-marathi">
          Family Data Form / कुटुंब माहिती फॉर्म
        </h1>
        
        <div className="mb-8">
          <FamilyHeadComponent
            familyHead={familyData.familyHead}
            updateFamilyHead={updateFamilyHead}
          />
        </div>
        
        <div className="mb-8">
          <ChildrenSection
            children={familyData.children}
            updateChild={updateChild}
            addChild={addChild}
            removeChild={removeChild}
          />
        </div>
        
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button 
            onClick={handleSubmit}
            className="bg-family-green hover:bg-family-green/80 text-white flex items-center gap-2"
            size="lg"
          >
            <Save className="h-5 w-5" />
            <span className="font-marathi">Submit Form / फॉर्म सबमिट करा</span>
          </Button>
          
          <ExportButton
            familyData={familyData}
            isValid={validateFamilyData()}
            formSubmitted={formSubmitted}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
