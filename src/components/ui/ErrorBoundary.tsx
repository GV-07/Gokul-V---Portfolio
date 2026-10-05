import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
  isolate?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an unhandled component error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      const isIsolate = this.props.isolate !== false;

      return (
        <div
          className={`rounded-2xl border border-rose-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 shadow-2xl ${
            isIsolate ? 'my-4 w-full' : 'min-h-[400px]'
          }`}
          role="alert"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h4 className="text-lg font-bold text-white font-mono">
              {this.props.fallbackTitle || 'Component Temporary Interruption'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              {this.props.fallbackMessage ||
                'An isolated UI error occurred in this section. The rest of the portfolio remains fully functional.'}
            </p>
          </div>

          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="text-[11px] font-mono text-rose-300/80 bg-slate-950/80 p-3 rounded-xl border border-rose-500/20 max-w-lg overflow-x-auto text-left w-full">
              {this.state.error.message}
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/20 to-indigo-500/20 hover:from-rose-500/30 hover:to-indigo-500/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Section</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
