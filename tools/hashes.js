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
  return md4_cmn((b & c) | (b & d) | (c & d), a, 0, x, s, 0x5a827999);
}
function md4_hh(a, b, c, d, x, s)
{
  return md4_cmn(b ^ c ^ d, a, 0, x, s, 0x6ed9eba1);
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


function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md5(message) {
    const T = [ 0,  // For some reason this list is 1-indexed
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
        0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
        0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
        0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
        0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
        0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
        0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
        0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
        0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
        0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
        0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
        0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
        0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ];


    var M = strToLEArray(message);
    var N = message.length * 8;

    // Padding
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

        A = md5_ff(A, B, C, D, M[i+ 0],  7, T[ 1]);
        D = md5_ff(D, A, B, C, M[i+ 1], 12, T[ 2]);
        C = md5_ff(C, D, A, B, M[i+ 2], 17, T[ 3]);
        B = md5_ff(B, C, D, A, M[i+ 3], 22, T[ 4]);

        A = md5_ff(A, B, C, D, M[i+ 4],  7, T[ 5]);
        D = md5_ff(D, A, B, C, M[i+ 5], 12, T[ 6]);
        C = md5_ff(C, D, A, B, M[i+ 6], 17, T[ 7]);
        B = md5_ff(B, C, D, A, M[i+ 7], 22, T[ 8]);

        A = md5_ff(A, B, C, D, M[i+ 8],  7, T[ 9]);
        D = md5_ff(D, A, B, C, M[i+ 9], 12, T[10]);
        C = md5_ff(C, D, A, B, M[i+10], 17, T[11]);
        B = md5_ff(B, C, D, A, M[i+11], 22, T[12]);

        A = md5_ff(A, B, C, D, M[i+12],  7, T[13]);
        D = md5_ff(D, A, B, C, M[i+13], 12, T[14]);
        C = md5_ff(C, D, A, B, M[i+14], 17, T[15]);
        B = md5_ff(B, C, D, A, M[i+15], 22, T[16]);


        A = md5_gg(A, B, C, D, M[i+ 1],  5, T[17]);
        D = md5_gg(D, A, B, C, M[i+ 6],  9, T[18]);
        C = md5_gg(C, D, A, B, M[i+11], 14, T[19]);
        B = md5_gg(B, C, D, A, M[i+ 0], 20, T[20]);

        A = md5_gg(A, B, C, D, M[i+ 5],  5, T[21]);
        D = md5_gg(D, A, B, C, M[i+10],  9, T[22]);
        C = md5_gg(C, D, A, B, M[i+15], 14, T[23]);
        B = md5_gg(B, C, D, A, M[i+ 4], 20, T[24]);

        A = md5_gg(A, B, C, D, M[i+ 9],  5, T[25]);
        D = md5_gg(D, A, B, C, M[i+14],  9, T[26]);
        C = md5_gg(C, D, A, B, M[i+ 3], 14, T[27]);
        B = md5_gg(B, C, D, A, M[i+ 8], 20, T[28]);

        A = md5_gg(A, B, C, D, M[i+13],  5, T[29]);
        D = md5_gg(D, A, B, C, M[i+ 2],  9, T[30]);
        C = md5_gg(C, D, A, B, M[i+ 7], 14, T[31]);
        B = md5_gg(B, C, D, A, M[i+12], 20, T[32]);

        
        A = md5_hh(A, B, C, D, M[i+ 5],  4, T[33]);
        D = md5_hh(D, A, B, C, M[i+ 8], 11, T[34]);
        C = md5_hh(C, D, A, B, M[i+11], 16, T[35]);
        B = md5_hh(B, C, D, A, M[i+14], 23, T[36]);

        A = md5_hh(A, B, C, D, M[i+ 1],  4, T[37]);
        D = md5_hh(D, A, B, C, M[i+ 4], 11, T[38]);
        C = md5_hh(C, D, A, B, M[i+ 7], 16, T[39]);
        B = md5_hh(B, C, D, A, M[i+10], 23, T[40]);

        A = md5_hh(A, B, C, D, M[i+13],  4, T[41]);
        D = md5_hh(D, A, B, C, M[i+ 0], 11, T[42]);
        C = md5_hh(C, D, A, B, M[i+ 3], 16, T[43]);
        B = md5_hh(B, C, D, A, M[i+ 6], 23, T[44]);

        A = md5_hh(A, B, C, D, M[i+ 9],  4, T[45]);
        D = md5_hh(D, A, B, C, M[i+12], 11, T[46]);
        C = md5_hh(C, D, A, B, M[i+15], 16, T[47]);
        B = md5_hh(B, C, D, A, M[i+ 2], 23, T[48]);
        

        A = md5_ii(A, B, C, D, M[i+ 0],  6, T[49]);
        D = md5_ii(D, A, B, C, M[i+ 7], 10, T[50]);
        C = md5_ii(C, D, A, B, M[i+14], 15, T[51]);
        B = md5_ii(B, C, D, A, M[i+ 5], 21, T[52]);

        A = md5_ii(A, B, C, D, M[i+12],  6, T[53]);
        D = md5_ii(D, A, B, C, M[i+ 3], 10, T[54]);
        C = md5_ii(C, D, A, B, M[i+10], 15, T[55]);
        B = md5_ii(B, C, D, A, M[i+ 1], 21, T[56]);

        A = md5_ii(A, B, C, D, M[i+ 8],  6, T[57]);
        D = md5_ii(D, A, B, C, M[i+15], 10, T[58]);
        C = md5_ii(C, D, A, B, M[i+ 6], 15, T[59]);
        B = md5_ii(B, C, D, A, M[i+13], 21, T[60]);

        A = md5_ii(A, B, C, D, M[i+ 4],  6, T[61]);
        D = md5_ii(D, A, B, C, M[i+11], 10, T[62]);
        C = md5_ii(C, D, A, B, M[i+ 2], 15, T[63]);
        B = md5_ii(B, C, D, A, M[i+ 9], 21, T[64]);


        A = safe_add(A, AA);
        B = safe_add(B, BB);
        C = safe_add(C, CC);
        D = safe_add(D, DD);
    }

    return leArrayToHex(new Array(A, B, C, D));
}

