import { createContext, useState } from 'react'

export const HomePageContext = createContext({})

export default function HomePageProvider({ children }) {
  const [modal, setModal] = useState(false)

  const modalToggle = () => {
    modal ? setModal(false) : setModal(true)
  }

  const modalCancel = () => {
    setModal(false)
  }

  return (
    <HomePageContext.Provider
      value={{
        modal,
        modalToggle,
        modalCancel
      }}>
      {children}
    </HomePageContext.Provider>
  )
}
