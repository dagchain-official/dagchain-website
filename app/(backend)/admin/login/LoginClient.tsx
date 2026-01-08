"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/public/admin/css/styles/login-page.css";

type Step = "login" | "forgot" | "new_password";

export default function LoginClient() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("login");
  const [showPwd1, setShowPwd1] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || "Invalid credentials");
        return;
      }
      else {
        router.replace("/admin/webpages");
        setTimeout(() => { location.reload() }, 500);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login_wrap">
      <div className="login_logo">
        <img
          src="/admin/images/login-page/logo.png"
          alt="Dagchain Logo"
        />
      </div>

      <div className="login_inner">
        <div className="two_column">
          {/* LEFT */}
          <div className="leftcol">
            <h2>
              Welcome to{" "}
              <span className="gtext">DAGCHAIN ADMIN PANEL</span>
            </h2>
            <span className="small_text">
              Write. Review. Publish
            </span>
          </div>

          {/* RIGHT */}
          <div className="rightcol">
            {step === "login" && (
              <div className="step_content login_screen">
                <div className="top_textbox">
                  <h3 className="c_heading mb-4">
                    Enter The Details <br /> Below To Login
                  </h3>
                  <div className="divider_line" />
                </div>

                <div className="formarea">
                  {/* Error */}
                  {error && (
                    <div className="fullrow">
                      <p style={{ color: "#ff4d4f", fontSize: 13 }}>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Email */}
                  <div className="fullrow">
                    <div className="new_inputlabel label_inside with_licon">
                      <div className="licon">
                        <img src="/admin/images/login-page/icon_user.svg" />
                      </div>
                      <div className="rbox">
                        <input
                          type="email"
                          className="input"
                          placeholder="Enter Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="fullrow">
                    <div className="new_inputlabel label_inside with_licon">
                      <div className="licon">
                        <img src="/admin/images/login-page/icon_password.svg" />
                      </div>
                      <div className="rbox">
                        <input
                          type={showPwd1 ? "text" : "password"}
                          className="input"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loading}
                        />
                        <div
                          className={`showpassword ${
                            showPwd1 ? "active" : ""
                          }`}
                          onClick={() =>
                            setShowPwd1((p) => !p)
                          }
                        >
                          <div className="show">
                            <img src="/admin/images/login-page/icon_eye.svg" />
                          </div>
                          <div className="hide">
                            <img src="/admin/images/login-page/icon_eye_hide.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="fullrow remrow">
                    <label className="custom_checkbox">
                      Remember me
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>

                    <button
                      type="button"
                      className="forgot"
                      onClick={() => setStep("forgot")}
                      disabled={loading}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="fullrow btnrow">
                    <button
                      className="common_btn"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      {loading ? "SIGNING IN..." : "SIGN IN SECURELY"}
                    </button>
                    <p className="sm_text">
                      For Authorized Personnel Only.
                      Activity Is Monitored.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FORGOT / NEW PASSWORD can be wired later */}
          </div>
        </div>
      </div>
    </div>
  );
}
