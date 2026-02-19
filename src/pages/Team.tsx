import { Layout } from '@/components/layout/Layout'
import Member from '@/components/member/Member'
import React from 'react'

function Team() {
  return (
    <div>
        <Layout>
            {/* section of the pages */}
              <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
               SESA Team
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Member and Team of 
              <span className="text-accent block mt-2">Science Education</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              The Science Education Team at Ahmadu Bello University, Zaria, is dedicated 
              to advancing science education through knowledge, research, and innovation.
            </p>
          </div>
        </div>
      </section>
      {/* this is the middle of the pages */}

      <Member/>
        </Layout>
    </div>
  )
}

export default Team