import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './Redux/Store.tsx'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<Provider store={store}>
<PersistGate loading={null} persistor={persistStore(store)}>
    <Toaster />
    <App />
    </PersistGate>
</Provider>
  </React.StrictMode>,
)
