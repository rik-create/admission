import { useEffect } from 'react'
import { useSlipRequests } from '@/context/SlipRequestsContext'
import { slipRequestsService } from '@/lib/api/slipRequests'

export function useSlipRequestsData() {
  const { fetchRequests } = useSlipRequests()

  useEffect(() => {
    const loadData = async () => {
      await fetchRequests()
    }
    loadData()
  }, [fetchRequests])

  // Add any other data fetching or processing logic here
}