export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 text-sm text-red-500">من نحن</p>
          <h3 className="mb-6 text-3xl font-bold md:text-5xl">
            نساعدك تبيع سيارتك
            <br />
            بصورة أذكى وأسرع
          </h3>
        </div>

        <p className="text-lg leading-8 text-white/65">
          نحن في 3M CARS متخصصون في تصوير وتسويق السيارات باحترافية عالية،
          ونساعدك على بيع سيارتك بسرعة وبأفضل سعر من خلال محتوى احترافي وخطة
          تسويق مدروسة تستهدف المشترين المناسبين.
        </p>
      </div>
    </section>
  );
}