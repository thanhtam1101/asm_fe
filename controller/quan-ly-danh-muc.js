function quanLyDanhMucCtrl($scope, $http, $routeParams) {
    $scope.listDanhMuc = [];
    const api_danhMuc = "http://localhost:3000/DanhMuc";

    $scope.status = false;
    $scope.post = {};

    // Lấy danh mục sản phẩm từ db
    $http.get(api_danhMuc)
        .then(function (response) {
            $scope.listDanhMuc = response.data;
        })
        .catch(function (error) {
            console.error("Lỗi khi lấy danh mục sản phẩm:", error);
        });

    // Hiển thị danh mục lên form
    $scope.showProduct = function (index) {
        let id = $scope.listDanhMuc[index].id;
        $http.get(api_danhMuc + "/" + id)
            .then(function (response) {
                $scope.post = response.data;
                $scope.status = true;
            })
            .catch(function (error) {
                console.error("Lỗi khi hiển thị danh mục lên form:", error);
            });
    };

    // Thêm mới / Sửa đối tượng
    $scope.onCreat = function (event) {
        event.preventDefault();
        if ($scope.status) {
            // Sửa đối tượng
            $http.put(api_danhMuc + "/" + $scope.post.id, $scope.post)
                .then(function (response) {
                    alert("Sửa thành công");
                    $scope.status = false;
                })
                .catch(function (error) {
                    alert("Sửa thất bại");
                });
        } else {
            // Thêm mới đối tượng
            $http.post(api_danhMuc, $scope.post)
                .then(function (response) {
                    alert("Thêm thành công");
                })
                .catch(function (error) {
                    alert("Thêm thất bại");
                });
        }
    };

    // Xóa đối tượng
    $scope.delete = function (idDM) {
        idDM = $scope.post.id;
        $http.delete(api_danhMuc + "/" + idDM) 
            .then(function (response) {
                for (var i = 0; i < $scope.listDanhMuc.length; i++) {
                    if ($scope.listDanhMuc[i].id === idDM) {
                        $scope.listDanhMuc.splice(i, 1);
                    }
                }
                alert("Xóa thành công")
            });
    }

    // Clear form
    $scope.clear = function () {
        $scope.post = {};
        $scope.status = false;
    }
};
