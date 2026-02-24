import { Layout } from '@/components/layout/Layout'
import LecturerCard from "@/components/LecturerCard";
import { BookOpen } from 'lucide-react';
import React from 'react'
import a from "@/assets/lect/1.jpg"
import b from "@/assets/lect/2.png"
import c from "@/assets/lect/3.jpg"
import d from "@/assets/lect/4.jpg"
import e from "@/assets/lect/5.jpg"
import f from "@/assets/lect/6.jfif"
import g from "@/assets/lect/7.jpg"
import h from "@/assets/lect/8.jpg"
function Prof() {
  return (
     <>
     <Layout>

      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                    <BookOpen className="inline-block h-4 w-4 mr-1" />
                   Lecturers
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Lecturer and Deans of the 
                    <span className="text-accent block mt-2">Faculty</span>
                  </h1>
                  <p className="text-lg text-white/80">
                    Access and contact Lecturers of sesa and Dean of the Faculty to learn and ask question direct from them .
                  </p>
                </div>
              </div>
            </section>

         <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* <LecturerCard
          name="Danjuma Sunday"
          title="Lecturer"
          department="Biology Education"
          image={a}
          courses={[
            "Biology Education"
          ]}
          email="sdkurama@gmail.com"
        /> */}

         <LecturerCard
          name="Istifanus Samaila"
          title="Chief Technologists"
          department="Science Education Laboratory"
          image={b}
          email="istifanusmails@gmail.com"
        />

         <LecturerCard
          name="Dr. Mustapha Sani Bichi"
          title="Head, Physics Education Section"
          department="Physics Education"
          image={c}
          email="msbichi@abu.edu. ng"
         
        />
         <LecturerCard
          name="Dr. Janet Funke JESULOWO"
          title="HOS Integrated Science"
          department="Biology/Integrated Science."
          image={d}
          email="jjesulowo@gmail.com"
         
        />

        <LecturerCard
          name="Dr. Zaharaddeen Aliyu"
          title="Head Section"
          department="Mathematics Education"
          image={e}
          email="zaliyu@abu.edu.ng"
        />

        <LecturerCard
          name="Dr. Yusuf Feyisara Zakariya"
          title="Head of Section (CSE)"
          department="Mathematics and Computer Education"
          image={f}
          email="yfzakariya@abu.edu.ng"
        />
         <LecturerCard
          name="Dr. Muhammad Hayatu Yusuf"
          title="Head of Section"
          department="Biology Education"
          image={g}
          email="hyusuf657@gmail.com"
        />

        <LecturerCard
          name="Prof. Isa Alhaji Usman"
          title="Dean Faculty of Education Kaduna State University"
          department="Biology & Integrated science Education"
          image={h}
          email='dr.isausman@gmail.com'
        />

      </div>
    </div>
     </Layout>
     </>
  )
}

export default Prof