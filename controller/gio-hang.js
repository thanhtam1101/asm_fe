function gioHangCtrl($scope, $http, $window) {
    $scope.cart = [];
    const api_gioHang = "//localhost:3000/GioHang";
    const api_hoaDon = "//localhost:3000/HoaDon";

    // Lấy ra danh sách giỏ hàng
    $http.get(api_gioHang)
        .then(function (response) {
            $scope.cart = response.data;
            $scope.soLuongGH = response.data.length; // Tính số lượng sản phẩm trong giỏ hàng
            console.log($scope.soLuongGH)
        })

    // Xóa giỏ hàng
    $scope.xoaGioHang = function (index) {
        let id = $scope.cart[index].id;
        $http.delete(api_gioHang + "/" + id)
            .then(function () {
                $scope.cart.splice(index, 1);
            })
    }

    // Tính tổng tiền 
    $scope.tinhTongTien = function () {
        $scope.tongTien = 0;
        for (let i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].isChecked) {
                $scope.tongTien += $scope.cart[i].soLuong * $scope.cart[i].gia;
                console.log($scope.tongTien)
            }
        }
    }
    $scope.tinhTongTien();

    // Mua sản phẩm
    $scope.mua = function (idGioHang) {
        $scope.cart.forEach(sp => {
            if (sp.isChecked) {
                let order = {
                    anhSP: sp.anhSP,
                    idsp: sp.id,
                    tenSP: sp.ten,
                    gia: sp.gia,
                    soLuong: sp.soLuong,
                    tongTien: Number.parseInt(sp.gia) * Number.parseInt(sp.soLuong)
                }
                $http.post(api_hoaDon, order)
                    .then(function () {
                        alert("Mua hàng thành công");
                        // Cập nhật số lượng sản phẩm trong db
                      //  $scope.updateSanPhamSauMuaHang(sp.id, sp.soLuong);

                        $window.location.href = "#sp-da-mua";
                    })
            }
        });
        //let i = $scope.cart.length - 1; i >= 0; i--
        // Lặp qua giỏ hàng và xóa các sản phẩm đã chọn
        for (let i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].isChecked) {
                $http.delete(api_gioHang + "/" + $scope.cart[i].id)
                    .then(function (response) {
                        $scope.cart.splice(i, 1);
                    })
            }
        }

    }
    // const api_sanPham = "http://localhost:3000/SanPham";
    // $scope.updateSanPhamSauMuaHang = function (idSanPham, soLuongMua) {
    //     // Gửi yêu cầu cập nhật số lượng sản phẩm với ID và số lượng mới
    //     $http.put(api_sanPham + "/" + idSanPham, { soLuong: soLuongMua })
    //         .then(function (response) {
    //             // Cập nhật thành công
    //             console.log("Cập nhật số lượng sản phẩm thành công");
    //         })
    //         .catch(function (error) {
    //             // Cập nhật thất bại
    //             console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    //         });
    // }



    // Hiển thị danh sách các sản phẩm đã mua
    $scope.listHoaDon = [];
    $http.get(api_hoaDon)
        .then(function (response) {
            $scope.listHoaDon = response.data;
        })


}