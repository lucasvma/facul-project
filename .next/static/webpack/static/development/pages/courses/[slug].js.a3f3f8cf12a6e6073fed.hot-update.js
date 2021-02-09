webpackHotUpdate("static/development/pages/courses/[slug].js",{

/***/ "./src/assets/jss/nextjs-material-kit/pages/components.js":
/*!****************************************************************!*\
  !*** ./src/assets/jss/nextjs-material-kit/pages/components.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_assets_jss_nextjs_material_kit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/assets/jss/nextjs-material-kit.js */ "./src/assets/jss/nextjs-material-kit.js");

var componentsStyle = {
  container: src_assets_jss_nextjs_material_kit_js__WEBPACK_IMPORTED_MODULE_0__["container"],
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "510px",
    margin: "10px 0 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 830px)": {
      marginLeft: "10px",
      marginRight: "10px"
    }
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  }
};
/* harmony default export */ __webpack_exports__["default"] = (componentsStyle);

/***/ }),

/***/ "./src/pages/courses/[slug].js":
/*!*************************************!*\
  !*** ./src/pages/courses/[slug].js ***!
  \*************************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CoursePage; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-mdx-remote/hydrate */ "./node_modules/next-mdx-remote/hydrate.js");
/* harmony import */ var next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dynamic */ "./node_modules/next/dist/next-server/lib/dynamic.js");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_CustomLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/CustomLink */ "./src/components/CustomLink/index.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Layout */ "./src/components/Layout/index.js");
/* harmony import */ var _components_Header_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Header/Header */ "./src/components/Header/Header.js");
/* harmony import */ var _components_Header_HeaderLinks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Header/HeaderLinks */ "./src/components/Header/HeaderLinks.js");
/* harmony import */ var _components_Parallax_Parallax__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/Parallax/Parallax */ "./src/components/Parallax/Parallax.js");
/* harmony import */ var _components_Grid_GridContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/Grid/GridContainer */ "./src/components/Grid/GridContainer.js");
/* harmony import */ var _components_Grid_GridItem__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/Grid/GridItem */ "./src/components/Grid/GridItem.js");
/* harmony import */ var _assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../assets/img/apple-icon.png */ "./src/assets/img/apple-icon.png");
/* harmony import */ var _assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_Footer_Footer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/Footer/Footer */ "./src/components/Footer/Footer.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var src_assets_jss_nextjs_material_kit_pages_components_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/assets/jss/nextjs-material-kit/pages/components.js */ "./src/assets/jss/nextjs-material-kit/pages/components.js");
/* harmony import */ var _material_ui_core_styles_makeStyles__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/styles/makeStyles */ "./node_modules/@material-ui/core/styles/makeStyles.js");
/* harmony import */ var _material_ui_core_styles_makeStyles__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_makeStyles__WEBPACK_IMPORTED_MODULE_18__);

var _jsxFileName = "/home/luketfake/Documentos/Projects/nextjs-material-kit-master/src/pages/courses/[slug].js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement;















var components = {
  a: _components_CustomLink__WEBPACK_IMPORTED_MODULE_6__["default"],
  TestComponent: next_dynamic__WEBPACK_IMPORTED_MODULE_3___default()(function () {
    return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../../components/TestComponent */ "./src/components/TestComponent/index.js"));
  }, {
    loadableGenerated: {
      webpack: function webpack() {
        return [/*require.resolve*/(/*! ../../components/TestComponent */ "./src/components/TestComponent/index.js")];
      },
      modules: ['../../components/TestComponent']
    }
  }),
  Head: next_head__WEBPACK_IMPORTED_MODULE_4___default.a
};

