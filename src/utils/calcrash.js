function podbor(Gm,t,p,tipL,sk) {
    var THRESHOLD = sk;
    var du = [];
    var fees = [];
    var fes = [];
    var Gv = +(Gm/ro(t,p)*1000).toFixed(3);
    var du = [ 15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300 ];
    
    du.forEach(function (el) {

        var a1 = Math.pow(el*0.001, 2)/4;
        var vs = Gv*1/((3.14*a1))/3600;

            if (vs.toFixed(2) <= +THRESHOLD) {
                    fees.push(el);
                    fes.push(vs.toFixed(2));
                } 
    });

    if  (fees.length == 0) {

            var eel =  du[du.length - 1];
            var a2 = Math.pow(eel*0.001, 2)/4;
            var vs2 = Gm*1/((3.14*a2))/3600;
            fees.push(eel);
            fes.push(vs2.toFixed(2));
    } 
    // console.log(fes[0], fees[0])
    return [ fes[0], fees[0] ];   
}

function podborR(t, sk, Gv) {
    // console.log(t)
    var THRESHOLD = sk;
    var fees = [];
    var fes = [];
    var du = [ 15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300 ];
     du.forEach(function (el) {
        var a1 = Math.pow(el*0.001, 2)/4;
        var vs = Gv*1/((3.14*a1))/3600;
            if (vs.toFixed(2) <= +THRESHOLD) {
                    fees.push(el);
                    fes.push(vs.toFixed(2));
                } 
    });

    if  (fees.length == 0) {

        var eel =  du[du.length - 1];
        var a2 = Math.pow(eel*0.001, 2)/4;
        var vs2 = Gv*1/((3.14*a2))/3600;
        fees.push(eel);
        fes.push(vs2.toFixed(2));
        } 

    return { 
            Gv:  Gv,
            V:fes[0], 
            du_im:fees[0] 
            };

}
function podborPodp(Gm, t, p, sk ) {
    var THRESHOLD = sk;
    var fees = [];
    var fes = [];

    var Gv = +(Gm/ro(t,p)*1000).toFixed(3);

    var du = [ 15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300 ];
     du.forEach(function (el) {
        var a1 = Math.pow(el*0.001, 2)/4;
        var vs = Gv*1/((3.14*a1))/3600;
            if (vs.toFixed(2) <= +THRESHOLD) {
                    fees.push(el);
                    fes.push(vs.toFixed(2));
                } 
    });
    return [ fes[0], fees[0] ];   
}
function speed(ss,d) {
        var a1 = Math.pow(ss.S*0.001, 2)/4;
        var V = (ss.R*1/((3.14*a1))/3600).toFixed(2);
        return {   
                Gv:ss.R,
                du_im: ss.S , 
                V: V
                };
}

