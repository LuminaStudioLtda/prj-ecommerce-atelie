import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/40 p-6">
      <LoginForm />
    </div>
  );
}
