### 概述

`Base64`是一种基于64个可打印字符来表示二进制数据的表示方法。由于2的6次方等于64，所以每6个比特为一个单元，对应某个可打印字符。三个字节有24个比特，对应于4个`Base64`单元，即3个字节需要用4个可打印字符来表示。它可用来作为电子邮件的传输编码。在Base64中的可打印字符包括字母A-Z、a-z、数字0-9 ，这样共有62个字符，此外两个可打印符号在不同的系统中而不同（本类库里面用的是`+`,`/`这两个字符）。一些如`uuencode`的其他编码方法，和之后`binhex`的版本使用不同的64字符集来代表6个二进制数字，但是它们不叫`Base64`。
`Base64`常用于在通常处理文本数据的场合，表示、传输、存储一些二进制数据。包括MIME的email，email via MIME, 在XML中存储复杂数据。
`Base64`其实是一种简单的置换加密方式，但是`BASE64`的用处往往并不是为了防止信息泄露，而且为了方便传输，进过`BASE64`编码后的信息会比原始信息长，大概是4/3倍。



实现代码一、测试可以用

```
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str){
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
/**
 * base64解码
 * @param {Object} str
 */
function base64decode(str){
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1) 
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1) 
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) 
                return out;
            c3 = base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1) 
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) 
                return out;
            c4 = base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1) 
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
/**
 * utf16转utf8
 * @param {Object} str
 */
function utf16to8(str){
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        }
        else 
            if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
    }
    return out;
}
/**
 * utf8转utf16
 * @param {Object} str
 */
function utf8to16(str){
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx10xx xxxx10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
//demo
//function doit(){
//    var f = document.f;
//    f.output.value = base64encode(utf16to8(f.source.value));
//    f.decode.value = utf8to16(base64decode(f.output.value));
//}
```

功能分割版，就是将两个js函数分别写出来

`Javascript`的`base64`加密函数和`base64`解密函数，仿`PHP base64_encode()`和`base64_decode()`.附实例。可以将js代码保存到`base64.js`中，在需要的时候调用。
注意：`base64`加密和解密有固有的算，请不要改动以下代码，否则可能导致程序出错，或者无法获取到正确的结果。
为了保证代码的正确性，请下载附件`base64.js` (没有实例)，而不要直接复制本页代码。

**`base64`加密代码**

```
 function base64_encode(str){
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";        
        var i = 0, len= str.length, string = '';

        while (i < len){
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len){
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len){
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                string += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            string += base64EncodeChars.charAt(c3 & 0x3F)
        }
            return string
    }
```

**`base64`解密啊代码**

```
function base64_decode(str){
        var c1, c2, c3, c4;
        var base64DecodeChars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
            58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
            -1, -1
        );
        var i=0, len = str.length, string = '';

        while (i < len){
            do{
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
            } while (
                i < len && c1 == -1
            );

            if (c1 == -1) break;

            do{
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
            } while (
                i < len && c2 == -1
            );

            if (c2 == -1) break;

            string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            do{
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return string;

                c3 = base64DecodeChars[c3]
            } while (
                i < len && c3 == -1
            );

            if (c3 == -1) break;

            string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            do{
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return string;
                c4 = base64DecodeChars[c4]
            } while (
                i < len && c4 == -1
            );

            if (c4 == -1) break;

            string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
        }
        return string;
    }
```

上面代码的测试代码

```
 document.write(base64_encode('www.uoften.com'));
    document.write('<br />');
    document.write(base64_decode('aHR0cDovL3d3dy5qYjUxLm5ldA==')); 
```

实现代码二：针对utf8

```
<script language='javascript'>
/* utf.js - UTF-8 <=> UTF-16 convertion
*
* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
* Version: 1.0
* LastModified: Dec 25 1999
* This library is free. You can redistribute it and/or modify it.
*/

/*
* Interfaces:
* utf8 = utf16to8(utf16);
* utf16 = utf16to8(utf8);
*/

function utf16to8(str) {
  var out, i, len, c;

  out = "";
  len = str.length;
  for(i = 0; i < len; i++) {
   c = str.charCodeAt(i);
   if ((c >= 0x0001) && (c <= 0x007F)) {
    out += str.charAt(i);
   } else if (c > 0x07FF) {
    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
   } else {
    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
   }
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = str.length;
  i = 0;
  while(i < len) {
   c = str.charCodeAt(i++);
   switch(c >> 4)
   { 
   case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
    // 0xxxxxxx
    out += str.charAt(i-1);
    break;
   case 12: case 13:
    // 110x xxxx 10xx xxxx
    char2 = str.charCodeAt(i++);
    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
    break;
   case 14:
    // 1110 xxxx 10xx xxxx 10xx xxxx
    char2 = str.charCodeAt(i++);
    char3 = str.charCodeAt(i++);
    out += String.fromCharCode(((c & 0x0F) << 12) |
           ((char2 & 0x3F) << 6) |
           ((char3 & 0x3F) << 0));
    break;
   }
  }

  return out;
}

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
* Version: 1.0
* LastModified: Dec 25 1999
* This library is free. You can redistribute it and/or modify it.
*/

/*
* Interfaces:
* b64 = base64encode(data);
* data = base64decode(b64);
*/


var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
   c1 = str.charCodeAt(i++) & 0xff;
   if(i == len)
   {
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
    out += "==";
    break;
   }
   c2 = str.charCodeAt(i++);
   if(i == len)
   {
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
    out += "=";
    break;
   }
   c3 = str.charCodeAt(i++);
   out += base64EncodeChars.charAt(c1 >> 2);
   out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
   out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
   out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
   /* c1 */
   do {
    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   } while(i < len && c1 == -1);
   if(c1 == -1)
    break;

   /* c2 */
   do {
    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   } while(i < len && c2 == -1);
   if(c2 == -1)
    break;

   out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

   /* c3 */
   do {
    c3 = str.charCodeAt(i++) & 0xff;
    if(c3 == 61)
     return out;
    c3 = base64DecodeChars[c3];
   } while(i < len && c3 == -1);
   if(c3 == -1)
    break;

   out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

   /* c4 */
   do {
    c4 = str.charCodeAt(i++) & 0xff;
    if(c4 == 61)
     return out;
    c4 = base64DecodeChars[c4];
   } while(i < len && c4 == -1);
   if(c4 == -1)
    break;
   out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}
//input base64 encode
function strdecode(str){
   return utf8to16(base64decode(str));
}
```