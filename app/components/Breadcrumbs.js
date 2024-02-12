import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumbs() {
  const router = useRouter();

  // Check if router and router.pathname are defined
  if (!router || !router.pathname) {
    return null;
  }

  console.log('router.pathname:', router.pathname); // add this line

  // split the current path
  const pathParts = router.pathname.split('/').filter(x => x);

  console.log('pathParts:', pathParts); // add this line

  return (
    <nav aria-label="breadcrumb">
      <ol>
        {pathParts.map((part, idx) => {
          // build the link for this part
          const link = '/' + pathParts.slice(0, idx + 1).join('/');

          return (
            <li key={idx}>
              <Link href={link}>{part}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}