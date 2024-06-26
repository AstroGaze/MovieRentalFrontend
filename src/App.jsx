import Form from "./Form";

function App() {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <Form />
        </div>
        <div className="hidden relative lg:flex h-full items-center justify-center bg-gray-200 w-1/2">
          <div className="w-60 h-60 bg-gradient-to-tr from-green-600 to-blue-700 rounded-full animate-spin"></div>
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
        </div>
      </div>
    </>
  );
}

export default App;
