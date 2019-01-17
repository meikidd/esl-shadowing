(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,t,n){e.exports=n(61)},33:function(e,t,n){},58:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(23),c=n.n(i),o=(n(33),n(6)),s=n(7),l=n(9),u=n(8),m=n(10),p=n(63),d=n(65),f=n(64),h=n(24),v=n.n(h),y=n(14);function E(e){return e.replace(/[_.-](\w|$)/g,function(e,t){return t.toUpperCase()})}function b(e){return e.replace(/(?:^|\.?)([A-Z])/g,function(e,t){return"_".concat(t.toLowerCase())})}function g(e){return function t(n){if(n instanceof Array)return n.map(function(e){return t(e)});if(n instanceof Object){var a={};return Object.keys(n).forEach(function(r){a[e(r)]=t(n[r])}),a}return n}}var k={parseQuery:function(e){var t=e||window.location.search.slice(1);return y.parse(t)},stringifyQuery:function(e){return y.stringify(e)},camelizeStr:E,snakifyStr:b,camelizeKeys:g(E),snakifyKeys:g(b)};function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"get",t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a={method:e,url:t,headers:{"Content-Type":"application/json"},withCredentials:!0};return"get"===e||"delete"===e?a.params=k.snakifyKeys(n):a.data=k.snakifyKeys(n),v()(a).then(function(e){return k.camelizeKeys(e.data)}).catch(function(e){throw e})}var C=function(){return w("get","/resources/index.json")},T=function(e){return w("get","/resources/".concat(e,"/subtitle.json"))},S=function(e){return w("get","/resources/".concat(e,"/merged.json"))},j=n(62),N=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={resourceIds:[]},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;C().then(function(t){e.setState({resourceIds:t})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"views-home"},r.a.createElement("h1",null,"ESL Shadowing"),r.a.createElement("nav",{className:"home-nav"},this.state.resourceIds.map(function(e){return r.a.createElement(j.a,{key:e,to:"/esl-shadowing/audio/".concat(e)},e)})))}}]),t}(r.a.Component),O=n(15),P=n(25),R=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={subtitles:[],stopPoint:null},n.playerRef=r.a.createRef(),n.exportBtnRef=r.a.createRef(),n.onTimeUpdate=function(){var e=n.playerRef.current,t=e.currentTime,a=n.state.stopPoint;a&&t>=a&&(e.currentTime-=.3,e.pause());var r=n.state.subtitles;r.forEach(function(e){t>e.startTime&&t<e.endTime?e.current=!0:e.current=!1}),n.setState({subtitles:Object(O.a)(r)})},n.onMergeUpClick=function(e){var t=n.state.subtitles,a=t[e-1],r=t[e];a.endTime=r.endTime,r.content.forEach(function(e){a.content.push(e)}),t.splice(e,1),n.setState({subtitles:Object(O.a)(t)})},n.onPlaySentenceClick=function(e){var t=n.state.subtitles[e];n.playerRef.current.currentTime=t.startTime,n.playerRef.current.play(),n.setState({stopPoint:t.endTime})},n.onPlayClick=function(){n.playerRef.current.play(),n.setState({stopPoint:null})},n.onExportClick=function(){console.log(JSON.stringify(n.state.subtitles,null,4))},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;T(t).then(function(t){e.setState({subtitles:t})}),this.playerRef.current.addEventListener("timeupdate",this.onTimeUpdate),new P(this.exportBtnRef.current).on("success",function(){alert("copied")})}},{key:"componentWillUnmount",value:function(){this.playerRef.current.removeEventListener("timeupdate",this.onTimeUpdate)}},{key:"render",value:function(){var e=this,t=this.props.match.params.id,n=this.state.subtitles;return r.a.createElement("div",{className:"views-subtitle"},r.a.createElement("h2",null,"Subtitle: ",t),r.a.createElement("div",{className:"player"},r.a.createElement("audio",{controls:!0,ref:this.playerRef,src:"/resources/".concat(t,"/audio.mp3")})),r.a.createElement("div",{className:"subtitles"},n.map(function(t,n){return r.a.createElement("div",{key:n,className:"subtitle ".concat(t.current?"current":"")},r.a.createElement("div",{className:"merge-up",onClick:function(){return e.onMergeUpClick(n)}},r.a.createElement("span",{role:"img","aria-label":"merge up"},"\u2b06\ufe0f")),r.a.createElement("div",{className:"time"},t.startTime,"s - ",t.endTime,"s (",(t.endTime-t.startTime).toFixed(2),"s)"),r.a.createElement("div",{className:"content",onClick:function(){return e.onPlaySentenceClick(n)}},t.content.map(function(e,t){return r.a.createElement("div",{key:t},e)})))})),r.a.createElement("div",{className:"btns"},r.a.createElement("button",{className:"btn",onClick:this.onPlayClick},"\u25b6 Play"),r.a.createElement("button",{className:"btn",ref:this.exportBtnRef,onClick:this.onExportClick},"OK")))}}]),t}(r.a.Component),x=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={subtitles:[],current:0,countdownStyle:{},showSettings:!1},n.interval=-1,n.countdownTimer=null,n.playerRef=r.a.createRef(),n.onTimeUpdate=function(){var e,t=n.playerRef.current,a=t.currentTime,r=n.interval,i=n.state.subtitles,c=i[n.state.current];if(r&&a>=c.endTime&&!n.countdownTimer&&(t.pause(),r>0)){var o=r*(c.endTime-c.startTime)*1e3;n.countdownTimer=setTimeout(function(){n.play(),n.stopCountdown()},o),n.startCountdown(o)}i.forEach(function(t,n){a>t.startTime&&a<t.endTime&&(e=n)}),e&&n.setState({current:e})},n.play=function(){n.stopCountdown(),n.playerRef.current.play()},n.onPlaySentenceClick=function(e){var t=n.state.subtitles[e];n.playerRef.current.currentTime=t.startTime,n.setState({current:e},function(){n.play()})},n.onPlayNextClick=function(){var e=n.state.current+1;e>=n.state.subtitles.length||n.onPlaySentenceClick(e)},n.onPlayPrevClick=function(){var e=n.state.current-1;e<0||n.onPlaySentenceClick(e)},n.onPauseClick=function(){n.stopCountdown(),n.playerRef.current.pause()},n.onPlaySpeedChange=function(e){var t=e.currentTarget.value;n.playerRef.current.playbackRate=t},n.onIntervalChange=function(e){n.interval=parseInt(e.currentTarget.value)},n.onToggleSettings=function(){var e=n.state.showSettings;n.setState({showSettings:!e})},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;S(t).then(function(t){e.setState({subtitles:t})}),this.playerRef.current.addEventListener("timeupdate",this.onTimeUpdate)}},{key:"componentWillUnmount",value:function(){this.stopCountdown(),this.playerRef.current.removeEventListener("timeupdate",this.onTimeUpdate)}},{key:"startCountdown",value:function(e){this.setState({countdownStyle:{width:"0%",visibility:"visible",transitionDuration:"".concat(e/1e3,"s")}})}},{key:"stopCountdown",value:function(){this.setState({countdownStyle:{}}),clearTimeout(this.countdownTimer),this.countdownTimer=null}},{key:"render",value:function(){var e=this,t=this.props.match.params.id,n=this.state.subtitles,a=this.state.current;return r.a.createElement("div",{className:"views-shadowing"},r.a.createElement("h2",null,r.a.createElement(j.a,{to:"/esl-shadowing"},"back"),r.a.createElement("a",{href:"javascript: void(0);",onClick:this.onToggleSettings},"Settings")),this.state.showSettings&&r.a.createElement("div",{className:"settings"},r.a.createElement("div",{className:"settings-field"},r.a.createElement("span",null,"speed:"),r.a.createElement("select",{defaultValue:1,onChange:this.onPlaySpeedChange},r.a.createElement("option",{value:.6},"0.6x"),r.a.createElement("option",{value:.8},"0.8x"),r.a.createElement("option",{value:1},"1x"),r.a.createElement("option",{value:1.5},"1.5x"))),r.a.createElement("div",{className:"settings-field"},r.a.createElement("span",null,"interval:"),r.a.createElement("select",{defaultValue:-1,onChange:this.onIntervalChange},r.a.createElement("option",{value:-1},"stop"),r.a.createElement("option",{value:0},"dont stop"),r.a.createElement("option",{value:2},"2x"),r.a.createElement("option",{value:3},"3x"),r.a.createElement("option",{value:5},"5x")))),r.a.createElement("div",{className:"player"},r.a.createElement("audio",{controls:!0,ref:this.playerRef,src:"/esl-shadowing/resources/".concat(t,"/audio.mp3")})),r.a.createElement("div",{className:"countdown-bar",style:this.state.countdownStyle}),r.a.createElement("div",{className:"btns"},r.a.createElement("div",{className:"btn",onClick:this.play},"Play"),r.a.createElement("div",{className:"btn",onClick:this.onPauseClick},"Pause"),r.a.createElement("div",{className:"btn",onClick:this.onPlayPrevClick},"Prev"),r.a.createElement("div",{className:"btn",onClick:this.onPlayNextClick},"Next")),r.a.createElement("div",{className:"subtitles"},n.map(function(t,n){return r.a.createElement("div",{key:n,className:"subtitle ".concat(n===a?"current":""),onClick:function(){return e.onPlaySentenceClick(n)}},t.content.map(function(e,t){return r.a.createElement("div",{key:t},e)}))})))}}]),t}(r.a.Component),U=(n(58),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(d.a,null,r.a.createElement(f.a,{exact:!0,path:"/esl-shadowing/",component:N}),r.a.createElement(f.a,{exact:!0,path:"/esl-shadowing/subtitle/:id",component:R}),r.a.createElement(f.a,{path:"/esl-shadowing/audio/:id",component:x})))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,2,1]]]);
//# sourceMappingURL=main.cbf0b270.chunk.js.map