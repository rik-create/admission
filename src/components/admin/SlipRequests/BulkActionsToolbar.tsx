// BulkActionsToolbar.tsx
import React from 'react';

interface BulkActionsToolbarProps {
    selectedCount: number;
    onApproveAll: () => void;
    onRejectAll: (reason: string) => void;
}

const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({ selectedCount, onApproveAll, onRejectAll }) => {
    return (
        <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div>
                {selectedCount} items selected
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onApproveAll}>
                    Approve All
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => {
                    const reason = prompt("Enter rejection reason:");
                    if (reason) {
                        onRejectAll(reason);
                    }
                }}>
                    Reject All
                </button>
            </div>
        </div>
    );
};

export default BulkActionsToolbar;