function CourseDescription(_ref) {
  var content = _ref.content,
      frontMatter = _ref.frontMatter;
  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  }, __jsx("nav", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 17
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/courses",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 21
    }
  }, __jsx("a", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 25
    }
  }, "Cursos")))), __jsx("div", {
    className: "jsx-2647318630" + " " + "ccourse-header",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 13
    }
  }, __jsx("h1", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 17
    }
  }, frontMatter.title), frontMatter.description && __jsx("p", {
    className: "jsx-2647318630" + " " + "description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 21
    }
  }, frontMatter.description)), __jsx("main", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  }, content), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "2647318630",
    __self: this
  }, ".ccourse-header.jsx-2647318630 h1.jsx-2647318630{margin-bottom:0;}.ccourse-header.jsx-2647318630{margin-bottom:2rem;}.description.jsx-2647318630{opacity:0.6;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2x1a2V0ZmFrZS9Eb2N1bWVudG9zL1Byb2plY3RzL25leHRqcy1tYXRlcmlhbC1raXQtbWFzdGVyL3NyYy9wYWdlcy9jb3Vyc2VzL1tzbHVnXS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4Q3dCLEFBRzJCLEFBR0csQUFHUCxZQUNkLElBTkEsR0FHQSIsImZpbGUiOiIvaG9tZS9sdWtldGZha2UvRG9jdW1lbnRvcy9Qcm9qZWN0cy9uZXh0anMtbWF0ZXJpYWwta2l0LW1hc3Rlci9zcmMvcGFnZXMvY291cnNlcy9bc2x1Z10uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJ1xuaW1wb3J0IGh5ZHJhdGUgZnJvbSAnbmV4dC1tZHgtcmVtb3RlL2h5ZHJhdGUnXG5pbXBvcnQgcmVuZGVyVG9TdHJpbmcgZnJvbSAnbmV4dC1tZHgtcmVtb3RlL3JlbmRlci10by1zdHJpbmcnXG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IEN1c3RvbUxpbmsgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DdXN0b21MaW5rJ1xuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCdcbmltcG9ydCB7IGNvdXJzZXNGaWxlUGF0aHMsIENPVVJTRVNfUEFUSCB9IGZyb20gJy4uLy4uL3V0aWxzL21keFV0aWxzJ1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyXCI7XG5pbXBvcnQgSGVhZGVyTGlua3MgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlckxpbmtzXCI7XG5pbXBvcnQgUGFyYWxsYXggZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvUGFyYWxsYXgvUGFyYWxsYXhcIjtcbmltcG9ydCBHcmlkQ29udGFpbmVyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0dyaWQvR3JpZENvbnRhaW5lclwiO1xuaW1wb3J0IEdyaWRJdGVtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0dyaWQvR3JpZEl0ZW1cIjtcbmltcG9ydCBwcm9maWxlIGZyb20gXCIuLi8uLi9hc3NldHMvaW1nL2FwcGxlLWljb24ucG5nXCI7XG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXJcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuY29uc3QgY29tcG9uZW50cyA9IHtcbiAgICBhOiBDdXN0b21MaW5rLFxuICAgIFRlc3RDb21wb25lbnQ6IGR5bmFtaWMoKCkgPT4gaW1wb3J0KCcuLi8uLi9jb21wb25lbnRzL1Rlc3RDb21wb25lbnQnKSksXG4gICAgSGVhZCxcbn1cblxuZnVuY3Rpb24gQ291cnNlRGVzY3JpcHRpb24oeyBjb250ZW50LCBmcm9udE1hdHRlciB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9jb3Vyc2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YT5DdXJzb3M8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjY291cnNlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoMT57ZnJvbnRNYXR0ZXIudGl0bGV9PC9oMT5cbiAgICAgICAgICAgICAgICB7ZnJvbnRNYXR0ZXIuZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPntmcm9udE1hdHRlci5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG1haW4+e2NvbnRlbnR9PC9tYWluPlxuXG4gICAgICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5jY291cnNlLWhlYWRlciBoMSB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgfVxuICAgICAgICAuY2NvdXJzZS1oZWFkZXIge1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgICAgIH1cbiAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgPC9MYXlvdXQ+XG4gICAgKTtcbn1cblxuaW1wb3J0IHN0eWxlcyBmcm9tIFwic3JjL2Fzc2V0cy9qc3MvbmV4dGpzLW1hdGVyaWFsLWtpdC9wYWdlcy9jb21wb25lbnRzLmpzXCI7XG5pbXBvcnQgbWFrZVN0eWxlcyBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzL21ha2VTdHlsZXNcIjtcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyhzdHlsZXMpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb3Vyc2VQYWdlKHByb3BzKSB7XG4gICAgY29uc3QgY29udGVudCA9IGh5ZHJhdGUocHJvcHMuc291cmNlLCB7IGNvbXBvbmVudHMgfSlcbiAgICBjb25zdCBjb3Vyc2VzID0gdXNlU3R5bGVzKCk7XG4gICAgY29uc3QgeyAuLi5yZXN0IH0gPSBwcm9wcztcbiAgICBjb25zdCBpbWFnZUNvdXJzZXMgPSBjbGFzc05hbWVzKFxuICAgICAgICBjb3Vyc2VzLmltZ1JhaXNlZCxcbiAgICAgICAgY291cnNlcy5pbWdSb3VuZGVkQ2lyY2xlLFxuICAgICAgICBjb3Vyc2VzLmltZ0ZsdWlkXG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGNvbG9yPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgIGJyYW5kPVwiTmV4dEpTIE1hdGVyaWFsIEtpdFwiXG4gICAgICAgICAgICAgICAgcmlnaHRMaW5rcz17PEhlYWRlckxpbmtzIC8+fVxuICAgICAgICAgICAgICAgIGZpeGVkXG4gICAgICAgICAgICAgICAgY2hhbmdlQ29sb3JPblNjcm9sbD17e1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFBhcmFsbGF4IHNtYWxsIGZpbHRlciBpbWFnZT17cmVxdWlyZShcInNyYy9hc3NldHMvaW1nL3Byb2ZpbGUtYmcuanBnXCIpfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoY291cnNlcy5tYWluLCBjb3Vyc2VzLm1haW5SYWlzZWQpfT5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y291cnNlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRDb250YWluZXIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkSXRlbSB4cz17MTJ9IHNtPXsxMn0gbWQ9ezZ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y291cnNlcy5wcm9maWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2ZpbGV9IGFsdD1cIi4uLlwiIGNsYXNzTmFtZT17aW1hZ2VDb3Vyc2VzfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y291cnNlcy5uYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPXtjb3Vyc2VzLnRpdGxlfT5DdXJzb3M8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZEl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWRDb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q291cnNlRGVzY3JpcHRpb24gY29udGVudD17Y29udGVudH0gZnJvbnRNYXR0ZXI9e3Byb3BzLmZyb250TWF0dGVyfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPEZvb3RlciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGFzeW5jICh7IHBhcmFtcyB9KSA9PiB7XG4gICAgY29uc3QgY291cnNlc0ZpbGVQYXRocyA9IHBhdGguam9pbihDT1VSU0VTX1BBVEgsIGAke3BhcmFtcy5zbHVnfS5tZHhgKVxuICAgIGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYyhjb3Vyc2VzRmlsZVBhdGhzKVxuXG4gICAgY29uc3QgeyBjb250ZW50LCBkYXRhIH0gPSBtYXR0ZXIoc291cmNlKVxuXG4gICAgY29uc3QgbWR4U291cmNlID0gYXdhaXQgcmVuZGVyVG9TdHJpbmcoY29udGVudCwge1xuICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAvLyBPcHRpb25hbGx5IHBhc3MgcmVtYXJrL3JlaHlwZSBwbHVnaW5zXG4gICAgICAgIG1keE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJlbWFya1BsdWdpbnM6IFtdLFxuICAgICAgICAgICAgcmVoeXBlUGx1Z2luczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlOiBkYXRhLFxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc291cmNlOiBtZHhTb3VyY2UsXG4gICAgICAgICAgICBmcm9udE1hdHRlcjogZGF0YSxcbiAgICAgICAgfSxcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwYXRocyA9IGNvdXJzZXNGaWxlUGF0aHNcbiAgICAgICAgLm1hcCgocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9cXC5tZHg/JC8sICcnKSlcbiAgICAgICAgLm1hcCgoc2x1ZykgPT4gKHsgcGFyYW1zOiB7IHNsdWcgfSB9KSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhzLFxuICAgICAgICBmYWxsYmFjazogZmFsc2UsXG4gICAgfVxufVxuIl19 */\n/*@ sourceURL=/home/luketfake/Documentos/Projects/nextjs-material-kit-master/src/pages/courses/[slug].js */"));
}



