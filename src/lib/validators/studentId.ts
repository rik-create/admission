export function validateStudentId(id: string): string | true {
    if (!/^[A-Z]{3}-\d{4}-\d{4}$/.test(id)) {
      return 'Invalid student ID format (e.g. 2000288017)'
    }
    return true
  }