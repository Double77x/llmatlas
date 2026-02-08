import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from '@/components/ScrollToTop'

export const Route = createRootRoute({
  component: () => (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="bg-background min-h-screen">
          <Outlet />
          <ScrollToTop />
          <Toaster />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  ),
})
