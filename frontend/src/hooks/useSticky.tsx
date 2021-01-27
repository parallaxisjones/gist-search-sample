import { useEffect, useState } from "react"

function useSticky(el: React.MutableRefObject<any>, initialState: boolean) {
  const [isSticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
        window.scrollY > el.current?.getBoundingClientRect().bottom
          ? setSticky(true)
          : setSticky(false)
      }
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", () => handleScroll)
    }
  }, [el, isSticky, setSticky])

  return isSticky;
}

export default useSticky