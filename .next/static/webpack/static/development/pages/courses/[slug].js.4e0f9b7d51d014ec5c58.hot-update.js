webpackHotUpdate("static/development/pages/courses/[slug].js",{

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
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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
var _jsxFileName = "/home/luketfake/Documentos/Projects/nextjs-material-kit-master/src/pages/courses/[slug].js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;






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
var __N_SSG = true;
function CoursePage(_ref) {
  var source = _ref.source,
      frontMatter = _ref.frontMatter;
  var content = next_mdx_remote_hydrate__WEBPACK_IMPORTED_MODULE_2___default()(source, {
    components: components
  });
  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx("header", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 13
    }
  }, __jsx("nav", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 17
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/courses",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 21
    }
  }, __jsx("a", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 25
    }
  }, "Cursos")))), __jsx("div", {
    className: "jsx-2647318630" + " " + "ccourse-header",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 13
    }
  }, __jsx("h1", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 17
    }
  }, frontMatter.title), frontMatter.description && __jsx("p", {
    className: "jsx-2647318630" + " " + "description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 21
    }
  }, frontMatter.description)), __jsx("main", {
    className: "jsx-2647318630",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 13
    }
  }, content), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2647318630",
    __self: this
  }, ".ccourse-header.jsx-2647318630 h1.jsx-2647318630{margin-bottom:0;}.ccourse-header.jsx-2647318630{margin-bottom:2rem;}.description.jsx-2647318630{opacity:0.6;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2x1a2V0ZmFrZS9Eb2N1bWVudG9zL1Byb2plY3RzL25leHRqcy1tYXRlcmlhbC1raXQtbWFzdGVyL3NyYy9wYWdlcy9jb3Vyc2VzL1tzbHVnXS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ3dCLEFBRzJCLEFBR0csQUFHUCxZQUNkLElBTkEsR0FHQSIsImZpbGUiOiIvaG9tZS9sdWtldGZha2UvRG9jdW1lbnRvcy9Qcm9qZWN0cy9uZXh0anMtbWF0ZXJpYWwta2l0LW1hc3Rlci9zcmMvcGFnZXMvY291cnNlcy9bc2x1Z10uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJ1xuaW1wb3J0IGh5ZHJhdGUgZnJvbSAnbmV4dC1tZHgtcmVtb3RlL2h5ZHJhdGUnXG5pbXBvcnQgcmVuZGVyVG9TdHJpbmcgZnJvbSAnbmV4dC1tZHgtcmVtb3RlL3JlbmRlci10by1zdHJpbmcnXG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IEN1c3RvbUxpbmsgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DdXN0b21MaW5rJ1xuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCdcbmltcG9ydCB7IGNvdXJzZXNGaWxlUGF0aHMsIENPVVJTRVNfUEFUSCB9IGZyb20gJy4uLy4uL3V0aWxzL21keFV0aWxzJ1xuXG5jb25zdCBjb21wb25lbnRzID0ge1xuICAgIGE6IEN1c3RvbUxpbmssXG4gICAgVGVzdENvbXBvbmVudDogZHluYW1pYygoKSA9PiBpbXBvcnQoJy4uLy4uL2NvbXBvbmVudHMvVGVzdENvbXBvbmVudCcpKSxcbiAgICBIZWFkLFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb3Vyc2VQYWdlKHsgc291cmNlLCBmcm9udE1hdHRlciB9KSB7XG4gICAgY29uc3QgY29udGVudCA9IGh5ZHJhdGUoc291cmNlLCB7IGNvbXBvbmVudHMgfSlcbiAgICByZXR1cm4gKFxuICAgICAgICA8TGF5b3V0PlxuICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2NvdXJzZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhPkN1cnNvczwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNjb3Vyc2UtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGgxPntmcm9udE1hdHRlci50aXRsZX08L2gxPlxuICAgICAgICAgICAgICAgIHtmcm9udE1hdHRlci5kZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+e2Zyb250TWF0dGVyLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bWFpbj57Y29udGVudH08L21haW4+XG5cbiAgICAgICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmNjb3Vyc2UtaGVhZGVyIGgxIHtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICB9XG4gICAgICAgIC5jY291cnNlLWhlYWRlciB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgICAgICAgfVxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8L0xheW91dD5cbiAgICApXG59XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGFzeW5jICh7IHBhcmFtcyB9KSA9PiB7XG4gICAgY29uc3QgY291cnNlc0ZpbGVQYXRocyA9IHBhdGguam9pbihDT1VSU0VTX1BBVEgsIGAke3BhcmFtcy5zbHVnfS5tZHhgKVxuICAgIGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYyhjb3Vyc2VzRmlsZVBhdGhzKVxuXG4gICAgY29uc3QgeyBjb250ZW50LCBkYXRhIH0gPSBtYXR0ZXIoc291cmNlKVxuXG4gICAgY29uc3QgbWR4U291cmNlID0gYXdhaXQgcmVuZGVyVG9TdHJpbmcoY29udGVudCwge1xuICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAvLyBPcHRpb25hbGx5IHBhc3MgcmVtYXJrL3JlaHlwZSBwbHVnaW5zXG4gICAgICAgIG1keE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJlbWFya1BsdWdpbnM6IFtdLFxuICAgICAgICAgICAgcmVoeXBlUGx1Z2luczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlOiBkYXRhLFxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc291cmNlOiBtZHhTb3VyY2UsXG4gICAgICAgICAgICBmcm9udE1hdHRlcjogZGF0YSxcbiAgICAgICAgfSxcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwYXRocyA9IGNvdXJzZXNGaWxlUGF0aHNcbiAgICAgICAgLy8gUmVtb3ZlIGZpbGUgZXh0ZW5zaW9ucyBmb3IgcGFnZSBwYXRoc1xuICAgICAgICAubWFwKChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL1xcLm1keD8kLywgJycpKVxuICAgICAgICAvLyBNYXAgdGhlIHBhdGggaW50byB0aGUgc3RhdGljIHBhdGhzIG9iamVjdCByZXF1aXJlZCBieSBOZXh0LmpzXG4gICAgICAgIC5tYXAoKHNsdWcpID0+ICh7IHBhcmFtczogeyBzbHVnIH0gfSkpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXRocyxcbiAgICAgICAgZmFsbGJhY2s6IGZhbHNlLFxuICAgIH1cbn1cbiJdfQ== */\n/*@ sourceURL=/home/luketfake/Documentos/Projects/nextjs-material-kit-master/src/pages/courses/[slug].js */"));
}

/***/ })

})
//# sourceMappingURL=[slug].js.4e0f9b7d51d014ec5c58.hot-update.js.map