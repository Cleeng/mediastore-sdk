// import React, { Component, ErrorInfo, PropsWithChildren } from 'react';

// interface ErrorBoundaryProps extends PropsWithChildren {}

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

// class ErrorBoundaryContainer extends Component<
//   ErrorBoundaryProps,
//   ErrorBoundaryState
// > {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };

//     console.log('############### ErrorBoundaryContainer constructor', {
//       props
//     });
//   }

//   static getDerivedStateFromError(_: Error): ErrorBoundaryState {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error('########## Uncaught error:', error, errorInfo);
//     // todo: implement the sentry error logging here
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

// export const withErrorBoundary = (Component: React.ComponentType) => {
//   return (props: any) => (
//     <ErrorBoundaryContainer>
//       <Component {...props} />
//     </ErrorBoundaryContainer>
//   );
// };