var useStyles = _material_ui_core_styles_makeStyles__WEBPACK_IMPORTED_MODULE_18___default()(src_assets_jss_nextjs_material_kit_pages_components_js__WEBPACK_IMPORTED_MODULE_17__["default"]);
var __N_SSG = true;
function CoursePage(props) {
  var content = next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_2___default()(props.source, {
    components: components
  });
  var courses = useStyles();

  var rest = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props);

  var imageCourses = classnames__WEBPACK_IMPORTED_MODULE_16___default()(courses.imgRaised, courses.imgRoundedCircle, courses.imgFluid);
  return __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 9
    }
  }, __jsx(_components_Header_Header__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    color: "transparent",
    brand: "NextJS Material Kit",
    rightLinks: __jsx(_components_Header_HeaderLinks__WEBPACK_IMPORTED_MODULE_9__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 29
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
      lineNumber: 78,
      columnNumber: 13
    }
  })), __jsx(_components_Parallax_Parallax__WEBPACK_IMPORTED_MODULE_10__["default"], {
    small: true,
    filter: true,
    image: __webpack_require__(/*! src/assets/img/profile-bg.jpg */ "./src/assets/img/profile-bg.jpg"),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 13
    }
  }), __jsx("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_16___default()(courses.main, courses.mainRaised),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 13
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: courses.container,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 21
    }
  }, __jsx(_components_Grid_GridContainer__WEBPACK_IMPORTED_MODULE_11__["default"], {
    justify: "center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 25
    }
  }, __jsx(_components_Grid_GridItem__WEBPACK_IMPORTED_MODULE_12__["default"], {
    xs: 12,
    sm: 12,
    md: 6,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 29
    }
  }, __jsx("div", {
    className: courses.profile,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 33
    }
  }, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: _assets_img_apple_icon_png__WEBPACK_IMPORTED_MODULE_13___default.a,
    alt: "...",
    className: imageCourses,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: courses.name,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 37
    }
  }, __jsx("h2", {
    className: courses.title,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 41
    }
  }, "Cursos"))))), __jsx(CourseDescription, {
    content: content,
    frontMatter: props.frontMatter,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 25
    }
  })))), __jsx(_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_14__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }));
}

/***/ })

})
//# sourceMappingURL=[slug].js.a3f3f8cf12a6e6073fed.hot-update.js.map