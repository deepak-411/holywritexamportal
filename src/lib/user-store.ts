
'use client';

export type User = {
  name: string;
  rollNumber: string;
  class: string;
  section: string;
};

const USERS_STORAGE_KEY = 'hwhs_users';
const CURRENT_USER_STORAGE_KEY = 'hwhs_currentUser';

const DEFAULT_USERS: User[] = [
  // Class 6 Daffodils
  { name: 'Aarav jadhav', rollNumber: '01', class: '6', section: 'Daffodils' },
  { name: 'Aarush PATIL', rollNumber: '2', class: '6', section: 'Daffodils' },
  { name: 'ARNAV SINGH', rollNumber: '7', class: '6', section: 'Daffodils' },
  { name: 'AYESHA.KHAN', rollNumber: '10', class: '6', section: 'Daffodils' },
  { name: 'Daksh Saud', rollNumber: '11', class: '6', section: 'Daffodils' },
  { name: 'DHRUVIK SUMIT TAWARE', rollNumber: '12', class: '6', section: 'Daffodils' },
  { name: 'kshitij gopal tapare', rollNumber: '16', class: '6', section: 'Daffodils' },
  { name: 'MANEET TALAMPALLI', rollNumber: '17', class: '6', section: 'Daffodils' },
  { name: 'Mishti Malviya', rollNumber: '19', class: '6', section: 'Daffodils' },
  { name: 'nirved nilesh bhoir', rollNumber: '19', class: '6', section: 'Daffodils' },
  { name: 'raj santosh gondhale', rollNumber: '22', class: '6', section: 'Daffodils' },
  { name: 'Reva.Borate', rollNumber: '24', class: '6', section: 'Daffodils' },
  { name: 'rudraunsh agawane', rollNumber: '25', class: '6', section: 'Daffodils' },
  { name: 'SAKET.ISHWARDAS.NIMBARK', rollNumber: '26', class: '6', section: 'Daffodils' },
  { name: 'sayaan patel', rollNumber: '27', class: '6', section: 'Daffodils' },
  { name: 'shaurya shingankar', rollNumber: '28', class: '6', section: 'Daffodils' },
  { name: 'Shaurya . manchgar', rollNumber: '29', class: '6', section: 'Daffodils' },
  { name: 'Shourya Swapnil Barde', rollNumber: '30', class: '6', section: 'Daffodils' },
  { name: 'Suhas patro', rollNumber: '31', class: '6', section: 'Daffodils' },
  { name: 'Tanaswi Telange', rollNumber: '33', class: '6', section: 'Daffodils' },
  { name: 'Zahraa Al Friawi', rollNumber: '36', class: '6', section: 'Daffodils' },

  // Class 7 A
  { name: 'Rishita Singh', rollNumber: '18', class: '7', section: 'A' },

  // Class 7 Daffodils
  { name: 'Aadya Amit Wani', rollNumber: '01', class: '7', section: 'Daffodils' },
  { name: 'AALIYA ANSARI', rollNumber: '2', class: '7', section: 'Daffodils' },
  { name: 'Aastha lokhande', rollNumber: '3', class: '7', section: 'Daffodils' },
  { name: 'Aayansh jha', rollNumber: '4', class: '7', section: 'Daffodils' },
  { name: 'arpit randive', rollNumber: '7', class: '7', section: 'Daffodils' },
  { name: 'bhargav kerkar', rollNumber: '8', class: '7', section: 'Daffodils' },
  { name: 'himani yogendra yadav', rollNumber: '11', class: '7', section: 'Daffodils' },
  { name: 'keshav jha', rollNumber: '13', class: '7', section: 'Daffodils' },
  { name: 'kinjal.pandit', rollNumber: '14', class: '7', section: 'Daffodils' },
  { name: 'Merriza John', rollNumber: '15', class: '7', section: 'Daffodils' },
  { name: 'Nattansh.Nardia', rollNumber: '16', class: '7', section: 'Daffodils' },
  { name: 'jivika deepnarayan mishra', rollNumber: '17', class: '7', section: 'Daffodils' },
  { name: 'Rishi Maurya', rollNumber: '19', class: '7', section: 'Daffodils' },
  { name: 'sai parkar', rollNumber: '20', class: '7', section: 'Daffodils' },
  { name: 'satyam kumar', rollNumber: '21', class: '7', section: 'Daffodils' },
  { name: 'Saumya chavan', rollNumber: '22', class: '7', section: 'Daffodils' },
  { name: 'Soham Sonawane', rollNumber: '26', class: '7', section: 'Daffodils' },
  { name: 'Surabhi Parekh', rollNumber: '27', class: '7', section: 'Daffodils' },
  { name: 'Vihaan Dudani', rollNumber: '30', class: '7', section: 'Daffodils' },
  { name: 'VRITIKA.ZENDE', rollNumber: '31', class: '7', section: 'Daffodils' },

  // Class 7 Daisies
  { name: 'arnav parkar', rollNumber: '3', class: '7', section: 'Daisies' },
  { name: 'Aryan Nigam', rollNumber: '4', class: '7', section: 'Daisies' },
  { name: 'Gauri Chavan', rollNumber: '06', class: '7', section: 'Daisies' },
  { name: 'mukta sagar tawale', rollNumber: '11', class: '7', section: 'Daisies' },
  { name: 'PRAVEENSINGH RAO', rollNumber: '14', class: '7', section: 'Daisies' },
  { name: 'pruthviraj Patil', rollNumber: '15', class: '7', section: 'Daisies' },
  { name: 'Risheesh Kannoly', rollNumber: '17', class: '7', section: 'Daisies' },
  { name: 'ROHITSETHIYA', rollNumber: '20', class: '7', section: 'Daisies' },
  { name: 'Samyak Chaandrikapure', rollNumber: '23', class: '7', section: 'Daisies' },
  { name: 'shaurya patil', rollNumber: '25', class: '7', section: 'Daisies' },
  { name: 'shriyan.patel', rollNumber: '27', class: '7', section: 'Daisies' },
  { name: 'sridharshan', rollNumber: '28', class: '7', section: 'Daisies' },
  { name: 'tirth dhiwar', rollNumber: '29', class: '7', section: 'Daisies' },

  // Class 8 Daffodils
  { name: 'ABHIUDAY SINGH', rollNumber: '01', class: '8', section: 'Daffodils' },
  { name: 'Adiraj Hole', rollNumber: '02', class: '8', section: 'Daffodils' },
  { name: 'ADVAIT MULEY', rollNumber: '3', class: '8', section: 'Daffodils' },
  { name: 'ARNAV PANSARE', rollNumber: '5', class: '8', section: 'Daffodils' },
  { name: 'Atharv Ray', rollNumber: '06', class: '8', section: 'Daffodils' },
  { name: 'dimple.shekhawat', rollNumber: '10', class: '8', section: 'Daffodils' },
  { name: 'Harshada Tamhane', rollNumber: '11', class: '8', section: 'Daffodils' },
  { name: 'HIND PATEL', rollNumber: '12', class: '8', section: 'Daffodils' },
  { name: 'janvi Singh', rollNumber: '13', class: '8', section: 'Daffodils' },
  { name: 'Keren Daniel', rollNumber: '15', class: '8', section: 'Daffodils' },
  { name: 'KRISHAY SHIVLAL MAKANI', rollNumber: '16', class: '8', section: 'Daffodils' },
  { name: 'MANNAT KOKATE', rollNumber: '17', class: '8', section: 'Daffodils' },
  { name: 'MUJTABAKHAN', rollNumber: '19', class: '8', section: 'Daffodils' },
  { name: 'Mishwa pokar', rollNumber: '20', class: '8', section: 'Daffodils' },
  { name: 'MUKUND PATEL', rollNumber: '22', class: '8', section: 'Daffodils' },
  { name: 'NIDHI SARMA', rollNumber: '23', class: '8', section: 'Daffodils' },
  { name: 'piyu.sirohi', rollNumber: '24', class: '8', section: 'Daffodils' },
  { name: 'Rohan Saha', rollNumber: '27', class: '8', section: 'Daffodils' },
  { name: 'RUCHI RAMESH CHAUBEY', rollNumber: '28', class: '8', section: 'Daffodils' },
  { name: 'sayali sharad gund', rollNumber: '29', class: '8', section: 'Daffodils' },
  { name: 'shanttah dabhadkar', rollNumber: '30', class: '8', section: 'Daffodils' },
  { name: 'subhransu sahoo', rollNumber: '31', class: '8', section: 'Daffodils' },
  { name: 'sujal.pandit', rollNumber: '33', class: '8', section: 'Daffodils' },
  { name: 'ved .mavani', rollNumber: '35', class: '8', section: 'Daffodils' },
  { name: 'vidhyesh nikam', rollNumber: '36', class: '8', section: 'Daffodils' },
  { name: 'vidhi dhonde', rollNumber: '37', class: '8', section: 'Daffodils' },
  { name: 'vijay gupta', rollNumber: '38', class: '8', section: 'Daffodils' },
  
  // Class 8 Daisies
  { name: 'Aditya Kumar raj', rollNumber: '02', class: '8', section: 'Daisies' },
  { name: 'Arnav Ashok Godambe', rollNumber: '5', class: '8', section: 'Daisies' },
  { name: 'athang koli', rollNumber: '06', class: '8', section: 'Daisies' },
  { name: 'devansh koli', rollNumber: '7', class: '8', section: 'Daisies' },
  { name: 'gauri prajapati', rollNumber: '09', class: '8', section: 'Daisies' },
  { name: 'harsh pravin bhoir', rollNumber: '10', class: '8', section: 'Daisies' },
  { name: 'jjjeshon rex', rollNumber: '12', class: '8', section: 'Daisies' },
  { name: 'jalad tiwari', rollNumber: '13', class: '8', section: 'Daisies' },
  { name: 'JAY JADHAV', rollNumber: '14', class: '8', section: 'Daisies' },
  { name: 'jignesh jitendra patil', rollNumber: '15', class: '8', section: 'Daisies' },
  { name: 'kanak shah', rollNumber: '16', class: '8', section: 'Daisies' },
  { name: 'Kashish sonawale', rollNumber: '17', class: '8', section: 'Daisies' },
  { name: 'lucky tiwari', rollNumber: '19', class: '8', section: 'Daisies' },
  { name: 'mher.pokar', rollNumber: '20', class: '8', section: 'Daisies' },
  { name: 'moksh rakesh more', rollNumber: '21', class: '8', section: 'Daisies' },
  { name: 'Naitik Jaiswal', rollNumber: '22', class: '8', section: 'Daisies' },
  { name: 'pari baviskar', rollNumber: '24', class: '8', section: 'Daisies' },
  { name: 'ParthVishalMane', rollNumber: '25', class: '8', section: 'Daisies' },
  { name: 'PIVALJANGID', rollNumber: '26', class: '8', section: 'Daisies' },
  { name: 'Pratik Prem Kumar', rollNumber: '27', class: '8', section: 'Daisies' },
  { name: 'pratik jadhav', rollNumber: '28', class: '8', section: 'Daisies' },
  { name: 'rajpal yadav', rollNumber: '29', class: '8', section: 'Daisies' },
  { name: 'riya helode', rollNumber: '30', class: '8', section: 'Daisies' },
  { name: 'rudra tarmale', rollNumber: '31', class: '8', section: 'Daisies' },
  { name: 'SANDEEP SETHI', rollNumber: '32', class: '8', section: 'Daisies' },
  { name: 'sarah shirsat', rollNumber: '33', class: '8', section: 'Daisies' },
  { name: 'Shriyaan Nalawade', rollNumber: '34', class: '8', section: 'Daisies' },
  { name: 'shubham raj', rollNumber: '35', class: '8', section: 'Daisies' },
  { name: 'sriaadityaa kumar', rollNumber: '37', class: '8', section: 'Daisies' },
  { name: 'Veer mugdiya', rollNumber: '38', class: '8', section: 'Daisies' },
  { name: 'Vivaan Pokar', rollNumber: '39', class: '8', section: 'Daisies' },
];

