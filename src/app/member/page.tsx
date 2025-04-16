import { MEMBERS } from '@/constants/member';
import { Role } from '@/constants/member';

export default function MemberPage() {
  const groupedMembers = MEMBERS.reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = [];
    acc[member.role].push(member);
    return acc;
  }, {} as Record<string, typeof MEMBERS>);

  // 学位に応じた見出しを定義
  const roleHeadings: Record<Role, string> = {
    professor: '教授 / Professor',
    doctor: '大学院博士課程 / Ph.D. Student',
    master: '大学院修士課程 / Master Student',
    bachelor: '学部生 / Undergraduate Student',
    alumni: '卒業生 / ALUMNI',
  };

  // 学位の表示順序を定義
  const roleOrder: Role[] = ['professor', 'doctor', 'master', 'bachelor', 'alumni'];

  return (
    <div className="mx-auto mb-24 flex max-w-2xl flex-col justify-center gap-8 px-4 leading-loose">
      <h1 className="mt-8 bg-accent text-2xl font-medium">Member</h1>

      {roleOrder.map(role => {
        const members = groupedMembers[role] || [];
        if (members.length === 0) return null;

        return (
          <div key={role}>
            <h3 className="mb-2 bg-accent">{roleHeadings[role]}</h3>
            <ul className="ml-4 list-hyphen">
              {members.map((member) => (
                <li key={member.name.en}>
                  {member.name.ja} / {member.name.en}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}