function numToByteArray(num) {
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index++ ) {
        var byte = num & 0xff;
        byteArray [ index ] = byte;
        num = (num - byte) / 256 ;
    }
    byteArray = byteArray.filter(a => Number(a));  // Filters out 0s
    return byteArray;
}

function strToByteArray(str) {
    var byteArray = [];
    str.split("").forEach((value, index) => {
        byteArray.push(str.charCodeAt(index));
    });
    return byteArray;
}

function reflectCRC8(val) {
    var resByte = 0;
    for (let i = 0; i < 8; i++)
    {
        if ((val & (1 << i)) != 0)
        {
            resByte |= byteCast(1 << (7 - i));
        }
    }

    return resByte;
}

function reflectCRC16(val) {
    var resByte = 0;
    for (let i = 0; i < 16; i++)
    {
        if ((val & (1 << i)) != 0)
        {
            resByte |= ushortCast(1 << (15 - i));
        }
    }

    return resByte;
}

function reflectCRC32(val) {
    var resByte = 0;
    for (let i = 0; i < 32; i++)
    {
        if ((val & (1 << i)) != 0)
        {
            resByte |= uintCast(1 << (31 - i));
        }
    }

    return resByte;
}

function reflectCRC64(val) {
    var resByte = 0n;
    for (let i = 0n; i < 64n; i++)
    {
        if ((val & ulongCast(1n << i)) != 0n)
        {
            resByte |= ulongCast(1n << (63n - i));
        }
    }

    return resByte;
}

const byteCast = (n) => ((n >>> 0) & 0xff) >>> 0;
const ushortCast = (n) => ((n >>> 0) & 0xffff) >>> 0;
const uintCast = (n) => ((n >>> 0) & 0xffffffff) >>> 0;
const ulongCast = (n) => ((BigInt(n) >> 0n) & 0xffffffffffffffffn) >> 0n;

function crc8(message, initial, polynomial, outXor, reflectIn, reflectOut) {
    var crc = initial;
    var bArray = strToByteArray(message);
    bArray.forEach((value, index) => {
        let byte = reflectIn ? reflectCRC8(value) : value;
        crc ^= byte;

        for (let i = 0; i < 8; i++) {
            if ((crc & 0x80) != 0) {
                crc = byteCast((crc << 1) ^ polynomial);
            } else {
                crc <<= 1;
            }
        }
    });
    crc = reflectOut ? reflectCRC8(crc) : crc;
    let output = byteCast(crc ^ outXor).toString(16).padStart(2, "0");;
    return output;
}

