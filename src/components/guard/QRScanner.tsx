// src/components/guard/QRScanner.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

interface QRScannerProps {
  onResult: (result: string | null) => void
  torch?: boolean
  className?: string
}

export function QRScanner({ onResult, torch = false, className }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const [hasTorch, setHasTorch] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    const scanner = new QrScanner(
      videoRef.current,
      result => onResult(result.data),
      {
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        onDecodeError: (error) => {
          if (error === 'No QR code found') {
            onResult(null)
          }
        },
      }
    )

    const initializeScanner = async () => {
      try {
        await scanner.start()
        
        // Safe torch capability check
        const videoElement = scanner['$video'] as HTMLVideoElement
        const stream = videoElement.srcObject as MediaStream | null
        const videoTrack = stream?.getVideoTracks()[0]
        
        if (videoTrack) {
          try {
            // Check if torch is supported by attempting to set constraints
            await videoTrack.applyConstraints({ advanced: [{ torch: true }] as any })
            setHasTorch(true)
            if (!torch) {
              // Reset to off if not enabled
              await videoTrack.applyConstraints({ advanced: [{ torch: false }] as any })
            }
          } catch {
            // Torch not supported
            setHasTorch(false)
          }
        }
      } catch (error) {
        console.error('Scanner initialization failed:', error)
      }
    }

    scannerRef.current = scanner
    initializeScanner()

    return () => {
      const cleanup = async () => {
        if (scannerRef.current) {
          await scannerRef.current.stop()
          scannerRef.current.destroy()
          scannerRef.current = null
        }
      }
      cleanup()
    }
  }, [onResult])

  useEffect(() => {
    const toggleTorch = async () => {
      if (scannerRef.current && hasTorch) {
        const videoElement = scannerRef.current['$video'] as HTMLVideoElement
        const stream = videoElement.srcObject as MediaStream | null
        const videoTrack = stream?.getVideoTracks()[0]
        
        if (videoTrack) {
          try {
            await videoTrack.applyConstraints({
              advanced: [{ torch }] as any
            })
          } catch (error) {
            console.error('Failed to toggle torch:', error)
          }
        }
      }
    }
    toggleTorch()
  }, [torch, hasTorch])

  return <video ref={videoRef} className={className} playsInline />
}