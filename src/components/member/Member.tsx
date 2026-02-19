import { useState } from "react";
import { ImageCard } from "@/components/ui/ImageCard";
import { Loader2 } from "lucide-react";
import asp from "@/assets/picture/asg.png"
import ass from "@/assets/picture/ASS FIN SEC.png"
import aud from "@/assets/picture/AUDITOR.png"
import chief from "@/assets/picture/CHEIF LIB.png"
import whip from "@/assets/picture/CHEIF WHIP.png"
import clrk from "@/assets/picture/CLRK.png"
import dclrk from "@/assets/picture/D CLERK.png"
import dsenate from "@/assets/picture/DEPUTY SE.png"
import sport from "@/assets/picture/DO SPORT.png" 
import dos from "@/assets/picture/DOS.png"
import edit from "@/assets/picture/EDITOR IN CHIEF.png"
import fin from "@/assets/picture/FIN SEC.png"
import house from "@/assets/picture/HOUSE LEADER.png"
import presi from "@/assets/picture/PRESIDENT.png"
import pro from "@/assets/picture/PRO.png"
const members = [
  {
    name: "Madinatu Abubakar",
    role: "President",
    department: "Integrated Science",
    level: "400L",
    image: presi,
  },
  {
    name: "Tahir Adejare Amina",
    role: "Assistance Secretary Generale",
    department: "Computer Education",
    level: "300L",
    image: asp,
  },
  {
    name: "Augustine Emmenuel",
    role: "Assistance Financial Secretary",
    department: "Geography Education",
    level: "300L",
    image: ass,
  },
   {
    name: "Nuhu Sagir Ayuba",
    role: "Auditor General",
    department: "Integrated Science ",
    level: "300L",
    image: aud,
  },
   {
    name: "Umar Salisu Ibrahim",
    role: "Chief Liberian",
    department: "Physics Education",
    level: "300L",
    image: chief,
  },
   {
    name: "Jeminu Bilkisu Onomuel",
    role: "Chief WHIP",
    department: "Integrated Science Education",
    level: "300L",
    image: whip,
  },
   {
    name: "Ogabi Gideon Olamide",
    role: "CLERK",
    department: "Biology Education",
    level: "200L",
    image: clrk,
  },
   {
    name: "Maryam Ahmed",
    role: "Deputy CLERK",
    department: "Computer Education",
    level: "200L",
    image: dclrk,
  },
   {
    name: "Fatima Ibrahim",
    role: "Deputy Senate President",
    department: "Physics Education",
    level: "200L",
    image: dsenate,
  },
   {
    name: "Isah Abdulrahman",
    role: "Director Of Sport",
    department: "Integrated Science",
    level: "400L",
    image: sport,
  },
   {
    name: "Salami Seun Samson",
    role: "Director of Social",
    department: "Integrated Science",
    level: "300L",
    image: dos,
  },
   {
    name: "Abdulkareem Abdulrahman",
    role: "Editor In Chief",
    department: "Mathematics Education",
    level: "300L",
    image: edit,
  },
   {
    name: "Moses Milcah Magdalene ",
    role: "Financial Secretary",
    department: "Integrated Science",
    level: "400L",
    image:fin,
  },
   {
    name: "Umar Ahmed Musa",
    role: "House Leader",
    department: "Biology Education",
    level: "300L",
    image:house,
  },
   {
    name: "Aisha Faruk Usman",
    role: "P.R.O",
    department: "Chemistry Education",
    level: "300L",
    image: pro,
  },
   {
    name: "Augustine Emmenuel",
    role: "Assistance Financial Secretary",
    department: "Geography Education",
    level: "300L",
    image: pro,
  },
   {
    name: "Augustine Emmenuel",
    role: "Assistance Financial Secretary",
    department: "Geography Education",
    level: "300L",
    image: ass,
  },
  // add 15+ members easily
];

export default function Member() {
  const ITEMS_PER_LOAD = 10;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 600);
  };

  return (
    <section className="px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Science Education <span className="text-green-800"> Team and Member</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {members.slice(0, visibleCount).map((member, index) => (
          <ImageCard key={index} member={member} />
        ))}
      </div>

      {/* Load More */}
      {visibleCount < members.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-md bg-green-800 text-white font-medium hover:bg-black disabled:opacity-60 transition"
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}
