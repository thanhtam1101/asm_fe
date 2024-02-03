function doiMatKhauCtrl($scope, $http, $window) {
    const api_taiKhoan = "http://localhost:3000/TaiKhoan";
    $scope.user = {};

    $scope.changePassword = function () {

        // Gửi yêu cầu GET để lấy danh sách tài khoản 
        $http.get(api_taiKhoan)
            .then(function (response) {
                const listUser = response.data;
                let checkUser = false;
                for (let i = 0; i < listUser.length; i++) {
                    if ($scope.passwordOld === listUser[i].password && $scope.user.username === listUser[i].username) {
                        // Tìm thấy tài khoản khớp, gửi yêu cầu PUT để cập nhật mật khẩu
                        $http.put(api_taiKhoan + "/" + listUser[i].id, $scope.user)
                            .then(function (response) {
                                alert("Đổi mật khẩu thành công.");
                                $window.location.href = "#dang-nhap"
                            })
                            .catch(function (error) {
                                alert("Đổi mật khẩu thất bại: " + error);
                            });

                        checkUser = true;
                        break;
                    }
                }
                if (!checkUser) {
                    alert("Mật khẩu hiện tại hoặc Username không chính xác.");
                }
            })

    };
}
