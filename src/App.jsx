import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Code2, Award, Terminal, GraduationCap, User, Download, ShieldCheck, Database, Cpu } from 'lucide-react';

export default function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProjectTab, setActiveProjectTab] = useState(null);

  const resumeProjects = [
    {
      id: 'face-hit',
      title: 'Face Hit — Interactive AI Game',
      timeline: 'Dec 2023 - Mar 2024',
      description: 'Built a basic web game using image recognition and machine learning APIs. Developed an interactive engine that maps the user\'s nose as a pointer to interact with targets on-screen.',
      challenge: 'Optimized browser frame-rate performance by minimizing heavy DOM manipulation calls during real-time image recognition stream processing.',
      impact: 'Successfully shifted state overhead off the server by implementing local storage protocols to manage high score metrics entirely on the client side.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Machine Learning API', 'Local Storage']
    },
    {
      id: 'digital-clock',
      title: 'Responsive Digital Alarm System',
      timeline: 'Nov 2023 - Jan 2024',
      description: 'Engineered a multi-feature digital clock interface tracking current time, date, and day with a fully responsive dynamic UI. Features include multiple 24-hour alarms, window alerts with notification audio, a 10-minute automated snooze cycle, and active list management options.',
      challenge: 'Designed a completely fluid UI layout where structural elements resize dynamically when the runtime container window changes shapes.',
      impact: 'Applied foundational Object-Oriented programming architectures to isolate alarm queues and background check loops seamlessly.',
      tech: ['Java', 'OOPs', 'Swing/UI Engine', 'Thread Management']
    },
    {
      id: 'keylogger',
      title: 'Keylogger Diagnostic Tool (Cybersecurity)',
      timeline: 'June 2023 - Sept 2023',
      description: 'Developed a standalone keyboard monitor script built to research hardware input hooks, logging precise alphanumeric keystrokes mapped directly to system time/date text files.',
      challenge: 'Implemented defensive error exceptions to gracefully handle sudden local network link dropouts during secure SMTP mail transfers without causing the background process to crash.',
      impact: 'Automated remote log shipping using encrypted email transmission protocols (smtplib) to safely forward intelligence to administrative mailboxes.',
      tech: ['Python', 'pynput', 'datetime', 'smtplib', 'Network Protocols']
    },
    {
      id: 'exam-platform',
      title: 'Secure Online Examination Platform',
      timeline: 'Apr 2023 - July 2023',
      description: 'Designed a sample architecture for conducting secure student assessments online, formulating dedicated, isolated portal dashboards for both students and instructors.',
      challenge: 'Mitigated cross-role data leaks by writing strict access control validation scripts for incoming HTTP session updates.',
      impact: 'Safeguarded relational user tables by mapping and storing application identities and password arrays securely inside SQL.',
      tech: ['PHP', 'JavaScript', 'SQL', 'CSS3', 'Relational Databases']
    }
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/PawanYadav33845/repos?sort=updated&per_page=6')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter(repo => !repo.fork));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-[100px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        
        {/* HEADER HERO PANEL */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Pawan Yadav
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mt-2 font-medium">Computer Science Engineering Student</p>
              
              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-400 items-center">
                <span className="flex items-center gap-1"><MapPin size={14} className="text-cyan-400" /> Noida, India</span>
                <span className="hidden md:inline text-slate-700">•</span>
                <a href="mailto:pawanyadav33845@gmail.com" className="flex items-center gap-1 hover:text-indigo-400 transition"><Mail size={14} /> pawanyadav33845@gmail.com</a>
                <span className="hidden md:inline text-slate-700">•</span>
                <span className="flex items-center gap-1"><Phone size={14} /> +918840069545</span>
                <span className="hidden md:inline text-slate-700">•</span>
                
                {/* LinkedIn Link */}
                <a 
                  href="https://www.linkedin.com/in/pawan-yadav-119620229/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-indigo-400 transition text-indigo-400 border border-indigo-500/20 bg-indigo-500/5 px-2 py-0.5 rounded font-mono text-xs"
                >
                  <span>linkedin</span>
                  <ExternalLink size={10} />
                </a>
                
                {/* GitHub Link */}
                <a 
                  href="https://github.com/PawanYadav33845/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-cyan-400 transition text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 rounded font-mono text-xs"
                >
                  <span>github</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/Pawan_Yadav_Resume.pdf" 
                download
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl transition font-medium text-sm shadow-md w-full sm:w-auto"
              >
                <Download size={16} />
                <span>Download Resume PDF</span>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://github.com/PawanYadav33845" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700/80 text-white px-5 py-3 rounded-xl border border-slate-700 transition font-medium text-sm shadow-md w-full sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span>Code Repositories</span>
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* PROFILE SUMMARY COMPONENT */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
        >
          <h2 className="text-md font-bold text-slate-300 mb-2 flex items-center gap-2 uppercase tracking-wider"><User size={16} className="text-indigo-400" /> Executive Summary</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Energetic and ambitious computer science engineering student with a strong passion for technology and innovation. Possessing a solid foundation in fundamental computer science concepts and a drive to continuously expand technical scope, I am highly committed to leveraging software engineering frameworks, artificial intelligence algorithms, and network operations practices to engineer meaningful solutions to real-world challenges.
          </p>
        </motion.section>

        {/* CORE GRID ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* SIDEBAR COL */}
          <div className="space-y-6">
            
            {/* SKILL MATRIX */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <h2 className="text-md font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><Code2 size={16} /> Skill Matrix</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-slate-500 font-mono block mb-2">LANGUAGES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'Python', 'JavaScript', 'PHP', 'SQL'].map((s) => (
                      <span key={s} className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-md font-mono">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-mono block mb-2">CORE CONCEPTS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Data Structures & Algorithms', 'OOPs', 'Computer Networks', 'Network Security'].map((s) => (
                      <span key={s} className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-mono block mb-2">DATABASES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['MySQL', 'MongoDB'].map((s) => (
                      <span key={s} className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-md font-mono">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ENGINEERING FOCUS */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <h2 className="text-md font-bold text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><Cpu size={16} /> Engineering Focus</h2>
              <div className="space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p><strong>Security Protocols:</strong> Mapped local hooks, credential sanitization, and automated network transmissions.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Database size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p><strong>Data Flow Strategy:</strong> Local system state optimization, structured text serializations, and remote relational engines.</p>
                </div>
              </div>
            </motion.section>

            {/* EDUCATION */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <h2 className="text-md font-bold text-cyan-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><GraduationCap size={16} /> Education</h2>
              <div className="space-y-4 text-xs font-mono">
                <div className="border-l-2 border-slate-800 pl-3">
                  <h3 className="font-bold text-slate-300 text-sm">Chandigarh University</h3>
                  <p className="text-slate-400 mt-0.5">B.E. Computer Science Engineering</p>
                  <p className="text-cyan-400/90 mt-1 font-semibold">CGPA: 7.15 (2021 - 2025)</p>
                </div>
                <div className="border-l-2 border-slate-800 pl-3">
                  <h3 className="font-bold text-slate-300 text-sm">G.N. National Public School</h3>
                  <p className="text-slate-400 mt-0.5">Intermediate (Gorakhpur)</p>
                  <p className="text-cyan-400/90 mt-1 font-semibold">Score: 92.60%</p>
                </div>
              </div>
            </motion.section>

            {/* CERTIFICATIONS */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl"
            >
              <h2 className="text-md font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase tracking-wider"><Award size={16} /> Certifications</h2>
              <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2">🔹 Java Programming (Coursera)</li>
                <li className="flex items-center gap-2">🔹 Programming in Python (Coursera)</li>
                <li className="flex items-center gap-2">🔹 Data Structures (Coursera)</li>
              </ul>
            </motion.section>
          </div>

          {/* MAIN CANVAS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* PROJECTS ACCORDION */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-slate-200 pl-1">Engineering Highlights</h2>
              <div className="grid grid-cols-1 gap-4">
                {resumeProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    onClick={() => setActiveProjectTab(activeProjectTab === project.id ? null : project.id)}
                    className="p-5 bg-slate-900/30 rounded-xl border border-slate-800/80 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 shadow-lg relative overflow-hidden group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 px-2 py-0.5 rounded">
                          {project.timeline}
                        </span>
                        <h3 className="text-lg font-bold text-slate-200 mt-2 group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono flex-shrink-0">
                        {activeProjectTab === project.id ? '[-] Collapse' : '[+] Technical Breakdown'}
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
                            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 block mb-0.5">Core System Architecture:</span>
                            <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-900">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-semibold block mb-0.5">Technical Engineering Challenge:</span>
                            <p className="text-xs text-slate-400 leading-relaxed">{project.challenge}</p>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-semibold block mb-0.5">Measurable Impact / Outcome:</span>
                            <p className="text-xs text-slate-400 leading-relaxed">{project.impact}</p>
                          </div>

                          <div className="pt-2">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.map((t) => (
                                <span key={t} className="text-[10px] bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-indigo-300 font-mono">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* GITHUB INTEGRATION TREE */}
            <section className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Terminal size={18} className="text-cyan-400" />
                  <h2 className="text-xl font-bold tracking-tight">Live GitHub Node Tree</h2>
                </div>
                <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/60 px-3 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">Auto-Sync</span>
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-sm text-slate-500 font-mono animate-pulse">
                  Querying production REST payload instances...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {repos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -3 }}
                      className="group p-4 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-slate-200 group-hover:text-cyan-400 text-sm truncate font-mono transition-colors">
                            {repo.name}
                          </h3>
                          <ExternalLink size={12} className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 min-h-[2rem] leading-relaxed">
                          {repo.description || 'No system description configured for this specific engineering workspace.'}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-900/60 flex justify-between items-center text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          {repo.language || 'Markdown'}
                        </span>
                        <span>⭐ {repo.stargazers_count}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}