interface Props {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: Props) => {
  return (
    <main className="flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-5xl font-mono text-sm">{children}</div>
    </main>
  );
};
