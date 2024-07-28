'use client';
import { Zap } from '@/app/dashboard/page';
import { LinkButton } from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';

export function ZapTable({ zaps }: { zaps: Zap[] }) {
  console.log(zaps);
  const router = useRouter();
  return (
    <div>
      <div className={'flex border-b-2 mb-2'}>
        <div className={'flex-1 '}>
          <div className={'flex items-center justify-center'}>Name</div>
        </div>
        <div className={'flex-1 '}>
          <div className={'flex items-center justify-center'}>Last Edit</div>
        </div>
        <div className={'flex-1 '}>
          <div className={'flex items-center justify-center'}>Running</div>
        </div>
        <div className={'flex-1 '}>
          <div className={'flex items-center justify-center'}>GO</div>
        </div>
      </div>
      <div>
        {zaps.map((x) => (
          <div className={'flex justify-center items-center border-b-2 mb-2'}>
            <div className={'flex-1'}>
              <div className={'flex items-center justify-center'}>
                {x.trigger.type.name}{' '}
                {x.actions.map((a) => {
                  return a.type.name + ' ';
                })}
              </div>
            </div>
            <div className={'flex-1'}>
              <div className={'flex items-center justify-center'}>{x.id}</div>
            </div>
            <div className={'flex-1'}>
              <div className={'flex items-center justify-center'}>
                some date
              </div>
            </div>
            <div className={'flex-1  '}>
              <div className={'flex items-center justify-center '}>
                <LinkButton
                  onClick={() => {
                    router.push('/zap/' + x.id);
                  }}
                >
                  Go
                </LinkButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
