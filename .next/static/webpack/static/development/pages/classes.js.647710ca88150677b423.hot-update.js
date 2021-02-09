webpackHotUpdate("static/development/pages/classes.js",{

/***/ "./src/pages/classes/index.js":
/*!************************************!*\
  !*** ./src/pages/classes/index.js ***!
  \************************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassesPage; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var src_components_Header_Header_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/Header/Header.js */ "./src/components/Header/Header.js");
/* harmony import */ var src_components_Footer_Footer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/Footer/Footer.js */ "./src/components/Footer/Footer.js");
/* harmony import */ var src_components_CustomButtons_Button_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/CustomButtons/Button.js */ "./src/components/CustomButtons/Button.js");
/* harmony import */ var src_components_Grid_GridContainer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/components/Grid/GridContainer.js */ "./src/components/Grid/GridContainer.js");
/* harmony import */ var src_components_Grid_GridItem_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/components/Grid/GridItem.js */ "./src/components/Grid/GridItem.js");
/* harmony import */ var src_components_Header_HeaderLinks_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/components/Header/HeaderLinks.js */ "./src/components/Header/HeaderLinks.js");
/* harmony import */ var src_components_Parallax_Parallax_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/components/Parallax/Parallax.js */ "./src/components/Parallax/Parallax.js");
/* harmony import */ var src_assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/assets/img/apple-icon.png */ "./src/assets/img/apple-icon.png");
/* harmony import */ var src_assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(src_assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var src_assets_jss_nextjs_material_kit_pages_profilePage_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/assets/jss/nextjs-material-kit/pages/profilePage.js */ "./src/assets/jss/nextjs-material-kit/pages/profilePage.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/Layout */ "./src/components/Layout/index.js");
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mdx-js/react */ "./node_modules/@mdx-js/react/dist/esm.js");

var _jsxFileName = "/home/luketfake/Documentos/Projects/nextjs-material-kit-master/src/pages/classes/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;















var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["makeStyles"])(src_assets_jss_nextjs_material_kit_pages_profilePage_js__WEBPACK_IMPORTED_MODULE_12__["default"]);
var components = {
  img: Image,
  h1: Heading.H1,
  h2: Heading.H2,
  p: Text,
  code: Pre,
  inlineCode: Code
};

function ClassDescription(props) {
  var _this = this;

  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_14__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, "Home Page"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }
  }, "Click the link below to navigate to a page generated by", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 11
    }
  }, "next-mdx-remote"), "."), __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }
  }, props.classes.map(function (_class) {
    return __jsx("li", {
      key: _class.filePath,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 15
      }
    }, __jsx(_mdx_js_react__WEBPACK_IMPORTED_MODULE_15__["MDXProvider"], {
      components: components,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 17
      }
    }, __jsx("main", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 21
      }
    }))));
  })));
}

var __N_SSG = true;
function ClassesPage(props) {
  var classes = useStyles();

  var rest = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props);

  var imageClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
  return __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 5
    }
  }, __jsx(src_components_Header_Header_js__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    color: "transparent",
    brand: "NextJS Material Kit",
    rightLinks: __jsx(src_components_Header_HeaderLinks_js__WEBPACK_IMPORTED_MODULE_9__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 21
      }
    }),
    fixed: true,
    changeColorOnScroll: {
      height: 200,
      color: "white"
    }
  }, rest, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }
  })), __jsx(src_components_Parallax_Parallax_js__WEBPACK_IMPORTED_MODULE_10__["default"], {
    small: true,
    filter: true,
    image: __webpack_require__(/*! src/assets/img/profile-bg.jpg */ "./src/assets/img/profile-bg.jpg"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(classes.main, classes.mainRaised),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: classes.container,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 11
    }
  }, __jsx(src_components_Grid_GridContainer_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
    justify: "center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 13
    }
  }, __jsx(src_components_Grid_GridItem_js__WEBPACK_IMPORTED_MODULE_8__["default"], {
    xs: 12,
    sm: 12,
    md: 6,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: classes.profile,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 17
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: src_assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_11___default.a,
    alt: "...",
    className: imageClasses,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: classes.name,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 19
    }
  }, __jsx("h3", {
    className: classes.title,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 21
    }
  }, "Course Name"), __jsx("h6", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }, "Subtitle"), __jsx(src_components_CustomButtons_Button_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
    justIcon: true,
    link: true,
    className: classes.margin5,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 21
    }
  }, __jsx("i", {
    className: "fab fa-twitter",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 23
    }
  })), __jsx(src_components_CustomButtons_Button_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
    justIcon: true,
    link: true,
    className: classes.margin5,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 21
    }
  }, __jsx("i", {
    className: "fab fa-instagram",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 23
    }
  })), __jsx(src_components_CustomButtons_Button_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
    justIcon: true,
    link: true,
    className: classes.margin5,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 21
    }
  }, __jsx("i", {
    className: "fab fa-facebook",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 23
    }
  })))))), __jsx(ClassDescription, {
    classes: props.classes,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  })))), __jsx(src_components_Footer_Footer_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }
  }));
}

/***/ })

})
//# sourceMappingURL=classes.js.647710ca88150677b423.hot-update.js.map