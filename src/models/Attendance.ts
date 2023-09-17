export interface StudentAttendance{
    id?: string;
    studentId: string;
    isAttend: boolean;
    sessionDate: string;
    class: string;
    comment: string;
}