function crc16(message, initial, polynomial, outXor, reflectIn, reflectOut) {
    var crc = initial;
    var bArray = strToByteArray(message);
    bArray.forEach((value, index) => {
        let byte = reflectIn ? reflectCRC8(value) : value;
        crc ^= ushortCast(byte << 8);

        for (let i = 0; i < 8; i++) {
            if ((crc & 0x8000) != 0) {
                crc = ushortCast((crc << 1) ^ polynomial);
            } else {
                crc <<= 1;
            }
        }
    });
    crc = reflectOut ? reflectCRC16(crc) : crc;
    let output = ushortCast(crc ^ outXor).toString(16).padStart(4, "0");;
    return output;
}

function crc32(message, initial, polynomial, outXor, reflectIn, reflectOut) {
    var crc = initial;
    var bArray = strToByteArray(message);
    bArray.forEach((value, index) => {
        let byte = reflectIn ? reflectCRC8(value) : value;
        crc ^= uintCast(byte << 24);

        for (let i = 0; i < 8; i++) {
            if ((crc & 0x80000000) != 0) {
                crc = uintCast((crc << 1) ^ polynomial);
            } else {
                crc <<= 1;
            }
        }
    });
    crc = reflectOut ? reflectCRC32(crc) : crc;
    let output = uintCast(crc ^ outXor).toString(16).padStart(8, "0");
    return output;
}

function crc64(message, initial, polynomial, outXor, reflectIn, reflectOut) {
    var crc = initial;
    var bArray = strToByteArray(message);
    bArray.forEach((value, index) => {
        let byte = reflectIn ? reflectCRC8(value) : value;
        crc ^= ulongCast(ulongCast(byte) << 56n);

        for (let i = 0n; i < 8n; i++) {
            if ((crc & 0x8000000000000000n) != 0n) {
                crc = ulongCast((crc << 1n) ^ polynomial);
            } else {
                crc <<= 1n;
            }
        }
    });
    crc = reflectOut ? reflectCRC64(crc) : crc;
    let output = ulongCast(crc ^ outXor).toString(16).padStart(16, "0");
    return output;
}

function bsd(message) {
    var checksum = 0;
    message.split("").forEach((value, index) => {
        checksum = (checksum >> 1) + ((checksum & 1) << 15);
        checksum += message.charCodeAt(index);
        checksum &= 0xffff;
    });
    return checksum.toString(16).padStart(4, "0");
}

function sysv(message) {
    var s = 0;
    message.split("").forEach((value, index) => {
        s += message.charCodeAt(index);
    });
    var r = s % (2**16) + (s % (2**32)) / (2**16);
    return parseInt(((r % (2**16)) + r / (2**16)).toFixed(0)).toString(16).padStart(4, "0");
}

function fletcher8(message) {
    var sum1 = 0;
    var sum2 = 0;
    for (let i = 0; i < message.length; i++) {
        sum1 = (sum1 + message.charCodeAt(i)) % 15;
        sum2 = (sum2 + sum1) % 15;
    }
    return ((sum2 << 4) | sum1).toString(16).padStart(2, "0");
}

function fletcher16(message) {
    var sum1 = 0;
    var sum2 = 0;
    for (let i = 0; i < message.length; i++) {
        sum1 = (sum1 + message.charCodeAt(i)) % 255;
        sum2 = (sum2 + sum1) % 255;
    }
    return ((sum2 << 8) | sum1).toString(16).padStart(4, "0");
}

function fletcher32(message) {
    var sum1 = 0;
    var sum2 = 0;
    for (let i = 0; i < message.length; i+=2) {
        sum1 = (sum1 + message.charCodeAt(i) + message.charCodeAt(i+1)) % 0xffff;
        sum2 = (sum2 + sum1) % 0xffff;
    }
    return ((sum2 << 16) | sum1).toString(16).padStart(8, "0");
}

function fletcher64(message) {
    var sum1 = 0n;
    var sum2 = 0n;
    for (let i = 0; i < message.length; i++) {
        sum1 = (sum1 + BigInt(message.charCodeAt(i))) % 0xffffffffn;
        sum2 = (sum2 + sum1) % 0xffffffffn;
    }
    return ((sum2 << 32n) | sum1).toString(16).padStart(16, "0");
}

