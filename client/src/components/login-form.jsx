import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser, logoutUser } from "@/features/authSlice";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signupUser(formData));
    } else {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] flex justify-center items-center h-[78vh]">
      <div
        className={cn("flex flex-col gap-6 w-[400px] -mt-25", className)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {isSignup ? "Create an account" : "Login to your account"}
            </CardTitle>
            <CardDescription>
              {isSignup
                ? "Enter your details below to create an account"
                : "Enter your email below to login to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {isSignup && (
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-[#7546F6] hover:bg-purple-600"
                    disabled={loading}
                  >
                    {loading
                      ? "Please wait..."
                      : isSignup
                      ? "Sign up"
                      : "Login"}
                  </Button>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  {isAuthenticated && (
                    <div className="flex flex-col gap-2 text-center">
                      <p className="text-green-600 text-sm">
                        Welcome {user?.name || "User"} 🎉
                      </p>
                      <Button
                        type="button"
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                {isSignup ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(false)}
                      className="underline underline-offset-4"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(true)}
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
