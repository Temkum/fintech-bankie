import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      lang="en"
      className="flex min-h-screen justify-between w-full font-inter"
    >
      {children}
      <div className="auth-asset">
        <Image
          src={'/icons/auth-image.svg'}
          alt="Auth icon"
          width={600}
          height={600}
        />
      </div>
    </main>
  );
}
