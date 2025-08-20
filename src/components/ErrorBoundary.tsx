"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      "Portfolio Error Boundary caught an error:",
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#161A20] flex items-center justify-center p-4">
            <div className="max-w-md text-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-300 mb-6">
                We're sorry for the inconvenience. Please try refreshing the
                page.
              </p>
              <button
                className="bg-[#00ffff] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#00cccc] transition-colors"
                onClick={() => window.location.reload()}>
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