// --- User Management ---

export function getStoredUsers(): User[] {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(USERS_STORAGE_KEY);
    // If local storage is empty, initialize with default users
    if (!stored || stored === '[]') {
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    // Otherwise, parse the stored users
    try {
      const parsedUsers = JSON.parse(stored);
      // A simple check to see if it's an array, could be more robust
      if(Array.isArray(parsedUsers)) {
        return parsedUsers;
      }
    } catch (e) {
      // If parsing fails, fall back to default
      return DEFAULT_USERS;
    }
  }
  return DEFAULT_USERS;
}

export function storeNewUser(user: User): boolean {
  if (typeof window !== 'undefined') {
    let users = getStoredUsers();
    // Check if user with the same roll number already exists in the same class/section
    const userExists = users.some(u => u.rollNumber === user.rollNumber && u.class === user.class && u.section === user.section);
    if (userExists) {
        return false; // Indicate that user was not added
    }
    users.push(user);
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true; // Indicate success
  }
  return false;
}

export function findUser(rollNumber: string, className: string, section: string): User | undefined {
    const users = getStoredUsers();
    // Use find to get the first match. In case of duplicates, this will be the one found.
    return users.find(u => u.rollNumber === rollNumber && u.class === className && u.section === section);
}


// --- Session Management ---

export function setCurrentUser(user: User) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const storedUser = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse current user data", e);
        return null;
      }
    }
  }
  return null;
}

export function clearCurrentUser() {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }
}

    