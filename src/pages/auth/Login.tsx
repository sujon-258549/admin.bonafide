import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import Checkbox from "../../Components/ui/Checkbox";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await login({ email, password }).unwrap();
      const from =
        (location.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? "/";
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.error ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  const loading = isLoading;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left — Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#7a1818] via-[#a82323] to-[#D92E2E]">
        {/* Decorative blurs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center font-bold text-xl">
              B
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">Bonafide Admin</div>
              <div className="text-xs text-white/70">E-commerce Control Center</div>
            </div>
          </div>

          <div className="space-y-8 max-w-md">
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight">
                Welcome back,
                <br />
                run your store with clarity.
              </h1>
              <p className="mt-4 text-white/80 text-sm leading-relaxed">
                Track revenue, manage orders, products and customers — all from one
                refined dashboard built for speed.
              </p>
            </div>

            <div className="space-y-4">
              <FeatureRow
                icon={<TrendingUp size={16} />}
                title="Real-time analytics"
                desc="Watch sales, orders and stock move as they happen."
              />
              <FeatureRow
                icon={<ShieldCheck size={16} />}
                title="Role-based access"
                desc="Give the right people the right permissions."
              />
              <FeatureRow
                icon={<Sparkles size={16} />}
                title="Built for teams"
                desc="Departments, designations and workflows in one place."
              />
            </div>
          </div>

          <div className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Bonafide. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xl text-white"
              style={{ backgroundColor: "#D92E2E" }}
            >
              B
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900 leading-tight">
                Bonafide Admin
              </div>
              <div className="text-xs text-gray-500">E-commerce Control Center</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sign in
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your credentials to access the admin panel.
            </p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                Email address
              </label>
              <Input
                size="lg"
                type="email"
                placeholder="you@bonafide.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<Mail size={16} className="text-gray-400" />}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                  style={{ color: "#D92E2E" }}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                size="lg"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<Lock size={16} className="text-gray-400" />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              >
                <span className="text-sm text-gray-600">Remember me</span>
              </Checkbox>
            </div>

            <Button
              htmlType="submit"
              size="lg"
              loading={loading}
              className="w-full font-semibold"
              style={{ width: "100%" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:underline"
              style={{ color: "#D92E2E" }}
            >
              Contact your administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureRow = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center shrink-0 mt-0.5">
      {icon}
    </div>
    <div>
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-white/70 mt-0.5">{desc}</div>
    </div>
  </div>
);

export default Login;
