(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{550:function(t,s,n){"use strict";n.r(s);var a=n(44),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"contenttype"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#contenttype"}},[t._v("#")]),t._v(" ContentType "),n("Badge",{attrs:{text:"Decorator",type:"decorator"}})],1),t._v(" "),n("section",{staticClass:"symbol-info"},[n("table",{staticClass:"is-full-width"},[n("tbody",[n("tr",[n("th",[t._v("Module")]),n("td",[n("div",{staticClass:"lang-typescript"},[n("span",{staticClass:"token keyword"},[t._v("import")]),t._v(" { ContentType } "),n("span",{staticClass:"token keyword"},[t._v("from")]),t._v(" "),n("span",{staticClass:"token string"},[t._v('"@tsed/common"')])])])]),n("tr",[n("th",[t._v("Source")]),n("td",[n("a",{attrs:{href:"https://github.com/TypedProject/tsed/blob/v5.59.2/packages/common/src/mvc/decorators/method/contentType.ts#L0-L0"}},[t._v("/packages/common/src/mvc/decorators/method/contentType.ts")])])])])])]),t._v(" "),n("h2",{attrs:{id:"overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),n("div",{staticClass:"language-typescript"},[n("pre",{pre:!0,attrs:{class:"language-typescript"}},[n("code",{pre:!0,attrs:{class:"typescript-lang "}},[t._v("function "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ContentType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("string")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("any")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])])])]),t._v(" "),n("h2",{attrs:{id:"description"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#description"}},[t._v("#")]),t._v(" Description")]),t._v(" "),n("div",{pre:!0},[n("p",[t._v("Sets the Content-Type HTTP header to the MIME type as determined by mime.lookup() for the specified type.\nIf type contains the “/” character, then it sets the "),n("code",[t._v("Content-Type")]),t._v(" to type.")]),t._v(" "),n("div",{pre:!0,attrs:{class:"language-typescript line-numbers-mode"}},[n("pre",{pre:!0,attrs:{"v-pre":"",class:"language-typescript"}},[n("code",[t._v(" @"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ContentType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'.html'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("              "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 'text/html'")]),t._v("\n @"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ContentType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'html'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("               "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 'text/html'")]),t._v("\n @"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ContentType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'json'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("               "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 'application/json'")]),t._v("\n @"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ContentType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/json'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 'application/json'")]),t._v("\n @"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ContentType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'png'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("                "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => image/png")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("myMethod")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{pre:!0,attrs:{class:"line-numbers-wrapper"}},[n("span",{pre:!0,attrs:{class:"line-number"}},[t._v("1")]),n("br"),n("span",{pre:!0,attrs:{class:"line-number"}},[t._v("2")]),n("br"),n("span",{pre:!0,attrs:{class:"line-number"}},[t._v("3")]),n("br"),n("span",{pre:!0,attrs:{class:"line-number"}},[t._v("4")]),n("br"),n("span",{pre:!0,attrs:{class:"line-number"}},[t._v("5")]),n("br"),n("span",{pre:!0,attrs:{class:"line-number"}},[t._v("6")]),n("br")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);