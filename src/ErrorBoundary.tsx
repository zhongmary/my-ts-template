import React, { Component, ErrorInfo } from "react";

import { IError } from './App';

interface IErrorBoundaryProps {
  hasError: boolean;
  err: IError;
  onError: (e: IError) => void;
}

class ErrorBoundary extends Component<IErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.props.hasError && this.props.err.errorInfo) {
      // Error path
      return (
        <pre>
          {this.props.err.error && this.props.err.error.message}
          <br />
          {this.props.err.errorInfo.componentStack}
        </pre>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