function gidr(  t, du_im, du_tr, Gm,  p,  tipL, Gg,  tg, pg, otpen ) {

    if(tipL==='kl'){ var L = du_im*6 + 200; } else if (tipL==='ml'){ var L = du_im*6; }
    var alf = 20;    
    // var du_tr = 80; 
    var sherh = 0.5;
    var Ltr = 0.4;
    var lambda = 0.032;
    var kr = 2;    
    var suj = 1;
    var trm = 1;    
    var man = 1; 


    // console.log('t===='+t)
    // console.log('du_im===='+du_im)
    // console.log('du_tr==='+du_tr)
    // console.log('Gm===='+Gm)
    // console.log('Gg===='+Gg)
    // console.log('tg==='+tg)
    // console.log('pg =='+pg)
    // console.log('otpen =='+otpen)


    var PL = ro(t,p);

    if(otpen == 0) { var Gv = Gm*1000 / PL;

                    } else { 

                        var PLo = ro(t,p);
                        var Gvo = Gm*1000 / PLo;
                        var PLg = ro(tg,pg);
                        var Gvg = Gg*1000 / PLg;
                        var Gv = Gvo + Gvg;
                        // console.log('PLo =='+PLo)
                        // console.log('Gvo =='+Gvo)
                        // console.log('PLg =='+PLg)
                        // console.log('Gvg =='+Gvg)
                        // console.log('Gv =='+Gv)

            }

    // if(R){var Gv = R }        
    // console.log('Gv =='+Gv)
    var a1 = Math.pow(du_im*0.001, 2)/4;    
    var V = (Gv*1/((3.14*a1))/3600).toFixed(2);
    var n = 0.00000178/(1+0.0337*t+0.000221*Math.pow(t, 2));    
    var re = du_im * V/(n*1000);
    var I =  0.11*Math.pow((68/re)+(sherh/du_im), 0.25);
    var Xtr = (I/(8 * Math.sin( (alf/2) * Math.PI/180) )) * (1-Math.pow(du_im/du_tr, 4));
    var Xk = ( -0.0125*Math.pow(du_im/du_tr, 6) + 0.0224*Math.pow(du_im/du_tr, 5) - 0.00723*Math.pow(du_im/du_tr, 4) + 0.00444*Math.pow(du_im/du_tr, 2) - 0.00745) *((Math.pow(0.01745*alf, 3) - 2*Math.PI*Math.pow(0.01745*alf, 2) - 10*0.01745*alf))+Xtr;
    //var Kd = -0.24*Math.log10(re)+2.869;
    var Kd = -0.24*Math.log(re)/Math.LN10 + 2.869;    
    var Xr = Kd*3.2*Math.pow(1-Math.pow(du_im/du_tr, 2), 2)* Math.pow( Math.tan( ((alf/2)* Math.PI/180) ), 1.25);    
    var Hk = Xk*Math.pow(V, 2)/(2*9.81);
    var Hi = (I*(8*du_im+10)+0*L-0*(8*du_im+10))*Math.pow(V, 2)/(2*9.81*du_im);
    var Hd = (Xr+Xtr)*Math.pow(V, 2)/(2*9.81); 
    var H = Hk + Hi + Hd; 
    var Ptr = ((Ltr*0.00638*lambda*Math.pow(Gv,2))/( Math.pow(0.001*du_tr, 5) * 958.4))/1000;
    var Ptrmestn = Math.pow(V, 2)*(kr+suj+trm+man)*48.9/9810;
    var Puu = (H + Ptr + Ptrmestn).toFixed(4);

    var Gidr = {

                    du_im:du_im,
                    du_tr:du_tr,
                    Puu:  Puu,
                    L:  L,
                    alf: alf,
                    t: t,
                    p: p,
                    sherh: sherh,
                    Gv: Gv.toFixed(3),
                    V: V,
                    PL: PL,
                    n: n.toFixed(4),
                    re:re.toFixed(1),
                    I:I.toFixed(4),
                    Xtr:Xtr.toFixed(4),
                    Xk: Xk.toFixed(4),
                    Kd: Kd.toFixed(4),
                    Xr: Xr.toFixed(4),
                    Hk: Hk.toFixed(1),
                    Hi: Hi.toFixed(4),
                    Hd: Hd.toFixed(4),
                    H: H.toFixed(4),
                    Ltr:  Ltr,
                    lambda: lambda,
                    Ptr: Ptr.toFixed(4),
                    Ptrmestn: Ptrmestn.toFixed(4),
                    kr:  kr,
                    suj: suj,
                    trm: trm,
                    man: man,
              };
    return  Gidr; 
}

function rash(q, t1, t2) {    
    var r = +(q*1000/(t1-t2)).toFixed(3);
    return r;   
}

