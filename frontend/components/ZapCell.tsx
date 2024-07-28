export const ZapCell = ({ name, index }: { name?: string; index: number }) => {
  return (
    <div className="bg-amber-50 border border-black p-8 flex justify-center gap-1 w-[400px] cursor-pointer ">
      <div className="font-semibold">{index}. </div>
      <div>{name}</div>
    </div>
  );
};
