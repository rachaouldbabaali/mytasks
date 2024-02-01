"use client"
import withAuth from './utils/withAuth';

export function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Welcome to the dashboard</h1>
      <p>This is the dashboard page content.</p>
    </main>
  );
}

export default withAuth(Home);
