
import axios from 'axios';

const ERPNEXT_BASE_URL = process.env.ERPNEXT_API_URL || 'https://your-erpnext-instance';

const erpnextApi = axios.create({
  baseURL: ERPNEXT_BASE_URL,
  headers: {
    'Authorization': `token ${process.env.ERPNEXT_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export interface JobOpening {
  name: string;
  job_title: string;
  department: string;
  description: string;
  status: string;
  location: string;
}

export interface ContactSubmission {
  doctype: string;
  name: string;
  email: string;
  message: string;
  subject: string;
}

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  try {
    const response = await erpnextApi.get('/api/resource/Job Opening');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching job openings:', error);
    return [];
  }
};

export const submitJobApplication = async (jobId: string, application: FormData) => {
  try {
    const response = await erpnextApi.post(`/api/resource/Job Applicant`, application);
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit application');
  }
};

export const submitContactForm = async (contact: ContactSubmission) => {
  try {
    const response = await erpnextApi.post('/api/resource/Communication', contact);
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit contact form');
  }
};
