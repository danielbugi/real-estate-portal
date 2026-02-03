import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | השקעות בקפריסין - Cyprus Insights',
    default: 'השקעות בקפריסין לפי ערים',
  },
};

export default function InvestmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
