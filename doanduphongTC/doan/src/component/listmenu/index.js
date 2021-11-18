import React, { useState, useEffect } from 'react';
import Slidebar from './../Slidebar/index';
import './ListMenu.scss';
import imageLogo from './../../assets/image/wonderland.png';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionLoaiGiay from './../../actions/loai_giay';
import * as actionGiay from './../../actions/giay';
import jwt from 'jsonwebtoken';

function DashBoard(props) {
	const { children, name, ListLoaiGiay, createActionNP } = props;
	const [sidebar, setSidebar] = useState(false);
	const { fetchListNewProductRequest, fetchListChiTietMauSacRequest, fetchListChiTietSizeRequest } = createActionNP;
	const { show, setShow } = useState(false);
	const [token, setToken] = useState(null);
	const history = useHistory();
	useEffect(() => {
		let current = true;
		(async () => {
			async function fetchPostsList() {
				await fetchListNewProductRequest();
				await fetchListChiTietMauSacRequest();
				await fetchListChiTietSizeRequest();
				const tokens = localStorage.getItem('tokenTC');
				if (tokens) {
					try {
						var decoded = jwt.verify(tokens, 'qwe1234');
						if (decoded.result) {
							setToken(decoded.result);
						}
					} catch (err) {
						// err
					}
					//qwe1234
				} else {
					setToken(null);
				}
			}
			await fetchPostsList();
		})();
		return () => (current = false);
	}, []);
	useEffect(() => {
		let current = true;
		(async () => {
			async function fetchPostsList() {
				await fetchListNewProductRequest();
				await fetchListChiTietMauSacRequest();
				await fetchListChiTietSizeRequest();
				const tokens = localStorage.getItem('tokenTC');
				if (tokens) {
					try {
						var decoded = jwt.verify(tokens, 'qwe1234');
						if (decoded.result) {
							setToken(decoded.result);
						}
					} catch (err) {
						// err
					}
					//qwe1234
				} else {
					setToken(null);
				}
			}
			await fetchPostsList();
		})();
		return () => (current = false);
	}, []);
	function onClickShowSlider(data) {
		setSidebar(!sidebar);
	}

	function onClickHide() {
		setSidebar(!sidebar);
	}

	function onShow() {
		setShow(false);
	}

	function dropLoaiGiays() {
		if (ListLoaiGiay.length > 0) {
			let xhtml = null;
			xhtml = ListLoaiGiay.map((route) => {
				return (
					<Link key={route.id} to={`/ThuongHieu=${route.id}`} className="dropdown-item">
						{route.ten_loai_giay}
					</Link>
				);
			});
			return xhtml;
		}
	}
	function deleteLocal() {
		localStorage.removeItem('tokenTC');
		setToken(null);
	}
	return (
		<div key={name} className="chia">
			<Container>
				<div className="header-CT">
					<div className="iconMenu">
						<MenuIcon onClick={onClickHide}></MenuIcon>
					</div>
					<div className="logo">
						<img src={imageLogo} title="Trang chủ" onClick={() => history.push('/')} />
					</div>
					<div className="dk-acoount">
						<div className="account befores flex-dk" title="Tài khoản">
							<div className="flex-dk">
								<div className="title-account">Tài khoản</div>
								<AccountBoxIcon></AccountBoxIcon>
							</div>
							<ul>
								<li>
									{token !== null ? (
										<a rel="nofollow">{`Xin chào ${token.ten_khach_hang}`}</a>
									) : (
										<Link rel="nofollow" to="/DangNhap" title="Đăng Nhập">
											Đăng nhập
										</Link>
									)}
								</li>
								<li>
									{token !== null ? (
										<a rel="nofollow" title="Đăng ký" onClick={deleteLocal}>
											Đăng xuất
										</a>
									) : (
										<Link rel="nofollow" to="/DangKy" title="Đăng ký">
											Đăng ký
										</Link>
									)}
								</li>
							</ul>
						</div>
						<div className="giohang flex-dk" title="Giỏ hàng">
							<div className="title-giohang">Giỏ hàng</div>
							<ShoppingCartIcon></ShoppingCartIcon>
						</div>
						<div className="search flex-dk" title="Tìm kiếm">
							<div className="title-search">Tìm kiếm</div>
							<SearchIcon></SearchIcon>
						</div>
					</div>
				</div>
			</Container>
			<div className={sidebar ? 'MuiBackdrop-root' : ''} onClick={onClickHide}></div>
			<Slidebar onClickShowSlider={onClickShowSlider} sidebar={sidebar}></Slidebar>
			<div className="container nav-evo-watch">
				<div className="row">
					<div className="col-md-12 col-lg-12">
						<ul id="nav" className="nav">
							<li className="nav-item ">
								<Link to="/" title="Trang chủ">
									Trang chủ
								</Link>
							</li>

							<li className="row-menu">
								<Dropdown show={show}>
									<Dropdown.Toggle id="title" variant="success" id="dropdown-basic">
										Giày Tây
									</Dropdown.Toggle>
									<Dropdown.Menu className="dropdown-item-menu">{dropLoaiGiays()}</Dropdown.Menu>
								</Dropdown>
							</li>

							<li className="nav-item ">
								<Link to="/GioiThieu" title="Giới Thiệu">
									Giới Thiệu
								</Link>
							</li>
							<li className="nav-item ">
								<Link to="/DangNhap" title="Đăng nhập">
									Đăng nhập
								</Link>
							</li>
							<li className="nav-item ">
								<Link to="/DangKy" title="Đăng ký">
									Đăng ký
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{children}
			<div className="footer-TC">
				<div className="container">
					<div className="row">
						<div className="col-sm-6 col-12 dislay-center">
							<div className="huongdan">
								<div className="title-huongdan">HƯỚNG DẪN</div>
								<ul className="list-huongdan">
									<li>
										<Link to="/HuongDanMuaHang">HƯỚNG DẪN MUA HÀNG</Link>
									</li>
									<li>
										<Link to="/DangKy">ĐĂNG KÝ THÀNH VIÊN</Link>
									</li>
									<li>
										<Link to="/TraCuuDonHang">TRA CỨU ĐƠN HÀNG</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-6 col-12 dislay-center">
							<div className="huongdan">
								<div className="title-huongdan">CHÍNH SÁCH</div>
								<ul className="list-huongdan">
									<li>
										<Link to="/ChinhSachDoiHang">CHÍNH SÁCH ĐỔI HÀNG</Link>
									</li>
									<li>
										<Link to="/ChinhSachBaoHanh">CHÍNH SÁCH BẢO HÀNH</Link>
									</li>
									<li>
										<Link to="/ChinhSachThanhToan">CHÍNH SÁCH THANH TOÁN</Link>
									</li>
									<li>
										<Link to="/HinhThucVanChuyen">HÌNH THỨC VẬN CHUYỂN</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		CreateActionLoaiGiay: bindActionCreators(actionLoaiGiay, dispatch),
		createActionNP: bindActionCreators(actionGiay, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListLoaiGiay: state.loaigiay.ListLoaiGiay,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