function rashgvs_cirk(Qgvsmax, t1, t2, Kchn, txvL, txvZ) {
    var Ktp = 0.25;
    var Knp = 0.8;
    var beta = 1.3;
    var Qsr = +(Qgvsmax/Kchn).toFixed(6); 
    var Ggvsmax = +(Qgvsmax*1000/(t1-txvZ)).toFixed(3);
    var Ggvssr = +(Qsr*1000/(t1-txvZ)).toFixed(3);
    var Qgvscirkz = +((Ktp*Qsr)/(1+Ktp)).toFixed(6);
    var Ggvscirkz = +(Qgvscirkz*1000/(t1-t2)).toFixed(3);
    var Qgvsmaxl = +(Qgvsmax*Knp).toFixed(6);
    var Ggvsmaxl = +(Qgvsmaxl*1000/(t1-txvL)).toFixed(3);
    var Qgvssrl = +(Qgvsmaxl/Kchn).toFixed(6);
    var Ggvssrl = +(Qgvssrl*1000/(t1-txvL)).toFixed(3);
    var Qgvscirkl = +((Ktp*Qgvssrl)/(1+Ktp)).toFixed(6);    
    var Ggvscirkl = +(beta*Qgvscirkl*1000/(t1-t2)).toFixed(3);
    var Ggvscirklmax = +(Ggvscirkl*1.5).toFixed(3);
    var Ggvscirklmin = +(Ggvscirkl*0.4).toFixed(3);
    var Gm3 = +(Ggvsmax).toFixed(3);
    var Gm4 = +(Ggvscirkz).toFixed(3);
      
          var arr = {
                    Gm3: Gm3,
                    Gm4: Gm4,
                    Ggvsmax: Ggvsmax,
                    Ggvssr: Ggvssr,
                    Qgvscirkz: Qgvscirkz,
                    Ggvscirkz: Ggvscirkz,
                    Qgvsmaxl: Qgvsmaxl,
                    Ggvsmaxl:  Ggvsmaxl,
                    Qgvssrl: Qgvssrl,
                    Ggvssrl: Ggvssrl,
                    Qgvscirkl: Qgvscirkl,
                    Ggvscirkl: Ggvscirkl,
                    Ggvscirklmax: Ggvscirklmax,
                    Ggvscirklmin: Ggvscirklmin,
                    Ktp: Ktp,
                    Knp: Knp,
                    beta: beta
      } ;
    return  arr;
}

function ro (t,p) {
    var ror = (Math.pow(t*0.01, 5)*(-0.0005625*p - 1.3864) + Math.pow(t*0.01, 4)*(0.054517*p + 7.325) + Math.pow(t*0.01, 3)*(-2.26713662288534E-25*p - 15.474) + Math.pow(t*0.01, 2)*(0.52327*p-5.0668) + (t*0.01)*(-0.42067*p - 38.224) + 0.16333*p + 1011.185).toFixed(4);
     return  ror;   
}

