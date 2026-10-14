import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FloatingCartBar } from './components/FloatingCartBar';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { NativeAppFrame } from './components/NativeAppFrame';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { FavoritesView } from './views/FavoritesView';
import { ProfileView } from './views/ProfileView';

const MainAppContent: React.FC = () => {
  const { 
    showSplash, 
    activeTab, 
    selectedProductForDetail,
    setSelectedProductForDetail,
    isAuthOpen,
    setIsAuthOpen
  } = useApp();

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NativeAppFrame>
      {/* Top Sticky Header */}
      <Header />

      {/* Dynamic Views: Inicio, Explorar, Favoritos, Mi Perfil */}
      <div className="flex-1 px-4 pt-2">
        {activeTab === 'inicio' && <HomeView />}
        {activeTab === 'explorar' && <ExploreView />}
        {activeTab === 'favoritos' && <FavoritesView />}
        {activeTab === 'perfil' && <ProfileView />}
      </div>

      {/* Floating Cart Bar (appears when items are in cart) */}
      <FloatingCartBar />

      {/* Bottom Fixed Navigation Bar */}
      <BottomNav />

      {/* Unified Direct Cart & Checkout Drawer */}
      <CartDrawer />

      {/* Product Detail Modal */}
      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
        />
      )}

      {/* Auth & User Profile Modal */}
      {isAuthOpen && (
        <AuthModal onClose={() => setIsAuthOpen(false)} />
      )}

      {/* Native Order Confirmation Modal */}
      <OrderConfirmationModal />

      {/* Global Toast Feedback */}
      <ToastContainer />
    </NativeAppFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
