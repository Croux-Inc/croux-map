interface Business {
  id: number;
  lat: string;
  long: string;
  business_name: string;
  business_address: string;
  shifts_posted: number;
  last_shift_posted: string;
}

export default function BusinessPopup({ business }: { business: Business }) {
  return (
    <div className="flex flex-col space-y-2">
      <a
        className="text-lg font-bold text-blue-500 hover:underline active:text-blue-700"
        href={`https://croux.retool.com/apps/3f1fde66-cf20-11ed-b4bb-67989b1f3d39/Admin%20Panel/Business%20View?id=${business.id}`}
        target="_blank"
      >
        {business.business_name}
      </a>
      <div className="text-sm">{business.business_address}</div>
      <div className="text-sm">
        Shifts posted: {business.shifts_posted > 0 ? business.shifts_posted : 0}
      </div>
      <div className="text-sm">
        Last shift posted: {business.last_shift_posted}
      </div>
    </div>
  );
}
