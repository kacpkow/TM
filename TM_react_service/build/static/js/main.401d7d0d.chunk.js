(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},102:function(e,t,a){},103:function(e,t,a){},112:function(e,t,a){},113:function(e,t,a){},114:function(e,t,a){},115:function(e,t,a){},117:function(e,t,a){},494:function(e,t,a){},495:function(e,t,a){},496:function(e,t,a){},497:function(e,t,a){},517:function(e,t,a){},518:function(e,t,a){},519:function(e,t,a){},521:function(e,t,a){},523:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(34),i=a(11),o=a(22),l=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function s(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var u=a(3),m=Object(n.createContext)({}),d=function(e){var t=e.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=Object(n.useState)(function(){try{var a=localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return t}}),r=Object(u.a)(a,2),c=r[0],i=r[1];return[c,function(t){try{var a=t instanceof Function?t(c):t;i(a),localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]}("user"),c=Object(u.a)(a,2),i=c[0],o=c[1];return r.a.createElement(m.Provider,{value:{user:i,startSession:function(e){o(e)},clearSession:function(){o(!1)}}},t)},p=function(){return Object(n.useContext)(m)},f=a(17),b=a(24),v=a.n(b),E=Object(n.createContext)({}),j=function(e){var t=e.children,a=Object(n.useState)([]),c=Object(u.a)(a,2),i=c[0],o=c[1],l=function(){i.length&&(i.filter(function(e){return e.expire<=Date.now()}).length>0&&o(function(e){return e.filter(function(e){return e.expire>=Date.now()})}))};return Object(n.useEffect)(function(){var e=setInterval(l,200);return function(){clearInterval(e)}},[i]),r.a.createElement(E.Provider,{value:{items:i,createAlert:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"primary",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;o(function(n){return[].concat(Object(f.a)(n),[{id:v()(),children:e,variant:t,expire:Date.now()+a}])})},removeAlert:function(e){o(function(t){return Object(f.a)(t.filter(function(t){return t.id!==e}))})}}},t)},g=function(){return Object(n.useContext)(E)},O=a(13),h=a(8),y=Object(n.createContext)({}),k=function(e){var t=e.children,a=Object(n.useState)({}),c=Object(u.a)(a,2),i=c[0],o=c[1];return r.a.createElement(y.Provider,{value:{createSetting:function(e,t){o(function(a){return Object(h.a)({},a,Object(O.a)({},e,t))})},getSetting:function(e){return i[e]||!1},settings:i}},t)},w=function(){return Object(n.useContext)(y)},z=a(6),C=(a(101),function(e){var t=e.className,a=void 0===t?"":t,n=Object(z.a)(e,["className"]);return r.a.createElement("div",Object.assign({className:"wrapper ".concat(a)},n))}),x=a(10),S=(a(102),function(e){var t=e.isOpen,a=void 0!==t&&t,n=Object(z.a)(e,["isOpen"]),c=Object(x.b)(a?{opacity:1,pointerEvents:"auto"}:{opacity:0,pointerEvents:"none"});return r.a.createElement(x.a.div,Object.assign({className:"overlay",style:c},n))}),N=function(e){var t=e.children;return Object(c.createPortal)(t,document.body)},_=(a(103),function(){var e=p().user,t=Object(n.useState)(!1),a=Object(u.a)(t,2),c=a[0],o=a[1],l=function(){return o(!1)},s=Object(x.b)(c?{left:0,opacity:1,pointerEvents:"auto"}:{left:-50,opacity:0,pointerEvents:"none"});return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:"button",className:"nav-trigger",onClick:function(){return o(function(e){return!e})}}),r.a.createElement(N,null,r.a.createElement(S,{isOpen:c,onClick:l}),r.a.createElement(x.a.div,{className:"nav",style:s},r.a.createElement(i.b,{onClick:l,to:"/",className:"nav__logo"},r.a.createElement("b",null,"TK")," Projekt"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/",exact:!0},"G\u0142\xf3wna")),e&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/konto"},"Moje konto")),e.isStaff&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/aktywuj"},"Aktywacja kont"))),r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/edytor"},"Dodaj grafik\u0119")),r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/upload"},"Manager plik\xf3w")),r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/wyloguj"},"Wyloguj si\u0119"))),!e&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/zaloguj"},"Logowanie")),r.a.createElement("li",null,r.a.createElement(i.c,{onClick:l,to:"/zarejestruj"},"Rejestracja")))))))}),A=(a(112),function(){var e=w().getSetting;return r.a.createElement("div",{className:"header"},r.a.createElement(C,{className:"header__content"},r.a.createElement(_,null),r.a.createElement("div",{className:"header__title"},e("title"))))}),D="small",P="medium",B={primary:"primary",danger:"danger",warning:"warning",success:"success"},H="primary",I="danger",R="warning",T="success",Y="small",F="medium",L="http://127.0.0.1:8000",M=(a(113),function(e){var t=e.className,a=void 0===t?"":t,n=e.variant,c=void 0===n?B.primary:n,i=e.children,o=e.onClose,l=Object(z.a)(e,["className","variant","children","onClose"]);return r.a.createElement("div",Object.assign({className:"alert alert--".concat(c," ").concat(a)},l),r.a.createElement("div",{className:"alert__content"},i),o&&r.a.createElement("button",{type:"button",className:"alert__close",onClick:o},"\xd7"))}),W=(a(114),function(){var e=g(),t=e.items,a=e.removeAlert,n=Object(x.c)(t,function(e){return e.id},{from:{opacity:0,maxHeight:"0vh",overflow:"hidden"},enter:{opacity:1,maxHeight:"100vh"},leave:{opacity:0,maxHeight:"0vh"}});return r.a.createElement(N,null,r.a.createElement("div",{className:"notifications"},n.map(function(e){var t=e.item,n=e.key,c=e.props;return r.a.createElement(x.a.div,{key:n,style:c},r.a.createElement(M,Object.assign({onClose:function(){return a(t.id)}},t)))})))}),U=(a(115),function(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,null),r.a.createElement(W,null),r.a.createElement(C,null,r.a.createElement("main",{className:"main"},t)))}),J=function(e){var t=e.component,a=e.unauthorized,n=e.authorized,c=Object(z.a)(e,["component","unauthorized","authorized"]),i=p().user;return r.a.createElement(o.b,Object.assign({},c,{render:function(e){return a&&i?r.a.createElement(o.a,{to:"/"}):n&&!i?r.a.createElement(o.a,{to:"/zaloguj"}):r.a.createElement(t,e)}}))},Z=(a(116),a(117),a(5)),K=a.n(Z),X=a(7),V=a(29),G=a(18),$=function(e){var t=w().createSetting;Object(n.useEffect)(function(){document.title=e||document.title,t("title",e)},[e])},q=(a(494),function(e){var t=e.isActive,a=void 0!==t&&t,n=e.children,c=Object(z.a)(e,["isActive","children"]);return Object(x.c)(a,null,{enter:{opacity:1},leave:{opacity:0}}).map(function(e){var t=e.item,a=e.key,i=e.props;return r.a.createElement("div",Object.assign({key:a},c),t?r.a.createElement(x.a.div,{style:i,className:"loading"}):r.a.createElement(x.a.div,{style:i},n))})}),Q=(a(495),function(e){var t=e.className,a=void 0===t?"":t,n=e.isOpen,c=void 0!==n&&n,i=e.size,o=void 0===i?P:i,l=e.onClose,s=e.children,u=Object(z.a)(e,["className","isOpen","size","onClose","children"]),m=Object(x.b)(c?{opacity:1,pointerEvents:"auto",marginTop:0}:{opacity:0,pointerEvents:"none",marginTop:-20});return r.a.createElement(N,null,r.a.createElement(S,{isOpen:c,onClick:l}),r.a.createElement(x.a.div,Object.assign({style:m,className:"modal modal--".concat(o," ").concat(a)},u),r.a.createElement("div",{className:"modal__content"},s,l&&r.a.createElement("button",{type:"button",className:"modal__close",onClick:l},"\xd7"))))}),ee=function(e){var t=e.image,a=e.isOpen,n=e.onClose,c=e.children;return r.a.createElement(Q,{isOpen:a,onClose:n},r.a.createElement("div",{className:"text-center"},t&&r.a.createElement("img",{className:"preview",src:t,alt:"Podgl\u0105d grafiki"}),c&&r.a.createElement("div",{dangerouslySetInnerHTML:{__html:c}})))},te=(a(496),function(e){var t=e.className,a=void 0===t?"":t,r=e.as,c=void 0===r?"button":r,i=e.type,o=void 0===i?"button":i,l=e.variant,s=void 0===l?H:l,u=e.size,m=void 0===u?F:u,d=e.isLoading,p=void 0!==d&&d,f=e.children,b=Object(z.a)(e,["className","as","type","variant","size","isLoading","children"]);return Object(n.createElement)(c,Object(h.a)({className:"btn btn--".concat(s," btn--").concat(m," ").concat(p?"btn--loading":""," ").concat(a),type:"button"===c?o:void 0},b),f)}),ae=(a(497),function(e){var t=e.className,a=void 0===t?"":t,n=Object(z.a)(e,["className"]);return r.a.createElement("hr",Object.assign({className:"separator ".concat(a)},n))}),ne=a(93),re=a.n(ne),ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=p().user,a={};return t&&(a.Authorization="Token ".concat(t.token)),e.multipart&&(a["Content-Type"]="multipart/form-data"),re.a.create({baseURL:L,headers:Object(h.a)({"Content-Type":"application/json"},a)})},ie=(a(517),function(e){var t=e.className,a=void 0===t?"":t,n=Object(z.a)(e,["className"]);return r.a.createElement("div",{className:"table"},r.a.createElement("table",Object.assign({className:"table__content ".concat(a)},n)))}),oe=function(e){var t=e.className,a=void 0===t?"":t,n=Object(z.a)(e,["className"]);return r.a.createElement("tr",Object.assign({className:"table__row ".concat(a)},n))},le=function(e){var t=e.className,a=void 0===t?"":t,n=Object(z.a)(e,["className"]);return r.a.createElement("thead",Object.assign({className:"table__head ".concat(a)},n))},se=function(e){var t=e.className,a=void 0===t?"":t,r=e.as,c=void 0===r?"td":r,i=e.children,o=Object(z.a)(e,["className","as","children"]);return Object(n.createElement)(c,Object(h.a)({className:"table__column ".concat(a)},o),i)},ue=function(e){var t=e.className,a=void 0===t?"":t,n=Object(z.a)(e,["className"]);return r.a.createElement("tbody",Object.assign({className:"table__body ".concat(a)},n))},me=function(e){var t=e.isOpen,a=e.onClose,c=e.onDone,i=e.id,o=ce(),l=g().createAlert,s=Object(n.useState)(!1),m=Object(u.a)(s,2),d=m[0],p=m[1],f=function(){var e=Object(X.a)(K.a.mark(function e(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.prev=1,e.next=4,o.delete("/api/editor/".concat(i,"/"));case 4:e.next=11;break;case 6:return e.prev=6,e.t0=e.catch(1),l("B\u0142\u0105d podczas usuwania pliku ".concat(String.fromCodePoint(9888)),B.danger),p(!1),e.abrupt("return");case 11:c&&c(),l("Plik usuni\u0119ty pomy\u015blnie",B.success),p(!1);case 14:case"end":return e.stop()}},e,null,[[1,6]])}));return function(){return e.apply(this,arguments)}}();return r.a.createElement(Q,{isOpen:t,size:D,onClose:a},r.a.createElement("div",{style:{marginBottom:15}},"Czy na pewno chcesz usun\u0105\u0107 ten plik?"),r.a.createElement(te,{variant:I,onClick:f,isLoading:d},"Usu\u0144 plik"))},de=function(){$("Strona g\u0142\xf3wna");var e=ce(),t=Object(n.useState)([]),a=Object(u.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)(!0),s=Object(u.a)(l,2),m=s[0],d=s[1],p=Object(n.useState)(null),f=Object(u.a)(p,2),b=f[0],v=f[1],E=Object(n.useState)(!1),j=Object(u.a)(E,2),O=j[0],h=j[1],y=g().createAlert,k=function(){var t=Object(X.a)(K.a.mark(function t(){var a;return K.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.get("/api/editor/");case 3:a=t.sent,t.next=10;break;case 6:return t.prev=6,t.t0=t.catch(0),y("B\u0142\u0105d pobierania danych z serwisu ".concat(String.fromCodePoint(9888)),B.danger),t.abrupt("return");case 10:o(a.data.map(function(e){return{id:e.id,url:"".concat(L,"/image/").concat(e.id,"/"),createdAt:e.created_at,updatedAt:e.updated_at,source:e.source}})),d(!1);case 12:case"end":return t.stop()}},t,null,[[0,6]])}));return function(){return t.apply(this,arguments)}}(),w=function(){return h(!1)};return Object(n.useEffect)(function(){k()},[]),r.a.createElement(q,{isActive:m},r.a.createElement(te,{as:i.b,to:"edytor"},"Dodaj grafik\u0119"),r.a.createElement(ae,null),r.a.createElement(ee,{isOpen:b,onClose:function(){return v(!1)}},b),r.a.createElement(me,{id:O,isOpen:O,onClose:w,onDone:function(){k(),w()}}),r.a.createElement(ie,null,r.a.createElement(le,null,r.a.createElement(oe,null,r.a.createElement(se,{as:"th"},"Link"),r.a.createElement(se,{as:"th"},"Data utworzenia"),r.a.createElement(se,{as:"th"},"Data edycji"),r.a.createElement(se,{as:"th"},"Akcje"))),r.a.createElement(ue,null,c.map(function(e){return r.a.createElement(oe,{key:e.id},r.a.createElement(se,null,r.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.url)),r.a.createElement(se,null,Object(V.format)(new Date(e.createdAt),"MM/DD/YYYY, HH:mm")),r.a.createElement(se,null,Object(V.format)(new Date(e.updatedAt),"MM/DD/YYYY, HH:mm")),r.a.createElement(se,null,r.a.createElement(te,{size:Y,onClick:function(){return t=e.id,h(t);var t}},r.a.createElement(G.Trash2,{size:15})),r.a.createElement(te,{size:Y,onClick:function(){return v(e.source)}},r.a.createElement(G.Eye,{size:15})),r.a.createElement(te,{as:i.b,size:Y,to:"edytor/".concat(e.id)},r.a.createElement(G.Edit,{size:15}))))}))))},pe=function(){var e=Object(n.useState)({}),t=Object(u.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)({}),i=Object(u.a)(c,2),o=i[0],l=i[1],s=function(e){var t=e.target,a=t.name,n=t.value;r(function(e){return Object(h.a)({},e,Object(O.a)({},a,n))})};return{field:function(e){return{name:e,onChange:s,value:a[e]||"",error:o[e]||!1}},fields:a,setFields:r,setErrors:l}},fe=(a(518),function(e){var t=e.className,a=void 0===t?"":t,r=e.as,c=void 0===r?"input":r,i=e.type,o=void 0===i?"text":i,l=e.children,s=Object(z.a)(e,["className","as","type","children"]);return Object(n.createElement)(c,Object(h.a)({className:"input ".concat(a),type:o},s),l)}),be=(a(519),function(e){var t=e.label,a=e.error,n=Object(z.a)(e,["label","error"]),c=v()();return r.a.createElement("label",{className:"field",htmlFor:c},t&&r.a.createElement("span",{className:"field__text"},t),r.a.createElement(fe,Object.assign({id:c},n)),a&&r.a.createElement("span",{className:"field__error"},a))}),ve=function(){$("Moje konto");var e=ce(),t=g().createAlert,a=pe(),c=a.field,i=a.fields,o=a.setFields,l=a.setErrors,s=Object(n.useState)(!1),m=Object(u.a)(s,2),d=m[0],p=m[1],f=function(){var a=Object(X.a)(K.a.mark(function a(){var n,r,c,i,s,u,m;return K.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.get("/api/user/");case 3:n=a.sent,a.next=10;break;case 6:return a.prev=6,a.t0=a.catch(0),t("B\u0142\u0105d pobierania danych u\u017cytkownika z serwisu",B.danger),a.abrupt("return");case 10:200===n.status&&(r=n.data,p(!1),c=r.user[0],i=c.username,s=c.first_name,u=c.last_name,m=c.email,o({username:i,first_name:s,last_name:u,email:m}),l({}));case 11:case"end":return a.stop()}},a,null,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),b=function(){var a=Object(X.a)(K.a.mark(function a(n){var r;return K.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),p(!0),a.prev=2,a.next=5,e.patch("/api/change_user_values/",i);case 5:r=a.sent,a.next=14;break;case 8:return a.prev=8,a.t0=a.catch(2),t("Ups, co\u015b posz\u0142o nie tak...",B.danger),l(a.t0.response.data),p(!1),a.abrupt("return");case 14:if(202!==r.status){a.next=19;break}t("Zmiana danych zako\u0144czona pomy\u015blnie",B.success),f(),a.next=22;break;case 19:return t("Ups, co\u015b posz\u0142o nie tak...",B.danger),p(!1),a.abrupt("return");case 22:p(!1);case 23:case"end":return a.stop()}},a,null,[[2,8]])}));return function(e){return a.apply(this,arguments)}}();return Object(n.useEffect)(function(){f()},[]),r.a.createElement(q,{isActive:d},r.a.createElement("form",{onSubmit:b},r.a.createElement(be,Object.assign({label:"Nazwa u\u017cytkownika"},c("username"))),r.a.createElement(be,Object.assign({label:"Imi\u0119"},c("first_name"))),r.a.createElement(be,Object.assign({label:"Nazwisko"},c("last_name"))),r.a.createElement(be,Object.assign({label:"Adres email"},c("email"))),r.a.createElement(be,Object.assign({label:"Has\u0142o",type:"password"},c("password"))),r.a.createElement(be,Object.assign({label:"Powt\xf3rz has\u0142o",type:"password"},c("repassword"))),r.a.createElement(te,{type:"submit"},"Zapisz zmiany")))},Ee=function(){$("Aktywacja u\u017cytkownik\xf3w");var e=ce(),t=Object(n.useState)([]),a=Object(u.a)(t,2),c=a[0],i=a[1],o=Object(n.useState)(!0),l=Object(u.a)(o,2),s=l[0],m=l[1],d=g().createAlert,p=function(){var t=Object(X.a)(K.a.mark(function t(){var a;return K.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.get("/api/users/");case 3:a=t.sent,t.next=10;break;case 6:return t.prev=6,t.t0=t.catch(0),d("B\u0142\u0105d pobierania u\u017cytkownik\xf3w z serwisu ".concat(String.fromCodePoint(9888)),B.danger),t.abrupt("return");case 10:200===a.status&&i(a.data.users),m(!1);case 12:case"end":return t.stop()}},t,null,[[0,6]])}));return function(){return t.apply(this,arguments)}}();function f(){return(f=Object(X.a)(K.a.mark(function t(a,n){var r,c;return K.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return c=a?"/api/deactivate_user/":"/api/activate_user/",t.prev=1,t.next=4,e.post(c,{userId:n});case 4:r=t.sent,t.next=11;break;case 7:return t.prev=7,t.t0=t.catch(1),d("B\u0142\u0105d zmiany danych u\u017cytkownika ".concat(String.fromCodePoint(9888)),B.danger),t.abrupt("return");case 11:200===r.status&&d("Zmiana danych u\u017cytkownika zako\u0144czona pomy\u015blnie!",B.success),p();case 13:case"end":return t.stop()}},t,null,[[1,7]])}))).apply(this,arguments)}return Object(n.useEffect)(function(){p()},[]),r.a.createElement(q,{isActive:s},r.a.createElement(ie,null,r.a.createElement(le,null,r.a.createElement(oe,null,r.a.createElement(se,{as:"th"},"U\u017cytkownik"),r.a.createElement(se,{as:"th"},"Imi\u0119"),r.a.createElement(se,{as:"th"},"Nazwisko"),r.a.createElement(se,{as:"th"},"Status konta"),r.a.createElement(se,{as:"th"},"Akcja"))),r.a.createElement(ue,null,c.map(function(e){return r.a.createElement(oe,{key:e.id},r.a.createElement(se,null,e.username),r.a.createElement(se,null,e.first_name),r.a.createElement(se,null,e.last_name),r.a.createElement(se,null,e.is_active?"Aktywne":"Nieaktywne"),r.a.createElement(se,null,r.a.createElement(te,{size:Y,onClick:function(){return function(e,t){return f.apply(this,arguments)}(e.is_active,e.id)},variant:e.is_active?R:T},e.is_active?"Deaktywuj":"Aktywuj")))}))))},je=a(23),ge=a.n(je),Oe=Object(n.createContext)({}),he=function(){var e=Object(n.useContext)(Oe),t=e.addText,a=e.addRect,c=e.addCircle,i=e.addImage,o=e.saveData;return r.a.createElement("div",{className:"tools"},r.a.createElement(te,{onClick:t},"Dodaj tekst"),r.a.createElement(te,{onClick:a},"Dodaj prostok\u0105t"),r.a.createElement(te,{onClick:c},"Dodaj ko\u0142o"),r.a.createElement(te,{onClick:i},"Dodaj grafik\u0119"),r.a.createElement(te,{onClick:o},"Zapisz"),r.a.createElement(ae,null))},ye=a(94),ke=function(e){var t=e.as,a=e.children,r=Object(z.a)(e,["as","children"]);return Object(n.createElement)(t,r,a)},we=function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=(t[0],t[1]),c=Object(n.useContext)(Oe),i=c.items,o=c.updateItem,l=c.focus,s=c.setFocus,m=Object(n.useState)(!1),d=Object(u.a)(m,2),p=d[0],f=d[1];Object(n.useEffect)(function(){l||a(null)},[l]);var b=Object(ye.a)(function(e){var t=Object(u.a)(e.args,3),n=t[0],r=t[1],c=t[2],i=e.delta,l=e.target,s=e.direction;o(n,{params:{x:r+i[0],y:c+i[1]}}),f(s.some(function(e){return 0!==e})),a(l.getBoundingClientRect())});return r.a.createElement(r.a.Fragment,null,r.a.createElement(ke,{as:"svg",className:"canvas",width:"100%",height:"100%"},i.map(function(e){var t=e.id,a=e.params,n=(e.editable,Object(z.a)(e,["id","params","editable"]));return r.a.createElement(ke,Object.assign({as:"g",key:t,onClick:function(){p||s(t)},className:"drag",style:{fill:a.fill,fontSize:a.fontSize,transform:"translate(".concat(a.x,"px, ").concat(a.y,"px) rotate(").concat(a.rotate,"deg)")}},b(t,a.x,a.y)),r.a.createElement(ke,n))})))},ze=function(){var e=Object(n.useContext)(Oe),t=e.items,a=e.deleteItem,c=e.setFocus;return r.a.createElement("div",{className:"sidebar"},r.a.createElement("ul",null,t.length>0?t.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("button",{type:"button",onClick:function(){return c(e.id)}},e.id),r.a.createElement("button",{type:"button",onClick:function(){return a(e.id)}},"\xd7"))}):r.a.createElement("li",null,"Brak element\xf3w")))},Ce=function(){var e=Object(n.useContext)(Oe),t=e.items,a=e.updateItem,c=e.focus,i=e.setFocus,o=t.find(function(e){return e.id===c}),l=function(e){var t=e.target,n=t.name,r=t.value,c=ge.a.isEmpty(r)||ge.a.isNaN(Number(r))?r:Number(r);a(o.id,ge.a.set({},n,c))};return c?r.a.createElement(Q,{isOpen:!0,size:D,onClose:function(){return i(!1)}},r.a.createElement("form",null,o.editable.map(function(e){var t=e.label,a=e.field,n=e.type;return r.a.createElement(be,{label:t,type:n,name:a,value:ge.a.get(o,a),onChange:l})}))):null},xe={as:"text",children:"Example text",params:{x:0,y:15,rotate:0,fontSize:15,fill:"#000000"},editable:[{label:"Tekst",field:"children",type:"text"},{label:"Rozmiar czcionki",field:"params.fontSize",type:"number"},{label:"Kolor tekstu",field:"params.fill",type:"color"},{label:"Pozycja X",field:"params.x",type:"number"},{label:"Pozycja Y",field:"params.y",type:"number"},{label:"Rotacja",field:"params.rotate",type:"number"}]},Se={as:"rect",width:50,height:80,params:{x:0,y:0,rotate:0,fill:"#000000"},editable:[{label:"Kolor obiektu",field:"params.fill",type:"color"},{label:"Szeroko\u015b\u0107",field:"width",type:"number"},{label:"Wysoko\u015b\u0107",field:"height",type:"number"},{label:"Pozycja X",field:"params.x",type:"number"},{label:"Pozycja Y",field:"params.y",type:"number"},{label:"Rotacja",field:"params.rotate",type:"number"}]},Ne={as:"circle",r:50,params:{x:0,y:0,rotate:0,fill:"#000000"},editable:[{label:"Promie\u0144",field:"r",type:"number"},{label:"Kolor obiektu",field:"params.fill",type:"color"},{label:"Pozycja X",field:"params.x",type:"number"},{label:"Pozycja Y",field:"params.y",type:"number"},{label:"Rotacja",field:"params.rotate",type:"number"}]},_e={as:"image",width:100,height:100,xlinkHref:"https://source.unsplash.com/random/200x200",params:{x:0,y:0,rotate:0,fill:"#000000"},editable:[{label:"Link",field:"xlinkHref",type:"text"},{label:"Szeroko\u015b\u0107",field:"width",type:"number"},{label:"Wysoko\u015b\u0107",field:"height",type:"number"},{label:"Pozycja X",field:"params.x",type:"number"},{label:"Pozycja Y",field:"params.y",type:"number"},{label:"Rotacja",field:"params.rotate",type:"number"}]},Ae=function(e){var t=e.isOpen,a=e.onClose,c=e.onDone,i=ce({multipart:!0}),o=g().createAlert,l=Object(n.useState)([]),s=Object(u.a)(l,2),m=s[0],d=s[1],p=Object(n.useState)(!1),f=Object(u.a)(p,2),b=f[0],v=f[1],E=pe(),j=E.field,O=E.fields,h=E.setErrors,y=function(){var e=Object(X.a)(K.a.mark(function e(t){var a;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),v(!0),(a=new FormData).append("pic",m),a.append("pic_text",O.pic_text||""),e.prev=5,e.next=8,i.post("/api/upload_image/",a);case 8:d(null),c&&c(),o("Plik zosta\u0142 wgrany pomy\u015blnie ".concat(String.fromCodePoint(127878)),B.success),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(5),o("B\u0142\u0105d podczas dodawania pliku ".concat(String.fromCodePoint(9888)),B.danger),h(e.t0.response.data);case 17:v(!1);case 18:case"end":return e.stop()}},e,null,[[5,13]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(Q,{isOpen:t,size:D,onClose:a},r.a.createElement("form",{onSubmit:y},r.a.createElement(be,Object.assign({type:"input",label:"Nazwa pliku"},j("pic_text"))),r.a.createElement(be,{type:"file",label:"Dodaj plik",error:j("pic").error,onChange:function(e){d(e.target.files[0])}}),r.a.createElement(te,{type:"submit",isLoading:b},"Dodaj plik")))},De=function(e){var t=e.isOpen,a=e.onClose,c=e.onSelect,i=g().createAlert,o=ce(),l=Object(n.useState)(!0),s=Object(u.a)(l,2),m=s[0],d=s[1],p=Object(n.useState)(!1),f=Object(u.a)(p,2),b=f[0],v=f[1],E=Object(n.useState)([]),j=Object(u.a)(E,2),O=j[0],h=j[1],y=function(){return v(!1)},k=function(){var e=Object(X.a)(K.a.mark(function e(){var t,a;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.prev=1,e.next=4,o.get("/api/images/");case 4:t=e.sent,a=t.data,h(a.images.map(function(e){return{id:e.id,url:L+e.pic,name:e.pic_text}})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),i("B\u0142\u0105d podczas \u0142adowania plik\xf3w ".concat(String.fromCodePoint(9888)),B.danger);case 12:d(!1);case 13:case"end":return e.stop()}},e,null,[[1,9]])}));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)(function(){k()},[]),r.a.createElement(q,{isActive:m},r.a.createElement(Q,{isOpen:t,onClose:a},r.a.createElement(te,{onClick:function(){return v(!0)}},"Dodaj plik"),r.a.createElement(ae,null),r.a.createElement("div",{className:"gallery"},O.map(function(e){return r.a.createElement("div",{key:e.id,className:"gallery__item",onClick:function(){return c(e.url)}},r.a.createElement("img",{src:e.url,alt:e.id}))}))),r.a.createElement(Ae,{isOpen:b,onClose:y,onDone:function(){k(),y()}}))},Pe=(a(521),function(e){var t=e.initialValue,a=void 0===t?[]:t,c=e.save,i=Object(n.useRef)(null),o=Object(n.useState)(a),l=Object(u.a)(o,2),s=l[0],m=l[1],d=Object(n.useState)(null),p=Object(u.a)(d,2),b=p[0],E=p[1],j=Object(n.useState)(!1),g=Object(u.a)(j,2),O=g[0],y=g[1],k=function(e){return m([].concat(Object(f.a)(s),[Object(h.a)({id:v()()},e)]))};return Object(n.useEffect)(function(){m(a)},[a]),r.a.createElement(Oe.Provider,{value:{items:s,deleteItem:function(e){m(s.filter(function(t){return t.id!==e})),E(null)},addText:function(){return k(xe)},addRect:function(){return k(Se)},addCircle:function(){return k(Ne)},addImage:function(){return y(!0)},updateItem:function(e,t){m(function(a){return a.map(function(a){return a.id===e?ge.a.merge({},a,t):a})})},saveData:function(){c&&c({config:s,source:i.current.innerHTML})},focus:b,setFocus:E}},r.a.createElement(De,{isOpen:O,onClose:function(){return y(!1)},onSelect:function(e){k(Object(h.a)({},_e,{xlinkHref:e}))}}),r.a.createElement("div",{className:"editor"},r.a.createElement(he,null),r.a.createElement("div",{ref:i},r.a.createElement(we,null)),r.a.createElement(ze,null),r.a.createElement(Ce,null)))}),Be=function(e){var t=e.match.params;$("Dodaj grafik\u0119");var a=ce(),c=Object(n.useState)([]),i=Object(u.a)(c,2),o=i[0],l=i[1],s=Object(n.useState)(!0),m=Object(u.a)(s,2),d=m[0],p=m[1],f=g().createAlert,b=function(){var e=Object(X.a)(K.a.mark(function e(){var n;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.prev=1,e.next=4,a.get("/api/editor/".concat(t.id,"/"));case 4:n=e.sent,e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(1),f("B\u0142\u0105d pobierania danych z serwisu ".concat(String.fromCodePoint(9888)),B.danger),e.abrupt("return");case 11:l(JSON.parse(n.data.config)),p(!1);case 13:case"end":return e.stop()}},e,null,[[1,7]])}));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)(function(){t.id&&b(),p(!1)},[]);var v=function(){var e=Object(X.a)(K.a.mark(function e(n){var r,c;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.config,c=n.source,p(!0),l(r),e.prev=3,e.next=6,a({url:"api/editor/".concat(t.id?"".concat(t.id,"/"):""),method:t.id?"put":"post",data:{config:JSON.stringify(r),source:c}});case 6:e.next=12;break;case 8:return e.prev=8,e.t0=e.catch(3),f("B\u0142\u0105d pobierania danych z serwisu ".concat(String.fromCodePoint(9888)),B.danger),e.abrupt("return");case 12:p(!1),f("Sukces, obraz zosta\u0142 pomy\u015blnie zapisany ".concat(String.fromCodePoint(9888)),B.success);case 14:case"end":return e.stop()}},e,null,[[3,8]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(q,{isActive:d},r.a.createElement(Pe,{initialValue:o,save:v}))},He=a(95),Ie=a.n(He),Re=function(e){var t=e.isOpen,a=e.onClose,c=e.onDone,i=e.id,o=ce(),l=g().createAlert,s=Object(n.useState)(!1),m=Object(u.a)(s,2),d=m[0],p=m[1],f=function(){var e=Object(X.a)(K.a.mark(function e(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.prev=1,e.next=4,o.delete("/api/delete_image/",{data:{id:i}});case 4:e.next=11;break;case 6:return e.prev=6,e.t0=e.catch(1),l("B\u0142\u0105d podczas usuwania pliku ".concat(String.fromCodePoint(9888)),B.danger),p(!1),e.abrupt("return");case 11:c&&c(),l("Plik usuni\u0119ty pomy\u015blnie",B.success),p(!1);case 14:case"end":return e.stop()}},e,null,[[1,6]])}));return function(){return e.apply(this,arguments)}}();return r.a.createElement(Q,{isOpen:t,size:D,onClose:a},r.a.createElement("div",{style:{marginBottom:15}},"Czy na pewno chcesz usun\u0105\u0107 ten plik?"),r.a.createElement(te,{variant:I,onClick:f,isLoading:d},"Usu\u0144 plik"))},Te=function(){$("Manager plik\xf3w");var e=ce(),t=g().createAlert,a=Object(n.useState)([]),c=Object(u.a)(a,2),i=c[0],o=c[1],l=Object(n.useState)(!0),s=Object(u.a)(l,2),m=s[0],d=s[1],p=Object(n.useState)(!1),f=Object(u.a)(p,2),b=f[0],v=f[1],E=Object(n.useState)(!1),j=Object(u.a)(E,2),O=j[0],h=j[1],y=Object(n.useState)(null),k=Object(u.a)(y,2),w=k[0],z=k[1],C=function(){var a=Object(X.a)(K.a.mark(function a(){var n;return K.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d(!0),a.prev=1,a.next=4,e.get("/api/images/");case 4:n=a.sent,a.next=12;break;case 7:return a.prev=7,a.t0=a.catch(1),t("B\u0142\u0105d podczas \u0142adowania plik\xf3w ".concat(String.fromCodePoint(9888)),B.danger),d(!1),a.abrupt("return");case 12:o(n.data.images.map(function(e){return{id:e.id,name:e.pic_text,url:L+e.pic,createdAt:e.timestamp}})),d(!1);case 14:case"end":return a.stop()}},a,null,[[1,7]])}));return function(){return a.apply(this,arguments)}}(),x=function(){return v(!1)},S=function(){return h(!1)};return Object(n.useEffect)(function(){C()},[]),r.a.createElement(q,{isActive:m},r.a.createElement(te,{onClick:function(){return v(!0)}},"Dodaj plik"),r.a.createElement(ae,null),r.a.createElement(Ae,{isOpen:b,onClose:x,onDone:function(){C(),x()}}),r.a.createElement(ee,{image:w,isOpen:w,onClose:function(){return z(null)}}),r.a.createElement(Re,{id:O,isOpen:O,onClose:S,onDone:function(){C(),S()}}),r.a.createElement(ie,null,r.a.createElement(le,null,r.a.createElement(oe,null,r.a.createElement(se,{as:"th"},"Nazwa"),r.a.createElement(se,{as:"th"},"Data utworzenia"),r.a.createElement(se,{as:"th"},"Akcje"))),r.a.createElement(ue,null,i.map(function(e){return r.a.createElement(oe,{key:e.id},r.a.createElement(se,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:e.url},e.name)),r.a.createElement(se,null,Object(V.format)(new Date(e.createdAt),"MM/DD/YYYY, HH:mm")),r.a.createElement(se,null,r.a.createElement(te,{size:Y,onClick:function(){return t=e.id,h(t);var t}},r.a.createElement(G.Trash2,{size:15})),r.a.createElement(te,{size:Y,onClick:function(){return z(e.url)}},r.a.createElement(G.Eye,{size:15})),r.a.createElement(te,{size:Y,onClick:function(){return a=e.url,Ie()(a),void t("Link do grafiki zosta\u0142 skopiowany do schowka ".concat(String.fromCodePoint(128588)),B.success);var a}},r.a.createElement(G.Clipboard,{size:15}))))}))))},Ye=function(e){var t=e.history;$("Logowanie");var a=g().createAlert,n=p().startSession,c=ce(),i=pe(),o=i.field,l=i.fields,s=function(){var e=Object(X.a)(K.a.mark(function e(r){var i,o;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,e.next=4,c.post("/api/login/",l);case 4:i=e.sent,e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(1),a("".concat(e.t0.response.data.message," ").concat(String.fromCodePoint(9888)),B.danger),e.abrupt("return");case 11:200===i.status&&(o=i.data,n(Object(h.a)({username:l.username,email:l.email},o)),a("Cze\u015b\u0107 ".concat(l.username,"! Jak si\u0119 masz? ").concat(String.fromCodePoint(128075)),B.success),t.push("/"));case 12:case"end":return e.stop()}},e,null,[[1,7]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("form",{onSubmit:s},r.a.createElement(be,Object.assign({label:"Nazwa u\u017cytkownika"},o("username"))),r.a.createElement(be,Object.assign({label:"Has\u0142o",type:"password"},o("password"))),r.a.createElement(te,{type:"submit"},"Zaloguj si\u0119"))},Fe=function(e){var t=e.history;$("Rejestracja");var a=g().createAlert,n=pe(),c=n.field,i=n.fields,o=n.setErrors,l=ce(),s=function(){var e=Object(X.a)(K.a.mark(function e(n){var r;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,l.post("/api/register/",i);case 4:r=e.sent,e.next=12;break;case 7:return e.prev=7,e.t0=e.catch(1),a("B\u0142\u0105d rejestracji, spr\xf3buj ponownie! ".concat(String.fromCodePoint(9888)),B.danger),o(e.t0.response.data),e.abrupt("return");case 12:201===r.status?(a("Rejestracja zako\u0144czona pomy\u015blnie! Twoje konto oczekuje na aktywacj\u0119",B.success),t.push({pathname:"/zaloguj",state:{auth:!0}})):a("B\u0142\u0105d rejestracji! ".concat(String.fromCodePoint(128075)),B.danger);case 13:case"end":return e.stop()}},e,null,[[1,7]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("form",{onSubmit:s},r.a.createElement(be,Object.assign({label:"Nazwa u\u017cytkownika"},c("username"))),r.a.createElement(be,Object.assign({label:"Imi\u0119"},c("first_name"))),r.a.createElement(be,Object.assign({label:"Nazwisko"},c("last_name"))),r.a.createElement(be,Object.assign({label:"Adres email"},c("email"))),r.a.createElement(be,Object.assign({label:"Has\u0142o",type:"password"},c("password"))),r.a.createElement(be,Object.assign({label:"Powt\xf3rz has\u0142o",type:"password"},c("repassword"))),r.a.createElement(te,{type:"submit"},"Zarejestruj si\u0119"))},Le=function(e){var t=e.history,a=g().createAlert,r=p().clearSession;return Object(n.useEffect)(function(){a("Wylogowano pomy\u015blnie, trzymaj si\u0119 Andrzej ".concat(String.fromCodePoint(128588)),B.success),r(),t.push("/zaloguj")},[]),null},Me=function(){return $("Strona nie znaleziona"),r.a.createElement("div",null,"Strona nie zosta\u0142a znaleziona")};Object(c.render)(r.a.createElement(function(){return r.a.createElement(d,null,r.a.createElement(j,null,r.a.createElement(k,null,r.a.createElement(i.a,null,r.a.createElement(U,null,r.a.createElement(o.d,null,r.a.createElement(J,{path:"/",exact:!0,component:de,authorized:!0}),r.a.createElement(J,{path:"/konto",component:ve,authorized:!0}),r.a.createElement(J,{path:"/aktywuj",component:Ee,authorized:!0}),r.a.createElement(J,{path:"/edytor",exact:!0,component:Be,authorized:!0}),r.a.createElement(J,{path:"/edytor/:id",component:Be,authorized:!0}),r.a.createElement(J,{path:"/upload",component:Te,authorized:!0}),r.a.createElement(J,{path:"/zaloguj",component:Ye,unauthorized:!0}),r.a.createElement(J,{path:"/zarejestruj",component:Fe,unauthorized:!0}),r.a.createElement(J,{path:"/wyloguj",component:Le}),r.a.createElement(J,{component:Me})))))))},null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");l?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):s(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):s(t,e)})}}()},96:function(e,t,a){e.exports=a(523)}},[[96,1,2]]]);
//# sourceMappingURL=main.401d7d0d.chunk.js.map