import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Welcome to the dashboard</h1>
      <p>This is the dashboard page content.</p>
      <Image src="/images/nextjs.png" alt="Next.js logo" width={500} height={500} />
    </main>
  );
}
