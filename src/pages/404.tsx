const NotFound = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center items-center shadow-lg rounded-lg w-[400px] h-[400px]">
          <h1 className="mb-2 text-3xl">Không tìm thấy trang</h1>
          <img
            src="https://media1.tenor.com/m/SO4uduvTyaAAAAAd/frog-jumping.gif"
            alt=""
            className="mb-2"
          />
          <p className="text-3xl">Biết ông 404 không</p>
        </div>
      </div>
    );
}

export default NotFound;
