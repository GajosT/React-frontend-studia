import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Ksiazka } from './pages/ksiazka/KsiazkaPage';
import { Ksiazki } from './pages/ksiazka/KsiazkiPage';
import { Pracownik } from './pages/pracownik/PracownikPage';
import { Pracownicy } from './pages/pracownik/PracownicyPage';
import { Czytelnik } from './pages/czytelnik/CzytelnikPage';
import { Czytelnicy } from './pages/czytelnik/CzytelnicyPage';
import { Layout } from './pages/layout/Layout';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<App/> }/>
                </Route>
                <Route path='/ksiazka' element={<Layout />}>
                    <Route index element={<Ksiazka />} />
                </Route>
                <Route path='/ksiazki' element={<Layout />}>
                    <Route index element={<Ksiazki />} />
                </Route>
                <Route path='/pracownik' element={<Layout />}>
                    <Route index element={<Pracownik />} />
                </Route>
                <Route path='/pracownicy' element={<Layout />}>
                    <Route index element={<Pracownicy />} />
                </Route>
                <Route path='/czytelnik' element={<Layout />}>
                    <Route index element={<Czytelnik />} />
                </Route>
                <Route path='/czytelnicy' element={<Layout />}>
                    <Route index element={<Czytelnicy />} />
                </Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>,
)
