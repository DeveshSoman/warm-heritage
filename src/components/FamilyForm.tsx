
import React, { useState } from 'react';
import { FamilyData, FamilyHead, Child } from '@/types/family';
import FamilyHeadComponent from './FamilyHead';
import ChildrenSection from './ChildrenSection';
import ExportButton from './ExportButton';
import { toast } from 'sonner';

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
  
  const updateFamilyHead = (updatedHead: Partial<FamilyHead>) => {
    setFamilyData({
      ...familyData,
      familyHead: {
        ...familyData.familyHead,
        ...updatedHead
      }
    });
  };
  
  const updateChild = (index: number, updatedChild: Partial<Child>) => {
    const newChildren = [...familyData.children];
    newChildren[index] = {
      ...newChildren[index],
      ...updatedChild
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
    }
    
    return true;
  };
  
  return (
    <div className="container px-4 mx-auto mb-20">
      <div className="max-w-4xl mx-auto">
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
        
        <div className="mt-8 flex justify-center">
          <ExportButton
            familyData={familyData}
            isValid={validateFamilyData()}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
