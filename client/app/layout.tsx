import "@/app/globals.css";
import AuthContextProvider from "@/modules/auth_provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        </body>
    </html>
  );
}
