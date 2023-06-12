"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8722],{8570:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(79);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),f=a,h=d["".concat(l,".").concat(f)]||d[f]||p[f]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4670:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(2203),a=(n(79),n(8570));const i={sidebar_position:2},o="Hutch Agent",s={unversionedId:"users/getting-started/configuration/agent",id:"users/getting-started/configuration/agent",title:"Hutch Agent",description:"The agent can be configured via its appsettings*.json files or .NET user secrets.",source:"@site/docs/users/getting-started/configuration/agent.md",sourceDirName:"users/getting-started/configuration",slug:"/users/getting-started/configuration/agent",permalink:"/hutch/docs/users/getting-started/configuration/agent",draft:!1,editUrl:"https://github.com/hdruk/hutch/tree/main/website/docs/users/getting-started/configuration/agent.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"userGuide",previous:{title:"Hutch Manager",permalink:"/hutch/docs/users/getting-started/configuration/manager"},next:{title:"Detailed Overview",permalink:"/hutch/docs/category/detailed-overview"}},l={},c=[{value:"Available values",id:"available-values",level:2},{value:"Guidance",id:"guidance",level:2},{value:"Results Store",id:"results-store",level:3},{value:"WfExS",id:"wfexs",level:3},{value:"Watch Folder",id:"watch-folder",level:2}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"hutch-agent"},"Hutch Agent"),(0,a.kt)("p",null,"The agent can be configured via its ",(0,a.kt)("inlineCode",{parentName:"p"},"appsettings*.json")," files or .NET user secrets."),(0,a.kt)("h2",{id:"available-values"},"Available values"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // MinIO Results Store\n  "ResultsStore": {\n    "Provider": "MinIO",\n    "Endpoint": "localhost:9000",\n    "AccessKey": "accesskey",\n    "SecretKey": "secretkey",\n    "Secure": false,\n    "BucketName": "hutch.bucket"\n  },\n\n  // File System Results Store\n  "ResultsStore": {\n    "Provider": "FileSystem",\n    "Path": "path/to/store/"\n  },\n\n  // Configuration for tracking WfExS execution\n  "Wfexs": {\n    "ExecutorPath": "/WfExS-backend",\n    "VirtualEnvironmentPath": "/WfExS-backend/.pyWEenv/bin/activate",\n    "LocalConfigPath": "workflow_examples/local_config.yaml",\n    "CrateExtractPath": "/WfExS-backend/workflow_examples/ipc/"\n  },\n\n  // Watch Folder configuration\n  "WatchFolder": {\n    "Path": "/Users/daniel/Desktop/TestMinioUpload/"\n  },\n\n  // Connection strings for different services\n  "ConnectionStrings": {\n    // The database tracking the jobs in the agent\n    "AgentDb": "Data Source=HutchAgent.db"\n  }\n}\n')),(0,a.kt)("h2",{id:"guidance"},"Guidance"),(0,a.kt)("h3",{id:"results-store"},"Results Store"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"You must choose ",(0,a.kt)("em",{parentName:"li"},"one")," of either a MinIO Results Store or a File System Results Store. You cannot configure both at the same time.")),(0,a.kt)("h3",{id:"wfexs"},"WfExS"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"ExecutorPath")," must be the directory where WfExS is installed.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"VirtualEnvironmentPath")," must be the path to the ",(0,a.kt)("inlineCode",{parentName:"p"},"activate")," script in the WfExS install directory, e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"/path/to/WfExS-backend/.pyWEenv/bin/activate"),".")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"LocalConfigPath")," is the path a YAML file describing your WfExS installation.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"CrateExtractPath")," is the path where inbound RO-Crates will be unpacked so that they can be executed by WfExS."))),(0,a.kt)("h2",{id:"watch-folder"},"Watch Folder"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"This is where results of WfExS runs will be saved before being moved to the Results Store.")))}p.isMDXComponent=!0}}]);