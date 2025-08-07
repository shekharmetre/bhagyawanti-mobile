'use client'
import { useState, useEffect } from 'react';
import { Wrench, Clock, CheckCircle, Shield, ArrowRight } from 'lucide-react';

export function RepairInfoSection() {
  // Optional: Add news state or fetch from API
  const [newsItems, setNewsItems] = useState([
    { id: 1, title: 'New AI-powered diagnostics tool launched', url: '#' },
    { id: 2, title: 'Tips to keep your smartphone battery healthy', url: '#' },
    { id: 3, title: 'How certified shops ensure quality repair', url: '#' },
  ]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col gap-8">
      <header>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">How Repair Works</h2>
        <p className="text-gray-600 max-w-xl">
          A simple, transparent process to get your device repaired with confidence.
        </p>
      </header>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard icon={<Wrench className="w-8 h-8 text-blue-600" />} title="Select Device & Issue" desc="Tell us what needs fixing." />
        <StepCard icon={<Shield className="w-8 h-8 text-green-600" />} title="Choose Certified Shop" desc="Pick a trusted nearby repair center." />
        <StepCard icon={<Clock className="w-8 h-8 text-purple-600" />} title="Schedule & Confirm" desc="Select a convenient date and time." />
      </div>

      {/* Benefits */}
      <div className="flex flex-wrap gap-6 justify-start">
        <Benefit icon={<CheckCircle className="w-6 h-6 text-green-500" />} text="6 Months Warranty" />
        <Benefit icon={<Clock className="w-6 h-6 text-yellow-500" />} text="Same Day Repair Service" />
        <Benefit icon={<Shield className="w-6 h-6 text-blue-500" />} text="Certified Technicians" />
      </div>

      {/* News Section */}
      <section className="border-t pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Today’s News</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-700">
          {newsItems.map((item) => (
            <li key={item.id} className="hover:underline cursor-pointer">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title} <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StepCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string; }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow">
      <div>{icon}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function Benefit({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm min-w-[150px]">
      {icon}
      <span className="text-gray-700 font-medium text-sm">{text}</span>
    </div>
  );
}
