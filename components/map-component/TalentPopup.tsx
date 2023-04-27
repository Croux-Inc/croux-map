interface Talent {
  id: number;
  name: string;
  city: string;
  state: string;
  lat: string;
  long: string;
  shifts_filled: number;
}

export default function TalentPopup({ talent }: { talent: Talent }) {
  return (
    <div className="flex flex-col space-y-2">
      <a
        className="text-lg font-bold text-blue-500 hover:underline active:text-blue-700"
        href={`https://croux.retool.com/apps/3c2c1940-ce44-11ed-81e8-1351cef80992/Admin%20Panel/Talent%20View?id=${talent.id}`}
        target="_blank"
      >
        {talent.name}
      </a>
      <div className="text-sm">
        {talent.city}, {talent.state}
      </div>
      <div className="text-sm">
        {talent.shifts_filled > 0 ? talent.shifts_filled : 0} shifts filled
      </div>
    </div>
  );
}
