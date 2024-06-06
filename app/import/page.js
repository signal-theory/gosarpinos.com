import redirects from './redirects.json' assert { type: "json" };
import { createClient } from '@vercel/kv';
export default function Page() {
    // Run this tomorrow
    // const kv = createClient({
    //     url: process.env.KV_REST_API_URL,
    //     token: process.env.KV_REST_API_TOKEN,
    // });

    // redirects.slice(1995).map(async function (item, index) {
    //     await kv.set(item.source, item.destination);
    //     console.log(item);
    // })
    
    return <h1>Hello, Next.js! 123</h1>
}