
'use client';

export type ScheduledExam = {
  selectedClass: string;
  selectedSection: string;
  selectedSet: string;
};

export type ExamResult = {
    robotics: number; // MCQ score
    coding: number; // -1 if pending, 0 if evaluated as 0, or other score
}

const EXAMS_STORAGE_KEY = 'activeExams';
const RESULTS_STORAGE_KEY = 'examResults';
const ATTEMPTS_STORAGE_KEY = 'examAttempts';


const DEFAULT_EXAMS: ScheduledExam[] = [
    { selectedClass: '6', selectedSection: 'Daffodils', selectedSet: '4' },
    { selectedClass: '7', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '7', selectedSection: 'Daisies', selectedSet: '1' },
    { selectedClass: '8', selectedSection: 'Daffodils', selectedSet: '2' },
    { selectedClass: '8', selectedSection: 'Daisies', selectedSet: '2' },
];

const DEFAULT_RESULTS: { [studentId: string]: { [examId: string]: ExamResult } } = {
    '23': { '1': { robotics: 37, coding: 0 } },
    '27': { '1': { robotics: 48, coding: 0 } },
    '20': { '1': { robotics: 19, coding: 0 } },
    '14': { '1': { robotics: 21, coding: 0 } },
    '06': { '1': { robotics: 37, coding: 0 } },
    '18': { '1': { robotics: 35, coding: 0 } },
    '29': { '1': { robotics: 29, coding: 0 } },
    '17': { '1': { robotics: 37, coding: 0 } },
    '28': { '1': { robotics: 32, coding: 0 } },
    '15': { '1': { robotics: 29, coding: 0 } },
    '11': { '1': { robotics: 35, coding: 0 } },
    '4': { '1': { robotics: 32, coding: 0 } },
    '2': { '1': { robotics: 32, coding: 0 } },
    '25': { '1': { robotics: 27, coding: 0 } },
    '3': { '1': { robotics: 32, coding: 0 } },
    '26': { '2': { robotics: 37, coding: 0 } }, // PIVALJANGID Class 8 Daisies
    '25': { '2': { robotics: 48, coding: 0 } }, // ParthVishalMane Class 8
    '16': { '2': { robotics: 27, coding: 0 } }, // kanak shah Class 8 Daisies
    '38': { '2': { robotics: 32, coding: 0 } }, // Veer mugdiya Class 8 Daisies
    '19': { '2': { robotics: 37, coding: 0 } }, // lucky tiwari Class 8 Daisies
    '31': { '2': { robotics: 40, coding: 0 } }, // rudra tarmale Class 8 Daisies
    '20': { '2': { robotics: 29, coding: 0 } }, // mher.pokar Class 8 Daisies
    '02': { '2': { robotics: 43, coding: 0 } }, // Aditya Kumar raj Class 8 Daisies
    '27': { '2': { robotics: 27, coding: 0 } }, // Pratik Prem Kumar Class 8 Daisies
    '13': { '2': { robotics: 21, coding: 0 } }, // jalad tiwari Class 8 Daisies
    '17': { '2': { robotics: 29, coding: 0 } }, // Kashish sonawale Class 8 Daisies
    '06': { '2': { robotics: 35, coding: 0 } }, // athang koli Class 8 Daisies
    '34': { '2': { robotics: 40, coding: 0 } }, // Shriyaan Nalawade Class 8 Daisies
    '7': { '2': { robotics: 32, coding: 0 } }, // devansh koli Class 8 Daisies
    '5': { '2': { robotics: 21, coding: 0 } }, // Arnav Ashok Godambe Class 8 Daisies
    '22': { '2': { robotics: 48, coding: 0 } }, // Naitik Jaiswal Class 8 Daisies
    '39': { '2': { robotics: 40, coding: 0 } }, // Vivaan Pokar Class 8 Daisies
    '32': { '2': { robotics: 32, coding: 0 } }, // SANDEEP SETHI Class 8 Daisies
    '28': { '2': { robotics: 27, coding: 0 } }, // pratik jadhav Class 8 Daisies
    '33': { '2': { robotics: 29, coding: 0 } }, // sarah shirsat Class 8 Daisies
    '37': { '2': { robotics: 21, coding: 0 } }, // sriaadityaa kumar Class 8 Daisies
    '09': { '2': { robotics: 35, coding: 0 } }, // gauri prajapati Class 8 Daisies
    '29': { '2': { robotics: 24, coding: 0 } }, // rajpal yadav Class 8 Daisies
    '10': { '2': { robotics: 27, coding: 0 } }, // harsh pravin bhoir Class 8 Daisies
    '24': { '2': { robotics: 27, coding: 0 } }, // pari baviskar Class 8 Daisies
    '35': { '2': { robotics: 29, coding: 0 } }, // shubham raj Class 8 Daisies
    '30': { '2': { robotics: 16, coding: 0 } }, // riya helode Class 8 Daisies
    '14': { '2': { robotics: 35, coding: 0 } }, // JAY JADHAV Class 8 Daisies
    '21': { '2': { robotics: 29, coding: 0 } }, // moksh rakesh more Class 8 Daisies
    '12': { '2': { robotics: 35, coding: 0 } }, // jjjeshon rex Class 8 Daisies
    '10': { '2': { robotics: 3, coding: 0 } },  // harsh pravin bhoir Class 8 (proctored)
    '15': { '2': { robotics: 0, coding: 0 } },  // Jignesh jitendra patil Class 8 (proctored)
    '23': { '2': { robotics: 27, coding: 0 } }, // NIDHI SARMA Class 8 Daffodils
    '17': { '2': { robotics: 27, coding: 0 } }, // MANNAT KOKATE Class 8 Daffodils
    '12': { '2': { robotics: 29, coding: 0 } }, // HIND PATEL Class 8 Daffodils
    '3': { '2': { robotics: 40, coding: 0 } }, // ADVAIT MULEY Class 8 Daffodils
    '35': { '2': { robotics: 24, coding: 0 } }, // ved .mavani Class 8 Daffodils
    '11': { '2': { robotics: 32, coding: 0 } }, // Harshada Tamhane Class 8 Daffodils
    '20': { '2': { robotics: 37, coding: 0 } }, // Mishwa pokar Class 8 Daffodils
    '02': { '2': { robotics: 37, coding: 0 } }, // Adiraj Hole Class 8 Daffodils
    '38': { '2': { robotics: 29, coding: 0 } }, // vijay gupta Class 8 Daffodils
    '16': { '2': { robotics: 16, coding: 0 } }, // KRISHAY SHIVLAL MAKANI Class 8 Daffodils
    '30': { '2': { robotics: 29, coding: 0 } }, // shanttah dabhadkar Class 8 Daffodils
    '36': { '2': { robotics: 19, coding: 0 } }, // vidhyesh nikam Class 8 Daffodils
    '37': { '2': { robotics: 19, coding: 0 } }, // vidhi dhonde Class 8 Daffodils
    '22': { '2': { robotics: 37, coding: 0 } }, // MUKUND PATEL Class 8 Daffodils
    '15': { '2': { robotics: 48, coding: 0 } }, // Keren Daniel Class 8 Daffodils
    '19': { '2': { robotics: 27, coding: 0 } }, // MUJTABAKHAN Class 8 Daffodils
    '24': { '2': { robotics: 24, coding: 0 } }, // piyu.sirohi Class 8 Daffodils
    '10': { '2': { robotics: 45, coding: 0 } }, // dimple.shekhawat Class 8 Daffodils
    '5': { '2': { robotics: 24, coding: 0 } }, // ARNAV PANSARE Class 8 Daffodils
    '31': { '2': { robotics: 21, coding: 0 } }, // subhransu sahoo Class 8 Daffodils
    '13': { '2': { robotics: 27, coding: 0 } }, // janvi Singh Class 8 Daffodils
    '33': { '2': { robotics: 0, coding: 0 } }, // sujal.pandit Class 8 Daffodils
    '27': { '2': { robotics: 0, coding: 0 } }, // Rohan Saha Class 8 Daffodils
    '10': { '4': { robotics: 29, coding: 0 } }, // AYESHA.KHAN Class 6 Daffodils
    '19': { '4': { robotics: 43, coding: 0 } }, // Mishti Malviya Class 6 Daffodils
    '7': { '4': { robotics: 24, coding: 0 } }, // ARNAV SINGH Class 6 Daffodils
    '11': { '4': { robotics: 27, coding: 0 } }, // Daksh Saud Class 6 Daffodils
    '2': { '4': { robotics: 11, coding: 0 } }, // Aarush PATIL Class 6 Daffodils
    '31': { '4': { robotics: 35, coding: 0 } }, // Suhas patro Class 6 Daffodils
    '19': { '4': { robotics: 16, coding: 0 } }, // nirved nilesh bhoir Class 6 Daffodils
    '28': { '4': { robotics: 43, coding: 0 } }, // shaurya shingankar Class 6 Daffodils
    '17': { '4': { robotics: 43, coding: 0 } }, // MANEET TALAMPALLI Class 6 Daffodils
    '01': { '4': { robotics: 37, coding: 0 } }, // Aarav jadhav Class 6 Daffodils
    '33': { '4': { robotics: 32, coding: 0 } }, // Tanaswi Telange Class 6 Daffodils
    '25': { '4': { robotics: 29, coding: 0 } }, // rudraunsh agawane Class 6 Daffodils
    '36': { '4': { robotics: 13, coding: 0 } }, // Zahraa Al Friawi Class 6 Daffodils
    '24': { '4': { robotics: 32, coding: 0 } }, // Reva.Borate Class 6 Daffodils
    '29': { '4': { robotics: 19, coding: 0 } }, // Shaurya . manchgar Class 6 Daffodils
    '12': { '4': { robotics: 8, coding: 0 } }, // DHRUVIK SUMIT TAWARE Class 6 Daffodils
    '16': { '4': { robotics: 29, coding: 0 } }, // kshitij gopal tapare Class 6 Daffodils
    '22': { '4': { robotics: 27, coding: 0 } }, // raj santosh gondhale Class 6 Daffodils
    '26': { '4': { robotics: 32, coding: 0 } }, // SAKET.ISHWARDAS.NIMBARK Class 6 Daffodils
    '27': { '4': { robotics: 40, coding: 0 } }, // sayaan patel Class 6 Daffodils
    '30': { '4': { robotics: 19, coding: 0 } }, // Shourya Swapnil Barde Class 6 Daffodils
    '14': { '1': { robotics: 35, coding: 0 } }, // kinjal.pandit Class 7 Daffodils
    '22': { '1': { robotics: 29, coding: 0 } }, // Saumya chavan Class 7 Daffodils
    '31': { '1': { robotics: 48, coding: 0 } }, // VRITIKA.ZENDE Class 7 Daffodils
    '13': { '1': { robotics: 32, coding: 0 } }, // keshav jha Class 7 Daffodils
    '21': { '1': { robotics: 32, coding: 0 } }, // satyam kumar Class 7 Daffodils
    '01': { '1': { robotics: 40, coding: 0 } }, // Aadya Amit Wani Class 7 Daffodils
    '3': { '1': { robotics: 32, coding: 0 } }, // Aastha lokhande Class 7 Daffodils
    '17': { '1': { robotics: 35, coding: 0 } }, // jivika deepnarayan mishra Class 7 Daffodils
    '15': { '1': { robotics: 16, coding: 0 } }, // Merriza John Class 7 Daffodils
    '16': { '1': { robotics: 37, coding: 0 } }, // Nattansh.Nardia Class 7 Daffodils
    '19': { '1': { robotics: 40, coding: 0 } }, // Rishi Maurya Class 7 Daffodils
    '4': { '1': { robotics: 16, coding: 0 } }, // Aayansh jha Class 7 Daffodils
    '11': { '1': { robotics: 32, coding: 0 } }, // himani yogendra yadav Class 7 Daffodils
    '7': { '1': { robotics: 27, coding: 0 } }, // arpit randive Class 7 Daffodils
    '8': { '1': { robotics: 29, coding: 0 } }, // bhargav kerkar Class 7 Daffodils
    '26': { '1': { robotics: 35, coding: 0 } }, // Soham Sonawane Class 7 Daffodils
    '30': { '1': { robotics: 37, coding: 0 } }, // Vihaan Dudani Class 7 Daffodils
    '20': { '1': { robotics: 27, coding: 0 } }, // sai parkar Class 7 Daffodils
    '2': { '1': { robotics: 8, coding: 0 } }, // AALIYA ANSARI Class 7 Daffodils
};

