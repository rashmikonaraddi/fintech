import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}