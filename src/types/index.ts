export interface User {
  id: string;
  email: string;
  name: string;
  program: Program;
  deviceId: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionEndDate: Date | null;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  programId: string;
  notes: Note[];
}

export interface Note {
  id: string;
  title: string;
  description: string;
  courseId: string;
  uploadedBy: string;
  uploadDate: Date;
  fileUrl: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: 'weekly' | 'monthly';
  price: number;
  features: string[];
}

export type SubscriptionStatus = 'active' | 'expired' | 'none';