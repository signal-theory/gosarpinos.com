import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumbs() {

  return (
    <nav aria-label="breadcrumb">
      <ol><li><Link href="/">hi</Link></li></ol>>
    </nav>
  );
}