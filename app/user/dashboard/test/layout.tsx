export default function TestLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {children}
      </div>
    );
  }