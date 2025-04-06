
import axios from 'axios';
import { BlogPost } from './types';

import { env } from './types';

const ERPNEXT_BASE_URL = env.ERPNEXT_API_URL;
const ERPNEXT_API_KEY = env.ERPNEXT_API_KEY;

if (!ERPNEXT_BASE_URL || !ERPNEXT_API_KEY) {
  console.error('ERPNext API configuration missing. Please check your .env file.');
}

const erpnextApi = axios.create({
  baseURL: ERPNEXT_BASE_URL,
  headers: {
    'Authorization': `token ${ERPNEXT_API_KEY}`,
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

import { journalPosts } from './data';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await erpnextApi.get('/api/resource/Blog Post');
    const apiPosts = response.data.data.map((post: any) => ({
      id: post.name,
      title: post.title,
      slug: post.name,
      excerpt: post.blog_intro || '',
      content: post.content,
      image: post.meta_image || '',
      category: post.blog_category || 'Uncategorized',
      author: post.blogger,
      publishDate: post.published_date,
      tags: post.tags || []
    }));
    
    return apiPosts.length > 0 ? apiPosts : journalPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return journalPosts; // Return demo content on error
  }
};

export const getBlogPostByName = async (name: string): Promise<BlogPost | null> => {
  try {
    const response = await erpnextApi.get(`/api/resource/Blog Post/${name}`);
    const post = response.data.data;
    return {
      id: post.name,
      title: post.title,
      slug: post.name,
      excerpt: post.blog_intro || '',
      content: post.content,
      image: post.meta_image || '',
      category: post.blog_category || 'Uncategorized',
      author: post.blogger,
      publishDate: post.published_date,
      tags: post.tags || []
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

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
