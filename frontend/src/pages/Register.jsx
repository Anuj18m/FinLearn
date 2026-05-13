import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../store/authSlice';
import { authService } from '../services/apiService';
import { ArrowRight, Lock, Mail, User, Sparkles } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure('Passwords do not match'));
      return;
    }

    dispatch(registerStart());

    try {
      const { confirmPassword, ...userData } = formData;
      const data = await authService.register(userData);
      dispatch(registerSuccess(data));
      navigate('/dashboard');
    } catch (err) {
      dispatch(registerFailure(err.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary/20">
      <div className="w-full max-w-sm space-y-10 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 border border-border/50 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
            <Sparkles size={12} />
            Join the Workspace
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Create account</h1>
          <p className="text-sm text-muted-foreground">Start your financial mastery track today.</p>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-secondary/20 border border-border/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:bg-secondary/40 focus:border-primary/50 focus:ring-0 transition-all placeholder:text-muted-foreground/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className="w-full bg-secondary/20 border border-border/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:bg-secondary/40 focus:border-primary/50 focus:ring-0 transition-all placeholder:text-muted-foreground/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="••••••••"
                    className="w-full bg-secondary/20 border border-border/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:bg-secondary/40 focus:border-primary/50 focus:ring-0 transition-all placeholder:text-muted-foreground/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-secondary/20 border border-border/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:bg-secondary/40 focus:border-primary/50 focus:ring-0 transition-all placeholder:text-muted-foreground/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 group shadow-xl shadow-primary/10"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create account
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-foreground font-black hover:text-primary transition-colors">
            Sign in
          </Link>
        </p>

        <div className="pt-8 text-center">
            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">FinLearn Pro © 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
