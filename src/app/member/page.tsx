import { MEMBERS } from '@/constants/member';
import { Degree } from '@/constants/member';

export default function MemberPage() {
  const groupedMembers = MEMBERS.reduce((acc, member) => {
    if (!acc[member.degree]) acc[member.degree] = [];
    acc[member.degree].push(member);
    return acc;
  }, {} as Record<string, typeof MEMBERS>);

  // 学位に応じた見出しを定義
  const degreeHeadings: Record<Degree, string> = {
    professor: '教授 / Professor',
    doctor: '大学院博士課程 / Ph.D. Student',
    master: '大学院修士課程 / Master Student',
    bachelor: '学部生 / Undergraduate Student',
    alumni: '卒業生 / ALUMNI',
  };

  // 学位の表示順序を定義
  const degreeOrder: Degree[] = ['professor', 'doctor', 'master', 'bachelor', 'alumni'];

  return (
    <div className="mx-auto mb-24 flex max-w-2xl flex-col justify-center gap-8 leading-loose">
      <h2 className="font-bold">
        MEMBER
      </h2>
      {degreeOrder.map(degree => {
        const members = groupedMembers[degree] || [];
        if (members.length === 0) return null;

        return (
          <div key={degree}>
            <h3 className="font-bold">{degreeHeadings[degree]}</h3>
            <ul className="ml-4 list-disc">
              {members.map((member) => (
                <li key={member.en}>
                  {member.ja} / {member.en}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}