function quanLySanPhamCtrl($scope, $http, $routeParams) {
    $scope.listSP = [];
    const api_sanPham = "http://localhost:3000/SanPham";
    $scope.status = false;
    $scope.sp = {};

    // Hiển thị sp từ db lên table
    $http.get(api_sanPham)
        .then(function (response) {
            $scope.listSP = response.data;
        })
        .catch(function (error) {
            console.error("Lỗi khi lấy sản phẩm", error);
        });

    // lấy danh mục từ db và hiển thị lên trang quản lý sản phẩm
    $scope.listdm = [];
    const api_postdm = "http://localhost:3000/DanhMuc";
    $http.get(api_postdm)
        .then(function (response) {
            $scope.listdm = response.data;
            console.log(response.data)
        })
        .catch(function (error) {
            alert(error.message);
        })

    // Hiển thị sản phẩm lên form
    $scope.showSP = function (index) {
        let id = $scope.listSP[index].id;
        $http.get(api_sanPham + "/" + id)
            .then(function (response) {
                $scope.sp = response.data;
                // Tìm danh mục sản phẩm tương ứng trong $scope.listdm
                for (let i = 0; i < $scope.listdm.length; i++) {
                    if ($scope.sp.danhMucSP == $scope.listdm[i].ten) {
                        // Gán danh mục sản phẩm vào biến sp.danhMucSP
                        $scope.sp.danhMucSP = $scope.listdm[i].ten;
                        $scope.status = true;
                    }
                }
            })
            .catch(function (error) {
            });
    }

    // Thêm sp/sửa sản phẩm
    $scope.creatUpdate = function (event) {
        event.preventDefault();
        if ($scope.status) {
            // Sửa sản phẩm
            $http.put(api_sanPham + "/" + $scope.sp.id, $scope.sp)
                .then(function (response) {
                    alert("Sửa thành công");
                    $scope.status = false;
                })
                .catch(function (error) {
                    alert("Sửa thất bại");
                });
        } else {
            // Thêm sản phẩm
            $http.post(api_sanPham, $scope.sp)
                .then(function (response) {
                    alert("Thêm thành công");
                })
                .catch(function (error) {
                    alert("Thêm thất bại");
                });
        }
    };

    // Xóa sp
    $scope.delete = function (idSP) {
        idSP = $scope.sp.id;
        $http.delete(api_sanPham + "/" + idSP)
            .then(function (response) {
                for (var i = 0; i < $scope.listSP.length; i++) {
                    if ($scope.listSP[i].id = idSP) {
                        $scope.listSP.splice(i, 1);
                        break;
                    }
                }
                alert("Xóa thành công");
            })
    }
    // Clear form
    $scope.clearForm = function () {
        $scope.sp = {};
        $scope.status = false;
    }
}

// Lấy dữ liệu từ db hiển thị lên trang sản phẩm
function getSPCtrl($scope, $http, $routeParams) {
    const api_sanPham = "http://localhost:3000/SanPham";
    $scope.listSanPham = [];
    $scope.sp = {}; 

    // Gọi API để lấy danh sách sản phẩm
    $http.get(api_sanPham)
        .then(function (response) {
            $scope.listSanPham = response.data;
        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });

    // Hiển thị sản phẩm bên CTSP
    let id = $routeParams.id;
    if (id) {
        // Gửi yêu cầu lấy thông tin sản phẩm theo id
        $http.get(api_sanPham + "/" + id)
            .then(function (response) {
                $scope.sp = response.data;
                console.log($scope.sp);
            })
            .catch(function (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            });
    }

    // thêm sp vào giỏ hàng
    const api_gioHang = "//localhost:3000/GioHang";
    $scope.addToCart = function () {
        let sanPhamMoi = {
            ten: $scope.sp.tenSP,
            gia: $scope.sp.giaBan,
            soLuong: 1,
            anhSP: $scope.sp.anhSP
        };
        console.log(sanPhamMoi)
        $http.post(api_gioHang, sanPhamMoi)
            .then(function () {
                alert("Sản phẩm đã được thêm vào giỏ hàng");
            })

    }
}

// Lấy sp từ db hiện thị lên trang chủ
function spTrangChuCtrl($scope, $http) {
    const api_post = "http://localhost:3000/SanPham";
    $scope.listSPTrangChu = [];

    $http.get(api_post)
        .then(function (response) {
            $scope.listSPTrangChu = response.data;
        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });
}