function alder32(message) {
    const MOD_ALDER = 65521;
    var a = 1, b = 0;
    for (let i = 0; i < message.length; i++) {
        a = (a + message.charCodeAt(i)) % MOD_ALDER;
        b = (b + a) % MOD_ALDER;
    }
    return (((b << 16) | a) >>> 0).toString(16).padStart(8, "0");
}

function lrc(message) {
    var lrc = 0;
    for (let i = 0; i < message.length; i++) {
        lrc = (lrc + message.charCodeAt(i)) & 0xff;
    }
    lrc = ((lrc ^ 0xff) + 1) & 0xff;
    return lrc.toString(16).padStart(2, "0");
}

function oneAtATime(message) {
    var i = 0;
    var hash = 0;
    while (i != message.length) {
        hash += message.charCodeAt(i++);
        hash += hash << 10;
        hash ^= hash >>> 6;
    }
    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;
    return uintCast(hash).toString(16).padStart(8, "0");
}

function djb2(message) {
    var hash = 5381;
    for (let i = 0; i < message.length; i++) {
        hash = ((hash << 5) + hash) + message.charCodeAt(i);
    }

    return hash;
}

function roundUp(num, round) {
    if (num % round == 0) return num;
    else return num + (4 - (num % round));
}

function base64URL(message) {
    return base64(message, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");
}

function base64(message, alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/") {
    var binString = "";
    for (let i = 0; i < message.length; i++) {
        binString += message.charCodeAt(i).toString(2).padStart(8, "0");
    }

    var result = "";
    for (let i = 0; i < binString.length; i += 6) {
        let currentString = binString.substring(i, i+6);
        currentString = currentString.padEnd(6, "0");
        result += alphabet[parseInt(currentString, 2)];
    }
    return result.length % 4 == 0 ? result : result.padEnd(roundUp(result.length, 4), "=");
}

function ascii85(message) {
    var strNum = "";
    var output = "";
    for (let i = 0; i < message.length; i++) strNum += message.charCodeAt(i).toString(16).padStart(2, "0");
    for (let i = 0; i < strNum.length; i += 8) {
        var currentWithoutPadding = strNum.substring(i, i+8);
        var current = currentWithoutPadding.padEnd(8, "0");
        var num = parseInt(current, 16);
        output += String.fromCharCode(Math.floor((num / 52200625) % 85) + 33);
        output += String.fromCharCode(Math.floor((num / 614125) % 85) + 33);
        output += String.fromCharCode(Math.floor((num / 7225) % 85) + 33);;
        output += String.fromCharCode(Math.floor((num / 85) % 85) + 33);
        output += String.fromCharCode(((num) % 85) + 33);
        if (currentWithoutPadding.length != current.length && i + 8 > strNum.length) {
            output = output.substring(0, output.length - (4 - (currentWithoutPadding.length / 2)));
        }
    }

    return output;
}



//console.log(md2("yo"));  // ff8182fd0faa026ad1adc74f31952e45
//console.log(md4("yo"));  // 3357f1feed651ea2e31e87329568d3e8
//console.log(md5("yo"));  // 6d0007e52f7afb7d5a0650b0ffb8a4d1
//console.log(crc8("yo", 0x00, 0x07, 0x00, false, false));  // 0x15
//console.log(crc16("yo", 0xffff, 0x1021, 0x0000, false, false));  // 0x3287
//console.log(crc32("yo", 0xffffffff, 0x04c11db7, 0xffffffff, true, true));  // 0x6229ac89
//console.log(crc64("yo", 0x0000000000000000n, 0x42f0e1eba9ea3693n, 0x0000000000000000n, false, false));  // 0xe41d1bc85ee70836
//console.log(bsd("yo"));  // 32939
//console.log(sysv("yo"));  // 232
//console.log(fletcher8("yo"))  // 0x87
//console.log(fletcher16("yo"))  // 0x62e8
//console.log(fletcher32("yo"))  // 0x016100e8
//console.log(fletcher64("yo"))  // 0x00000161000000e8
//console.log(alder32("yo")) // 0x016300e9
//console.log(lrc("yo")) // 0x18
//console.log(oneAtATime("yo")) // 0xc75186a9
//console.log(djb2("yo"));
//console.log(base64("yo")); // eW8=
//console.log(ascii85("yo")); // H#E