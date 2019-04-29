function podbor(Gm, t, p, tipL, sk) {
	var THRESHOLD = sk;
	var du = [];
	var d = [];
	var v = [];
	var Gv = +(Gm / ro(t, p) * 1000).toFixed(3);
	var du = [ 15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300 ];

	du.forEach(function(el) {
		var a1 = Math.pow(el * 0.001, 2) / 4;
		var vs = Gv * 1 / (3.14 * a1) / 3600;

		if (vs.toFixed(2) <= +THRESHOLD) {
			d.push(el);
			v.push(vs.toFixed(2));
		}
	});

	if (d.length == 0) {
		var eel = du[du.length - 1];
		var a2 = Math.pow(eel * 0.001, 2) / 4;
		var vs2 = Gm * 1 / (3.14 * a2) / 3600;
		d.push(eel);
		v.push(vs2.toFixed(2));
	}
	if (d.length == 1) {
		var eel = du[du.length - 1];
		var a2 = Math.pow(eel * 0.001, 2) / 4;
		var vs2 = Gm * 1 / (3.14 * a2) / 3600;
		d.push(eel);
		v.push(vs2.toFixed(2));
	}
	return [ v[0], d[0], d[1] ];
}

function podborPodp(Gm, t, p, sk) {
	var THRESHOLD = sk;
	var d = [];
	var v = [];

	var Gv = +(Gm / ro(t, p) * 1000).toFixed(3);

	var du = [ 15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300 ];
	du.forEach(function(el) {
		var a1 = Math.pow(el * 0.001, 2) / 4;
		var vs = Gv * 1 / (3.14 * a1) / 3600;
		if (vs.toFixed(2) <= +THRESHOLD) {
			d.push(el);
			v.push(vs.toFixed(2));
		}
	});
	return [ v[0], d[0], d[1] ];
}
function speed(ss, d) {
	var a1 = Math.pow(ss.S * 0.001, 2) / 4;
	var V = (ss.R * 1 / (3.14 * a1) / 3600).toFixed(2);
	return {
		Gv: ss.R,
		du_im: ss.S,
		V: V
	};
}

