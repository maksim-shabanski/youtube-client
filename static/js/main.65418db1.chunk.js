(window["webpackJsonpyoutube-client"]=window["webpackJsonpyoutube-client"]||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,a){e.exports=a(29)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),c=a.n(i),s=a(1),o=a.n(s),l=a(4),d=a(5),u=a(6),m=a(13),h=a(10),v=a(14),p=a(3),f=a(2),S=a.n(f),g=(a(21),function(e){var t=e.as,a=e.className,n=e.variant,i=e.color,c=e.disabled,s=Object(p.a)(e,["as","className","variant","color","disabled"]),o=n?"".concat(n,"-").concat(i):i,l=S()(a,"btn","".concat("btn","--").concat(o));return c&&(s.disabled=c,s.tabIndex=-1,s["aria-disabled"]=!0),r.a.createElement(t,Object.assign({className:l},s))});g.defaultProps={as:"button",type:null,className:null,variant:null,color:"primary",disabled:!1},g.displayName="Button";var b=g,y=(a(22),function(e){var t=e.searchText,a=e.onChange,n=e.onSubmit;return r.a.createElement("div",{className:"search"},r.a.createElement("form",{className:"search__form",onSubmit:n},r.a.createElement("input",{className:"search__input",type:"text",value:t,onChange:a,placeholder:"Type keywords to find video"}),r.a.createElement(b,{className:"search__btn",type:"submit",color:"grey"},"Find")))});y.defaultProps={onChange:function(){},onSubmit:function(){}};var w=y,E=(a(23),function(e){var t=e.as,a=e.variant,n=e.children,i=S()("alert",a&&"".concat("alert","--").concat(a));return r.a.createElement(t,{className:i},n)});E.defaultProps={as:"div",variant:null},E.displayName="Alert";var C=E,k=(a(24),function(e){var t=e.as,a=e.variant,n="".concat("spinner","__figure"),i=S()(n,"".concat(n,"--").concat(a)),c=r.a.createElement("span",{className:i});return"bounce"===a&&(c=r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:i}),r.a.createElement("span",{className:i}),r.a.createElement("span",{className:i}))),r.a.createElement(t,{className:"spinner"},c)});k.defaultProps={as:"div"},k.displayName="Spinner";var O=k,x=a(7),D=a.n(x),N=a(11),_=a.n(N),T=function(e){if(e/1e6>=1){var t=(e/1e6).toFixed(2);return t.endsWith("0")&&(t=t.slice(0,-1)),"".concat(t,"M")}return e/1e3>=1?"".concat(Math.floor(e/1e3),"K"):e};a(25);D.a.extend(_.a);var j="https://www.youtube.com/watch?v=",P=function(e){var t=e.videoData,a=t.id,n=t.snippet,i=t.statistics,c=n.channelId,s=n.channelTitle,o=n.publishedAt,l=n.title,d=n.description,u=n.thumbnails.high.url,m=i.viewCount,h=d.replace(/[\n\t]/g,"");return r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card__thumbnail"},r.a.createElement("a",{href:"".concat(j).concat(a)},r.a.createElement("img",{className:"card__img",src:u,alt:""}))),r.a.createElement("div",{className:"card__body"},r.a.createElement("div",{className:"card__author"},r.a.createElement("a",{href:"".concat("https://www.youtube.com/channel/").concat(c),className:"card__author-link"},s)),r.a.createElement("h2",{className:"card__title"},r.a.createElement("a",{href:"".concat(j).concat(a),className:"card__title-link",title:l},l)),r.a.createElement("div",{className:"card__metadata"},r.a.createElement("span",{className:"card__views"},T(m)," views"),r.a.createElement("time",{className:"card__date",dateTime:o},D()().to(o))),r.a.createElement("div",{className:"card__desc"},r.a.createElement("p",null,h||"No description")),r.a.createElement(b,{href:"".concat(j).concat(a),as:"a",variant:"outlined",color:"red"},"Watch video")))},A=500,M=310,R=(a(26),r.a.forwardRef((function(e,t){var a=e.videosData,n=e.selectedSlide,i=e.totalSlides,c=e.isExistMoreSlides,s=e.totalCardsOnSlide,o=e.onControlClick,l=Object(p.a)(e,["videosData","selectedSlide","totalSlides","isExistMoreSlides","totalCardsOnSlide","onControlClick"]),d=a.length*M,u=(n-1)*M*s,m={width:"".concat(d,"px"),transform:"translate3d(-".concat(u,"px, 0, 0)")},h=1===n,v=n===i,f="Next";return c&&n===i&&(f=r.a.createElement(O,{variant:"bounce",as:"span"})),r.a.createElement("div",{className:"slider"},r.a.createElement("div",Object.assign({className:"slider__content"},l),r.a.createElement("div",{ref:t,className:"slider__track",style:m},a.map((function(e){return r.a.createElement(P,{key:e.id,videoData:e})})))),r.a.createElement("div",{className:"slider__controls"},r.a.createElement(b,{type:"button",className:"slider__btn",color:"grey","data-direction":"prev",disabled:h,onClick:o},"Prev"),r.a.createElement("span",{className:"slider__current-page"},n),r.a.createElement(b,{type:"button",className:"slider__btn",color:"grey","data-direction":"next",disabled:v,onClick:o},f)))})));R.defaultProps={selectedSlide:1,totalSlides:1,totalCardsOnSlide:1,isExistMoreSlides:!0,onControlClick:function(){}},R.displayName="Slider";var V=R,W=a(12);function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function I(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(a,!0).forEach((function(t){Object(W.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var z=function(){function e(){Object(d.a)(this,e)}return Object(u.a)(e,null,[{key:"fetchVideosData",value:function(){var t=Object(l.a)(o.a.mark((function t(a){var n,r,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.buildUrlQueryString({typeResource:"videos",part:"snippet,statistics",id:a.join(",")}),t.next=3,fetch(n);case 3:return r=t.sent,i=r.json(),t.abrupt("return",i);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"fetchVideosId",value:function(){var t=Object(l.a)(o.a.mark((function t(a,n,r){var i,c,s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=e.buildUrlQueryString(I({typeResource:"search",type:"video",part:"id",q:a,maxResults:r},n&&{pageToken:n})),t.next=3,fetch(i);case 3:return c=t.sent,s=c.json(),t.abrupt("return",s);case 6:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}()},{key:"buildUrlQueryString",value:function(e){var t=e.typeResource,a=Object(p.a)(e,["typeResource"]),n="".concat("https://www.googleapis.com/youtube/v3","/").concat(t,"?").concat("key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y");return Object.keys(a).forEach((function(e){n+="&".concat(e,"=").concat(a[e])})),n}}]),e}(),F=(a(27),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(i)))).state={searchText:"",alert:{text:"You haven't searched anything yet.",variant:null},isLoading:!1,maxVideoResults:16,pageToken:"",selectedSlide:1,totalCardsOnSlide:t.getTotalCardsOnSlide(),numberFirstCardOnSelectedSlide:1,isSliderAnimated:!1,mouseStartPoint:null,videosData:[]},a.sliderTrack=r.a.createRef(),a.handleResizeWindow=function(){var e=a.state,n=e.totalCardsOnSlide,r=e.numberFirstCardOnSelectedSlide,i=t.getTotalCardsOnSlide();if(n===i)return!1;var c=Math.ceil(r/i);return a.setState({selectedSlide:c,totalCardsOnSlide:i}),!0},a.handleSearchTextChange=function(e){var t=e.target.value;a.setState({searchText:t})},a.handleSubmitForm=function(e){return e.preventDefault(),""!==a.state.searchText&&(a.setState({selectedSlide:1,videosData:[],pageToken:"",alert:{text:null,variant:null},isLoading:!0},(function(){a.getVideosData()})),!0)},a.handleControlBtnClick=function(e){var t=e.currentTarget.dataset.direction;return!!a.canChangeSlide(t)&&(a.handleSlideChange(t),!0)},a.handleDragStart=function(e){var t=a.state.isSliderAnimated,n=e.touches?e.touches[0].clientX:e.clientX;e.touches||e.preventDefault(),t||a.setState({mouseStartPoint:n})},a.handleDrag=function(e){var n=a.state,r=n.selectedSlide,i=n.totalCardsOnSlide,c=n.mouseStartPoint,s=e.touches?e.touches[0].clientX:e.clientX;if(!c)return!1;var o=t.getDirection(c,s);if(!o)return!1;var l=Math.abs(c-s),d=(r-1)*M*i,u="next"===o?d+l:d-l,m=a.sliderTrack.current;return m.style.transitionDuration="0ms",m.style.transform="translate3d(-".concat(u,"px, 0, 0)"),!0},a.handleDragEnd=function(e){var n=a.state.mouseStartPoint,r=e.changedTouches?e.changedTouches[0].clientX:e.clientX;if(!n)return!1;var i=t.getDirection(n,r);return a.setState({mouseStartPoint:null}),!!i&&(!!a.canChangeSlide(i)&&(a.sliderTrack.current.style.transitionDuration="".concat(A,"ms"),a.handleSlideChange(i),!0))},a.handleSliderClick=function(e){a.state.isSliderAnimated&&e.preventDefault()},a.handleSlideChange=function(e){var t=a.state,n=t.totalCardsOnSlide,r=t.selectedSlide,i="next"===e?r+1:r-1,c=(i-1)*n+1;a.setState({selectedSlide:i,numberFirstCardOnSelectedSlide:c,isSliderAnimated:!0},(function(){a.isNeedToLoadCards()&&a.getVideosData(),a.updateSliderAnimatedState()}))},a.getVideosData=Object(l.a)(o.a.mark((function e(){var t,n,r,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state.videosData,e.prev=1,e.next=4,a.getVideosId();case 4:return n=e.sent,e.next=7,z.fetchVideosData(n);case 7:r=e.sent,0===(i=r.items).length?a.updateAlertState({variant:"warning",text:"We are so sorry! We couldn't find any video for your request."}):a.updateVideosDataState(i),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),t.length||a.updateAlertState({variant:"warning",text:"Something was wrong! Check your network connection and try searching again."});case 15:case"end":return e.stop()}}),e,null,[[1,12]])}))),a.getVideosId=Object(l.a)(o.a.mark((function e(){var t,n,r,i,c,s,l,d,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state,n=t.searchText,r=t.pageToken,i=t.maxVideoResults,e.next=3,z.fetchVideosId(n,r,i);case 3:return c=e.sent,s=c.nextPageToken,l=void 0===s?"":s,d=c.items,u=d.map((function(e){return e.id.videoId})),a.setState({pageToken:l}),e.abrupt("return",u);case 8:case"end":return e.stop()}}),e)}))),a.updateSliderAnimatedState=function(){var e=a.state.isSliderAnimated;window.setTimeout((function(){a.setState({isSliderAnimated:!e})}),A)},a.updateAlertState=function(e){a.setState({alert:e,isLoading:!1})},a.updateVideosDataState=function(e){var t=a.state.videosData;a.setState({isLoading:!1,videosData:t.concat(e)})},a.canChangeSlide=function(e){var t=a.state,n=t.selectedSlide,r=t.isSliderAnimated,i=a.getTotalSlides();return!r&&(("prev"!==e||1!==n)&&("next"!==e||i!==n))},a.isNeedToLoadCards=function(){var e=a.state,t=e.pageToken,n=e.selectedSlide,r=a.getTotalSlides();return!!t&&!(n<=r-3)},a}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleResizeWindow)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResizeWindow)}},{key:"getTotalSlides",value:function(){var e=this.state,t=e.videosData,a=e.totalCardsOnSlide;return Math.ceil(t.length/a)}},{key:"render",value:function(){var e=this.state,t=e.pageToken,a=e.searchText,n=e.alert,i=e.isLoading,c=e.videosData,s=e.selectedSlide,o=e.totalCardsOnSlide,l=n.variant,d=n.text,u=this.getTotalSlides(),m=""!==t;return r.a.createElement("main",{className:"wrapper"},r.a.createElement(w,{searchText:a,onChange:this.handleSearchTextChange,onSubmit:this.handleSubmitForm}),0!==c.length&&r.a.createElement(V,{ref:this.sliderTrack,videosData:c,selectedSlide:s,totalSlides:u,isExistMoreSlides:m,totalCardsOnSlide:o,onControlClick:this.handleControlBtnClick,onClick:this.handleSliderClick,onMouseDown:this.handleDragStart,onMouseMove:this.handleDrag,onMouseUp:this.handleDragEnd,onMouseLeave:this.handleDragEnd,onTouchStart:this.handleDragStart,onTouchMove:this.handleDrag,onTouchEnd:this.handleDragEnd}),d&&r.a.createElement(C,{variant:l},d),i&&r.a.createElement(O,{variant:"circle"}))}}],[{key:"getTotalCardsOnSlide",value:function(){var e=window.innerWidth;return e>=1280?4:e>=940&&e<1280?3:e>=640&&e<940?2:1}},{key:"getDirection",value:function(e,t){var a=e-t;if(0!==a){var n="next";return a<0&&(n="prev"),n}}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(28);c.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[15,1,2]]]);
//# sourceMappingURL=main.65418db1.chunk.js.map