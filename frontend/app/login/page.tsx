import { CheckLabel } from '@/components/CheckLabel';
import { Appbar } from '@/components/Appbar';
import { SigninForm } from '@/components/SigninForm';

function Signin() {
  return (
    <div>
      <Appbar></Appbar>
      <div className={'flex justify-center items-center mt-10 gap-12 pt-6'}>
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
          <SigninForm></SigninForm>
        </div>
      </div>
    </div>
  );
}

export default Signin;