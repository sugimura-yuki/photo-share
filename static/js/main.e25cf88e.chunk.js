(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(t,e,a){t.exports=a(42)},32:function(t,e,a){},33:function(t,e,a){},37:function(t,e,a){},42:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(24),s=a.n(o),i=(a(32),a(3)),c=a(4),u=a(6),l=a(5),h=a(7),p=(a(33),a(16)),m=a(13),b=a(1),d=a.n(b),f=a(8),g=a(18),w=a.n(g),y=a(11),v=a.n(y);function k(t){return O.apply(this,arguments)}function O(){return(O=Object(f.a)(d.a.mark(function t(e){var a,n=arguments;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n.length>1&&void 0!==n[1])||n[1],t.prev=1,x(e.scopes)){t.next=5;break}return t.next=5,j(e.scopes);case 5:return t.next=7,fetch(e.url,{method:e.method,headers:Object.assign({Authorization:[v.a.get("token_type"),v.a.get("access_token")].join(" "),Origin:window.location.protocol+"//"+window.location.host},e.headers),body:e.body});case 7:if(200===(a=t.sent).status){t.next=10;break}throw new Error("API status NOT 200");case 10:return t.prev=10,t.next=13,a.clone().json();case 13:return t.abrupt("return",t.sent);case 16:return t.prev=16,t.t0=t.catch(10),t.next=20,a.clone().text();case 20:return t.abrupt("return",t.sent);case 21:t.next=27;break;case 23:throw t.prev=23,t.t1=t.catch(1),E(),t.t1;case 27:case"end":return t.stop()}},t,null,[[1,23],[10,16]])}))).apply(this,arguments)}function E(){v.a.remove("access_token"),v.a.remove("scope"),v.a.remove("token_type")}function x(t){var e=[v.a.get("access_token"),v.a.get("scope"),v.a.get("token_type")],a=e[1];return!!e[0]&&(!!a&&(!!e[2]&&t.every(function(t){return a.split(" ").includes(t)})))}function j(t){return A.apply(this,arguments)}function A(){return(A=Object(f.a)(d.a.mark(function t(e){var a,n,r,o;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=w.a.stringify({client_id:"253396350469-h803pfhb9e30259hh0mribst9hglvvht.apps.googleusercontent.com",redirect_uri:window.location.protocol+"//"+window.location.host+"/auth",response_type:"token",scope:e.join(" "),include_granted_scopes:"true"}),n={width:"450",height:"600",menubar:"no",toolbar:"no",location:"no",status:"no"},r=Object.keys(n).map(function(t){return t+"="+n[t]}).join(","),o=window.open("https://accounts.google.com/o/oauth2/v2/auth?"+a,"Google Login",r),t.abrupt("return",new Promise(function(t,a){!function n(){!o||o.closed?x(e)?t():a("auth was rejected"):setTimeout(n,100)}()}));case 5:case"end":return t.stop()}},t)}))).apply(this,arguments)}a(37);var S=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement("span",{id:"GoogleButton"},r.a.createElement("button",{onClick:this.props.onClick,className:this.props.thema}))}}]),e}(r.a.Component),C=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(r)))).state={hasAuth:!1},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"login",value:function(){var t=Object(f.a)(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j(this.props.scopes);case 2:this.setState({hasAuth:!0}),this.props.onAuth&&this.props.onAuth();case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"logout",value:function(){E(),this.setState({hasAuth:!1})}},{key:"componentWillMount",value:function(){x(this.props.scopes)?(this.setState({hasAuth:!0}),this.props.onAuth&&this.props.onAuth()):this.setState({hasAuth:!1})}},{key:"render",value:function(){var t=this;return this.state.hasAuth?r.a.createElement("div",null,r.a.createElement("header",null,r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement("button",{onClick:function(e){return t.logout()}},"\u30ed\u30b0\u30a2\u30a6\u30c8"))),this.props.children):r.a.createElement("div",null,r.a.createElement("p",null,"\u30b5\u30fc\u30d3\u30b9\u3092\u3054\u5229\u7528\u3044\u305f\u3060\u304f\u305f\u3081\u306b\u306f\u3001Google\u30a2\u30ab\u30a6\u30f3\u30c8\u304c\u5fc5\u8981\u3067\u3059\u3002"),r.a.createElement(S,{thema:"dark",onClick:function(e){return t.login()}}))}}]),e}(r.a.Component),_=["https://www.googleapis.com/auth/photoslibrary","https://www.googleapis.com/auth/photoslibrary.sharing"],I=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(r)))).state={titleText:"",waitForCreate:!1},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"getSharedAlbumsList",value:function(){var t=Object(f.a)(d.a.mark(function t(){var e;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k({url:"https://photoslibrary.googleapis.com/v1/sharedAlbums",method:"GET",scopes:["https://www.googleapis.com/auth/photoslibrary"]});case 2:e=t.sent,console.log(e),this.setState({sharedAlbumsList:e});case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"createSharedAlbum",value:function(){var t=Object(f.a)(d.a.mark(function t(){var e,a,n;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.state.titleText,this.setState({titleText:"",waitForCreate:!0}),t.prev=2,t.next=5,k({url:"https://photoslibrary.googleapis.com/v1/albums",method:"POST",scopes:["https://www.googleapis.com/auth/photoslibrary"],body:JSON.stringify({album:{title:e}})});case 5:if(a=t.sent,console.log(a),a.id){t.next=9;break}throw new Error("cannot create album");case 9:return t.next=11,k({url:"https://photoslibrary.googleapis.com/v1/albums/"+a.id+":share",method:"POST",scopes:["https://www.googleapis.com/auth/photoslibrary.sharing"],body:JSON.stringify({sharedAlbumOptions:{isCollaborative:!0,isCommentable:!0}})});case 11:return n=t.sent,console.log(n),t.next=15,this.getSharedAlbumsList();case 15:return t.prev=15,this.setState({waitForCreate:!1}),t.finish(15);case 18:case"end":return t.stop()}},t,this,[[2,,15,18]])}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return r.a.createElement(C,{scopes:_,onAuth:function(){return t.getSharedAlbumsList()}},r.a.createElement("h2",null,"\u5171\u6709\u30a2\u30eb\u30d0\u30e0\u306e\u65b0\u898f\u4f5c\u6210"),"\u30bf\u30a4\u30c8\u30eb",r.a.createElement("input",{type:"text",onChange:function(e){return t.setState({titleText:e.target.value})},value:this.state.titleText,required:!0}),r.a.createElement("button",{onClick:function(e){return t.createSharedAlbum()},disabled:this.state.waitForCreate},"\u65b0\u898f\u4f5c\u6210"),r.a.createElement("hr",null),r.a.createElement("h2",null,"\u5171\u6709\u30a2\u30eb\u30d0\u30e0\u4e00\u89a7"),function(){if(t.state.sharedAlbumsList&&t.state.sharedAlbumsList.sharedAlbums)return r.a.createElement("table",{style:{margin:"auto"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("td",null,"\u30a2\u30eb\u30d0\u30e0\u540d"),r.a.createElement("td",null,"\u5199\u771f\u6295\u7a3f\u30da\u30fc\u30b8"))),r.a.createElement("tbody",null,t.state.sharedAlbumsList.sharedAlbums.map(function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("th",{style:{textAlign:"left"}},r.a.createElement("a",{href:t.shareInfo?t.shareInfo.shareableUrl:t.productUrl,about:"_blank"},t.title||"[no title]")),r.a.createElement("td",null,t.shareInfo?r.a.createElement(p.b,{to:"/upload/"+t.shareInfo.shareToken,target:"new"},"\u5199\u771f\u6295\u7a3f\u30da\u30fc\u30b8\u3078"):""))})))}())}}]),e}(r.a.Component),T=["https://www.googleapis.com/auth/photoslibrary","https://www.googleapis.com/auth/photoslibrary.sharing","https://www.googleapis.com/auth/photoslibrary.appendonly"],L=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(r)))).state={images:[],uploading:!1},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"onAuth",value:function(){var t=Object(f.a)(d.a.mark(function t(){var e;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getSharedAlbum();case 2:if(!(e=t.sent).shareInfo||!e.shareInfo.isJoined){t.next=7;break}this.setState({album:e}),t.next=13;break;case 7:return t.t0=this,t.next=10,this.joinAlbum();case 10:t.t1=t.sent,t.t2={album:t.t1},t.t0.setState.call(t.t0,t.t2);case 13:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getSharedAlbum",value:function(){var t=Object(f.a)(d.a.mark(function t(){var e;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.props.match.params.id,t.abrupt("return",k({url:"https://photoslibrary.googleapis.com/v1/sharedAlbums/"+e,method:"GET",scopes:["https://www.googleapis.com/auth/photoslibrary.sharing"]}));case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"joinAlbum",value:function(){var t=Object(f.a)(d.a.mark(function t(){var e,a;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.props.match.params.id,t.next=3,k({url:"https://photoslibrary.googleapis.com/v1/sharedAlbums:join",method:"POST",scopes:["https://www.googleapis.com/auth/photoslibrary.sharing"],body:JSON.stringify({shareToken:e})});case 3:return a=t.sent,t.abrupt("return",a.album);case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"uploadMedia",value:function(){var t=Object(f.a)(d.a.mark(function t(e,a){var n;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.setState({uploading:!0}),t.prev=1,t.next=4,k({url:"https://photoslibrary.googleapis.com/v1/uploads",method:"POST",scopes:[],headers:{"Content-type":"application/octet-stream","X-Goog-Upload-Protocol":"raw"},body:e});case 4:return n=t.sent,t.next=7,k({url:"https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",method:"POST",scopes:["https://www.googleapis.com/auth/photoslibrary","https://www.googleapis.com/auth/photoslibrary.sharing"],body:JSON.stringify({albumId:a.id,newMediaItems:[{description:"",simpleMediaItem:{uploadToken:n}}]})});case 7:t.sent.newMediaItemResults.forEach(function(t){t.status.code&&alert(t.status.message)});case 9:return t.prev=9,this.setState({uploading:!1}),t.finish(9);case 12:case"end":return t.stop()}},t,this,[[1,,9,12]])}));return function(e,a){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return r.a.createElement(C,{scopes:T,onAuth:function(){return t.onAuth()}},function(){if(t.state.album){var e=t.state.album;return r.a.createElement("div",null,r.a.createElement("h2",null,"\u5199\u771f\u3092\u6295\u7a3f\u3059\u308b"),r.a.createElement("label",{htmlFor:"upload"},r.a.createElement("input",{type:"file",id:"upload",accept:"image/*",capture:!0,onChange:function(a){return t.onImageUploaded(a.target,e)},disabled:t.state.uploading})))}}(),r.a.createElement("hr",null),r.a.createElement("div",{style:{margin:"20px auto"}},this.state.album&&this.state.album.shareInfo?r.a.createElement("a",{href:this.state.album.shareInfo.shareableUrl},"\u30a2\u30eb\u30d0\u30e0\u3092\u898b\u308b"):""),r.a.createElement("hr",null),r.a.createElement("h2",null,"\u6295\u7a3f\u6e08\u307f\u5199\u771f"),this.state.images.map(function(t,e){return r.a.createElement("img",{key:e,src:URL.createObjectURL(t),alt:t.name,style:{maxWidth:"300px",maxHeight:"300px"}})}))}},{key:"onImageUploaded",value:function(){var t=Object(f.a)(d.a.mark(function t(e,a){var n;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.files&&0!==e.files.length){t.next=2;break}return t.abrupt("return");case 2:return n=e.files[0],t.next=5,this.uploadMedia(n,a);case 5:e.value="",this.setState({images:this.state.images.concat(n)});case 7:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}()}]),e}(r.a.Component),N=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){!function(){var t=w.a.parse(window.location.hash.substring(1),"&","=");if("string"===typeof t.scope&&"string"===typeof t.access_token&&"string"===typeof t.token_type&&"string"===typeof t.expires_in){var e=Number.parseInt(t.expires_in);v.a.set("scope",t.scope,{expires:e}),v.a.set("access_token",t.access_token,{expires:e}),v.a.set("token_type",t.token_type,{expires:e})}}(),window.close()}},{key:"render",value:function(){return r.a.createElement("p",null,"This window will close automatically")}}]),e}(r.a.Component),P=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(m.d,null,r.a.createElement(m.b,{exact:!0,path:"/auth",component:N}),r.a.createElement(m.a,{exact:!0,from:"/",to:"/album/list"}),r.a.createElement(m.b,{exact:!0,path:"/album/list",component:I}),r.a.createElement(m.b,{exact:!0,path:"/upload/:id",component:L}),r.a.createElement(m.b,{exact:!0,path:"/error",render:function(){return r.a.createElement("h1",null,"Error")}}),r.a.createElement(m.b,{render:function(){return r.a.createElement("h1",null,"404 Not Found")}})))}}]),e}(r.a.Component),U=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidCatch",value:function(){window.location.href="/error"}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(P,null))}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[27,1,2]]]);
//# sourceMappingURL=main.e25cf88e.chunk.js.map