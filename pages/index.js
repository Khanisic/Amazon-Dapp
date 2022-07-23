import Main from "../Components/Main"
import Sidebar from "../Components/Sidebar"

const styles = {
  container: 'h-full w-full flex bg-[#fff]'
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar/>
      <Main/>
    </div>
  )
}
