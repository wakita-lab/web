import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <>
      {/* 背景にパーティクルアニメーション */}
      <ParticleBackground />

      {/* メインコンテンツ */}
      <div className="relative z-10 grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex max-w-screen-sm flex-col items-center gap-8 leading-loose sm:items-start">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec facilisis mauris.
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec facilisis mauris.
          </div>
        </main>
      </div>
    </>
  );
}
