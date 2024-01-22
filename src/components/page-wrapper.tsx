interface Props {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-6">
      <div className="max-w-5xl w-full font-mono text-sm">{children}</div>
    </main>
  );
};
