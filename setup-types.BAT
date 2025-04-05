@echo off
:: Admission Slip App Type System Setup Script
:: Creates folder structure and type definition files

SETLOCAL
SET "ROOT_DIR=src/types"
SET "SHARED_DIR=%ROOT_DIR%/shared"
SET "MODULES_DIR=%ROOT_DIR%/modules"

:: Create directory structure
mkdir "%ROOT_DIR%"
mkdir "%SHARED_DIR%"
mkdir "%MODULES_DIR%"

:: Create base type files
echo Creating base type definitions...

(
  echo // src/types/shared/base.d.ts
  echo interface User {
  echo   id: string
  echo   name: string
  echo   email: string
  echo   role: 'student' ^| 'guard' ^| 'admin'
  echo   avatar?: string
  echo   createdAt: Date
  echo }
  echo.
  echo interface Timestamped {
  echo   createdAt: Date
  echo   updatedAt: Date
  echo }
) > "%SHARED_DIR%/base.d.ts"

:: Create enums file
(
  echo // src/types/shared/enums.d.ts
  echo enum SlipStatus {
  echo   PENDING = 'pending',
  echo   APPROVED = 'approved',
  echo   REJECTED = 'rejected',
  echo   EXPIRED = 'expired'
  echo }
  echo.
  echo enum ViolationType {
  echo   LATE_ENTRY = 'late_entry',
  echo   UNAUTHORIZED_EXIT = 'unauthorized_exit',
  echo   DRESS_CODE = 'dress_code'
  echo }
  echo.
  echo enum NotificationType {
  echo   SLIP_APPROVAL = 'slip_approval',
  echo   VIOLATION_WARNING = 'violation_warning'
  echo }
) > "%SHARED_DIR%/enums.d.ts"

:: Create student types
(
  echo // src/types/modules/student.d.ts
  echo import { SlipStatus, ViolationType } from '../shared/enums'
  echo.
  echo interface Student extends User {
  echo   studentId: string
  echo   yearLevel: string
  echo   section: string
  echo   violations: Violation[]
  echo   slipHistory: AdmissionSlip[]
  echo }
  echo.
  echo interface AdmissionSlip {
  echo   id: string
  echo   reason: string
  echo   status: SlipStatus
  echo   validFrom: Date
  echo   validTo: Date
  echo   qrCode: string
  echo   rejectionReason?: string
  echo }
  echo.
  echo interface Violation {
  echo   id: string
  echo   type: ViolationType
  echo   date: Date
  echo   severity: 'low' ^| 'medium' ^| 'high'
  echo   description?: string
  echo   resolved: boolean
  echo }
) > "%MODULES_DIR%/student.d.ts"

:: Create guard types
(
  echo // src/types/modules/guard.d.ts
  echo interface ScanResult {
  echo   student: Student
  echo   slipStatus: SlipStatus
  echo   lastViolation?: Violation
  echo   isFlagged: boolean
  echo }
  echo.
  echo interface ManualEntryData {
  echo   studentId: string
  echo   slipId?: string
  echo   verificationNotes: string
  echo }
  echo.
  echo interface OfflineLog {
  echo   scans: ScanResult[]
  echo   violations: Omit^<Violation, 'id'^>[]
  echo   synced: boolean
  echo }
) > "%MODULES_DIR%/guard.d.ts"

:: Create admin types
(
  echo // src/types/modules/admin.d.ts
  echo interface SystemConfig {
  echo   defaultSlipDurationHours: number
  echo   maxViolationsBeforeManualReview: number
  echo   notificationSettings: {
  echo     email: boolean
  echo     sms: boolean
  echo     inApp: boolean
  echo   }
  echo }
  echo.
  echo interface AuditLog {
  echo   id: string
  echo   action: string
  echo   performedBy: User
  echo   performedOn: Date
  echo   details: Record^<string, unknown^>
  echo }
  echo.
  echo interface FlaggedStudent {
  echo   student: Student
  echo   reason: string
  echo   actionRequired: boolean
  echo }
) > "%MODULES_DIR%/admin.d.ts"

:: Create requests types
(
  echo // src/types/shared/requests.d.ts
  echo interface APIResponse^<T^> {
  echo   data: T
  echo   success: boolean
  echo   message?: string
  echo }
  echo.
  echo interface LoginRequest {
  echo   email: string
  echo   password: string
  echo }
  echo.
  echo interface SlipApprovalRequest {
  echo   slipId: string
  echo   approved: boolean
  echo   reason?: string
  echo }
) > "%SHARED_DIR%/requests.d.ts"

:: Create index file
(
  echo // src/types/index.ts
  echo export * from './shared/base'
  echo export * from './shared/enums'
  echo export * from './shared/requests'
  echo export * from './modules/student'
  echo export * from './modules/guard'
  echo export * from './modules/admin'
) > "%ROOT_DIR%/index.ts"

:: Create tsconfig paths (if needed)
(
  echo // Add to your tsconfig.json
  echo {
  echo   "compilerOptions": {
  echo     "paths": {
  echo       "@/*": ["./src/*"],
  echo       "@/types/*": ["./src/types/*"]
  echo     }
  echo   }
  echo }
) > "tsconfig-paths-snippet.json"

echo Type system setup complete!
echo.
echo Please review the generated files and:
echo 1. Merge tsconfig-paths-snippet.json with your tsconfig.json
echo 2. Install required dependencies:
echo    npm install @types/node --save-dev
echo    npm install typescript --save-dev
echo.
pause
