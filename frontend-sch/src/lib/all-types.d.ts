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

interface Staff {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileId: number;
  profile: {
    id: number;
    imageUrl: string;
    firstName: string;
    lastName: string;
    qulifications: string; // This should be an array
  };
}

type Class = {
  id: number;
  name: string;
  teacherId: string;
  teacher: {
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
