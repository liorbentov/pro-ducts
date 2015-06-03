var request = require("request");
var Q = require("q");

var products = [
	{productId : 1, productName : '208 Nokia', zapId : 867366}, 
	{productId : 2, productName : 'HTC ONE M8 16GB', zapId : 875228}, 
	{productId : 3, productName : 'Apple iPhone 6 Plus 16GB Sim Fre', zapId : 884672}, 
	{productId : 4, productName : 'Samsung Galaxy Note 3 N9005 32GB', zapId : 858934}, 
	{productId : 5, productName : 'Xiaomi Mi4 16GB', zapId : 888657}, 
	{productId : 6, productName : 'Asus Zenfone 5 16GB', zapId : 888610}, 
	{productId : 7, productName : 'Asus Zenfone 5 8GB', zapId : 884042}, 
	{productId : 8, productName : 'iPhone 5c 16GB SimFree ', zapId : 858453}, 
	{productId : 9, productName : 'Samsung Galaxy Trend Plus S7580', zapId : 876847}, 
	{productId : 10, productName : 'LG G3 32GB D855', zapId : 879119}, 
	{productId : 11, productName : 'OnePlus One 16GB', zapId : 884106}, 
	{productId : 12, productName : 'LG G2 16GB D802', zapId : 858780}, 
	{productId : 13, productName : 'Samsung Galaxy S4 mini LTE I9195', zapId : 854077}, 
	{productId : 14, productName : 'Samsung Galaxy S5 SM-G900F 16GB ', zapId : 874559}, 
	{productId : 15, productName : 'LG G3 16GB D855', zapId : 879082}, 
	{productId : 16, productName : 'LG G2 32GB D802', zapId : 858781}, 
	{productId : 17, productName : 'Samsung Galaxy S3 I9300', zapId : 822764}, 
	{productId : 18, productName : 'Samsung Galaxy Grand 2 SM-G7102', zapId : 872655}, 
	{productId : 19, productName : 'Samsung Galaxy S5 Mini SM-G800F ', zapId : 883607}, 
	{productId : 20, productName : 'Samsung Galaxy S2 I9100', zapId : 792456}, 
	{productId : 21, productName : 'Samsung Galaxy Note 4 SM-N910F', zapId : 886874}, 
	{productId : 22, productName : 'Apple iPhone 6 16GB Sim Free', zapId : 884326}, 
	{productId : 23, productName : 'Samsung Galaxy S4 I9500 16GB', zapId : 846717}, 
	{productId : 24, productName : 'Apple iPhone 6 Plus 64GB Sim Fre', zapId : 884674}, 
	{productId : 25, productName : 'iPhone 4s 16GB Sim free ', zapId : 803982}, 
	{productId : 26, productName : 'Meizu MX3 16GB', zapId : 865837}, 
	{productId : 27, productName : 'iPhone 5s 16GB SimFree ', zapId : 858455}, 
	{productId : 28, productName : 'LG G2 mini D620R LTE', zapId : 876937}, 
	{productId : 29, productName : 'Sony Xperia Z3 16GB', zapId : 886604}, 
	{productId : 30, productName : 'Samsung Galaxy Young S6310', zapId : 853610}, 
	{productId : 31, productName : 'Samsung Galaxy Note 3 Neo N7505 ', zapId : 876107}, 
	{productId : 32, productName : 'Asus Zenfone 6 16GB', zapId : 889696}, 
	{productId : 33, productName : 'LG G3 S Beat D722', zapId : 883606}, 
	{productId : 34, productName : 'Samsung Galaxy S3 Neo I9301I', zapId : 883005}, 
	{productId : 35, productName : 'OnePlus One 64GB', zapId : 884518}, 
	{productId : 36, productName : 'Motorola Nexus 6 32GB', zapId : 887630}, 
	{productId : 37, productName : 'Doogee DG310', zapId : 884041}, 
	{productId : 38, productName : 'Samsung Galaxy S 3 LTE I9305', zapId : 835833}, 
	{productId : 39, productName : 'Samsung Galaxy S III mini VE I82', zapId : 880995}, 
	{productId : 40, productName : 'Samsung Galaxy S4 I9515 16GB', zapId : 880815}, 
	{productId : 41, productName : 'Apple iPhone 6 64GB Sim Free', zapId : 884668}, 
	{productId : 42, productName : 'LG Nexus 4 E960 16GB', zapId : 837010}, 
	{productId : 43, productName : 'iPhone 5 16GB SimFree ', zapId : 831396}, 
	{productId : 44, productName : 'Sony Xperia Z3 Compact', zapId : 886522}, 
	{productId : 45, productName : 'Samsung Galaxy Alpha G850F 32GB ', zapId : 886360}, 
	{productId : 46, productName : 'Samsung Galaxy S3 mini I8190 8GB', zapId : 835360}, 
	{productId : 47, productName : 'LG Nexus 5 16GB D821', zapId : 861768}, 
	{productId : 48, productName : 'LG Nexus 5 32GB D821', zapId : 862029}, 
	{productId : 49, productName : 'Samsung Galaxy Note 4 SM-N910C', zapId : 888961}, 
	{productId : 50, productName : '105 Nokia', zapId : 865133}, 
	{productId : 51, productName : 'Lenovo Vibe X S960', zapId : 863148}, 
	{productId : 52, productName : 'iPhone 5s 32GB SimFree ', zapId : 858456}, 
	{productId : 53, productName : 'Samsung Galaxy Note 2 N7100', zapId : 833528}, 
	{productId : 54, productName : 'LG L70 D320F', zapId : 876581}, 
	{productId : 55, productName : 'Nokia Lumia 520', zapId : 853449}, 
	{productId : 56, productName : 'Sony Xperia Z2 LTE', zapId : 873109}, 
	{productId : 57, productName : 'Samsung Galaxy S4 I9505 16GB', zapId : 847910}, 
	{productId : 58, productName : 'LG G Flex', zapId : 868863}, 
	{productId : 59, productName : 'LG L90 D405H', zapId : 876583}, 
	{productId : 60, productName : 'HTC one M8 32GB', zapId : 880022}, 
	{productId : 61, productName : 'Sony Xperia Z', zapId : 842872}, 
	{productId : 62, productName : 'Elephone G5', zapId : 888586}, 
	{productId : 63, productName : 'Samsung Galaxy S4 mini i9190 8GB', zapId : 853948}, 
	{productId : 64, productName : 'HTC Desire Eye', zapId : 887815}, 
	{productId : 65, productName : 'Lenovo Golden Warrior A8 A806', zapId : 885120}, 
	{productId : 66, productName : 'Samsung Galaxy S3 Neo I9300i', zapId : 881590}, 
	{productId : 67, productName : 'LG G2 mini', zapId : 877897}, 
	{productId : 68, productName : 'HTC ONE E8', zapId : 884464}, 
	{productId : 69, productName : 'Lenovo S860', zapId : 882475}, 
	{productId : 70, productName : 'HTC One M7 32GB', zapId : 846175}, 
	{productId : 71, productName : 'Motorola Moto G LTE', zapId : 884089}, 
	{productId : 72, productName : 'Huawei Ascend P7', zapId : 884601}, 
	{productId : 73, productName : 'Leagoo Lead 3', zapId : 885463}, 
	{productId : 74, productName : 'Samsung Galaxy S5 SM-G900H 16GB ', zapId : 874560}, 
	{productId : 75, productName : 'Lenovo A850', zapId : 858935}, 
	{productId : 76, productName : 'ThL T6S', zapId : 885464}, 
	{productId : 77, productName : 'HTC Desire 820', zapId : 887814}, 
	{productId : 78, productName : 'ZTE ZTE Redbull V5 V9180', zapId : 889508}, 
	{productId : 79, productName : 'Samsung Galaxy Trend Lite GT-S73', zapId : 862812}, 
	{productId : 80, productName : 'LG L40 D160F', zapId : 876575}, 
	{productId : 81, productName : 'iPhone 5 32GB SimFree ', zapId : 831398}, 
	{productId : 82, productName : 'Nokia C2-01', zapId : 789836}, 
	{productId : 83, productName : 'iPhone 5s 64GB SimFree ', zapId : 858457}, 
	{productId : 84, productName : 'Samsung Galaxy Grand I9082', zapId : 842483}, 
	{productId : 85, productName : 'Motorola Moto G 2nd Gen 2014', zapId : 889635}, 
	{productId : 86, productName : 'Elephone G7', zapId : 890461}, 
	{productId : 87, productName : 'Apple iPhone 6 Plus 128GB Sim Fr', zapId : 884678}, 
	{productId : 88, productName : 'Elephone G6', zapId : 889327}, 
	{productId : 89, productName : 'Nokia Lumia 930', zapId : 880717}, 
	{productId : 90, productName : 'Samsung Galaxy S4 Active I9295 1', zapId : 854504}, 
	{productId : 91, productName : 'Leagoo Lead 4', zapId : 885462}, 
	{productId : 92, productName : 'Sony Xperia Z1', zapId : 860882}, 
	{productId : 93, productName : 'Samsung Galaxy Grand 2 G7105 8GB', zapId : 876846}, 
	{productId : 94, productName : 'Motorola Moto G 16GB', zapId : 868608}, 
	{productId : 95, productName : 'HTC Desire 816', zapId : 876104}, 
	{productId : 96, productName : 'Lenovo A850 Plus', zapId : 887718}, 
	{productId : 97, productName : '108 Nokia', zapId : 873210}, 
	{productId : 98, productName : 'Samsung Galaxy S4 I9506 16GB', zapId : 875349}, 
	{productId : 99, productName : 'Nokia Lumia 1520', zapId : 865322}, 
	{productId : 100, productName : 'Samsung Galaxy Note 3 N9000 32GB', zapId : 859879}, 
	{productId : 101, productName : 'Motorola Moto G 8GB', zapId : 868607}, 
	{productId : 102, productName : 'Motorola Moto X 16GB', zapId : 876105}, 
	{productId : 103, productName : 'Sony Xperia Z Ultra', zapId : 860880}, 
	{productId : 104, productName : 'Apple iPhone 6 128GB Sim Free', zapId : 884670}, 
	{productId : 105, productName : 'Lenovo A560', zapId : 883605}, 
	{productId : 106, productName : 'BlackBerry Q10', zapId : 849385}, 
	{productId : 107, productName : 'Samsung E1200 Pusha', zapId : 833797}, 
	{productId : 108, productName : 'Hisense U971', zapId : 886913}, 
	{productId : 109, productName : 'Sony Xperia Z1 Compact', zapId : 869895}, 
	{productId : 110, productName : 'Uniden Prime 500', zapId : 878446}, 
	{productId : 111, productName : 'Huawei Ascend P6', zapId : 863149}, 
	{productId : 112, productName : 'LG Optimus L4 II E440F', zapId : 854753}, 
	{productId : 113, productName : 'HTC Desire 610', zapId : 879579}, 
	{productId : 114, productName : 'Lenovo S660', zapId : 879578}, 
	{productId : 115, productName : 'LG Optimus L5 II E450F', zapId : 852322}, 
	{productId : 116, productName : 'LG Optimus L7 II P714', zapId : 852323}, 
	{productId : 117, productName : 'LG Optimus L3 II E425F', zapId : 852928}, 
	{productId : 118, productName : 'Samsung Galaxy Y S5360', zapId : 808965}, 
	{productId : 119, productName : 'Nokia Lumia 920', zapId : 835959}, 
	{productId : 120, productName : 'ThL T6 PRO', zapId : 887937}, 
	{productId : 121, productName : 'Samsung Galaxy Mini S5570', zapId : 796288}, 
	{productId : 122, productName : 'Modu T', zapId : 824760}, 
	{productId : 123, productName : 'ThL W200S', zapId : 874274}, 
	{productId : 124, productName : 'Lenovo A820', zapId : 853313}, 
	{productId : 125, productName : 'Mag Helios SP401', zapId : 851393}, 
	{productId : 126, productName : 'Blu Life Pure Mini', zapId : 879053}, 
	{productId : 127, productName : 'Samsung Galaxy Mini 2 S6500', zapId : 830740}, 
	{productId : 128, productName : 'Lenovo A516', zapId : 866515}, 
	{productId : 129, productName : 'HTC Desire 310', zapId : 877105}, 
	{productId : 130, productName : 'iPhone 4S 8GB Sim Free ', zapId : 858923}, 
	{productId : 131, productName : 'iPhone 4 8GB Sim Free ', zapId : 804426}, 
	{productId : 132, productName : 'Samsung Galaxy S2 Plus I9105', zapId : 841521}, 
	{productId : 133, productName : 'HTC One mini 2 16GB', zapId : 880726}, 
	{productId : 134, productName : 'LG Optimus G E975K', zapId : 846543}, 
	{productId : 135, productName : 'Alcatel One Touch Idol Ultra OT-', zapId : 851462}, 
	{productId : 136, productName : 'Nokia Lumia 820', zapId : 835724}, 
	{productId : 137, productName : 'Sony Xperia E', zapId : 850264}, 
	{productId : 138, productName : 'LG Nexus 5 32GB D820', zapId : 864545}, 
	{productId : 139, productName : 'Sony Xperia M2', zapId : 877434}, 
	{productId : 140, productName : 'Mio S510F', zapId : 852053}, 
	{productId : 141, productName : 'Nokia Lumia 1020 32GB', zapId : 860363}, 
	{productId : 142, productName : 'Samsung E1195', zapId : 816140}, 
	{productId : 143, productName : 'Samsung Galaxy S Advance I9070', zapId : 829320}, 
	{productId : 144, productName : 'Gigabyte Gsmart T4', zapId : 877103}, 
	{productId : 145, productName : '2760 Nokia', zapId : 594736}, 
	{productId : 146, productName : 'Samsung Galaxy W i8150', zapId : 818965}, 
	{productId : 147, productName : 'Lenovo P780', zapId : 854256}, 
	{productId : 148, productName : 'LG Optimus L3 E400', zapId : 834903}, 
	{productId : 149, productName : 'Gigabyte Gsmart Arty  A3', zapId : 886402}, 
	{productId : 150, productName : 'Akai K40 4gb', zapId : 879141}, 
	{productId : 151, productName : 'LG Optimus L5 E610/E612', zapId : 834904}, 
	{productId : 152, productName : '6101 Nokia', zapId : 371320}, 
	{productId : 153, productName : 'LG Basic Smartphone 4', zapId : 857503}, 
	{productId : 154, productName : 'Samsung Galaxy S4 mini Duos GT-I', zapId : 856198}, 
	{productId : 155, productName : 'Samsung Galaxy S5 SM-G900F 32GB ', zapId : 884738}, 
	{productId : 156, productName : 'Phicomm I803WA', zapId : 889511}, 
	{productId : 157, productName : 'Helios SP351 Mag', zapId : 857269}, 
	{productId : 158, productName : 'Huawei Ascend G510', zapId : 862030}, 
	{productId : 159, productName : 'HTC Desire 500', zapId : 861632}, 
	{productId : 160, productName : 'Huawei Ascend Y330', zapId : 886763}, 
	{productId : 161, productName : 'Nokia Asha 203', zapId : 834901}, 
	{productId : 162, productName : 'Samsung Galaxy Pocket S5300', zapId : 829053}, 
	{productId : 163, productName : 'Samsung Galaxy K zoom', zapId : 880175}, 
	{productId : 164, productName : 'Elephone G4', zapId : 889325}, 
	{productId : 165, productName : 'Lenovo A316', zapId : 882474}, 
	{productId : 166, productName : 'Apple iPhone 4 32GB', zapId : 763792}, 
	{productId : 167, productName : 'Gigabyte GSmart Alto A2', zapId : 866593}, 
	{productId : 168, productName : 'Samsung Glamis 5511', zapId : 814956}, 
	{productId : 169, productName : 'Sony Xperia T2 Ultra', zapId : 874776}, 
	{productId : 170, productName : 'ZTE Blade III', zapId : 835725}, 
	{productId : 171, productName : 'LG Optimus L7 P705F', zapId : 830742}, 
	{productId : 172, productName : 'Samsung Galaxy S4 I9500 32GB', zapId : 851116}, 
	{productId : 173, productName : 'Lenovo S920', zapId : 863147}, 
	{productId : 174, productName : 'Lenovo A369i', zapId : 868353}, 
	{productId : 175, productName : 'ZTE Blade Vec 4G', zapId : 886213}, 
	{productId : 176, productName : 'Gigabyte Gsmart Saga S3', zapId : 877102}, 
	{productId : 177, productName : 'Samsung Galaxy Ace 3 3G GT-S7270', zapId : 872635}, 
	{productId : 178, productName : 'Samsung Galaxy Mega 2 SM-G750F 1', zapId : 888658}, 
	{productId : 179, productName : 'Lenovo A850i', zapId : 886404}, 
	{productId : 180, productName : 'Samsung Galaxy Ace S5830', zapId : 790898}, 
	{productId : 181, productName : 'HTC Desire 510', zapId : 886764}, 
	{productId : 182, productName : 'Samsung Galaxy Fresh Duos S7392', zapId : 864899}, 
	{productId : 183, productName : 'AEG SQ45E83C', zapId : 879085}, 
	{productId : 184, productName : '500 Nokia', zapId : 804760}, 
	{productId : 185, productName : 'iPhone 5c 32GB SimFree ', zapId : 858454}, 
	{productId : 186, productName : 'Samsung Galaxy S 8GB I9000', zapId : 767777}, 
	{productId : 187, productName : 'LG Optimus G Pro E989', zapId : 854360}, 
	{productId : 188, productName : 'Sony Xperia SP', zapId : 850409}, 
	{productId : 189, productName : '1208 Nokia', zapId : 792325}, 
	{productId : 190, productName : 'Nokia Lumia 830', zapId : 890407}, 
	{productId : 191, productName : 'Motorola Moto G 8GB Dual SIM 2nd', zapId : 887712}, 
	{productId : 192, productName : 'Akai K35N', zapId : 883667}, 
	{productId : 193, productName : 'Doro PhoneEasy 615', zapId : 841517}, 
	{productId : 194, productName : 'LG Optimus L1 II E410F', zapId : 858433}, 
	{productId : 195, productName : 'Huawei Ascend Y300', zapId : 859531}, 
	{productId : 196, productName : 'Lenovo S820', zapId : 866104}, 
	{productId : 197, productName : 'HTC ONE X', zapId : 818727}, 
	{productId : 198, productName : 'Lenovo A680', zapId : 872659}, 
	{productId : 199, productName : 'Samsung Galaxy Ace Plus S7500', zapId : 816952}, 
	{productId : 200, productName : 'Nokia Lumia 925', zapId : 856199}, 
	{productId : 201, productName : '1070 chiaro איזי פון סלולרי למבו', zapId : 814433}, 
	{productId : 202, productName : 'Lenovo A630', zapId : 865323}, 
	{productId : 203, productName : 'Nokia Lumia 1320', zapId : 868773}, 
	{productId : 204, productName : 'Samsung Galaxy Pocket Neo S5310', zapId : 868927}, 
	{productId : 205, productName : 'Samsung Galaxy S Duos S7562', zapId : 840961}, 
	{productId : 206, productName : 'Samsung Galaxy Note N7000', zapId : 804762}, 
	{productId : 207, productName : 'LG F70 D315', zapId : 890290}, 
	{productId : 208, productName : 'Nokia Lumia 635', zapId : 889812}, 
	{productId : 209, productName : 'Nokia E6', zapId : 796093}, 
	{productId : 210, productName : 'Akai Apollo', zapId : 888699}, 
	{productId : 211, productName : 'Nokia Lumia 625', zapId : 861506}, 
	{productId : 212, productName : 'LG G Pro Lite 8GB D683', zapId : 865802}, 
	{productId : 213, productName : 'Samsung Galaxy Win / Grand Quatt', zapId : 854754}, 
	{productId : 214, productName : 'Samsung Galaxy Note 3 N9005 16GB', zapId : 859529}, 
	{productId : 215, productName : 'Alcatel OT-223', zapId : 851461}, 
	{productId : 216, productName : 'Mag Helios SP451', zapId : 874523}, 
	{productId : 217, productName : 'HTC One MAX 16GB', zapId : 862031}, 
	{productId : 218, productName : 'Sony Ericsson Xperia PLAY', zapId : 791260}, 
	{productId : 219, productName : 'Lenovo K900', zapId : 854061}, 
	{productId : 220, productName : '130 Nokia', zapId : 889975}, 
	{productId : 221, productName : 'Apple iPhone 4S 16GB', zapId : 804046}, 
	{productId : 222, productName : 'ThL W300', zapId : 865436}, 
	{productId : 223, productName : 'Samsung Galaxy Nexus I9250', zapId : 809296}, 
	{productId : 224, productName : 'Zopo ZP700', zapId : 865800}, 
	{productId : 225, productName : 'AEG SQ40E86H', zapId : 879084}, 
	{productId : 226, productName : 'איזי פון למבוגרים 1045 myPhone', zapId : 842389}, 
	{productId : 227, productName : 'Lenovo Vibe Z K910', zapId : 872657}, 
	{productId : 228, productName : 'HTC Windows Phone 8X', zapId : 835408}, 
	{productId : 229, productName : 'Nokia 6600 Fold', zapId : 716241}, 
	{productId : 230, productName : 'Lenovo A880', zapId : 872658}, 
	{productId : 231, productName : 'Akai DRAGON', zapId : 887521}, 
	{productId : 232, productName : '2720 Nokia', zapId : 744533}, 
	{productId : 233, productName : '100 Nokia', zapId : 815153}, 
	{productId : 234, productName : 'Samsung Galaxy Grand Neo I9060 8', zapId : 876110}, 
	{productId : 235, productName : 'Huawei Ascend G300', zapId : 866348}, 
	{productId : 236, productName : 'Samsung Galaxy Note 3 SM-N900 32', zapId : 883608}, 
	{productId : 237, productName : 'Sony Xperia Tipo', zapId : 833125}, 
	{productId : 238, productName : '6131 Nokia', zapId : 417642}, 
	{productId : 239, productName : 'ZTE Baker', zapId : 864898}, 
	{productId : 240, productName : 'BlackBerry Z10', zapId : 841556}, 
	{productId : 241, productName : 'Samsung Galaxy A5 SM-A500F', zapId : 891059}, 
	{productId : 242, productName : 'ThL T5S', zapId : 868167}, 
	{productId : 243, productName : 'Samsung Galaxy Pocket Plus S5301', zapId : 845305}, 
	{productId : 244, productName : 'LG Optimus Vu P895', zapId : 841109}, 
	{productId : 245, productName : 'Nokia 6230i', zapId : 372379}, 
	{productId : 246, productName : 'Phicomm Clue C230', zapId : 885881}, 
	{productId : 247, productName : 'Motorola DEFY', zapId : 791114}, 
	{productId : 248, productName : 'Mag Helios SP471', zapId : 851460}, 
	{productId : 249, productName : 'Mio S500', zapId : 852054}, 
	{productId : 250, productName : 'Lenovo S650', zapId : 866976}, 
	{productId : 251, productName : 'Samsung Galaxy Gio S5660', zapId : 795765}, 
	{productId : 252, productName : 'Sony Xperia S', zapId : 834346}, 
	{productId : 253, productName : 'ThL T5', zapId : 868166}, 
	{productId : 254, productName : 'AEG E825Q', zapId : 879086}, 
	{productId : 255, productName : 'Huawei Ascend G630', zapId : 886537}, 
	{productId : 256, productName : 'Hyundai T70', zapId : 882018}, 
	{productId : 257, productName : 'Huawei U8180', zapId : 812986}, 
	{productId : 258, productName : 'Crown V5', zapId : 887349}, 
	{productId : 259, productName : 'Hyundai T30', zapId : 882016}, 
	{productId : 260, productName : '6600 Nokia', zapId : 371321}, 
	{productId : 261, productName : 'Akai Aristo', zapId : 887538}, 
	{productId : 262, productName : 'Sony Ericsson J108', zapId : 776618}, 
	{productId : 263, productName : '6350 Nokia', zapId : 811305}, 
	{productId : 264, productName : 'Deco איזי פון דקו למבוגרים myPho', zapId : 833254}, 
	{productId : 265, productName : 'Sansui S50', zapId : 887557}, 
	{productId : 266, productName : 'Samsung S410I', zapId : 383479}, 
	{productId : 267, productName : 'Sansui S40', zapId : 887559}, 
	{productId : 268, productName : 'ThL W11 32GB', zapId : 865693}, 
	{productId : 269, productName : 'Lenovo A590', zapId : 866089}, 
	{productId : 270, productName : 'Sony Xperia U', zapId : 829054}, 
	{productId : 271, productName : 'Samsung Galaxy Xcover S5690', zapId : 817289}, 
	{productId : 272, productName : 'Nokia C2-01.5', zapId : 854032}, 
	{productId : 273, productName : 'Motorola RAZR XT910', zapId : 809295}, 
	{productId : 274, productName : 'Amoi N828 4GB', zapId : 879076}, 
	{productId : 275, productName : 'Samsung Galaxy S2 Skyrocket i727', zapId : 850850}, 
	{productId : 276, productName : 'iPhone 5 64GB SimFree ', zapId : 831400}, 
	{productId : 277, productName : 'Uniden Prime 471', zapId : 888289}, 
	{productId : 278, productName : 'Slider Intelligent C3033', zapId : 862616}, 
	{productId : 279, productName : 'Samsung Galaxy Mega I9205 8GB', zapId : 853420}, 
	{productId : 280, productName : 'LG Nexus 5 16GB D820', zapId : 864543}, 
	{productId : 281, productName : 'Samsung Galaxy 5 I5500', zapId : 824764}, 
	{productId : 282, productName : 'Samsung Manhattan GT-E3300', zapId : 834101}, 
	{productId : 283, productName : 'Sony Xperia Sola', zapId : 829908}, 
	{productId : 284, productName : 'Apple iPhone 3Gs 32GB', zapId : 732833}, 
	{productId : 285, productName : 'Lenovo A269i', zapId : 868170}, 
	{productId : 286, productName : 'Samsung Galaxy Express I8730', zapId : 847045}, 
	{productId : 287, productName : 'Lenovo A916', zapId : 887720}, 
	{productId : 288, productName : 'Lenovo A889', zapId : 884739}, 
	{productId : 289, productName : 'ThL W200', zapId : 854517}, 
	{productId : 290, productName : 'Sony Ericsson Arc S', zapId : 806963}, 
	{productId : 291, productName : 'LG Optimus 4X HD P880', zapId : 835556}, 
	{productId : 292, productName : 'Samsung Galaxy Fame S6810', zapId : 845654}, 
	{productId : 293, productName : 'Xtreamer Q', zapId : 859932}, 
	{productId : 294, productName : 'Nokia E72', zapId : 744083}, 
	{productId : 295, productName : 'Motorola WX295', zapId : 776504}, 
	{productId : 296, productName : 'Nokia Asha 306', zapId : 834902}, 
	{productId : 297, productName : 'Sony Xperia C', zapId : 863283}, 
	{productId : 298, productName : '6021 Nokia', zapId : 371343}, 
	{productId : 299, productName : 'Blu Vivo IV D970L', zapId : 883603}, 
	{productId : 300, productName : 'Lenovo S930', zapId : 866977}, 
	{productId : 301, productName : 'LG Optimus L9 P768f', zapId : 846273}, 
	{productId : 302, productName : 'Lenovo A830', zapId : 853451}, 
	{productId : 303, productName : 'BlackBerry Z30', zapId : 866213}, 
	{productId : 304, productName : 'Nokia Asha 311 RM-714', zapId : 835410}, 
	{productId : 305, productName : 'More Fine U5', zapId : 883612}, 
	{productId : 306, productName : 'More Fine S6', zapId : 883614}, 
	{productId : 307, productName : 'Apple IPHONE 4 8GB', zapId : 809169}, 
	{productId : 308, productName : 'Samsung Galaxy Mega 6.3 I9200 8G', zapId : 854075}, 
	{productId : 309, productName : 'Meizu MX2 Dream', zapId : 846001}, 
	{productId : 310, productName : 'HTC One V', zapId : 818966}, 
	{productId : 311, productName : 'Geemarc CL8350', zapId : 870607}, 
	{productId : 312, productName : 'Huawei Ascend Y201 Pro', zapId : 866592}, 
	{productId : 313, productName : 'Blu Life Pure XL L260L', zapId : 879064}, 
	{productId : 314, productName : 'HTC Windows Phone 8S', zapId : 837345}, 
	{productId : 315, productName : 'Zopo ZP980', zapId : 853826}, 
	{productId : 316, productName : 'LG Optimus L7 II P710', zapId : 853078}, 
	{productId : 317, productName : 'Nokia X2', zapId : 770039}, 
	{productId : 318, productName : 'Alcatel OT-918', zapId : 825264}, 
	{productId : 319, productName : 'Zopo ZP580', zapId : 877432}, 
	{productId : 320, productName : 'Slider LitePhone A1026', zapId : 862619}, 
	{productId : 321, productName : '3711 Nokia', zapId : 787636}, 
	{productId : 322, productName : 'HTC Sensation XL', zapId : 806958}, 
	{productId : 323, productName : 'Nokia C3-01', zapId : 785003}, 
	{productId : 324, productName : 'Sony Xperia J', zapId : 835411}, 
	{productId : 325, productName : 'Motorola Atrix 2', zapId : 816113}, 
	{productId : 326, productName : 'HTC Desire C', zapId : 834179}, 
	{productId : 327, productName : 'ThL W100S', zapId : 865343}, 
	{productId : 328, productName : 'Nokia X3-02', zapId : 776506}, 
	{productId : 329, productName : 'Gigabyte Gsmart Mika M3', zapId : 890286}, 
	{productId : 330, productName : 'Samsung C3050', zapId : 773738}, 
	{productId : 331, productName : 'Sony Ericsson XPERIA X10', zapId : 774429}, 
	{productId : 332, productName : 'Nokia Lumia 735', zapId : 890406}, 
	{productId : 333, productName : 'Samsung Galaxy Star S5280', zapId : 853312}, 
	{productId : 334, productName : 'Gigabyte GSmart Tuku T2', zapId : 857012}, 
	{productId : 335, productName : 'Samsung Galaxy Y Duos S6102', zapId : 822763}, 
	{productId : 336, productName : 'LG Basic Smartphone 3.8', zapId : 882476}, 
	{productId : 337, productName : 'LG P350', zapId : 808966}, 
	{productId : 338, productName : 'Blu Neo 4.5', zapId : 883599}, 
	{productId : 339, productName : 'Akai Genesis', zapId : 887540}, 
	{productId : 340, productName : '6288 Nokia', zapId : 480326}, 
	{productId : 341, productName : 'HTC Advantage X7500', zapId : 680878}, 
	{productId : 342, productName : 'Nokia N97', zapId : 721073}, 
	{productId : 343, productName : '2730 Nokia', zapId : 735184}, 
	{productId : 344, productName : 'Motorola Defy Mini XT320', zapId : 835023}, 
	{productId : 345, productName : '7230 Nokia', zapId : 752098}, 
	{productId : 346, productName : 'HTC One SV', zapId : 837343}, 
	{productId : 347, productName : 'Sony Ericsson Zylo', zapId : 775587}, 
	{productId : 348, productName : 'Nokia Lumia 620', zapId : 845715}, 
	{productId : 349, productName : 'Samsung Mini Touch S3370E', zapId : 770102}, 
	{productId : 350, productName : 'HTC Desire 300  Zara mini', zapId : 869681}, 
	{productId : 351, productName : 'Samsung Galaxy Ace Duos S6802', zapId : 834719}, 
	{productId : 352, productName : 'Motorola V6', zapId : 383481}, 
	{productId : 353, productName : 'LG Optimus L9 P760', zapId : 843985}, 
	{productId : 354, productName : 'HTC One mini', zapId : 856507}, 
	{productId : 355, productName : 'Samsung Galaxy Pop Plus S5570i', zapId : 816659}, 
	{productId : 356, productName : 'Huawei Ascend Y530', zapId : 883053}, 
	{productId : 357, productName : 'Samsung Monte S5620', zapId : 769591}, 
	{productId : 358, productName : 'Sony Xperia P', zapId : 829055}, 
	{productId : 359, productName : 'Apple iPhone 3Gs 16GB', zapId : 733100}, 
	{productId : 360, productName : 'More Fine U9000', zapId : 883613}, 
	{productId : 361, productName : '101 Nokia', zapId : 816658}, 
	{productId : 362, productName : 'HTC Desire V', zapId : 834708}, 
	{productId : 363, productName : 'BlackBerry 9700 bold', zapId : 743355}, 
	{productId : 364, productName : 'ZTE Grand X V970', zapId : 838292}, 
	{productId : 365, productName : 'Nokia Nokia 2690', zapId : 757866}, 
	{productId : 366, productName : 'Zopo ZP990 Captain S', zapId : 862813}, 
	{productId : 367, productName : 'HTC HD7', zapId : 776503}, 
	{productId : 368, productName : 'Blu Studio 5.0 LTE Y530Q', zapId : 883602}, 
	{productId : 369, productName : 'Zopo C2', zapId : 858930}, 
	{productId : 370, productName : 'LG P940 Prada 3.0', zapId : 814952}, 
	{productId : 371, productName : '113 Nokia', zapId : 835409}, 
	{productId : 372, productName : 'Newman K1B', zapId : 869596}, 
	{productId : 373, productName : 'Samsung S5603 Magic Touch', zapId : 742769}, 
	{productId : 374, productName : 'LG Optimus L7 P700', zapId : 847851}, 
	{productId : 375, productName : 'Samsung Galaxy Fame Lite S6790', zapId : 884599}, 
	{productId : 376, productName : 'Lenovo A396', zapId : 891099}, 
	{productId : 377, productName : 'Sony Ericsson K310I', zapId : 501386}, 
	{productId : 378, productName : 'Lenovo A766', zapId : 868096}, 
	{productId : 379, productName : 'Nokia Lumia 720', zapId : 855676}, 
	{productId : 380, productName : 'Sony Ericsson W200I', zapId : 793786}, 
	{productId : 381, productName : 'Hyundai T50', zapId : 882017}, 
	{productId : 382, productName : 'ZTE KIS T3', zapId : 857498}, 
	{productId : 383, productName : 'Sony Xperia T3', zapId : 884598}, 
	{productId : 384, productName : 'Lenovo A760', zapId : 866088}, 
	{productId : 385, productName : 'LG Optimus ONE P500/H', zapId : 789318}, 
	{productId : 386, productName : 'Nokia X3-00', zapId : 856197}, 
	{productId : 387, productName : 'Nokia 7510 supernova', zapId : 721858}, 
	{productId : 388, productName : 'Samsung Galaxy Mega 5.8 I9150', zapId : 855326}, 
	{productId : 389, productName : 'Sony Ericsson Xperia ray', zapId : 803087}, 
	{productId : 390, productName : 'Samsung I8700 Omnia 7', zapId : 777928}, 
	{productId : 391, productName : 'Sony Ericsson T303', zapId : 719364}, 
	{productId : 392, productName : 'Samsung Galaxy Music S6010', zapId : 854521}, 
	{productId : 393, productName : 'ThL T100S', zapId : 869021}, 
	{productId : 394, productName : 'Samsung Galaxy S4 Zoom', zapId : 854524}, 
	{productId : 395, productName : 'Toshiba TG01', zapId : 744538}, 
	{productId : 396, productName : 'Motorola MILESTONE', zapId : 748019}, 
	{productId : 397, productName : '2220 Nokia', zapId : 755078}, 
	{productId : 398, productName : 'Nokia 5800 XpressMusic', zapId : 718592}, 
	{productId : 399, productName : 'HTC Desire HD', zapId : 775027}, 
	{productId : 400, productName : 'Nokia C7', zapId : 776508}, 
	{productId : 401, productName : 'Samsung Galaxy Ace 2 I8160', zapId : 829351}, 
	{productId : 402, productName : 'Nokia E5', zapId : 773127}, 
	{productId : 403, productName : 'Samsung E1050', zapId : 873209}, 
	{productId : 404, productName : 'More Fine N5', zapId : 883611}, 
	{productId : 405, productName : 'Sony Xperia M', zapId : 860415}, 
	{productId : 406, productName : 'Sony Ericsson W705', zapId : 725925}, 
	{productId : 407, productName : 'Sony Ericsson K610I', zapId : 472582}, 
	{productId : 408, productName : 'Sony Ericsson Xperia Neo V', zapId : 813613}, 
	{productId : 409, productName : 'Nokia E71', zapId : 708720}, 
	{productId : 410, productName : 'iPhone 4 16 GB Sim Free ', zapId : 763788}, 
	{productId : 411, productName : 'iNew I3000', zapId : 865834}, 
	{productId : 412, productName : 'Nokia C2-03', zapId : 801836}, 
	{productId : 413, productName : 'BlackBerry Curve 3G 9300', zapId : 785784}, 
	{productId : 414, productName : '701 Nokia', zapId : 803799}, 
	{productId : 415, productName : 'Sony Ericsson Z550i', zapId : 499950}, 
	{productId : 416, productName : '5230 Nokia', zapId : 745567}, 
	{productId : 417, productName : 'Nokia C2-02', zapId : 801339}, 
	{productId : 418, productName : 'Sony Ericsson Xperia X8', zapId : 777358}, 
	{productId : 419, productName : 'Sony Xperia Go', zapId : 830739}, 
	{productId : 420, productName : 'Samsung Galaxy Note 3 N9000 16GB', zapId : 859528}, 
	{productId : 421, productName : 'Nokia 6310I', zapId : 371300}, 
	{productId : 422, productName : 'BlackBerry Q5', zapId : 854152}, 
	{productId : 423, productName : 'More Fine S5', zapId : 883609}, 
	{productId : 424, productName : '2600 Nokia', zapId : 371682}, 
	{productId : 425, productName : '1280 Nokia', zapId : 768968}, 
	{productId : 426, productName : 'Neoi NEOI 136', zapId : 853820}, 
	{productId : 427, productName : 'Samsung Galaxy S Plus I9001', zapId : 812041}, 
	{productId : 428, productName : 'Nokia E65', zapId : 523534}, 
	{productId : 429, productName : 'Motorola E815', zapId : 752096}, 
	{productId : 430, productName : 'Samsung Galaxy fit S5670', zapId : 821868}, 
	{productId : 431, productName : 'Blu Sport 4.5 S430L', zapId : 890172}, 
	{productId : 432, productName : 'Nokia 5030 XpressMusic', zapId : 735185}, 
	{productId : 433, productName : 'Sony Xperia L', zapId : 865801}, 
	{productId : 434, productName : 'Samsung Galaxy Core I8262', zapId : 855815}, 
	{productId : 435, productName : 'Huawei Ascend Y100', zapId : 881222}, 
	{productId : 436, productName : 'LG Optimus G E975', zapId : 846596}, 
	{productId : 437, productName : 'LG Optimus L5 II E460', zapId : 853077}, 
	{productId : 438, productName : 'iPhone 4S 64GB SimFree ', zapId : 803983}, 
	{productId : 439, productName : 'ViewSonic V450HD', zapId : 857967}, 
	{productId : 440, productName : 'LG GU280F Popcorn', zapId : 762784}, 
	{productId : 441, productName : '5250 Nokia', zapId : 775402}, 
	{productId : 442, productName : 'Nokia C5-03', zapId : 782182}, 
	{productId : 443, productName : '6280 Nokia', zapId : 377793}, 
	{productId : 444, productName : 'Nokia C1-01', zapId : 784999}, 
	{productId : 445, productName : 'Alcatel OT710', zapId : 806738}, 
	{productId : 446, productName : 'Samsung I8510 Innov8', zapId : 714531}, 
	{productId : 447, productName : 'Nokia X5-01', zapId : 777925}, 
	{productId : 448, productName : 'Geemarc CL8450', zapId : 886520}, 
	{productId : 449, productName : 'HTC Incredible S', zapId : 789964}, 
	{productId : 450, productName : 'HTC Legend', zapId : 754006}, 
	{productId : 451, productName : '6111 Nokia', zapId : 375345}, 
	{productId : 452, productName : 'Alcatel OT202', zapId : 746250}, 
	{productId : 453, productName : 'Samsung S5830i Galaxy ACE', zapId : 836671}, 
	{productId : 454, productName : 'Alcatel OT-105/A', zapId : 785866}, 
	{productId : 455, productName : 'Nokia 6700 Slide', zapId : 758163}, 
	{productId : 456, productName : 'Archos 50 Platinum', zapId : 860749}, 
	{productId : 457, productName : 'Sony Xperia T', zapId : 840949}, 
	{productId : 458, productName : 'HTC Sensation XE', zapId : 804283}, 
	{productId : 459, productName : 'Sony Ericsson W890I', zapId : 693073}, 
	{productId : 460, productName : 'Nokia X1-01', zapId : 802822}, 
	{productId : 461, productName : 'Blu Life one M L131L', zapId : 883600}, 
	{productId : 462, productName : 'Huawei U8150 IDEOS', zapId : 788853}, 
	{productId : 463, productName : 'Nokia 2680 Slide', zapId : 716748}, 
	{productId : 464, productName : 'PadFone 2 A68-1A216WWE טלפון+טאב', zapId : 843673}, 
	{productId : 465, productName : '2710 Nokia', zapId : 768969}, 
	{productId : 466, productName : 'Zopo ZP780', zapId : 877433}, 
	{productId : 467, productName : 'Sony Ericsson K660I', zapId : 713586}, 
	{productId : 468, productName : 'Zopo C3', zapId : 857501}, 
	{productId : 469, productName : 'Blu Vivo 4.8HD', zapId : 879054}, 
	{productId : 470, productName : 'Sony Ericsson W350', zapId : 714291}, 
	{productId : 471, productName : 'Sony Ericsson C902', zapId : 708627}, 
	{productId : 472, productName : 'Sony Xperia ion', zapId : 835305}, 
	{productId : 473, productName : 'Nokia N86', zapId : 731748}, 
	{productId : 474, productName : 'Amoi A920', zapId : 889509}, 
	{productId : 475, productName : 'BlackBerry Bold Touch 9900', zapId : 800299}, 
	{productId : 476, productName : 'HTC One S', zapId : 821267}, 
	{productId : 477, productName : 'Lenovo A800', zapId : 854254}, 
	{productId : 478, productName : 'Sony Xperia SL', zapId : 835412}, 
	{productId : 479, productName : 'Blu Studio 5.0 C HD D534L', zapId : 890542}, 
	{productId : 480, productName : 'Motorola WX288', zapId : 752223}, 
	{productId : 481, productName : 'Blu Life 8 L280i', zapId : 883601}, 
	{productId : 482, productName : 'Sony Ericsson W910i', zapId : 596140}, 
	{productId : 483, productName : '7310 Nokia', zapId : 711944}, 
	{productId : 484, productName : 'Gigabyte Gsmart GS202', zapId : 851466}, 
	{productId : 485, productName : 'Gigabyte GSmart Aku A1', zapId : 857013}, 
	{productId : 486, productName : 'Samsung Galaxy Core I8260', zapId : 855675}, 
	{productId : 487, productName : 'Nokia 5530 XpressMusic', zapId : 735726}, 
	{productId : 488, productName : '8120 BlackBerry', zapId : 724893}, 
	{productId : 489, productName : 'Nokia N91', zapId : 415617}, 
	{productId : 490, productName : 'Sony Ericsson W205', zapId : 760347}, 
	{productId : 491, productName : 'Samsung E2652W', zapId : 807124}, 
	{productId : 492, productName : 'Motorola W362', zapId : 728267}, 
	{productId : 493, productName : 'Nokia X6 16GB', zapId : 789092}, 
	{productId : 494, productName : 'APEX  VJB441', zapId : 853611}, 
	{productId : 495, productName : 'Lenovo S720', zapId : 866090}, 
	{productId : 496, productName : 'Lenovo A706', zapId : 864420}, 
	{productId : 497, productName : 'Sony Ericsson W595', zapId : 719757}, 
	{productId : 498, productName : 'Sony Ericsson Z310i', zapId : 598324}, 
	{productId : 499, productName : 'More Fine I5', zapId : 883610}, 
	{productId : 500, productName : 'Sony Xperia ZR', zapId : 855733}, 
	{productId : 501, productName : 'Sony Xperia TX', zapId : 841276}, 
	{productId : 502, productName : 'Nokia Lumia 800', zapId : 815728}, 
	{productId : 503, productName : 'HTC 7 Mozart', zapId : 778437}, 
	{productId : 504, productName : 'Sony Ericsson Vivaz', zapId : 753595}, 
	{productId : 505, productName : '5500 Nokia', zapId : 468283}, 
	{productId : 506, productName : 'Sony Ericsson Z530I', zapId : 591748}, 
	{productId : 507, productName : 'Zopo ZP200 Plus', zapId : 868165}, 
	{productId : 508, productName : 'Sony Ericsson W580I', zapId : 593587}, 
	{productId : 509, productName : 'Sony Xperia V', zapId : 840947}, 
	{productId : 510, productName : 'Alcatel OTE206C', zapId : 748020}, 
	{productId : 511, productName : 'Motorola WX290', zapId : 779773}, 
	{productId : 512, productName : 'Sony Xperia Neo L', zapId : 830731}, 
	{productId : 513, productName : 'iPhone 3Gs 16GB Sim Free ', zapId : 732832}, 
	{productId : 514, productName : '700 Nokia', zapId : 811307}, 
	{productId : 515, productName : 'Sony Ericsson T715', zapId : 757770}, 
	{productId : 516, productName : 'Gigabyte GSmart Rio R1', zapId : 854153}, 
	{productId : 517, productName : 'Sony Xperia Acro S LT26w', zapId : 835413}, 
	{productId : 518, productName : 'Nokia N9', zapId : 804290}, 
	{productId : 519, productName : 'Motorola W388', zapId : 721075}, 
	{productId : 520, productName : 'Nokia 6760 Slide', zapId : 771219}, 
	{productId : 521, productName : 'Sony Ericsson G900', zapId : 708197}, 
	{productId : 522, productName : 'Sony Xperia LT29i Hayabusa', zapId : 834710}, 
	{productId : 523, productName : 'Sony Ericsson S500i', zapId : 588953}, 
	{productId : 524, productName : 'ThL L969', zapId : 891582}, 
	{productId : 525, productName : 'Sony Ericsson Xperia Neo', zapId : 791713}, 
	{productId : 526, productName : 'Samsung i7500 Galaxy', zapId : 743359}, 
	{productId : 527, productName : '603 Nokia', zapId : 811338}
]

var getProducts = function(res) {
	res.json(products);
};

var getSentencesByProductId = function(productId) {
	return Q.promise(function(resolve, reject){
		var url = "http://pro-ducts.freeiz.com/productsSentences.php?productId=" + productId;

		request({
		    url: url,
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {
		        resolve(body);
		    }
		    else {
		    	console.log(error);
		    	reject("{error: error}");
		    }
		})
	});
};

var getPicture = function(productName) {
	console.log(productName);
	var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + productName;

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	if (body.responseData){
		        console.log(body.responseData.results[0]) // Print the json response
		        return body.responseData.results[0];
	        }
	        else {
	        	return null;
	        }
	    }
	    else {
	    	console.log(error);
	    	return null;
	    }
	})
};

var getProductPicture = function(productName, res) {
	console.log(productName);
	var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + productName;

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.responseData.results[0]) // Print the json response
	        //return (body);
	        res.json(body);
	    }
	    else {
	    	console.log(error);
	    	res.json("{error: error}");
	    }
	})
};

module.exports = {
	getProducts : getProducts,
	getSentencesByProductId : getSentencesByProductId,
	getProductPicture : getProductPicture
};