import React, { Component, ReactNode } from 'react';

export type ErrorCallback = (err: Error) => void

export default (Element: ReactNode, errorCallback: ErrorCallback) => {
  return class ErrorBoundary extends Component {
    state = {
      hasError: false,
    }

    static getDerivedStateFromProps() {
      return { hasError: false };
    }

    static getDerivedStateFromError(err: Error) {
      // Update state so the next render will show the fallback UI.
      errorCallback(err);
      return { hasError: true };
    }

    componentDidCatch(err: Error) {
      errorCallback(err);
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }

      if (Element instanceof Error) {
        return <pre>{Element.message}</pre>;
      }

      return typeof Element === 'function' ? <Element /> : Element;
    }
  };
}