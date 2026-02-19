// Example usage inside a page
import ExExecutiveCard from "@/components/ExExecutiveCard"
import { Layout } from "@/components/layout/Layout";
import mb from "@/assets/mb.jpg"
import abu from "@/assets/IMG-20251121-WA0048 - Abubakar sadiq lawal.jpg"
import gem from "@/assets/Gemini_Generated_Image_gkf6o4gkf6o4gkf6 - umar faruq.jpg"
import law from "@/assets/IMG_1748 - Maawuya isah.jpg"
import { BookOpen,Contact } from "lucide-react";

export default function Excutive() {
  return (
   <Layout>
<section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <BookOpen className="inline-block h-4 w-4 mr-1" />
             Ex Executives of Sesa
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ask from Experienced 
              <span className="text-accent block mt-2">Students</span>
            </h1>
            <p className="text-lg text-white/80">
              Access and contact ex member of sesa and ex-executive to learn and ask question from them .
            </p>
          </div>
        </div>
      </section>
     <div className="min-h-screen bg-gray-100 p-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      
      <ExExecutiveCard
        name="Muhammad Bello"
        role="Former President"
        department="Integrated Science"
        tenure="2021/2023"
        image={mb}
        email="Muhammadbelloadam.mb@gmail.com"
        phone="07067809863"
      />

      <ExExecutiveCard
        name="Abubakar Sadiq Lawal"
        role="Former Secretary"
        department="Biology Education"
        tenure="2022/2023"
        image={abu}
        email="sadiqnasbak@gmail.com"
        phone="08138998185"
      />
      <ExExecutiveCard
        name="Umar Faruq Magaji"
        role="Former Secretary"
        department="Computer Science"
        tenure="2022/2023"
        image={gem}
        email="ufaroqmgj@gmail.com"
          phone="07033158787"
      />
      <ExExecutiveCard
        name="Ma'awuya Isah (Santiraki)"
        role="Former Secretary"
        department="Physics"
        tenure="2022/2023"
        image={law}
        email="isahmaawuya571@gmail.com"
      phone="08106160057"
      />
       <ExExecutiveCard
        name="Umar Faruq Magaji"
        role="Former Secretary"
        department="Computer Science"
        tenure="2022/2023"
        image={gem}
        email="ufaroqmgj@gmail.com"
          phone="07033158787"
      />
      <ExExecutiveCard
        name="Ma'awuya Isah (Santiraki)"
        role="Former Secretary"
        department="Physics"
        tenure="2022/2023"
        image={law}
        email="isahmaawuya571@gmail.com"
      phone="08106160057"
      />

    </div>
   </Layout>
  );
}
