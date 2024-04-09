export default function PageHero({ title }: { title: string }) {
  return (
    <div className="bg-dark-linear">
      <h2 className="text-4xl font-bold text-white text-center pt-28 pb-24 mt-[-4rem]">{title}</h2>
    </div>
  );
}
