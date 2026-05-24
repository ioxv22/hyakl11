"use client";

import React from "react";
import { Calculator, Atom, Zap } from "lucide-react";

interface Formula {
  title: string;
  expression: string;
  explanation: string;
}

export function PhysicsEquationBox({ formulas }: { formulas: Formula[] }) {
  if (!formulas || formulas.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {formulas.map((formula, idx) => (
        <div 
          key={idx} 
          className="relative bg-slate-900 border border-violet-500/30 rounded-2xl p-5 overflow-hidden group hover:border-violet-500/70 transition-all duration-300"
        >
          {/* Glowing Ambient Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full group-hover:bg-violet-500/20 transition-all" />
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Atom className="text-violet-400" size={20} />
            <h3 className="text-violet-300 font-bold text-sm">{formula.title}</h3>
          </div>
          
          <div className="bg-slate-950 rounded-xl p-4 mb-3 border border-slate-800 flex items-center justify-center relative z-10 shadow-inner">
            <span className="font-mono text-lg font-semibold tracking-wider text-emerald-400 text-center" dir="ltr">
              {formula.expression}
            </span>
          </div>
          
          {formula.explanation && (
            <p className="text-slate-400 text-xs leading-relaxed relative z-10 font-medium">
              <Zap size={12} className="inline mr-1 text-emerald-500" />
              {formula.explanation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
