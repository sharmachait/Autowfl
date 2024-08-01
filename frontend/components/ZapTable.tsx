'use client';
import { Zap } from '@/app/dashboard/page';
import { LinkButton } from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';
import { WEBHOOK_URL } from '@/app/config';
import { allowedDisplayValues } from 'next/dist/compiled/@next/font/dist/constants';

export function ZapTable({ zaps }: { zaps: Zap[] }) {
  console.log(zaps);
  const router = useRouter();
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-100 ">
          <th className="py-3 px-4 text-left font-semibold text-gray-700 border-x">
            Name
          </th>
          <th className="py-3 px-4 text-left font-semibold text-gray-700 border-x">
            ID
          </th>
          <th className="py-3 px-4 text-left font-semibold text-gray-700 border-x">
            Created At
          </th>
          <th className="py-3 px-4 text-left font-semibold text-gray-700 border-x">
            WebHook URL
          </th>
          <th className="py-3 px-4 text-center font-semibold text-gray-700 border-x">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {zaps.map((x, index) => (
          <tr key={x.id} className={''}>
            <td className="py-2 px-2 border">
              <div className="flex flex-col gap-2 items-center">
                <div className={'flex items-center justify-center gap-2'}>
                  <img
                    src={x.trigger.type.image}
                    width={30}
                    className={'border '}
                  />
                  {/*{x.trigger.type.name}{' '}*/}
                </div>
                {x.actions.map((a) => {
                  return (
                    <div className={'flex items-center justify-center gap-2'}>
                      <img
                        src={a.type.image}
                        width={30}
                        className={'border '}
                      />
                      {/*{a.type.name + ' '}*/}
                    </div>
                  );
                })}
              </div>
            </td>
            <td className="py-2 px-4 border">{x.id}</td>
            <td className="py-2 px-4 border">some date</td>
            <td className="py-2 px-4 border">
              <div
                className="max-w-xs"
                title={`${WEBHOOK_URL}/hooks/catch/${localStorage.getItem('id')}/${x.id}`}
              >
                {`${WEBHOOK_URL}/hooks/catch/${localStorage.getItem('id')}/${x.id}`}
              </div>
            </td>
            <td className="py-2 px-4 text-center border">
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
