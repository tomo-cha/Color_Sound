'use strict'

// カラーコードの入力部分
const colorCodeInput = document.getElementById('colorCode');
// ボタン
const assessmentButton = document.getElementById('assessment');
// 結果表示エリア
const resultDivided = document.getElementById('result-area');


// 文字色用の変数
let colorCodeColor = "#";
// 文字色を背景色の補色にするための計算関数
function moji() {
    if(colorCodeInput.value==="#000000"){
        colorCodeColor = "#ffffff";
    }else if(colorCodeInput.value==="#ffffff"){
        colorCodeColor = "#000000";
    }else{
    let ary_16 = [];
    for(let i=1; i<colorCodeInput.value.length; i += 2){
    // 2文字ずつの16進数に分ける
    ary_16.push(colorCodeInput.value.substr(i,2));
    }
    // 10進数に直した上で最大と最小を見つけて足す
    const aryMax = function (a, b) {return Math.max(a, b);}
    const aryMin = function (a, b) {return Math.min(a, b);}
    let ary_10 = ary_16.map(e => parseInt(e,16));
    let max = ary_10.reduce(aryMax);
    let min = ary_10.reduce(aryMin);
    const sum = max+min;
    // 最大と最小の和から各値を引く
    ary_10 = ary_10.map(e => sum - e);
    ary_16 = ary_10.map(e => e.toString(16));
    function calc(prev, current) {
      return prev += current;
    }
    colorCodeColor = ary_16.reduce(calc, "#");
    ary_16.length = 0;
    ary_10.length = 0;
    }
}



// 音源ド〜シ
const c_audio = new Audio("C.mp3");
const d_audio = new Audio("D.mp3");
const e_audio = new Audio("E.mp3");
const f_audio = new Audio("F.mp3");
const g_audio = new Audio("G.mp3");
const a_audio = new Audio("A.mp3");
const b_audio = new Audio("B.mp3");

// エラー処理
// #を含めて文字数が6文字以下なら、"文字数が足りません"と表示する
// #を含めて文字数が8文字以上なら、"文字数が多すぎます"と表示する
// "#","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"以外の文字が入力されていたら"不適切な文字が入力されています"と表示する



// カラーコードによって鳴らす音を変える関数
function sound(){
    for(let i=0; i<colorCodeInput.value.length; i++){
        if(colorCodeInput.value.charAt(i)==="1" || colorCodeInput.value.charAt(i)==="8"){
            c_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="2" || colorCodeInput.value.charAt(i)==="9"){
            d_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="3" || colorCodeInput.value.charAt(i)==="a"){
            e_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="4" || colorCodeInput.value.charAt(i)==="b"){
            f_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="5" || colorCodeInput.value.charAt(i)==="c"){
            g_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="6" || colorCodeInput.value.charAt(i)==="d"){
            a_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="7" || colorCodeInput.value.charAt(i)==="e"){
            b_audio.play();
        }
        if(colorCodeInput.value.charAt(i)==="0" || colorCodeInput.value.charAt(i)==="f"){
            continue;
        }
    }
}


// ボタンがクリックされたときの動き
assessmentButton.onclick = () => {
    // エラー処理
    // #を含めて文字数が6文字以下なら、"文字数が足りません"と表示する
    if(colorCodeInput.value.length<7){
        const paragraph = document.createElement('p');
        paragraph.innerText = "文字数が足りません";
        paragraph.style.color = "red";
        resultDivided.appendChild(paragraph);
    // #を含めて文字数が8文字以上なら、"文字数が多すぎます"と表示する
    // "#","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"以外の文字が入力されていたら"不適切な文字が入力されています"と表示する
    

    }
    // #を含めて文字数が8文字以上なら、"文字数が多すぎます"と表示する
    else if(colorCodeInput.value.length>7){
        const paragraph = document.createElement('p');
        paragraph.innerText = "文字数が多すぎます";
        paragraph.style.color = "red";
        resultDivided.appendChild(paragraph);
    }else{
    // 文字色の決定
    moji();
    const paragraph = document.createElement('p');
    // 背景色
    paragraph.style.backgroundColor = colorCodeInput.value;
    // 文字の表示
    paragraph.innerText = colorCodeInput.value;
    console.log(colorCodeColor);
    paragraph.style.color = colorCodeColor;
    // 音が流れる
    sound();
    // 要素の追加
    resultDivided.appendChild(paragraph);
    // #だけを残してカーソルをもういちど入力欄におく
    colorCodeInput.value = "#";
    colorCodeInput.focus();
    }
}