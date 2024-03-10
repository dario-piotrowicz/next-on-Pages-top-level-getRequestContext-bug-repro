import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge'

// To fix the issue comment out line 8 and uncomment line 11
// (i.e. simply move `getRequestContext` inside the `getKvValue` function call)

const { env } = getRequestContext();

async function getKvValue() {
    // const { env } = getRequestContext();
    const myKv = env.MY_KV
    await myKv.put('value', 'A value from a KV store!')
    const value = await myKv.get('value')
    return value
}

export default async function Home() {
  const kvValue = await getKvValue()

  return (
    <main>
      <h1>{
        kvValue
      }</h1>
    </main>
  );
}
