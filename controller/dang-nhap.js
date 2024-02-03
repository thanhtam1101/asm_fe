function dangNhapCtrl($scope, $http, $window) {
    const api_taiKhoan = "http://localhost:3000/TaiKhoan";
    $scope.user = [];
    $scope.dangNhap = function () {
        let listUser = [];
        $http.get(api_taiKhoan)
            .then(function (response) {
                listUser = response.data
                let checkDangNhap = false;
                for (let i = 0; i < listUser.length; i++) {
                    if ($scope.user.username === listUser[i].username && $scope.user.password === listUser[i].password) {
                        alert("Đăng nhập thành công");
                        $window.location.href = '#trang-chu';
                        checkDangNhap = true;
                        break;
                    }
                }
                if ($scope.user.username != null && $scope.user.password != null && checkDangNhap == false) {
                    alert("Tên tài khoản hoặc mật khẩu không chính xác");
                }
            })

    }
}