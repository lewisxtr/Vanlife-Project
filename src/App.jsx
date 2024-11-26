import React from 'react';

import Home from '../Pages/Home'
import About from '../Pages/About'
import Vans from '../Pages/Vans/Vans'
import Login from '../Pages/Login'

import ErrorPage from '../PageComponents/ErrorPage'

import VanDetail from "../Pages/Vans/VanDetail"

import Dashboard from '../Pages/Host/Dashboard';
import Income from '../Pages/Host/Income';
import Reviews from '../Pages/Host/Reviews';
import HostVans from "../Pages/Host/HostVans"
import HostVansDetail from "../Pages/Host/Detail Page/HostVansDetail";

import HostLayout from "../Pages/Host/HostLayout"
import Layout from "../PageComponents/Layout"

import HostVanInfo from "../Pages/Host/Detail Page/HostVanInfo";
import HostVanPhotos from '../Pages/Host/Detail Page/HostVanPhotos';
import HostVanPricing from '../Pages/Host/Detail Page/HostVanPricing';

import RequireAuth from '../utils/RequireAuth';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="login" element={<Login />} />


          <Route element={<RequireAuth />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVansDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
