import Navbar from '@/components/Navbar';
import NavbarTailwind from '@/components/NavbarTailwind';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      {/* <Navbar /> */}
      <NavbarTailwind />
      {children}
    </div>
  );
}