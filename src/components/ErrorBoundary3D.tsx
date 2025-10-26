import { Component, ErrorInfo, ReactNode } from 'react'
import ProductGallery from './ProductGallery'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('3D Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      console.warn('WebGL 3D failed to load, falling back to static gallery')
      return <ProductGallery />
    }

    return this.props.children
  }
}

export default ErrorBoundary3D

