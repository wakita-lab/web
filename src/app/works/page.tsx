import { StaggeredWorkList } from '@/components/StaggeredWorkList';

export default function WorksPage() {
  return (
    <main className="flex w-full flex-col items-center px-4 pb-16 pt-4 font-light sm:px-8">
      <StaggeredWorkList />
    </main>
  );
}