export function storeExam(exam: ScheduledExam) {
  if (typeof window !== 'undefined') {
    const exams = getStoredExams();
    // Prevent duplicates - only one exam per class/section combo
    const existingIndex = exams.findIndex(e => e.selectedClass === exam.selectedClass && e.selectedSection === exam.selectedSection);
    if (existingIndex > -1) {
        exams[existingIndex] = exam;
    } else {
        exams.push(exam);
    }
    window.localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(exams));
  }
}

export function getStoredExams(): ScheduledExam[] {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(EXAMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_EXAMS;
  }
  return DEFAULT_EXAMS;
}


export function getExamForStudent(studentClass: string, studentSection: string): ScheduledExam | null {
    const exams = getStoredExams();
    return exams.find(e => e.selectedClass === studentClass && e.selectedSection === studentSection) || null;
}

// --- Result Management ---
function getLocalStorageResults(): { [studentId: string]: { [examId: string]: ExamResult } } {
    if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(RESULTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    return {};
}

export function storeResult(studentId: string, examId: string, result: ExamResult) {
    if (typeof window !== 'undefined') {
        const results = getLocalStorageResults();
        if (!results[studentId]) {
            results[studentId] = {};
        }
        results[studentId][examId] = result;
        window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
    }
}

export function getStoredResults(): { [studentId: string]: { [examId: string]: ExamResult } } {
    const localStorageResults = getLocalStorageResults();
    // Deep merge, with localStorageResults overriding DEFAULT_RESULTS
    const allResults = JSON.parse(JSON.stringify(DEFAULT_RESULTS));
    for (const studentId in localStorageResults) {
        if (!allResults[studentId]) {
            allResults[studentId] = {};
        }
        for (const examId in localStorageResults[studentId]) {
            allResults[studentId][examId] = localStorageResults[studentId][examId];
        }
    }
  return allResults;
}

export function getResultForStudent(studentId: string, examId: string): ExamResult | null {
    const allResults = getStoredResults();
    return allResults[studentId]?.[examId] || null;
}

// --- Attempt Management ---

function getStoredAttempts(): { [key: string]: boolean } {
    if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(ATTEMPTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    return {};
}

export function markExamAsAttempted(studentId: string, examId: string) {
    if (typeof window !== 'undefined') {
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        attempts[attemptKey] = true;
        window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    }
}

export function hasAttemptedExam(studentId: string, examId: string): boolean {
    if (typeof window !== 'undefined') {
        // An exam is considered attempted if a result exists for it (either hardcoded or in local storage).
        const result = getResultForStudent(studentId, examId);
        if (result) return true;

        // Fallback check for manually marked attempts, though the result check should be primary.
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        return attempts[attemptKey] || false;
    }
    return false;
}
