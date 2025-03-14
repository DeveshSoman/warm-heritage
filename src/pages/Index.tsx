
import React from 'react';
import Header from '@/components/Header';
import FamilyForm from '@/components/FamilyForm';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-family-beige to-white">
      <div className="pt-8 pb-20">
        <Header />
        <FamilyForm />
      </div>
    </div>
  );
};

export default Index;
