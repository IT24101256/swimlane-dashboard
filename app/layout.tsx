import './globals.css';

export const metadata = {
  title: 'Board App',
  description: 'Task board with Next.js and Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

