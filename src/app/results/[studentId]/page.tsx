
'use client';
import Marksheet from "@/components/results/Marksheet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    remarks: string;
}

const getStudentRemarks = (rollNumber: string): string => {
    const remarks: { [key: string]: string } = {
      '23': "Samyak shows interest in electronics but needs more conceptual clarity. Regular revision and circuit practice will help improve performance.",
      '27': "Surabhi has a good grasp of practical components. With revision on foundational theory and HTML structure, she can achieve excellent results.",
      '20': "Rohit requires significant improvement in basic electronics. Regular revision, hands-on sessions, and guided coding practice are strongly recommended.",
      '14': "Praveensingh shows basic exposure to electronics. Focused revision on component fundamentals and practical demonstrations will improve his understanding.",
      '06': "Gauri demonstrates good understanding in several areas. With focused revision on electronics fundamentals and improved HTML structure, she can excel.",
      '18': "Rishita has a fair understanding of concepts. With focused revision on fundamentals and improved HTML structuring, she can show significant improvement.",
      '29': "Tirth needs to strengthen his fundamentals in electronics and Arduino. Regular revision, circuit-building practice, and coding exercises will help.",
      '17': "Risheesh has a good grasp of basic electronics. With improved understanding of Arduino fundamentals and better coding structure, performance can improve.",
      '28': "Sridharshan has a fair understanding of electronics. With focused revision of Arduino fundamentals and breadboard connections, his performance can improve.",
      '15': "Pruthviraj has made a sincere attempt. With regular revision and more hands-on practice, his understanding and accuracy can improve significantly.",
      '11': "Mukta has a fair understanding but needs to revise basic concepts. Coding skills are at a beginner level and require guided practice.",
      '4': "Aryan shows good practical understanding but lacks clarity in theory. Regular revision and hands-on practice are strongly recommended.",
      '2': "Aaliya has shown interest in practical wiring and motors, but foundational concepts need consistent revision and hands-on practice.",
      '25': "Shaurya demonstrates understanding in motors and wiring. Revision of core electronics theory and Arduino fundamentals is required.",
       '3': "Arnav has good practical understanding. A structured revision of fundamental electronics concepts and components is recommended.",
       '26': "Pival demonstrates good hands-on knowledge. Focused revision on electronic theory and motor functions will help improve MCQ scores.",
       '38': "Veer shows some familiarity with electronics but needs focused revision on Arduino functions, motors, and power pins.",
       '19': "Lucky should focus on Arduino, motors, diodes, and transistors for better conceptual clarity. Practical exercises will reinforce learning.",
       '31': "Rudra has a solid grasp of fundamental electronics but should focus on Arduino, motors, and transistor applications.",
       '22': "Naitik has a good understanding of core electronics concepts. With focus on Arduino-specific knowledge, he can easily achieve full marks.",
       '39': "Vivaan has a decent understanding. With focused practice on Arduino-specific knowledge and circuit components, he can improve his score.",
       '32': "Sandeep has grasped some key electronics fundamentals but needs focused practice on Arduino boards, circuit components, and their functions.",
       '33': "Sarah has foundational knowledge but needs reinforcement in circuit components, Arduino functions, and practical applications.",
       '37': "Sriaadityaa needs to strengthen foundational concepts. Practical hands-on activities are highly recommended for better understanding.",
       '09': "Gauri demonstrates good conceptual awareness but needs hands-on practice with LEDs, breadboards, motors, and Arduino to reinforce understanding.",
       '12': "Jjjeshon shows good command over hands-on electronics concepts. A focused review of Arduino board functions and motor theory will help.",
       '10': "Harsh demonstrates some understanding. Practical exercises and repeated concept revision are recommended to address misconceptions.",
       '24': "Piyu shows a basic understanding. Key concepts like motor functions, voltage specifications, and programming language need revision.",
       '35': "Shubham has a good grasp of basic concepts but needs hands-on practice and theory reinforcement to improve accuracy.",
       '30': "Riya shows basic familiarity but needs to focus on core concepts of electronics, Arduino boards, and safety practices.",
       '01': "Abhiuday shows good understanding of basic electronics and Arduino hardware. Focusing on programming language and pin functions will improve accuracy.",
       '36': "Vidhyesh needs more practice on electronics basics, especially Arduino components, breadboard usage, and motor/LED fundamentals.",
       '02': "Adiraj demonstrates a good grasp of Arduino basics and electronic components. Focusing on safety measures and programming conventions will improve scores.",
       '05': "Arnav shows partial understanding but needs careful review of basic concepts like LED safety, microcontroller specifics, and breadboard use.",
       '34': "Shriyaan demonstrates good understanding of basic concepts. Revision of Arduino basics, battery safety, and component functions is recommended.",
       '07': "Arpit shows good understanding of circuit components. Attention is needed on LED usage, motors, and Arduino concepts.",
       '08': "Bhargav demonstrates a solid grasp of key circuit elements. He needs further practice on LED properties, breadboard usage, and diode functions."
    };
    return remarks[rollNumber] || "Good effort. Keep practicing to improve further.";
};


export default function ResultPage() {
    const params = useParams();
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
                        remarks: getStudentRemarks(userForMarksheet.rollNumber)
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
                    <h2 className="text-2xl font-bold mb-4">No Result Found</h2>
                    <p className="text-muted-foreground mb-4">
                        Results for this student have not been found or the exam hasn't been attempted yet.
                    </p>
                     <Button asChild>
                        <Link href="/student/dashboard"><ArrowLeft className="mr-2"/> Back to Dashboard</Link>
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
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/student/dashboard"><ArrowLeft/></Link>
                        </Button>
                        <h1 className="font-headline text-4xl font-bold">
                            Your Result
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
                        remarks={studentResult.remarks}
                    />
                </div>
            </div>
        </div>
    )
}
