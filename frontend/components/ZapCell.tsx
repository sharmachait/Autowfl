export const ZapCell = ({
  name,
  index,
  image,
}: {
  name?: string;
  index: number;
  image: string;
}) => {
  return (
    <div className="bg-amber-50 border border-black p-8 flex justify-center items-center gap-2 w-[400px] cursor-pointer ">
      {image ? <img src={image} width={30} className={'rounded-full'} /> : ''}

      <div className="font-semibold">{index}.</div>
      <div>{name}</div>
    </div>
  );
};
