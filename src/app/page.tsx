import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <>
      {/* 背景にパーティクルアニメーション */}
      <ParticleBackground />

      {/* メインコンテンツ */}
      <div className="relative z-10 grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="invisible row-start-2 flex max-w-screen-sm flex-col items-center gap-8 leading-loose sm:items-start">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec facilisis mauris.
            Suspendisse potenti. Phasellus euismod, justo eu facilisis tincidunt,
            nunc nisl aliquam eros, a bibendum sapien libero ac risus.
            Donec vel magna nec ligula vestibulum fermentum.
            Curabitur non felis nec erat tincidunt tincidunt.
            Sed vitae dui ut arcu facilisis tincidunt.
            Integer nec magna nec ligula vestibulum fermentum.
            Vivamus nec felis nec erat tincidunt tincidunt.
          </p>
        </main>
      </div>
    </>
  );
}
