'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLaptopCode, FaChartLine, FaBriefcase, FaCheck, // Icon ngành & Checkmark
  FaCode, FaDatabase, FaServer, FaCogs, 
  FaCalculator, FaNewspaper, FaCoffee, FaHandshake, 
  FaLightbulb, FaUsers, FaChalkboardTeacher, FaFlagCheckered, 
  FaFileContract, FaUserEdit, FaNetworkWired, FaLinkedin
} from "react-icons/fa";

// DỮ LIỆU CHI TIẾT 10 BƯỚC CHO 3 NGÀNH (Mỗi bước thêm 3 gạch đầu dòng)
const tracks = {
  engineering: [
    { 
      id: 1, title: "DSA Fundamentals", 
      desc: "Master the core building blocks of coding interviews.", 
      icon: FaCode, color: "bg-blue-500",
      details: ["Big O Notation (Time/Space Complexity)", "Arrays, Linked Lists & Hash Maps", "Two Pointers & Sliding Window"]
    },
    { 
      id: 2, title: "Language Mastery", 
      desc: "Deep dive into your primary language (Python/Java/C++).", 
      icon: FaLaptopCode, color: "bg-blue-600",
      details: ["Standard Library (STL/Collections)", "Memory Management & Pointers", "Object-Oriented Programming (OOP)"]
    },
    { 
      id: 3, title: "Project Portfolio", 
      desc: "Build full-stack applications to prove your skills.", 
      icon: FaServer, color: "bg-indigo-500",
      details: ["RESTful API Development", "Database Integration (SQL/NoSQL)", "Deploying to AWS/Vercel"]
    },
    { 
      id: 4, title: "Resume & GitHub", 
      desc: "Optimize profile for ATS and Engineering Managers.", 
      icon: FaFileContract, color: "bg-indigo-600",
      details: ["Action-Result Bullet Points (XYZ format)", "Clean Code & README on GitHub", "Highlighting Key Tech Stack"]
    },
    { 
      id: 5, title: "LeetCode Grind", 
      desc: "Solve Blind 75 & Grind 169 distinct patterns.", 
      icon: FaCogs, color: "bg-purple-500",
      details: ["Trees, Graphs (BFS/DFS)", "Dynamic Programming", "Backtracking & Recursion"]
    },
    { 
      id: 6, title: "System Design", 
      desc: "Learn to design scalable systems (HLD/LLD).", 
      icon: FaDatabase, color: "bg-purple-600",
      details: ["Load Balancing & Caching", "Database Sharding & Replication", "Microservices Architecture"]
    },
    { 
      id: 7, title: "Behavioral Prep", 
      desc: "Prepare stories for 'Tell me about a time...'", 
      icon: FaUserEdit, color: "bg-fuchsia-500",
      details: ["STAR Method (Situation, Task, Action, Result)", "Conflict Resolution Stories", "Leadership & Ownership Examples"]
    },
    { 
      id: 8, title: "Mock Interviews", 
      desc: "Peer-to-peer coding interviews practice.", 
      icon: FaNetworkWired, color: "bg-pink-500",
      details: ["Whiteboard Coding Simulation", "Thinking Aloud Technique", "Handling Edge Cases"]
    },
    { 
      id: 9, title: "Application Sprint", 
      desc: "Referral-based application strategy.", 
      icon: FaLinkedin, color: "bg-rose-500",
      details: ["Finding Recruiters on LinkedIn", "Cold Emailing Templates", "Tracking Application Pipeline"]
    },
    { 
      id: 10, title: "Offer Negotiation", 
      desc: "Negotiate Base, RSU & Sign-on Bonus.", 
      icon: FaFlagCheckered, color: "bg-red-500",
      details: ["Understanding Total Compensation (TC)", "Leveraging Competing Offers", "Communicating Value"]
    }
  ],
  finance: [
    { 
      id: 1, title: "Technical Basics", 
      desc: "Accounting, Excel shortcuts & PowerPoint mastery.", 
      icon: FaCalculator, color: "bg-emerald-500",
      details: ["3 Financial Statements Analysis", "Excel Shortcuts without Mouse", "PowerPoint Deck Formatting"]
    },
    { 
      id: 2, title: "Financial Modeling", 
      desc: "Master DCF, LBO, and Comps models.", 
      icon: FaChartLine, color: "bg-emerald-600",
      details: ["Discounted Cash Flow (DCF)", "Leveraged Buyout (LBO)", "Comparable Company Analysis"]
    },
    { 
      id: 3, title: "Market Awareness", 
      desc: "Daily market tracking & news analysis.", 
      icon: FaNewspaper, color: "bg-green-500",
      details: ["Reading WSJ/Bloomberg/FT", "Understanding Fed Policies", "Tracking Key Indices (S&P 500)"]
    },
    { 
      id: 4, title: "Networking Strategy", 
      desc: "Aggressive cold emailing & alumni outreach.", 
      icon: FaNetworkWired, color: "bg-green-600",
      details: ["Investment Banking Email Formats", "Finding Alumni on LinkedIn", "Follow-up Strategy"]
    },
    { 
      id: 5, title: "Resume Polish", 
      desc: "Format strictly to Wall Street standards.", 
      icon: FaFileContract, color: "bg-teal-500",
      details: ["WSO Resume Template", "Deal Experience Descriptions", "Quantifiable Impact Metrics"]
    },
    { 
      id: 6, title: "Coffee Chats", 
      desc: "Conduct informational interviews effectively.", 
      icon: FaCoffee, color: "bg-teal-600",
      details: ["Asking 'Smart' Questions", "Building Rapport quickly", "Asking for the Referral"]
    },
    { 
      id: 7, title: "Stock Pitch", 
      desc: "Prepare a buy/sell recommendation.", 
      icon: FaLightbulb, color: "bg-cyan-500",
      details: ["Company Overview & Thesis", "Valuation & Risks", "Catalysts for Growth"]
    },
    { 
      id: 8, title: "Behavioral Fit", 
      desc: "Perfect your 'Why Finance?' story.", 
      icon: FaUserEdit, color: "bg-cyan-600",
      details: ["'Walk me through your resume'", "'Why Investment Banking?'", "Greatest Strength/Weakness"]
    },
    { 
      id: 9, title: "Superday Prep", 
      desc: "Intensive back-to-back interview drills.", 
      icon: FaUsers, color: "bg-sky-500",
      details: ["Handling Stress Interviews", "Technical Drill 400 Questions", "Group Case Studies"]
    },
    { 
      id: 10, title: "Offer Security", 
      desc: "Navigating exploding offers & return offers.", 
      icon: FaHandshake, color: "bg-blue-500",
      details: ["Managing Exploding Offers", "Return Offer Strategy", "Networking for Exit Ops"]
    }
  ],
  business: [
    { 
      id: 1, title: "Business Acumen", 
      desc: "Understanding strategic frameworks.", 
      icon: FaBriefcase, color: "bg-amber-500",
      details: ["Porter's 5 Forces", "4Ps of Marketing", "SWOT Analysis"]
    },
    { 
      id: 2, title: "Resume & Brand", 
      desc: "Highlighting leadership & impact metrics.", 
      icon: FaFileContract, color: "bg-amber-600",
      details: ["Leadership Roles Highlight", "Consulting Resume Format", "Impact-driven Action Verbs"]
    },
    { 
      id: 3, title: "Case Interview Basics", 
      desc: "Learn profitability & market entry cases.", 
      icon: FaChalkboardTeacher, color: "bg-orange-500",
      details: ["Profitability Frameworks", "Market Entry Strategy", "M&A Cases"]
    },
    { 
      id: 4, title: "Product Sense", 
      desc: "Developing user empathy and product vision.", 
      icon: FaLightbulb, color: "bg-orange-600",
      details: ["User Persona Definition", "Pain Point Analysis", "Product Roadmap Planning"]
    },
    { 
      id: 5, title: "Mental Math", 
      desc: "Quick estimation and market sizing math.", 
      icon: FaCalculator, color: "bg-red-500",
      details: ["Market Sizing (Guesstimates)", "Breakeven Analysis", "Growth Rate Calculations"]
    },
    { 
      id: 6, title: "Networking", 
      desc: "Connecting with Consultants & PMs.", 
      icon: FaNetworkWired, color: "bg-red-600",
      details: ["Informational Interviews", "Leveraging School Alumni", "Firm-Specific Networking"]
    },
    { 
      id: 7, title: "Behavioral Stories", 
      desc: "Leadership principles & conflict resolution.", 
      icon: FaUserEdit, color: "bg-rose-500",
      details: ["McKinsey PEI Stories", "Amazon Leadership Principles", "Conflict Management"]
    },
    { 
      id: 8, title: "Mock Cases", 
      desc: "Live case practice with partners.", 
      icon: FaUsers, color: "bg-rose-600",
      details: ["Case Structuring Drills", "Chart Interpretation", "Synthesis & Recommendation"]
    },
    { 
      id: 9, title: "Slide Deck Skills", 
      desc: "Creating executive-level presentations.", 
      icon: FaLaptopCode, color: "bg-pink-500",
      details: ["Storylining & Flow", "Chart Visualization", "Executive Summary Writing"]
    },
    { 
      id: 10, title: "Final Round", 
      desc: "Partner interviews & culture fit check.", 
      icon: FaFlagCheckered, color: "bg-pink-600",
      details: ["Airport Test (Culture Fit)", "Partner-level Case Studies", "Closing Questions"]
    }
  ]
};

