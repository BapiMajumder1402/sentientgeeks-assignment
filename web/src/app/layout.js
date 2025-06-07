import './globals.css';
import Providers from './lib/Providers';
import ReduxProvider from '@/redux/ReduxProvider';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
export const metadata = {
  title: 'Todo App',
  description: 'SentientGeeks Assignment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider >
          <Toaster position="top-center" />
            <Navbar />
            <Providers>{children}</Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
