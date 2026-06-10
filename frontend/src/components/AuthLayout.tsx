type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A]">

      {/* Purple Glow */}
      <div className="absolute left-[-150px] top-[-100px] h-[400px] w-[400px] rounded-full bg-purple-600/30 blur-[150px]" />

      {/* Pink Glow */}
      <div className="absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-pink-500/20 blur-[150px]" />

      {/* Cyan Glow */}
      <div className="absolute left-1/2 top-1/3 h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {children}
    </div>
  );
}