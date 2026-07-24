import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "تسجيل الدخول | 3M Cars Admin" };

export default async function AdminLoginPage({
 searchParams,
}: {
 searchParams: Promise<{ from?: string }>;
}) {
 const { from } = await searchParams;
 return <LoginForm redirectTo={from && from.startsWith("/admin") ? from : "/admin"} />;
}
