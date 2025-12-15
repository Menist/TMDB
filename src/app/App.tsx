import './App.module.css'
import {RouterProvider} from "./providers";
import {ToastContainer} from "react-toastify";
import {LinearProgress} from "../shared/ui/LinearProgress";
import {useGlobalLoading} from "../common/hooks/useGlobalLoading";

function App() {
  const isLoading = useGlobalLoading();
  return (
    <>
      {isLoading && <LinearProgress />}

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <RouterProvider />
    </>
  );
}

export default App
