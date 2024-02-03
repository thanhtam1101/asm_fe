function dangKyCtrl($scope, $http, $routeParams, $window) {
    const api_taiKhoan = "http://localhost:3000/TaiKhoan";
    $scope.user = {};
    $scope.listUser = [];

    $scope.createUser = function (event) {
        event.preventDefault();
        let checkTk = false;
        // Kiểm tra tài khoản đã tồn tại
        $http.get(api_taiKhoan)
            .then(function (response) {
                $scope.listUser = response.data;
                for (let i = 0; i < $scope.listUser.length; i++) {
                    if ($scope.user.username === $scope.listUser[i].username || $scope.user.email === $scope.listUser[i].email) {
                        checkTk = true;
                    }
                }
                if (checkTk) {
                    alert("Tài khoản đã tồn tại. Vui lòng chọn tên đăng nhập và email khác.");
                } else {
                    // Nếu tài khoản không tồn tại, tiến hành đăng ký
                    $http.post(api_taiKhoan, $scope.user)
                        .then(function (response) {
                            alert("Chúc mừng bạn đã đăng ký tài khoản thành công");
                            $window.location.href = "#dang-nhap";
                        })
                        .catch(function (error) {
                            alert("Đăng ký thất bại");
                        });
                }
            })

    }
}
