/**
 * @default Global type checks
 */

interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: string;
  gender: string;
  phone: string;
}

type AuthStore = {
  user: Pick<User, "email" | "id" | "name"> | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, name: string, token: string) => void;
  logout: () => void;
};

interface Semester {
  id: number;
  name: string;
  academicYear: string;
}

interface Staff {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileId: number;
  phoneNumber: string;
  classId: number;
  classes: [
    {
      id: number;
      name: string;
    }
  ];
  profile: {
    id: number;
    imageUrl: string;
    firstName: string;
    lastName: string;
    qulifications: string; // This should be an array
  };
}

interface Subjects {
  id: number;
  name: string;
  teacher: TeacherStaff;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  classId: number;
  amount: number;
  class: {
    id: number;
    name: string;
  };
  dateJoined: Date;
  marks: {
    id: number;
    score: number;
    subjectId: number;
    semesterId: number;
    addedDate: Date;
  };
  fees: {
    id: number;
    amount: number;
    subjectId: number;
    semesterId: number;
  }[];
}

type Class = {
  id: number;
  name: string;
  teacherId: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
  // subject: string;
  // students: string;
  // schedule: string;
  // status: string;
};

/**
 * @description User Types
 */
type ActiveUser = Pick<User, "email" | "id"> | null;
type LoginUser = Omit<User, "role" | "phone" | "gender" | "name" | "id">;

/**
 * @description Teaching Staff Types
 */
type TeacherStaff = Pick<Staff, Partial<Staff, "id">, "firstName", "lastName">;
type StaffTable = Pick<
  Staff,
  "id",
  "firstName",
  "lastName",
  "email",
  "classes"
>;
type StaffColumns = {
  onDelete: (teacherId: number) => void;
};
type CreateStaffForm = Pick<
  Staff,
  "email" | "firstName" | "lastName" | "phoneNumber"
>;
type UpdateStaffForm = Pick<Staff, "id"> & Partial<Staff>;

/**
 * @description Subject Types
 */
type SubjectTable = Pick<Subjects, "id" | "name" | "teacher">;
type SubjectColumns = {
  onDelete: (subjectId: number) => void;
};
type CreateSubjectForm = Pick<Subjects, "name" | Partial<Subjects, "teacher">>;
type UpdateSubjectForm = Pick<Subjects, "id"> & Partial<Subjects>;

/**
 * @description Student Types
 */
type StudentTable = Pick<
  Student,
  "id" | "firstName" | "lastName" | "gender" | "class" | "dateJoined"
>;
type StudentColumns = {
  onDelete: (studentId: number) => void;
};
type CreateStudentForm = Pick<
  Student,
  "firstName" | "lastName" | "gender" | "classId"
>;
type UpdateStudentForm = Pick<Student, "id"> & Partial<Student>;

/**
 * @description Class Types
 */
type ClassTable = Pick<
  Class,
  "id",
  "name",
  "teacher",
  Partial<Class, "teacherId">
>;
type ClassColumns = {
  onDelete: (classId: number) => void;
};
type CreateClassForm = Partial<Class, "id"> & { teacherId: number };
type UpdateClassForm = Partial<Class>;

/**
 * @description Error Type
 */
type Errors = {
  response: {
    data: {
      type?: string;
      message?: string;
      error?: string;
    };
  };
};
