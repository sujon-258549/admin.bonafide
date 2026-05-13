import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

declare global {
  interface Window {
    Apex?: { chart?: { fontFamily?: string } };
  }
}
window.Apex = {
  chart: {
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* redux provider */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
