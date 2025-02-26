import Image from "next/image";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      {/* 背景にパーティクルアニメーション */}
      <ParticleBackground />
      
      {/* メインコンテンツ */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-screen-sm leading-loose">
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
