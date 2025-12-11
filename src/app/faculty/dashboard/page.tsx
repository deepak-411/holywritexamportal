
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookCopy, Users } from "lucide-react";
import Link from "next/link";
import { getStoredUsers, type User } from "@/lib/user-store";

type GroupedStudents = {
  [className: string]: {
    [section: string]: User[];
  };
};

export default function FacultyDashboard() {
  const allUsers = getStoredUsers();
  const totalStudents = allUsers.length;

  const groupedStudents = allUsers.reduce((acc, user) => {
    const { class: className, section } = user;
    if (!acc[className]) {
      acc[className] = {};
    }
    if (!acc[className][section]) {
      acc[className][section] = [];
    }
    // Sort by roll number, treating roll number as a number
    acc[className][section].push(user);
    acc[className][section].sort((a, b) => parseInt(a.rollNumber) - parseInt(b.rollNumber));
    return acc;
  }, {} as GroupedStudents);

  return (
    <div className="min-h-screen flex flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-card/80 shadow-sm backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link href="/">
                       <h1 className="font-headline text-xl font-bold text-foreground">HWHS Portal</h1>
                    </Link>
                </div>
                 <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, Faculty</span>
                    <Button variant="outline" size="sm" asChild>
                       <Link href="/auth">
                         Logout
                       </Link>
                    </Button>
                </div>
            </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="container mx-auto">
                <h1 className="font-headline text-4xl font-bold mb-8">Faculty Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                            <p className="text-xs text-muted-foreground">Registered in the system</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Exams</CardTitle>
                            <CardDescription>Schedule new exams for students.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/faculty/schedule">Schedule New Exam</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">AI Evaluation Tool</CardTitle>
                            <BookCopy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <Link href="/faculty/evaluate">
                                <Button className="w-full">Evaluate Coding Submissions</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Student Directory</CardTitle>
                    <CardDescription>Browse all registered students by class and section.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {Object.keys(groupedStudents).sort().map(className => (
                        <AccordionItem key={className} value={`class-${className}`}>
                          <AccordionTrigger className="text-lg font-bold">Class {className}</AccordionTrigger>
                          <AccordionContent>
                            {Object.keys(groupedStudents[className]).sort().map(section => (
                              <div key={section} className="mb-6">
                                <h4 className="font-headline text-xl font-semibold mb-2 text-primary">{section}</h4>
                                <div className="border rounded-md">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[100px]">Roll No.</TableHead>
                                        <TableHead>Student Name</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {groupedStudents[className][section].map(student => (
                                        <TableRow key={student.rollNumber}>
                                          <TableCell className="font-medium">{student.rollNumber}</TableCell>
                                          <TableCell>{student.name}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

            </div>
        </main>
    </div>
  )
}

    
