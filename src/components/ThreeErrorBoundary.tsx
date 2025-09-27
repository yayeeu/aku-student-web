import React from 'react';

interface ThreeErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ThreeErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ThreeErrorBoundary extends React.Component<ThreeErrorBoundaryProps, ThreeErrorBoundaryState> {
  constructor(props: ThreeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ThreeErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-full border-4 border-white shadow-lg">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">A</span>
            </div>
            <p className="text-lg text-gray-600">Avatar Loading...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
