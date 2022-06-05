function Home() {
	return (
		<div className="d-flex flex-fill flex-column justify-content-center">
			<div class="row w-100">
				<div className="col-xs-8 col-sm-6 col-lg-4 mx-auto">
					<img src="icon_lock.svg" alt="" className="w-100" />
				</div>
			</div>
			<p className="fs-2 text-center mb-0">
				Welcome to Password Manager Pro
			</p>
			<p className="fs-4 text-center">
				Your single store for all passwords
			</p>
		</div>
	);
}

export default Home;
