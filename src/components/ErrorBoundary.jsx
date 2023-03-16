import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes personalizar el manejo de errores aquí, como enviar información sobre el error a un servicio de seguimiento de errores.
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Puedes personalizar el mensaje de error aquí
      return <h1>Lo sentimos, ha ocurrido un error inesperado.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