type TrackType = 'engineering' | 'finance' | 'business';

export default function Roadmap() {
  const [activeTrack, setActiveTrack] = useState<TrackType>('engineering');

  return (
    <section className="py-24 bg-slate-50" id="roadmap">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Select your industry to see the detailed step-by-step breakdown.</p>
        </div>

        {/* TAB CHUYỂN NGÀNH */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {/* Engineering Tab */}
          <button 
            onClick={() => setActiveTrack('engineering')}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 ${
              activeTrack === 'engineering' 
              ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
              : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FaLaptopCode /> Engineering
          </button>

          {/* Finance Tab */}
          <button 
            onClick={() => setActiveTrack('finance')}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 ${
              activeTrack === 'finance' 
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-200' 
              : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FaChartLine /> Finance
          </button>

          {/* Business Tab */}
          <button 
            onClick={() => setActiveTrack('business')}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 ${
              activeTrack === 'business' 
              ? 'bg-amber-500 text-white ring-4 ring-amber-200' 
              : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FaBriefcase /> Business
          </button>
        </div>

        {/* TIMELINE HIỂN THỊ */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          <AnimatePresence mode='wait'>
            {tracks[activeTrack].map((step, index) => (
              <motion.div
                key={`${activeTrack}-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* ICON TRÒN Ở GIỮA */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${step.color} text-white z-10`}>
                  <step.icon size={14} />
                </div>

                {/* NỘI DUNG CARD (ĐÃ NÂNG CẤP) */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-slate-800">{step.title}</h3>
                      <span className="text-3xl font-black text-slate-100 opacity-50">{`0${step.id}`.slice(-2)}</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-4">{step.desc}</p>
                  
                  {/* PHẦN CHI TIẾT MỚI THÊM */}
                  <ul className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                         <FaCheck className="text-green-500 mt-1 min-w-[12px]" size={12}/>
                         <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}