const HEX_CHARS = '0123456789abcdef'.split('');

function md2(message) {
    const S = [
        41, 46, 67, 201, 162, 216, 124, 1, 61, 54, 84, 161, 236, 240, 6,
        19, 98, 167, 5, 243, 192, 199, 115, 140, 152, 147, 43, 217, 188,
        76, 130, 202, 30, 155, 87, 60, 253, 212, 224, 22, 103, 66, 111, 24,
        138, 23, 229, 18, 190, 78, 196, 214, 218, 158, 222, 73, 160, 251,
        245, 142, 187, 47, 238, 122, 169, 104, 121, 145, 21, 178, 7, 63,
        148, 194, 16, 137, 11, 34, 95, 33, 128, 127, 93, 154, 90, 144, 50,
        39, 53, 62, 204, 231, 191, 247, 151, 3, 255, 25, 48, 179, 72, 165,
        181, 209, 215, 94, 146, 42, 172, 86, 170, 198, 79, 184, 56, 210,
        150, 164, 125, 182, 118, 252, 107, 226, 156, 116, 4, 241, 69, 157,
        112, 89, 100, 113, 135, 32, 134, 91, 207, 101, 230, 45, 168, 2, 27,
        96, 37, 173, 174, 176, 185, 246, 28, 70, 97, 105, 52, 64, 126, 15,
        85, 71, 163, 35, 221, 81, 175, 58, 195, 92, 249, 206, 186, 197,
        234, 38, 44, 83, 13, 110, 133, 40, 132, 9, 211, 223, 205, 244, 65,
        129, 77, 82, 106, 220, 55, 200, 108, 193, 171, 250, 36, 225, 123,
        8, 12, 189, 177, 74, 120, 136, 149, 139, 227, 99, 232, 109, 233,
        203, 213, 254, 59, 0, 29, 57, 242, 239, 183, 14, 102, 88, 208, 228,
        166, 119, 114, 248, 235, 117, 75, 10, 49, 68, 80, 180, 143, 237,
        31, 26, 219, 153, 141, 51, 159, 17, 131, 20
    ];

    var M = new Array(message.length);

    for (var i = 0; i < message.length; i++) {
        var code = message.charCodeAt(i);
        if (code < 0x80) {
            M[i] = code;
        } else if (code < 0x800) {
            M[i] = 0xc0 | (code >> 6);
            M[i] = 0x80 | (code & 0x3f);
        } else if (code < 0xd800 || code >= 0xe000) {
            M[i] = 0xe0 | (code >> 12);
            M[i] = 0x80 | ((code >> 6) & 0x3f);
            M[i] = 0x80 | (code & 0x3f);
        }
    }

    // Step 1: Append Padding Bytes

    for (var i = 0; i < 16 - (message.length % 16); i++) {
        M.push(16 - (message.length % 16));
    }

    var N = M.length;

    // Step 2: Append Checksum

    var C = [];

    for (var i = 0; i < 16; i++) {
        C.push(0);
    }

    var L = 0;

    for (let i = 0; i < N/16; i++) {
        for (let j = 0; j < 16; j++) {
            let c = M[i * 16 + j];
            C[j] = C[j] ^ S[c ^ L];
            L = C[j];
        }
    }

    M = M.concat(C);

    // Step 3: Initialize MD Buffer

    var X = []
    for (let i = 0; i < 48; i++) {
        X.push(0);
    }

    // Step 4: Process Message in 16-Byte Blocks

    var Nn = N + 16;

    for (let i = 0; i < Nn/16; i++) {
        for (let j = 0; j < 16; j++) {
            X[16 + j] = M[i * 16 + j];
            X[32 + j] = (X[16 + j] ^ X[j]);
        }

        let t = 0;

        for (let j = 0; j < 18; j++) {
            for (let k = 0; k < 48; k++) {
                t = (X[k] ^ S[t]);
                X[k] = t;
            }

            t = (t + j) % 256;
        }
    }


    var hex = '';
    for (i = 0; i < 16; ++i) {
      hex += HEX_CHARS[(X[i] >> 4) & 0x0F] + HEX_CHARS[X[i] & 0x0F];
    }      

    return hex;
}


function strToLEArray(str) {  // String to little endian word array
    var bin = Array();
    var mask = 0xff;
    for (let i = 0; i < str.length * 8; i += 8) {
        bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
    }
    return bin;
}

function leArrayToHex(bin) {  // Little endian word array to hex string
    var str = "";
    for (let i = 0; i < bin.length * 4; i++) {
        str += HEX_CHARS[((bin[i>>2] >> ((i%4)*8+4)) & 0xf)] + 
               HEX_CHARS[((bin[i>>2] >> ((i%4)*8  )) & 0xf)];
    }
    return str;
}



