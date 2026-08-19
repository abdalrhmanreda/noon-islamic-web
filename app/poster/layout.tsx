import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'بوستر تطبيق يُسْر — تصميم الطباعة والمشاركة',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
