import React, { useState, useEffect } from 'react';
import * as giayAPI from './../../../api/giay';
import './index.scss';
import SelectSize from './select_Size/index';
import SelectFast from './select_Fast/index';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import * as apiImage from './../../../contants/index';
import { Link } from 'react-router-dom';
function XemSanPham(props) {
	const [data, setData] = useState({});
	const [dataTam, setDataTam] = useState([]);
	const [dataTamAll, setDataTamAll] = useState([]);
	const [dataSubmit, setDataSubmit] = useState({
		id_giay: '',
		gia_ban: 0,
		id_size: 0,
		ten_size: 0,
		id_mau_sac: 0,
		ten_mau_sac: '',
		soluong: '',
		tongtien: 0,
	});
	useEffect(() => {
		if (props.match.params) {
			function fetchPostsLists() {
				if (props.match.params.th) {
					giayAPI
						.xemSanPham({
							id: props.match.params.th,
						})
						.then((res) => {
							const { data } = res;
							if (res.status === 200) {
								setDataTam(data.data);
								giayAPI
									.xemSanPhamAll({
										id: props.match.params.th,
									})
									.then((resP) => {
										const dataAll = resP.data;
										if (resP.status === 200) {
											setDataTamAll(dataAll.data);
										}
									});
							}
						});
				}
			}

			fetchPostsLists();
		}
		return () => (setDataTam([]), setDataTamAll([]));
	}, [props.match.params]);

	useEffect(() => {
		let current = true;
		if (dataTam.length > 0 && dataTamAll.length > 0) {
			let dataTLG = [];
			dataTam.forEach((giay) => {
				const mauTam = [];
				const filterMS = dataTamAll.filter((it) => it.id_giay === giay.id);
				filterMS.forEach((i) => {
					const s = dataTamAll.filter((item) => item.id === i.id);
					if (mauTam.length > 0) {
						let dem = 0;
						mauTam.forEach((ms) => {
							if (ms.id === i.id) {
								dem++;
							}
						});
						if (dem === 0) {
							const m = {
								id: i.id,
								id_giay: i.id_giay,
								id_mau_sac: i.id_mau_sac,
								hinh_anh: i.hinh_anh,
								ten_mau_sac: i.ten_mau_sac,
								size: s,
							};
							mauTam.push(m);
						}
					} else if (mauTam.length === 0) {
						const m = {
							id: i.id,
							id_giay: i.id_giay,
							id_mau_sac: i.id_mau_sac,
							hinh_anh: i.hinh_anh,
							ten_mau_sac: i.ten_mau_sac,
							size: s,
						};
						mauTam.push(m);
					}
				});
				const g = {
					id: giay.id,
					ten_giay: giay.ten_giay,
					mo_ta: giay.mo_ta,
					id_loai_giay: giay.id_loai_giay,
					gia_ban: giay.gia_ban,
					gia_ban_khuyen_mai: giay.gia_ban_khuyen_mai,
					trang_thai: giay.trang_thai,
					mausac: mauTam,
				};
				dataTLG.push(g);
			});
			setData(dataTLG);
			if (dataTLG.length > 0) {
				setDataSubmit((dataSubmit) => ({
					...dataSubmit,
					id_giay: dataTLG[0].id,
					gia_ban: dataTLG[0].mausac[0].size[0].gia_ban,
					id_size: dataTLG[0].mausac[0].size[0].id,
					ten_size: dataTLG[0].mausac[0].size[0].ten_size,
					id_mau_sac: dataTLG[0].mausac[0].id,
					ten_mau_sac: dataTLG[0].mausac[0].ten_mau_sac,
					soluong: 1,
					tongtien: 0,
				}));
			}
		}
		return () => (current = false);
	}, [dataTam, dataTamAll]);
	function handleSubmit(e) {
		e.preventDefault();
	}
	function fast_select(datas) {
		setDataSubmit((dataSubmit) => ({
			...dataSubmit,
			id_mau_sac: datas.id_mau_sac,
			ten_mau_sac: datas.ten_mau_sac,
			id_size: data[0].mausac[0].size[0].id,
			ten_size: data[0].mausac[0].size[0].ten_size,
		}));
	}
	function selectSizes(data) {
		setDataSubmit((dataSubmit) => ({
			...dataSubmit,
			id_size: data.id_size,
			ten_size: parseInt(data.ten_size),
		}));
	}
	function handleQuantity(d) {
		if (parseInt(d) + parseInt(dataSubmit.soluong) > 0) {
			setDataSubmit((dataSubmit) => ({
				...dataSubmit,
				soluong: parseInt(d) + parseInt(dataSubmit.soluong),
			}));
		}
	}
	function onChangeSelectQuantity(e) {
		e.persist();
		const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
		if (rx_live.test(e.target.value)) {
			setDataSubmit((dataSubmit) => ({
				...dataSubmit,
				soluong: e.target.value,
			}));
		}
	}

	return (
		<div className="xem_san_pham">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-lg-6 col-md-6">
						<OwlCarousel items={3} className="owl-theme" loop nav margin={8}>
							{data.length > 0 && data[0].mausac.length > 0 ? (
								data.map((m, index) => {
									const d = m.mausac[0].hinh_anh.split(',');
									let arr = [];
									for (var i = 0; i < d.length; i++) {
										arr.push(d[i]);
									}
									return (
										<Link key={index + 1} to="/SanPhamMoi" className="title-hp">
											<div className="one-procut">
												<div className="width-image">
													<img
														className="img"
														src={`${apiImage.API_ENPOINT}/images/${arr[0]}`}
													/>
												</div>

												<div className="name-price">
													<div className="name-product">{m.ten_giay}</div>
													<div className="price-product">
														{`${m.gia_ban
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
													</div>
												</div>
											</div>
										</Link>
									);
								})
							) : (
								<div></div>
							)}
						</OwlCarousel>
					</div>
					<div className="col-xs-12 col-sm-6 col-lg-6 col-md-6">
						<div className="watch-product">
							<div className="watch-product__name">CAPTOE BROGUES OXFORD - LIMITED EDITION - OF21</div>
							<div className="watch-product__price mt-3">2.550.000₫</div>
							<div className="form_watch  mt-3">
								<form onSubmit={handleSubmit}>
									{dataSubmit.id_size !== 0 ? (
										<SelectSize
											dataSubmits={dataSubmit}
											arrSize={data.length > 0 ? data[0].mausac[0].size : []}
											selectSizes={selectSizes}
										></SelectSize>
									) : (
										<div></div>
									)}

									{dataSubmit.id_mau_sac !== 0 ? (
										<SelectFast
											dataSubmits={dataSubmit}
											fast_select={fast_select}
											arrFast={data.length > 0 ? data[0].mausac : []}
										></SelectFast>
									) : (
										<div></div>
									)}
									<div className="select-quantity mt-3">
										<div className="select-quantity__header">số lượng:</div>
										<div className="select-btn">
											<span className="select-btn__minus" onClick={() => handleQuantity(-1)}>
												-
											</span>
											<input
												type="text"
												value={dataSubmit.soluong}
												pattern="[+-]?\d+(?:[.,]\d+)?"
												name="soluong"
												className="select-btn_quantity"
												onChange={onChangeSelectQuantity}
											/>
											<span className="select-btn__plus" onClick={() => handleQuantity(1)}>
												+
											</span>
										</div>
									</div>
									<div className="clearfix form-group mt-3">
										<div className="btn-mua btnsold">
											<button
												type="submit"
												data-role="addtocart"
												className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
												// disabled="disabled"
											>
												<span className="txt-main">
													<i className="fa fa-cart-arrow-down padding-right-10"></i> Mua hàng
												</span>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default XemSanPham;
