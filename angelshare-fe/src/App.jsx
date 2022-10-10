import { Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Components/Layout/Layout'
import HomePageProvider from './Contexts/HomePageProvider'
import HomePage from './Pages/HomePage/HomePage'
import Error404 from './Pages/Error404/Error404'
import ScrollToTop from './Utilties/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <HomePageProvider>
          <ParallaxProvider>
            <Layout>
              <ScrollToTop>
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </ScrollToTop>
            </Layout>
          </ParallaxProvider>
        </HomePageProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