function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function md4_cmn(q, a, b, x, s, t)
{
  return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md4_ff(a, b, c, d, x, s)
{
  return md4_cmn((b & c) | ((~b) & d), a, 0, x, s, 0);
}
function md4_gg(a, b, c, d, x, s)
{
  return md4_cmn((b & c) | (b & d) | (c & d), a, 0, x, s, 1518500249);
}
function md4_hh(a, b, c, d, x, s)
{
  return md4_cmn(b ^ c ^ d, a, 0, x, s, 1859775393);
}


function md4(message) {
    var M = strToLEArray(message);
    var N = message.length * 8;

    // Append padding

    M[N >> 5] |= 0x80 << (N % 32);
    M[(((N + 64) >>> 9) << 4) + 14] = N;

    var A = 0x67452301;
    var B = 0xefcdab89;
    var C = 0x98badcfe;
    var D = 0x10325476;

    // Do rounds

    for (let i = 0; i < M.length; i += 16) {
        var AA = A;
        var BB = B;
        var CC = C;
        var DD = D;

        A = md4_ff(A, B, C, D, M[i+ 0], 3 );
        D = md4_ff(D, A, B, C, M[i+ 1], 7 );
        C = md4_ff(C, D, A, B, M[i+ 2], 11);
        B = md4_ff(B, C, D, A, M[i+ 3], 19);

        A = md4_ff(A, B, C, D, M[i+ 4], 3 );
        D = md4_ff(D, A, B, C, M[i+ 5], 7 );
        C = md4_ff(C, D, A, B, M[i+ 6], 11);
        B = md4_ff(B, C, D, A, M[i+ 7], 19);

        A = md4_ff(A, B, C, D, M[i+ 8], 3 );
        D = md4_ff(D, A, B, C, M[i+ 9], 7 );
        C = md4_ff(C, D, A, B, M[i+10], 11);
        B = md4_ff(B, C, D, A, M[i+11], 19);

        A = md4_ff(A, B, C, D, M[i+12], 3 );
        D = md4_ff(D, A, B, C, M[i+13], 7 );
        C = md4_ff(C, D, A, B, M[i+14], 11);
        B = md4_ff(B, C, D, A, M[i+15], 19);


        A = md4_gg(A, B, C, D, M[i+ 0], 3 );
        D = md4_gg(D, A, B, C, M[i+ 4], 5 );
        C = md4_gg(C, D, A, B, M[i+ 8], 9 );
        B = md4_gg(B, C, D, A, M[i+12], 13);

        A = md4_gg(A, B, C, D, M[i+ 1], 3 );
        D = md4_gg(D, A, B, C, M[i+ 5], 5 );
        C = md4_gg(C, D, A, B, M[i+ 9], 9 );
        B = md4_gg(B, C, D, A, M[i+13], 13);

        A = md4_gg(A, B, C, D, M[i+ 2], 3 );
        D = md4_gg(D, A, B, C, M[i+ 6], 5 );
        C = md4_gg(C, D, A, B, M[i+10], 9 );
        B = md4_gg(B, C, D, A, M[i+14], 13);

        A = md4_gg(A, B, C, D, M[i+ 3], 3 );
        D = md4_gg(D, A, B, C, M[i+ 7], 5 );
        C = md4_gg(C, D, A, B, M[i+11], 9 );
        B = md4_gg(B, C, D, A, M[i+15], 13);


        A = md4_hh(A, B, C, D, M[i+ 0], 3 );
        D = md4_hh(D, A, B, C, M[i+ 8], 9 );
        C = md4_hh(C, D, A, B, M[i+ 4], 11);
        B = md4_hh(B, C, D, A, M[i+12], 15);

        A = md4_hh(A, B, C, D, M[i+ 2], 3 );
        D = md4_hh(D, A, B, C, M[i+10], 9 );
        C = md4_hh(C, D, A, B, M[i+ 6], 11);
        B = md4_hh(B, C, D, A, M[i+14], 15);

        A = md4_hh(A, B, C, D, M[i+ 1], 3 );
        D = md4_hh(D, A, B, C, M[i+ 9], 9 );
        C = md4_hh(C, D, A, B, M[i+ 5], 11);
        B = md4_hh(B, C, D, A, M[i+13], 15);

        A = md4_hh(A, B, C, D, M[i+ 3], 3 );
        D = md4_hh(D, A, B, C, M[i+11], 9 );
        C = md4_hh(C, D, A, B, M[i+ 7], 11);
        B = md4_hh(B, C, D, A, M[i+15], 15);


        A = safe_add(A, AA);
        B = safe_add(B, BB);
        C = safe_add(C, CC);
        D = safe_add(D, DD);

    }

    return leArrayToHex(new Array(A, B, C, D));
}

//console.log(md2("yo"));  // ff8182fd0faa026ad1adc74f31952e45
//console.log(md4("yo"));  // 3357f1feed651ea2e31e87329568d3e8
