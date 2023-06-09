"use strict";(self.webpackChunk_lottiefiles_lottie_styler_docs=self.webpackChunk_lottiefiles_lottie_styler_docs||[]).push([[817],{9240:(e,t,a)=>{a.d(t,{Z:()=>E});var n=a(3027),r=a(9901),i=a(4517),l=a(967),s=a(2235),c=a(4270),o=a(4171),m=a(3223),d=a(4602);function u(e){return r.createElement("svg",(0,n.Z)({viewBox:"0 0 24 24"},e),r.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const h={breadcrumbHomeIcon:"breadcrumbHomeIcon_CHZ6"};function b(){const e=(0,d.Z)("/");return r.createElement("li",{className:"breadcrumbs__item"},r.createElement(o.Z,{"aria-label":(0,m.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},r.createElement(u,{className:h.breadcrumbHomeIcon})))}const v={breadcrumbsContainer:"breadcrumbsContainer_Fglc"};function g(e){let{children:t,href:a,isLast:n}=e;const i="breadcrumbs__link";return n?r.createElement("span",{className:i,itemProp:"name"},t):a?r.createElement(o.Z,{className:i,href:a,itemProp:"item"},r.createElement("span",{itemProp:"name"},t)):r.createElement("span",{className:i},t)}function p(e){let{children:t,active:a,index:l,addMicrodata:s}=e;return r.createElement("li",(0,n.Z)({},s&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,i.Z)("breadcrumbs__item",{"breadcrumbs__item--active":a})}),t,r.createElement("meta",{itemProp:"position",content:String(l+1)}))}function E(){const e=(0,s.s1)(),t=(0,c.Ns)();return e?r.createElement("nav",{className:(0,i.Z)(l.k.docs.docBreadcrumbs,v.breadcrumbsContainer),"aria-label":(0,m.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},r.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&r.createElement(b,null),e.map(((t,a)=>{const n=a===e.length-1;return r.createElement(p,{key:a,active:n,index:a,addMicrodata:!!t.href},r.createElement(g,{href:t.href,isLast:n},t.label))})))):null}},1924:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var n=a(9901),r=a(8908),i=a(2235),l=a(4602),s=a(4517),c=a(4171),o=a(7966),m=a(3223);const d={cardContainer:"cardContainer_BeJK",cardTitle:"cardTitle_aVrC",cardDescription:"cardDescription_oSdi"};function u(e){let{href:t,children:a}=e;return n.createElement(c.Z,{href:t,className:(0,s.Z)("card padding--lg",d.cardContainer)},a)}function h(e){let{href:t,icon:a,title:r,description:i}=e;return n.createElement(u,{href:t},n.createElement("h2",{className:(0,s.Z)("text--truncate",d.cardTitle),title:r},a," ",r),i&&n.createElement("p",{className:(0,s.Z)("text--truncate",d.cardDescription),title:i},i))}function b(e){let{item:t}=e;const a=(0,i.Wl)(t);return a?n.createElement(h,{href:a,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,m.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function v(e){let{item:t}=e;const a=(0,o.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.xz)(t.docId??void 0);return n.createElement(h,{href:t.href,icon:a,title:t.label,description:t.description??r?.description})}function g(e){let{item:t}=e;switch(t.type){case"link":return n.createElement(v,{item:t});case"category":return n.createElement(b,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function p(e){let{className:t}=e;const a=(0,i.jA)();return n.createElement(E,{items:a.items,className:t})}function E(e){const{items:t,className:a}=e;if(!t)return n.createElement(p,e);const r=(0,i.MN)(t);return n.createElement("section",{className:(0,s.Z)("row",a)},r.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(g,{item:e})))))}var f=a(2566),N=a(9527),Z=a(8020),_=a(9240),k=a(3461);const L={generatedIndexPage:"generatedIndexPage_TUPr",list:"list_ATJ7",title:"title_sTP6"};function T(e){let{categoryGeneratedIndex:t}=e;return n.createElement(r.d,{title:t.title,description:t.description,keywords:t.keywords,image:(0,l.Z)(t.image)})}function y(e){let{categoryGeneratedIndex:t}=e;const a=(0,i.jA)();return n.createElement("div",{className:L.generatedIndexPage},n.createElement(N.Z,null),n.createElement(_.Z,null),n.createElement(Z.Z,null),n.createElement("header",null,n.createElement(k.Z,{as:"h1",className:L.title},t.title),t.description&&n.createElement("p",null,t.description)),n.createElement("article",{className:"margin-top--lg"},n.createElement(E,{items:a.items,className:L.list})),n.createElement("footer",{className:"margin-top--lg"},n.createElement(f.Z,{previous:t.navigation.previous,next:t.navigation.next})))}function x(e){return n.createElement(n.Fragment,null,n.createElement(T,e),n.createElement(y,e))}},2566:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(3027),r=a(9901),i=a(3223),l=a(4517),s=a(4171);function c(e){const{permalink:t,title:a,subLabel:n,isNext:i}=e;return r.createElement(s.Z,{className:(0,l.Z)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},n&&r.createElement("div",{className:"pagination-nav__sublabel"},n),r.createElement("div",{className:"pagination-nav__label"},a))}function o(e){const{previous:t,next:a}=e;return r.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,i.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"})},t&&r.createElement(c,(0,n.Z)({},t,{subLabel:r.createElement(i.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),a&&r.createElement(c,(0,n.Z)({},a,{subLabel:r.createElement(i.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},8020:(e,t,a)=>{a.d(t,{Z:()=>c});var n=a(9901),r=a(4517),i=a(3223),l=a(967),s=a(6e3);function c(e){let{className:t}=e;const a=(0,s.E)();return a.badge?n.createElement("span",{className:(0,r.Z)(t,l.k.docs.docVersionBadge,"badge badge--secondary")},n.createElement(i.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:a.label}},"Version: {versionLabel}")):null}},9527:(e,t,a)=>{a.d(t,{Z:()=>g});var n=a(9901),r=a(4517),i=a(2462),l=a(4171),s=a(3223),c=a(6014),o=a(967),m=a(8300),d=a(6e3);const u={unreleased:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(s.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(s.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function h(e){const t=u[e.versionMetadata.banner];return n.createElement(t,e)}function b(e){let{versionLabel:t,to:a,onClick:r}=e;return n.createElement(s.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(l.Z,{to:a,onClick:r},n.createElement(s.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function v(e){let{className:t,versionMetadata:a}=e;const{siteConfig:{title:l}}=(0,i.Z)(),{pluginId:s}=(0,c.gA)({failfast:!0}),{savePreferredVersionName:d}=(0,m.J)(s),{latestDocSuggestion:u,latestVersionSuggestion:v}=(0,c.Jo)(s),g=u??(p=v).docs.find((e=>e.id===p.mainDocId));var p;return n.createElement("div",{className:(0,r.Z)(t,o.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(h,{siteTitle:l,versionMetadata:a})),n.createElement("div",{className:"margin-top--md"},n.createElement(b,{versionLabel:v.label,to:g.path,onClick:()=>d(v.name)})))}function g(e){let{className:t}=e;const a=(0,d.E)();return a.banner?n.createElement(v,{className:t,versionMetadata:a}):null}},3461:(e,t,a)=>{a.d(t,{Z:()=>m});var n=a(3027),r=a(9901),i=a(4517),l=a(3223),s=a(7854),c=a(4171);const o={anchorWithStickyNavbar:"anchorWithStickyNavbar_e6mf",anchorWithHideOnScrollNavbar:"anchorWithHideOnScrollNavbar_k3vK"};function m(e){let{as:t,id:a,...m}=e;const{navbar:{hideOnScroll:d}}=(0,s.L)();if("h1"===t||!a)return r.createElement(t,(0,n.Z)({},m,{id:void 0}));const u=(0,l.I)({id:"theme.common.headingLinkTitle",message:"Direct link to {heading}",description:"Title for link to heading"},{heading:"string"==typeof m.children?m.children:a});return r.createElement(t,(0,n.Z)({},m,{className:(0,i.Z)("anchor",d?o.anchorWithHideOnScrollNavbar:o.anchorWithStickyNavbar,m.className),id:a}),m.children,r.createElement(c.Z,{className:"hash-link",to:`#${a}`,"aria-label":u,title:u},"\u200b"))}}}]);