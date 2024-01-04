import Link from 'next/link';
import '../styles/footer.css';
export default function Footer() {
  return (
   <footer>
      <ul>
        <li><Link href="/">Home</Link></li>
        {/* Add other Footer links here */}
      </ul>
    </footer>
  );
}