'use client'

import { FaLaptopCode, FaChartLine, FaBriefcase } from "react-icons/fa";

export default function IndustryTracks() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Tailored For Your Ambition</h2>
            <p className="text-slate-500 mt-2">Specialized curriculum for the most competitive industries.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Track 1: Engineering */}
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 text-2xl group-hover:scale-110 transition-transform shadow-blue-200 shadow-lg">
                    <FaLaptopCode />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Engineering</h3>
                <p className="text-slate-600 mb-4 font-medium">SWE, Data Science, AI/ML</p>
                <ul className="space-y-2 text-sm text-slate-500">
                    <li>• System Design & Architecture</li>
                    <li>• LeetCode Hard Patterns</li>
                    <li>• Full-stack Projects</li>
                </ul>
            </div>

            {/* Track 2: Finance */}
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 text-2xl group-hover:scale-110 transition-transform shadow-emerald-200 shadow-lg">
                    <FaChartLine />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Finance</h3>
                <p className="text-slate-600 mb-4 font-medium">IB, Quant, Risk Mgmt</p>
                <ul className="space-y-2 text-sm text-slate-500">
                    <li>• Financial Modeling (DCF, LBO)</li>
                    <li>• Market Sizing Cases</li>
                    <li>• Stock Pitching</li>
                </ul>
            </div>

            {/* Track 3: Business */}
            <div className="p-8 rounded-3xl bg-purple-50 border border-purple-100 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 text-2xl group-hover:scale-110 transition-transform shadow-purple-200 shadow-lg">
                    <FaBriefcase />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Business</h3>
                <p className="text-slate-600 mb-4 font-medium">Consulting, Product Mgmt</p>
                <ul className="space-y-2 text-sm text-slate-500">
                    <li>• Product Sense & Strategy</li>
                    <li>• Management Consulting Cases</li>
                    <li>• Stakeholder Management</li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
}