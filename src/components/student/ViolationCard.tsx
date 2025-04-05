// src/components/student/ViolationCard.tsx
'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "@radix-ui/react-icons"

interface Violation {
    id: string
    title: string
    date: string
  }
  
  interface ViolationCardProps {
    violations: Violation[]
  }
  
  export function ViolationCard({ violations }: ViolationCardProps) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Violation Count</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {violations.length > 0 ? (
            <>
              <div className="text-4xl font-bold text-blue-500">
                {violations.length}
              </div>
              <Button variant="link" className="text-blue-500 mt-2">
                View Details
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-black">
              <FileTextIcon className="h-8 w-8 text-gray-400" />
              <p>No violations recorded</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }