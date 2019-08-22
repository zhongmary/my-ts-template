import React, { Component, ErrorInfo } from "react";

interface IErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface IErrorBoundaryProps {
  hasError: boolean;
  onError: () => void;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  readonly state: IErrorBoundaryState = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    this.props.onError();
  }

  render() {
    if (this.props.hasError && this.state.errorInfo) {
      // Error path
      return (
        <pre>
          {this.state.error && this.state.error.message}
          <br />
          {this.state.errorInfo.componentStack}
        </pre>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;