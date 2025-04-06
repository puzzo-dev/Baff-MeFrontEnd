import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Placeholder for your ERPNext API integration.  Replace this with your actual implementation.
const getJobOpenings = async (): Promise<JobOpening[]> => {
  //  Your ERPNext API call to fetch job openings here.  Example:
  //  const response = await fetch('/api/erpnext/hr/job-openings');
  //  const data = await response.json();
  //  return data;
  return [
    {
      title: "Senior Product Designer",
      department: "Design",
      location: "New York",
      type: "Full-time",
      description: "Help us create the next generation of tech-enhanced clothing."
    },
    {
      title: "Sustainability Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      description: "Lead our initiatives for sustainable fashion practices."
    },
    {
      title: "Frontend Developer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      description: "Build amazing user experiences for our digital platforms."
    },
    {
      title: "Fashion Technologist",
      department: "Innovation",
      location: "London",
      type: "Full-time",
      description: "Merge fashion with cutting-edge technology."
    }
  ];
};


interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobOpenings();
        setJobs(data);
      } catch (err) {
        setError('Failed to load job openings');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <div className="relative h-[50vh] overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
          alt="Team collaboration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-orbitron mb-4">Join Our Team</h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Shape the future of fashion technology with us
            </p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join us in our mission to redefine the future of fashion through technology and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-[#222222] rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{job.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {job.department}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                  {job.location}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                  {job.type}
                </span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}