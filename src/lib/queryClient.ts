
// Using Next.js App Router data fetching
export async function fetchWithCache(url: string) {
  const res = await fetch(url, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
