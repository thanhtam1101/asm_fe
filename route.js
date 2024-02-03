// Khởi tạo ứng dụng angular js
// Khai báo các thư viện phụ thuộc
var mySPA = angular.module("AssignmentSPA", ["ngRoute"]);

// Tăng số lượng trên giỏ hàng
mySPA.factory('cartService', function () {
    var cart = {
        soLuong: 0
    };
    return cart;
});

// mySPA.controller('headerController', function ($scope, cartService) {
//     $scope.cart = cartService;
// });

// mySPA.controller("addToCartContrl", addToCartContrl);

mySPA.controller("quanLyDanhMucCtrl", quanLyDanhMucCtrl);
mySPA.controller("quanLySanPhamCtrl", quanLySanPhamCtrl);
mySPA.controller("getSPCtrl", getSPCtrl);
mySPA.controller("spTrangChuCtrl", spTrangChuCtrl);
//mySPA.controller("chiTietSPCtrl",chiTietSPCtrl);
mySPA.controller("dangNhapCtrl",dangNhapCtrl);
mySPA.controller("dangKyCtrl", dangKyCtrl);
mySPA.controller("doiMatKhauCtrl", doiMatKhauCtrl);
mySPA.controller("gioHangCtrl", gioHangCtrl);

// Cấu hình url để chuyển nội dung các trang theo từng url 
mySPA.config(function ($routeProvider, $locationProvider) {
    // Xóa khoảng trắng
    $locationProvider.hashPrefix("");
    // Cấu hình chuyển trang
    $routeProvider
        .when("/gioi-thieu", {
            templateUrl: "./pages/gioi-thieu.html"
        })
        .when("/trang-chu", {
            templateUrl: "./pages/trang-chu.html"
        })
        .when("/san-pham/", {
            templateUrl: "./pages/san-pham.html",
            controller: "getSPCtrl"
        })
        .when("/dang-nhap", {
            templateUrl: "./pages/dang-nhap.html",
            controller: "dangNhapCtrl"
        })
        .when("/dang-ky/", {
            templateUrl: "./pages/dang-ky.html",
            controller: "dangKyCtrl"
        })
        .when("/chi-tiet-sp/:id", {
            templateUrl: "./pages/chi-tiet-sp.html",
            controller: "getSPCtrl"
        })
        .when("/gio-hang", {
            templateUrl: "./pages/gio-hang.html",
            controller: "gioHangCtrl"
        })
        .when("/sp-da-mua", {
            templateUrl: "./pages/sp-da-mua.html",
            controller: "gioHangCtrl"
        })
        .when("/danh-muc-xuong-rong", {
            templateUrl: "./pages/danh-muc-xuong-rong.html"
        })
        .when("/sen-da", {
            templateUrl: "./pages/san-pham.html"
        })
        .when("/danh-muc-cay-de-ban", {
            templateUrl: "./pages/danh-muc-cay-de-ban.html"
        })
        .when("/quan-ly-sp", {
            templateUrl: "./pages/quan-ly-sp.html",
            controller: "quanLySanPhamCtrl"
        })
        .when("/quan-ly-danh-muc", {
            templateUrl: "./pages/quan-ly-danh-muc.html"
        })
        .when("/doi-mat-khau", {
            templateUrl: "./pages/doi-mat-khau.html",
            controller: "doiMatKhauCtrl"
        })
        .otherwise({
            redirectTo: "/trang-chu"
        });
});