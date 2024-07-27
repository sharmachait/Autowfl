import { CheckLabel } from '@/components/CheckLabel';
import { Appbar } from '@/components/Appbar';
import { Input } from '@/components/Input';
import { SignupForm } from '@/components/SignupForm';

function Signup() {
  return (
    <div>
      <Appbar></Appbar>
      <div className={'flex justify-center items-center pt-16 gap-12'}>
        <div className={''}>
          <div className={'flex flex-col'}>
            <div className={'font-semibold text-3xl max-w-96 pb-8'}>
              Join millions worldwide who automate their work using Zapier.
            </div>
            <CheckLabel label={'Easy setup, no coding required'}></CheckLabel>
            <CheckLabel label={'Free forever for code features'}></CheckLabel>
            <CheckLabel
              label={'14-day trial of premium features & apps'}
            ></CheckLabel>
          </div>
        </div>
        <div className={'w-96'}>
          <SignupForm></SignupForm>
        </div>
      </div>
    </div>
  );
}

export default Signup;
