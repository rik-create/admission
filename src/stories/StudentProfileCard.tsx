// StudentProfileCard.tsx
import React from 'react';

export interface StudentProfileCardProps {
    name: string;
    studentId: string;
    yearLevel: string;
    section: string;
    slipStatus: 'active' | 'expired' | 'none' | 'pending';
  }
  
const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ 
  name, 
  studentId, 
  yearLevel, 
  section, 
  slipStatus 
}) => {
  return (
    <div style={styles.card}>
      <h3>{name}</h3>
      <p><strong>Student ID:</strong> {studentId}</p>
      <p><strong>Year Level:</strong> {yearLevel}</p>
      <p><strong>Section:</strong> {section}</p>
      <p><strong>Slip Status:</strong> <span style={{ color: slipStatus === 'active' ? 'green' : 'red' }}>{slipStatus}</span></p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    textAlign: 'center' as 'center',
  },
};

export default StudentProfileCard;
