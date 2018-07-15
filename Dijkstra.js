	var map=document.getElementById("map");
	var btns=map.getElementsByTagName("button");
	//console.log(btns);
	//初始化起点终点
	var start="unselected";
	var end="unselected";
	var pnode="unselected";
	var hinders=[];
	
	//获取起点函数
	function setstart(){
		start=this.innerHTML;
		console.log(start);
		this.style.cssText='background:rgba(255,0,0,0.5);';
		for(var btn of btns){
			if(btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}
		document.querySelector("#span-start").innerHTML=start+"号点："+this.title;
	}
	//获取终点函数
	function setend(){
		end=this.innerHTML;
				console.log(end);
		this.style.cssText='background:rgba(0,0,255,0.5);';
		for(var btn of btns){
			if(btn.innerHTML!=end&&btn.innerHTML!=start&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}		
		//this.siblings.style.cssText='background:rgba(0,0,0,0);';
		document.querySelector("#span-end").innerHTML=end+"号点："+this.title;
	}
	function setpnode(){
		pnode=this.innerHTML;
		this.style.cssText='background:rgba(0,255,0,0.5);';
		for(var btn of btns){
			if(btn.innerHTML!=end&&btn.innerHTML!=start&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}
		document.querySelector("#span-pnode").innerHTML=pnode+"号点："+this.title;
	}
	function sethinder(){
 		var a=this.innerHTML;
		if(a==start||a==end||a==pnode){
			alert("障碍不能与起点或终点或中间点相同！");
		}else if(hinders.length==0){
			hinders.push(a);
			this.style.cssText='background:rgba(64,0,0,0.5);color:white;';
		}else{
			for(var i=0;i<hinders.length;i++){
				if(parseInt(hinders[i])==a){
					break;
				}else if(i==hinders.length-1){
					hinders.push(a);
					this.style.cssText='background:rgba(64,0,0,0.5);color:white;';
				}
			}
		}
		console.log(a);
		document.querySelector("#span-hinder").innerHTML=hinders.join(",");
	}
	//“选择起点”按钮的点击事件
	getstart.onclick=function(){
		for(var btn of btns){
			btn.removeEventListener("click",setend)
			btn.removeEventListener("click",sethinder)
			btn.removeEventListener("click",setpnode)
			btn.addEventListener("click",setstart)			
		}
		hinders=[];
		document.querySelector("#span-hinder").innerHTML="无(可选多个)";
		for(var btn of btns){
			if(btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}
	}
	//“选择终点”按钮的点击事件
	getend.onclick=function(){
		for(var btn of btns){
			btn.removeEventListener("click",setstart)
			btn.removeEventListener("click",sethinder)
			btn.removeEventListener("click",setpnode)
			btn.addEventListener("click",setend)
		}
		hinders=[];
		document.querySelector("#span-hinder").innerHTML="无(可选多个)";
		for(var btn of btns){
			if(btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}
	}
	//“设置中间点”按钮的点击事件
	getpnode.onclick=function(){
		for(var btn of btns){
			btn.removeEventListener("click",setstart)
			btn.removeEventListener("click",setend)
			btn.removeEventListener("click",sethinder)
			btn.addEventListener("click",setpnode)
		}
		hinders=[];
		document.querySelector("#span-hinder").innerHTML="无(可选多个)";
		for(var btn of btns){
			if(btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}
	}
	clearpnode.onclick=function(){
		pnode="unselected";
		for(var btn of btns){
			if(btn.innerHTML!=end&&btn.innerHTML!=start){
				btn.style.cssText='background:rgba(0,0,0,0);';
			}
		}
		document.querySelector("#span-pnode").innerHTML="无(可选一个)";
	}
	//“设置障碍点”按钮的点击事件
	gethinder.onclick=function(){
		for(var btn of btns){
			btn.removeEventListener("click",setstart)
			btn.removeEventListener("click",setend)
			btn.removeEventListener("click",setpnode)
			btn.addEventListener("click",sethinder)
		}
	}
	clearhinder.onclick=function(){
		hinders=[];
		document.querySelector("#span-hinder").innerHTML="障碍点已清空";
		for(var btn of btns){
			if(btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);color:black;';
			}
		}
	}
	//“分析最短路径”按钮的点击事件	
	getpath.onclick=function(){
		if(start=="unselected"||end=="unselected"){
			alert("起点或终点未选择!");
		}
		var maxnum = 100;  
		var maxint = 999999;  
			//定义迪杰斯特拉算法的函数  
			function Dijkstra(n, v, dist, prev, c)  
			{  
				var s = [];    // 判断是否已存入该点到S集合中  
				for(var i=0; i<n; i++)  
				{  
					dist[i] = c[v][i];  
					s[i] = 0;     // 初始都未用过该点  
					if(dist[i] == maxint)  
						prev[i] = 0;  
					else  
						prev[i] = v;  //不然prev为起点
				}  
		  
				dist[v] = 0;  
				s[v] = 1;  
			   
				// 依次将未放入S集合的结点中，取dist[]最小值的结点，放入结合S中  
				// 一旦S包含了所有V中顶点，dist就记录了从源点到所有其他顶点之间的最短路径长度  
				for(var i=1; i<n; i++)  
				{  
					var tmp = maxint;  
					var u = v;  
					// 找出当前未使用的点j的dist[j]最小值  
					for(var j=0; j<n; j++) {  
						if((!s[j]) && dist[j]<tmp)  
						{  
							u = j;              // u保存当前邻接点中距离最小的点的号码  
							tmp = dist[j];  
						}  
					}  
					s[u] = 1;    // 表示u点已存入S集合中  
			   
					// 更新dist  
					for(var j=0; j<n; j++) {  
						if((!s[j]) && c[u][j]<maxint)  
						{  
							var newdist = dist[u] + c[u][j];  
							if(newdist < dist[j])  
							{  
								dist[j] = newdist;  
								prev[j] = u;  
							}  
						}  
					}  
				}  
			}  
			var result="";  
			function searchPath(prev, v, u)  
			{  
				var que = [];  
				var tot = 0;  
				que[tot] = u;  
				tot++;  
				var tmp = prev[u];  
				while(tmp != v)  
				{  
					que[tot] = tmp;  
					tot++;  
					tmp = prev[tmp];  
				}  
				que[tot] = v;  
				//var result = "";  
				for(var i=tot; i>=0; --i) {  
					if(i != 0) {  
						result += que[i] + "-->";  
					} else {  
						result += que[i];  
					}  
				}  
//				console.log("</br>起点"+start+"到终点"+end+"的路径为: \n" + result);  
				//修饰路径输出结果
				result=result.slice(4,-4);
				if(result.slice(-1)=="-"){
					result=result.slice(0,-1);
				};
				
			}  

			var dist = [];     // 表示当前点到源点的最短路径长度  
			var prev = [];     // 记录当前点的前一个结点  
			var c = [];   // 记录图的两点间路径长度  
			var n, line;             // 图的结点数和路径数  
			   
			// 输入结点数  
			n = 82;  
			// 输入路径数  
			line = 25;  
			function updateNetwork(start,end){
				// 初始化c[]为maxint  
				for(var i=0; i<n; i++) {  
					c[i] = [];  
					for(var j=0; j<n; j++) {  
						c[i][j] = maxint;  
					}  
				}  
			//录入路径矩阵
			
				c[1][2]=139;
				c[2][1]=139;
				c[1][3]=96;
				c[3][1]=96;

				c[2][4]=96;
				c[4][2]=96;
				c[2][8]=331;
				c[8][2]=331;

				c[3][4]=141;
				c[4][3]=141;
				c[3][5]=244;
				c[5][3]=244;
				c[3][6]=102;
				c[6][3]=102;

				c[4][7]=102;
				c[7][4]=102;

				c[5][6]=148;
				c[6][5]=148;
				c[5][10]=45;
				c[10][5]=45;

				c[6][7]=146;
				c[7][6]=146;
				c[6][11]=59;
				c[11][6]=59;

				c[7][8]=136;
				c[8][7]=136;
				c[7][12]=43;
				c[12][7]=43;

				c[8][9]=24;
				c[9][8]=24;

				c[9][13]=88;
				c[13][9]=88;
				c[9][30]=66;
				c[30][9]=66;

				c[10][11]=155;
				c[11][10]=155;
				c[10][14]=33;
				c[14][10]=33;

				c[11][12]=154;
				c[12][11]=154;
				c[11][16]=50;
				c[16][11]=50;


				c[12][13]=168;
				c[13][12]=168;
				c[12][18]=50;
				c[18][12]=50;

				c[13][19]=43;
				c[19][13]=43;

				c[14][15]=115;
				c[15][14]=115;
				c[14][20]=78;
				c[20][14]=78;

				c[15][16]=42;
				c[16][15]=42;
				c[15][20]=117;
				c[20][15]=117;

				c[16][17]=12;
				c[17][16]=12;

				c[17][18]=160;
				c[18][17]=160;
				c[17][22]=36;
				c[22][17]=36;

				c[18][19]=163;
				c[19][18]=163;
				c[18][25]=40;
				c[25][18]=40;

				c[19][29]=52;
				c[29][19]=52;

				c[20][21]=43;
				c[21][20]=43;

				c[21][22]=154;
				c[22][21]=154;
				c[21][31]=23;
				c[31][21]=23;

				c[22][23]=12;
				c[23][22]=12;

				c[23][24]=96;
				c[24][23]=96;
				c[23][33]=62;
				c[33][23]=62;

				c[24][25]=70;
				c[25][24]=70;
				c[24][26]=72;
				c[26][24]=72;

				c[25][26]=25;
				c[26][25]=25;
				c[25][27]=58;
				c[27][25]=58;

				c[26][27]=62;
				c[27][26]=62;
				c[26][35]=73;
				c[35][26]=73;

				c[27][28]=85;
				c[28][27]=85;

				c[28][29]=23;
				c[29][28]=23;

				c[29][36]=56;
				c[36][29]=56;

				c[30][39]=368;
				c[39][30]=368;

				c[31][32]=19;
				c[32][31]=19;

				c[32][33]=150;
				c[33][32]=150;
				c[32][41]=74;
				c[41][32]=74;

				c[33][34]=126;
				c[34][33]=126;
				c[33][43]=191;
				c[43][33]=191;

				c[34][35]=35;
				c[35][34]=35;
				c[34][44]=230;
				c[44][34]=230;

				c[35][36]=151;
				c[36][35]=151;
				c[35][45]=193;
				c[45][35]=193;

				c[36][37]=55;
				c[37][36]=55;
				c[36][46]=189;
				c[46][36]=189;

				c[37][38]=89;
				c[38][37]=89;
				c[37][49]=117;
				c[49][37]=117;

				c[38][39]=73;
				c[39][38]=73;
				c[38][50]=110;
				c[50][38]=110;

				c[39][40]=44;
				c[40][39]=44;

				c[40][52]=240;
				c[52][40]=240;

				c[41][42]=22;
				c[42][41]=22;

				c[42][53]=287;
				c[53][42]=287;

				c[43][44]=54;
				c[44][43]=54;
				c[43][53]=78;
				c[53][43]=78;

				c[44][45]=105;
				c[45][44]=105;

				c[45][46]=157;
				c[46][45]=157;
				c[45][55]=99;
				c[55][45]=99;

				c[46][47]=95;
				c[47][46]=95;
				c[46][56]=103;
				c[56][46]=103;

				c[47][48]=121;
				c[48][47]=121;
				c[47][49]=81;
				c[49][47]=81;

				c[48][50]=92;
				c[50][48]=92;
				c[48][51]=81;
				c[51][48]=81;

				c[49][50]=85;
				c[50][49]=85;

				c[51][52]=110;
				c[52][51]=110;
				c[51][63]=137;
				c[63][51]=137;

				c[52][64]=122;
				c[64][52]=122;

				c[53][54]=24;
				c[54][53]=24;

				c[54][55]=161;
				c[55][54]=161;
				c[54][66]=103;
				c[66][54]=103;

				c[55][56]=157;
				c[56][55]=157;

				c[56][57]=302;
				c[57][56]=302;
				c[56][67]=103;
				c[67][56]=103;

				c[57][58]=84;
				c[58][57]=84;
				c[57][63]=59;
				c[63][57]=59;

				c[58][59]=130;
				c[59][58]=130;
				c[58][71]=100;
				c[71][58]=100;
				c[58][72]=156;
				c[72][58]=156;

				c[59][60]=84;
				c[60][59]=84;
				c[59][71]=109;
				c[71][59]=109;
				c[59][75]=168;
				c[75][59]=168;

				c[60][61]=153;
				c[61][60]=153;
				c[60][70]=121;
				c[70][60]=121;
				c[60][76]=97;
				c[76][60]=97;

				c[61][70]=291;
				c[70][61]=291;
				c[61][62]=292;
				c[62][61]=292;

				c[62][78]=370;
				c[78][62]=370;

				c[63][64]=109;
				c[64][63]=109;
				c[63][76]=350;
				c[76][63]=350;

				c[64][72]=116;
				c[72][64]=116;

				c[65][66]=276;
				c[66][65]=276;

				c[66][67]=321;
				c[67][66]=321;

				c[67][68]=192;
				c[68][67]=192;

				c[68][69]=107;
				c[69][68]=107;

				c[69][70]=107;
				c[70][69]=107;
				c[69][71]=46;
				c[71][69]=46;

				c[72][73]=65;
				c[73][72]=65;

				c[73][74]=40;
				c[74][73]=40;

				c[74][75]=57;
				c[75][74]=57;

				c[75][77]=146;
				c[77][75]=146;

				c[76][77]=125;
				c[77][76]=125;
				c[76][78]=125;
				c[78][76]=125;

				c[77][79]=93;
				c[79][77]=93;

				c[78][79]=154;
				c[79][78]=154;

				c[79][80]=103;
				c[80][79]=103;
				//设置起点与所选start路径距离为0，终点与所选end
				c[0][start] = 0;  
				c[start][0] = 0;  
				c[end][n-1] = 0;
				c[n-1][end] = 0;
				//有障碍的时候，障碍点与邻接点距离为正无穷
				for(var i=0;i<hinders.length;i++){
					for(var j=0;j<=n;j++){
						c[parseInt(hinders[i])][j]=maxint;
					}
				}
				//初始化形成矩阵
				for(var i=0; i<n; i++){
					dist[i] = maxint; 
				}
				var node = "顶点位置: \n";  
				for(var i=0; i<n; i++)  
				{  
					for(var j=0; j<n; j++) {  
						node += c[i][j] + "\t";  
					}  
					node += "\n";  
				}  
			} 
			function main()  
			{  
				updateNetwork(start,end);				
				//console.log(node); 		
				// 解算最短路径长度   
				Dijkstra(n, 0, dist, prev, c);  				 
				//console.log("起点到终点"+end+"的最短路径长度: \n" + dist[n-1]);
				searchPath(prev, 0, n-1);
				if(dist[n-1]<maxint){
					document.querySelector("#span-pathlength").innerHTML="起点"+start+"到终点"+end+"的最短路径长度: \n" + dist[n-1] +"米";
					// 查找路径节点,输出算短路径
					document.querySelector("#span-path").innerHTML="</br>起点"+start+"到终点"+end+"的最短路径为: \n" + result;
					//将路径经过节点展示在页面上
				}else{
					document.querySelector("#span-path").innerHTML="障碍设置不当，无路可走";
					document.querySelector("#span-pathlength").innerHTML="请清除障碍后重选";
					alert("障碍设置不当导致无路可走！请清除障碍点后再重选！")
				}
			}
			//如果设置了中间点，计算最短路径与搜索路径要执行两次，前、中、后置换三次参数
			function pnodemain(){
				console.log(start);
				console.log(end);
				//中间点置换为end
				var realStartValue=start;
				var realEndValue=end;
				var realPnodeValue=pnode;
				start=realStartValue;
				end=pnode;	
				//前半段pnodemain();
				updateNetwork(start,end);
				//console.log(realStartValue);
				Dijkstra(n, 0, dist, prev, c);
				searchPath(prev, 0, n-1);
				var result1=result;
				var dist1=dist[n-1];
				console.log(result1);
				console.log(dist1);
				//pnode置换为start
				start=pnode;
				end=realEndValue;
				//后半段pnodemain();
				updateNetwork(start,end);
				console.log("起点是"+start);
				console.log("终点是"+end);
				result="";
				dist[n-1]=maxint;
				Dijkstra(n, 0, dist, prev, c);
				searchPath(prev, 0, n-1);
				var result2=result;
				var dist2=dist[n-1];
				result2=result2.slice(1);
				if(result2.charAt(0)!="-"){
					result2=result2.slice(1);
				}
				console.log(result2);
				console.log(dist2);
				//start置换回初始值
				start=realStartValue;
				pnode=realPnodeValue;
				result=result1+result2;
				dist=dist1+dist2;
				//输出
				if(dist>maxint){
					document.querySelector("#span-path").innerHTML="障碍设置不当，无路可走";
					document.querySelector("#span-pathlength").innerHTML="请清除障碍后重选";
					alert("障碍设置不当导致无路可走！请清除障碍点后再重选！")
				}else{
					document.querySelector("#span-pathlength").innerHTML="起点"+start+"到终点"+end+"且路过中间点"+pnode+"的最短路径长度: \n" + dist +"(m)";
					// 查找路径节点,输出算短路径
					document.querySelector("#span-path").innerHTML="</br>起点"+start+"到终点"+end+"且路过中间点"+pnode+"的最短路径为: \n" + result;
				}
			}
			if(pnode!="unselected"){
				pnodemain();
			}else{
				main();
			}
		//将执行结果输出到页面上
		for(var btn of btns){
			if(btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
				btn.style.cssText='background:rgba(0,0,0,0);color:black;';
			}
		}
		function showHinder(){
			for(i=0;i<hinders.length;i++){
				for(var btn of btns){
					if(btn.innerHTML==parseInt(hinders[i])){
						btn.style.cssText='background:rgba(64,0,0,0.5);color:white;';
					}
				}
			}
		}
		var pathNodes=result.split("-->");
		function showPath(){
			for(i=0;i<pathNodes.length;i++){
				for(var btn of btns){
					if(btn.innerHTML==parseInt(pathNodes[i])&&btn.innerHTML!=start&&btn.innerHTML!=end&&btn.innerHTML!=pnode){
							btn.style.cssText='background:rgba(255,128,0,0.5);';
					}
				}
			}
		}
		showHinder();
		showPath();
	}
	f5.onclick=function(){
		location.reload();
	}