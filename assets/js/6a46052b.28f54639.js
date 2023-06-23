"use strict";(self.webpackChunk_lottiefiles_lottie_styler_docs=self.webpackChunk_lottiefiles_lottie_styler_docs||[]).push([[679],{7522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>k});var n=r(9901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(r),h=o,k=d["".concat(s,".").concat(h)]||d[h]||u[h]||a;return r?n.createElement(k,i(i({ref:t},c),{},{components:r})):n.createElement(k,i({ref:t},c))}));function k(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},6609:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var n=r(3027),o=(r(9901),r(7522));const a={},i="stroke-color",l={unversionedId:"lottie-style-sheets/properties/stroke-color",id:"lottie-style-sheets/properties/stroke-color",title:"stroke-color",description:"The stroke-color property in LSS defines the color of a StrokeShape or GradientStrokeShape. You can specify the color in any valid CSS color format.",source:"@site/docs/lottie-style-sheets/properties/stroke-color.md",sourceDirName:"lottie-style-sheets/properties",slug:"/lottie-style-sheets/properties/stroke-color",permalink:"/docs/lottie-style-sheets/properties/stroke-color",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/lottie-style-sheets/properties/stroke-color.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"src",permalink:"/docs/lottie-style-sheets/properties/src"},next:{title:"stroke-width",permalink:"/docs/lottie-style-sheets/properties/stroke-width"}},s={},p=[{value:"For <code>StrokeShape</code>",id:"for-strokeshape",level:2},{value:"For <code>GradientStrokeShape</code>",id:"for-gradientstrokeshape",level:2},{value:"Linear Gradient Color Value",id:"linear-gradient-color-value",level:3},{value:"Radial Gradient Color Value",id:"radial-gradient-color-value",level:3}],c={toc:p},d="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"stroke-color"},"stroke-color"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"stroke-color")," property in LSS defines the color of a ",(0,o.kt)("inlineCode",{parentName:"p"},"StrokeShape")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"GradientStrokeShape"),". You can specify the color in any valid CSS color format."),(0,o.kt)("p",null,"Here's how you can use the stroke-color property:"),(0,o.kt)("h2",{id:"for-strokeshape"},"For ",(0,o.kt)("inlineCode",{parentName:"h2"},"StrokeShape")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"StrokeShape {\n    stroke-color: red;\n}\n")),(0,o.kt)("p",null,"In this example, the ",(0,o.kt)("inlineCode",{parentName:"p"},"StrokeShape")," will be stroked with red color."),(0,o.kt)("h2",{id:"for-gradientstrokeshape"},"For ",(0,o.kt)("inlineCode",{parentName:"h2"},"GradientStrokeShape")),(0,o.kt)("p",null,"You can use both linear and radial gradients:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"GradientStrokeShape {\n    stroke-color: linear-gradient(red, blue);\n}\n")),(0,o.kt)("p",null,"In this example, the ",(0,o.kt)("inlineCode",{parentName:"p"},"GradientStrokeShape")," will have a linear gradient stroke starting with red and transitioning to blue."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"GradientStrokeShape {\n    stroke-color: radial-gradient(yellow, green);\n}\n")),(0,o.kt)("p",null,"In this example, the ",(0,o.kt)("inlineCode",{parentName:"p"},"GradientStrokeShape")," will have a radial gradient stroke starting with yellow and transitioning to green."),(0,o.kt)("h3",{id:"linear-gradient-color-value"},"Linear Gradient Color Value"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"linear-gradient()")," function creates a linear gradient with color transitions along a straight line. This line is defined by an angle or a direction (to top, to right, to bottom left, etc.). However, in Lottie Style Sheets, the gradient line is always horizontal, starting from the left (0%) to the right (100%)."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"linear-gradient()")," function takes multiple color-stop arguments where you specify a color and its position along the gradient line. The position is usually defined by a percentage."),(0,o.kt)("p",null,"Here's an example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"GradientStrokeShape {\n    stroke-color: linear-gradient(red 20%, blue 80%);\n}\n")),(0,o.kt)("p",null,"In this example, the gradient stroke starts with red at 20% from the left and transitions to blue starting from 80% to the end of the ",(0,o.kt)("inlineCode",{parentName:"p"},"GradientStrokeShape"),". The area between 20% and 80% will be a transition from red to blue."),(0,o.kt)("h3",{id:"radial-gradient-color-value"},"Radial Gradient Color Value"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"radial-gradient()")," function creates a radial gradient with color transitions radiating from a certain point. By default, this point is the center of the element."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"radial-gradient()")," function, similar to ",(0,o.kt)("inlineCode",{parentName:"p"},"linear-gradient()"),", takes multiple color-stop arguments where you specify a color and its position along the gradient radius. The position is usually defined by a percentage."),(0,o.kt)("p",null,"Here's an example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"GradientStrokeShape {\n    stroke-color: radial-gradient(yellow 20%, green 80%);\n}\n")),(0,o.kt)("p",null,"In this example, the gradient stroke starts with yellow at 20% from the center and transitions to green starting from 80% to the edge of the ",(0,o.kt)("inlineCode",{parentName:"p"},"GradientStrokeShape"),". The area between 20% and 80% will be a transition from yellow to green."),(0,o.kt)("p",null,"Remember, the ",(0,o.kt)("inlineCode",{parentName:"p"},"stroke-color")," property allows you to be creative and explore various color combinations using gradients to create visually appealing animations."))}u.isMDXComponent=!0}}]);