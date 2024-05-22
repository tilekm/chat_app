import "@/app/globals.css";
import AuthContextProvider from "@/modules/auth_provider";
import WebSocketProvider from "@/modules/websocket_provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </AuthContextProvider>
        </body>
    </html>
  );
}
