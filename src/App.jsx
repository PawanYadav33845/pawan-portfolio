import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Code2, Award, Terminal, GraduationCap, User, Download, 
  ShieldCheck, Database, Cpu, ExternalLink, RefreshCw, Search, Filter, Sparkles, 
  CheckCircle2, Globe, Layers, Lock, FolderGit2, ChevronRight, BookOpen, Star, GitFork
} from 'lucide-react';

export default function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('updated');
  const [selectedCert, setSelectedCert] = useState(null);

  // Resume Projects Data from PDF
  const resumeProjects = [
    {
      id: 'replica-churn-engine',
      title: 'Replica Churn Engine',
      timeline: '2026',
      githubUrl: 'https://github.com/PawanYadav33845/replica-churn-engine',
      liveUrl: '#',
      summary: 'Developed a predictive analytical engine utilizing Python and machine learning paradigms to model and identify user churn patterns.',
      highlights: [
        'Designed modular data processing pipelines to analyze behavioral metrics, extract actionable insights, and optimize retention strategies.',
        'Leveraged advanced data structuring techniques to handle datasets efficiently and output accurate predictive visualizations.'
      ],
      tech: ['Python', 'Machine Learning', 'Data Pipelines', 'Predictive Modeling']
    },
    {
      id: 'portvision',
      title: 'PortVision — Asynchronous Reconnaissance Engine',
      timeline: '2026',
      githubUrl: 'https://github.com/PawanYadav33845/PortVision',
      liveUrl: '#',
      summary: 'Engineered a comprehensive port scanning and network reconnaissance tool tailored for vulnerability assessment and penetration testing (VAPT) workflows.',
      highlights: [
        'Implemented robust service enumeration capabilities to identify active endpoints, open ports, and potential attack vectors.',
        'Focused on adherence to standard network security principles to assist in identifying and mitigating system vulnerabilities.'
      ],
      tech: ['Python', 'Asyncio', 'VAPT', 'Port Scanning', 'Network Recon']
    },
    {
      id: 'face-hit',
      title: 'Face Hit — Interactive AI Game',
      timeline: 'Dec 2023 - Mar 2024',
      githubUrl: 'https://github.com/PawanYadav33845/facehit',
      liveUrl: 'https://pawanyadav33845.github.io/facehit/',
      summary: 'Developed an interactive web-based game integrating real-time facial recognition capabilities via machine learning APIs.',
      highlights: [
        'Engineered the front-end architecture using HTML, CSS, and JavaScript to track the user’s facial movements as dynamic in-game pointers.',
        'Implemented local storage solutions to persistently track and optimize high-score data management.'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Facial Recognition API', 'Local Storage']
    },
    {
      id: 'keylogger',
      title: 'Keylogger Diagnostic Tool (Cybersecurity)',
      timeline: 'June 2023 - Sept 2023',
      githubUrl: 'https://github.com/PawanYadav33845/basic-keylooger',
      liveUrl: '#',
      summary: 'Programmed a foundational Python-based keylogging script using the pynput library to monitor and record keystroke events.',
      highlights: [
        'Integrated automated chronological logging utilizing the datetime module to capture exact input timestamps.',
        'Configured automated SMTP functionality to securely format and transmit the generated log files via email for remote monitoring.'
      ],
      tech: ['Python', 'pynput', 'datetime', 'smtplib', 'Network Protocols']
    }
  ];

  // Certifications from Resume PDF
  const certifications = [
    {
      id: 'cert-java',
      title: 'Java Programming',
      issuer: 'Coursera',
      icon: '☕',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      skills: ['Object-Oriented Programming', 'Data Structures', 'Java Core', 'Exception Handling'],
      description: 'Mastered core Java syntax, object-oriented software design principles, class hierarchies, and robust exception handling for modular applications.'
    },
    {
      id: 'cert-python',
      title: 'Programming in Python',
      issuer: 'Coursera',
      icon: '🐍',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      skills: ['Python 3', 'Scripting & Automation', 'File I/O', 'Data Processing'],
      description: 'Acquired practical proficiency in writing clean Python code, developing automated scripts, socket communications, and manipulating data structures.'
    },
    {
      id: 'cert-dsa',
      title: 'Data Structures',
      issuer: 'Coursera',
      icon: '⚡',
      color: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/30',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      skills: ['Arrays & Linked Lists', 'Trees & Graphs', 'Algorithm Complexity', 'Sorting & Searching'],
      description: 'In-depth study of memory efficiency, computational complexity, dynamic data storage structures, and algorithmic optimizations.'
    },
    {
      id: 'cert-nosql',
      title: 'Introduction to NoSQL Databases',
      issuer: 'Coursera',
      icon: '🍃',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      skills: ['MongoDB', 'Document Databases', 'JSON/BSON', 'NoSQL Queries'],
      description: 'Gained expertise in non-relational database architecture, document modelling, CRUD operations in MongoDB, and high-scalability data persistence.'
    },
    {
      id: 'cert-networking',
      title: 'Networking and Web Technology',
      issuer: 'Infosys Springboard',
      icon: '🌐',
      color: 'from-cyan-500/20 to-sky-500/20',
      borderColor: 'border-cyan-500/30',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      skills: ['Computer Networks', 'OSI & TCP/IP Stack', 'HTTP/HTTPS Protocols', 'Network Security'],
      description: 'Comprehensive certification covering network topology, packet routing, socket programming, web client-server protocols, and security fundamentals.'
    }
  ];

  // Skills Grouped as per Resume PDF
  const skillsMatrix = [
    {
      category: 'Programming Languages',
      icon: Code2,
      skills: [
        { name: 'Python', tag: 'Primary' },
        { name: 'Java', tag: 'Core' },
        { name: 'SQL', tag: 'Database' },
        { name: 'JavaScript', tag: 'Web' }
      ]
    },
    {
      category: 'Core CS Fundamentals',
      icon: Cpu,
      skills: [
        { name: 'Data Structures & Algorithms (DSA)', tag: 'Core' },
        { name: 'Object-Oriented Programming (OOP)', tag: 'Core' },
        { name: 'Database Management Systems (DBMS)', tag: 'Core' },
        { name: 'Computer Networks', tag: 'Core' }
      ]
    },
    {
      category: 'Cybersecurity & Networking',
      icon: ShieldCheck,
      skills: [
        { name: 'Network Security', tag: 'Security' },
        { name: 'Vulnerability Assessment (VAPT)', tag: 'VAPT' },
        { name: 'Port Scanning', tag: 'Recon' },
        { name: 'OWASP Basics', tag: 'AppSec' }
      ]
    },
    {
      category: 'Tools & Technologies',
      icon: Layers,
      skills: [
        { name: 'Git / GitHub', tag: 'VCS' },
        { name: 'React Native', tag: 'Mobile' },
        { name: 'Machine Learning (Basics)', tag: 'AI/ML' },
        { name: 'Docker (Familiarity)', tag: 'DevOps' }
      ]
    },
    {
      category: 'Databases',
      icon: Database,
      skills: [
        { name: 'MySQL', tag: 'Relational' },
        { name: 'MongoDB', tag: 'NoSQL' }
      ]
    }
  ];

  // Fetch Public Repos Function
  const fetchGitHubRepos = () => {
    setRefreshing(true);
    fetch('https://api.github.com/users/PawanYadav33845/repos?per_page=100&sort=updated')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter out forks if desired or show all public repos
          const publicRepos = data.filter(repo => !repo.fork && repo.visibility === 'public');
          setRepos(publicRepos);
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error('Error fetching repos:', err);
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Compute Auto-Extracted GitHub Tech Stack Breakdown
  const githubTechStats = useMemo(() => {
    const counts = {};
    repos.forEach(repo => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [repos]);

  // Unique Languages for Filter
  const availableLanguages = useMemo(() => {
    const langs = new Set(['All']);
    repos.forEach(r => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs);
  }, [repos]);

  // Filtered and Sorted Repositories
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesSearch = 
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
        
        return matchesSearch && matchesLang;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
  }, [repos, searchQuery, selectedLanguage, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      
      {/* Dynamic Atmospheric Ambient Background */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[450px] h-[450px] bg-emerald-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* HEADER HERO PANEL */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Pawan Yadav
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Available for Hire
                </span>
              </div>

              <p className="text-base sm:text-lg text-slate-300 mt-2 font-medium">
                Computer Science Engineering Graduate & Software Developer
              </p>
              
              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400 items-center">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-cyan-400" /> Noida, India</span>
                <span className="hidden sm:inline text-slate-700">•</span>
                <a href="mailto:pawanyadav33845@gmail.com" className="flex items-center gap-1.5 hover:text-indigo-400 transition"><Mail size={14} /> pawanyadav33845@gmail.com</a>
                <span className="hidden sm:inline text-slate-700">•</span>
                <span className="flex items-center gap-1.5"><Phone size={14} /> +918840069545</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <a 
                  href="https://www.linkedin.com/in/pawan-yadav-119620229/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 hover:text-indigo-300 text-indigo-400 border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1 rounded-lg font-mono text-xs transition"
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={12} />
                </a>

                <a 
                  href="https://github.com/PawanYadav33845/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 text-cyan-400 border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1 rounded-lg font-mono text-xs transition"
                >
                  <FolderGit2 size={12} />
                  <span>GitHub (@PawanYadav33845)</span>
                  <ExternalLink size={12} />
                </a>

                <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                  {repos.length > 0 ? `${repos.length} Repos Auto-Synced` : 'Syncing GitHub...'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/Pawan_Yadav_Resume.pdf" 
                download
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-5 py-3 rounded-xl transition font-medium text-sm shadow-lg shadow-indigo-600/20 w-full sm:w-auto"
              >
                <Download size={16} />
                <span>Download Resume PDF</span>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://github.com/PawanYadav33845" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-3 rounded-xl border border-slate-700 transition font-medium text-sm shadow-md w-full sm:w-auto"
              >
                <Terminal size={16} className="text-cyan-400" />
                <span>Explore Code Repos</span>
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* SUMMARY SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
        >
          <h2 className="text-xs font-mono text-indigo-400 mb-2 flex items-center gap-2 uppercase tracking-widest font-semibold">
            <User size={14} /> Executive Summary
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            An ambitious Computer Science Engineering graduate with a strong foundation in core computer science principles and a passion for technology and innovation. Eager to continuously expand my technical expertise and launch a career in the technology sector. With a focused interest in software development, artificial intelligence, and data science, I am dedicated to applying my academic training and practical experience to solve real-world challenges and deliver meaningful value to the industry.
          </p>
        </motion.section>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDEBAR: SKILLS, AUTO-TECH STACK, CERTIFICATIONS, EDUCATION */}
          <div className="space-y-6">
            
            {/* SKILLS MATRIX (UPDATED FROM RESUME PDF) */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono text-indigo-400 flex items-center gap-2 uppercase tracking-widest font-semibold">
                  <Code2 size={15} /> Verified Skills Matrix
                </h2>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Resume Specs
                </span>
              </div>

              {skillsMatrix.map((group, idx) => {
                const IconComponent = group.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                      <IconComponent size={12} className="text-indigo-400" />
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((s, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="text-xs bg-slate-950 text-slate-200 border border-slate-800 hover:border-indigo-500/40 px-2.5 py-1 rounded-md font-mono transition flex items-center gap-1"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.section>

            {/* AUTO-SYNCED GITHUB TECH BREAKDOWN */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-mono text-cyan-400 flex items-center gap-2 uppercase tracking-widest font-semibold">
                  <Sparkles size={14} /> GitHub Auto-Tech Stack
                </h2>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Live language breakdown automatically aggregated from public GitHub repositories:
              </p>
              
              <div className="space-y-2">
                {githubTechStats.map(([lang, count]) => {
                  const percentage = Math.round((count / (repos.length || 1)) * 100);
                  return (
                    <div key={lang} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {lang}
                        </span>
                        <span className="text-slate-500">{count} repo{count > 1 ? 's' : ''} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* CERTIFICATIONS (UPDATED FROM RESUME PDF) */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-mono text-amber-400 flex items-center gap-2 uppercase tracking-widest font-semibold">
                  <Award size={15} /> Certifications
                </h2>
                <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Verified
                </span>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                    className={`p-3.5 rounded-xl bg-slate-950/60 border ${cert.borderColor} hover:border-amber-400/60 transition cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{cert.icon}</span>
                        <div>
                          <h3 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition">
                            {cert.title}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            {cert.issuer}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {selectedCert === cert.id ? '[-] Less' : '[+] Details'}
                      </span>
                    </div>

                    <AnimatePresence>
                      {selectedCert === cert.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-900 space-y-2 text-xs"
                        >
                          <p className="text-slate-300 leading-relaxed text-[11px]">
                            {cert.description}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {cert.skills.map((sk) => (
                              <span key={sk} className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded font-mono">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* EDUCATION (UPDATED FROM RESUME PDF) */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <h2 className="text-xs font-mono text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-widest font-semibold">
                <GraduationCap size={15} /> Academic Education
              </h2>
              <div className="space-y-4 text-xs font-mono">
                <div className="border-l-2 border-indigo-500/50 pl-3">
                  <h3 className="font-bold text-slate-200 text-sm">Chandigarh University</h3>
                  <p className="text-slate-400 mt-0.5">Mohali, Punjab</p>
                  <p className="text-indigo-300 mt-0.5">B.E. Computer Science Engineering</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-emerald-400 font-bold">CGPA: 7.15</span>
                    <span className="text-slate-500">Grad. June 2025</span>
                  </div>
                </div>

                <div className="border-l-2 border-cyan-500/50 pl-3">
                  <h3 className="font-bold text-slate-200 text-sm">G.N. National Public School</h3>
                  <p className="text-slate-400 mt-0.5">Gorakhpur, Uttar Pradesh</p>
                  <p className="text-cyan-300 mt-0.5">Intermediate (Class XII)</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-emerald-400 font-bold">Score: 92.60%</span>
                    <span className="text-slate-500">July 2021</span>
                  </div>
                </div>

                <div className="border-l-2 border-slate-700 pl-3">
                  <h3 className="font-bold text-slate-200 text-sm">St. Anthony’s Convent School</h3>
                  <p className="text-slate-400 mt-0.5">Gorakhpur, Uttar Pradesh</p>
                  <p className="text-slate-300 mt-0.5">High School (Class X)</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-emerald-400 font-bold">Score: 91.33%</span>
                    <span className="text-slate-500">May 2019</span>
                  </div>
                </div>
              </div>
            </motion.section>

          </div>

          {/* RIGHT COLUMN: HIGHLIGHTED PROJECTS & AUTO-FETCHED GITHUB REPOSITORIES */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* FEATURED RESUME PROJECTS SHOWCASE */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
                  <Cpu className="text-indigo-400" size={20} />
                  Featured Engineering Work
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  Resume Highlights
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {resumeProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 shadow-xl relative overflow-hidden group"
                  >
                    <div 
                      onClick={() => setActiveProjectTab(activeProjectTab === project.id ? null : project.id)}
                      className="flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
                            {project.timeline}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mt-2 group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {project.summary}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 font-mono flex-shrink-0 mt-1 hover:text-indigo-300">
                        {activeProjectTab === project.id ? '[-] Hide Details' : '[+] View Specs'}
                      </span>
                    </div>

                    <AnimatePresence>
                      {activeProjectTab === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-slate-800/60 space-y-3"
                        >
                          <div>
                            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 block mb-1">Key Deliverables & Architectural Specs:</span>
                            <ul className="space-y-1.5">
                              {project.highlights.map((h, i) => (
                                <li key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                                  <span className="text-indigo-400 mt-1">•</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.map((t) => (
                                <span key={t} className="text-[10px] bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-indigo-300 font-mono">
                                  {t}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {project.githubUrl && (
                                <a 
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg transition font-mono"
                                >
                                  <span>Repository</span>
                                  <ExternalLink size={12} />
                                </a>
                              )}
                              {project.liveUrl && project.liveUrl !== '#' && (
                                <a 
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition font-mono"
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* LIVE AUTO-FETCHED GITHUB REPOSITORIES GRID */}
            <section className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* SECTION HEADER WITH LIVE REFRESH BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Terminal size={20} className="text-cyan-400" />
                    <h2 className="text-xl font-bold tracking-tight text-slate-100">Live GitHub Repositories</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Automatically fetched public repositories from <code className="text-cyan-300 font-mono">@PawanYadav33845</code>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchGitHubRepos}
                    disabled={refreshing}
                    className="inline-flex items-center gap-1.5 text-xs font-mono bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-2 rounded-xl transition disabled:opacity-50"
                    title="Re-sync public GitHub repositories"
                  >
                    <RefreshCw size={13} className={`text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
                    <span>{refreshing ? 'Syncing...' : 'Sync Repos'}</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/60 px-3 py-2 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">Auto-Fetched</span>
                  </div>
                </div>
              </div>

              {/* SEARCH & LANGUAGE FILTERS ROW */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repositories by title or description..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-mono"
                  />
                </div>

                {/* Language Filter */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mr-1">
                    <Filter size={12} /> Filter:
                  </span>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition whitespace-nowrap ${
                        selectedLanguage === lang
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* REPOSITORIES GRID */}
              {loading ? (
                <div className="py-16 text-center text-xs font-mono text-slate-400 space-y-3">
                  <RefreshCw size={24} className="mx-auto text-cyan-400 animate-spin" />
                  <p>Fetching public repositories live from GitHub API...</p>
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-slate-500 bg-slate-950/40 rounded-xl border border-slate-900">
                  No public repositories matched your search query "{searchQuery}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredRepos.map((repo) => {
                    const hasLiveDemo = repo.has_pages || repo.homepage || repo.name === 'facehit' || repo.name === 'online-examination-platform';
                    const liveDemoUrl = repo.homepage || `https://pawanyadav33845.github.io/${repo.name}/`;

                    return (
                      <motion.div
                        key={repo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition flex flex-col justify-between group shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-slate-200 text-sm truncate font-mono group-hover:text-cyan-300 transition">
                              {repo.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono flex-shrink-0">
                              {repo.stargazers_count > 0 && (
                                <span className="flex items-center gap-0.5 text-amber-400">
                                  <Star size={11} fill="currentColor" />
                                  {repo.stargazers_count}
                                </span>
                              )}
                              <span>
                                {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 mt-2 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                            {repo.description || 'Public engineering repository hosted on GitHub.'}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-900 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-cyan-400" />
                              {repo.language || 'Markdown / Config'}
                            </div>
                            <span className="text-[10px] font-mono text-slate-600 uppercase">
                              {repo.visibility}
                            </span>
                          </div>

                          {/* ACTION BUTTONS */}
                          <div className="flex items-center gap-2 w-full pt-1">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg py-2 transition font-mono"
                            >
                              <span>GitHub</span>
                              <ExternalLink size={11} />
                            </a>

                            {hasLiveDemo && (
                              <a
                                href={liveDemoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg py-2 transition font-mono"
                              >
                                <span>Live Demo</span>
                                <ExternalLink size={11} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 py-8 border-t border-slate-900 text-center text-xs font-mono text-slate-600">
        <p>© {new Date().getFullYear()} Pawan Yadav • Computer Science Engineer • Noida, India</p>
      </footer>
    </div>
  );
}