import {
  CarFront,
  Users,
  BadgeCheck,
  BriefcaseBusiness,
} from "lucide-react";

export default function Stats() {
  return (
    <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 md:grid-cols-2 xl:grid-cols-4">
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute right-1/2 top-10 h-24 w-24 translate-x-1/2 rounded-full bg-red-600/10 blur-3xl transition duration-500 group-hover:bg-red-600/20" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <BadgeCheck className="mb-5 h-6 w-6 text-red-500" />
          <h3 className="text-5xl font-extrabold tracking-tight">100%</h3>
          <p className="mt-3 text-base text-white/55">رضا العملاء</p>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute right-1/2 top-10 h-24 w-24 translate-x-1/2 rounded-full bg-red-600/10 blur-3xl transition duration-500 group-hover:bg-red-600/20" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <BriefcaseBusiness className="mb-5 h-6 w-6 text-red-500" />
          <h3 className="text-5xl font-extrabold tracking-tight">6+</h3>
          <p className="mt-3 text-base text-white/55">سنوات خبرة</p>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute right-1/2 top-10 h-24 w-24 translate-x-1/2 rounded-full bg-red-600/10 blur-3xl transition duration-500 group-hover:bg-red-600/20" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <Users className="mb-5 h-6 w-6 text-red-500" />
          <h3 className="text-5xl font-extrabold tracking-tight">800+</h3>
          <p className="mt-3 text-base text-white/55">عميل</p>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute right-1/2 top-10 h-24 w-24 translate-x-1/2 rounded-full bg-red-600/10 blur-3xl transition duration-500 group-hover:bg-red-600/20" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <CarFront className="mb-5 h-6 w-6 text-red-500" />
          <h3 className="text-5xl font-extrabold tracking-tight">1000+</h3>
          <p className="mt-3 text-base text-white/55">سيارة</p>
        </div>
      </div>
    </section>
  );
}