function gidr(t, du_im, du_tr, Gm, p, tipL, Gg, tg, pg, otpen, filtr, ok, tipIM) {
	let ki = '_' + du_tr + du_im;
	let zau = '_' + du_im;
	let tr = '_' + du_tr;

	let alfaAr = {
		_1515: { alf: 0, li6: '', lk5: 135 },
		_2015: { alf: 8.4, li6: '', lk5: 411 },

		_2515: { alf: 13.8, li6: '', lk5: 437 },
		_2525: { alf: 0, li6: 200, lk5: 437 },

		_3215: { alf: 11.7, li6: '', lk5: 437 },
		_3225: { alf: 11.4, li6: 460, lk5: 422 },
		_3232: { alf: 0, li6: 200, lk5: 162 },

		_4025: { alf: 24.4, li6: 480, lk5: 442 },
		_4032: { alf: 13.4, li6: 530, lk5: 492 },
		_4040: { alf: 0, li6: 200, lk5: 201 },

		_5025: { alf: 31, li6: 490, lk5: 452 },
		_5032: { alf: 23.8, li6: 590, lk5: 552 },
		_5040: { alf: 11.4, li6: 590, lk5: 591 },
		_5050: { alf: 0, li6: 200, lk5: 200 },

		_6532: { alf: 38.2, li6: 610, lk5: 572 },
		_6540: { alf: 25, li6: 640, lk5: 641 },
		_6550: { alf: 15.4, li6: 690, lk5: 690 },
		_6565: { alf: 0, li6: 240, lk5: 210 },

		_8040: { alf: 32.6, li6: 650, lk5: 651 },
		_8050: { alf: 24, li6: 700, lk5: 700 },
		_8065: { alf: 10, li6: 790, lk5: 760 },
		_8080: { alf: 0, li6: 240, lk5: 240 },

		_10050: { alf: 35.4, li6: 710, lk5: 710 },
		_10065: { alf: 22.6, li6: 800, lk5: 770 },
		_10080: { alf: 13.6, li6: 850, lk5: 850 },
		_100100: { alf: 0, li6: '', lk5: 270 },

		_12565: { alf: 31.8, li6: 840, lk5: 810 },
		_12580: { alf: 24.8, li6: 890, lk5: 890 },
		_125100: { alf: 14.2, li6: '', lk5: 970 },

		_15080: { alf: 30.2, li6: 950, lk5: 950 },
		_150100: { alf: 22.2, li6: '', lk5: 1030 },
		_150150: { alf: 0, li6: '', lk5: 320 },

		_200100: { alf: 60.3, li6: '', lk5: 1110 },
		_200150: { alf: 24.2, li6: '', lk5: 1150 },
		_200200: { alf: 0, li6: '', lk5: 380 },

		_250150: { alf: 8.4, li6: '', lk5: 320 },
		_250200: { alf: 17, li6: '', lk5: 380 },

		_300150: { alf: 61.4, li6: '', lk5: 320 },
		_300200: { alf: 32.8, li6: '', lk5: 380 },
		_300300: { alf: 0, li6: '', lk5: 454 }
	};
	let alfaAr_mod = {
		_3232: { alf: 0, li6: 746, lk5: 708 },

		_4032: { alf: 13.4, li6: 1006, lk5: 968 },
		_4040: { alf: 0, li6: 820, lk5: 821 },

		_5032: { alf: 23.8, li6: 1036, lk5: 998 },
		_5040: { alf: 11.4, li6: 1140, lk5: 1141 },
		_5050: { alf: 0, li6: 908, lk5: 909 },

		_6532: { alf: 38.2, li6: 1056, lk5: 1018 },
		_6540: { alf: 25, li6: 1160, lk5: 1161 },
		_6550: { alf: 15.4, li6: 1248, lk5: 1249 },
		_6565: { alf: 0, li6: 1092, lk5: 1062 },

		_8040: { alf: 32.6, li6: 1170, lk5: 1171 },
		_8050: { alf: 24, li6: 1258, lk5: 1259 },
		_8065: { alf: 10, li6: 1442, lk5: 1412 },
		_8080: { alf: 0, li6: 1206, lk5: 1196 },

		_10050: { alf: 35.4, li6: 1268, lk5: 1269 },
		_10065: { alf: 22.6, li6: 1452, lk5: 1422 },
		_10080: { alf: 13.6, li6: 1566, lk5: 1556 },

		_12565: { alf: 31.8, li6: 1492, lk5: 1462 },
		_12580: { alf: 24.8, li6: 1606, lk5: 1595 },

		_15080: { alf: 30.2, li6: 1666, lk5: 1656 }
	};
	let rty = Object.keys(alfaAr_mod);
	let Kvsar = {
		_15: { kr: 11, ok: 4.24, grz: 10, flt: 5.3 },
		_20: { kr: 15, ok: 7.8, grz: 10, flt: 9.5 },
		_25: { kr: 34, ok: 12.4, grz: 10, flt: 16.5 },
		_32: { kr: 52, ok: 18, grz: 10, flt: 20 },
		_40: { kr: 96, ok: 28, grz: 10, flt: 33 },
		_50: { kr: 184, ok: 40.1, grz: 10, flt: 54 },
		_65: { kr: 200, ok: 72.5, grz: 10, flt: 95 },
		_80: { kr: 470, ok: 111, grz: 10, flt: 140 },
		_100: { kr: 640, ok: 182, grz: 10, flt: 201 },
		_125: { kr: 1080, ok: 302, grz: 10, flt: 340 },
		_150: { kr: 1900, ok: 370, grz: 10, flt: 526 },
		_200: { kr: 2300, ok: 546, grz: 10, flt: 870 },
		_250: { kr: 5100, ok: 2010, grz: 10, flt: 1260 },
		_300: { kr: 9100, ok: 2459, grz: 10, flt: 1735 }
	};

	if (tipL === 'kl') {
		var alfa = alfaAr[ki].alf;
		if (alfa) {
			var alf = alfa;
		} else {
			var alf = 0;
		}
		if (tipIM === 6) {
			var L = alfaAr[ki].li6;
		} else {
			var L = alfaAr[ki].lk5;
		}
	} else if (tipL === 'ml') {
		if (rty[ki]) {
			var alf = alfaAr_mod[ki].alf;
			if (tipIM === 6) {
				var L = alfaAr_mod[ki].li6;
			} else {
				var L = alfaAr_mod[ki].lk5;
			}
		} else {
			var alf = 0;
			var L = 0;
		}
	}

	var sherh = 0.5;
	var Ltr = 0.4;
	var lambda = 0.032;
	var PL = ro(t, p);

	if (otpen === 0) {
		var Gv = Gm * 1000 / PL;
	} else if (otpen === 1) {
		var PLo = ro(t, p);
		var Gvo = Gm * 1000 / PLo;
		var PLg = ro(tg, pg);
		var Gvg = Gg * 1000 / PLg;
		var Gv = Gvo + Gvg;
	} else if (otpen === 2) {
		var Gmo = Gm + Gg;
		var Gv = Gmo * 1000 / PL;
	} else if (otpen === 3) {
		var Gmo = Gm + Gg;
		var Gv = Gmo * 1000 / PL;
	}

	let Kvs_kr = '-';
	let poter_kr = '-';
	let Kvs_ok = '-';
	let poter_ok = '-';
	let Kvs_fil = '-';
	let poter_fil = '';
	let Kvs_grz = '-';
	let poter_grz = '-';

	var atr = Math.pow(du_tr * 0.001, 2) / 4;
	var Vtr = (Gv * 1 / (3.14 * atr) / 3600).toFixed(2);

	if (tipL === 'kl') {
		Kvs_kr = Kvsar[tr].kr;
		poter_kr = Gv / Kvs_kr;

		if (ok == 1) {
			Kvs_ok = Kvsar[tr].ok;
			poter_ok = Gv / Kvs_ok;
		} else {
			Kvs_ok = '-';
			poter_ok = 0;
		}

		if (+filtr == 1) {
			Kvs_fil = Kvsar[tr].flt;
			poter_fil = Gv / Kvs_fil;
		} else {
			Kvs_fil = '-';
			poter_fil = 0;
		}

		if (+filtr == 2) {
			Kvs_grz = Kvsar[tr].grz;
			poter_grz = Kvs_grz * Vtr * Vtr;
		} else {
			Kvs_grz = '-';
			poter_grz = 0;
		}
	} else if (tipL === 'ml') {
		Kvs_kr = Kvsar[zau].kr;
		poter_kr = Gv / Kvs_kr;
		Kvs_ok = '-';
		poter_ok = 0;
		Kvs_fil = '-';
		poter_fil = 0;
		Kvs_grz = '-';
		poter_grz = 0;
	}

	// console.log('poter_kr',poter_kr)
	// console.log('poter_ok',poter_ok)
	// console.log('poter_fil',poter_fil)
	// console.log('alf',alf)

	var a1 = Math.pow(du_im * 0.001, 2) / 4;
	var V = (Gv * 1 / (3.14 * a1) / 3600).toFixed(2);
	var n = 17.8 / (1 + 0.0337 * t + 0.000221 * Math.pow(t, 2));

	var re = du_im * V / (n * 0.0001);

	var I = 0.11 * Math.pow(68 / re + sherh / du_im, 0.25);

	if (alf === 0) {
		var Xtr = 0;
	} else {
		var Xtr = I / (8 * Math.sin(alf / 2 * Math.PI / 180)) * (1 - Math.pow(du_im / du_tr, 4));
	}

	if (alf === 0) {
		var Xk = 0;
	} else {
		var Xk =
			(-0.0125 * Math.pow(du_im / du_tr, 6) +
				0.0224 * Math.pow(du_im / du_tr, 5) -
				0.00723 * Math.pow(du_im / du_tr, 4) +
				0.00444 * Math.pow(du_im / du_tr, 2) -
				0.00745) *
				(Math.pow(0.01745 * alf, 3) - 2 * Math.PI * Math.pow(0.01745 * alf, 2) - 10 * 0.01745 * alf) +
			Xtr;
	}
	var Kd = -0.24 * Math.log(re) / Math.LN10 + 2.869;

	if (alf === 0) {
		var Xr = 0;
	} else {
		var Xr =
			Kd * 3.2 * Math.pow(1 - Math.pow(du_im / du_tr, 2), 2) * Math.pow(Math.tan(alf / 2 * Math.PI / 180), 1.25);
	}

	var Hk = Xk * Math.pow(V, 2) / (2 * 9.81);

	var alshu = 0.11 * Math.pow(68 / re + 0.03 / du_im, 0.25);
	var Hi = (I * (8 * du_im + 10) + alshu * L - alshu * (8 * du_im + 10)) * Math.pow(V, 2) / (2 * 9.81 * du_im);

	var Hd = (Xr + Xtr) * Math.pow(V, 2) / (2 * 9.81);
	var H = Hk + Hi + Hd;

	// var Ptr = ((Ltr*0.00638*lambda*Math.pow(Gv,2))/( Math.pow(0.001*du_tr, 5) * 958.4))/1000; in truboprovod

	// var Ptrmestn = Math.pow(V, 2)*(kr+suj+trm+man)*48.9/9810;

	// var Ptrmestn = Math.pow(V, 2)*(kr+fil+grz+ok)*48.9/9810;

	var Ptrmestn =
		20 * Math.pow(poter_kr, 2) +
		10 * Math.pow(poter_ok, 2) +
		10 * Math.pow(poter_fil, 2) +
		Math.pow(poter_grz / (2 * 9.81), 2);

	// console.log('Ptrmestn',Ptrmestn)

	var Puu = (H + Ptrmestn).toFixed(4);

	// console.log('Puu',Puu)

	var Gidr = {
		du_im: du_im,
		du_tr: du_tr,
		Puu: Puu,
		L: L,
		alf: alf,
		t: t,
		p: p,
		sherh: sherh,
		Gv: Gv.toFixed(3),
		V: V,
		PL: PL,
		n: n.toFixed(2) + 'E-07',
		re: re.toFixed(),
		I: I.toFixed(4),
		Xtr: Xtr.toFixed(4),
		Xk: Xk.toFixed(4),
		Kd: Kd.toFixed(4),
		Xr: Xr.toFixed(4),
		Hk: Hk.toFixed(4),
		Hi: Hi.toFixed(4),
		Hd: Hd.toFixed(4),
		H: H.toFixed(4),
		Ltr: Ltr,
		lambda: lambda,
		//   Ptr: Ptr.toFixed(4),
		Ptrmestn: Ptrmestn.toFixed(4),
		kr: Kvs_kr,
		filtr: Kvs_fil,
		grz: Kvs_grz,
		ok: Kvs_ok
	};
	return Gidr;
}