function ot(isx, sk, peres) {
            var txvL = +isx.txvL;
            var txvZ = +isx.txvZ;

        if( isx.qco && isx.qco!='' && isx.qco!=0  ){
                var ngr = +isx.qco;
                var t1 = +isx.t1;
                var t2 = +isx.t2;
                if (+isx.p1===0 || !isx.p1){ var p1 = 5;}else {var p1 = +isx.p1/10;}
                if (+isx.p2===0 || !isx.p2){ var p2 = 4;}else {var p2 = +isx.p2/10;}
                var tipIM = isx.tipIMo;
                var tipL = isx.tipLo;
                var G = rash( ngr, t1, t2 );
                var Gm1 = +G;
                var GGG = Gm1;
                var Gm2 = +G;
                var PL1 = ro(t1,p1);
                var Gco1 = +(Gm1*1000/PL1).toFixed(3);
                var PL2 = ro(t2,p2);
                var Gco2 = +(Gm2*1000/PL2).toFixed(3);
                var otpen =0;
                
                if(+isx.sx_otkr === 1){
                            var ngrg = +isx.qmax;
                            var t3 = +isx.t3;
                            var t4 = +isx.t4;
                            if (+isx.p3===0 || isx.p3===''){ var p3 = 4.5;}else {var p3 = +isx.p3/10;}
                            if (+isx.p4===0 || isx.p4===''){ var p4 = 3.5;}else {var p4 = +isx.p4/10;}
                            var kch = isx.kch;
                            var Gg = rashgvs_cirk( ngrg, t3, t4, kch, txvL, txvZ );
                            var gg1 =+Gg.Gm3;
                            var gg2 =+Gg.Gm4;

                            if(!t4){ gg2 = 0; }

                            var Gm1podb = +(gg1 + Gm1).toFixed(3);
                            var GGG = Gm1podb;
                            var Gm2podb = +(gg2 + Gm2).toFixed(3);
                            var otpen =1;
                    }
                    if(peres==='peres') {          
                        var DUim1 = isx.di1;
                        var duTr1 = isx.dut1;
                    } else {
                        var n1 = podbor( GGG, t1, p1, tipL,sk );
                        var DUim1 = n1[1];
                        var duTr1 = DUim1;
                    } 
  
                var gdr1 = gidr( t1, DUim1, duTr1, Gm1, p1, tipL, gg1, t3, p3, otpen );
                var DUim2 = DUim1;
                var gdr2 = gidr( t2, DUim2, duTr1, Gm2, p2, tipL, gg2, t4, p4, otpen );
               
                var Gm9 = +(ngr*3.6).toFixed(4);

                    if(peres==='peres') {          
                    var DUim9 = isx.di9;
                    var duTr9 = isx.dut9;
                    } else {
                    var n9 = podborPodp( Gm9, t2, p2 ,sk );
                    var DUim9 = n9[1];
                    var duTr9 = DUim9;
                    }
                var gdr9 = gidr( t2, DUim9, duTr9, Gm9, p2, tipL, null, null, null, null  );

                var OT = {Gm1,Gm2,Gco1,Gco2,Gm1podb,Gm2podb,Gm9}
                    var objot = {
                        OT:OT,
                        gdr1:gdr1,
                        gdr2:gdr2,
                        gdr9:gdr9,
                    };
               
                } else {  var objot = {

                        OT:{},
                        gdr1:{du_im:0},
                        gdr2:{du_im:0},
                        gdr9:{du_im:0},
                } }





                
        if( isx.qmax && isx.qmax!='' && isx.qmax!=0 ){

                var ngr = isx.qmax;
                var t3 = isx.t3;
                var t4 = isx.t4;
                if (+isx.p3===0 || isx.p3===''){ var p3 = 4.5;}else {var p3 = +isx.p3/10;}
                if (+isx.p4===0 || isx.p4===''){ var p4 = 3.5;}else {var p4 = +isx.p4/10;}
                var kch = isx.kch;
                var tipL = isx.tipLg;
                var Ggvs = rashgvs_cirk( ngr, t3, t4, kch, txvL, txvZ  );
                var Gm3 =Ggvs.Gm3;
                var Gm4 =Ggvs.Gm4;

                if(peres==='peres') {          
                    var DUim3 = isx.di3;
                    var duTr3 = isx.dut3;
                } else {
                    var n1 = podbor( Gm3, t3, p3, tipL, sk );
                var DUim3 = n1[1];
                var duTr3 = DUim3;
                }
                var gdr3 = gidr( t3, DUim3, duTr3, Gm3, p3,  tipL, null, null, null  );

                if(peres==='peres') {          
                    var DUim4 =  isx.di4;
                    var duTr4 = isx.dut4;
                } else {
                    var n2 = podbor( Gm4, t4, p4, tipL, sk  );
                    var DUim4 = n2[1];
                    var duTr4 = DUim4;
                } 
                
                if(DUim4 !==0){
                var gdr4 = gidr( t4, DUim4, duTr4, Gm4, p4,  tipL, null, null, null  );
                } else {
                    var gdr4={du_im:0}
                }

                    var objgvs = {
                            gdr3:gdr3,
                            gdr4:gdr4,
                            Ggvs:Ggvs
                    };

                } else {  var objgvs = {
                    gdr3:{du_im:0},
                    gdr4:{du_im:0},
                    Ggvs:{}
                } }

    var resu = Object.assign({}, objot, objgvs);
    return resu;
}

function calc(isx, t, sk, R, d, peres) {

if(t==='project'){ var result = ot(isx,  sk, peres) } 

if(t==='kp'){ var result = podborR(d, sk, R  )} 

// if(t==='perdu'){  var result = speed(isx,d) }

return result;

} 

export default calc;
