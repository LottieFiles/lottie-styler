(self.webpackChunk_lottiefiles_lottie_styler_docs=self.webpackChunk_lottiefiles_lottie_styler_docs||[]).push([[660],{7984:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>c});var r=l(4425),a=l(1082),i=l(9901);function n(e){let{src:t}=e;return i.createElement("div",{className:"w-[300px] h-[300px] border"},i.createElement(a.J5,{src:t,autoplay:!0,loop:!0}))}const s=["https://assets2.lottiefiles.com/packages/lf20_Mp5Zsg1rAG.json","https://assets9.lottiefiles.com/packages/lf20_O4XdR0iORJ.json","https://assets5.lottiefiles.com/packages/lf20_2fTP0cWkg2.json"],o={dark:"\nFillShape {\n  fill-color: #ED824D\n}\n\nStrokeShape {\n  stroke-color: blue;\n  stroke-width: 1\n}\n",light:"\nFillShape {\n  fill-color: white\n}\n\nStrokeShape {\n  stroke-color: red;\n  stroke-width: 1\n}\n",default:""};function c(){const[e,t]=i.useState("default"),[l,a]=i.useState([]),[c,u]=i.useState([]);return i.useEffect((()=>{(async function(e){return Promise.all(e.map((async e=>fetch(e).then((async e=>e.text())))))})(s).then((e=>a(e))).catch((e=>console.error(e)))}),[]),i.useEffect((()=>{const t=l.map((e=>(0,r.P)(e))),a=o[e];a?Promise.all(t.map((e=>e.style(a)))).then((e=>{const t=e.map((e=>e.toString()));u(t)})).catch((e=>console.error(e))):u(l)}),[l,e]),i.createElement(i.Fragment,null,i.createElement("div",{className:"mr-auto ml-auto mt-10 w-90"},i.createElement("div",{className:"flex flex-row flex-wrap items-center justify-center mb-12"},i.createElement("button",{onClick:()=>t("default"),type:"button",autoFocus:"default"===e,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "},"Default"),i.createElement("button",{onClick:()=>t("dark"),type:"button",autoFocus:"dark"===e,className:"text-white bg-orange-700 hover:bg-blue-800 focus:ring-4  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "},"Orange"),i.createElement("button",{onClick:()=>t("light"),type:"button",autoFocus:"light"===e,className:"text-white bg-gray-700 hover:bg-blue-800 focus:ring-4  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "},"Light"))),i.createElement("div",{className:"flex flex-wrap justify-around"},(c.length>0?c:l).map((e=>i.createElement(n,{src:e})))))}},6564:()=>{},5946:()=>{},1574:()=>{},3012:()=>{},3002:()=>{},4425:(e,t,l)=>{"use strict";l.d(t,{P:()=>V});var r=l(6930),a=l(4722),i=l(6521);var n=l(6500),s=l(3850),o=l(9674),c=l(4856),u=l(4217),p=l(3796);(0,n.l7)([s.Z]);var d=e=>{try{if(!e.startsWith("linear-gradient"))return!1;let t=(0,p.Q)(e);return!(0===t.length||"linear-gradient"!==t[0]?.type)}catch{return!1}},h=e=>{try{if(!e.startsWith("radial-gradient"))return!1;let t=(0,p.Q)(e);return!(0===t.length||"radial-gradient"!==t[0]?.type)}catch{return!1}},f=e=>{let t=[],l=[];if(!d(e)&&!h(e))return[];let r=(0,p.Q)(e)[0];return r?.colorStops.forEach(((e,a)=>{let i=[],s=0;if("hex"===e.type||"literal"===e.type){let t=(0,n.Vi)(e.value);i.push(parseFloat((t.rgba.r/255).toFixed(2)),parseFloat((t.rgba.g/255).toFixed(2)),parseFloat((t.rgba.b/255).toFixed(2))),s=t.rgba.a}else if(["rgb","rgba"].includes(e.type)){let t=(0,n.Vi)({r:Number(e.value[0]),g:Number(e.value[1]),b:Number(e.value[2]),a:e.value[3]?Number(e.value[3]):1});i.push(parseFloat((t.rgba.r/255).toFixed(2)),parseFloat((t.rgba.g/255).toFixed(2)),parseFloat((t.rgba.b/255).toFixed(2))),s=t.rgba.a}let o=parseFloat((a/(r.colorStops.length-1||1)).toFixed(2));e.length?.value&&Number(e.length.value)>0&&(o=parseFloat((Number(e.length.value)/100).toFixed(2))),t.push(o,...i),l.push(o,s)})),t.push(...l),t},m=(e,t,l)=>{if(!["shape-gradient-fill","shape-gradient-stroke"].includes(e.title))return;let r=t.length/6;(0,u.Vn)(e,"attribute",(e=>{"gradient-type"===e.title&&e.children[0]?e.children[0].value="linear"===l?1:2:"count"===e.title&&e.children[0]&&(e.children[0].value=r)})),(0,u.Vn)(e,"collection",(e=>{if("static-value"===e.title&&"object"==typeof e.key&&"k"===e.key.value&&e.children[0]&&"static-value-children"===e.children[0].title){e.children[0].children=t.map((e=>({type:"primitive",valueType:"number",value:e})))}}))};(0,n.l7)([s.Z]);var y=function(e,t,l,r){void 0===r&&(r=!1);let a=new Set,i=Array.isArray(e)?e:[e];for(let n of i)(0,u.Vn)(n,"attribute",((e,i,s)=>{e.title===l&&e.children[0]?.value===t&&s&&"root"!==s.type&&(r?s===n&&a.add(s):a.add(s))}));return Array.from(a)},b=e=>e.includes("-color"),g=e=>"nonzero"===e||"evenodd"===e,v=e=>e.endsWith("%")?parseFloat(e):100*parseFloat(e),k=e=>"nonzero"===e?1:2,x=e=>{try{new URL(e)}catch{return!1}return!0},w=e=>{let t=(0,c.parse)(e).nodes;if(1===t.length){let e=t[0];if(e&&"func"===e.type&&"url"===e.name){let t=e.nodes;if(1===t.length){let e=t[0];if(e&&"quoted"===e.type)return e.contents}}}return""},F=(e,t,l)=>{for(let r in t)switch(r){case"fill-color":let a=t[r];"shape-fill"===e.title?Array.isArray(a)&&(0,u.Vn)(e,"primitive",((e,t,l)=>{"color-rgba-children"===l?.title&&"number"==typeof t&&(e.value=a[t])})):"layer-solid-color"===e.title&&(0,u.Vn)(e,"attribute",(e=>{if("hex-color"===e.title&&e.children[0]?.value&&4===a?.length){let t=(0,n.Vi)({r:255*a[0],g:255*a[1],b:255*a[2],a:a[3]}).toHex();e.children[0].value=t}}));break;case"stroke-color":if("shape-stroke"===e.title){let l=t[r];Array.isArray(l)&&(0,u.Vn)(e,"primitive",((e,t,r)=>{"static-value-children"===r?.title&&"number"==typeof t&&(e.value=l[t])}))}break;case"stroke-width":("shape-stroke"===e.title||"shape-gradient-stroke"===e.title)&&(0,u.Vn)(e,"element",(e=>{"stroke-width"===e.title&&(0,u.Vn)(e,"attribute",((e,l,a)=>{"static-value"===e.title&&e.children[0]?.value&&"number"===e.children[0].valueType&&"animated-value-static"===a?.title&&(e.children[0].value=t[r])}))}));break;case"fill-rule":["shape-fill","shape-gradient-fill"].includes(e.title)&&(0,u.Vn)(e,"attribute",(e=>{"fill-rule"===e.title&&e.children[0]?.value&&(e.children[0].value=t[r])}));break;case"opacity":["shape-stroke","shape-fill","shape-gradient-fill","shape-gradient-stroke"].includes(e.title)&&(0,u.Vn)(e,"element",(e=>{["stroke-opacity","opacity"].includes(e.title)&&(0,u.Vn)(e,"attribute",((e,l,a)=>{"static-value"===e.title&&e.children[0]?.value&&"number"===e.children[0].valueType&&"animated-value-static"===a?.title&&(e.children[0].value=t[r])}))}));break;case"hidden":(e.title.includes("shape")||e.title.includes("layer"))&&(0,u.Vn)(e,"attribute",(e=>{"hidden"===e.title&&e.children[0]&&(e.children[0].value=t[r])}));break;case"linear-gradient-fill-color":case"linear-gradient-stroke-color":m(e,t[r],"linear");break;case"radial-gradient-fill-color":case"radial-gradient-stroke-color":m(e,t[r],"radial");break;case"src":if("layer-image"===e.title){let a=e.children.find((e=>"image-id"===e.title));if("attribute"===a?.type){let e=a.children[0]?.value;(0,u.Vn)(l,"object",(l=>{"asset-image"===l.title&&l.children.some((t=>"id"===t.title&&"primitive"===t.children[0]?.type&&t.children[0].value===e))&&(0,u.Vn)(l,"attribute",(e=>{"embedded"===e.title&&e.children[0]?e.children[0].value=0:"path"===e.title&&e.children[0]?e.children[0].value="":"filename"===e.title&&e.children[0]&&(e.children[0].value=t[r])}))}))}}}},S=function(e){return void 0===e&&(e={lss:""}),async t=>{let l=function(e){let t=(0,i.u)("root",[]);return(0,a.Qc)(e).walkRules((e=>{let l=(0,i.u)("rule",{selectors:[],selector:""},[]);l.selectors=[...e.selectors],l.selector=e.selector,e.walkDecls((e=>{let t=(0,i.u)("declaration",{important:e.important,property:e.prop,value:e.value});l.children.push(t)})),t.children.push(l)})),t}(e.lss);(0,u.Vn)(l,"rule",(e=>{let l=((e,t)=>{let l=[];for(let r of t){let t=[],a=o.Qc(r);o._p(a,((l,r)=>{let a=t.length>0?t:e;if("id"===l.type)t=y(a,l.name,"layer-xml-id","compound"===r?.type);else if("class"===l.type)t=y(a,l.name,"css-class","compound"===r?.type);else if("type"===l.type){let e="",r=null;"FillShape"===l.name?(r="shape-type",e="fl"):"StrokeShape"===l.name?(r="shape-type",e="st"):"GradientFillShape"===l.name?(r="shape-type",e="gf"):"GradientStrokeShape"===l.name?(r="shape-type",e="gs"):"ShapeLayer"===l.name?(r="layer-type",e=4):"SolidColorLayer"===l.name?(r="layer-type",e=1):"ImageLayer"===l.name&&(r="layer-type",e=2),r&&e&&(t=y(a,e,r))}else if("attribute"===l.type){let e=null,i=l.value;"id"===l.name?e="layer-xml-id":"class"===l.name?e="css-class":"name"===l.name?e="name":"shape-type"===l.name?e="shape-type":"layer-type"===l.name&&(e="layer-type",i=Number(l.value)),e&&i&&["number","string"].includes(typeof i)&&(t=y(a,i,e,"compound"===r?.type))}})),l.push(...t)}return Array.from(new Set(l))})(t,e.selectors),r=(e=>{let t={};for(let l of e)if(b(l.property)&&(0,n.Vi)(l.value).isValid()){let e=(0,n.Vi)(l.value).rgba,r=[e.r/255,e.g/255,e.b/255,e.a];switch(l.property){case"fill-color":t["fill-color"]=r;break;case"stroke-color":t["stroke-color"]=r}}else if(b(l.property)&&d(l.value)){let e=f(l.value);switch(l.property){case"fill-color":t["linear-gradient-fill-color"]=e;break;case"stroke-color":t["linear-gradient-stroke-color"]=e}}else if(b(l.property)&&h(l.value)){let e=f(l.value);switch(l.property){case"fill-color":t["radial-gradient-fill-color"]=e;break;case"stroke-color":t["radial-gradient-stroke-color"]=e}}else if("stroke-width"===l.property)t["stroke-width"]=Number(l.value);else if("fill-rule"===l.property&&g(l.value))t["fill-rule"]=k(l.value);else if("opacity"===l.property){let e=v(l.value);if(Number.isNaN(e))continue;t.opacity=e<0?0:e>100?100:e}else if("visibility"===l.property)t.hidden="hidden"===l.value;else if("src"===l.property){let e=w(l.value);x(e)&&(t.src=e)}return t})(e.children);for(let a of l)F(a,r,t)}))}},V=e=>{let t=(0,r.v)();return{style:async l=>t.use(S,{lss:l}).process(e)}}}}]);