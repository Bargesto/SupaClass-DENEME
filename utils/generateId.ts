export function generateClassId(): string {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

export function generateStudentId(): string {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

