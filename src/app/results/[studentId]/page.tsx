
'use client';
import Marksheet from "@/components/results/Marksheet";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Printer, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredUsers } from "@/lib/user-store";
import { getStoredExams, getResultForStudent, type ExamResult } from "@/lib/exam-store";


type MarksheetData = {
    name: string;
    rollNumber: string;
    class: string;
    section: string;
    exam: string;
    marks: ExamResult;
    totalMarks: { robotics: number; coding: number; };
}

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();
    const studentId = params.studentId as string;
    const [studentResult, setStudentResult] = useState<MarksheetData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [noResultFound, setNoResultFound] = useState(false);

    useEffect(() => {
        if (!studentId) return;

        const allUsers = getStoredUsers();
        const userForMarksheet = allUsers.find(u => u.rollNumber === studentId);
        
        if (userForMarksheet) {
            const allExams = getStoredExams();
            // Find an exam that matches the student's class and section
            const examForStudent = allExams.find(e => e.selectedClass === userForMarksheet.class && e.selectedSection === userForMarksheet.section);

            if (examForStudent) {
                 const result = getResultForStudent(userForMarksheet.rollNumber, examForStudent.selectedSet);

                if (result) {
                    setStudentResult({
                        name: userForMarksheet.name,
                        rollNumber: userForMarksheet.rollNumber,
                        class: userForMarksheet.class,
                        section: userForMarksheet.section,
                        exam: "Robotics and AI Examination 2025",
                        marks: result,
                        totalMarks: {
                            robotics: 80,
                            coding: 20
                        },
                    });
                } else {
                     setNoResultFound(true);
                }
            } else {
                 setNoResultFound(true);
            }
        } else {
            setNoResultFound(true);
        }
        setIsLoading(false);
    }, [studentId]);
    
    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><p>Loading results...</p></div>
    }

    if (noResultFound) {
        return (
             <div className="flex h-screen items-center justify-center text-center">
                <div>
                    <Alert variant="destructive" className="max-w-md">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>No Result Found</AlertTitle>
                        <AlertDescription>
                           Results for this student have not been found. This may be because the exam hasn't been attempted yet or the results are not published for their class.
                        </AlertDescription>
                    </Alert>
                     <Button asChild className="mt-4" onClick={() => router.back()}>
                        <Link href="#"><ArrowLeft className="mr-2"/> Go Back</Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (!studentResult) {
        // This case should ideally not be reached if the logic above is correct
        return <div className="flex h-screen items-center justify-center"><p>An unexpected error occurred.</p></div>
    }

    const obtainedTotal = (studentResult.marks.robotics >= 0 ? studentResult.marks.robotics : 0) + (studentResult.marks.coding >= 0 ? studentResult.marks.coding : 0);
    const maximumTotal = studentResult.totalMarks.robotics + studentResult.totalMarks.coding;
    const isCodingEvaluated = studentResult.marks.coding >= 0;

    return (
        <div className="p-4 sm:p-6 md:p-8">
             <div className="container mx-auto">
                <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => router.back()}>
                            <ArrowLeft/>
                        </Button>
                        <h1 className="font-headline text-4xl font-bold">
                            Student Marksheet
                        </h1>
                    </div>
                     <Button onClick={handlePrint}>
                        <Printer className="mr-2"/>
                        Print Marksheet
                    </Button>
                </div>
                <div className="printable-content">
                    <Marksheet 
                        studentName={studentResult.name}
                        rollNumber={studentResult.rollNumber}
                        className={studentResult.class}
                        section={studentResult.section}
                        examTitle={studentResult.exam}
                        roboticsMarks={studentResult.marks.robotics}
                        codingMarks={isCodingEvaluated ? studentResult.marks.coding : "Pending"}
                        totalObtained={obtainedTotal}
                        totalMax={maximumTotal}
                        isFinal={isCodingEvaluated}
                    />
                </div>
            </div>
        </div>
    )
}