function rash(q, t1, t2) {
	var r = +(q * 1000 / (t1 - t2)).toFixed(3);
	return r;
}

function rashgvs_cirk(Qgvsmax, t3, t4, Kchn, txvL, txvZ, koef, t1, Ktp, Knp, beta) {
	if (t1) {
		var tt3 = t1;
	} else {
		var tt3 = t3;
	}
	// var Ktp = 0.25;
	// var Knp = 0.8;
	// var beta = 1.3;

	var Qsr = +(Qgvsmax / Kchn).toFixed(6);
	var Ggvsmax = +(koef * Qgvsmax * 1000 / (t3 - txvZ)).toFixed(3);
	var Ggvssr = +(koef * Qsr * 1000 / (t3 - txvZ)).toFixed(3);
	var Qgvscirkz = +(Ktp * Qsr / (1 + Ktp)).toFixed(6);
	var Ggvscirkz = +(Qgvscirkz * 1000 / (tt3 - t4)).toFixed(3);
	var Qgvsmaxl = +(Qgvsmax * Knp).toFixed(6);
	var Ggvsmaxl = +(koef * Qgvsmaxl * 1000 / (t3 - txvL)).toFixed(3);
	var Qgvssrl = +(Qgvsmaxl / Kchn).toFixed(6);
	var Ggvssrl = +(koef * Qgvssrl * 1000 / (t3 - txvL)).toFixed(3);
	var Qgvscirkl = +(Ktp * Qgvssrl / (1 + Ktp)).toFixed(6);
	var Ggvscirkl = +(beta * Qgvscirkl * 1000 / (t3 - t4)).toFixed(3);
	var Ggvscirklmax = +(Ggvscirkl * 1.5).toFixed(3);
	var Ggvscirklmin = +(Ggvscirkl * 0.4).toFixed(3);
	var Gm3 = +Ggvsmax.toFixed(3);
	var Gm4 = +Ggvscirkz.toFixed(3);

	var arr = {
		Gm3: Gm3,
		Gm4: Gm4,
		Ggvsmax: Ggvsmax,
		Ggvssr: Ggvssr,
		Qgvscirkz: Qgvscirkz,
		Ggvscirkz: Ggvscirkz,
		Qgvsmaxl: Qgvsmaxl,
		Ggvsmaxl: Ggvsmaxl,
		Qgvssrl: Qgvssrl,
		Ggvssrl: Ggvssrl,
		Qgvscirkl: Qgvscirkl,
		Ggvscirkl: Ggvscirkl,
		Ggvscirklmax: Ggvscirklmax,
		Ggvscirklmin: Ggvscirklmin
	};
	return arr;
}

