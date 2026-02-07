export default function Section({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <section className="space-y-1">

      <h3 className="font-semibold text-indigo-700">
        {title}
      </h3>

      <p className="text-gray-700 whitespace-pre-line">
        {value}
      </p>

    </section>
  );
}
