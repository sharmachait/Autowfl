'use client';
import { Zap } from '@/app/dashboard/page';
import { LinkButton } from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';
import { WEBHOOK_URL } from '@/app/config';

export function ZapTable({ zaps }: { zaps: Zap[] }) {
  console.log(zaps);
  const router = useRouter();
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-100">
          <th className="py-3 px-4 text-left font-semibold text-gray-700">
            Name
          </th>
          <th className="py-3 px-4 text-left font-semibold text-gray-700">
            ID
          </th>
          <th className="py-3 px-4 text-left font-semibold text-gray-700">
            Created At
          </th>
          <th className="py-3 px-4 text-left font-semibold text-gray-700">
            WebHook URL
          </th>
          <th className="py-3 px-4 text-center font-semibold text-gray-700">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {zaps.map((x, index) => (
          <tr key={x.id}>
            <td className="py-2 px-4 flex  items-center">
              <div className="flex flex-col">
                <img
                  src={x.trigger.type.image}
                  width={30}
                  className={'rounded-full'}
                />
                {x.trigger.type.name}{' '}
                {x.actions.map((a) => a.type.name + ' ').join(', ')}
              </div>
            </td>
            <td className="py-2 px-4">{x.id}</td>
            <td className="py-2 px-4">some date</td>
            <td className="py-2 px-4">
              <div
                className="max-w-xs"
                title={`${WEBHOOK_URL}/hooks/catch/${localStorage.getItem('id')}/${x.id}`}
              >
                {`${WEBHOOK_URL}/hooks/catch/${localStorage.getItem('id')}/${x.id}`}
              </div>
            </td>
            <td className="py-2 px-4 text-center">
              <button
                onClick={() => router.push('/zap/' + x.id)}
                className="bg-blue-950 hover:bg-blue-600 font-bold py-1 text-white px-3 rounded"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
