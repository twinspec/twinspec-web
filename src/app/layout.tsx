import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata = {
  title: "TwinSpec",
  description: "Digital twins for spectroscopy, scattering, and instrument behavior.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}