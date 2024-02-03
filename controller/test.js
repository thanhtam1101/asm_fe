var app = angular.module("myapp", []);
app.controller("appcontroller", function ($scope, $http) {
    $scope.taikhoan = [];
    var tkvar = [];
    $scope.form_tk = {
        user: "",
        roal: -1,
        pass: 12345
    }
    $http.get("http://localhost:3000/taikhoan").then(function (response) {
        $scope.taikhoan = response.data;
    })
    $scope.dangnhap = function () {
        tkvar = $scope.taikhoan;
        var users = $scope.user;
        var passs = $scope.matkhau;
        var ketqua = -1;
        var vaitro = 0;
        for (var i = 0; i < tkvar.length; i++) {
            var retu = users.localeCompare(tkvar[i].user);
            if (retu == 0) {
                if (passs == tkvar[i].pass) {
                    if (tkvar[i].roal == 1) {
                        ketqua = 1;
                        vaitro = 1;
                    } else {
                        ketqua = 1;
                        vaitro = -1;
                    }
                }
            }
        }
        if (ketqua === 1 && vaitro === -1) {
            window.location.href = "http://127.0.0.1:5500/index.html#/trangchu";
            alert("Đăng nhập thành công");
        } else {
            if (ketqua === 1 && vaitro === 1) {
                window.location.href = "http://127.0.0.1:5500/index.html#/admin";
                alert("Đăng nhập thành công");
            } else {
                alert("Thông tin tài khoản hoặc mật khẩu không chính xác");
            }

        }
    }
    //đăng kí tài khoản
    $scope.dangki = function () {
        //check trùng tài khoản
        tkvar = $scope.taikhoan;
        var checktk = $scope.form_tk.user;
        var mk1 = $scope.matkhau1;
        var mk2 = $scope.form_tk.pass;
        if (mk1.localeCompare(mk2) != 0) {
            alert("mật khẩu chưa trùng khớp")
            return;
        }
        for (var i = 0; i < tkvar.length; i++) {
            var retu = checktk.localeCompare(tkvar[i].user);
            if (retu == 0) {
                alert("Tài khoản email đã tồn tại!");
                return;
            }
        }
        $http.post("http://localhost:3000/taikhoan", $scope.form_tk).then(function (response) {
            $scope.taikhoan.push(response.data);
            alert("thêm thành công");
        });

    }
    $scope.doimatkhau = function () {
        //check trùng tài khoản
        tkvar = $scope.taikhoan;
        var checktk = $scope.form_tk.user;
        var mk1 = $scope.matkhau1;
        var check = 0;
        var idtk;
        var vitri;
        for (var i = 0; i < tkvar.length; i++) {
            var retu = checktk.localeCompare(tkvar[i].user);
            if (retu == 0) {
                if (mk1 == tkvar[i].pass) {
                    check = 1;
                    idtk = tkvar[i].id;
                    vitri=i;
                }
            }
        }
        if (check == 0) {
            alert("tài khoản hoặc mật khẩu cũ không đúng!!");
            return;
        }
         let api = "http://localhost:3000/taikhoan/" + idtk;
         console.log(api);
        $http.patch(api, $scope.form_tk).then(function (response) {
           $scope.taikhoan[vitri] = response.data;
           alert("Cập nhật thành công!");
        })
    }
});