function ro(t, p) {
	var ror = (Math.pow(t * 0.01, 5) * (-0.033875 * p + 12.742) +
		Math.pow(t * 0.01, 4) * (0.096667 * p - 44.488) +
		Math.pow(t * 0.01, 3) * (-0.11255 * p + 68.806) +
		Math.pow(t * 0.01, 2) * (0.083292 * p - 84.927) +
		t * 0.01 * (-0.037762 * p + 6.4159) +
		0.049917 * p +
		999.792).toFixed();
	return ror;
}

function pr(isx, sk, peres, R, tip_rascheta) {
	var txvL = +isx.txvL;
	var txvZ = +isx.txvZ;
	var koef = 1;
	var Ktp = +isx.ktp;
	var Knp = +isx.knp;
	var beta = +isx.beta;

	if (tip_rascheta != 'gvs') {
		if (isx.qco > 0) {
			var ngr = +isx.qco;
			var t1 = +isx.t1;
			var t2 = +isx.t2;
			if (+isx.p1 === 0 || !isx.p1) {
				var p1 = 5;
			} else {
				var p1 = +isx.p1 / 10;
			}
			if (+isx.p2 === 0 || !isx.p2) {
				var p2 = 4;
			} else {
				var p2 = +isx.p2 / 10;
			}
			var tipIM = isx.tipIMo;
			var tipL = isx.tipLo;
			var G = rash(ngr, t1, t2);
			var Gm1 = +G;
			var GGG = Gm1;
			var Gm2 = +G;
			var PL1 = ro(t1, p1);
			var Gv1 = +(Gm1 * 1000 / PL1).toFixed(3);
			var PL2 = ro(t2, p2);
			var Gv2 = +(Gm2 * 1000 / PL2).toFixed(3);
			var otpen = 0;

			if (+isx.sx_otkr > 0) {
				var ngrg = +isx.qmax;
				var t3 = +isx.t3;
				var t4 = +isx.t4;
				if (+isx.p3 === 0 || isx.p3 === '') {
					var p3 = 4.5;
				} else {
					var p3 = +isx.p3 / 10;
				}
				if (+isx.p4 === 0 || isx.p4 === '') {
					var p4 = 3.5;
				} else {
					var p4 = +isx.p4 / 10;
				}
				var kch = isx.kch;
				var Gg = rashgvs_cirk(ngrg, t3, t4, kch, txvL, txvZ, koef, '', Ktp, Knp, beta);
				var gg1 = +Gg.Gm3;
				if (isx.sx_gvs > 0) {
					gg2 = 0;
				} else {
					var gg2 = +Gg.Gm4;
				}
				var Gm1sum = +(gg1 + Gm1).toFixed(3);
				var GGG = Gm1sum;
				var Gm2sum = +(gg2 + Gm2).toFixed(3);
				var otpen = 1;
			}

			if (+isx.sx_gvs_dep > 0) {
				if (+isx.sx_gvs_dep === 2) {
					koef = 0.55;
				}
				var ngrg = +isx.qmax;
				var t3 = +isx.t3;
				var t4 = +isx.t4;
				if (+isx.p3 === 0 || isx.p3 === '') {
					var p3 = 4.5;
				} else {
					var p3 = +isx.p3 / 10;
				}
				if (+isx.p4 === 0 || isx.p4 === '') {
					var p4 = 3.5;
				} else {
					var p4 = +isx.p4 / 10;
				}
				var kch = isx.kch;
				var Gg = rashgvs_cirk(ngrg, t3, 55, kch, t4, t4, koef, t1, Ktp, Knp, beta);
				var gg1 = +Gg.Gm3;
				var gg2 = +Gg.Gm3;

				if (!t4) {
					gg2 = 0;
				}

				var Gm1sum = +(gg1 + Gm1).toFixed(3);
				var GGG = Gm1sum;
				var Gm2sum = +(gg2 + Gm2).toFixed(3);
				var otpen = 2;
				var PL3 = ro(t3, p3);
				var PL4 = ro(t4, p4);
				var objgvs = {
					gdr3: { Gv: '', V: '', du_im: 0, PL: PL3 },
					gdr4: { Gv: '', V: '', du_im: 0, PL: PL4 },
					Ggvs: Gg
				};
			}

			if (+isx.sx_otkr > 1) {
				var PL3 = ro(t3, p3);
				var Gv3 = (Gg.Gm3 / PL3 * 1000).toFixed(3);

				if (+isx.sx_otkr < 3) {
					var PL4 = ro(t4, p4);
					var Gv4 = (Gg.Gm4 / PL4 * 1000).toFixed(3);
				} else {
					var PL4 = '';
					var Gv4 = '';
				}

				var objgvs = {
					gdr3: { Gv: Gv3, V: '', du_im: 0, PL: PL3 },
					gdr4: { Gv: Gv4, V: '', du_im: 0, PL: PL4 },
					Ggvs: Gg
				};
			}

			if (peres === 'peres') {
				var DUim1 = isx.di1;
				var duTr1 = isx.dut1;
			} else {
				var n1 = podbor(GGG, t1, p1, tipL, sk);
				var DUim1 = n1[1];
				var duTr1 = n1[2];
			}

			var gdr1 = gidr(t1, DUim1, duTr1, Gm1, p1, tipL, gg1, t3, p3, otpen, isx.filo, 0, tipIM);
			var DUim2 = DUim1;
			var gdr2 = gidr(t2, DUim2, duTr1, Gm2, p2, tipL, gg2, t4, p4, otpen, isx.filo, 0, tipIM);

			if (isx.sx_ot > 0) {
				var Gm9 = +(ngr * 3.6).toFixed(4);

				if (peres === 'peres') {
					var DUim9 = isx.di9;
					var duTr9 = isx.dut9;
				} else {
					var n9 = podborPodp(Gm9, t2, p2, sk);
					var DUim9 = n9[1];
					var duTr9 = n9[2];
				}
				var gdr9 = gidr(t2, DUim9, duTr9, Gm9, p2, 'kl', null, null, null, 0, 0, 0, 5);
			} else {
				var gdr9 = { Gv: '', V: '', du_im: 0 };
			}

			var OT = { Gm1, Gm2, Gv1, Gv2, Gm1sum, Gm2sum, Gm9 };
			var objot = {
				OT: OT,
				gdr1: gdr1,
				gdr2: gdr2,
				gdr9: gdr9
			};
		} else {
			var objot = {
				OT: {},
				gdr1: { Gv: '', V: '', du_im: isx.di1, du_tr: isx.dut1 },
				gdr2: { Gv: '', V: '', du_im: isx.di2, du_tr: isx.dut2 },
				gdr9: { Gv: '', V: '', du_im: isx.di9, du_tr: isx.dut9 },
				not_ot: {}
			};
		}
	}

	if (tip_rascheta != 'ot') {
		if (+isx.sx_gvs_dep === 0 && +isx.sx_otkr < 2) {
			if (isx.qmax > 0) {
				var ngr = isx.qmax;
				var t3 = isx.t3;
				var t4 = isx.t4;
				if (+isx.p3 === 0 || isx.p3 === '') {
					var p3 = 4.5;
				} else {
					var p3 = +isx.p3 / 10;
				}
				if (+isx.p4 === 0 || isx.p4 === '') {
					var p4 = 3.5;
				} else {
					var p4 = +isx.p4 / 10;
				}
				var kch = isx.kch;
				var tipL = isx.tipLg;
				var tipIMg = isx.tipIMg3;
				var Ggvs = rashgvs_cirk(ngr, t3, t4, +kch, txvL, txvZ, koef, '', Ktp, Knp, beta);
				var Gm3 = Ggvs.Gm3;
				var Gm4 = Ggvs.Gm4;

				if (peres === 'peres') {
					var DUim3 = isx.di3;
					var duTr3 = isx.dut3;
				} else {
					var n1 = podbor(Gm3, t3, p3, tipL, sk);
					var DUim3 = n1[1];
					var duTr3 = n1[2];
				}
				var gdr3 = gidr(t3, DUim3, duTr3, Gm3, p3, tipL, null, null, null, 0, isx.filg, 0, tipIMg);
				if (isx.sx_gvs < 1) {
					if (peres === 'peres') {
						var DUim4 = isx.di4;
						var duTr4 = isx.dut4;
					} else {
						var n2 = podbor(Gm4, t4, p4, tipL, sk);
						var DUim4 = n2[1];
						var duTr4 = DUim4;
						var duTr4 = n2[2];
					}
				}

				if (DUim4 > 0) {
					var gdr4 = gidr(t4, DUim4, duTr4, Gm4, p4, tipL, null, null, null, 0, isx.filg, 1, tipIMg);
				} else {
					var gdr4 = { du_im: 0 };
				}
				var objgvs = {
					gdr3: gdr3,
					gdr4: gdr4,
					Ggvs: Ggvs
				};
			} else {
				if (R === 0) {
					// console.log('не считаем проект ГВС - qmax = 0')
					var objgvs = {
						gdr3: { Gv: '', V: '', du_im: isx.di3, du_tr: isx.dut3 },
						gdr4: { Gv: '', V: '', du_im: isx.di3, du_tr: isx.dut3 },
						Ggvs: {},
						not_gvs: {}
					};
				} else {
					// console.log('нхуй знает ')
					var objgvs = {
						gdr3: { Gv: R, V: '', du_im: 0 },
						gdr4: { Gv: '', V: '', du_im: 0 },
						Ggvs: {}
					};
				}
			}
		}
	}

	// console.log('objgvs ', objgvs)
	var resu = Object.assign({}, objot, objgvs);
	return resu;
}

function calc(isx, sk, peres, R, tip_rascheta) {
	var result = pr(isx, sk, peres, R, tip_rascheta);
	return result;
}

export default calc;
