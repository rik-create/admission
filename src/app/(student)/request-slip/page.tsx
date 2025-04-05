// src/app/(student)/request-slip/page.tsx
'use client' // Add this directive at the top

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from next/router
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

export default function RequestSlipPageContent() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock auto-approval logic (replace with real implementation)
  const isAutoApproved = reason.length > 20; // Example condition

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    if (!reason || reason.length < 10) {
      toast.error('Please enter a valid reason (at least 10 characters)');
      setIsSubmitting(false);
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      setIsSubmitting(false);
      return;
    }

    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Slip request submitted successfully!');
      setTimeout(() => router.push('student_dashboard'), 2000);
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-black mb-6">Request Admission Slip</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Request
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason (e.g., medical appointment, family event)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
          {reason && reason.length < 10 && (
            <p className="mt-1 text-sm text-red-600">Reason must be at least 10 characters</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-1">Approval Status</p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isAutoApproved 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isAutoApproved ? 'Auto-approved' : 'Needs admin approval'}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}